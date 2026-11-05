import pathlib
src = pathlib.Path(__file__).parent / "src"
order = ["curriculum.js","lessons-a.js","lessons-b.js","questions-a.js","questions-b.js","lessons-c.js","cases.js","cases-b.js","lessons-d.js","questions-c.js","questions-d.js","lessons-e.js","lessons-f.js","qbank-x.js","qx-pcm.js","qx-pjm.js","qx-pa.js","qx-ppd.js","qx-pdd.js","qx-ce.js","lessons-g.js","lessons-h.js","qy-pcm.js","qy-pjm.js","qy-pa.js","qy-ppd.js","qy-pdd.js","qy-ce.js","lessons-i.js","qz-pcm-pjm.js","qz-pa-ppd.js","qz-pdd-ce.js","qw-pcm-pjm.js","qw-pa-ppd.js","qw-pdd-ce.js","lessons-j.js","qv-ce-pcm.js","qv-rest.js","qu-all.js","reference.js","drive-refs.js","podcast.js","optmix.js","optfix.js","optfix-pcm.js","optfix-pcm2.js","optfix-ce.js","optfix-ce2.js","optfix-pjm.js","optfix-pjm2.js","optfix-pjm3.js","optfix-pa.js","optfix-ppd.js","optfix-pdd.js","optfix-final.js","optfix-run.js","gen.js","store.js","engine.js","learn.js","ai.js","voice.js","exam-ui.js","tutor.js","studio.js","views.js","views-plus.js"]
js = "\n".join((src/f).read_text() for f in order)
css = (src/"style.css").read_text() + "\n" + (src/"design.css").read_text()
html = f'''<title>ARE Academy</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Personal ARE 5.0 study platform">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
<style>
{css}
</style>
<div id="app"><p style="padding:24px">Loading ARE Academy…</p></div>
<noscript><p style="padding:24px">ARE Academy needs JavaScript enabled.</p></noscript>
<script>
{js}
</script>
'''
(pathlib.Path(__file__).parent/"are-academy.html").write_text(html)
(pathlib.Path(__file__).parent/"bundle.js").write_text(js)
print(len(html))

# ---------- installable PWA package ----------
import shutil, hashlib, zipfile
root = pathlib.Path(__file__).parent
pwa = root / "pwa"; srcp = root / "pwa-src"
if pwa.exists(): shutil.rmtree(pwa)
shutil.copytree(srcp, pwa)
ver = hashlib.sha1(html.encode()).hexdigest()[:10]
(pwa / "sw.js").write_text((srcp / "sw.js").read_text().replace("__VERSION__", ver))
head = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#2D5F68">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="ARE Academy">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" type="image/png" href="icons/icon-192.png">
'''
reg = '''<script>
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
</script>'''
(pwa / "index.html").write_text(head + html.replace('<div id="app">', '</head><body><div id="app">', 1) + reg + "\n</body></html>\n")
zp = root / "ARE-Academy-app.zip"
with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(pwa.rglob("*")):
        if f.is_file(): z.write(f, "ARE-Academy/" + str(f.relative_to(pwa)))
print("pwa", ver, zp.stat().st_size)
