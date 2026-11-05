/* ---------- read-aloud voice: pick the most natural installed voice, fix pronunciation, speak in sentence chunks ---------- */
(function () {
  const V = ARE.VOICE = {};
  const KEY = "are-voice";
  V.ok = () => typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
  V.cfg = (() => { try { return Object.assign({ uri: "", rate: 1 }, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return { uri: "", rate: 1 }; } })();
  V.save = () => { try { localStorage.setItem(KEY, JSON.stringify(V.cfg)); } catch (e) {} };

  // Novelty and very old formant voices that sound robotic.
  const BAD = /compact|espeak|e-speak|\bFred\b|Albert|Zarvox|Bad News|Good News|Bells|Boing|Bubbles|Cellos|Whisper|Wobble|Trinoids|Jester|Organ|Superstar|Ralph|Junior|Kathy|Princess|Hysterical|Deranged|Bahh|Grandma|Grandpa|Rocko|Shelley|Sandy|Eddy|Flo|Reed/i;
  function score(v) {
    let s = 0; const n = v.name || "";
    if (!/^en/i.test(v.lang)) return -999;
    if (/Premium/i.test(n)) s += 70;
    if (/Neural|Natural|Online/i.test(n)) s += 65;           // Microsoft Edge natural voices
    if (/Enhanced/i.test(n)) s += 55;
    if (/Siri/i.test(n)) s += 50;
    if (/^Google/i.test(n)) s += 35;                          // Chrome / Android cloud voices
    if (/\b(Ava|Zoe|Evan|Nathan|Joelle|Noelle|Allison|Susan|Tom|Samantha|Karen|Daniel|Serena|Moira|Tessa|Aria|Jenny|Guy|Libby|Sonia|Ryan|Natasha|Clara|Liam)\b/i.test(n)) s += 15;
    if (BAD.test(n)) s -= 200;
    if (/en[-_](CA|US)/i.test(v.lang)) s += 8; else if (/en[-_](GB|AU|IE|NZ)/i.test(v.lang)) s += 5;
    return s;
  }
  V.quality = (v) => { const s = score(v); return s >= 45 ? "Natural" : s >= 0 ? "Standard" : "Basic"; };
  let cache = [];
  V.list = () => {
    if (!V.ok()) return [];
    const vs = speechSynthesis.getVoices();
    if (vs.length) cache = vs;
    return cache.filter(v => /^en/i.test(v.lang)).sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name));
  };
  V.best = () => { const l = V.list(); return (V.cfg.uri && l.find(v => v.voiceURI === V.cfg.uri)) || l[0] || null; };
  V.hasNatural = () => V.list().some(v => score(v) >= 45);
  if (V.ok()) { try { speechSynthesis.addEventListener("voiceschanged", () => { V.list(); if (ARE.VOICE.onchange) ARE.VOICE.onchange(); }); } catch (e) {} V.list(); }

  // Make the text sound like a person reading it, not a parser.
  V.clean = (t) => String(t || "")
    .replace(/\b([ABCG]\d{3})\s*[–-]\s*(\d{4})\b/g, "$1, $2 edition,")
    .replace(/§§\s*/g, "sections ").replace(/§\s*/g, "section ")
    .replace(/\be\.g\.,?/gi, "for example,").replace(/\bi\.e\.,?/gi, "that is,").replace(/\betc\./gi, "and so on").replace(/\bvs\.?(?=\s)/gi, "versus")
    .replace(/(\d)\s*in\.?\s+o\.c\./gi, "$1 inches on center").replace(/\bo\.c\./gi, "on center").replace(/\bpsf\b/g, "pounds per square foot")
    .replace(/(\d)\s*sf\b/g, "$1 square feet").replace(/\bsf\b/g, "square feet")
    .replace(/(\d)\s*ft\b/g, "$1 feet").replace(/(\d+)\s*h\b/g, "$1 hours").replace(/(\d+)\s*min\b/g, "$1 minutes")
    .replace(/(\d)\s*–\s*(\d)/g, "$1 to $2")
    .replace(/%/g, " percent").replace(/\s*&\s*/g, " and ").replace(/\band\/or\b/g, "and or")
    .replace(/\bARE\b/g, "A.R.E.").replace(/\bPcM\b/g, "P.C.M.").replace(/\bPjM\b/g, "P.J.M.").replace(/\bPPD\b/g, "P.P.D.").replace(/\bPDD\b/g, "P.D.D.").replace(/\bSM-2\b/g, "S.M. 2")
    .replace(/÷/g, " divided by ").replace(/×/g, " times ").replace(/≈/g, " about ").replace(/≤/g, " at most ").replace(/≥/g, " at least ").replace(/→/g, ", then ")
    .replace(/\s*[—–]\s*/g, ", ").replace(/[“”"]/g, "").replace(/\s*·\s*/g, ", ")
    .replace(/\.\.+/g, ".").replace(/,\s*([,.;:])/g, "$1").replace(/\s+/g, " ").trim();

  // Sentence-sized chunks: natural pauses, and avoids Chrome cutting off long utterances.
  V.chunks = (t) => {
    const s = V.clean(t).match(/[^.!?;:]+[.!?;:]+(\s|$)|[^.!?;:]+$/g) || [];
    const out = []; let cur = "";
    s.forEach(x => { x = x.trim(); if (!x) return; if ((cur + " " + x).length < 60) cur = (cur + " " + x).trim(); else { if (cur) out.push(cur); cur = x; } });
    if (cur) out.push(cur);
    return out.flatMap(c => c.length <= 220 ? [c] : c.split(/,\s+/).reduce((a, p) => { if (a.length && (a[a.length - 1] + ", " + p).length < 200) a[a.length - 1] += ", " + p; else a.push(p); return a; }, []));
  };
  V.utter = (text, rate) => {
    const u = new SpeechSynthesisUtterance(V.clean(text));
    const v = V.best(); if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = (rate || 1) * (V.cfg.rate || 1); u.pitch = 1; u.volume = 1;
    return u;
  };
  // Speak a long passage chunk by chunk. Returns a cancel function.
  V.speak = (text, opts = {}) => {
    if (!V.ok()) { if (opts.onend) opts.onend(); return () => {}; }
    speechSynthesis.cancel();
    const parts = V.chunks(text); let i = 0, live = true;
    const next = () => {
      if (!live) return;
      if (i >= parts.length) { live = false; if (opts.onend) opts.onend(); return; }
      const u = V.utter(parts[i++], opts.rate);
      u.onend = next; u.onerror = (e) => { if (e && /interrupted|canceled/.test(e.error)) return; next(); };
      speechSynthesis.speak(u);
    };
    next();
    return () => { live = false; speechSynthesis.cancel(); };
  };
  V.preview = () => V.speak("This is how your lessons will sound. The critical path is the longest sequence of dependent activities, and it sets the project duration.");
})();
