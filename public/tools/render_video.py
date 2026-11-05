#!/usr/bin/env python3
"""
ARE Academy · render a video-lesson storyboard to MP4 (free, offline).

Usage:
    python render_video.py storyboard.json [-o lesson.mp4] [--voice PIPER_MODEL.onnx] [--rate 1.0]

What it does:
    1. Draws every narration step of every scene as a 1280x720 frame using
       Chromium (Playwright), with the same diagrams and callouts as the app,
       and burns in captions.
    2. Narrates each sentence with the first free TTS engine available:
         Piper (--voice model.onnx, or PIPER_MODEL env)  -> natural offline voice
         macOS `say`                                      -> built-in Mac voices
         FFmpeg's flite filter                            -> basic voice, everywhere
         silence (timed to reading speed)                 -> if no TTS at all
    3. Joins everything into an H.264/AAC MP4 with FFmpeg.

Requirements (all free):
    pip install playwright && python -m playwright install chromium
    FFmpeg on your PATH (https://ffmpeg.org)
    Optional: pip install piper-tts && python -m piper.download_voices en_US-lessac-medium
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, html as H

W, HH = 1280, 720
CSS = """
*{box-sizing:border-box} body{margin:0;width:1280px;height:720px;background:#F3F0E9;color:#23272A;font-family:Archivo,Helvetica,Arial,sans-serif;overflow:hidden}
.s{position:absolute;inset:0;padding:56px 64px 110px;display:flex;flex-direction:column;gap:18px}
h2{font-size:54px;line-height:1.08;margin:0;color:#1F3A40} h3{font-size:34px;margin:0;color:#1F3A40}
.sub{font:600 16px monospace;letter-spacing:.1em;text-transform:uppercase;color:#5E6460}
.rule{height:5px;width:150px;background:#A85A3A}
ul{list-style:none;padding:0;margin:0;display:grid;gap:14px;font-size:26px} li{padding-left:26px;position:relative;opacity:.15} li.in{opacity:1}
li:before{content:"";position:absolute;left:0;top:11px;width:12px;height:12px;border-radius:3px;background:#2D5F68}
table{border-collapse:collapse;width:100%;font-size:19px} th,td{border-bottom:1px solid #DAD5C9;padding:8px;text-align:left;vertical-align:top} th{font:600 14px monospace;text-transform:uppercase;color:#5E6460}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:20px;font-size:22px} .cmp div{border:3px solid #2D5F68;border-radius:14px;padding:18px} .cmp div+div{border-color:#A85A3A} .cmp .dim{opacity:.2}
.dg{display:grid;grid-template-columns:1.6fr 1fr;gap:22px;align-items:center;flex:1;min-height:0} .dg svg{width:100%;height:auto;max-height:470px}
.tip{opacity:.4} .tip.on{opacity:1;filter:drop-shadow(0 0 6px rgba(168,90,58,.8))} .tip.on text{fill:#A85A3A!important;font-weight:700} .tip.on line,.tip.on path{stroke:#A85A3A!important;stroke-width:2.5}
.call{background:#fff;border-left:5px solid #A85A3A;border-radius:10px;padding:16px;font-size:21px;box-shadow:0 4px 14px rgba(0,0,0,.08)}
.fm div{font-size:24px;margin-bottom:10px;opacity:.2} .fm div.in{opacity:1} code{font-family:monospace;color:#2D5F68;display:block}
.q{font-size:21px} .q .o{border:1px solid #DAD5C9;border-radius:10px;padding:8px 12px;margin:6px 0;background:#fff} .q .ok{border-color:#2F6B47;background:#DCEBDF}
.cc{position:absolute;left:50%;transform:translateX(-50%);bottom:26px;max-width:1100px;background:rgba(0,0,0,.8);color:#fff;font-size:24px;line-height:1.35;padding:10px 18px;border-radius:10px;text-align:center}
.tag{position:absolute;right:16px;top:14px;font:600 13px monospace;color:#5E6460;background:rgba(255,255,255,.85);padding:4px 10px;border-radius:6px}
/* diagram classes used by course SVGs (light theme values from the app) */
.dg-text text, text.dg-text{fill:#23272A;font-family:monospace} .dg-line{stroke:#23272A;fill:none;stroke-width:1.4} .dg-leader{stroke:#5E6460;stroke-width:.8;fill:none}
.dg-soft{fill:#EBE7DD;stroke:#DAD5C9;stroke-width:1} .dg-hatch{fill:#D9DDD5;stroke:#5E6460;stroke-width:.8} .dg-accent{fill:#2D5F68} .dg-accent2{fill:#EFE5D3;stroke:#A27C45}
.dg-air{fill:#D7E4EC;stroke:#DAD5C9} .dg-text text.dg-ontint{fill:#fff} .dg-accentline{stroke:#2D5F68;fill:none} .dg-sun{stroke:#B4822F;stroke-width:2;fill:none} .dg-arrowhead{fill:#23272A}
"""

def esc(s): return H.escape(str(s or ""))

def frame_html(sc, step, total, title):
    k = sc.get("kind"); f = (step + 1) / max(1, total)
    cap = (sc.get("sentences") or [""])[step] if sc.get("sentences") else ""
    body = ""
    if k == "title":
        body = f'<div style="margin:auto 0;display:grid;gap:14px"><span class="sub">{esc(sc.get("sub"))}</span><h2>{esc(sc.get("title"))}</h2><div class="rule"></div></div>'
    elif k in ("bullets", "recap"):
        b = sc.get("bullets") or []; n = -(-int(f * len(b) * 1000) // 1000) if b else 0
        body = f'<h3>{esc(sc.get("title"))}</h3><ul>' + "".join(f'<li class="{"in" if i < n else ""}">{esc(x)}</li>' for i, x in enumerate(b)) + "</ul>"
    elif k == "table":
        body = f'<h3>{esc(sc.get("title"))}</h3><div>{sc.get("table") or ""}</div>'
    elif k == "formulas":
        rows = sc.get("rows") or []; n = round(f * len(rows) + 0.49)
        body = f'<h3>{esc(sc.get("title"))}</h3><div class="fm">' + "".join(f'<div class="{"in" if i < n else ""}"><b>{esc(r.get("name"))}</b><code>{esc(r.get("f"))}</code></div>' for i, r in enumerate(rows)) + "</div>"
    elif k == "compare":
        L, R = sc.get("left") or {}, sc.get("right") or {}
        body = f'<h3>{esc(sc.get("title"))}</h3><div class="cmp"><div><b>{esc(L.get("h"))}</b><p>{esc(L.get("d"))}</p></div><div class="{"" if f > .5 else "dim"}"><b>{esc(R.get("h"))}</b><p>{esc(R.get("d"))}</p></div></div>'
    elif k == "flow":
        st = sc.get("steps") or []
        body = f'<h3>{esc(sc.get("title"))}</h3><ul>' + "".join(f'<li class="in">{esc(x)}</li>' for x in st) + "</ul>"
    elif k == "diagram":
        tips = sc.get("tips") or []; ti = min(len(tips) - 1, int(f * len(tips) - 0.001)) if tips else -1
        call = f'<div class="call"><b>{esc(tips[ti]["t"])}</b><p>{esc(tips[ti]["d"])}</p></div>' if ti >= 0 else ""
        body = f'<h3>{esc(sc.get("title"))}</h3><div class="dg"><div id="fig" data-ti="{ti}">{sc.get("svg") or ""}</div>{call}</div>'
    elif k == "quiz":
        qs = sc.get("questions") or []; reveal = step >= total - 1
        body = f'<h3>{esc(sc.get("title"))}</h3>' + "".join(f'<div class="q"><b>{i+1}. {esc(q["q"])}</b>' + "".join(f'<div class="o {"ok" if reveal and j == q["ans"] else ""}">{chr(65+j)}. {esc(o)}</div>' for j, o in enumerate(q["opts"])) + "</div>" for i, q in enumerate(qs[:2]))
    elif k == "sources":
        body = f'<h3>{esc(sc.get("title"))}</h3><ul style="font-size:19px">' + "".join(f'<li class="in">{esc(x)}</li>' for x in (sc.get("items") or [])) + "</ul>"
    script = "<script>const f=document.getElementById('fig');if(f){const ti=+f.dataset.ti;f.querySelectorAll('.tip').forEach((t,i)=>t.classList.toggle('on',i===ti));}</script>"
    return f'<!doctype html><meta charset="utf-8"><style>{CSS}</style><div class="s">{body}</div><span class="tag">{esc(title)}</span>{f"<div class=cc>{esc(cap)}</div>" if cap else ""}{script}'

def tts(text, out_wav, rate, voice, tmp):
    words = max(1, len(text.split()))
    if voice and shutil.which("piper") or (voice and _has_module("piper")):
        cmd = [sys.executable, "-m", "piper", "-m", voice, "-f", out_wav, "--length-scale", str(1 / rate)]
        p = subprocess.run(cmd, input=text.encode(), capture_output=True)
        if p.returncode == 0 and os.path.exists(out_wav): return "piper"
    if shutil.which("say"):
        aiff = out_wav[:-4] + ".aiff"
        if subprocess.run(["say", "-r", str(int(175 * rate)), "-o", aiff, text], capture_output=True).returncode == 0:
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", aiff, out_wav]); return "say"
    tf = os.path.join(tmp, "t.txt"); open(tf, "w").write(text)
    p = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"flite=textfile={tf}:voice=slt", "-filter:a", f"atempo={max(0.5, min(2.0, rate))}", out_wav], capture_output=True)
    if p.returncode == 0: return "flite"
    dur = words / 150 * 60 / rate
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"anullsrc=r=22050:cl=mono", "-t", f"{dur:.2f}", out_wav]); return "silence"

def _has_module(m):
    try: __import__(m); return True
    except Exception: return False

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("storyboard"); ap.add_argument("-o", "--out"); ap.add_argument("--voice", default=os.environ.get("PIPER_MODEL")); ap.add_argument("--rate", type=float, default=1.0)
    a = ap.parse_args()
    sb = json.load(open(a.storyboard))
    if sb.get("format") != "are-academy-storyboard": sys.exit("Not an ARE Academy storyboard file.")
    if not shutil.which("ffmpeg"): sys.exit("FFmpeg is required (free): https://ffmpeg.org/download.html")
    from playwright.sync_api import sync_playwright
    out = a.out or re.sub(r"[^a-z0-9]+", "-", sb["title"].lower()).strip("-")[:60] + ".mp4"
    tmp = tempfile.mkdtemp(prefix="are-video-")
    segs, engines = [], set()
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={"width": W, "height": HH})
        n = 0
        for si, sc in enumerate(sb["scenes"]):
            sents = sc.get("sentences") or [sc.get("narration") or sc.get("title") or ""]
            for j, s in enumerate(sents):
                png = os.path.join(tmp, f"f{n:04d}.png"); wav = os.path.join(tmp, f"a{n:04d}.wav"); mp4 = os.path.join(tmp, f"s{n:04d}.mp4")
                pg.set_content(frame_html(sc, j, len(sents), sb["title"])); pg.wait_for_timeout(60); pg.screenshot(path=png)
                engines.add(tts(s, wav, a.rate, a.voice, tmp))
                subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", png, "-i", wav, "-af", "apad=pad_dur=0.35", "-shortest", "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-pix_fmt", "yuv420p", "-r", "24", "-c:a", "aac", "-ar", "44100", "-ac", "1", mp4], check=True)
                segs.append(mp4); n += 1
            print(f"scene {si+1}/{len(sb['scenes'])}: {sc.get('title','')[:60]}")
        br.close()
    lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{x}'\n" for x in segs))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", out], check=True)
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"Done: {out}  (voice: {', '.join(sorted(engines))})")

if __name__ == "__main__":
    main()
