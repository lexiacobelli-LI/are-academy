/* ============================================================
   VIEWS: routing, rendering, event handling
   ============================================================ */
(function () {
const E = ARE.E;
const DAY = 86400000;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pct = (x, d = 0) => x === null || x === undefined || isNaN(x) ? "—" : (x * 100).toFixed(d) + "%";
const fmtDate = (t) => new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" });
const fmtMin = (m) => m >= 60 ? (m / 60).toFixed(1) + " h" : Math.round(m) + " min";
const lvPill = (l, c) => `<span class="lv lv${l}"><i></i>${E.LV[l]}</span>${c && (c.outstanding > 0 || (l >= 1 && c.score !== null && c.score < 0.6)) ? ` <span class="lv lvr" title="Has questions you most recently got wrong, or a score under 60%"><i></i>Needs review</span>` : ""}`;
const divCode = (id) => ARE.DIV[id].code;
const objLabel = (key) => { const o = ARE.OBJ[key]; return o ? divCode(o.div) + " " + o.code : key; };
let UI = { libDiv: "all", libQ: "", refTab: "glossary", gq: "", gcat: "all", hbq: "", trackFilter: "all", examDiv: "pcm", examN: 10, examTimed: false, notesQ: "" };
let SESSION = null, timerInt = null, activity = null;

function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}

/* ---------- icons ---------- */
const IC = {
  dashboard: '<path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 9h8V3h-8z"/>',
  library: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15.5-3.5 1z"/>',
  divisions: '<path d="M3 3h18v18H3zM3 9h18M9 9v12"/>',
  exams: '<path d="M9 3h6l1 2h3v16H5V5h3zM9 11h6M9 15h4"/>',
  cases: '<path d="M3 7h18v13H3zM8 7V4h8v3M3 12h18"/>',
  tracker: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  reference: '<path d="M5 3h11l3 3v15H5zM9 9h6M9 13h6M9 17h3"/>',
  planner: '<path d="M4 5h16v16H4zM4 10h16M9 3v4M15 3v4"/>',
  notes: '<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/>',
  data: '<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',
  flashcards: '<path d="M3 7h14v12H3zM7 3h14v12"/>',
  today: '<path d="M4 5h16v15H4zM4 10h16M9 3v4M15 3v4M8 14l2.5 2.5L16 13"/>',
  lnotes: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5"/>',
  studio: '<path d="M3 6h13v12H3zM16 10l5-3v10l-5-3z"/>',
  analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  settings: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .3-1.3-1.3L17 5l-3-1-1 2h-2L10 4 7 5l.3 2L6 8.3 4 8l-1 3 2 1v2l-2 1 1 3 2-.3L7.3 17 7 19l3 1 1-2h2l1 2 3-1-.3-2 1.3-1.3 2 .3 1-3-2-1z"/>',
  badge: '<path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.5 19.5l1-6.3L3 8.9 9 8z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  collapse: '<path d="M4 4h16v16H4zM9 4v16M15 10l-2 2 2 2"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  podcast: '<path d="M9 3h6v10H9zM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  more: '<path d="M5 12h.01M12 12h.01M19 12h.01"/>'
};
const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg>`;
const NAV = [["dashboard", "Home"], ["today", "Today's Study Plan"], ["library", "Study Library"], ["flashcards", "Flashcards"], ["lnotes", "My Learning Notes"], ["studio", "AI Video Studio"], ["divisions", "ARE Divisions"], ["exams", "Practice Exams"], ["cases", "Case Studies"], ["tracker", "Competency Tracker"], ["analytics", "Learning Analytics"], ["reference", "Reference Library"], ["planner", "Study Planner"], ["notes", "My Notes"], ["settings", "Settings"]];

/* ---------- shell ---------- */
/* nav groups: [title, [[route, label], ...]] — order = priority */
const NAVG = [
  [null, [["dashboard", "Home"], ["today", "Today's Plan"]]],
  ["Learn", [["library", "Study Library"], ["divisions", "ARE Divisions"], ["studio", "Video Lessons"], ["podcast", "Podcast"], ["flashcards", "Flashcards"], ["reference", "Reference Library"]]],
  ["Practice", [["exams", "Practice Exams"], ["cases", "Case Studies"]]],
  ["Notes", [["lnotes", "Learning Notes"], ["notes", "My Notes"]]],
  ["Progress", [["tracker", "Competency"], ["analytics", "Analytics"], ["planner", "Study Planner"]]]
];
const BADGE = { exams: "dueBadge", flashcards: "fcBadge", lnotes: "lnBadge" };
let railPref = (() => { try { return JSON.parse(localStorage.getItem("are-rail") || "{}"); } catch (e) { return {}; } })();
const saveRail = () => { try { localStorage.setItem("are-rail", JSON.stringify(railPref)); } catch (e) {} };
function navLink(k, l, cls = "") { return `<a href="#${k}" data-nav="${k}" class="${cls}" title="${esc(l)}">${icon(k)}<span class="nl">${esc(l)}</span>${BADGE[k] ? `<span class="k" id="${BADGE[k]}"></span>` : ""}</a>`; }
function shell() {
  railPref.closed = railPref.closed || {};
  if (railPref.mini === undefined && window.innerWidth > 760 && window.innerWidth <= 1100) railPref.mini = true;
  document.getElementById("app").innerHTML = `
<a class="skip" href="#main" onclick="event.preventDefault();document.getElementById('main').focus()">Skip to content</a>
<div class="app ${railPref.mini ? "mini" : ""}" id="appShell">
  <aside class="rail" id="rail" aria-label="Main navigation">
    <div class="rail-head"><a class="brand" href="#dashboard" aria-label="ARE Academy home"><span class="brand-mark" aria-hidden="true">A</span><span class="brand-t"><b>ARE Academy</b><small>ARE 5.0 · 6 divisions</small></span></a>
      <button class="icon-btn rail-toggle" id="railToggle" aria-label="${railPref.mini ? "Expand" : "Collapse"} sidebar" aria-expanded="${!railPref.mini}">${icon("collapse")}</button></div>
    <div class="rail-search"><div class="searchbox">${icon("search")}<input id="gsearch" type="search" placeholder="Search" aria-label="Search lessons, terms and questions"></div></div>
    <nav class="nav" id="nav">${NAVG.map(([g, items], gi) => g ? `<div class="ngroup ${railPref.closed[g] ? "closed" : ""}" data-g="${g}"><button class="ng-h" data-ng="${g}" aria-expanded="${!railPref.closed[g]}"><span>${g}</span>${icon("chev")}</button><div class="ng-items">${items.map(([k, l]) => navLink(k, l)).join("")}</div></div>` : `<div class="ngroup top">${items.map(([k, l]) => navLink(k, l)).join("")}</div>`).join("")}</nav>
    <div class="rail-foot">${navLink("settings", "Settings")}${navLink("data", "Backup & data")}<div class="sync" id="sync"><i></i><span>Saved on this device</span></div></div>
  </aside>
  <div class="content" id="scroller">
    <header class="topbar"><a class="brand" href="#dashboard"><span class="brand-mark" aria-hidden="true">A</span><b>ARE Academy</b></a><span class="tb-title" id="tbTitle"></span><a class="icon-btn" href="#search" aria-label="Search">${icon("search")}</a></header>
    <div class="savebar" id="saveBar" role="alert" hidden></div>
    <main class="main" id="main" tabindex="-1"></main>
  </div>
</div>
<nav class="bottomnav" id="bottomNav" aria-label="Main">${[["dashboard", "Home"], ["today", "Today"], ["library", "Learn"], ["exams", "Practice"], ["more", "More"]].map(([k, l]) => `<a href="#${k === "more" ? "dashboard" : k}" data-bn="${k}" ${k === "more" ? 'role="button" aria-haspopup="dialog" aria-label="More pages"' : ""}>${icon(k === "more" ? "menu" : k === "library" ? "library" : k)}<span>${l}</span>${k === "exams" ? '<i class="bn-dot" id="bnDue" hidden></i>' : ""}</a>`).join("")}</nav>
<div class="sheet-scrim" id="moreScrim" hidden></div>
<div class="sheet" id="moreSheet" role="dialog" aria-modal="true" aria-label="All pages" hidden><div class="sheet-grab" aria-hidden="true"></div>
${NAVG.slice(1).map(([g, items]) => `<div class="sh-group"><h3>${g}</h3><div class="sh-grid">${items.map(([k, l]) => `<a href="#${k}" data-sheet>${icon(k)}<span>${esc(l)}</span></a>`).join("")}</div></div>`).join("")}
<div class="sh-group"><div class="sh-grid">${[["settings", "Settings"], ["data", "Backup & data"], ["search", "Search"]].map(([k, l]) => `<a href="#${k}" data-sheet>${icon(k === "search" ? "search" : k)}<span>${l}</span></a>`).join("")}</div></div></div>
<div class="celebrate" id="celebrate" aria-live="polite"></div>`;
  const sheet = $("#moreSheet"), scrim = $("#moreScrim");
  const openSheet = (o) => { sheet.hidden = !o; scrim.hidden = !o; document.body.classList.toggle("sheet-open", o); if (o) { const f = sheet.querySelector("a"); f && f.focus(); } };
  ARE.openMore = openSheet;
  $("#bottomNav").addEventListener("click", (e) => { const a = e.target.closest("[data-bn=more]"); if (a) { e.preventDefault(); openSheet(sheet.hidden); } });
  scrim.addEventListener("click", () => openSheet(false));
  sheet.addEventListener("click", (e) => { if (e.target.closest("[data-sheet]")) openSheet(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) openSheet(false); });
  // swipe the sheet down to close
  let sy = null; sheet.addEventListener("touchstart", e => { sy = e.touches[0].clientY; }, { passive: true }); sheet.addEventListener("touchend", e => { if (sy !== null && e.changedTouches[0].clientY - sy > 70) openSheet(false); sy = null; });
  $("#railToggle").addEventListener("click", () => { railPref.mini = !railPref.mini; saveRail(); $("#appShell").classList.toggle("mini", railPref.mini); const t = $("#railToggle"); t.setAttribute("aria-expanded", !railPref.mini); t.setAttribute("aria-label", (railPref.mini ? "Expand" : "Collapse") + " sidebar"); });
  $("#nav").addEventListener("click", (e) => { const h = e.target.closest("[data-ng]"); if (!h) return; const g = h.dataset.ng, box = h.parentElement; const closed = !box.classList.contains("closed"); box.classList.toggle("closed", closed); h.setAttribute("aria-expanded", !closed); railPref.closed[g] = closed; saveRail(); });
  // independent scrolling: keep wheel/touch inside the rail when it can scroll
  const rail = $("#rail"); rail.addEventListener("wheel", (e) => { if (rail.scrollHeight > rail.clientHeight) e.stopPropagation(); }, { passive: true });
  // if the host sizes the frame to the content (no fixed viewport), fall back to document scrolling
  const checkShell = () => document.documentElement.classList.toggle("doc-scroll", window.innerHeight > 3000);
  checkShell(); window.addEventListener("resize", checkShell);
  updateSync();
}
function updateSync() {
  const el = $("#sync"); if (!el) return;
  const on = E.sync.status === "synced";
  el.className = "sync" + (on ? " on" : "");
  el.querySelector("span").textContent = on ? "Synced to your account" : "Saved in this browser";
}
E.onSync = (reloaded) => { updateSync(); if (reloaded) { toast("Progress loaded from your account"); route(); } };

/* ---------- routing ---------- */
function navKey(h) {
  if (h.startsWith("div-")) return "divisions"; if (h.startsWith("lesson-")) return "library"; if (h.startsWith("note-")) return "lnotes";
  if (h.startsWith("case-")) return "cases"; if (h === "quiz") return SESSION && SESSION.caseId ? "cases" : "exams"; return h;
}
function route() {
  const h = (location.hash || "#dashboard").slice(1) || "dashboard";
  if (!(activity && activity.h === h)) stopActivity();
  const main = $("#main");
  const nk = navKey(h);
  $$("#rail a[data-nav]").forEach(a => { const on = a.dataset.nav === nk; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const og = $(`#rail a[data-nav="${nk}"]`); if (og) { const g = og.closest(".ngroup"); if (g && g.classList.contains("closed")) { g.classList.remove("closed"); } }
  const tt = $("#tbTitle"); if (tt) { const lab = NAVG.flatMap(x => x[1]).concat([["settings", "Settings"], ["data", "Backup & data"], ["search", "Search"]]).find(x => x[0] === nk); tt.textContent = lab && nk !== "dashboard" ? lab[1] : ""; }
  clearInterval(timerInt);
  let html;
  if (h === "dashboard") html = vDashboard();
  else if (h === "library") html = vLibrary();
  else if (h === "divisions") html = vDivisions();
  else if (h.startsWith("div-") && ARE.DIV[h.slice(4)]) html = vDivision(h.slice(4));
  else if (h.startsWith("lesson-") && E.LMAP[h.slice(7)]) { html = vLesson(h.slice(7)); startActivity("lesson", E.LMAP[h.slice(7)].div); markViewed(h.slice(7)); }
  else if (h === "exams") html = vExams();
  else if (h === "quiz") { SESSION = SESSION || E.loadSession(); if (!SESSION) { location.hash = "#exams"; return; } SESSION.qids.forEach(id => E.ensureQ(id)); Object.assign(SESSION, { strike: SESSION.strike || {}, hl: SESSION.hl || {}, view: SESSION.view || "item" }); html = vQuiz(); if (!SESSION.done) startActivity("quiz", SESSION.div); }
  else if (h === "cases") html = vCases();
  else if (h.startsWith("case-") && ARE.CASES.find(c => c.id === h)) { html = vCaseIntro(h); }
  else if (h === "tracker") html = vTracker();
  else if (h === "reference") html = vReference();
  else if (h === "planner") html = vPlanner();
  else if (h === "notes") html = vNotes();
  else if (h === "data") html = vData();
  else if (h === "flashcards") html = vFlashcards();
  else if (h === "search") html = vSearch();
  else if (ARE.ROUTE && (html = ARE.ROUTE(h)) !== null) {}
  else html = vDashboard();
  ARE.CTX = { page: h.split("-")[0], lesson: h.startsWith("lesson-") ? h.slice(7) : null, div: h.startsWith("div-") ? h.slice(4) : (h.startsWith("lesson-") && E.LMAP[h.slice(7)] ? E.LMAP[h.slice(7)].div : null), caseId: h.startsWith("case-") ? h : null, note: h.startsWith("note-") ? h.slice(5) : null };
  if (h === "quiz" && SESSION && !SESSION.done) { const q = E.QMAP[SESSION.qids[SESSION.i]]; ARE.CTX = { page: "quiz", qid: q.id, answered: !!SESSION.checked[q.id], chosen: typeof SESSION.resp[q.id] === "number" ? SESSION.resp[q.id] : null, div: q.div, caseId: q.case || null }; }
  document.body.classList.toggle("exam-mode", h === "quiz" && !!SESSION && SESSION.mode === "exam" && !SESSION.done);
  { const bk = ["dashboard", "today", "exams"].includes(nk) ? nk : ["library", "divisions", "studio", "flashcards", "reference"].includes(nk) ? "library" : nk === "cases" ? "exams" : "more"; $$("#bottomNav a").forEach(a => { const on = a.dataset.bn === bk; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }); }
  if (h !== "quiz" && ARE.UI) ARE.UI.hideTools();
  main.innerHTML = `<div class="wrap${h === "quiz" && SESSION && SESSION.mode === "exam" && !SESSION.done ? " wide" : ""}">${html}</div>`;
  const due = E.dueIds().length; const b = $("#dueBadge"); if (b) b.textContent = due ? String(due) : ""; const bd = $("#bnDue"); if (bd) bd.hidden = !due;
  const fcd = fcDue().length; const fb = $("#fcBadge"); if (fb) fb.textContent = fcd ? String(fcd) : "";
  const lnb = $("#lnBadge"); if (lnb) { const n = ARE.L.activeNotes().length; lnb.textContent = n ? String(n) : ""; }
  afterRender(h);
  ARE.TUTOR && ARE.TUTOR.refresh();
  if (!routeKeepScroll) setScroll(0);
  routeKeepScroll = false;
}
let routeKeepScroll = false;
const scroller = () => document.documentElement.classList.contains("doc-scroll") ? null : $("#scroller");
function getScroll() { const s = scroller(); return s ? s.scrollTop : window.scrollY; }
function setScroll(y) { const s = scroller(); if (s) s.scrollTop = y; else window.scrollTo(0, y); }
function rerender() { routeKeepScroll = true; const y = getScroll(); route(); setScroll(y); }
function afterRender(h) {
  if (ARE.AFTER) try { ARE.AFTER(h); } catch (e) { console.warn(e); }
  if (h === "quiz" && SESSION && !SESSION.done) { bindQuizDom(); applyHighlights(); tick(); timerInt = setInterval(tick, 1000); }
  $$(".calcbox").forEach(runCalc);
  const big = $("#fcBig");
  if (big) { let x0 = null, dx = 0; big.addEventListener("pointerdown", e => { x0 = e.clientX; dx = 0; }); big.addEventListener("pointermove", e => { if (x0 === null) return; dx = e.clientX - x0; if (Math.abs(dx) > 8) big.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg)`; });
    const end = () => { if (x0 === null) return; const d = dx; x0 = null; big.style.transform = ""; if (Math.abs(d) > 90) { big.dataset.swiped = "1"; if (!UI.fcFlip) { UI.fcFlip = true; rerender(); setTimeout(() => fcRate(d > 0), 350); } else fcRate(d > 0); } };
    big.addEventListener("pointerup", end); big.addEventListener("pointercancel", end); big.addEventListener("pointerleave", end); }
  const ti = $("#fcTypeIn"); if (ti) { ti.focus(); ti.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $("[data-act=fctype]").click(); } }); }
  tocSecs = null; hideTerm();
  if (h.startsWith("lesson-")) { tocSecs = $$(".lesson-toc a[data-target]").map(a => ({ a, el: document.getElementById(a.dataset.target) })).filter(x => x.el); setTimeout(updateToc, 0);
    $$(".prose .term").forEach(t => { t.addEventListener("mouseenter", () => showTerm(t)); t.addEventListener("mouseleave", hideTerm); t.addEventListener("focus", () => showTerm(t)); t.addEventListener("blur", hideTerm); t.addEventListener("click", (e) => { e.stopPropagation(); termPop && !termPop.hidden && termPop.innerHTML.includes(esc(t.dataset.term)) ? hideTerm() : showTerm(t); }); });
    bindLessonInteractive(); if (!progBar) { progBar = document.createElement("div"); progBar.className = "readbar"; document.body.appendChild(progBar); } progBar.hidden = false; updateProgress(); }
  else if (progBar) progBar.hidden = true;
}

/* ---------- activity time ---------- */
function startActivity(kind, div) { const h = (location.hash || "").slice(1); if (activity && activity.h === h) return; activity = { kind, div, h, t0: Date.now(), acc: 0 }; }
function stopActivity() {
  if (!activity) return;
  if (!document.hidden) activity.acc += Date.now() - activity.t0;
  E.addTime(activity.acc / 60000, activity.kind, activity.div);
  activity = null;
}
document.addEventListener("visibilitychange", () => {
  if (!activity) return;
  if (document.hidden) activity.acc += Date.now() - activity.t0; else activity.t0 = Date.now();
});
window.addEventListener("pagehide", stopActivity);

function markViewed(id) { if (!E.S.lessons[id]) { E.S.lessons[id] = { viewed: Date.now() }; E.save(); } }

/* ---------- interactive lesson widgets ---------- */
const fmtN = (v, d = 0) => (+v).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d });
const TRY = {
  slope: { t: "Slope", i: [["rise", "Rise (ft)", 0.5, 20, 0.5, 3], ["run", "Run (ft)", 5, 200, 5, 60]], o: v => { const p = v.rise / v.run * 100; return `<b>${fmtN(p, 2)}%</b> (1:${fmtN(v.run / v.rise, 1)}) · ${p <= 5 ? "walkable accessible route" : p <= 8.33 ? "ramp territory (≤ 1:12)" : "too steep for an accessible ramp"}`; } },
  far: { t: "Buildable floor area", i: [["lot", "Lot area (sf)", 5000, 60000, 1000, 24000], ["far", "FAR", 0.25, 5, 0.25, 1.5], ["cov", "Max coverage (%)", 10, 100, 5, 40], ["st", "Max stories", 1, 10, 1, 3]], o: v => { const a = v.lot * v.far, b = v.lot * v.cov / 100 * v.st; return `FAR limit ${fmtN(a)} sf · coverage × stories ${fmtN(b)} sf → <b>${fmtN(Math.min(a, b))} sf</b> (${a <= b ? "FAR" : "coverage and height"} governs)`; } },
  gross: { t: "Net to gross", i: [["net", "Net assignable (sf)", 2000, 60000, 500, 18200], ["eff", "Efficiency", 0.5, 0.9, 0.01, 0.7]], o: v => `<b>${fmtN(v.net / v.eff)} gsf</b> · non-assignable ${fmtN(v.net / v.eff - v.net)} sf` },
  ol: { t: "Occupant load", i: [["a", "Area (sf)", 500, 40000, 100, 6000], ["f", "Load factor (sf/occ)", 5, 300, 1, 50]], o: v => { const n = Math.ceil(v.a / v.f - 1e-9); return `<b>${n} occupants</b> · ${n > 49 ? "two exits or exit access doorways needed" : "one exit may be allowed (check common path)"}`; } },
  width: { t: "Egress width", i: [["n", "Occupants", 10, 1000, 10, 240], ["sp", "Sprinklers + voice alarm (0/1)", 0, 1, 1, 0]], o: v => { const st = v.n * (v.sp ? 0.2 : 0.3), ot = v.n * (v.sp ? 0.15 : 0.2); return `Stairs <b>${fmtN(st, 1)} in</b> · doors/corridors <b>${fmtN(ot, 1)} in</b> · then check code minimums (44 in stairs, 32 in door clear)`; } },
  heat: { t: "Heat loss through a wall", i: [["r", "Total R-value", 2, 50, 0.5, 20], ["a", "Area (sf)", 100, 5000, 50, 1200], ["dt", "ΔT (°F)", 10, 100, 1, 70]], o: v => `U = ${fmtN(1 / v.r, 3)} · <b>Q = ${fmtN(v.a * v.dt / v.r)} Btu/h</b>` },
  beam: { t: "Schematic steel beam depth", i: [["s", "Span (ft)", 10, 60, 1, 30]], o: v => `≈ <b>${fmtN(v.s / 2)} in</b> deep (W${Math.ceil(v.s / 2 / 2) * 2}) · flat plate ≈ ${fmtN(v.s * 12 / 30, 1)} in thick` },
  allow: { t: "Allowable area with frontage", i: [["at", "At (sf)", 5000, 100000, 500, 38000], ["ns", "NS (sf)", 2000, 40000, 500, 9500], ["f", "Frontage F (ft)", 0, 800, 10, 300], ["p", "Perimeter P (ft)", 100, 1000, 10, 400], ["w", "Open width W (ft, max 30)", 20, 30, 1, 30]], o: v => { const ifv = Math.max(0, (v.f / v.p - 0.25) * v.w / 30); return `I<sub>f</sub> = ${fmtN(ifv, 2)} · <b>A<sub>a</sub> = ${fmtN(v.at + v.ns * ifv)} sf</b>`; } },
  trib: { t: "Tributary loads", i: [["psf", "Load (psf)", 20, 250, 5, 80], ["tw", "Tributary width (ft)", 2, 40, 1, 10], ["l", "Beam span (ft)", 6, 60, 1, 24]], o: v => { const w = v.psf * v.tw; return `w = <b>${fmtN(w)} plf</b> · M = wL²/8 = <b>${fmtN(w * v.l * v.l / 8)} ft-lb</b> · R = ${fmtN(w * v.l / 2)} lb`; } },
  duct: { t: "Duct size", i: [["q", "Airflow (cfm)", 100, 20000, 100, 2400], ["v", "Velocity (fpm)", 400, 2500, 50, 1200]], o: v => { const a = v.q / v.v; return `<b>${fmtN(a, 2)} sf</b> (${fmtN(a * 144)} sq in) · e.g. ${fmtN(Math.ceil(a * 144 / 12))} × 12 in`; } },
  fixtures: { t: "Water closets (Group B ratios)", i: [["n", "Occupants of one sex", 5, 400, 5, 60]], o: v => { const n = v.n; const wc = Math.ceil(Math.min(n, 50) / 25) + (n > 50 ? Math.ceil((n - 50) / 50) : 0); const lav = Math.ceil(Math.min(n, 80) / 40) + (n > 80 ? Math.ceil((n - 80) / 80) : 0); return `<b>${wc} water closets</b> · ${lav} lavatories (1 per 25 for first 50, 1 per 50 after; lavs 1 per 40 for first 80, 1 per 80 after)`; } },
  budget: { t: "Total project budget", i: [["gsf", "Gross area (sf)", 2000, 100000, 1000, 24000], ["c", "Cost today ($/sf)", 150, 900, 10, 410], ["y", "Years to midpoint", 0, 5, 0.5, 2], ["e", "Escalation (%/yr)", 0, 10, 0.5, 4], ["s", "Soft costs (%)", 10, 45, 1, 25]], o: v => { const cc = v.gsf * v.c * Math.pow(1 + v.e / 100, v.y); return `Construction $${fmtN(cc)} · soft $${fmtN(cc * v.s / 100)} · <b>total $${fmtN(cc * (1 + v.s / 100))}</b>`; } },
  pay: { t: "Current payment due", i: [["c", "Completed ($)", 0, 2000000, 10000, 600000], ["st", "Stored ($)", 0, 200000, 5000, 40000], ["r", "Retainage (%)", 0, 15, 1, 10], ["p", "Previous certificates ($)", 0, 2000000, 10000, 450000]], o: v => { const t = v.c + v.st, ret = t * v.r / 100; return `Retainage $${fmtN(ret)} · <b>due $${fmtN(Math.max(0, t - ret - v.p))}</b>`; } },
  ev: { t: "Earned value", i: [["bac", "Budget BAC ($)", 10000, 200000, 1000, 60000], ["pc", "% complete", 0, 100, 1, 40], ["ac", "Actual cost ($)", 1000, 200000, 1000, 32000], ["pv", "Planned value ($)", 1000, 200000, 1000, 30000]], o: v => { const ev = v.bac * v.pc / 100, cpi = ev / v.ac, spi = ev / v.pv; return `EV $${fmtN(ev)} · CPI <b>${fmtN(cpi, 2)}</b> · SPI <b>${fmtN(spi, 2)}</b> · EAC <b>$${fmtN(cpi ? v.bac / cpi : 0)}</b> ${cpi < 1 ? "(over budget)" : "(on or under budget)"}`; } },
  firm: { t: "Firm financial ratios", i: [["nor", "Net operating revenue ($)", 200000, 5000000, 10000, 1950000], ["dl", "Direct labor ($)", 50000, 2000000, 10000, 560000], ["ie", "Indirect expenses ($)", 50000, 3000000, 10000, 952000]], o: v => { const nm = v.nor / v.dl, oh = v.ie / v.dl; return `Net multiplier <b>${fmtN(nm, 2)}</b> · OH rate ${fmtN(oh, 2)} · break-even <b>${fmtN(1 + oh, 2)}</b> · profit $${fmtN(v.nor - v.dl - v.ie)}`; } },
  util: { t: "Utilization", i: [["b", "Billable hours", 0, 2080, 10, 1560], ["t", "Total hours paid", 1000, 2600, 10, 2080]], o: v => `<b>${fmtN(v.b / v.t * 100, 1)}%</b> utilization` }
};
function tryWidget(k) {
  const T = TRY[k];
  return `<div class="panel stack trybox" data-try="${k}"><h3>${esc(T.t)}</h3>${T.i.map(([key, lab, mn, mx, st, val]) => `<label class="slider"><span>${esc(lab)} <b class="mono" data-val="${key}">${fmtN(val, st < 1 ? 2 : 0)}</b></span><input type="range" min="${mn}" max="${mx}" step="${st}" value="${val}" data-k="${key}" aria-label="${esc(lab)}"></label>`).join("")}<div class="tryout" data-tryout></div></div>`;
}
function runTry(box) {
  const T = TRY[box.dataset.try], v = {};
  $$("input[type=range]", box).forEach(i => { v[i.dataset.k] = +i.value; const st = +i.step; const b = $(`[data-val="${i.dataset.k}"]`, box); if (b) b.textContent = fmtN(+i.value, st < 1 ? 2 : 0); });
  $("[data-tryout]", box).innerHTML = T.o(v);
}
function bindLessonInteractive() {
  $$(".trybox").forEach(runTry);
  const fig = $(".lfig");
  if (fig) $$(".tip", fig).forEach(g => {
    g.setAttribute("tabindex", "0"); g.setAttribute("role", "button");
    const [t, d] = (g.dataset.tip || "").split("|");
    g.setAttribute("aria-label", t);
    const show = () => { $$(".tip", fig).forEach(x => x.classList.toggle("on", x === g)); const box = $("#tipbox"); if (box) box.innerHTML = `<b>${esc(t)}</b><p style="margin-top:4px">${esc(d || "")}</p>`; };
    g.addEventListener("click", show); g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
  });
}
let progBar = null;
function updateProgress() {
  if (!progBar) return;
  const s = scroller(); const h = s ? s.scrollHeight - s.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
  progBar.style.width = (h > 0 ? Math.min(100, getScroll() / h * 100) : 100) + "%";
}
let tocSecs = null;
function updateToc() {
  if (!tocSecs) return; const top = (scroller() ? scroller().getBoundingClientRect().top : 0) + 110;
  let cur = tocSecs[0]; tocSecs.forEach(x => { if (x.el.getBoundingClientRect().top <= top) cur = x; });
  tocSecs.forEach(x => x.a.classList.toggle("on", x === cur));
  const pr = $("#tocProg"); if (pr && progBar) pr.style.width = progBar.style.width;
}
let termPop = null;
function showTerm(el) {
  const g = E.glossary.find(x => x.term === el.dataset.term); if (!g) return;
  if (!termPop) { termPop = document.createElement("div"); termPop.className = "termpop"; termPop.setAttribute("role", "tooltip"); document.body.appendChild(termPop); }
  termPop.innerHTML = `<b>${esc(g.term)}</b>${esc(g.def)}`; termPop.hidden = false;
  const r = el.getBoundingClientRect(), w = Math.min(300, window.innerWidth - 24);
  termPop.style.left = Math.max(12, Math.min(window.innerWidth - w - 12, r.left)) + "px";
  const below = r.bottom + 8, ph = termPop.offsetHeight;
  termPop.style.top = (below + ph > window.innerHeight - 70 ? r.top - ph - 8 : below) + "px";
}
function hideTerm() { if (termPop) termPop.hidden = true; }
const onScroll = () => { hideTerm(); if (progBar) requestAnimationFrame(() => { updateProgress(); updateToc(); }); const y = getScroll(); document.body.classList.toggle("scrolled-down", y > 120 && y > (onScroll.last || 0)); onScroll.last = y; };
window.addEventListener("scroll", onScroll, { passive: true });
document.addEventListener("scroll", (e) => { if (e.target && e.target.id === "scroller") onScroll(); }, { passive: true, capture: true });

/* ---------- shared bits ---------- */
function bar(v, color) { return `<div class="bar"><span style="width:${Math.round(Math.max(0, Math.min(1, v)) * 100)}%;${color ? "background:" + color : ""}"></span></div>`; }
function distBar(dist) {
  const tot = dist.reduce((a, b) => a + b, 0) || 1;
  return `<div class="bar stack" role="img" aria-label="${dist.map((n, i) => n + " " + E.LV[i]).join(", ")}">${dist.map((n, i) => n ? `<span style="width:${n / tot * 100}%;background:var(--l${i})"></span>` : "").join("")}</div>`;
}
function bookmarked(kind, id) { return E.S.bookmarks.some(b => b.kind === kind && b.id === id); }
function bmBtn(kind, id, label) { const on = bookmarked(kind, id); return `<button class="btn small ghost" data-act="bm" data-kind="${kind}" data-id="${esc(id)}" data-label="${esc(label)}" aria-pressed="${on}">${on ? "★ Bookmarked" : "☆ Bookmark"}</button>`; }
function refLink(text) { const u = ARE.IBC.urlFor(text); return esc(text) + (u ? ` <a href="${u}" target="_blank" rel="noopener" title="Open in ICC Digital Codes">ICC ↗</a>` : ""); }
function hbRefs(key) { return (ARE.HB_OBJ[key] || []).map(([sec, pg, t]) => ({ sec, pg, t, s: ARE.HB_SEC[sec] })); }
function hbRefLine(r) { return `<span class="mono">§${r.sec}</span> ${esc(r.s ? r.s.t : "")} · p. ${esc(r.pg)} <span class="muted">· ${esc(r.t)}</span>`; }
function hbTopicsFor(objs) { return ARE.HANDBOOK.topics.filter(t => t.objs.some(o => objs.includes(o))); }

/* ---------- charts ---------- */
function barChart(vals, labels, opts = {}) {
  const W = 560, H = 160, pad = 24, n = vals.length, max = Math.max(opts.target || 0, ...vals, 1);
  const bw = (W - pad * 2) / n;
  const y = (v) => H - 22 - (v / max) * (H - 40);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label || "chart")}"><line class="ax" x1="${pad}" y1="${H - 22}" x2="${W - pad}" y2="${H - 22}"/>`;
  vals.forEach((v, i) => {
    const x = pad + i * bw + bw * 0.18, w = bw * 0.64, yy = y(v);
    s += `<rect class="b" x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(0, H - 22 - yy).toFixed(1)}" rx="2"><title>${esc(labels[i])}: ${opts.fmt ? opts.fmt(v) : v}</title></rect>`;
    if (labels[i] && (n <= 14 || i % 2 === 0)) s += `<text class="lbl" x="${(x + w / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(labels[i])}</text>`;
  });
  if (opts.target) s += `<line class="tgt" x1="${pad}" x2="${W - pad}" y1="${y(opts.target)}" y2="${y(opts.target)}"/><text class="lbl" x="${W - pad}" y="${y(opts.target) - 4}" text-anchor="end">target ${opts.fmt ? opts.fmt(opts.target) : opts.target}</text>`;
  s += `<text class="lbl" x="${pad}" y="12">${opts.fmt ? opts.fmt(max) : max}</text></svg>`;
  return `<div class="chart">${s}</div>`;
}
function lineChart(pts, labels, label) {
  const W = 560, H = 170, pad = 30;
  if (!pts.length) return `<div class="empty">Answer questions on at least two different weeks to see a trend.</div>`;
  const x = (i) => pad + (pts.length === 1 ? (W - 2 * pad) / 2 : i * (W - 2 * pad) / (pts.length - 1));
  const y = (v) => H - 24 - v * (H - 44);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">`;
  [0, 0.5, 1].forEach(g => s += `<line class="ax" x1="${pad}" x2="${W - pad}" y1="${y(g)}" y2="${y(g)}"/><text class="lbl" x="4" y="${y(g) + 3}">${g * 100}%</text>`);
  s += `<polyline class="ln" points="${pts.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ")}"/>`;
  pts.forEach((v, i) => { s += `<circle class="pt" cx="${x(i)}" cy="${y(v)}" r="${i === pts.length - 1 ? 4.5 : 3}"><title>${labels[i]}: ${pct(v)}</title></circle><text class="lbl" x="${x(i)}" y="${H - 6}" text-anchor="middle">${esc(labels[i])}</text>`; });
  return `<div class="chart">${s}</svg></div>`;
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function ring(v, label) {
  const r = 56, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(1, v || 0)));
  return `<div class="ring" role="img" aria-label="${label} ${pct(v)}"><svg viewBox="0 0 132 132"><circle class="bg" cx="66" cy="66" r="${r}"/><circle class="fg" cx="66" cy="66" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><b>${pct(v)}<small>${label}</small></b></div>`;
}
function vDashboard() {
  const L = ARE.L, ov = E.overall(), recs = E.recommend(), top = recs[0];
  const st = L.streak(), plan = L.todayPlan(), pdone = plan ? plan.steps.filter(x => x.done).length : 0;
  const due = E.dueIds().length + fcDue().length, notes = L.activeNotes();
  const P = E.S.planner, dte = P.examDate ? Math.ceil((new Date(P.examDate + "T00:00") - Date.now()) / DAY) : null;
  const all = Object.keys(ARE.OBJ).map(k => E.comp(k)); const dist = [0, 0, 0, 0, 0]; all.forEach(c => dist[c.level]++);
  const exams = E.S.results.filter(r => r.mode === "exam" || r.mode === "case" || r.mode === "official" || r.form).slice(-8);
  const weakObjs = all.filter(c => c.n >= 3 && (c.outstanding > 0 || c.score < 0.6)).sort((x, y) => x.score - y.score);
  const reviewList = notes.slice(0, 5).map(n => ({ k: n.obj, href: "#note-" + n.obj, why: "Learning note" })).concat(weakObjs.filter(c => !notes.some(n => n.obj === c.key)).slice(0, 5 - Math.min(5, notes.length)).map(c => ({ k: c.key, href: "#div-" + ARE.OBJ[c.key].div, why: pct(c.score) })));
  const lvCol = ["var(--l0)", "var(--l1)", "var(--l2)", "var(--l3)", "var(--l4)"];
  const g = new Date().getHours(), hello = g < 12 ? "Good morning" : g < 18 ? "Good afternoon" : "Good evening";
  return `
<header class="phead"><div class="stack"><span class="eyebrow">${new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span><h1>${hello}</h1></div>
${dte !== null && dte >= 0 ? `<a class="chip code" href="#planner">${dte} day${dte === 1 ? "" : "s"} to ${P.divs.map(divCode).join(", ") || "your exam"}</a>` : `<a class="btn small" href="#planner">Set an exam date</a>`}</header>

<div class="dash">
<section class="panel d-hero" aria-labelledby="nbsH">${ring(ov.readiness, "Ready")}
  <div class="stack" style="gap:10px"><span class="eyebrow">Next best study activity</span><h2 id="nbsH">${esc(top.title)}</h2><p class="why">${esc(top.why)}</p>
  <div class="row"><button class="btn primary" ${actAttrs(top.act)}>Start now</button>${recs[1] ? `<button class="btn ghost alt-btn" ${actAttrs(recs[1].act)} title="${esc(recs[1].why)}">or ${esc(recs[1].title.replace(/^Start /, "").length > 44 ? recs[1].title.replace(/^Start /, "").slice(0, 42) + "…" : recs[1].title.replace(/^Start /, ""))}</button>` : ""}</div>
  <div class="muted" style="font-size:var(--t-xs)">${ov.n} answers · ${pct(ov.acc)} accuracy · readiness combines objective coverage with recent exam scores</div></div></section>

<div class="d-side">
  <a class="d-stat streak" href="#analytics"><span class="ds-i">${icon("badge")}</span><span><b>${st.days} day${st.days === 1 ? "" : "s"}</b><small>${st.today ? "Streak · today counts ✓" : "Streak · " + (st.need ? st.need + " answers to keep it today" : "study today to keep it")}</small></span><span class="ds-go">›</span></a>
  <a class="d-stat plan" href="#today"><span class="ds-i">${icon("today")}</span><span style="flex:1;min-width:0"><b>${plan ? pdone + " of " + plan.steps.length + " steps" : "Today's plan"}</b><small>${plan ? (plan.finished ? "Done for today ✓" : plan.min + "-minute session · continue") : "Build a 15–60 minute session"}</small>${plan ? bar(pdone / plan.steps.length, "var(--ok)") : ""}</span><span class="ds-go">›</span></a>
  <a class="d-stat review" href="${due ? "#flashcards" : "#lnotes"}"><span class="ds-i">${icon("lnotes")}</span><span><b>${due} due · ${notes.length} note${notes.length === 1 ? "" : "s"}</b><small>Concepts needing review</small></span><span class="ds-go">›</span></a>
</div>

<section class="panel d-div"><div class="sec-h"><h2>Six divisions</h2><a href="#tracker">Competency tracker →</a></div>
${ARE.DIVISIONS.map(d => { const ds = E.divStats(d.id); const tot = ds.dist.reduce((x, y) => x + y, 0) || 1; return `<a class="dv-row" href="#div-${d.id}"><span class="dv-code">${d.code}</span><span style="min-width:0"><span class="dv-n">${esc(d.name)}</span><span class="seg" aria-hidden="true">${[4, 3, 2, 1].map(i => ds.dist[i] ? `<i style="flex:${ds.dist[i] / tot};background:${lvCol[i]}"></i>` : "").join("")}<i style="flex:${ds.dist[0] / tot};background:transparent"></i></span></span><span class="dv-pct" title="${E.readyLabel(ds.readiness)}">${pct(ds.readiness)}</span></a>`; }).join("")}
<div class="comp-legend" style="margin-top:12px">${[4, 3, 2, 1, 0].map(i => lvPill(i)).join("")}</div></section>

<section class="panel d-rev"><div class="sec-h"><h2>Needs review</h2><a href="#lnotes">All notes →</a></div>
${reviewList.length ? reviewList.map(x => `<a class="rv-item" href="${x.href}"><span class="chip code">${objLabel(x.k)}</span><span class="t">${esc(ARE.OBJ[x.k].title)}</span><span class="muted" style="font-size:var(--t-xs)">${esc(x.why)}</span></a>`).join("") : `<div class="empty"><span>Nothing flagged yet. Concepts you miss will collect here automatically.</span><button class="btn small" data-act="interleave">Try a mixed set</button></div>`}
<div class="quick-row" style="margin-top:12px"><button class="btn small" data-act="quick5">5-minute review</button><button class="btn small" data-act="review-due" ${E.dueIds().length ? "" : "disabled"}>Due questions (${E.dueIds().length})</button><button class="btn small" data-act="challenge">${L.dailyChallenge().done ? "Challenge done ✓" : "Daily challenge"}</button></div></section>

<section class="panel d-exam"><div class="sec-h"><h2>Recent exam performance</h2><a href="#exams">Practice exams →</a></div>
${exams.length ? `<div class="ex-bars" role="img" aria-label="Last ${exams.length} exam scores">${exams.map(r => { const p = r.correct / r.n; return `<a class="ex-bar" href="#exams" title="${esc(r.title)} · ${fmtDate(r.t)}"><b>${Math.round(p * 100)}</b><i class="${p < 0.7 ? "lo" : ""}" style="height:${Math.max(4, Math.round(p * 100))}%"></i><small>${esc(r.div ? divCode(r.div) : "Mix")}${r.form ? " " + (r.form === "R" ? "R" : r.form) : ""}</small></a>`; }).join("")}</div><p class="muted" style="font-size:var(--t-xs);margin-top:8px">Bars below 70% are amber. Timed forms, case studies and logged NCARB practice exams count.</p>` : `<div class="empty"><span>No timed exams yet. A practice form shows how you'd do under real conditions.</span><a class="btn small primary" href="#exams">Choose a practice exam</a></div>`}</section>

<section class="panel d-comp"><div class="sec-h"><h2>Competency overview</h2><a href="#analytics">Analytics →</a></div>
<div class="seg" style="height:12px;margin:4px 0 14px" role="img" aria-label="Objectives by level">${[4, 3, 2, 1, 0].map(i => dist[i] ? `<i style="flex:${dist[i]};background:${lvCol[i]}" title="${E.LV[i]}: ${dist[i]}"></i>` : "").join("")}</div>
<div class="grid g2" style="gap:10px">${[4, 3, 2, 1, 0].map(i => `<div class="row between" style="flex-wrap:nowrap">${lvPill(i)}<b class="mono">${dist[i]}</b></div>`).join("")}<div class="row between"><span class="muted" style="font-size:var(--t-xs)">Objectives</span><b class="mono">91</b></div></div></section>
</div>`;
}
function objLine(c, act) {
  const o = ARE.OBJ[c.key];
  return `<div class="row between" style="flex-wrap:nowrap"><span style="min-width:0"><span class="chip code">${objLabel(c.key)}</span> <span style="font-size:.9rem">${esc(o.title)}</span></span><span class="row" style="flex-wrap:nowrap;gap:8px"><b class="mono">${pct(c.score)}</b>${act && c.qcount ? `<button class="btn small" data-act="quiz" data-obj="${c.key}">Quiz</button>` : ""}</span></div>`;
}
function actAttrs(a) { return Object.entries(a).map(([k, v]) => `data-${k === "a" ? "act" : k}="${esc(v)}"`).join(" "); }

/* ============================================================
   STUDY LIBRARY
   ============================================================ */
function lessonStatus(id) { const s = E.S.lessons[id]; return s && s.done ? '<span class="status done">Complete</span>' : s ? '<span class="status prog">In progress</span>' : '<span class="status">Not started</span>'; }
function lessonCard(l) {
  return `<a class="lessoncard" href="#lesson-${l.id}"><div class="row between"><span class="chip code">${divCode(l.div)} · ${ARE.DIV[l.div].sheet}</span>${lessonStatus(l.id)}</div><h3>${esc(l.title)}</h3><p class="muted" style="font-size:.9rem">${esc(l.summary)}</p><div class="row" style="gap:6px">${(l.obj || []).map(k => `<span class="chip code">${ARE.OBJ[k] ? ARE.OBJ[k].code : k}</span>`).join("")}<span class="muted mono" style="font-size:.78rem;margin-left:auto">${l.minutes} min</span></div></a>`;
}
function vLibrary() {
  const q = UI.libQ.toLowerCase();
  const ls = E.lessons.filter(l => (UI.libDiv === "all" || l.div === UI.libDiv) && (!q || (l.title + " " + l.summary + " " + l.body).toLowerCase().includes(q)));
  const done = E.lessons.filter(l => E.S.lessons[l.id] && E.S.lessons[l.id].done).length;
  return `
<div class="stack" style="gap:6px"><span class="eyebrow">${done} of ${E.lessons.length} lessons complete</span><h1>Study Library</h1><p class="muted" style="max-width:70ch">Lessons teach the concept, show it in practice, and end with a knowledge check. A lesson is complete only after you pass its check, and completing a lesson moves an objective to <i>Introduced</i>, never further. Questions decide the rest.</p></div>
<div class="row"><button class="chip ${UI.libDiv === "all" ? "on" : ""}" data-act="libdiv" data-div="all">All divisions</button>${ARE.DIVISIONS.map(d => `<button class="chip ${UI.libDiv === d.id ? "on" : ""}" data-act="libdiv" data-div="${d.id}">${d.code}</button>`).join("")}
<input type="search" id="libQ" placeholder="Search lesson text" value="${esc(UI.libQ)}" style="margin-left:auto;min-width:220px" aria-label="Search lessons"></div>
${ls.length ? `<div class="grid g3">${ls.map(lessonCard).join("")}</div>` : '<div class="empty">No lessons match.</div>'}
<section class="panel stack"><h2>Curriculum coverage</h2><p class="muted">Objectives that have a lesson today. The content model accepts new lessons through content packs (Backup &amp; data) without changing the app.</p>
<div class="scroll"><table class="tbl"><thead><tr><th>Division</th><th>Objectives</th><th>With a lesson</th><th>With questions</th><th>Lessons</th></tr></thead><tbody>${ARE.DIVISIONS.map(d => `<tr><td><a href="#div-${d.id}">${d.code} ${d.name}</a></td><td class="mono">${d.objectives.length}</td><td class="mono">${d.objectives.filter(o => E.objLessons[o.key].length).length}</td><td class="mono">${d.objectives.filter(o => E.objQAll[o.key].length).length}</td><td class="mono">${E.lessons.filter(l => l.div === d.id).length}</td></tr>`).join("")}</tbody></table></div></section>`;
}

/* ============================================================
   DIVISIONS
   ============================================================ */
function vDivisions() {
  return `<div class="stack" style="gap:6px"><span class="eyebrow">${esc(ARE.META.guidelines)}</span><h1>The six ARE divisions</h1></div>
<div class="grid g2">${ARE.DIVISIONS.map(d => { const s = E.divStats(d.id); return `<a class="divcard" href="#div-${d.id}"><div class="dc-main"><h3>${d.n}. ${d.name}</h3><p class="muted" style="font-size:.9rem">${d.blurb}</p><div class="row between"><span class="muted" style="font-size:.85rem">${d.objectives.length} objectives · ${d.sections.length} sections</span><b class="mono">${pct(s.readiness)}</b></div>${distBar(s.dist)}</div><div class="dc-side"><b>${d.code}</b><small>${d.sheet}</small></div></a>`; }).join("")}</div>
<section class="panel stack"><h2>Exam format at a glance</h2><div class="scroll"><table class="tbl"><thead><tr><th>Division</th><th>Items</th><th>Scored</th><th>Pretest</th><th>Test time</th><th>Break</th><th>Appointment</th></tr></thead><tbody>${ARE.DIVISIONS.map(d => `<tr><td>${d.code} ${d.name}</td><td class="mono">${d.items}</td><td class="mono">${d.scored}</td><td class="mono">${d.pretest}</td><td class="mono">${d.time}</td><td class="mono">${d.brk}</td><td class="mono">${d.appt}</td></tr>`).join("")}<tr><th>Total</th><td class="mono">490</td><td class="mono">445</td><td class="mono">45</td><td class="mono">19 h 50 min</td><td></td><td class="mono">24 h 20 min</td></tr></tbody></table></div>
<div class="grid g3">${ARE.META.itemTypes.map(t => `<div class="panel" style="padding:14px">${esc(t)}</div>`).join("")}</div>
<p class="muted" style="font-size:.88rem">${esc(ARE.META.itemNote)} ${esc(ARE.META.caseNote)} Pretest items are unscored and unmarked. Source: <a href="${ARE.DRIVE.guidelines}" target="_blank" rel="noopener">your copy of the ${esc(ARE.META.guidelines)}</a>.</p></section>`;
}
function vDivision(id) {
  const d = ARE.DIV[id], s = E.divStats(id);
  const lessons = E.lessons.filter(l => l.div === id);
  const cases = ARE.CASES.filter(c => c.divs.includes(id));
  const due = E.dueIds(q => q.div === id).length, missed = E.missedIds(q => q.div === id).length;
  return `
<div class="tblock"><div class="tb-main"><span class="eyebrow">Division ${d.n} of 6</span><h1>${d.name}</h1><p class="muted" style="max-width:70ch">${d.blurb}</p>
<div class="row"><button class="btn primary" data-act="quiz" data-div="${id}">Adaptive quiz · 10</button>${formButtons(id)}<button class="btn" data-act="review-due" data-div="${id}" ${due ? "" : "disabled"}>Review due (${due})</button><button class="btn" data-act="review-missed" data-div="${id}" ${missed ? "" : "disabled"}>Missed (${missed})</button></div></div>
<div class="tb-side"><div><small>Sheet</small><b>${d.sheet}</b><small style="margin-top:8px">Readiness</small><b>${pct(s.readiness)}</b><small>${E.readyLabel(s.readiness)}</small></div><div><small>Division</small><b>${d.code}</b></div></div></div>

<div class="grid g4"><div class="panel kpi"><b>${d.items}</b><span>Items (${d.scored} scored, ${d.pretest} pretest)</span></div><div class="panel kpi"><b>${d.time.replace(" 00 min", " h")}</b><span>Test time · break ${d.brk}</span></div><div class="panel kpi"><b>${s.n}</b><span>Questions answered here</span></div><div class="panel kpi"><b>${pct(s.acc)}</b><span>Accuracy here</span></div></div>

<section class="stack"><h2>Sections and objectives</h2>${d.sections.map(sec => `
<div class="panel stack"><div class="row between"><h3>Section ${sec.n}: ${sec.name}</h3><span class="chip code">${sec.w[0]}–${sec.w[1]}%${sec.approx ? " · verify" : ""}</span></div>${bar(sec.mid / 40, "var(--sand)")}
<div class="list">${sec.obj.map(([code]) => { const k = id + "-" + code, o = ARE.OBJ[k], c = E.comp(k), ls = E.objLessons[k]; return `
<div class="objrow"><span class="chip code">${code}</span><span style="min-width:0"><span>${esc(o.title)}</span>${o.lvl ? ` <span class="chip code" title="${o.lvl === "A/E" ? "Analyze/Evaluate" : "Understand/Apply"}">${o.lvl}</span>` : ""}${o.pct ? ` <span class="chip code">${o.pct[0]}–${o.pct[1]}%</span>` : ""}<br>${hbRefs(k).length ? `<span class="muted" style="font-size:.82rem">AHPP ${hbRefs(k).slice(0, 2).map(r => "§" + r.sec + " p. " + r.pg).join(" · ")}${hbRefs(k).length > 2 ? " · …" : ""}</span><br>` : ""}<span class="muted" style="font-size:.82rem">${ls.length ? ls.map(lid => `<a href="#lesson-${lid}">${esc(E.LMAP[lid].title)}</a>`).join(" · ") : "Lesson not written yet"} · ${c.qcount} question${c.qcount === 1 ? "" : "s"}${c.n ? ` · ${c.n} answered · ${pct(c.score)}` : ""} · ${Math.min(E.reinforce(k), 99)}/${E.REINFORCE_TARGET} reps</span></span><span class="hide-sm">${lvPill(c.level, c)}</span><span class="hide-sm">${c.qcount ? `<button class="btn small" data-act="quiz" data-obj="${k}">Quiz</button>` : ""}</span></div>`; }).join("")}</div></div>`).join("")}
<p class="muted" style="font-size:.85rem">Objective wording and section weights: ${esc(ARE.META.guidelines)} and NCARB's division pages. Objective-level percentages and cognitive levels appear where the Guidelines list them. “AHPP” references point to sections and pages in your Handbook.</p></section>

<section class="stack"><h2>Lessons</h2>${lessons.length ? `<div class="grid g3">${lessons.map(lessonCard).join("")}</div>` : '<div class="empty">No lessons yet.</div>'}</section>
<section class="stack"><h2>Official practice exam</h2>${officialCard(id, true)}</section>
${cases.length ? `<section class="stack"><h2>Case studies</h2><div class="grid g2">${cases.map(caseCard).join("")}</div></section>` : ""}
${ARE.PODCAST.forDiv(id).length ? `<section class="panel stack"><div class="row between"><h2>Podcast episodes for this division</h2><a class="btn small" href="#podcast" data-act="podfilter" data-v="${id}">See all ${ARE.PODCAST.forDiv(id).length} →</a></div><p class="muted">Free episodes of the ${esc(ARE.PODCAST.show)} that match this division. ${ARE.PODCAST.forDiv(id).filter(e => ARE.PODCAST.heard(e.id)).length} listened.</p></section>` : ""}
<section class="panel stack"><h2>Handbook topics for this division</h2><div class="row">${ARE.HANDBOOK.topics.filter(t => t.objs.some(k => k.startsWith(id + "-"))).map(t => `<button class="chip" data-act="hbopen" data-id="${t.id}">${esc(t.topic)}</button>`).join("")}</div></section>`;
}

/* ============================================================
   LESSON
   ============================================================ */
function reinforceRow(objs) {
  if (!objs.length) return "";
  const T = E.REINFORCE_TARGET;
  return `<div class="reinf" title="Times you've met each objective across lectures, lessons, quick checks, flashcards, quizzes and exams. Aim for ${T}+."><span class="eyebrow">Repetitions</span>${objs.map(k => { const n = E.reinforce(k); return `<span class="rf"><span class="mono">${objLabel(k)}</span>${bar(n / T, n >= T ? "var(--ok)" : "var(--accent)")}<span class="mono muted">${Math.min(n, 99)}/${T}</span></span>`; }).join("")}</div>`;
}
function richBody(l) {
  // number the h3 sections and mark glossary terms (first use only) for hover/tap definitions
  let n = 0; let html = String(l.body).replace(/<h3>/g, () => `<h3><span class="hn">${String(++n).padStart(2, "0")}</span>`);
  const terms = E.glossary.filter(g => g.term.length > 3).sort((a, b) => b.term.length - a.term.length).slice(0, 400);
  const used = new Set();
  html = html.replace(/(<[^>]+>)|([^<]+)/g, (m, tag, text) => {
    if (tag) return tag; let t = text;
    for (const g of terms) {
      if (used.has(g.term)) continue;
      const re = new RegExp("(^|[^A-Za-z-])(" + g.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(?![A-Za-z-])", "i");
      const mm = t.match(re); if (!mm) continue;
      used.add(g.term);
      const i = mm.index + mm[1].length;
      t = t.slice(0, i) + "\u0001" + g.term + "\u0002" + mm[2] + "\u0003" + t.slice(i + mm[2].length);
    }
    return t.replace(/\u0001([^\u0002]*)\u0002([^\u0003]*)\u0003/g, (x, term, word) => `<span class="term" tabindex="0" data-term="${esc(term)}">${word}</span>`);
  });
  return html;
}
function completeCard(l, st, check) {
  const done = !!st.done, need = Math.ceil(check.length * 2 / 3);
  return `<section class="complete-card ${done ? "done" : ""}"><span class="cc-i" aria-hidden="true">${done ? "✓" : "○"}</span><div style="flex:1;min-width:0"><b>${done ? "Lesson complete" : "Complete this lesson"}</b><p class="muted" style="font-size:var(--t-sm)">${done ? "Completed " + fmtDate(st.done) + (st.check ? " · knowledge check " + st.check.c + "/" + st.check.n : "") + ". Your competency still depends on answering questions over time." : `Pass the knowledge check (${need} of ${check.length} correct). Reading alone doesn't count toward competency.`}</p></div><button class="btn ${done ? "" : "primary"}" data-act="check" data-id="${l.id}" ${check.length ? "" : "disabled"}>${done ? "Retake check" : "Start knowledge check"}</button></section>`;
}
function lessonNav(l) {
  const list = E.lessons.filter(x => x.div === l.div), i = list.indexOf(l);
  const prev = list[i - 1], next = list[i + 1];
  const nextDiv = !next ? E.lessons.find(x => ARE.DIVISIONS.findIndex(d => d.id === x.div) === ARE.DIVISIONS.findIndex(d => d.id === l.div) + 1) : null;
  const n = next || nextDiv;
  return `<nav class="lnav" aria-label="Lesson navigation">${prev ? `<a href="#lesson-${prev.id}"><small>← Previous</small><b>${esc(prev.title)}</b></a>` : `<a href="#div-${l.div}"><small>← Division</small><b>${esc(ARE.DIV[l.div].name)}</b></a>`}${n ? `<a class="next" href="#lesson-${n.id}"><small>Next${nextDiv ? " · " + divCode(n.div) : ""} →</small><b>${esc(n.title)}</b></a>` : `<a class="next" href="#library"><small>Library →</small><b>All lessons</b></a>`}</nav>`;
}
function recallSection(l) {
  const terms = E.glossary.filter(g => g.lesson === l.id).slice(0, 4);
  return `<section class="sec" id="s-recall"><h2>Recall it <small>From memory, before you look back</small></h2>
${terms.length ? `<div class="stack">${terms.map((g, i) => `<div class="panel recall" data-term="${esc(g.term)}"><p><b>Fill in the term:</b> ${esc(g.def)}</p><div class="row"><input type="text" aria-label="Term" placeholder="Type the term" data-recall="${i}" autocomplete="off" autocapitalize="off"><button class="btn small" data-act="recallchk">Check</button></div><p class="recall-fb" hidden></p></div>`).join("")}</div>` : ""}
<div class="panel stack"><b>Explain it back</b><p class="muted" style="margin:0">In 3–4 sentences, explain the main idea of this lesson as if to a junior colleague. Then compare with the key takeaways${ARE.AI.active() ? " or ask the tutor to grade it" : ""}.</p>
<textarea data-note="explain:${l.id}" placeholder="Your explanation">${esc(E.S.notes["explain:" + l.id] || "")}</textarea>
<div class="row"><button class="btn small" data-act="toc" data-target="s-takeaways">Compare with takeaways</button>${ARE.AI.active() ? `<button class="btn small" data-act="gradeexplain" data-id="${l.id}">Tutor: grade my explanation</button>` : ""}</div></div></section>`;
}
function vLesson(id) {
  const l = E.LMAP[id], d = ARE.DIV[l.div], st = E.S.lessons[id] || {};
  const takeaways = (ARE.TAKEAWAYS[id] || l.takeaways || []);
  const hbs = hbTopicsFor(l.obj || []);
  const check = (l.check || []).filter(q => E.QMAP[q]);
  const lastCheck = st.check;
  const secs = [["obj", "Objectives"], ["content", "Lesson"], l.diagram ? ["fig", "Diagram"] : null, (l.quick || []).length ? ["quick", "Check yourself"] : null, (l.tryit || []).length ? ["try", "Try it"] : null, (l.formulas || []).length ? ["formulas", "Formulas"] : null, ["example", "Worked example"], ["mistakes", "Common mistakes"], ["scenario", "Practice scenario"], ["recall", "Recall it"], ["takeaways", "Key takeaways"], ARE.PODCAST.forLesson(id).length ? ["listen", "Listen"] : null, ["handbook", "Handbook & references"], ["check", "Knowledge check"], ["notes", "My notes"]].filter(Boolean);
  return `
<div class="tblock"><div class="tb-main"><span class="eyebrow">${d.code} · ${esc(d.name)} · ${l.minutes} min · ${esc(l.level || "Core")}</span><h1>${esc(l.title)}</h1><p class="muted" style="max-width:70ch">${esc(l.summary)}</p>
<div class="row">${(l.obj || []).map(k => `<a class="chip code" href="#div-${l.div}" title="${esc(ARE.OBJ[k].title)}">${objLabel(k)}</a>`).join("")}${bmBtn("lesson", id, l.title)}</div>
<div class="lesson-actions"><button class="btn primary" data-act="mkvideo" data-kind="lesson" data-id="${id}">▶ Watch video</button><button class="btn" data-act="toc" data-target="s-check">Knowledge check</button><span class="sep" aria-hidden="true"></span><button class="btn ghost" data-act="tutor" data-m="simple">✦ Ask tutor</button><button class="btn ghost" data-act="fcdeck" data-lesson="${id}">Flashcards</button><button class="btn ghost" data-act="quiz" data-obj="${(l.obj || [])[0] || ""}">Quiz</button><button class="btn ghost" data-act="confused" data-obj="${(l.obj || [])[0] || ""}">I'm confused</button></div>
${reinforceRow(l.obj || [])}</div>
<div class="tb-side"><div><small>Status</small>${lessonStatus(id)}${lastCheck ? `<small style="margin-top:8px">Last check</small><b>${lastCheck.c}/${lastCheck.n}</b>` : ""}</div><div><small>Sheet</small><b>${d.sheet}</b></div></div></div>
<div class="lesson"><article class="stack" style="gap:34px;min-width:0">
<section class="sec" id="s-obj"><h2>Learning objectives <small>What NCARB expects</small></h2><ul class="prose" style="margin:0">${l.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
<div class="grid g2"><div class="panel"><span class="eyebrow">Why it matters</span><p style="margin-top:6px">${esc(l.why)}</p></div><div class="panel"><span class="eyebrow">How it appears on the exam</span><p style="margin-top:6px">${esc(l.exam)}</p></div></div></section>
<section class="sec" id="s-content"><h2>Lesson</h2><div class="prose" id="lessonBody">${richBody(l)}</div></section>
${l.diagram ? `<section class="sec" id="s-fig"><h2>Diagram ${/data-tip=/.test(l.diagram) ? "<small>Tap the highlighted parts</small>" : ""}</h2><div class="figure lfig">${l.diagram}</div>${/data-tip=/.test(l.diagram) ? `<div class="tipbox" id="tipbox" aria-live="polite"><span class="muted">Tap any highlighted part of the diagram to see what it is and why it matters.</span></div>` : ""}</section>` : ""}
${(l.quick || []).length ? `<section class="sec" id="s-quick"><h2>Check yourself <small>Not scored</small></h2><div class="stack">${l.quick.map((qq, qi) => `<div class="panel stack qq" data-qq="${qi}"><b>${esc(qq.q)}</b><div class="opts">${qq.opts.map((o, oi) => `<button class="opt" data-act="qq" data-qi="${qi}" data-oi="${oi}"><span class="mk">${String.fromCharCode(65 + oi)}</span><span>${esc(o)}</span></button>`).join("")}</div><div class="qq-fb" hidden></div></div>`).join("")}</div></section>` : ""}
${(l.tryit || []).length ? `<section class="sec" id="s-try"><h2>Try it <small>Move the sliders</small></h2><div class="grid g2">${l.tryit.filter(k => TRY[k]).map(tryWidget).join("")}</div></section>` : ""}
${(l.formulas || []).length ? `<section class="sec" id="s-formulas"><h2>Formulas</h2><div>${l.formulas.map(f => `<div class="formula"><b>${esc(f.name)}</b><span><code>${esc(f.f)}</code>${f.note ? `<br><span class="muted" style="font-size:.85rem">${esc(f.note)}</span>` : ""}</span></div>`).join("")}</div></section>` : ""}
<section class="sec" id="s-example"><h2>${esc(l.example.title)}</h2><div class="prose panel">${l.example.html}</div></section>
<section class="sec" id="s-mistakes"><h2>Common mistakes</h2><ul class="prose">${l.mistakes.map(m => `<li>${esc(m)}</li>`).join("")}</ul></section>
<section class="sec" id="s-scenario"><h2>Practice scenario <small>Think first, then reveal</small></h2><div class="panel stack"><p>${esc(l.scenario.prompt)}</p><label class="f">Your answer (saved to your notes)<textarea data-note="scenario:${id}" placeholder="Write your reasoning before revealing">${esc(E.S.notes["scenario:" + id] || "")}</textarea></label>
<details><summary class="btn small" style="width:max-content">Reveal model answer</summary><div class="prose" style="margin-top:10px">${esc(l.scenario.answer)}</div></details></div></section>
${recallSection(l)}
${l.canada ? `<div class="note-canada"><b>Canadian practice note (not on the ARE).</b> ${esc(l.canada)}</div>` : ""}
<section class="sec" id="s-takeaways"><h2>Key takeaways <small>Memorize</small></h2><ul class="takeaways">${takeaways.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
${(() => { const cards = E.glossary.filter(g => g.lesson === id); return cards.length ? `<h3 style="margin-top:8px">Flashcards <span class="muted" style="font-weight:400;font-size:.85rem">· tap to flip</span></h3><div class="cards">${cards.map(g => `<button class="fcard" data-act="flip" aria-label="Flashcard: ${esc(g.term)}"><span class="f-front">${esc(g.term)}</span><span class="f-back">${esc(g.def)}</span></button>`).join("")}</div>` : ""; })()}</section>
${(() => { const eps = ARE.PODCAST.forLesson(id); return eps.length ? `<section class="sec" id="s-listen"><h2>Listen <small>Architect Exam Podcast · free</small></h2><p class="muted">Episodes on this topic from ${esc(ARE.PODCAST.by)}. They open on Young Architect's site.</p><div class="pod-list">${eps.map(e => ARE.PODCAST.row(e, { lessons: false })).join("")}</div></section>` : ""; })()}
<section class="sec" id="s-handbook"><h2>Handbook &amp; references</h2>
${(l.obj || []).some(k => hbRefs(k).length) ? `<div class="panel stack"><span class="eyebrow">Read in your Handbook (by objective)</span>${(l.obj || []).filter(k => hbRefs(k).length).map(k => `<div><span class="chip code">${objLabel(k)}</span><ul style="margin:6px 0 0;padding-left:18px">${hbRefs(k).map(r => `<li style="font-size:.9rem">${hbRefLine(r)}</li>`).join("")}</ul></div>`).join("")}<a href="${ARE.HANDBOOK.fileUrl}" target="_blank" rel="noopener" style="font-size:.88rem">Open your Handbook PDF in Drive ↗</a></div>` : ""}
${hbs.length ? `<div class="panel stack"><span class="eyebrow">${esc(ARE.HANDBOOK.title)}, ${esc(ARE.HANDBOOK.edition)}</span>${hbs.map(t => `<div class="row between" style="flex-wrap:nowrap"><span style="min-width:0"><b>${esc(t.topic)}</b><br><span class="muted" style="font-size:.85rem">${t.sections.map(sn => "§" + sn + " p. " + ARE.HB_SEC[sn].p).join(" · ")}${E.S.hbLoc[t.id] ? " · Your note: " + esc(E.S.hbLoc[t.id]) : ""}</span></span><button class="btn small" data-act="hbopen" data-id="${t.id}">Open topic</button></div>`).join("")}</div>` : ""}
<div class="scroll"><table class="tbl"><thead><tr><th>Reference</th><th>Access</th></tr></thead><tbody>${l.refs.map(r => `<tr><td>${refLink(r.t)}</td><td>${esc(r.a)}</td></tr>`).join("")}</tbody></table></div></section>
<section class="sec" id="s-check"><h2>Knowledge check</h2><div class="panel stack"><p>${check.length} questions. Answer at least ${Math.ceil(check.length * 2 / 3)} correctly to complete the lesson. Your answers also count toward competency.</p>
<div class="row"><button class="btn primary" data-act="check" data-id="${id}" ${check.length ? "" : "disabled"}>${lastCheck ? "Retake knowledge check" : "Start knowledge check"}</button>${(l.obj || []).map(k => E.objQ[k].length ? `<button class="btn small" data-act="quiz" data-obj="${k}">More on ${objLabel(k)}</button>` : "").join("")}</div></div></section>
<section class="sec" id="s-notes"><h2>My notes</h2><textarea data-note="lesson:${id}" placeholder="Notes for this lesson save automatically" style="min-height:160px">${esc(E.S.notes["lesson:" + id] || "")}</textarea></section>
${completeCard(l, st, check)}
${lessonNav(l)}
</article>
<nav class="lesson-toc" aria-label="On this page"><div class="toc-prog"><i id="tocProg"></i></div>${secs.map(([k, t]) => `<a href="#lesson-${id}" data-act="toc" data-target="s-${k}">${t}</a>`).join("")}</nav></div>`;
}

/* ============================================================
   PRACTICE EXAMS
   ============================================================ */
function vExams() {
  const due = E.dueIds(), missed = E.missedIds(), flagged = Object.keys(E.S.flags).filter(k => E.S.flags[k] && E.QMAP[k]);
  const resume = E.loadSession();
  const byType = {}; E.S.attempts.forEach(a => { const q = E.QMAP[a.q]; if (!q) return; const t = q.case ? "case" : q.type; byType[t] = byType[t] || [0, 0]; byType[t][0]++; if (a.ok) byType[t][1]++; });
  const typeName = { mc: "Multiple choice", ms: "Check all that apply", calc: "Calculation", order: "Sequencing drill", match: "Matching drill", hot: "Hotspot", case: "Case study items" };
  const bankCount = (id) => E.questions.filter(q => !q.case && q.div === id && !isDrill(q)).length + ARE.CASES.filter(c => c.divs[0] === id).reduce((s, c) => s + c.questions.filter(q => !isDrill(q)).length, 0);
  return `
<div class="stack" style="gap:6px"><span class="eyebrow">${E.questions.length + ARE.CASES.reduce((s, c) => s + c.questions.length, 0)} original items in the bank</span><h1>Practice Exams</h1></div>
${resume && !resume.done ? `<div class="panel row between"><span><b>Unfinished: ${esc(resume.title)}</b><br><span class="muted">${Object.keys(resume.resp).length} of ${resume.qids.length} answered</span></span><span class="row"><a class="btn primary" href="#quiz">Resume</a><button class="btn small" data-act="discard">Discard</button></span></div>` : ""}
<div class="grid g3">
  <div class="panel stack"><h3>Review queue</h3><p class="muted">Each question you answer is rescheduled with the SM-2 method: sooner when you miss it or were unsure, later as you keep getting it right.</p><button class="btn primary" data-act="review-due" ${due.length ? "" : "disabled"}>Review ${due.length} due</button></div>
  <div class="panel stack"><h3>Previously missed</h3><p class="muted">Questions whose most recent answer was wrong.</p><button class="btn" data-act="review-missed" ${missed.length ? "" : "disabled"}>Practice ${missed.length} missed</button></div>
  <div class="panel stack"><h3>Flagged for review</h3><p class="muted">Flag any question during a quiz to collect it here.</p><button class="btn" data-act="review-flagged" ${flagged.length ? "" : "disabled"}>Practice ${flagged.length} flagged</button></div>
</div>
<section class="panel stack"><h2>Build a quiz</h2>
<div class="row" style="align-items:flex-end">
<label class="f">Division<select id="exDiv"><option value="all">All divisions (random)</option>${ARE.DIVISIONS.map(d => `<option value="${d.id}" ${UI.examDiv === d.id ? "selected" : ""}>${d.code} ${d.name}</option>`).join("")}</select></label>
<label class="f">Objective<select id="exObj"><option value="">Any objective</option>${(UI.examDiv !== "all" ? ARE.DIV[UI.examDiv].objectives : []).map(o => `<option value="${o.key}">${o.code} ${esc(o.title.slice(0, 60))}</option>`).join("")}</select></label>
<label class="f">Questions<input type="number" id="exN" min="3" max="100" value="${UI.examN}" style="width:90px"></label>
<label class="f">Selection<select id="exSel"><option value="adaptive">Adaptive (weak and due first)</option><option value="random">Random</option></select></label>
<label class="f" style="flex-direction:row;display:flex;gap:8px;align-items:center;padding-bottom:8px"><input type="checkbox" id="exTimed" ${UI.examTimed ? "checked" : ""}> Timed (NCARB pace)</label>
<button class="btn primary" data-act="build">Start</button></div>
<p class="muted" style="font-size:.85rem">Practice mode shows feedback after each answer and includes matching and sequencing drills. Timed mode works like the exam: only multiple choice, check-all-that-apply and hotspot items, calculations shown as multiple choice, no feedback until you submit, and time per item matched to the division's real pace.</p></section>
<section class="stack"><h2>Full-length practice exams</h2><p class="muted" style="max-width:75ch">Every division has three fixed forms (A, B, C) plus a randomized form that is different every time. Forms follow the division's section weights, run in the NCARB-style testing screen (calculator, whiteboard, highlight, strike-through, flag, exam summary, optional break) and are timed at the real pace. Where the original bank is thin, forms are topped up with generated calculation items, so they can be shorter than the real 65–100 items. Retake any form as often as you like.</p>
<div class="grid g3">${ARE.DIVISIONS.map(d => { const last = E.S.results.filter(r => r.mode === "exam" && r.div === d.id).slice(-1)[0]; return `<div class="panel stack"><div class="row between"><h3>${d.code}</h3><span class="chip code">real: ${d.items} items · ${d.time}</span></div><p class="muted" style="font-size:.88rem">${d.name}${last ? `<br>Last: ${last.correct}/${last.n} (${pct(last.correct / last.n)}) on ${fmtDate(last.t)}` : ""}</p><div class="row">${formButtons(d.id, true)}</div></div>`; }).join("")}</div>
<div class="panel stack"><h3>Learn the testing screen first</h3><p class="muted" style="font-size:.9rem">Open the calculator and whiteboard now to get used to them. In an exam they sit in the top bar. Drag either panel by its title bar.</p><div class="row"><button class="btn" data-act="tool-calc">Open calculator</button><button class="btn" data-act="tool-board">Open whiteboard</button><button class="btn" data-act="tutorial">5-item interface tutorial</button></div></div></section>
<section class="stack"><h2>NCARB official practice exams</h2><p class="muted" style="max-width:75ch">${esc(ARE.NCARB_PE.note)} A logged result counts like a timed simulation toward that division's readiness for 30 days.</p>
<div class="grid g3">${ARE.DIVISIONS.map(d => officialCard(d.id)).join("")}</div></section>
<section class="panel stack"><h2>Accuracy by question type</h2>${Object.keys(byType).length ? `<div class="list">${Object.entries(byType).map(([t, [n, ok]]) => `<div class="row between"><span>${typeName[t] || t}</span><span class="row"><span class="muted mono">${ok}/${n}</span><b class="mono" style="width:56px;text-align:right">${pct(ok / n)}</b></span></div>`).join("")}</div>` : '<div class="empty">No answers yet.</div>'}</section>
<section class="panel stack"><h2>History</h2>${E.S.results.length ? `<div class="scroll"><table class="tbl"><thead><tr><th>Date</th><th>Session</th><th>Mode</th><th>Score</th><th>Time</th></tr></thead><tbody>${E.S.results.slice(-25).reverse().map(r => `<tr><td class="mono">${fmtDate(r.t)}</td><td>${esc(r.title)}</td><td>${r.mode}</td><td class="mono">${r.correct}/${r.n} (${pct(r.correct / r.n)})</td><td class="mono">${fmtMin(r.dur / 60000)}</td></tr>`).join("")}</tbody></table></div>` : '<div class="empty">Completed quizzes appear here.</div>'}</section>`;
}
function formButtons(div, compact) {
  const done = (f) => E.S.results.filter(r => r.div === div && r.form === f).length;
  return ["A", "B", "C", "R"].map(f => `<button class="btn ${f === "A" && !compact ? "" : ""} small" data-act="form" data-div="${div}" data-form="${f}" title="${f === "R" ? "New random form each time" : "Fixed form " + f}">${f === "R" ? "Randomized" : "Form " + f}${done(f) ? ` <span class="muted">×${done(f)}</span>` : ""}</button>`).join("");
}
function parseMin(s) { const m = s.match(/(\d+)\s*h\s*(\d+)?/); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 180; }

/* ---------- NCARB official practice exams ---------- */
UI.peFlags = {};
function officialCard(divId, full) {
  const pe = ARE.NCARB_PE.exams[divId]; if (!pe) return "";
  const d = ARE.DIV[divId];
  const logs = E.S.results.filter(r => r.mode === "official" && r.div === divId);
  const last = logs[logs.length - 1];
  const flags = UI.peFlags[divId] || new Set();
  const today = E.dayKey(Date.now());
  return `<div class="panel stack"><div class="row between"><h3>${d.code} · NCARB practice exam</h3><span class="chip code">${pe.n} items · ${d.time.replace(" 00 min", " h")}</span></div>
<p class="muted" style="font-size:.88rem">${last ? `Last logged: <b class="mono">${last.correct}/${last.n} (${pct(last.correct / last.n)})</b> on ${fmtDate(last.t)}${logs.length > 1 ? ` · ${logs.length} attempts` : ""}` : "Not taken yet. Best used near your exam date, after the division's objectives reach Proficient."}</p>
<div class="row"><a class="btn ${full ? "primary" : ""} small" href="${pe.url}" target="_blank" rel="noopener">Open exam in Drive ↗</a></div>
<details><summary class="btn small ghost" style="width:max-content;padding-left:0">Log a result</summary><div class="stack" style="margin-top:10px">
<div class="row" style="align-items:flex-end"><label class="f">Date<input type="date" id="pe-date-${divId}" value="${today}"></label><label class="f">Correct<input type="number" id="pe-score-${divId}" min="0" max="${pe.n}" style="width:90px"></label><label class="f">Out of<input type="number" id="pe-n-${divId}" value="${pe.n}" min="1" max="${pe.n}" style="width:80px"></label><label class="f">Minutes used<input type="number" id="pe-min-${divId}" min="1" max="400" style="width:100px"></label></div>
<label class="f">Missed question numbers (optional)<input type="text" id="pe-missed-${divId}" placeholder="e.g. 4, 11, 27–29"></label>
<div class="f"><span>Objectives the misses point to (they get priority in your study plan for 30 days)</span><div class="row" style="gap:6px">${d.objectives.map(o => `<button class="chip code ${flags.has(o.key) ? "on" : ""}" data-act="peflag" data-div="${divId}" data-obj="${o.key}" title="${esc(o.title)}">${o.code}</button>`).join("")}</div></div>
<div><button class="btn primary small" data-act="pelog" data-div="${divId}">Save result</button></div></div></details>
${logs.length ? `<div class="list" style="font-size:.88rem">${logs.slice().reverse().map(r => `<div class="row between" style="flex-wrap:nowrap"><span class="mono">${fmtDate(r.t)}</span><span class="muted" style="min-width:0">${r.missed ? "Missed: " + esc(r.missed) : ""}${r.flags && r.flags.length ? " · " + r.flags.map(objLabel).join(", ") : ""}</span><b class="mono">${r.correct}/${r.n}</b></div>`).join("")}</div>` : ""}</div>`;
}

/* ---------- start sessions ---------- */
function startSession(o) {
  o.qids = (o.qids || []).filter(id => E.ensureQ(id));
  if (!o.qids.length) { toast("No questions available for that selection yet."); return; }
  const s = { id: Date.now(), title: o.title, mode: o.mode, qids: o.qids, i: 0, resp: {}, checked: {}, start: Date.now(), limit: o.limit || 0, div: o.div || null, caseId: o.caseId || null, lessonId: o.lessonId || null, back: o.back || "#exams", done: false, meta: {}, form: o.form || null, planStep: o.planStep, conf: {}, strike: {}, hl: {}, view: "item", maxSeen: 0, lockBefore: 0, breakUsed: false, onBreak: null, breakMin: o.breakMin || 0 };
  if (ARE.UI) ARE.UI.resetTools();
  s.qids.forEach(id => {
    const q = E.QMAP[id];
    if (q.type === "order") { let p = E.shuffle(q.items.map((_, i) => i)); if (p.every((x, i) => x === i) && p.length > 1) p.reverse(); s.resp[id + "__init"] = p; }
    if (q.type === "match") s.meta[id] = E.shuffle(Array.from(new Set(q.pairs.map(p => p[1]))));
    if (q.type === "calc" && s.mode === "exam") s.meta[id + "__mc"] = calcChoices(q);
  });
  // order items count as unanswered until moved/confirmed; store initial order separately
  SESSION = s; E.saveSession(s);
  if (location.hash === "#quiz") route(); else location.hash = "#quiz";
}
function startQuiz({ div, obj, n = 10, adaptive = true, timed = false, title }) {
  let ids = E.pick({ div: div === "all" ? null : div, obj, n: timed ? n * 2 : n, adaptive });
  if (timed) ids = ids.filter(id => !isDrill(E.QMAP[id])).slice(0, n);
  const d = obj ? ARE.OBJ[obj].div : (div && div !== "all" ? div : null);
  const limit = timed ? Math.round((d ? parseMin(ARE.DIV[d].time) / ARE.DIV[d].items : 2.5) * ids.length * 60000) : 0;
  startSession({ qids: ids, mode: timed ? "exam" : "practice", limit, div: d, title: title || (obj ? "Quiz: " + objLabel(obj) : d ? `${ARE.DIV[d].code} ${timed ? "timed" : "adaptive"} quiz` : "Mixed quiz") });
}
function startForm(div, form) {
  const d = ARE.DIV[div], F = E.buildForm(div, form);
  const name = form === "R" ? "Randomized form" : "Form " + form;
  startSession({ qids: F.ids, mode: "exam", div, form, title: `${d.code} practice exam · ${name}`, limit: Math.round(parseMin(d.time) / d.items * F.ids.length * 60000), breakMin: parseInt(d.brk) || 30 });
}
function startExam(div) {
  return startForm(div, "R");
  const d = ARE.DIV[div];
  const discrete = E.shuffle(E.questions.filter(q => !q.case && q.div === div && !isDrill(q)).map(q => q.id));
  const c = ARE.CASES.filter(x => x.divs[0] === div);
  const caseIds = c.length ? c[0].questions.filter(q => !isDrill(q)).map(q => q.id) : [];
  const ids = discrete.concat(caseIds);
  startSession({ qids: ids, mode: "exam", div, title: `${d.code} simulated exam`, limit: Math.round(parseMin(d.time) / d.items * ids.length * 60000), caseId: c.length ? c[0].id : null });
}

/* ============================================================
   QUIZ SESSION
   ============================================================ */
function curCase(q) { return q && q.case ? ARE.CASES.find(c => c.id === q.case) : null; }
function vQuiz() {
  const s = SESSION;
  if (s.done) return vResults();
  if (s.mode === "exam") return vExamUI();
  const id = s.qids[s.i], q = E.QMAP[id], c = curCase(q);
  const instant = s.mode === "practice" || s.mode === "check" || s.mode === "review";
  const checked = !!s.checked[id];
  const answered = Object.keys(s.resp).filter(k => !k.includes("__")).length;
  return `
<div class="qhead"><div class="stack" style="gap:2px"><span class="eyebrow">${esc(s.title)}</span><h2>Question ${s.i + 1} of ${s.qids.length}</h2></div>
<div class="row">${s.limit ? `<span class="timer" id="timer" aria-live="off">--:--</span>` : `<span class="timer" id="timer" data-up="1">0:00</span>`}<button class="btn small" data-act="quit">Save &amp; exit</button></div></div>
<div class="quiz ${c ? "case" : ""}">
${c ? `<aside class="panel case-res stack" aria-label="Case resources"><span class="eyebrow">Case study</span><h3>${esc(c.title)}</h3><p class="muted" style="font-size:.9rem">${esc(c.brief)}</p><div class="tabs" role="tablist">${c.resources.map((r, i) => `<button role="tab" class="${(s.resTab || 0) === i ? "on" : ""}" data-act="restab" data-i="${i}">${esc(r.name)}</button>`).join("")}</div><div class="scroll">${c.resources[s.resTab || 0].html}</div></aside>` : ""}
<div class="stack" style="min-width:0">
<div class="qcard"><div class="qmeta"><span class="chip code">${objLabel(q.obj)}</span><span class="chip">${esc(isDrill(q) ? typeLabel(q) + " · not an ARE item type" : (q.fmt || typeLabel(q)))}</span><span class="chip">${["", "Foundational", "Applied", "Analytical"][q.diff || 1]}</span>
<button class="btn small ghost" data-act="flag" style="margin-left:auto" aria-pressed="${!!E.S.flags[id]}">${E.S.flags[id] ? "⚑ Flagged" : "⚐ Flag"}</button></div>
<div class="qstem">${q.q}</div>
<div id="qbody">${renderInput(q, s, checked)}</div>
${instant && !checked && !isDrill(q) ? confRow(s, id) : ""}
${checked ? feedback(q, s.resp[id], s) : ""}
</div>
<div class="row between"><button class="btn" data-act="prev" ${s.i === 0 ? "disabled" : ""}>← Previous</button>
<div class="row">${instant && !checked ? `<button class="btn primary" data-act="checkans">Check answer</button>` : ""}
${s.i < s.qids.length - 1 ? `<button class="btn ${instant && !checked ? "" : "primary"}" data-act="next">Next →</button>` : `<button class="btn primary" data-act="submit">${instant ? "Finish" : "Submit exam"}</button>`}</div></div>
</div>
${c ? "" : `<aside class="panel stack"><span class="eyebrow">${answered} of ${s.qids.length} answered</span><div class="palette">${s.qids.map((qid, i) => `<button data-act="goto" data-i="${i}" class="${i === s.i ? "cur " : ""}${s.resp[qid] !== undefined ? "ans " : ""}${E.S.flags[qid] ? "flag " : ""}${s.checked[qid] ? (E.grade(E.QMAP[qid], s.resp[qid]) ? "good" : "wrong") : ""}" aria-label="Question ${i + 1}">${i + 1}</button>`).join("")}</div>${instant ? "" : `<button class="btn" data-act="submit">Submit exam</button>`}</aside>`}
</div>`;
}
/* ---------- NCARB-style testing interface ---------- */
function fmtClock(ms) { ms = Math.max(0, ms); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(sec).padStart(2, "0"); }
function examItemStatus(s, qid) { const q = E.QMAP[qid]; return E.answered(q, s.resp[qid]) ? "Answered" : "Not answered"; }
function vExamUI() {
  const s = SESSION, d = s.div && ARE.DIV[s.div];
  s.maxSeen = Math.max(s.maxSeen || 0, s.i);
  const bar = `<div class="ebar"><div class="ebar-l"><b>${esc(s.title)}</b><span class="mono">${s.view === "summary" ? "Exam summary" : `Item ${s.i + 1} of ${s.qids.length}`}</span></div>
<div class="ebar-c"><span class="etimer mono" id="timer" ${s.hideTimer ? "data-hidden=1" : ""}>--:--</span><button class="ebtn" data-act="hidetimer">${s.hideTimer ? "Show time" : "Hide time"}</button></div>
<div class="ebar-r"><button class="ebtn" data-act="tool-calc" title="Calculator">▦ Calculator</button><button class="ebtn" data-act="tool-board" title="Whiteboard">✎ Whiteboard</button>${s.view === "item" ? `<button class="ebtn" data-act="hl" title="Select text in the question, then press">▌ Highlight</button>${(s.hl[s.qids[s.i]] || []).length ? `<button class="ebtn" data-act="hlclear">Clear highlights</button>` : ""}<button class="ebtn ${E.S.flags[s.qids[s.i]] ? "on" : ""}" data-act="flag">⚑ ${E.S.flags[s.qids[s.i]] ? "Flagged" : "Flag for review"}</button>` : ""}<button class="ebtn" data-act="summary">☰ Exam summary</button></div></div>`;
  if (s.onBreak) {
    return `${bar}<div class="panel stack" style="max-width:640px;margin:40px auto;text-align:center"><h2>Optional break</h2><p class="muted">The exam clock is paused. Items you viewed before the break are now locked, as on the real ARE.</p><p class="etimer mono" id="breakTimer" style="font-size:2rem">--:--</p><div><button class="btn primary" data-act="resumebreak">Resume exam</button></div></div>`;
  }
  if (s.view === "summary") {
    const f = s.sumFilter || "all";
    const rows = s.qids.map((qid, i) => ({ i, qid, st: examItemStatus(s, qid), fl: !!E.S.flags[qid], lk: i < (s.lockBefore || 0), q: E.QMAP[qid] })).filter(x => f === "all" || (f === "flag" && x.fl) || (f === "un" && x.st !== "Answered"));
    const unanswered = s.qids.filter(qid => examItemStatus(s, qid) !== "Answered").length, flagged = s.qids.filter(qid => E.S.flags[qid]).length;
    return `${bar}<div class="stack" style="gap:16px">
<div class="row between"><div class="row"><button class="chip ${f === "all" ? "on" : ""}" data-act="sumf" data-f="all">All (${s.qids.length})</button><button class="chip ${f === "un" ? "on" : ""}" data-act="sumf" data-f="un">Not answered (${unanswered})</button><button class="chip ${f === "flag" ? "on" : ""}" data-act="sumf" data-f="flag">Flagged (${flagged})</button></div>
<div class="row"><button class="btn" data-act="backitem">Return to item ${s.i + 1}</button>${!s.breakUsed && s.breakMin ? `<button class="btn" data-act="takebreak">Take optional break (${s.breakMin} min)</button>` : ""}<button class="btn primary" data-act="endexam">End exam &amp; score</button></div></div>
<div class="scroll"><table class="tbl esum"><thead><tr><th>Item</th><th>Status</th><th>Flagged</th><th>Section</th><th></th></tr></thead><tbody>${rows.map(x => `<tr class="${x.lk ? "locked" : ""}"><td class="mono">${x.i + 1}${x.q.case ? " · case" : ""}</td><td>${x.st === "Answered" ? x.st : `<b style="color:var(--bad)">${x.st}</b>`}</td><td>${x.fl ? "⚑" : ""}</td><td class="muted">${esc(ARE.OBJ[x.q.obj].secName)}</td><td>${x.lk ? `<span class="muted">Locked after break</span>` : `<button class="btn small" data-act="goto" data-i="${x.i}">Go to item</button>`}</td></tr>`).join("") || `<tr><td colspan="5" class="muted">No items in this view.</td></tr>`}</tbody></table></div>
<p class="muted" style="font-size:.85rem">Tools: the calculator accepts keyboard input; the whiteboard keeps your work for the whole exam. Right-click (or use the S̶ button) to strike out an answer option.</p></div>`;
  }
  const id = s.qids[s.i], q = E.QMAP[id], c = curCase(q);
  const locked = s.i < (s.lockBefore || 0);
  return `${bar}<div class="quiz ${c ? "case" : "solo"}">
${c ? `<aside class="panel case-res stack" aria-label="Case resources"><span class="eyebrow">Case study</span><h3>${esc(c.title)}</h3><p class="muted" style="font-size:.9rem">${esc(c.brief)}</p><div class="tabs" role="tablist">${c.resources.map((r, i) => `<button role="tab" class="${(s.resTab || 0) === i ? "on" : ""}" data-act="restab" data-i="${i}">${esc(r.name)}</button>`).join("")}</div><div class="scroll">${c.resources[s.resTab || 0].html}</div></aside>` : ""}
<div class="stack" style="min-width:0"><div class="qcard eitem">${locked ? `<p class="muted">This item is locked because you took the break.</p>` : ""}
<div class="qstem" id="qstem">${q.q}</div>
<div id="qbody">${renderExamInput(q, s, locked)}</div></div>
<div class="row between"><button class="btn" data-act="prev" ${s.i === 0 || s.i - 1 < (s.lockBefore || 0) ? "disabled" : ""}>← Previous</button>
${s.i < s.qids.length - 1 ? `<button class="btn primary" data-act="next">Next →</button>` : `<button class="btn primary" data-act="summary">Review &amp; end exam</button>`}</div></div></div>`;
}
function renderExamInput(q, s, locked) {
  const r = s.resp[q.id], st = s.strike[q.id] || [];
  const dis = locked ? "disabled" : "";
  const row = (i, inner, act, sel, sq, v) => `<div class="optrow ${st.includes(i) ? "struck" : ""}"><button class="opt ${sq ? "sq" : ""} ${sel ? "sel" : ""}" data-act="${act}" ${v !== undefined ? `data-v="${v}"` : `data-i="${i}"`} data-si="${i}" ${dis} role="${sq ? "checkbox" : "radio"}" aria-checked="${sel}"><span class="mk">${String.fromCharCode(65 + i)}</span><span>${inner}</span></button><button class="strk" data-act="strike" data-i="${i}" ${dis} title="Strike through this option" aria-label="Strike through option ${String.fromCharCode(65 + i)}">S̶</button></div>`;
  if (q.type === "mc") return `<div class="opts">${q.opts.map((o, i) => row(i, o, "choose", r === i)).join("")}</div>`;
  if (q.type === "ms") return `<p style="margin-bottom:8px"><b>Check the ${["", "one", "two", "three", "four"][q.pick || q.ans.length] || q.ans.length} that apply.</b></p><div class="opts">${q.opts.map((o, i) => row(i, o, "toggle", (r || []).includes(i), true)).join("")}</div>`;
  if (q.type === "calc") { const ch = s.meta[q.id + "__mc"] || calcChoices(q); s.meta[q.id + "__mc"] = ch; return `<div class="opts">${ch.map((v, i) => row(i, `<span class="mono">${q.unit === "$" ? "$" : ""}${v.toLocaleString(undefined, { maximumFractionDigits: 6 })}${q.unit && q.unit !== "$" ? " " + esc(q.unit) : ""}</span>`, "choosecalc", r !== undefined && r !== "" && +r === v, false, v)).join("")}</div>`; }
  return renderInput(q, s, locked);
}
function applyHighlights() {
  const s = SESSION; if (!s || s.mode !== "exam") return;
  const stem = $("#qstem"); if (!stem) return;
  (s.hl[s.qids[s.i]] || []).forEach(phrase => {
    const walker = document.createTreeWalker(stem, NodeFilter.SHOW_TEXT);
    let n; while ((n = walker.nextNode())) { const i = n.nodeValue.indexOf(phrase); if (i >= 0 && !(n.parentNode && n.parentNode.tagName === "MARK")) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + phrase.length); const m = document.createElement("mark"); r.surroundContents(m); break; } }
  });
}
function typeLabel(q) { return { mc: "Multiple choice", ms: "Check all that apply", calc: "Calculation", order: "Sequencing drill", match: "Matching drill", hot: "Hotspot" }[q.type]; }
const isDrill = (q) => q.type === "order" || q.type === "match";
function calcChoices(q) {
  const dec = (String(q.ans).split(".")[1] || "").length;
  const f = (v) => +v.toFixed(dec);
  const cands = [q.ans * 1.25, q.ans * 0.8, q.ans * 1.5, q.ans * 0.5, q.ans * 2, q.ans * 0.9, q.ans * 1.1].map(f).filter(v => v > 0 && Math.abs(v - q.ans) > (q.tol || 0) + 1e-9);
  const uniq = [...new Set(cands)].slice(0, 3);
  return E.shuffle([q.ans].concat(uniq));
}
function renderInput(q, s, checked) {
  const r = s.resp[q.id];
  const dis = checked ? "disabled" : "";
  if (q.type === "mc" || q.type === "ms") {
    const multi = q.type === "ms";
    return `${multi ? `<p class="muted" style="font-size:.88rem;margin-bottom:8px">Select ${q.pick || q.ans.length}.</p>` : ""}<div class="opts" role="${multi ? "group" : "radiogroup"}">${q.opts.map((o, i) => {
      const sel = multi ? (r || []).includes(i) : r === i;
      let cls = sel ? "sel" : "";
      if (checked) { const correct = multi ? q.ans.includes(i) : q.ans === i; cls = correct ? "good" : sel ? "wrong" : ""; }
      return `<button class="opt ${multi ? "sq" : ""} ${cls}" data-act="${multi ? "toggle" : "choose"}" data-i="${i}" ${dis} role="${multi ? "checkbox" : "radio"}" aria-checked="${sel}"><span class="mk">${String.fromCharCode(65 + i)}</span><span>${o}${checked && q.why ? `<span class="why">${esc(q.why[i])}</span>` : ""}</span></button>`;
    }).join("")}</div>`;
  }
  if (q.type === "calc" && s.meta && s.meta[q.id + "__mc"]) {
    const ch = s.meta[q.id + "__mc"], fmtv = (v) => v.toLocaleString(undefined, { maximumFractionDigits: 6 }) + (q.unit ? " " + q.unit : "");
    return `<div class="opts" role="radiogroup">${ch.map((v, i) => { const sel = r !== undefined && r !== "" && +r === v; let cls = sel ? "sel" : ""; if (checked) cls = Math.abs(v - q.ans) <= (q.tol || 0) + 1e-9 ? "good" : sel ? "wrong" : ""; return `<button class="opt ${cls}" data-act="choosecalc" data-v="${v}" ${dis} role="radio" aria-checked="${sel}"><span class="mk">${String.fromCharCode(65 + i)}</span><span class="mono">${fmtv(v)}</span></button>`; }).join("")}</div>`;
  }
  if (q.type === "calc") return `<div class="calc-in"><input type="text" inputmode="decimal" id="calcIn" value="${esc(r || "")}" ${dis} aria-label="Your answer"><span class="muted">${esc(q.unit || "")}</span></div>${checked ? `<p class="mono" style="margin-top:8px">Correct answer: ${q.ans.toLocaleString()} ${esc(q.unit || "")}</p>` : ""}`;
  if (q.type === "order") {
    const ord = r || s.resp[q.id + "__init"] || q.items.map((_, i) => i);
    return `<p class="muted" style="font-size:.88rem;margin-bottom:8px">Drag items, or use the arrows, into the correct order.${r ? "" : " Your current order counts once you move an item or press Confirm."}</p><ol class="order-list" id="orderList">${ord.map((ix, pos) => `<li draggable="${!checked}" data-ix="${ix}" style="${checked ? (ix === pos ? "border-color:var(--ok)" : "border-color:var(--bad)") : ""}"><span class="n">${pos + 1}</span><span class="t">${esc(q.items[ix])}</span>${checked ? "" : `<span class="mv"><button data-act="mv" data-pos="${pos}" data-d="-1" aria-label="Move up">↑</button><button data-act="mv" data-pos="${pos}" data-d="1" aria-label="Move down">↓</button></span>`}</li>`).join("")}</ol>${!checked && !r ? `<button class="btn small" data-act="confirmorder" style="margin-top:8px">Confirm this order</button>` : ""}${checked ? `<p class="muted" style="margin-top:8px">Correct order: ${q.items.map((t, i) => (i + 1) + ". " + esc(t)).join(" · ")}</p>` : ""}`;
  }
  if (q.type === "match") {
    const opts = s.meta[q.id] || Array.from(new Set(q.pairs.map(p => p[1])));
    const cur = r || q.pairs.map(() => "");
    return `<div>${q.pairs.map((p, i) => `<div class="match-row ${checked ? (cur[i] === p[1] ? "good" : "wrong") : ""}"><span>${esc(p[0])}</span><span><select data-match="${i}" ${dis} aria-label="Match for ${esc(p[0])}"><option value="">Choose…</option>${opts.map(o => `<option ${cur[i] === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>${checked && cur[i] !== p[1] ? `<span class="muted" style="font-size:.85rem">Correct: ${esc(p[1])}</span>` : ""}</span></div>`).join("")}</div>`;
  }
  if (q.type === "hot") return `<div class="figure" id="hotFig">${q.svg}</div>`;
  return "";
}
const ELAB = ["Why is this the right answer? Explain it in one or two sentences, in your own words.", "What would change if the conditions in the question were different?", "Why would someone pick the most tempting wrong answer? What's the misconception?", "How does this connect to another ARE division or to your own project work?", "Why is this approach preferable to the alternatives?"];
function confRow(s, id) {
  const c = (s.conf || {})[id];
  return `<div class="confrow" role="group" aria-label="How sure are you?"><span class="muted">How sure are you?</span>${[[1, "Guessing"], [2, "Fairly sure"], [3, "Certain"]].map(([v, t]) => `<button class="chip ${c === v ? "on" : ""}" data-act="conf" data-v="${v}" aria-pressed="${c === v}">${t}</button>`).join("")}</div>`;
}
function feedback(q, r, s) {
  const ok = E.grade(q, r);
  const lesson = q.lesson && E.LMAP[q.lesson];
  const conf = s && s.conf ? s.conf[q.id] : null;
  const elab = ELAB[(q.id.length + (q.diff || 1)) % ELAB.length];
  const cal = conf ? (ok && conf === 1 ? `<p class="cal">You were guessing but got it right — you know more than you think. Review the reasoning to make it reliable.</p>` : !ok && conf === 3 ? `<p class="cal bad">You were certain but wrong. That's a misconception, the most valuable kind of mistake to fix. It's in your Learning Notes now.</p>` : "") : "";
  return `<div class="feedback ${ok ? "good" : "bad"}" role="status"><h3>${ok ? "Correct" : "Not quite"}</h3>${cal}<p>${q.explain}</p>
${!ok && q.type === "mc" && q.why && typeof r === "number" && q.why[r] ? `<p><b>Why “${String.fromCharCode(65 + r)}” is tempting but wrong:</b> ${q.why[r]}</p>` : ""}
<details class="elab"><summary>Think deeper: ${esc(elab)}</summary><textarea data-note="elab:${q.id}" placeholder="Write your explanation before moving on">${esc(E.S.notes["elab:" + q.id] || "")}</textarea>${q.why ? `<div class="muted" style="font-size:.88rem;margin-top:6px">${q.why.map((w, i) => `<div><b>${String.fromCharCode(65 + i)}.</b> ${w}</div>`).join("")}</div>` : ""}</details>
<div class="row" style="gap:6px"><button class="btn small" data-act="tutor" data-m="${ok ? "why" : "simple"}">Ask the tutor</button><button class="btn small ghost" data-act="confused" data-obj="${q.obj}">I don't understand this</button><button class="btn small ghost" data-act="mkvideo" data-kind="question" data-id="${q.id}">Video explanation</button></div>
<p class="muted" style="font-size:.86rem">Objective ${objLabel(q.obj)}: ${esc(ARE.OBJ[q.obj].title)}${lesson ? ` · Lesson: <a href="#lesson-${lesson.id}">${esc(lesson.title)}</a>` : ""}${q.ref ? ` · Reference: ${refLink(q.ref)}` : ""}</p>
<div>${bmBtn("question", q.id, q.q.replace(/<[^>]+>/g, "").slice(0, 80))}</div></div>`;
}
function tick() {
  if (SESSION && SESSION.onBreak) {
    const left = SESSION.breakMin * 60000 - (Date.now() - SESSION.onBreak);
    const bt = $("#breakTimer"); if (bt) bt.textContent = fmtClock(left);
    const tt = $("#timer"); if (tt) tt.textContent = "Paused";
    if (left <= 0) endBreak();
    return;
  }
  const el = $("#timer"); if (!el || !SESSION) return;
  if (el.dataset.hidden) { el.textContent = "—:—"; if (SESSION.limit && Date.now() - SESSION.start >= SESSION.limit && !SESSION.done) { toast("Time is up. Your exam was submitted."); finishSession(); } return; }
  const el2 = Date.now() - SESSION.start;
  if (SESSION.limit) {
    const left = Math.max(0, SESSION.limit - el2);
    el.textContent = fmtClock(left);
    el.classList.toggle("low", left < 5 * 60000);
    if (left <= 0 && !SESSION.done) { toast("Time is up. Your exam was submitted."); finishSession(); }
  } else el.textContent = Math.floor(el2 / 60000) + ":" + String(Math.floor(el2 / 1000) % 60).padStart(2, "0");
}
function bindQuizDom() {
  const s = SESSION, id = s.qids[s.i], q = E.QMAP[id];
  const ci = $("#calcIn"); if (ci) ci.addEventListener("input", () => { s.resp[id] = ci.value; E.saveSession(s); });
  $$("select[data-match]").forEach(sel => sel.addEventListener("change", () => {
    const cur = s.resp[id] || q.pairs.map(() => ""); cur[+sel.dataset.match] = sel.value; s.resp[id] = cur; E.saveSession(s);
  }));
  const fig = $("#hotFig");
  if (fig && !s.checked[id]) {
    const sel = s.resp[id]; if (sel) $$(".hs", fig).forEach(g => g.classList.toggle("sel", g.dataset.hs === sel));
    $$(".hs", fig).forEach(g => {
      const pick = () => { s.resp[id] = g.dataset.hs; E.saveSession(s); $$(".hs", fig).forEach(x => x.classList.toggle("sel", x === g)); };
      g.addEventListener("click", pick); g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
  } else if (fig) $$(".hs", fig).forEach(g => { if (g.dataset.hs === q.ans) g.classList.add("good"); else if (g.dataset.hs === s.resp[id]) g.classList.add("wrong"); });
  const ol = $("#orderList");
  if (ol && !s.checked[id]) {
    let dragEl = null;
    $$("li", ol).forEach(li => {
      li.addEventListener("dragstart", () => { dragEl = li; li.classList.add("drag"); });
      li.addEventListener("dragend", () => { li.classList.remove("drag"); $$("li", ol).forEach(x => x.classList.remove("over")); });
      li.addEventListener("dragover", e => { e.preventDefault(); li.classList.add("over"); });
      li.addEventListener("dragleave", () => li.classList.remove("over"));
      li.addEventListener("drop", e => {
        e.preventDefault(); if (!dragEl || dragEl === li) return;
        const items = $$("li", ol); const from = items.indexOf(dragEl), to = items.indexOf(li);
        const ord = (s.resp[id] || s.resp[id + "__init"]).slice(); const [m] = ord.splice(from, 1); ord.splice(to, 0, m);
        s.resp[id] = ord; E.saveSession(s); rerender();
      });
    });
  }
}
function endBreak() {
  const s = SESSION; if (!s || !s.onBreak) return;
  s.start += Date.now() - s.onBreak; s.onBreak = null; s.breakUsed = true;
  s.lockBefore = Math.min(s.qids.length - 1, (s.maxSeen || 0) + 1);
  s.i = Math.max(s.i, s.lockBefore); s.view = "item"; E.saveSession(s); rerender();
}
function finishSession() {
  const s = SESSION; if (!s || s.done) return;
  let correct = 0; const byObj = {};
  s.qids.forEach(id => {
    const q = E.QMAP[id], r = s.resp[id], ok = E.grade(q, r);
    if (!s.checked[id]) E.record(id, ok, s.mode === "exam" ? (q.case ? "case" : "exam") : s.mode, { conf: (s.conf || {})[id], chosen: typeof r === "number" ? r : null });
    if (ok) correct++;
    byObj[q.obj] = byObj[q.obj] || [0, 0]; byObj[q.obj][0]++; if (ok) byObj[q.obj][1]++;
  });
  s.done = true; s.end = Date.now(); s.correct = correct; s.byObj = byObj;
  E.S.results.push({ t: s.end, title: s.title, mode: s.caseId && s.mode === "case" ? "case" : s.mode, n: s.qids.length, correct, div: s.div, dur: s.end - s.start, form: s.form || null });
  if (ARE.UI) ARE.UI.hideTools();
  if (E.S.results.length > 300) E.S.results = E.S.results.slice(-300);
  if (s.mode === "check" && s.lessonId) {
    const need = Math.ceil(s.qids.length * 2 / 3);
    const st = E.S.lessons[s.lessonId] = E.S.lessons[s.lessonId] || { viewed: Date.now() };
    st.check = { c: correct, n: s.qids.length, t: s.end };
    if (correct >= need && !st.done) { st.done = s.end; ARE.L.lessonDone(s.lessonId); }
  }
  if (s.planStep !== undefined) ARE.L.completeStep(s.planStep, { n: s.qids.length, ok: correct });
  E.hooks.finish.forEach(f => { try { f({ form: s.form, div: s.div, correct, n: s.qids.length, title: s.title, mode: s.mode }); } catch (x) {} });
  stopActivity();
  E.save(true); E.saveSession(null);
  clearInterval(timerInt);
  rerender();
}
function vResults() {
  const s = SESSION, p = s.correct / s.qids.length;
  const lesson = s.lessonId && E.LMAP[s.lessonId];
  const need = Math.ceil(s.qids.length * 2 / 3);
  const missed = s.qids.filter(id => !E.grade(E.QMAP[id], s.resp[id]));
  return `
<div class="tblock"><div class="tb-main"><span class="eyebrow">${esc(s.title)} · results</span><h1>${s.correct} of ${s.qids.length} correct</h1>
${s.mode === "check" ? `<p>${s.correct >= need ? `Lesson complete. “${esc(lesson.title)}” is now marked complete.` : `You need ${need} correct to complete the lesson. Review the explanations, then retake.`}</p>` : `<p class="muted">Time: ${fmtMin((s.end - s.start) / 60000)}. Each answer has been added to your competency record and review schedule.</p>`}
${s.planStep !== undefined ? `<div class="row"><a class="btn primary" href="#today">Back to Today's Study Plan →</a></div>` : ""}
<div class="row"><button class="btn ${s.planStep !== undefined ? "" : "primary"}" data-act="retake">Retake</button>${missed.length ? `<button class="btn" data-act="practicemissed">Practice the ${missed.length} missed</button>` : ""}${lesson ? `<a class="btn" href="#lesson-${lesson.id}">Back to lesson</a>` : `<a class="btn" href="#exams">Practice exams</a>`}<a class="btn ghost" href="#dashboard">Dashboard</a></div></div>
<div class="tb-side"><div><small>Score</small><b>${pct(p)}</b></div><div><small>Mode</small><b style="font-size:.9rem">${s.mode}</b></div></div></div>
${(() => { if (s.mode !== "exam" && s.mode !== "case") return ""; const bySec = {}; s.qids.forEach(id => { const q = E.QMAP[id], o = ARE.OBJ[q.obj], k = o.div + "|" + o.sec; bySec[k] = bySec[k] || [0, 0, o]; bySec[k][0]++; if (E.grade(q, s.resp[id])) bySec[k][1]++; }); return `<section class="panel stack"><h2>Performance by section</h2><p class="muted" style="font-size:.88rem">Like NCARB's score report: how you did in each content section. Focus review where the bar is shortest.</p><div class="list">${Object.values(bySec).map(([n, ok, o]) => `<div class="stack" style="gap:6px"><div class="row between"><span>${divCode(o.div)} · Section ${o.sec}: ${esc(o.secName)}</span><b class="mono">${ok}/${n} · ${pct(ok / n)}</b></div>${bar(ok / n, ok / n >= 0.7 ? "var(--ok)" : ok / n >= 0.5 ? "var(--warn)" : "var(--bad)")}</div>`).join("")}</div></section>`; })()}
${missed.length ? `<section class="panel stack"><h2>Close the gaps</h2><p class="muted" style="font-size:.9rem">Each format reinforces the others: re-read, retest the same topics with different questions, then lock the terms in with flashcards.</p><div class="row"><button class="btn primary" data-act="retest">Quiz me on the missed topics</button><button class="btn" data-act="fcmissed">Flashcards for missed topics</button>${[...new Set(missed.map(id => E.QMAP[id].lesson).filter(Boolean))].slice(0, 4).map(lid => E.LMAP[lid] ? `<a class="btn ghost" href="#lesson-${lid}">Lesson: ${esc(E.LMAP[lid].title)}</a>` : "").join("")}</div></section>` : ""}
<section class="panel stack"><h2>By objective</h2><div class="list">${Object.entries(s.byObj).map(([k, [n, ok]]) => `<div class="row between"><span style="min-width:0"><span class="chip code">${objLabel(k)}</span> ${esc(ARE.OBJ[k].title)}</span><span class="row">${lvPill(E.comp(k).level)}<b class="mono">${ok}/${n}</b></span></div>`).join("")}</div></section>
<section class="stack"><h2>Review every question</h2>${s.qids.map((id, i) => { const q = E.QMAP[id], ok = E.grade(q, s.resp[id]); return `<details class="qrev" ${ok ? "" : "open"}><summary><span class="dot ${ok ? "good" : "bad"}"></span><span style="min-width:0"><span class="muted mono" style="font-size:.8rem">Q${i + 1} · ${objLabel(q.obj)} · ${esc(q.fmt || typeLabel(q))}</span><br>${q.q.replace(/<svg[\s\S]*<\/svg>/, "")}</span></summary><div class="body">${q.type === "hot" ? "" : renderInput(q, s, true)}${q.type === "hot" ? `<p>Your answer: <b>${esc(s.resp[id] || "none")}</b> · Correct: <b>${esc(q.ans)}</b></p>` : ""}${feedback(q, s.resp[id])}</div></details>`; }).join("")}</section>`;
}

/* ============================================================
   CASE STUDIES
   ============================================================ */
function caseCard(c) {
  const last = E.S.results.filter(r => r.title === c.title).slice(-1)[0];
  return `<a class="lessoncard" href="#${c.id}"><div class="row between"><span class="row" style="gap:6px">${c.divs.map(d => `<span class="chip code">${divCode(d)}</span>`).join("")}</span><span class="status">${["", "Level 1 · Introductory", "Level 2 · Intermediate", "Level 3 · Advanced"][c.level]}</span></div><h3>${esc(c.title)}</h3><p class="muted" style="font-size:.9rem">${esc(c.brief)}</p><span class="muted mono" style="font-size:.8rem">${c.resources.length} resources · ${c.questions.length} items${last ? ` · last ${last.correct}/${last.n}` : ""}</span></a>`;
}
function vCases() {
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Case study training</span><h1>Case Studies</h1><p class="muted" style="max-width:72ch">Each case gives you project documents and asks you to find information, calculate and decide. Following NCARB's April 2026 format, every case uses one or two resources. Cases run untimed by default; the division simulations include them under time.</p></div>
<div class="grid g2">${ARE.CASES.slice().sort((a, b) => a.level - b.level).map(caseCard).join("")}</div>`;
}
function vCaseIntro(id) {
  const c = ARE.CASES.find(x => x.id === id);
  return `<div class="tblock"><div class="tb-main"><span class="eyebrow">Case study · ${c.divs.map(divCode).join(" / ")}</span><h1>${esc(c.title)}</h1><p style="max-width:70ch">${esc(c.brief)}</p>
<div class="row"><button class="btn primary" data-act="casestart" data-id="${c.id}" data-timed="0">Start case (untimed)</button><button class="btn" data-act="casestart" data-id="${c.id}" data-timed="1">Start timed</button></div></div>
<div class="tb-side"><div><small>Items</small><b>${c.questions.length}</b></div><div><small>Level</small><b>${c.level}</b></div></div></div>
<section class="stack"><h2>Resources preview</h2>${c.resources.map(r => `<div class="panel stack"><h3>${esc(r.name)}</h3><div class="scroll">${r.html}</div></div>`).join("")}</section>`;
}

/* ============================================================
   COMPETENCY TRACKER
   ============================================================ */
/* ============================================================
   FLASHCARDS (Leitner, tied to objectives)
   ============================================================ */
const FC_GAP = [0, 1, 3, 7, 16, 35];
function fcCards() {
  const base = E.glossary.filter(g => g.lesson && E.LMAP[g.lesson]).map(g => ({ id: "fc:" + g.term, g, l: E.LMAP[g.lesson] }));
  const mine = (E.S.cards || []).map(c => { const lid = (E.objLessons[c.obj] || [])[0]; return lid ? { id: c.id, g: { term: c.front, def: c.back }, l: E.LMAP[lid], mine: true } : null; }).filter(Boolean);
  return mine.concat(base);
}
function fcDue() { const now = Date.now(); return fcCards().filter(c => { const st = (E.S.fc || {})[c.id]; return st && st.due <= now; }).map(c => c.id); }
function fcDeck() {
  const f = UI.fcFilter || "all", now = Date.now();
  let cards = fcCards();
  if (UI.fcLesson) cards = cards.filter(c => c.l.id === UI.fcLesson);
  if (f === "due") cards = cards.filter(c => { const st = (E.S.fc || {})[c.id]; return !st || st.due <= now; });
  else if (f === "missed") { const objs = new Set(UI.fcObjs || E.missedIds().map(id => E.QMAP[id] && E.QMAP[id].obj)); cards = cards.filter(c => (c.l.obj || []).some(k => objs.has(k))); }
  else if (f !== "all") cards = cards.filter(c => c.l.div === f);
  return cards;
}
function vFlashcards() {
  const deck = fcDeck(), f = UI.fcFilter || "all";
  if (UI.fcI >= deck.length) UI.fcI = 0;
  const c = deck[UI.fcI || 0], st = c && (E.S.fc || {})[c.id];
  const known = Object.values(E.S.fc || {}).filter(x => x.box >= 3).length;
  return `
<div class="stack" style="gap:6px"><span class="eyebrow">${fcCards().length} cards · glossary terms plus cards made from your learning notes</span><h1>Flashcards</h1></div>
<div class="row"><button class="chip ${!UI.fcType ? "on" : ""}" data-act="fcmode" data-v="">Flip cards</button><button class="chip ${UI.fcType ? "on" : ""}" data-act="fcmode" data-v="1">Type the term (active recall)</button><span class="muted" style="font-size:.85rem">Swipe right = Got it, left = Again</span></div>
<div class="row">${[["all", "All"], ["due", `Due / new`], ["missed", "Missed on exams"]].concat(ARE.DIVISIONS.map(d => [d.id, d.code])).map(([k, t]) => `<button class="chip ${f === k ? "on" : ""}" data-act="fcf" data-f="${k}">${t}</button>`).join("")}${UI.fcLesson ? `<button class="chip on" data-act="fcf" data-f="${f}" data-clear="1">Lesson: ${esc(E.LMAP[UI.fcLesson].title)} ✕</button>` : ""}</div>
${c ? `<div class="fcstudy stack">
<div class="row between"><span class="muted mono">Card ${(UI.fcI || 0) + 1} of ${deck.length}${st ? ` · box ${st.box}` : " · new"}</span><a href="#lesson-${c.l.id}" class="muted" style="font-size:.88rem">${divCode(c.l.div)} · ${esc(c.l.title)}</a></div>
${UI.fcType && !c.mine ? `<div class="fcard big flipped static" aria-live="polite"><span class="f-back" style="display:block">${esc(c.g.def)}</span>${UI.fcFlip ? `<span class="f-front" style="margin-top:12px;display:block">${esc(c.g.term)}${UI.fcTyped !== null && UI.fcTyped !== undefined ? ` · <span class="${fcMatch(UI.fcTyped, c.g.term) ? "okc" : "badc"}">you wrote “${esc(UI.fcTyped)}”</span>` : ""}</span>` : ""}</div>${UI.fcFlip ? "" : `<div class="row" style="justify-content:center"><input id="fcTypeIn" type="text" placeholder="Type the term" aria-label="Type the term" autocomplete="off" autocapitalize="off"><button class="btn primary" data-act="fctype">Check</button></div>`}`
: `<button class="fcard big swipe ${UI.fcFlip ? "flipped" : ""}" id="fcBig" data-act="fcflip" aria-label="${UI.fcFlip ? "Answer shown. Tap to see the term again" : "Tap to reveal the answer"}" aria-live="polite">${c.mine ? `<span class="vs-tag">From my learning notes</span>` : ""}<span class="fc-in"><span class="f-front">${esc(c.g.term)}</span><span class="f-back">${esc(c.g.def)}</span></span></button>`}
<div class="row" id="fcCtl" style="justify-content:center">${fcCtl()}</div>
<p class="muted" style="font-size:.85rem;text-align:center">Scheduling uses the SM-2 algorithm: cards you know come back after longer and longer gaps; “Again” brings a card back in a minute and shortens its future intervals. Each card counts as a repetition for its objectives.</p></div>` : `<div class="empty">No cards in this view${f === "due" ? " — nothing due. Come back tomorrow, or study All." : "."}</div>`}
<div class="grid g3"><div class="panel kpi"><b>${Object.keys(E.S.fc || {}).length}</b><span>Cards studied</span></div><div class="panel kpi"><b>${known}</b><span>In box 3+ (a week or longer)</span></div><div class="panel kpi"><b>${fcDue().length}</b><span>Due now</span></div></div>`;
}
function vTracker() {
  const ov = E.overall();
  const weeks = []; const start = E.startOfDay(Date.now()) - 7 * 7 * DAY;
  for (let i = 0; i < 8; i++) { const a = start + i * 7 * DAY, b = a + 7 * DAY; const at = E.S.attempts.filter(x => x.t >= a && x.t < b); if (at.length) weeks.push([fmtDate(a), at.filter(x => x.ok).length / at.length]); }
  const all = Object.keys(ARE.OBJ).map(k => E.comp(k));
  const dist = [0, 0, 0, 0, 0]; all.forEach(c => dist[c.level]++);
  const outstanding = all.filter(c => c.level < 3);
  const f = UI.trackFilter;
  return `
<div class="stack" style="gap:6px"><span class="eyebrow">Measured by answers over time, not pages read</span><h1>Competency Tracker</h1></div>
<div class="grid g4"><div class="panel kpi"><b>${pct(ov.readiness)}</b><span>Overall readiness</span></div><div class="panel kpi"><b>${dist[3] + dist[4]}<small class="muted" style="font-size:1rem">/91</small></b><span>Objectives proficient or mastered</span></div><div class="panel kpi"><b>${ov.n}</b><span>Answers recorded</span></div><div class="panel kpi"><b>${fmtMin(E.minutesSince(0))}</b><span>Total study time</span></div></div>
<section class="panel stack"><h2>How levels are earned</h2><div class="grid g3" style="font-size:.9rem">
<p>${lvPill(1)}<br>Lesson opened or completed, or fewer than 3 answers.</p>
<p>${lvPill(2)}<br>At least 3 answers, but fewer than 5 or a weighted score under 60% (or 60–69%).</p>
<p>${lvPill(3)}<br>5+ answers with a weighted score of 70% or more.</p>
<p>${lvPill(4)}<br>85%+ over 8+ answers on 2+ different days, including a correct hardest-level item, no question still wrong on its latest try, and the lesson passed.</p>
<p class="muted">Recent answers count more (half-weight after 45 days), harder items count more, and your latest answer to each question outweighs older ones.</p>
<p class="muted">Readiness weights each objective by its section's exam weight. A timed exam in the last 30 days contributes 35%. It is an estimate, not a pass prediction.</p></div></section>
<div class="grid g2"><section class="panel stack"><h2>Weekly accuracy</h2>${lineChart(weeks.map(w => w[1]), weeks.map(w => w[0]), "Weekly accuracy trend")}</section>
<section class="panel stack"><h2>All 91 objectives</h2>${distBar(dist)}<div class="list">${dist.map((n, i) => `<div class="row between">${lvPill(i)}<b class="mono">${n}</b></div>`).join("")}</div></section></div>
<section class="stack"><div class="row between"><h2>By division</h2><div class="row"><button class="chip ${f === "all" ? "on" : ""}" data-act="tf" data-f="all">All</button><button class="chip ${f === "out" ? "on" : ""}" data-act="tf" data-f="out">Outstanding (${outstanding.length})</button>${[0, 1, 2, 3, 4].map(i => `<button class="chip ${f === String(i) ? "on" : ""}" data-act="tf" data-f="${i}">${E.LV[i]}</button>`).join("")}</div></div>
${ARE.DIVISIONS.map(d => { const s = E.divStats(d.id); const objs = d.objectives.filter(o => { const c = E.comp(o.key); return f === "all" || (f === "out" ? c.level < 3 : String(c.level) === f); }); if (!objs.length) return ""; return `
<details class="qrev" ${f !== "all" ? "open" : ""}><summary><span style="flex:1;min-width:0"><span class="row between"><b>${d.code} · ${d.name}</b><span class="mono">${pct(s.readiness)} · ${E.readyLabel(s.readiness)}</span></span><span style="display:block;margin-top:8px">${distBar(s.dist)}</span></span></summary><div class="body"><div class="list">${objs.map(o => { const c = E.comp(o.key); return `<div class="objrow"><span class="chip code">${o.code}</span><span style="min-width:0">${esc(o.title)}<br><span class="muted" style="font-size:.82rem">${c.n} answers · ${c.days} day${c.days === 1 ? "" : "s"}${c.last ? " · last " + fmtDate(c.last) : ""}${c.outstanding ? ` · ${c.outstanding} still wrong` : ""}${c.qcount ? "" : " · no questions yet"} · ${Math.min(E.reinforce(o.key), 99)}/${E.REINFORCE_TARGET} reps</span></span><span class="hide-sm">${lvPill(c.level, c)}</span><span class="hide-sm mono">${pct(c.score)}</span></div>`; }).join("")}</div></div></details>`; }).join("")}</section>`;
}

/* ============================================================
   REFERENCE LIBRARY
   ============================================================ */
function vReference() {
  const t = UI.refTab;
  const tabs = [["glossary", "Glossary"], ["formulas", "Formulas & calculators"], ["handbook", "Handbook cross-reference"], ["toc", "Handbook contents"], ["aia", "AIA documents"], ["ibc", "IBC 2021"], ["sources", "Sources & access"]];
  let body = "";
  if (t === "glossary") {
    const cats = Array.from(new Set(E.glossary.map(g => g.cat))).sort();
    const q = UI.gq.toLowerCase();
    const items = E.glossary.filter(g => (UI.gcat === "all" || g.cat === UI.gcat) && (!q || (g.term + " " + g.def).toLowerCase().includes(q))).sort((a, b) => a.term.localeCompare(b.term));
    body = `<div class="row"><input type="search" id="gq" placeholder="Search ${E.glossary.length} terms" value="${esc(UI.gq)}" aria-label="Search glossary" style="min-width:240px"><select id="gcat" aria-label="Category"><option value="all">All categories</option>${cats.map(c => `<option ${UI.gcat === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
<div class="list">${items.map(g => `<div class="stack" style="gap:4px"><div class="row between"><b>${esc(g.term)}</b><span class="row" style="gap:6px"><span class="chip">${esc(g.cat)}</span>${bmBtn("term", g.term, g.term)}</span></div><span>${esc(g.def)}</span>${g.lesson && E.LMAP[g.lesson] ? `<a href="#lesson-${g.lesson}" style="font-size:.85rem">Lesson: ${esc(E.LMAP[g.lesson].title)}</a>` : ""}</div>`).join("") || '<div class="empty">No terms match.</div>'}</div>`;
  } else if (t === "formulas") {
    const cats = Array.from(new Set(ARE.FORMULAS.map(f => f.cat)));
    body = cats.map(c => `<div class="panel stack"><h3>${c}</h3>${ARE.FORMULAS.filter(f => f.cat === c).map(f => `<div class="formula"><b>${esc(f.name)}</b><span><code>${esc(f.f)}</code>${f.note ? `<br><span class="muted" style="font-size:.85rem">${esc(f.note)}</span>` : ""}${f.lesson && E.LMAP[f.lesson] ? `<br><a href="#lesson-${f.lesson}" style="font-size:.85rem">${esc(E.LMAP[f.lesson].title)}</a>` : ""}${f.calc ? calculator(f.calc) : ""}</span></div>`).join("")}</div>`).join("");
  } else if (t === "handbook") {
    const H = ARE.HANDBOOK, q = UI.hbq.toLowerCase();
    const items = H.topics.filter(x => !q || (x.topic + " " + x.summary + " " + x.terms.join(" ") + " " + x.docs.join(" ") + " " + x.objs.join(" ")).toLowerCase().includes(q));
    const areas = Array.from(new Set(H.topics.map(x => x.area)));
    body = `<div class="panel stack"><span class="eyebrow">Source</span><b>${esc(H.title)}, ${esc(H.edition)}</b><span class="muted">${esc(H.publisher)}</span><p style="font-size:.92rem">${esc(H.note)}</p></div>
<input type="search" id="hbq" placeholder="Search topics, objectives (e.g. pjm-3.1), terms or documents" value="${esc(UI.hbq)}" aria-label="Search Handbook topics">
${areas.map(a => { const ts = items.filter(x => x.area === a); if (!ts.length) return ""; return `<h3 style="margin-top:8px">${a}</h3>${ts.map(hbTopic).join("")}`; }).join("") || '<div class="empty">No topics match.</div>'}`;
  } else if (t === "toc") {
    const back = {}; Object.entries(ARE.HB_OBJ).forEach(([k, refs]) => refs.forEach(([sec]) => (back[sec] = back[sec] || new Set()).add(k)));
    const topicBy = {}; ARE.HANDBOOK.topics.forEach(x => x.sections.forEach(sn => (topicBy[sn] = topicBy[sn] || []).push(x)));
    body = `<div class="panel stack"><span class="eyebrow">Contents of your copy</span><b>${esc(ARE.HANDBOOK.title)}, ${esc(ARE.HANDBOOK.edition)}</b><span class="muted">${esc(ARE.HANDBOOK.publisher)}</span><p style="font-size:.92rem">Each section lists the ARE objectives the Wiley crosswalks tie to it. Sections with no objectives are still useful practice reading; the ARE simply draws less from them. Glossary: Appendix B, p. ${ARE.HANDBOOK.glossaryPage}.</p><div class="row"><a class="btn small" href="${ARE.HANDBOOK.fileUrl}" target="_blank" rel="noopener">Open Handbook PDF ↗</a>${ARE.DRIVE.crosswalks.map(c => `<a class="btn small ghost" href="${c.url}" target="_blank" rel="noopener">${c.d} crosswalk ↗</a>`).join("")}</div></div>
${ARE.HANDBOOK.toc.map(pt => `<details class="qrev"><summary><span style="flex:1"><b>${esc(pt.part)}</b> <span class="muted mono">p. ${pt.p}</span></span></summary><div class="body">${pt.ch.map(([n, ct, cp, secs]) => `<div class="stack" style="gap:6px"><h3>Ch. ${n} · ${esc(ct)} <span class="muted mono" style="font-weight:400">p. ${cp}</span></h3><div class="list">${secs.map(([sn, st, sp]) => `<div class="row between" style="flex-wrap:nowrap;align-items:flex-start"><span style="min-width:0"><span class="mono">§${sn}</span> ${esc(st)}${back[sn] ? `<br>${[...back[sn]].map(k => `<a class="chip code" href="#div-${k.split("-")[0]}">${objLabel(k)}</a>`).join(" ")}` : ""}${topicBy[sn] ? `<br>${topicBy[sn].map(x => `<button class="chip" data-act="hbopen" data-id="${x.id}">${esc(x.topic)}</button>`).join(" ")}` : ""}</span><span class="mono muted">p. ${sp}</span></div>`).join("")}</div></div>`).join("")}</div></details>`).join("")}`;
  } else if (t === "ibc") {
    const I = ARE.IBC;
    body = `<div class="panel stack"><span class="eyebrow">Code basis for this app</span><b>${esc(I.title)}</b><p style="font-size:.92rem">${esc(I.note)}</p><div class="row"><a class="btn primary small" href="${I.home}" target="_blank" rel="noopener">Open the 2021 IBC ↗</a></div></div>
<div class="panel stack"><h3>Chapters used in the curriculum</h3><div class="list">${I.chapters.map(([n, tt, u]) => `<div class="row between"><span><span class="mono">Ch. ${n}</span> ${esc(tt)}</span><a href="${u}" target="_blank" rel="noopener">Open ↗</a></div>`).join("")}</div></div>
<div class="panel stack"><h3>Sections cited in lessons and questions</h3><div class="list">${I.sections.map(([sec, tt, ch, u, qs, ok]) => `<div class="stack" style="gap:4px"><div class="row between" style="flex-wrap:nowrap"><span><span class="mono">§${sec}</span> ${esc(tt)} <span class="muted">· Ch. ${ch}</span></span><a href="${u || ARE.IBC.chapterUrl(ch)}" target="_blank" rel="noopener">${u ? "Section" : "Chapter"} ↗</a></div>${qs.filter(id => E.QMAP[id]).length ? `<div class="row" style="gap:6px">${qs.filter(id => E.QMAP[id]).map(id => `<button class="chip code" data-act="qone" data-id="${id}">${objLabel(E.QMAP[id].obj)}</button>`).join("")}<button class="btn small ghost" data-act="qset" data-ids="${qs.filter(id => E.QMAP[id] && !E.QMAP[id].case).join(",")}">Practice these</button></div>` : ""}</div>`).join("")}</div>
<p class="muted" style="font-size:.85rem">Section numbers were matched to ICC's 2021 section pages where a direct link is shown. Values in lessons (load factors, widths, distances) follow the 2021 edition; earlier editions differ (business areas were 100 gross before 2018).</p></div>
<div class="note-canada"><b>Canadian practice note.</b> The Ontario Building Code is a separate code with different numbering, tables and values. Use the IBC for the ARE only.</div>`;
  } else if (t === "aia") {
    body = `<p class="muted" style="max-width:75ch">The AIA sample documents in your ARE Prep folder. Sections marked as verified were checked against your samples, and the lessons and questions cite them. Samples carry AIA's copyright notice; read them in Drive rather than copying them.</p>
${ARE.AIADOCS.map(d => `<div class="panel stack"><div class="row between"><span><span class="chip code">${esc(d.doc)}</span> <b>${esc(d.title)}</b></span><a class="btn small" href="${d.url}" target="_blank" rel="noopener">Open in Drive ↗</a></div><p class="muted" style="font-size:.9rem">${esc(d.use)}</p><div class="row" style="gap:6px"><span class="eyebrow">Objectives</span>${d.objs.map(k => `<a class="chip code" href="#div-${k.split("-")[0]}" title="${esc(ARE.OBJ[k].title)}">${objLabel(k)}</a>`).join("")}</div>${d.verified ? `<details><summary class="btn small" style="width:max-content">${d.verified.length} verified sections</summary><div class="list" style="margin-top:8px">${d.verified.map(([sec, txt]) => `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><span class="mono" style="min-width:80px">${esc(sec)}</span><span>${esc(txt)}</span></div>`).join("")}</div></details>` : ""}</div>`).join("")}`;
  } else {
    body = `<div class="panel stack"><h3>Your ARE Prep folder (Google Drive)</h3><p style="font-size:.92rem">NCARB ARE 5.0 Guidelines (October 2026), the Handbook (15th ed.), six Wiley Handbook-to-ARE crosswalks and ${ARE.AIADOCS.length} AIA document samples. <a href="${ARE.DRIVE.folder}" target="_blank" rel="noopener">Open the folder ↗</a></p></div>
<div class="scroll"><table class="tbl"><thead><tr><th>Source</th><th>Use for</th><th>Access</th><th>Where</th></tr></thead><tbody>${ARE.SOURCES.map(s => `<tr><td>${/International Building Code/.test(s.name) ? `<a href="${ARE.IBC.home}" target="_blank" rel="noopener">${esc(s.name)} ↗</a>` : esc(s.name)}</td><td>${esc(s.use)}</td><td>${esc(s.access)}</td><td class="mono">${esc(s.where)}</td></tr>`).join("")}</tbody></table></div>
<div class="panel stack"><h3>Three kinds of knowledge</h3><p><b>ARE exam knowledge</b>: what NCARB tests, based on US model codes (IBC 2021 family), AIA documents and federal law. <b>General practice</b>: how firms actually work, drawn from the Handbook. <b>Jurisdiction-specific rules</b>: adopted code editions and local amendments, and in your daily work, the Ontario Building Code and CCDC documents. Lessons flag Canadian differences in separate notes; never use them on the exam.</p></div>`;
  }
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Glossary · formulas · Handbook map · sources</span><h1>Reference Library</h1></div>
<div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" class="${t === k ? "on" : ""}" data-act="reftab" data-t="${k}">${l}</button>`).join("")}</div><div class="stack">${body}</div>`;
}
function hbTopic(t) {
  const qn = E.questions.filter(q => !q.case && t.objs.includes(q.obj)).length;
  return `<div class="panel hb-topic" id="hb-${t.id}"><div class="row between"><h3>${esc(t.topic)}</h3>${bmBtn("handbook", t.id, t.topic)}</div><p>${esc(t.summary)}</p>
<div class="row" style="gap:6px"><span class="eyebrow">Objectives</span>${t.objs.map(k => `<a class="chip code" href="#div-${k.split("-")[0]}" title="${esc(ARE.OBJ[k].title)}">${objLabel(k)}</a>`).join("")}</div>
<div class="row" style="gap:6px"><span class="eyebrow">Lessons</span>${t.lessons.filter(id => E.LMAP[id]).map(id => `<a class="chip" href="#lesson-${id}">${esc(E.LMAP[id].title)}</a>`).join("")}</div>
${t.terms.length ? `<div class="row" style="gap:6px"><span class="eyebrow">Terms</span>${t.terms.map(x => `<button class="chip" data-act="term" data-t="${esc(x)}">${esc(x)}</button>`).join("")}</div>` : ""}
${t.docs.length ? `<div class="row" style="gap:6px"><span class="eyebrow">Documents</span>${t.docs.map(x => `<span class="chip code">${esc(x)}</span>`).join("")}</div>` : ""}
<div class="list">${t.sections.map(sn => { const x = ARE.HB_SEC[sn]; return `<div class="row between" style="flex-wrap:nowrap"><span><span class="mono">§${sn}</span> ${esc(x.t)} <span class="muted">· Ch. ${x.ch} ${esc(x.chT)}</span></span><span class="mono muted">p. ${x.p}</span></div>`; }).join("")}</div>
<div class="row" style="align-items:flex-end"><label class="f" style="flex:1;min-width:200px">Your reading notes for this topic<input type="text" data-hbloc="${t.id}" value="${esc(E.S.hbLoc[t.id] || "")}" placeholder="e.g. read §7.2 on 11/10; review Table 10.4"></label><button class="btn" data-act="hbquiz" data-id="${t.id}" ${qn ? "" : "disabled"}>Practice ${qn} questions</button></div></div>`;
}
function calculator(kind) {
  const F = {
    gross: [["Net sf", "a", 18200], ["Efficiency", "b", 0.7]],
    slope: [["Rise", "a", 3], ["Run", "b", 60]],
    ol: [["Area sf", "a", 6000], ["Load factor", "b", 50]],
    width: [["Occupants", "a", 240], ["in/occupant", "b", 0.3]],
    u: [["R values, comma-separated", "a", "0.68,0.45,13,0.62,5,0.17"]],
    firm: [["NOR $", "a", 1950000], ["Direct labor $", "b", 560000], ["Indirect $", "c", 952000]],
    ev: [["BAC $", "a", 60000], ["% complete", "b", 40], ["AC $", "c", 32000], ["PV $", "d", 30000]],
    pay: [["Completed $", "a", 600000], ["Stored $", "b", 40000], ["Retainage %", "c", 10], ["Previous $", "d", 450000]]
  }[kind];
  return `<div class="calcbox" data-calc="${kind}"><div class="row">${F.map(([l, k, v]) => `<label class="f">${l}<input type="text" data-k="${k}" value="${v}" ${kind === "u" ? 'style="width:260px"' : ""}></label>`).join("")}</div><div>Result: <span class="out" data-out>—</span></div></div>`;
}
function runCalc(box) {
  const k = box.dataset.calc, v = {}; $$("input", box).forEach(i => v[i.dataset.k] = i.value);
  const n = (x) => parseFloat(String(x).replace(/[,$\s]/g, ""));
  let out = "—";
  try {
    if (k === "gross") out = Math.round(n(v.a) / n(v.b)).toLocaleString() + " gsf";
    if (k === "slope") out = (n(v.a) / n(v.b) * 100).toFixed(2) + "% (1:" + (n(v.b) / n(v.a)).toFixed(1) + ")";
    if (k === "ol") out = Math.ceil(n(v.a) / n(v.b) - 1e-9) + " occupants";
    if (k === "width") out = (n(v.a) * n(v.b)).toFixed(1) + " in (check code minimums)";
    if (k === "u") { const R = String(v.a).split(",").map(n).filter(x => !isNaN(x)).reduce((a, b) => a + b, 0); out = "R_T " + R.toFixed(2) + " → U " + (1 / R).toFixed(3); }
    if (k === "firm") { const nm = n(v.a) / n(v.b), oh = n(v.c) / n(v.b); out = `net multiplier ${nm.toFixed(2)} · OH rate ${oh.toFixed(2)} · break-even ${(1 + oh).toFixed(2)} · profit $${Math.round(n(v.a) - n(v.b) - n(v.c)).toLocaleString()}`; }
    if (k === "ev") { const ev = n(v.a) * n(v.b) / 100, cpi = ev / n(v.c), spi = ev / n(v.d); out = `EV $${Math.round(ev).toLocaleString()} · CPI ${cpi.toFixed(2)} · SPI ${spi.toFixed(2)} · EAC $${Math.round(n(v.a) / cpi).toLocaleString()}`; }
    if (k === "pay") { const tot = n(v.a) + n(v.b), ret = tot * n(v.c) / 100; out = `retainage $${Math.round(ret).toLocaleString()} · due $${Math.round(tot - ret - n(v.d)).toLocaleString()}`; }
    if (/NaN|Infinity/.test(out)) out = "Check the inputs";
  } catch (e) { out = "Check the inputs"; }
  $("[data-out]", box).textContent = out;
}

/* ============================================================
   STUDY PLANNER
   ============================================================ */
function vPlanner() {
  const P = E.S.planner, plan = E.plan();
  const wk = E.weeklyMinutes(8);
  const today = E.dayKey(Date.now());
  const goals = (P.goals || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const overdue = goals.filter(g => !g.done && g.date < today).length;
  return `
<div class="stack" style="gap:6px"><span class="eyebrow">Plan built from exam weighting, your competency, difficulty and your time</span><h1>Study Planner</h1></div>
<section class="panel stack"><h2>Your target</h2><div class="row" style="align-items:flex-end">
<label class="f">Target exam date<input type="date" id="plDate" value="${esc(P.examDate)}"></label>
<label class="f">Study hours per week<input type="number" id="plHours" min="1" max="60" value="${P.hours}" style="width:100px"></label>
<div class="f"><span>Divisions, in the order you will take them</span><div class="row">${ARE.DIVISIONS.map(d => `<button class="chip ${P.divs.includes(d.id) ? "on" : ""}" data-act="pldiv" data-div="${d.id}">${P.divs.includes(d.id) ? P.divs.indexOf(d.id) + 1 + ". " : ""}${d.code}</button>`).join("")}</div></div></div></section>
${plan ? `<section class="stack"><div class="row between"><h2>${plan.weeks}-week plan · ${plan.total} hours</h2><button class="btn" data-act="plgoals">Add this week's plan to my daily goals</button></div>
<p class="muted">The plan recalculates as your competency changes. Mastered objectives drop out; weak, heavily weighted objectives get more time. The final week is reserved for timed exams and review.</p>
${plan.sched.map((w, i) => w.tasks.length ? `<details class="qrev" ${i === 0 ? "open" : ""}><summary><span style="flex:1"><span class="row between"><b>Week ${i + 1} · ${fmtDate(w.start)}</b><span class="mono">${w.hours.toFixed(1)} h</span></span></span></summary><div class="body"><div class="list">${w.tasks.map(t => planTask(t)).join("")}</div></div></details>` : "").join("")}</section>`
  : `<div class="empty">Choose a target date and at least one division to generate a plan.</div>`}
<div class="grid g2">
<section class="panel stack"><div class="row between"><h2>Daily goals</h2>${overdue ? `<button class="btn small" data-act="resched">Move ${overdue} overdue to today</button>` : ""}</div>
<div class="row"><input type="text" id="goalText" placeholder="e.g. Finish egress lesson and its check" style="flex:1;min-width:180px" aria-label="Goal"><input type="date" id="goalDate" value="${today}" aria-label="Goal date"><button class="btn" data-act="addgoal">Add</button></div>
<div class="list">${goals.length ? goals.map(g => `<div class="row between" style="flex-wrap:nowrap"><label class="row" style="flex-wrap:nowrap;min-width:0"><input type="checkbox" data-goal="${g.id}" ${g.done ? "checked" : ""}><span style="${g.done ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(g.text)}</span></label><span class="row" style="flex-wrap:nowrap"><span class="mono ${!g.done && g.date < today ? "" : "muted"}" style="${!g.done && g.date < today ? "color:var(--bad)" : ""}">${g.date === today ? "Today" : fmtDate(g.date + "T12:00")}</span><button class="btn small ghost" data-act="delgoal" data-id="${g.id}" aria-label="Delete goal">✕</button></span></div>`).join("") : '<div class="empty">No goals yet.</div>'}</div></section>
<section class="panel stack"><h2>Weekly progress</h2>${barChart(wk.map(w => +(w.min / 60).toFixed(1)), wk.map(w => fmtDate(w.start)), { target: +P.hours || 0, fmt: v => v + "h", label: "Hours studied per week, last 8 weeks" })}
<p class="muted" style="font-size:.85rem">Time in lessons and quizzes is logged automatically. Log other study (reading the Handbook, a review course) below.</p>
<div class="row"><input type="date" id="sesDate" value="${today}" aria-label="Session date"><input type="number" id="sesMin" placeholder="Minutes" min="5" max="600" style="width:100px" aria-label="Minutes"><input type="text" id="sesNote" placeholder="What did you study?" style="flex:1;min-width:140px" aria-label="Session note"><button class="btn" data-act="addses">Log session</button></div>
<div class="list">${(P.sessions || []).slice(-5).reverse().map(s => `<div class="row between"><span>${esc(s.note || "Study session")}</span><span class="mono muted">${fmtDate(s.date + "T12:00")} · ${s.min} min</span></div>`).join("")}</div></section></div>`;
}
function planTask(t) {
  if (t.kind === "exam") return `<div class="row between"><span><b>Timed simulation: ${ARE.DIV[t.div].name}</b></span><span class="row"><span class="mono muted">${t.hours} h</span><button class="btn small" data-act="exam" data-div="${t.div}">Start</button></span></div>`;
  if (t.kind === "official") return `<div class="row between"><span><b>NCARB practice exam: ${ARE.DIV[t.div].name}</b> <span class="muted" style="font-size:.85rem">· full length, timed; then log it</span></span><span class="row"><span class="mono muted">${t.hours} h</span><a class="btn small" href="${ARE.NCARB_PE.exams[t.div].url}" target="_blank" rel="noopener">Open ↗</a></span></div>`;
  if (t.kind === "review") return `<div class="row between"><span><b>Clear the review queue and missed questions</b></span><span class="row"><span class="mono muted">${t.hours} h</span><button class="btn small" data-act="review-due">Start</button></span></div>`;
  const o = ARE.OBJ[t.obj];
  return `<div class="row between" style="flex-wrap:nowrap"><span style="min-width:0"><span class="chip code">${objLabel(t.obj)}</span> ${t.kind === "lesson" ? `Lesson “${esc(E.LMAP[t.lesson].title)}”, then quiz` : t.cont ? "Continue: practice and review" : "Practice quiz"} <span class="muted" style="font-size:.85rem">· ${esc(o.title)}</span></span><span class="row" style="flex-wrap:nowrap">${lvPill(t.level)}<span class="mono muted">${t.hours} h</span>${t.kind === "lesson" ? `<a class="btn small" href="#lesson-${t.lesson}">Open</a>` : E.objQ[t.obj].length ? `<button class="btn small" data-act="quiz" data-obj="${t.obj}">Start</button>` : `<span class="muted" style="font-size:.8rem">Read Handbook</span>`}</span></div>`;
}

/* ============================================================
   MY NOTES
   ============================================================ */
function vNotes() {
  const q = UI.notesQ.toLowerCase();
  const notes = Object.entries(E.S.notes).filter(([k, v]) => v && v.trim() && k !== "general" && (!q || v.toLowerCase().includes(q)));
  const bms = E.S.bookmarks.filter(b => !q || b.label.toLowerCase().includes(q));
  const label = (k) => { const [kind, id] = k.split(":"); const l = E.LMAP[id]; return (kind === "scenario" ? "Scenario answer · " : "") + (l ? l.title : id); };
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Notes save automatically as you type</span><h1>My Notes</h1></div>
<input type="search" id="notesQ" placeholder="Search notes and bookmarks" value="${esc(UI.notesQ)}" aria-label="Search notes">
<section class="panel stack"><h2>General notebook</h2><textarea data-note="general" style="min-height:200px" placeholder="Anything: mnemonics, questions for your mentor, exam-day logistics">${esc(E.S.notes.general || "")}</textarea></section>
<div class="grid g2">
<section class="panel stack"><h2>Lesson notes (${notes.length})</h2>${notes.length ? `<div class="list">${notes.map(([k, v]) => `<div class="stack" style="gap:4px"><a href="#lesson-${k.split(":")[1]}"><b>${esc(label(k))}</b></a><span style="white-space:pre-wrap;font-size:.92rem">${esc(v.length > 400 ? v.slice(0, 400) + "…" : v)}</span></div>`).join("")}</div>` : '<div class="empty">Notes you write in lessons appear here.</div>'}</section>
<section class="panel stack"><h2>Bookmarks (${bms.length})</h2>${bms.length ? `<div class="list">${bms.slice().reverse().map(b => `<div class="row between" style="flex-wrap:nowrap"><span style="min-width:0"><span class="chip">${b.kind}</span> ${bmLink(b)}</span><button class="btn small ghost" data-act="bm" data-kind="${b.kind}" data-id="${esc(b.id)}" data-label="${esc(b.label)}" aria-label="Remove bookmark">✕</button></div>`).join("")}</div>` : '<div class="empty">Bookmark lessons, terms, Handbook topics and questions.</div>'}</section></div>`;
}
function bmLink(b) {
  if (b.kind === "lesson") return `<a href="#lesson-${b.id}">${esc(b.label)}</a>`;
  if (b.kind === "question") return `<a href="#" data-act="qone" data-id="${esc(b.id)}">${esc(b.label)}…</a>`;
  if (b.kind === "handbook") return `<a href="#" data-act="hbopen" data-id="${esc(b.id)}">${esc(b.label)}</a>`;
  if (b.kind === "term") return `<a href="#" data-act="term" data-t="${esc(b.id)}">${esc(b.label)}</a>`;
  return esc(b.label);
}

/* ============================================================
   SEARCH
   ============================================================ */
function vSearch() {
  const q = (UI.gs || "").toLowerCase().trim();
  if (!q) return `<h1>Search</h1><div class="empty">Type in the search box.</div>`;
  const ls = E.lessons.filter(l => (l.title + l.summary + l.body).toLowerCase().includes(q));
  const gl = E.glossary.filter(g => (g.term + g.def).toLowerCase().includes(q));
  const hb = ARE.HANDBOOK.topics.filter(t => (t.topic + t.summary + t.terms.join(" ")).toLowerCase().includes(q));
  const qs = E.questions.filter(x => !x.case && (x.q + " " + (x.explain || "")).toLowerCase().includes(q));
  const ob = Object.values(ARE.OBJ).filter(o => o.title.toLowerCase().includes(q));
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Results for “${esc(UI.gs)}”</span><h1>Search</h1></div>
${ls.length ? `<section class="stack"><h2>Lessons (${ls.length})</h2><div class="grid g3">${ls.map(lessonCard).join("")}</div></section>` : ""}
${ob.length ? `<section class="panel stack"><h2>Objectives (${ob.length})</h2><div class="list">${ob.map(o => `<div><a class="chip code" href="#div-${o.div}">${objLabel(o.key)}</a> ${esc(o.title)}</div>`).join("")}</div></section>` : ""}
${gl.length ? `<section class="panel stack"><h2>Glossary (${gl.length})</h2><div class="list">${gl.map(g => `<div><b>${esc(g.term)}</b> · ${esc(g.def)}</div>`).join("")}</div></section>` : ""}
${hb.length ? `<section class="panel stack"><h2>Handbook topics (${hb.length})</h2><div class="list">${hb.map(t => `<div><a href="#" data-act="hbopen" data-id="${t.id}">${esc(t.topic)}</a></div>`).join("")}</div></section>` : ""}
${qs.length ? `<section class="panel stack"><div class="row between"><h2>Questions (${qs.length})</h2><button class="btn small" data-act="qset" data-ids="${qs.map(x => x.id).join(",")}">Practice these</button></div><div class="list">${qs.slice(0, 12).map(x => `<div><span class="chip code">${objLabel(x.obj)}</span> ${x.q.replace(/<svg[\s\S]*<\/svg>/, "").replace(/<[^>]+>/g, "").slice(0, 140)}…</div>`).join("")}</div></section>` : ""}
${!ls.length && !gl.length && !hb.length && !qs.length && !ob.length ? '<div class="empty">Nothing matched.</div>' : ""}`;
}

/* ============================================================
   BACKUP & DATA
   ============================================================ */
function vData() {
  const P = E.S.packs;
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Your data stays yours</span><h1>Backup &amp; data</h1></div>
<section class="panel stack"><h2>Where your progress is stored</h2><p>${E.sync.status === "synced" ? "Your progress is saved privately to your Claude account (only you can read it), so it follows you to other devices, and a copy is kept in this browser." : "Your progress is saved in this browser. When you open the app while signed in to Claude, it also syncs privately to your account."} Export a backup regularly; it is the one copy you fully control.</p>
<div class="row"><button class="btn primary" data-act="export">Export backup (.json)</button><label class="btn">Import backup<input type="file" id="importFile" accept=".json,application/json" hidden></label></div>
<div class="row"><button class="btn" data-act="sharebackup">Share backup to another device…</button></div>
<p class="muted" style="font-size:.88rem">Last exported: ${E.S.ui.lastExport ? new Date(E.S.ui.lastExport).toLocaleString() : "never"} · Device storage: ${ARE.Store && ARE.Store.status.idb ? "IndexedDB ✓" : "browser storage"}${ARE.Store && ARE.Store.status.persisted ? " · protected from automatic clearing ✓" : ""}</p>
<div id="exportArea"></div><div id="importArea"></div></section>
<section class="panel stack"><h2>Automatic snapshots on this device</h2><p class="muted">A snapshot of all your progress is saved automatically once a day (the last 10 are kept), and before every import or reset. Restore one if something goes wrong.</p><div id="snapList" class="list"><span class="muted">Loading…</span></div></section>
<section class="panel stack"><h2>Content packs</h2><p class="muted">Add lessons, questions and glossary terms without rebuilding the app. A pack is a JSON file with optional <code class="mono">lessons</code>, <code class="mono">questions</code> and <code class="mono">glossary</code> arrays that follow the same fields as the built-in content. Items must reference real objective keys (for example <code class="mono">ppd-2.1</code>).</p>
<p class="mono" style="font-size:.85rem">Installed: ${P.lessons.length} lessons · ${P.questions.length} questions · ${P.glossary.length} terms</p>
<div class="row"><label class="btn">Add content pack<input type="file" id="packFile" accept=".json,application/json" hidden></label>${P.lessons.length + P.questions.length + P.glossary.length ? `<button class="btn" data-act="clearpacks">Remove all packs</button>` : ""}</div></section>
<section class="panel stack"><h2>Reset</h2><p>Erase all progress, notes, bookmarks and plans in this browser and your account. Export first if you might want it back.</p>
<div class="row"><input type="text" id="resetTxt" placeholder="Type RESET to confirm" aria-label="Type RESET to confirm"><button class="btn danger" data-act="reset">Erase everything</button></div></section>
<section class="panel stack"><h2>About this app</h2><p class="muted" style="font-size:.9rem">ARE Academy is a free, personal study tool. All questions, lessons and case studies are original and are not NCARB, Black Spectacles or Amber Book material. Exam facts follow the ${esc(ARE.META.guidelines)}. Code values cite the 2021 IBC family and 2010 ADA Standards; AIA references cite 2017 documents. Always confirm against current official sources. It cannot install as a separate offline app from this page because the hosting frame blocks service workers; add the page to your home screen or bookmarks instead.</p></section>`;
}

/* ============================================================
   EVENTS
   ============================================================ */
async function exportData() {
  const data = JSON.stringify({ app: "are-academy", exported: new Date().toISOString(), state: E.S }, null, 1);
  const name = "are-academy-backup-" + E.dayKey(Date.now()) + ".json";
  try {
    const dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
    if (dl) { await dl.save({ filename: name, data }); toast("Backup saved"); return; }
  } catch (e) { if (e && e.code === "declined") return; }
  E.S.ui.lastExport = Date.now(); E.save();
  try {
    const blob = new Blob([data], { type: "application/json" });
    const file = typeof File !== "undefined" ? new File([blob], name, { type: "application/json" }) : null;
    if (window.__shareBackup && file && navigator.canShare && navigator.canShare({ files: [file] })) { window.__shareBackup = false; await navigator.share({ files: [file], title: "ARE Academy backup" }); toast("Backup shared"); return; }
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast("Backup downloaded: " + name);
    $("#exportArea").innerHTML = `<p class="muted">Saved as <span class="mono">${name}</span>. If nothing downloaded, use the copy box below.</p><details><summary class="btn small" style="width:max-content">Show backup text</summary><textarea readonly id="exportTxt" style="min-height:160px" class="mono">${esc(data)}</textarea><button class="btn small" data-act="copyexport">Copy</button></details>`;
    return;
  } catch (e) { if (e && e.name === "AbortError") return; }
  const a = $("#exportArea");
  a.innerHTML = `<p class="muted">Copy this text and save it as <span class="mono">${name}</span>.</p><textarea readonly id="exportTxt" style="min-height:160px" class="mono">${esc(data)}</textarea><button class="btn small" data-act="copyexport">Copy</button>`;
}
function celebrate(ev) {
  const box = $("#celebrate"); if (!box) return;
  const d = document.createElement("div"); d.className = "cel cel-" + ev.kind;
  d.innerHTML = `<span class="cel-i" aria-hidden="true">${ev.kind === "badge" ? "★" : ev.kind === "best" ? "▲" : "◆"}</span><span><b>${esc(ev.title)}</b><small>${esc(ev.text || "")}</small></span>`;
  box.appendChild(d); setTimeout(() => d.classList.add("out"), 4200); setTimeout(() => d.remove(), 4800);
}
function readJSONFile(input, cb) {
  const f = input.files && input.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { try { cb(JSON.parse(r.result)); } catch (e) { toast("That file is not valid JSON."); } input.value = ""; };
  r.readAsText(f);
}
let pendingImport = null;
function fcCtl() { return UI.fcFlip ? `<button class="btn big" data-act="fcrate" data-ok="0">↺ Again</button><button class="btn big primary" data-act="fcrate" data-ok="1">✓ Got it</button>` : `<button class="btn big primary" data-act="fcflip">Show answer</button>`; }
function fcMatch(a, b) { const n = (x) => String(x).toLowerCase().replace(/[^a-z0-9]/g, ""); const A = n(a), B = n(b); if (!A) return false; if (A === B) return true; const d = lev(A, B); return d <= Math.max(1, Math.floor(B.length / 6)); }
function lev(a, b) { const m = []; for (let i = 0; i <= b.length; i++) m[i] = [i]; for (let j = 0; j <= a.length; j++) m[0][j] = j; for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : 1 + Math.min(m[i - 1][j - 1], m[i][j - 1], m[i - 1][j]); return m[b.length][a.length]; }
function fcRate(ok) {
  const deck = fcDeck(), c = deck[UI.fcI || 0]; if (!c) return;
  E.S.fc = E.S.fc || {};
  const st = E.sm2(E.S.fc[c.id], ok ? (UI.fcEasy ? 5 : 4) : 1, Date.now());
  if (!ok) st.due = Date.now() + 60000;
  E.S.fc[c.id] = st; E.touch(c.l.obj || []); ARE.L.fcRated(ok, st.box); UI.fcEasy = false; UI.fcTyped = null;
  if (UI.fcPlanLeft !== undefined && UI.fcPlanLeft !== null) { UI.fcPlanLeft--; if (UI.fcPlanLeft <= 0) { UI.fcPlanLeft = null; ARE.L.completeStep(UI.fcPlanStep, {}); toast("Quick recall done — back to your plan"); location.hash = "#today"; return; } }
  UI.fcFlip = false;
  const nd = fcDeck(); UI.fcI = nd.length ? ((UI.fcI || 0) + (nd.length === deck.length ? 1 : 0)) % nd.length : 0;
  rerender();
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const a = t.dataset.act;
  const s = SESSION;
  const preventFor = ["toc", "qone", "hbopen", "term"];
  if (preventFor.includes(a)) e.preventDefault();
  if (ARE.ACTS && ARE.ACTS[a]) { ARE.ACTS[a](t, e, s); return; }
  switch (a) {
    case "lesson": location.hash = "#lesson-" + t.dataset.id; break;
    case "quiz": startQuiz({ obj: t.dataset.obj || null, div: t.dataset.div || null }); break;
    case "exam": startExam(t.dataset.div); break;
    case "review-due": startSession({ qids: E.dueIds(t.dataset.div ? (q => q.div === t.dataset.div) : null).slice(0, 25), mode: "review", title: "Spaced review", div: t.dataset.div || null }); break;
    case "review-missed": startSession({ qids: E.shuffle(E.missedIds(t.dataset.div ? (q => q.div === t.dataset.div) : null)).slice(0, 25), mode: "review", title: "Previously missed", div: t.dataset.div || null }); break;
    case "review-flagged": startSession({ qids: Object.keys(E.S.flags).filter(k => E.S.flags[k] && E.QMAP[k] && !E.QMAP[k].case), mode: "review", title: "Flagged questions" }); break;
    case "qone": startSession({ qids: [t.dataset.id], mode: "practice", title: "Bookmarked question" }); break;
    case "qset": startSession({ qids: E.shuffle(t.dataset.ids.split(",")).slice(0, 25), mode: "practice", title: "Search results quiz" }); break;
    case "check": { const l = E.LMAP[t.dataset.id]; startSession({ qids: l.check.filter(q => E.QMAP[q]), mode: "check", title: "Knowledge check: " + l.title, lessonId: l.id, div: l.div }); break; }
    case "build": {
      const div = $("#exDiv").value, obj = $("#exObj").value, n = Math.max(3, Math.min(100, +$("#exN").value || 10));
      UI.examN = n; UI.examTimed = $("#exTimed").checked;
      startQuiz({ div, obj: obj || null, n, adaptive: $("#exSel").value === "adaptive", timed: UI.examTimed }); break;
    }
    case "discard": E.saveSession(null); SESSION = null; rerender(); break;
    case "casestart": { const c = ARE.CASES.find(x => x.id === t.dataset.id); const timed = t.dataset.timed === "1"; startSession({ qids: c.questions.map(q => q.id), mode: timed ? "exam" : "case", title: c.title, caseId: c.id, div: c.divs[0], limit: timed ? c.questions.length * 3 * 60000 : 0 }); break; }
    // quiz controls
    case "choose": s.resp[s.qids[s.i]] = +t.dataset.i; E.saveSession(s); rerender(); break;
    case "choosecalc": s.resp[s.qids[s.i]] = t.dataset.v; E.saveSession(s); rerender(); break;
    case "peflag": { const d = t.dataset.div; const set = UI.peFlags[d] = UI.peFlags[d] || new Set(); set.has(t.dataset.obj) ? set.delete(t.dataset.obj) : set.add(t.dataset.obj); t.classList.toggle("on"); break; }
    case "pelog": {
      const d = t.dataset.div, pe = ARE.NCARB_PE.exams[d];
      const c = +$("#pe-score-" + d).value, n = +$("#pe-n-" + d).value || pe.n;
      if (!(c >= 0) || $("#pe-score-" + d).value === "" || c > n) { toast("Enter the number of correct answers (0–" + n + ")."); break; }
      const date = $("#pe-date-" + d).value || E.dayKey(Date.now());
      const flags = [...(UI.peFlags[d] || [])];
      const tt = Math.min(Date.now(), new Date(date + "T12:00").getTime());
      E.S.results.push({ t: tt, title: ARE.DIV[d].code + " NCARB practice exam", mode: "official", n, correct: c, div: d, dur: (+$("#pe-min-" + d).value || 0) * 60000, missed: $("#pe-missed-" + d).value.trim(), flags });
      E.S.weakFlags = E.S.weakFlags || {}; flags.forEach(k => E.S.weakFlags[k] = Date.now());
      const m = +$("#pe-min-" + d).value; if (m) E.S.planner.sessions.push({ date, min: Math.min(m, 600), note: ARE.DIV[d].code + " NCARB practice exam" });
      UI.peFlags[d] = new Set(); E.save(true); rerender(); toast("Practice exam result saved"); break;
    }
    case "hbobj": location.hash = "#div-" + t.dataset.obj.split("-")[0]; break;
    case "qq": {
      const l = E.LMAP[(location.hash || "").slice(8)], qi = +t.dataset.qi, oi = +t.dataset.oi; if (!l) break;
      const qq = l.quick[qi], wrap = t.closest(".qq");
      $$(".opt", wrap).forEach((b, i) => { b.classList.remove("sel", "good", "wrong"); if (i === qq.a) b.classList.add("good"); else if (i === oi) b.classList.add("wrong"); });
      const fb = $(".qq-fb", wrap); fb.hidden = false; fb.className = "qq-fb feedback " + (oi === qq.a ? "good" : "bad"); fb.innerHTML = `<b>${oi === qq.a ? "Correct." : "Not quite."}</b> ${esc(qq.why)}`;
      if (!wrap.dataset.touched) { wrap.dataset.touched = "1"; E.touch(l.obj || []); } break;
    }
    case "flip": t.classList.toggle("flipped"); if (!t.dataset.touched) { t.dataset.touched = "1"; const l = E.LMAP[(location.hash || "").slice(8)]; if (l) E.touch(l.obj || []); } break;
    // ---- exam interface
    case "form": startForm(t.dataset.div, t.dataset.form); break;
    case "tutorial": { const ids = E.shuffle(E.questions.filter(q => !q.case && (q.type === "mc" || q.type === "ms" || q.type === "hot"))).slice(0, 4).map(q => q.id).concat(E.genIds(() => true, 1)); startSession({ qids: ids, mode: "exam", title: "Interface tutorial (5 items)", limit: 10 * 60000, breakMin: 1 }); setTimeout(() => toast("Try each tool: Calculator, Whiteboard, Highlight, Strike (S̶), Flag, Exam summary, break."), 300); break; }
    case "tool-calc": ARE.UI.toggleCalc(); break;
    case "tool-board": ARE.UI.toggleBoard(); break;
    case "hidetimer": s.hideTimer = !s.hideTimer; E.saveSession(s); rerender(); break;
    case "hl": {
      const sel = window.getSelection(), stem = $("#qstem"); const txt = sel ? String(sel).trim() : "";
      if (!txt || !stem || !stem.contains(sel.anchorNode)) { toast("Select words in the question first, then press Highlight."); break; }
      const id = s.qids[s.i]; (s.hl[id] = s.hl[id] || []).push(txt.slice(0, 300)); sel.removeAllRanges(); E.saveSession(s); rerender(); break;
    }
    case "hlclear": delete s.hl[s.qids[s.i]]; E.saveSession(s); rerender(); break;
    case "strike": { const id = s.qids[s.i], i = +t.dataset.i, cur = s.strike[id] = s.strike[id] || []; const k = cur.indexOf(i); k >= 0 ? cur.splice(k, 1) : cur.push(i); E.saveSession(s); rerender(); break; }
    case "summary": s.view = "summary"; E.saveSession(s); route(); break;
    case "sumf": s.sumFilter = t.dataset.f; E.saveSession(s); rerender(); break;
    case "backitem": s.view = "item"; E.saveSession(s); route(); break;
    case "takebreak": if (!s.breakUsed) { s.onBreak = Date.now(); s.view = "item"; E.saveSession(s); ARE.UI.hideTools(); route(); } break;
    case "resumebreak": endBreak(); break;
    case "endexam": {
      const un = s.qids.filter(id => !E.answered(E.QMAP[id], s.resp[id])).length;
      if (un && t.dataset.sure !== "1") { t.dataset.sure = "1"; t.textContent = `${un} not answered. End anyway?`; break; }
      finishSession(); break;
    }
    case "retest": {
      const objs = [...new Set(s.qids.filter(id => !E.grade(E.QMAP[id], s.resp[id])).map(id => E.QMAP[id].obj))];
      const seen = new Set(s.qids);
      const missedIds = s.qids.filter(id => !E.grade(E.QMAP[id], s.resp[id]) && !id.startsWith("g-"));
      let ids = E.pick({ objs, n: 15 }).filter(id => !seen.has(id));
      ids = ids.concat(E.shuffle(missedIds).slice(0, Math.max(0, 10 - ids.length)));
      const gen = E.genIds(g => objs.includes(g.obj), Math.min(5, Math.max(0, 15 - ids.length)));
      ids = E.shuffle(ids.concat(gen)).slice(0, 15);
      SESSION = null; startSession({ qids: ids, mode: "practice", title: "Retest: topics missed on " + s.title, div: s.div }); break;
    }
    case "fcmissed": { UI.fcObjs = [...new Set(s.qids.filter(id => !E.grade(E.QMAP[id], s.resp[id])).map(id => E.QMAP[id].obj))]; UI.fcFilter = "missed"; UI.fcLesson = null; UI.fcI = 0; UI.fcFlip = false; location.hash = "#flashcards"; break; }
    // ---- lectures & flashcards
    case "lecture": { const l = E.LMAP[t.dataset.id]; ARE.UI.openLecture(l, ARE.TAKEAWAYS[l.id] || l.takeaways || [], () => { E.touch(l.obj || [], 2); E.S.lessons[l.id] = Object.assign(E.S.lessons[l.id] || {}, { opened: true }); E.save(); toast("Lecture finished — counted as 2 repetitions"); if (location.hash === "#lesson-" + l.id) rerender(); }); break; }
    case "fcdeck": UI.fcLesson = t.dataset.lesson; UI.fcFilter = "all"; UI.fcI = 0; UI.fcFlip = false; location.hash = "#flashcards"; break;
    case "fcf": UI.fcFilter = t.dataset.f; if (t.dataset.clear) UI.fcLesson = null; if (t.dataset.f !== "missed") UI.fcObjs = null; UI.fcI = 0; UI.fcFlip = false; rerender(); break;
    case "fcflip": if (t.dataset.swiped) { delete t.dataset.swiped; break; } UI.fcFlip = !UI.fcFlip; { const big = $("#fcBig"), ctl = $("#fcCtl"); if (big && ctl) { big.classList.toggle("flipped", UI.fcFlip); big.setAttribute("aria-label", UI.fcFlip ? "Answer shown" : "Tap to reveal the answer"); ctl.innerHTML = fcCtl(); } else rerender(); } break;
    case "fcmode": UI.fcType = !!t.dataset.v; UI.fcFlip = false; rerender(); break;
    case "fctype": { const v = ($("#fcTypeIn") || {}).value || ""; const c = fcDeck()[UI.fcI || 0]; UI.fcTyped = v; UI.fcFlip = true; UI.fcEasy = fcMatch(v, c.g.term); rerender(); break; }
    case "recallchk": { const box = t.closest(".recall"), inp = $("input", box), fb = $(".recall-fb", box); const ok = fcMatch(inp.value, box.dataset.term); fb.hidden = false; fb.className = "recall-fb " + (ok ? "okc" : "badc"); fb.textContent = ok ? "Correct: " + box.dataset.term : "The term is “" + box.dataset.term + "”."; const l = E.LMAP[(location.hash || "").slice(8)]; if (l && !box.dataset.done) { box.dataset.done = "1"; E.touch(l.obj || []); } break; }
    case "gradeexplain": { const l = E.LMAP[t.dataset.id]; const txt = E.S.notes["explain:" + l.id] || ""; if (txt.trim().length < 40) { toast("Write a few sentences first."); break; } ARE.TUTOR.ask("Grade my explanation of this lesson against the course material. Say what's right, what's missing or wrong, and give one follow-up question.\n\nMy explanation: " + txt, null); break; }
    case "fcrate": fcRate(t.dataset.ok === "1"); break;
    case "toggle": { const id = s.qids[s.i]; const cur = (s.resp[id] || []).slice(); const i = +t.dataset.i; const k = cur.indexOf(i); k >= 0 ? cur.splice(k, 1) : cur.push(i); s.resp[id] = cur; E.saveSession(s); rerender(); break; }
    case "mv": { const id = s.qids[s.i]; const ord = (s.resp[id] || s.resp[id + "__init"]).slice(); const p = +t.dataset.pos, d = +t.dataset.d, np = p + d; if (np < 0 || np >= ord.length) break; [ord[p], ord[np]] = [ord[np], ord[p]]; s.resp[id] = ord; E.saveSession(s); rerender(); break; }
    case "confirmorder": { const id = s.qids[s.i]; s.resp[id] = s.resp[id + "__init"].slice(); E.saveSession(s); rerender(); break; }
    case "checkans": { const id = s.qids[s.i], q = E.QMAP[id]; if (!E.answered(q, s.resp[id])) { toast("Answer the question first."); break; } s.checked[id] = true; E.record(id, E.grade(q, s.resp[id]), s.mode, { conf: (s.conf || {})[id], chosen: typeof s.resp[id] === "number" ? s.resp[id] : null }); E.save(); E.saveSession(s); rerender(); break; }
    case "conf": { const id = s.qids[s.i]; s.conf = s.conf || {}; s.conf[id] = +t.dataset.v; E.saveSession(s); rerender(); break; }
    case "tutor": ARE.TUTOR.ask(null, t.dataset.m || "simple"); break;
    case "confused": { const obj = t.dataset.obj || (ARE.CTX && ARE.CTX.lesson && (E.LMAP[ARE.CTX.lesson].obj || [])[0]); if (!obj) break; ARE.L.addTrigger(obj, "confused", { via: location.hash }); E.save(); toast("Added to My Learning Notes"); t.textContent = "Added to Learning Notes ✓"; t.disabled = true; break; }
    case "mkvideo": ARE.STUDIO.create({ kind: t.dataset.kind, id: t.dataset.id }, t.dataset.fmt || "standard", { ai: t.dataset.ai === "1" }); break;
    case "next": if (s.i < s.qids.length - 1) { s.i++; E.saveSession(s); route(); } break;
    case "prev": if (s.i > (s.lockBefore || 0)) { s.i--; E.saveSession(s); route(); } break;
    case "goto": s.i = +t.dataset.i; s.view = "item"; E.saveSession(s); route(); break;
    case "flag": { const id = s.qids[s.i]; E.S.flags[id] = !E.S.flags[id]; if (!E.S.flags[id]) delete E.S.flags[id]; E.save(); rerender(); break; }
    case "restab": s.resTab = +t.dataset.i; E.saveSession(s); rerender(); break;
    case "submit": {
      const un = s.qids.filter(id => !E.answered(E.QMAP[id], s.resp[id])).length;
      if (un && t.dataset.sure !== "1") { t.dataset.sure = "1"; t.textContent = `${un} unanswered. Submit anyway?`; break; }
      finishSession(); break;
    }
    case "quit": E.saveSession(s); stopActivity(); location.hash = s.back || "#exams"; SESSION = null; break;
    case "retake": { const old = s; SESSION = null; if (old.form && old.div) { startForm(old.div, old.form); break; } startSession({ qids: E.shuffle(old.qids), mode: old.mode, title: old.title, lessonId: old.lessonId, caseId: old.caseId, div: old.div, limit: old.limit }); break; }
    case "practicemissed": { const ids = s.qids.filter(id => !E.grade(E.QMAP[id], s.resp[id])); SESSION = null; startSession({ qids: ids, mode: "practice", title: "Missed from: " + s.title, div: s.div }); break; }
    // library / ref / tracker
    case "libdiv": UI.libDiv = t.dataset.div; rerender(); break;
    case "reftab": UI.refTab = t.dataset.t; rerender(); break;
    case "tf": UI.trackFilter = t.dataset.f; rerender(); break;
    case "toc": { const el = document.getElementById(t.dataset.target); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); break; }
    case "hbopen": UI.refTab = "handbook"; UI.hbq = ""; if (location.hash !== "#reference") location.hash = "#reference"; else rerender(); setTimeout(() => { const el = document.getElementById("hb-" + t.dataset.id); if (el) { el.scrollIntoView({ block: "start" }); el.style.borderColor = "var(--accent)"; } }, 60); break;
    case "hbquiz": { const top = ARE.HANDBOOK.topics.find(x => x.id === t.dataset.id); const ids = E.pick({ objs: top.objs, n: 12 }); startSession({ qids: ids, mode: "practice", title: "Handbook: " + top.topic }); break; }
    case "term": UI.refTab = "glossary"; UI.gq = t.dataset.t; UI.gcat = "all"; if (location.hash !== "#reference") location.hash = "#reference"; else rerender(); break;
    case "bm": {
      const k = t.dataset.kind, id = t.dataset.id; const i = E.S.bookmarks.findIndex(b => b.kind === k && b.id === id);
      if (i >= 0) E.S.bookmarks.splice(i, 1); else E.S.bookmarks.push({ kind: k, id, label: t.dataset.label, t: Date.now() });
      E.save(); rerender(); break;
    }
    // planner
    case "pldiv": { const P = E.S.planner, d = t.dataset.div, i = P.divs.indexOf(d); i >= 0 ? P.divs.splice(i, 1) : P.divs.push(d); E.save(); rerender(); break; }
    case "addgoal": { const txt = $("#goalText").value.trim(); if (!txt) { toast("Write a goal first."); break; } E.S.planner.goals.push({ id: "g" + Date.now(), text: txt, date: $("#goalDate").value || E.dayKey(Date.now()), done: false }); E.save(); rerender(); break; }
    case "delgoal": E.S.planner.goals = E.S.planner.goals.filter(g => g.id !== t.dataset.id); E.save(); rerender(); break;
    case "resched": { const today = E.dayKey(Date.now()); let n = 0; E.S.planner.goals.forEach(g => { if (!g.done && g.date < today) { g.date = today; n++; } }); E.save(); rerender(); toast(`Moved ${n} goals to today`); break; }
    case "addses": { const m = +$("#sesMin").value; if (!m || m < 1) { toast("Enter minutes studied."); break; } E.S.planner.sessions.push({ date: $("#sesDate").value || E.dayKey(Date.now()), min: Math.min(m, 600), note: $("#sesNote").value.trim() }); E.save(); rerender(); toast("Session logged"); break; }
    case "plgoals": {
      const plan = E.plan(); if (!plan) break;
      const w = plan.sched.find(x => x.tasks.length); let day = 0;
      w.tasks.forEach(tk => {
        const date = E.dayKey(Date.now() + (day++ % 6) * DAY);
        const text = tk.kind === "official" ? `NCARB practice exam: ${ARE.DIV[tk.div].code} (timed, then log result)` : tk.kind === "exam" ? `Timed simulation: ${ARE.DIV[tk.div].code}` : tk.kind === "review" ? "Clear review queue" : tk.kind === "lesson" ? `${objLabel(tk.obj)}: lesson “${E.LMAP[tk.lesson].title}” + check` : `${objLabel(tk.obj)}: practice quiz`;
        if (!E.S.planner.goals.some(g => g.text === text && !g.done)) E.S.planner.goals.push({ id: "g" + Date.now() + day, text, date, done: false });
      });
      E.save(); rerender(); toast("This week's plan was added to your goals"); break;
    }
    // data
    case "export": exportData(); break;
    case "copyexport": { const ta = $("#exportTxt"); navigator.clipboard.writeText(ta.value).then(() => toast("Copied"), () => { ta.select(); toast("Press Ctrl/Cmd+C to copy"); }); break; }
    case "doimport": if (pendingImport) { const cur = JSON.stringify(E.S); const go = () => { E.S = E.sanitize(pendingImport); E.S.updatedAt = Date.now(); E.rebuild(); E.save(true); E.flush(); pendingImport = null; toast("Backup restored. Your previous data was kept as a snapshot."); rerender(); }; (ARE.Store ? ARE.Store.addSnapshot(cur, "Before import " + new Date().toLocaleString()).catch(() => {}) : Promise.resolve()).then(go); } break;
    case "sharebackup": window.__shareBackup = true; exportData(); break;
    case "cancelimport": pendingImport = null; $("#importArea").innerHTML = ""; break;
    case "clearpacks": E.S.packs = { lessons: [], questions: [], glossary: [] }; E.rebuild(); E.save(true); rerender(); toast("Content packs removed"); break;
    case "reset": if ($("#resetTxt").value.trim() !== "RESET") { toast("Type RESET to confirm."); break; } ARE.Store && ARE.Store.addSnapshot(JSON.stringify(E.S), "Before reset " + new Date().toLocaleString()).catch(() => {}); E.S = E.blank(); E.rebuild(); E.save(true); E.saveSession(null); SESSION = null; toast("All data erased"); rerender(); break;
  }
});

document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.dataset.note !== undefined) { E.S.notes[t.dataset.note] = t.value; E.save(); return; }
  if (t.dataset.hbloc !== undefined) { E.S.hbLoc[t.dataset.hbloc] = t.value; E.save(); return; }
  if (t.closest && t.closest(".calcbox")) { runCalc(t.closest(".calcbox")); return; }
  if (t.closest && t.closest(".trybox")) { runTry(t.closest(".trybox")); return; }
  if (t.id === "libQ") { UI.libQ = t.value; clearTimeout(window.__l); window.__l = setTimeout(() => { rerender(); const el = $("#libQ"); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); }
  if (t.id === "gq") { UI.gq = t.value; clearTimeout(window.__g); window.__g = setTimeout(() => { rerender(); const el = $("#gq"); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); }
  if (t.id === "hbq") { UI.hbq = t.value; clearTimeout(window.__h); window.__h = setTimeout(() => { rerender(); const el = $("#hbq"); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); }
  if (t.id === "notesQ") { UI.notesQ = t.value; clearTimeout(window.__n); window.__n = setTimeout(() => { rerender(); const el = $("#notesQ"); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 250); }
});
document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.id === "gcat") { UI.gcat = t.value; rerender(); }
  if (t.id === "exDiv") { UI.examDiv = t.value; rerender(); }
  if (t.id === "plDate") { E.S.planner.examDate = t.value; E.save(); rerender(); }
  if (t.id === "plHours") { E.S.planner.hours = Math.max(1, Math.min(60, +t.value || 8)); E.save(); rerender(); }
  if (t.dataset.goal) { const g = E.S.planner.goals.find(x => x.id === t.dataset.goal); if (g) { g.done = t.checked; E.save(); rerender(); } }
  if (t.id === "importFile") readJSONFile(t, (j) => {
    const st = j && j.state ? j.state : j;
    if (!st || typeof st !== "object" || !("attempts" in st)) { toast("That file is not an ARE Academy backup."); return; }
    pendingImport = st;
    $("#importArea").innerHTML = `<div class="panel stack" style="border-color:var(--warn)"><p><b>Replace your current progress?</b> The backup holds ${(st.attempts || []).length} answers and ${Object.keys(st.lessons || {}).length} lesson records. Your current data will be overwritten.</p><div class="row"><button class="btn primary" data-act="doimport">Replace with backup</button><button class="btn" data-act="cancelimport">Cancel</button></div></div>`;
  });
  if (t.id === "packFile") readJSONFile(t, (j) => {
    const P = E.S.packs; let added = 0, skipped = 0;
    const take = (arr, into, ok) => (arr || []).forEach(x => { if (ok(x)) { const i = into.findIndex(y => (y.id || y.term) === (x.id || x.term)); i >= 0 ? into[i] = x : into.push(x); added++; } else skipped++; });
    take(j.lessons, P.lessons, x => x && x.id && ARE.DIV[x.div] && x.title && x.body);
    take(j.questions, P.questions, x => x && x.id && ARE.OBJ[x.obj] && x.type && x.q && !ARE.Q.some(q => q.id === x.id));
    take(j.glossary, P.glossary, x => x && x.term && x.def);
    E.rebuild(); E.save(true); rerender(); toast(`Added ${added} items${skipped ? `, skipped ${skipped} invalid` : ""}`);
  });
});
document.addEventListener("keydown", (e) => {
  if (e.target.id === "gsearch" && e.key === "Enter") { UI.gs = e.target.value; if (location.hash === "#search") rerender(); else location.hash = "#search"; }
  if (location.hash === "#flashcards" && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
    if (e.key === " ") { e.preventDefault(); const big = $("#fcBig"); if (big) big.click(); else { UI.fcFlip = !UI.fcFlip; rerender(); } }
    else if (UI.fcFlip && (e.key === "1" || e.key === "2")) fcRate(e.key === "2");
    return;
  }
  const calcOpen = document.querySelector(".toolpanel.calc:not([hidden])");
  if (location.hash === "#quiz" && SESSION && !SESSION.done && !calcOpen && !SESSION.onBreak && SESSION.view !== "summary" && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
    const q = E.QMAP[SESSION.qids[SESSION.i]];
    if (SESSION.mode === "exam") {
      if (e.key === "ArrowRight" && SESSION.i < SESSION.qids.length - 1) { SESSION.i++; E.saveSession(SESSION); route(); }
      if (e.key === "ArrowLeft" && SESSION.i > (SESSION.lockBefore || 0)) { SESSION.i--; E.saveSession(SESSION); route(); }
      return;
    }
    if (q.type === "mc" && /^[a-dA-D1-4]$/.test(e.key)) { const i = /\d/.test(e.key) ? +e.key - 1 : e.key.toLowerCase().charCodeAt(0) - 97; if (i < q.opts.length && !SESSION.checked[q.id]) { SESSION.resp[q.id] = i; E.saveSession(SESSION); rerender(); } }
    if (e.key === "ArrowRight" && SESSION.i < SESSION.qids.length - 1) { SESSION.i++; route(); }
    if (e.key === "ArrowLeft" && SESSION.i > 0) { SESSION.i--; route(); }
  }
});

document.addEventListener("contextmenu", (e) => {
  const o = e.target.closest(".optrow"); if (!o || !SESSION || SESSION.mode !== "exam") return;
  e.preventDefault(); const b = o.querySelector(".strk"); if (b && !b.disabled) b.click();
});
ARE.H = { esc, pct, fmtDate, fmtMin, bar, lvPill, objLabel, divCode, toast, rerender: () => rerender(), route: () => route(), startSession: (o) => startSession(o), session: () => SESSION, refLink, hbRefs, hbRefLine, bmBtn, icon, UI, fcDue: () => fcDue(), lessonCard: (l) => lessonCard(l), exportData: () => exportData(), setPendingImport: (x) => { pendingImport = x; } };
/* ---------- boot ---------- */
function boot() {
  E.loadLocal();
  shell();
  ARE.TUTOR && ARE.TUTOR.mount();
  E.onSaveState = () => { const b = $("#saveBar"); if (!b) return; b.hidden = !E.saveError; b.innerHTML = E.saveError ? esc(E.saveError) + ' <button class="btn small" data-act="export">Export backup</button>' : ""; };
  ARE.L.onCelebrate = celebrate;
  ARE.L.primeMilestones();
  E.loadDurable().then(changed => { if (changed) { ARE.L.primeMilestones(); route(); } });
  ARE.Store && ARE.Store.requestPersist();
  ARE.AI && ARE.AI.init();
  ARE.applyPrefs && ARE.applyPrefs();
  window.addEventListener("hashchange", route);
  route();
  E.connect();
}
ARE.boot = boot;
})();
