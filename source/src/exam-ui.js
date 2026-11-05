/* ============================================================
   EXAM TOOLS & LECTURE PLAYER (body-level panels that survive re-renders)
   - Calculator (basic + √, x², 1/x, %, ±, memory-free like the ARE's)
   - Whiteboard (freehand pen, eraser, clear)
   - Narrated lecture (lesson as slides, browser text-to-speech)
   ============================================================ */
(function () {
const UI = ARE.UI = {};
const el = (html) => { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; };
const escH = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function makeDraggable(panel) {
  const bar = panel.querySelector(".tp-bar"); let sx, sy, ox, oy, drag = false;
  bar.addEventListener("pointerdown", e => { if (e.target.closest("button")) return; drag = true; sx = e.clientX; sy = e.clientY; const r = panel.getBoundingClientRect(); ox = r.left; oy = r.top; bar.setPointerCapture(e.pointerId); });
  bar.addEventListener("pointermove", e => { if (!drag) return; panel.style.left = Math.max(0, Math.min(window.innerWidth - 120, ox + e.clientX - sx)) + "px"; panel.style.top = Math.max(0, Math.min(window.innerHeight - 60, oy + e.clientY - sy)) + "px"; panel.style.right = "auto"; panel.style.bottom = "auto"; });
  bar.addEventListener("pointerup", () => drag = false);
}

/* ---------- calculator ---------- */
let calc = null, cv = { disp: "0", acc: null, op: null, fresh: true };
function calcRender() { calc.querySelector(".calc-disp").textContent = cv.disp; }
function calcNum(v) { const n = parseFloat(v); if (!isFinite(n)) return "Error"; return String(Math.round(n * 1e10) / 1e10); }
function calcApply() { const b = parseFloat(cv.disp), a = cv.acc; if (cv.op === null || a === null) return b; return cv.op === "+" ? a + b : cv.op === "−" ? a - b : cv.op === "×" ? a * b : cv.op === "÷" ? (b === 0 ? NaN : a / b) : b; }
function calcKey(k) {
  if (/^[0-9]$/.test(k)) { cv.disp = cv.fresh || cv.disp === "0" ? k : cv.disp + k; cv.fresh = false; }
  else if (k === ".") { if (cv.fresh) { cv.disp = "0."; cv.fresh = false; } else if (!cv.disp.includes(".")) cv.disp += "."; }
  else if (["+", "−", "×", "÷"].includes(k)) { if (!cv.fresh || cv.acc === null) cv.acc = cv.op && !cv.fresh ? calcApply() : parseFloat(cv.disp); cv.disp = calcNum(cv.acc); cv.op = k; cv.fresh = true; }
  else if (k === "=") { if (cv.op) { cv.disp = calcNum(calcApply()); cv.acc = null; cv.op = null; cv.fresh = true; } }
  else if (k === "C") { cv = { disp: "0", acc: null, op: null, fresh: true }; }
  else if (k === "CE") { cv.disp = "0"; cv.fresh = true; }
  else if (k === "±") { cv.disp = calcNum(-parseFloat(cv.disp)); }
  else if (k === "√") { cv.disp = calcNum(Math.sqrt(parseFloat(cv.disp))); cv.fresh = true; }
  else if (k === "x²") { const x = parseFloat(cv.disp); cv.disp = calcNum(x * x); cv.fresh = true; }
  else if (k === "1/x") { cv.disp = calcNum(1 / parseFloat(cv.disp)); cv.fresh = true; }
  else if (k === "%") { const x = parseFloat(cv.disp); cv.disp = calcNum(cv.acc !== null ? cv.acc * x / 100 : x / 100); cv.fresh = true; }
  else if (k === "⌫") { cv.disp = cv.disp.length > 1 ? cv.disp.slice(0, -1) : "0"; }
  calcRender();
}
UI.toggleCalc = () => {
  if (!calc) {
    const keys = ["C", "CE", "⌫", "÷", "√", "x²", "1/x", "×", "7", "8", "9", "−", "4", "5", "6", "+", "1", "2", "3", "%", "±", "0", ".", "="];
    calc = el(`<div class="toolpanel calc" role="dialog" aria-label="Calculator"><div class="tp-bar"><b>Calculator</b><button class="tp-x" aria-label="Close calculator">✕</button></div><div class="calc-disp mono" aria-live="polite">0</div><div class="calc-keys">${keys.map(k => `<button data-k="${k}" class="${["÷", "×", "−", "+", "="].includes(k) ? "op" : ""}">${k}</button>`).join("")}</div></div>`);
    document.body.appendChild(calc); makeDraggable(calc);
    calc.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; if (b.classList.contains("tp-x")) { calc.hidden = true; return; } calcKey(b.dataset.k); });
    document.addEventListener("keydown", e => {
      if (!calc || calc.hidden || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      const map = { "*": "×", "/": "÷", "-": "−", "+": "+", "Enter": "=", "=": "=", "Backspace": "⌫", "Escape": "C", ".": "." };
      if (/^[0-9]$/.test(e.key)) { calcKey(e.key); e.preventDefault(); } else if (map[e.key]) { calcKey(map[e.key]); e.preventDefault(); }
    });
    return;
  }
  calc.hidden = !calc.hidden;
};

/* ---------- whiteboard ---------- */
let board = null, ctx = null, tool = "pen";
UI.toggleBoard = () => {
  if (!board) {
    board = el(`<div class="toolpanel board" role="dialog" aria-label="Whiteboard"><div class="tp-bar"><b>Whiteboard</b><span class="tp-tools"><button data-t="pen" class="on">Pen</button><button data-t="eraser">Eraser</button><button data-t="clear">Clear</button></span><button class="tp-x" aria-label="Close whiteboard">✕</button></div><canvas width="900" height="560"></canvas></div>`);
    document.body.appendChild(board); makeDraggable(board);
    const cvs = board.querySelector("canvas"); ctx = cvs.getContext("2d");
    const paintBg = () => { ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--surface") || "#fff"; ctx.fillRect(0, 0, cvs.width, cvs.height); };
    paintBg();
    let drawing = false, last = null;
    const pos = (e) => { const r = cvs.getBoundingClientRect(); return [(e.clientX - r.left) * cvs.width / r.width, (e.clientY - r.top) * cvs.height / r.height]; };
    cvs.addEventListener("pointerdown", e => { drawing = true; last = pos(e); cvs.setPointerCapture(e.pointerId); });
    cvs.addEventListener("pointermove", e => {
      if (!drawing) return; const p = pos(e);
      ctx.strokeStyle = tool === "eraser" ? (getComputedStyle(document.body).getPropertyValue("--surface") || "#fff") : (getComputedStyle(document.body).getPropertyValue("--ink") || "#222");
      ctx.lineWidth = tool === "eraser" ? 22 : 2.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); last = p;
    });
    cvs.addEventListener("pointerup", () => drawing = false);
    board.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.classList.contains("tp-x")) { board.hidden = true; return; }
      if (b.dataset.t === "clear") { paintBg(); return; }
      tool = b.dataset.t; board.querySelectorAll("[data-t]").forEach(x => x.classList.toggle("on", x === b));
    });
    return;
  }
  board.hidden = !board.hidden;
};
UI.resetTools = () => { if (calc) { calc.hidden = true; cv = { disp: "0", acc: null, op: null, fresh: true }; calcRender(); } if (board) { board.hidden = true; const c = board.querySelector("canvas"); ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--surface") || "#fff"; ctx.fillRect(0, 0, c.width, c.height); } };
UI.hideTools = () => { if (calc) calc.hidden = true; if (board) board.hidden = true; };

/* ---------- narrated lecture ---------- */
let lec = null, slides = [], si = 0, playing = false, rate = 1, onDone = null;
const canSpeak = () => typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
function buildSlides(l, takeaways) {
  const out = [{ h: l.title, html: `<p class="lec-sum">${escH(l.summary)}</p><h4>You will be able to</h4><ul>${l.objectives.map(o => `<li>${escH(o)}</li>`).join("")}</ul><p class="muted">${escH(l.why)}</p>` }];
  const parts = l.body.split(/<h3>/).map(x => x.trim()).filter(Boolean);
  parts.forEach(p => { const m = /^([\s\S]*?)<\/h3>([\s\S]*)$/.exec(p); if (m) out.push({ h: m[1].replace(/<[^>]+>/g, ""), html: m[2] }); else if (p.replace(/<[^>]+>/g, "").trim()) out.push({ h: l.title, html: p }); });
  if (l.diagram) { const tips = [...l.diagram.matchAll(/data-tip="([^"|]+)\|([^"]+)"/g)]; out.push({ h: "Diagram", html: `<div class="figure">${l.diagram}</div>${tips.length ? `<ul>${tips.map(t => `<li><b>${escH(t[1])}:</b> ${escH(t[2])}</li>`).join("")}</ul>` : ""}` }); }
  if ((l.formulas || []).length) out.push({ h: "Formulas", html: `<ul>${l.formulas.map(f => `<li><b>${escH(f.name)}:</b> <span class="mono">${escH(f.f)}</span></li>`).join("")}</ul>` });
  out.push({ h: l.example.title, html: l.example.html });
  out.push({ h: "Common mistakes", html: `<ul>${l.mistakes.map(m => `<li>${escH(m)}</li>`).join("")}</ul>` });
  if (takeaways.length) out.push({ h: "Key takeaways", html: `<ul>${takeaways.map(t => `<li>${escH(t)}</li>`).join("")}</ul>` });
  return out;
}
function speakText(html) {
  const tmp = document.createElement("div"); tmp.innerHTML = html;
  tmp.querySelectorAll("svg").forEach(s => s.remove());
  return tmp.textContent.replace(/\s+/g, " ").replace(/÷/g, " divided by ").replace(/×/g, " times ").replace(/≈/g, " about ").replace(/≤/g, " at most ").replace(/≥/g, " at least ").trim();
}
function lecRender() {
  const s = slides[si];
  lec.querySelector(".lec-h").textContent = s.h;
  lec.querySelector(".lec-body").innerHTML = s.html;
  lec.querySelector(".lec-count").textContent = (si + 1) + " / " + slides.length;
  lec.querySelector(".lec-prog > span").style.width = ((si + 1) / slides.length * 100) + "%";
  lec.querySelector("[data-l=prev]").disabled = si === 0;
  lec.querySelector("[data-l=next]").textContent = si === slides.length - 1 ? "Finish" : "Next →";
  if (si === slides.length - 1 && onDone) { onDone(); onDone = null; }
}
function stopSpeech() { if (canSpeak()) window.speechSynthesis.cancel(); playing = false; const b = lec && lec.querySelector("[data-l=play]"); if (b) b.textContent = "▶ Narrate"; }
function speakSlide() {
  if (!canSpeak()) return;
  ARE.VOICE.speak(slides[si].h + ". " + speakText(slides[si].html), { rate, onend: () => { if (!playing) return; if (si < slides.length - 1) { si++; lecRender(); speakSlide(); } else stopSpeech(); } });
}
UI.openLecture = (l, takeaways, done) => {
  slides = buildSlides(l, takeaways || []); si = 0; onDone = done || null;
  if (!lec) {
    lec = el(`<div class="lecture" role="dialog" aria-modal="true" aria-label="Lecture"><div class="lec-inner">
<div class="lec-top"><span class="eyebrow">Lecture</span><b class="lec-title"></b><button class="btn small" data-l="close">Close</button></div>
<div class="lec-prog"><span></span></div>
<div class="lec-slide"><h2 class="lec-h"></h2><div class="lec-body prose"></div></div>
<div class="lec-ctrl"><button class="btn" data-l="prev">← Back</button><span class="lec-count mono"></span>
${canSpeak() ? `<button class="btn" data-l="play">▶ Narrate</button><select data-l="rate" aria-label="Narration speed"><option value="0.85">0.85×</option><option value="1" selected>1×</option><option value="1.15">1.15×</option><option value="1.3">1.3×</option></select>` : `<span class="muted" style="font-size:.85rem">Narration isn't available in this browser</span>`}
<button class="btn primary" data-l="next">Next →</button></div></div></div>`);
    document.body.appendChild(lec);
    lec.addEventListener("click", e => {
      const b = e.target.closest("[data-l]"); if (!b) return;
      const a = b.dataset.l;
      if (a === "close") { stopSpeech(); lec.hidden = true; document.body.style.overflow = ""; }
      if (a === "prev" && si > 0) { si--; lecRender(); if (playing) speakSlide(); }
      if (a === "next") { if (si < slides.length - 1) { si++; lecRender(); if (playing) speakSlide(); } else { stopSpeech(); lec.hidden = true; document.body.style.overflow = ""; } }
      if (a === "play") { if (playing) stopSpeech(); else { playing = true; b.textContent = "❚❚ Pause"; speakSlide(); } }
    });
    lec.addEventListener("change", e => { if (e.target.dataset.l === "rate") { rate = +e.target.value; if (playing) speakSlide(); } });
    document.addEventListener("keydown", e => { if (!lec || lec.hidden) return; if (e.key === "Escape") lec.querySelector("[data-l=close]").click(); if (e.key === "ArrowRight") lec.querySelector("[data-l=next]").click(); if (e.key === "ArrowLeft") lec.querySelector("[data-l=prev]").click(); });
  }
  stopSpeech();
  lec.querySelector(".lec-title").textContent = l.title;
  lec.hidden = false; document.body.style.overflow = "hidden";
  lecRender();
};
})();
