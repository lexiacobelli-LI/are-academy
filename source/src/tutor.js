/* ============================================================
   TUTOR UI: floating button (phone), docked split panel (iPad/desktop)
   ============================================================ */
(function () {
const E = ARE.E, AI = ARE.AI, L = ARE.L;
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const T = ARE.TUTOR = { open: false, docked: false, busy: null };
let panel, fab, logEl, ctx = null, key = "general";

function el(h) { const d = document.createElement("div"); d.innerHTML = h.trim(); return d.firstChild; }
T.mount = () => {
  if (panel) return;
  fab = el(`<button class="fab" id="tutorFab" aria-label="Open AI tutor" aria-expanded="false"><span aria-hidden="true">✦</span><span class="fab-t">Tutor</span></button>`);
  panel = el(`<aside class="tutor" id="tutor" hidden aria-label="AI tutor">
<div class="tu-head"><div style="min-width:0;flex:1"><b>AI tutor</b><span class="tu-ctx" id="tuCtx"></span></div>
<button class="tu-btn hide-sm" data-tu="dock" title="Dock beside the page" aria-label="Dock beside the page">⇥</button><button class="tu-btn" data-tu="close" aria-label="Close tutor">✕</button></div>
<div class="tu-prov" id="tuProv"></div>
<div class="tu-modes" id="tuModes" role="toolbar" aria-label="Explanation modes"></div>
<div class="tu-log" id="tuLog" aria-live="polite"></div>
<div class="tu-tools" id="tuTools"></div>
<form class="tu-form" id="tuForm"><textarea id="tuIn" rows="2" placeholder="Ask about this page…" aria-label="Ask the tutor"></textarea><div class="tu-send"><button class="btn primary small" type="submit" id="tuSend">Send</button><button class="btn small" type="button" data-tu="stop" id="tuStop" hidden>Stop</button></div></form>
</aside>`);
  document.body.appendChild(panel); document.body.appendChild(fab);
  logEl = panel.querySelector("#tuLog");
  fab.addEventListener("click", () => T.toggle(true));
  panel.addEventListener("click", onClick);
  panel.querySelector("#tuForm").addEventListener("submit", (e) => { e.preventDefault(); const v = panel.querySelector("#tuIn").value.trim(); if (v) { panel.querySelector("#tuIn").value = ""; ask(v, null); } });
  panel.querySelector("#tuIn").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); panel.querySelector("#tuForm").requestSubmit(); } });
  try { const d = localStorage.getItem("are-tutor-dock"); T.docked = d === null ? true : d === "1"; } catch (e) { T.docked = true; }
  AI.onChange = () => T.refresh();
};
T.toggle = (open) => {
  T.open = open === undefined ? !T.open : open;
  panel.hidden = !T.open; fab.setAttribute("aria-expanded", T.open);
  document.body.classList.toggle("tutor-open", T.open);
  const docked = T.open && T.docked && window.innerWidth >= 1000;
  document.body.classList.toggle("tutor-docked", docked);
  // make room for split view: collapse the sidebar to icons while the tutor is docked on smaller screens
  const shellEl = document.getElementById("appShell");
  if (shellEl) { if (docked && window.innerWidth < 1440) { if (T._prevMini === undefined) T._prevMini = shellEl.classList.contains("mini"); shellEl.classList.add("mini"); } else if (T._prevMini !== undefined) { shellEl.classList.toggle("mini", T._prevMini); T._prevMini = undefined; } }
  if (T.open) { T.refresh(); setTimeout(() => { const i = panel.querySelector("#tuIn"); if (i && window.innerWidth >= 700) i.focus(); }, 50); }
};
T.blocked = () => { const s = ARE.H && ARE.H.session && ARE.H.session(); return s && s.mode === "exam" && !s.done && location.hash === "#quiz"; };
T.refresh = () => {
  if (!panel) return;
  fab.hidden = T.blocked();
  if (T.blocked() && T.open) T.toggle(false);
  if (!T.open) return;
  ctx = AI.context(); key = AI.ctxKey(ctx);
  panel.querySelector("#tuCtx").textContent = ctx.label;
  const p = AI.active();
  panel.querySelector("#tuProv").innerHTML = p ? `<span class="dot ok"></span>${esc(AI.label(p))}` : `<span class="dot"></span>No AI connected · <a href="#settings" data-tu="settings">Connect a free provider</a>`;
  const isQ = !!ctx.q;
  const modes = isQ ? ["hint", "guide", "full", "why", "simple", "steps", "compare", "visual"] : ["simple", "practice", "exam", "steps", "compare", "visual", "test"];
  panel.querySelector("#tuModes").innerHTML = modes.map(m => `<button class="chip" data-tu="mode" data-m="${m}">${esc(AI.MODES[m].t)}</button>`).join("");
  panel.querySelector("#tuTools").innerHTML = (ctx.obj || ctx.lesson) ? `<button class="chip" data-tu="genq">Make practice questions</button><button class="chip" data-tu="video">Make a video lesson</button><button class="chip" data-tu="confused">I don't get this</button>` : "";
  renderLog();
};
function renderLog() {
  const log = AI.log(key);
  if (!AI.active()) {
    logEl.innerHTML = `<div class="tu-empty"><b>Connect the tutor</b><p>The tutor uses a real AI model; nothing here is pre-written. ${AI.sampleState === "checking" ? "Checking for Claude…" : ""}</p>
<ul><li><b>Inside Claude</b> (this page opened in claude.ai or the Claude app): uses your own Claude plan; you're asked once to allow it.</li><li><b>Installed app</b>: free Gemini API key, or Ollama on your computer. Set up in <a href="#settings" data-tu="settings">Settings</a>.</li></ul>
<p class="muted">Everything else in ARE Academy works without AI.</p></div>`;
    return;
  }
  if (!log.length) { logEl.innerHTML = `<div class="tu-empty"><p>I can see <b>${esc(ctx.label)}</b>${ctx.obj ? " and your history on " + esc(ARE.DIV[ARE.OBJ[ctx.obj].div].code + " " + ARE.OBJ[ctx.obj].code) : ""}. Pick a mode above or ask anything.</p>${ctx.q ? `<p class="muted">On a question I start with hints. Ask for the full explanation when you're ready.</p>` : ""}</div>`; return; }
  logEl.innerHTML = log.map((m, i) => m.role === "user" ? `<div class="tu-msg me">${esc(m.show || m.content)}</div>` : `<div class="tu-msg ai"><div class="tu-md">${AI.md(m.content)}</div>${m.err ? "" : `<div class="tu-acts"><button data-tu="savenote" data-i="${i}">Save to my learning notes</button><button data-tu="copy" data-i="${i}">Copy</button></div>`}</div>`).join("");
  logEl.scrollTop = logEl.scrollHeight;
}
async function ask(text, mode) {
  if (T.busy) return;
  if (!AI.active()) { renderLog(); return; }
  ctx = AI.context(); key = AI.ctxKey(ctx);
  const show = mode ? "▸ " + AI.MODES[mode].t : text;
  const content = mode ? AI.MODES[mode].p : text;
  AI.pushLog(key, { role: "user", content, show, t: Date.now() });
  if (mode && ctx.obj) AI.noteMode(ctx.obj, AI.MODES[mode].t);
  renderLog();
  const bubble = el(`<div class="tu-msg ai"><div class="tu-md"><span class="muted">Thinking…</span></div></div>`); logEl.appendChild(bubble); logEl.scrollTop = logEl.scrollHeight;
  const ctl = new AbortController(); T.busy = ctl;
  panel.querySelector("#tuStop").hidden = false; panel.querySelector("#tuSend").disabled = true;
  const turns = AI.log(key).slice(-10).map(m => ({ role: m.role, content: m.content }));
  while (turns.length && turns[0].role !== "user") turns.shift();
  const rules = AI.RULES + "\n\n" + ctx.parts.join("\n\n");
  try {
    const r = await AI.call(rules, turns, { signal: ctl.signal, onText: (t) => { bubble.firstChild.innerHTML = AI.md(t); logEl.scrollTop = logEl.scrollHeight; } });
    AI.pushLog(key, { role: "assistant", content: r.text, t: Date.now(), p: r.provider });
  } catch (e) {
    const partial = e && e.text ? e.text + "\n\n" : "";
    AI.pushLog(key, { role: "assistant", content: partial + "_" + AI.errText(e) + "_", err: true, t: Date.now() });
  } finally {
    T.busy = null; panel.querySelector("#tuStop").hidden = true; panel.querySelector("#tuSend").disabled = false; renderLog();
  }
}
T.ask = (text, mode) => { T.toggle(true); ask(text, mode); };
async function onClick(e) {
  const b = e.target.closest("[data-tu]"); if (!b) return;
  const a = b.dataset.tu;
  if (a === "close") T.toggle(false);
  else if (a === "dock") { T.docked = !T.docked; try { localStorage.setItem("are-tutor-dock", T.docked ? "1" : "0"); } catch (x) {} T.toggle(true); }
  else if (a === "stop") { T.busy && T.busy.abort(); }
  else if (a === "settings") { if (window.innerWidth < 1000 || !T.docked) T.toggle(false); }
  else if (a === "mode") ask(null, b.dataset.m);
  else if (a === "copy") { const m = AI.log(key)[+b.dataset.i]; try { await navigator.clipboard.writeText(m.content); b.textContent = "Copied"; } catch (x) {} }
  else if (a === "savenote") {
    const m = AI.log(key)[+b.dataset.i]; const obj = ctx.obj; if (!obj) { ARE.H.toast("Open a lesson or question first so the note has a topic."); return; }
    const n = L.addTrigger(obj, "confused", { via: "tutor" }); n.ai.push({ t: Date.now(), text: m.content, provider: m.p }); if (n.ai.length > 6) n.ai = n.ai.slice(-6);
    E.save(); b.textContent = "Saved to Learning Notes"; b.disabled = true;
  }
  else if (a === "confused") {
    if (!ctx.obj) return; L.addTrigger(ctx.obj, "confused", { via: "tutor" }); E.save();
    ARE.H.toast("Added to My Learning Notes"); ask(null, "simple");
  }
  else if (a === "genq") {
    if (!AI.active()) return renderLog();
    b.disabled = true; b.textContent = "Writing questions…";
    try { const ids = await AI.generateQuestions(ctx, 4); ARE.H.toast(ids.length + " new practice questions added"); if (window.innerWidth < 1000) T.toggle(false); ARE.H.startSession({ qids: ids, mode: "practice", title: "AI practice · " + ctx.label }); }
    catch (x) { ARE.H.toast(AI.errText(x)); }
    finally { b.disabled = false; b.textContent = "Make practice questions"; }
  }
  else if (a === "video") {
    if (window.innerWidth < 1000) T.toggle(false);
    const src = ctx.lesson ? { kind: "lesson", id: ctx.lesson } : ctx.q ? { kind: "question", id: ctx.q } : { kind: "objective", id: ctx.obj };
    ARE.STUDIO.create(src, ctx.q ? "exam" : "standard", { ai: !!AI.active() });
  }
}
window.addEventListener("hashchange", () => setTimeout(T.refresh, 0));
window.addEventListener("resize", () => { if (T.open) document.body.classList.toggle("tutor-docked", T.docked && window.innerWidth >= 1000); });
})();
