/* ============================================================
   VIEWS+: Home strip, Today's Study Plan, My Learning Notes,
   AI Video Studio, Learning Analytics, Settings, sync
   ============================================================ */
(function () {
const E = ARE.E, L = ARE.L, AI = ARE.AI, ST = ARE.STUDIO, H = ARE.H;
const { esc, pct, fmtDate, fmtMin, bar, lvPill, objLabel, divCode, toast } = H;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const DAY = 86400000;
const UI = H.UI;
const rer = () => H.rerender();
const ACTS = ARE.ACTS = {};

/* ---------- preferences (device-local) ---------- */
const PREF_KEY = "are-prefs";
ARE.prefs = (() => { try { return Object.assign({ theme: "auto", text: 100, motion: "auto", font: "standard", spacing: "normal" }, JSON.parse(localStorage.getItem(PREF_KEY) || "{}")); } catch (e) { return { theme: "auto", text: 100, motion: "auto", font: "standard", spacing: "normal" }; } })();
ARE.applyPrefs = () => {
  const p = ARE.prefs, d = document.documentElement;
  if (p.theme === "auto") delete d.dataset.theme; else d.dataset.theme = p.theme;
  d.style.fontSize = p.text !== 100 ? (p.text / 100 * 16) + "px" : "";
  document.body.style.fontSize = p.text !== 100 ? (p.text / 100 * 16) + "px" : "";
  d.classList.toggle("f-legible", p.font === "legible");
  d.classList.toggle("sp-relaxed", p.spacing === "relaxed");
  d.classList.toggle("reduce-motion", p.motion === "reduce");
};
const savePrefs = () => { try { localStorage.setItem(PREF_KEY, JSON.stringify(ARE.prefs)); } catch (e) {} ARE.applyPrefs(); };

/* ============================================================
   HOME STRIP (first thing on iPhone)
   ============================================================ */
ARE.HOME = () => {
  const st = L.streak(), wk = L.week(), lv = L.level(E.S.game.xp || 0), ov = E.overall();
  const plan = L.todayPlan(), done = plan ? plan.steps.filter(s => s.done).length : 0;
  const due = E.dueIds().length + H.fcDue().length, notes = L.activeNotes().length;
  const rec = E.recommend().find(r => r.act && r.act.a === "lesson");
  const next = rec && E.LMAP[rec.act.id] || E.lessons.find(l => !(E.S.lessons[l.id] && E.S.lessons[l.id].done));
  const ch = L.dailyChallenge();
  return `<section class="home" aria-label="Today at a glance">
<a class="hm hm-streak" href="#analytics"><span class="hm-k">Streak</span><b>${st.days}<small> day${st.days === 1 ? "" : "s"}</small></b><span class="hm-s">${st.today ? "Today counts ✓" : st.need ? st.need + " more answers today" : "Study today to keep it"}</span></a>
<a class="hm" href="#tracker"><span class="hm-k">ARE progress</span><b>${pct(ov.readiness)}</b>${bar(ov.readiness)}<span class="hm-s">Readiness estimate</span></a>
<a class="hm hm-plan" href="#today"><span class="hm-k">Today's goal</span><b>${plan ? done + "/" + plan.steps.length : "Plan"}<small>${plan ? " steps" : ""}</small></b>${plan ? bar(done / plan.steps.length, "var(--ok)") : ""}<span class="hm-s">${plan ? (plan.finished ? "Done for today ✓" : "Continue your plan") : "Build a 15–60 min session"}</span></a>
<a class="hm" href="#flashcards"><span class="hm-k">Needs review</span><b>${due}</b><span class="hm-s">${notes} learning note${notes === 1 ? "" : "s"} open</span></a>
${next ? `<a class="hm hm-wide" href="#lesson-${next.id}"><span class="hm-k">Next lesson</span><b class="hm-t">${esc(next.title)}</b><span class="hm-s">${divCode(next.div)} · ${next.minutes} min</span></a>` : ""}
<button class="hm hm-wide hm-ch" data-act="challenge"><span class="hm-k">Daily challenge</span><b class="hm-t">${ch.done ? "Done · " + ch.score + "/" + ch.ids.length : "5 mixed questions · 5 min"}</b><span class="hm-s">${ch.done ? "New one tomorrow" : "Interleaved across divisions"}</span></button>
<div class="hm hm-wide hm-q"><span class="hm-k">Quick practice</span><div class="row" style="gap:6px"><button class="btn small primary" data-act="quick5">5-minute review</button><button class="btn small" data-act="interleave">Mixed 10</button><button class="btn small" data-act="review-due">Due reviews</button></div></div>
</section>`;
};
ACTS.challenge = () => { const ch = L.dailyChallenge(); if (ch.done) { toast("Today's challenge is done. A new one arrives tomorrow."); return; } H.startSession({ qids: ch.ids, mode: "practice", title: "Daily challenge", limit: 5 * 60000, challenge: true }); };
ACTS.quick5 = () => { const due = E.dueIds().slice(0, 4); const ids = due.concat(L.interleave(8).filter(x => !due.includes(x))).slice(0, 6); H.startSession({ qids: ids, mode: "review", title: "5-minute review" }); };
ACTS.interleave = () => H.startSession({ qids: L.interleave(10), mode: "practice", title: "Interleaved mix · 10" });

/* ============================================================
   TODAY'S STUDY PLAN
   ============================================================ */
function vToday() {
  let p = L.todayPlan();
  const mins = [15, 30, 45, 60];
  if (!p) return `<div class="stack" style="gap:6px"><span class="eyebrow">${new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span><h1>Today's Study Plan</h1></div>
<section class="panel stack"><h2>How much time do you have?</h2><p class="muted">I'll build a session from your performance: recall first, then new learning, practice, your weak spots and a retention check, in that order, because retrieving before re-reading makes memories stronger.</p>
<div class="row">${mins.map(m => `<button class="btn ${m === 30 ? "primary" : ""} big" data-act="mkplan" data-m="${m}">${m} min</button>`).join("")}</div></section>
${planScience()}`;
  const done = p.steps.filter(s => s.done).length;
  const icons = { recall: "◷", learn: "◫", deep: "▶", practice: "✎", weak: "⚑", retain: "↻" };
  return `<div class="row between"><div class="stack" style="gap:6px"><span class="eyebrow">${p.min}-minute session · ${done} of ${p.steps.length} done</span><h1>Today's Study Plan</h1></div><button class="btn small ghost" data-act="replan">Change time</button></div>
<div class="planbar">${bar(done / p.steps.length, "var(--ok)")}</div>
<ol class="plan">${p.steps.map((s, i) => {
  const cur = !s.done && p.steps.slice(0, i).every(x => x.done);
  return `<li class="pstep ${s.done ? "done" : cur ? "cur" : ""}"><span class="ps-i" aria-hidden="true">${s.done ? "✓" : icons[s.k]}</span><div style="min-width:0;flex:1"><div class="row between"><b>${i + 1}. ${esc(s.t)}</b><span class="chip code">~${s.min} min</span></div><p class="muted" style="margin:4px 0 0">${esc(s.d)}</p>${s.result && s.result.n ? `<p class="mono" style="font-size:.85rem;margin:4px 0 0">${s.result.ok}/${s.result.n} correct</p>` : ""}</div>
${s.done ? "" : `<div class="ps-a"><button class="btn ${cur ? "primary" : ""} small" data-act="planstep" data-i="${i}">${s.k === "learn" ? "Open lesson" : s.k === "deep" ? "Watch" : "Start"}</button>${s.k === "learn" || s.k === "deep" ? `<button class="btn ghost small" data-act="plandone" data-i="${i}">Mark done</button>` : ""}</div>`}</li>`;
}).join("")}</ol>
${p.finished || done ? summaryCard(p) : ""}
${planScience()}`;
}
function planScience() { return `<details class="panel"><summary><b>Why the session is built this way</b></summary><ul class="prose" style="margin-top:8px"><li><b>Retrieval first.</b> Recalling before re-reading (active recall) builds stronger memory than reviewing notes.</li><li><b>Spacing.</b> Items return on an SM-2 schedule: sooner when you miss them, later as you prove you know them.</li><li><b>Interleaving.</b> The retention check mixes divisions so you practise choosing which knowledge applies, as on the exam.</li><li><b>Progressive difficulty.</b> Question difficulty follows your measured level on each objective, not whether you finished a lesson.</li><li><b>Metacognition.</b> Rate your confidence; confident mistakes are flagged as misconceptions.</li></ul></details>`; }
function summaryCard(p) {
  const s = L.summary(p);
  return `<section class="panel stack sumcard"><h2>${p.finished ? "Session summary" : "So far today"}</h2>
<div class="grid g4"><div class="kpi"><b>${s.n}</b><span>Questions answered</span></div><div class="kpi"><b>${s.n ? pct(s.ok / s.n) : "—"}</b><span>Accuracy</span></div><div class="kpi"><b>+${s.xp}</b><span>XP earned</span></div><div class="kpi"><b>${s.improved.length}</b><span>Objectives moved up</span></div></div>
${s.learned.length ? `<p><b>What you learned:</b> ${s.learned.map(esc).join(", ")}</p>` : ""}
${s.improved.length ? `<p><b>What improved:</b> ${s.improved.map(c => objLabel(c.k) + " → " + E.LV[c.to]).join(" · ")}</p>` : ""}
${s.down.length ? `<p><b>Slipped:</b> ${s.down.map(c => objLabel(c.k) + " → " + E.LV[c.to]).join(" · ")}</p>` : ""}
${s.still.length ? `<p><b>Still to understand:</b> ${s.still.map(k => `<a href="#note-${k}">${objLabel(k)}</a>`).join(" · ")}</p>` : ""}
${s.next ? `<p><b>Study next:</b> ${esc(s.next.title)}</p>` : ""}</section>`;
}
ACTS.mkplan = (t) => { L.buildToday(+t.dataset.m); E.save(); rer(); };
ACTS.replan = () => { E.S.today = null; E.save(); rer(); };
ACTS.plandone = (t) => { L.completeStep(+t.dataset.i); rer(); };
ACTS.planstep = (t) => {
  const p = L.todayPlan(), i = +t.dataset.i, s = p.steps[i];
  if (s.k === "recall") { UI.fcFilter = "due"; UI.fcLesson = null; UI.fcI = 0; UI.fcFlip = false; UI.fcPlanLeft = s.n; UI.fcPlanStep = i; location.hash = "#flashcards"; return; }
  if (s.k === "learn") { location.hash = "#lesson-" + s.lesson; return; }
  if (s.k === "deep") { ST.create({ kind: "lesson", id: s.lesson }, p.min >= 60 ? "standard" : "quick", { planStep: i }); return; }
  let ids;
  if (s.k === "practice") ids = s.objs ? E.pick({ objs: s.objs, n: s.n }) : L.interleave(s.n);
  else if (s.k === "weak") ids = E.pick({ objs: s.objs, n: s.n });
  else ids = (E.dueIds().slice(0, Math.ceil(s.n / 2))).concat(L.interleave(s.n * 2)).filter((v, k, a) => a.indexOf(v) === k).slice(0, s.n);
  if (!ids.length) ids = L.interleave(s.n);
  H.startSession({ qids: ids, mode: s.k === "retain" ? "review" : "practice", title: "Today · " + s.t, planStep: i });
};

/* ============================================================
   MY LEARNING NOTES
   ============================================================ */
function noteCard(n) {
  const o = ARE.OBJ[n.obj], st = L.noteStatus(n), kinds = [...new Set(n.triggers.map(t => t.kind))];
  return `<a class="ncard ${n.archived ? "arch" : ""}" href="#note-${n.obj}"><div class="row between" style="flex-wrap:nowrap"><span class="chip code">${objLabel(n.obj)}</span>${n.bm ? `<span aria-label="Bookmarked">★</span>` : ""}</div>
<b>${esc(o.title)}</b><span class="muted" style="font-size:.82rem">${esc(o.secName)}</span>
<div class="row" style="gap:4px">${kinds.slice(0, 3).map(k => `<span class="chip tag-${k}">${esc(L.TRIG[k])}</span>`).join("")}</div>
<div class="row between" style="font-size:.82rem"><span>${n.miss.length} miss${n.miss.length === 1 ? "" : "es"} · updated ${fmtDate(n.updated)}</span>${n.archived ? `<span class="lv lv4"><i></i>Archived</span>` : st.ready ? `<span class="lv lv3"><i></i>Ready to archive</span>` : n.understood ? `<span class="lv lv2"><i></i>Marked understood</span>` : `<span class="lv lvr"><i></i>Needs review</span>`}</div></a>`;
}
function vLnotes() {
  const f = UI.lnF || "active", dv = UI.lnDiv || "all", q = (UI.lnQ || "").toLowerCase(), sec = UI.lnSec || "all";
  let list = L.notes();
  const counts = { active: list.filter(n => !n.archived).length, bm: list.filter(n => n.bm).length, archived: list.filter(n => n.archived).length, ready: list.filter(n => !n.archived && L.noteStatus(n).ready).length };
  list = list.filter(n => (f === "active" ? !n.archived : f === "archived" ? n.archived : f === "bm" ? n.bm : f === "ready" ? !n.archived && L.noteStatus(n).ready : true));
  if (dv !== "all") list = list.filter(n => ARE.OBJ[n.obj].div === dv);
  if (sec !== "all") list = list.filter(n => ARE.OBJ[n.obj].div + "|" + ARE.OBJ[n.obj].sec === sec);
  if (q) list = list.filter(n => (ARE.OBJ[n.obj].title + " " + n.comment + " " + n.edit + " " + n.miss.map(m => (E.QMAP[m.q] ? L.strip(E.QMAP[m.q].q) : "")).join(" ")).toLowerCase().includes(q));
  const secs = dv === "all" ? [] : ARE.DIV[dv].sections;
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Written automatically from your answers · never deleted after one correct answer</span><h1>My Learning Notes</h1></div>
${!L.notes().length ? `<div class="panel stack"><h2>No notes yet</h2><p>A note appears automatically when you miss a question, repeat a mistake, struggle with a calculation, answer confidently but wrong, confuse two similar terms, score low on an objective, or press “I don't understand this”. Each note explains what went wrong, the correct idea, how it's used in practice and how it's tested, with a visual, check questions and sources.</p><div class="row"><a class="btn primary" href="#today">Start today's plan</a><button class="btn" data-act="interleave">Mixed practice</button></div></div>` : `
<div class="row">${[["active", "Open", counts.active], ["ready", "Ready to archive", counts.ready], ["bm", "Bookmarked", counts.bm], ["archived", "Archived", counts.archived], ["all", "All", L.notes().length]].map(([k, t, n]) => `<button class="chip ${f === k ? "on" : ""}" data-act="lnf" data-f="${k}">${t} (${n})</button>`).join("")}</div>
<div class="row" style="align-items:flex-end"><label class="f">Division<select id="lnDiv"><option value="all">All divisions</option>${ARE.DIVISIONS.map(d => `<option value="${d.id}" ${dv === d.id ? "selected" : ""}>${d.code}</option>`).join("")}</select></label>
${secs.length ? `<label class="f">Subject<select id="lnSec"><option value="all">All sections</option>${secs.map(x => `<option value="${dv}|${x.n}" ${sec === dv + "|" + x.n ? "selected" : ""}>${x.n}. ${esc(x.name)}</option>`).join("")}</select></label>` : ""}
<label class="f" style="flex:1;min-width:180px">Search<input type="search" id="lnQ" value="${esc(UI.lnQ || "")}" placeholder="Concept, question or my comment"></label></div>
<div class="row"><button class="btn primary" data-act="lnquiz" ${list.length ? "" : "disabled"}>Quiz me on these notes</button><button class="btn" data-act="lncards" ${list.length ? "" : "disabled"}>Turn these into flashcards</button><button class="btn" data-act="lnvideo" ${list.filter(n => !n.archived).length ? "" : "disabled"}>Remedial video for the top note</button></div>
${ARE.DIVISIONS.map(d => { const items = list.filter(n => ARE.OBJ[n.obj].div === d.id); return items.length ? `<section class="stack"><h2>${d.code} · ${esc(d.name)} <small class="muted">${items.length}</small></h2><div class="grid g3">${items.map(noteCard).join("")}</div></section>` : ""; }).join("") || `<div class="empty">No notes match.</div>`}`}`;
}
function vNote(obj) {
  const n = E.S.lnotes[obj]; if (!n) return `<div class="empty">That note doesn't exist yet. <a href="#lnotes">Back to notes</a></div>`;
  const b = L.buildNote(n), st = L.noteStatus(n), c = E.comp(obj);
  const trig = n.triggers.slice().reverse().slice(0, 8);
  const sec = (num, t, inner) => inner ? `<section class="nsec"><h3><span class="nnum">${num}</span>${t}</h3>${inner}</section>` : "";
  return `<a href="#lnotes" class="muted" style="font-size:.9rem">← My Learning Notes</a>
<div class="tblock"><div class="tb-main"><span class="eyebrow">${esc(b.concept.div)} · ${esc(b.concept.sec)}</span><h1>${esc(b.concept.title)}</h1>
<div class="row"><span class="chip code">${esc(b.concept.code)}</span>${lvPill(c.level, c)}${n.archived ? `<span class="lv lv4"><i></i>Archived ${fmtDate(n.archived)}</span>` : ""}</div>
<div class="row"><button class="btn small ${n.bm ? "primary" : ""}" data-act="nbm" data-obj="${obj}">${n.bm ? "★ Bookmarked" : "☆ Bookmark"}</button><button class="btn small" data-act="nquiz" data-obj="${obj}">Quiz me on this</button><button class="btn small" data-act="ncards" data-obj="${obj}">Make flashcards</button><button class="btn small" data-act="mkvideo" data-kind="note" data-id="${obj}" data-fmt="remedial">Video explanation</button><button class="btn small" data-act="nai" data-obj="${obj}" ${AI.active() ? "" : "disabled title='Connect an AI provider in Settings'"}>✦ Explain it differently</button></div></div>
<div class="tb-side"><div><small>Progress to archive</small><b>${st.ready ? "Ready" : st.okSince + "/3"}</b><small>${st.ready ? "You've shown consistent understanding" : `${st.needed ? st.needed + " more correct" : "Correct answers ✓"}${st.dayNeed ? ` · on ${st.dayNeed} more day` : ""}`}</small></div></div></div>
<div class="grid g2 nwrap"><div class="stack">
${sec(1, "Concept", `<p><b>${esc(b.concept.code)}</b> — ${esc(b.concept.title)}</p>`)}
${sec(2, "What I misunderstood", b.misunderstood.length ? b.misunderstood.map(m => `<div class="miss"><p class="muted" style="font-size:.9rem">${esc(m.stem)}</p>${m.chosen ? `<p>You chose <b>“${esc(m.chosen)}”</b>${m.conf === 3 ? " and were certain" : m.conf === 1 ? " as a guess" : ""}.</p>` : m.type === "calc" ? `<p>Calculation missed.</p>` : ""}${m.why ? `<p class="trap"><b>The misconception:</b> ${m.why}</p>` : ""}<a class="btn small ghost" href="#" data-act="qone" data-id="${m.q}">Try it again</a></div>`).join("") : `<p>${trig.some(t => t.kind === "confused") ? "You marked this concept as confusing." : "Low performance on this objective."}</p>`)}
${sec(3, "Correct explanation", `<div class="prose">${b.correct}</div>`)}
${sec(4, "Simplified", b.simple ? `<p class="simple">${esc(b.simple)}</p>` : "")}
${sec(5, "Practical architectural application", b.practice ? `<p>${esc(b.practice)}</p>` : "")}
${sec(6, "ARE examination relevance", b.exam ? `<p>${esc(b.exam)}</p>` : "")}
${sec(7, "Important to remember", `<ul>${b.remember.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${b.formulas.length ? b.formulas.map(f => `<div class="formula"><b>${esc(f.name)}</b><code>${esc(f.f)}</code></div>`).join("") : ""}${b.terms.length ? `<dl class="terms">${b.terms.map(g => `<dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd>`).join("")}</dl>` : ""}`)}
${b.pairs.length ? sec("≠", "Don't confuse", b.pairs.map(p => `<div class="scroll"><table class="tbl"><thead><tr><th>${esc(p.a.term)}</th><th>${esc(p.b.term)}</th></tr></thead><tbody><tr><td>${esc(p.a.def)}</td><td>${esc(p.b.def)}</td></tr></tbody></table></div>`).join("")) : ""}
</div><div class="stack">
${sec(8, "Visual reference", b.visual ? `<div class="figure lfig nfig">${b.visual.svg}</div><p class="muted" style="font-size:.85rem">From the lesson “${esc(b.lesson.title)}”. Schematic, not a construction detail.</p>` : (b.pairs.length ? "" : `<p class="muted">No diagram for this objective yet.</p>`))}
${sec(9, "Knowledge reinforcement", `${b.quick.map((qq, qi) => `<div class="panel stack qq" data-qq="${qi}" data-lesson="${b.lesson ? b.lesson.id : ""}"><b>${esc(qq.q)}</b><div class="opts">${qq.opts.map((o, oi) => `<button class="opt" data-act="nqq" data-qi="${qi}" data-oi="${oi}"><span class="mk">${String.fromCharCode(65 + oi)}</span><span>${esc(o)}</span></button>`).join("")}</div><div class="qq-fb" hidden></div></div>`).join("")}${b.reinforce.length ? `<button class="btn primary" data-act="qset" data-ids="${b.reinforce.join(",")}">Answer ${b.reinforce.length} check questions</button>` : ""}`)}
${sec(10, "Source references", `<ul class="src">${[b.sources.obj].concat(b.sources.hb.map(r => "AIA Architect's Handbook of Professional Practice, 15th ed., §" + r[0] + " p. " + r[1] + " — " + r[2])).concat(b.sources.refs.map(r => L.strip(r.t))).map(x => `<li>${esc(x)}</li>`).join("")}</ul>${b.lesson ? `<a class="btn small" href="#lesson-${b.lesson.id}">Open lesson: ${esc(b.lesson.title)}</a>` : ""}`)}
${n.ai.length ? `<section class="nsec"><h3><span class="nnum">✦</span>Explained differently (AI)</h3>${n.ai.slice().reverse().map(a => `<div class="aibox"><div class="tu-md">${AI.md(a.text)}</div><p class="muted" style="font-size:0.8125rem">${fmtDate(a.t)} · ${esc(AI.label(a.provider))} · AI-written: verify against the lesson and primary sources.</p></div>`).join("")}</section>` : ""}
<section class="nsec"><h3><span class="nnum">✎</span>My edits &amp; comments</h3><label class="f">Rewrite this note in your own words<textarea data-lnedit="${obj}" placeholder="Your version of the note">${esc(n.edit)}</textarea></label><label class="f">Comment<textarea data-lncomment="${obj}" placeholder="Questions, project examples, reminders">${esc(n.comment)}</textarea></label>
<div class="row"><button class="btn small" data-act="nunder" data-obj="${obj}">${n.understood ? "✓ Marked understood" : "I understand this now"}</button><button class="btn small ${st.ready && !n.archived ? "primary" : ""}" data-act="narch" data-obj="${obj}" ${st.ready || n.archived ? "" : "disabled"}>${n.archived ? "Reopen note" : "Archive note"}</button></div>
<p class="muted" style="font-size:.85rem">${n.archived ? "Archived notes return automatically if you miss this objective again." : "Archiving unlocks after 3 correct answers on 2 different days since your last miss, with no new misses and a score of 75%+. Marking “understood” alone doesn't archive it."}</p></section>
<section class="nsec"><h3><span class="nnum">⌚</span>History</h3><ul class="hist">${trig.map(t => `<li><span class="mono">${fmtDate(t.t)}</span> ${esc(L.TRIG[t.kind] || t.kind)}${t.pair ? ": " + esc(t.pair.join(" vs ")) : ""}</li>`).join("")}</ul></section>
</div></div>`;
}
ACTS.lnf = (t) => { UI.lnF = t.dataset.f; rer(); };
ACTS.nbm = (t) => { const n = E.S.lnotes[t.dataset.obj]; n.bm = !n.bm; E.save(); rer(); };
ACTS.nunder = (t) => { const n = E.S.lnotes[t.dataset.obj]; n.understood = !n.understood ? Date.now() : false; E.save(); toast(n.understood ? "Noted. It will archive once your answers confirm it." : "Unmarked"); rer(); };
ACTS.narch = (t) => { const n = E.S.lnotes[t.dataset.obj]; if (n.archived) { n.archived = false; } else { if (!L.noteStatus(n).ready) return; n.archived = Date.now(); L.addXP(40, "Closed a knowledge gap"); L.checkBadges(); } E.save(); rer(); };
ACTS.nquiz = (t) => { const obj = t.dataset.obj; const ids = E.pick({ objs: [obj], n: 6 }); const gen = E.genIds(g => g.obj === obj, Math.max(0, 6 - ids.length)); H.startSession({ qids: ids.concat(gen), mode: "practice", title: "Note quiz · " + objLabel(obj) }); };
ACTS.ncards = (t) => { const n = E.S.lnotes[t.dataset.obj]; const k = L.addCardsFromNote(n); E.save(); toast(k ? k + " flashcards added" : "Cards for this note already exist"); };
ACTS.lncards = () => { let k = 0; L.activeNotes().forEach(n => k += L.addCardsFromNote(n)); E.save(); toast(k + " flashcards added from your notes"); };
ACTS.lnquiz = () => { const objs = L.activeNotes().map(n => n.obj).slice(0, 12); const ids = E.pick({ objs, n: 12 }); H.startSession({ qids: L.interleaveIds ? ids : E.shuffle(ids), mode: "practice", title: "Quiz from my learning notes" }); };
ACTS.lnvideo = () => { const n = L.activeNotes()[0]; if (n) ST.create({ kind: "note", id: n.obj }, "remedial", { ai: !!AI.active() }); };
ACTS.nai = async (t) => { const obj = t.dataset.obj; t.disabled = true; t.textContent = "Writing…"; try { await AI.enrichNote(obj); rer(); } catch (e) { toast(AI.errText(e)); t.disabled = false; t.textContent = "✦ Explain it differently"; } };
ACTS.nqq = (t) => {
  const wrap = t.closest(".qq"), l = E.LMAP[wrap.dataset.lesson]; if (!l) return; const qq = l.quick[+t.dataset.qi], oi = +t.dataset.oi;
  $$(".opt", wrap).forEach((b, i) => { b.classList.remove("good", "wrong"); if (i === qq.a) b.classList.add("good"); else if (i === oi) b.classList.add("wrong"); });
  const fb = $(".qq-fb", wrap); fb.hidden = false; fb.className = "qq-fb feedback " + (oi === qq.a ? "good" : "bad"); fb.innerHTML = `<b>${oi === qq.a ? "Correct." : "Not quite."}</b> ${esc(qq.why)}`;
  if (!wrap.dataset.touched) { wrap.dataset.touched = "1"; E.touch(l.obj || []); }
};

/* ============================================================
   AI VIDEO STUDIO
   ============================================================ */
function vStudio() {
  const kind = UI.vsKind || "lesson", list = ST.sourceList(kind), fmt = UI.vsFmt || "standard";
  const vids = Object.values(E.S.videos);
  const f = UI.vsF || "all", dv = UI.vsDiv || "all", dur = UI.vsDur || "all";
  let lib = vids.slice();
  if (dv !== "all") lib = lib.filter(v => v.div === dv);
  if (dur !== "all") lib = lib.filter(v => dur === "short" ? v.estMin < 4 : dur === "mid" ? v.estMin >= 4 && v.estMin < 10 : v.estMin >= 10);
  if (f === "bm") lib = lib.filter(v => v.bm); else if (f === "recent") lib = lib.filter(v => v.watched).sort((a, b) => b.watched - a.watched); else if (f === "review") lib = lib.filter(v => !v.done || (v.kc && v.kc.ok / v.kc.n < 0.7)); else if (f === "done") lib = lib.filter(v => v.done);
  if (f !== "recent") lib.sort((a, b) => b.created - a.created);
  if (UI.vsObj) lib = lib.filter(v => (v.objs || []).includes(UI.vsObj));
  const recs = ST.recommend();
  const kcAll = vids.filter(v => v.kc); const kcOk = kcAll.reduce((a, v) => a + v.kc.ok, 0), kcN = kcAll.reduce((a, v) => a + v.kc.n, 0);
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Narrated, animated lessons generated from your course material</span><h1>AI Video Studio</h1></div>
<section class="panel stack"><h2>Create a video lesson</h2>
<div class="row" style="align-items:flex-end">
<label class="f">From<select id="vsKind">${ST.KINDS.map(([k, t]) => `<option value="${k}" ${kind === k ? "selected" : ""}>${t}</option>`).join("")}</select></label>
<label class="f" style="flex:1;min-width:220px">Topic<select id="vsSrc">${list.length ? list.map(x => `<option value="${esc(x.id)}" ${UI.vsSrc === x.id ? "selected" : ""}>${esc(x.t)}</option>`).join("") : `<option value="">Nothing here yet</option>`}</select></label>
<label class="f">Format<select id="vsFmt">${Object.entries(ST.FORMATS).map(([k, F]) => `<option value="${k}" ${fmt === k ? "selected" : ""}>${F.label} · ${F.est}${AI.active() ? " (AI: " + F.min + "–" + F.max + ")" : ""}</option>`).join("")}</select></label></div>
<label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="vsAI" ${AI.active() ? (UI.vsAI !== false ? "checked" : "") : "disabled"}> Have the AI write the narration from the course material ${AI.active() ? `<span class="muted">(${esc(AI.label(AI.active()))})</span>` : `<span class="muted">— connect a provider in <a href="#settings">Settings</a>; without it the course script is used</span>`}</label>
<div class="row"><button class="btn primary" data-act="vsmake" ${list.length ? "" : "disabled"}>Generate &amp; play</button></div>
<p class="muted" style="font-size:.85rem">Each video follows: introduction → core concepts → visual explanation → practical application → exam relevance → common mistakes → knowledge check → sources. Visuals are the course's own diagrams with animated callouts; nothing is AI-drawn, so no invented details. Narration uses your device's built-in voices (free, works offline). Course-script lengths depend on how much material the topic has; AI-written scripts aim for the full target length (2–3, 5–10 or 10–15 minutes) using the same material.</p></section>
${recs.length ? `<section class="stack"><h2>Recommended for you</h2><div class="grid g3">${recs.map(r => `<div class="panel stack"><span class="eyebrow">${esc(r.why)}</span><b>${esc(r.t)}</b><span class="muted" style="font-size:.85rem">${ST.FORMATS[r.fmt].label}</span><button class="btn small" data-act="mkvideo" data-kind="${r.src.kind}" data-id="${esc(r.src.id)}" data-fmt="${r.fmt}" data-ai="${AI.active() ? 1 : 0}">Create</button></div>`).join("")}</div></section>` : ""}
<section class="stack"><div class="row between"><h2>My video library <small class="muted">${vids.length}</small></h2></div>
<div class="grid g4"><div class="panel kpi"><b>${vids.filter(v => v.done).length}</b><span>Completed</span></div><div class="panel kpi"><b>${vids.filter(v => !v.done && v.watched).length}</b><span>In progress</span></div><div class="panel kpi"><b>${kcN ? pct(kcOk / kcN) : "—"}</b><span>Knowledge checks</span></div><div class="panel kpi"><b>${new Set(vids.filter(v => v.done).flatMap(v => v.objs || [])).size}</b><span>Objectives reviewed by video</span></div></div>
<div class="row">${[["all", "All"], ["recent", "Recently watched"], ["bm", "Bookmarked"], ["review", "Needs review"], ["done", "Completed"]].map(([k, t]) => `<button class="chip ${f === k ? "on" : ""}" data-act="vsf" data-f="${k}">${t}</button>`).join("")}
<select id="vsDiv" aria-label="Division"><option value="all">All divisions</option>${ARE.DIVISIONS.map(d => `<option value="${d.id}" ${dv === d.id ? "selected" : ""}>${d.code}</option>`).join("")}</select>
<select id="vsDur" aria-label="Duration"><option value="all">Any length</option><option value="short" ${dur === "short" ? "selected" : ""}>Under 4 min</option><option value="mid" ${dur === "mid" ? "selected" : ""}>4–10 min</option><option value="long" ${dur === "long" ? "selected" : ""}>10+ min</option></select>
${dv !== "all" ? `<select id="vsObj" aria-label="Objective"><option value="">Any objective</option>${ARE.DIV[dv].objectives.map(o => `<option value="${o.key}" ${UI.vsObj === o.key ? "selected" : ""}>${o.code}</option>`).join("")}</select>` : ""}</div>
${lib.length ? `<div class="grid g3">${lib.map(v => `<div class="panel stack vcard"><div class="row between"><span class="chip">${esc(ST.FORMATS[v.fmt].label)}</span><span class="mono muted">${Math.max(1, Math.round(v.estMin))} min</span></div><b>${esc(v.title)}</b>
<span class="muted" style="font-size:.82rem">${v.div ? divCode(v.div) + " · " : ""}${(v.objs || []).map(objLabel).join(", ")}${v.ai ? " · AI script" : ""}</span>
${bar(v.done ? 1 : v.prog || 0, v.done ? "var(--ok)" : "var(--accent)")}
<span style="font-size:.82rem">${v.done ? "Completed " + fmtDate(v.done) : v.watched ? "Resume at chapter " + ((v.pos || 0) + 1) : "Not started"}${v.kc ? " · check " + v.kc.ok + "/" + v.kc.n : ""}</span>
<div class="row" style="gap:6px"><button class="btn small primary" data-act="vsplay" data-id="${v.id}">${v.watched && !v.done ? "Resume" : "Play"}</button><button class="btn small ghost" data-act="vsbm" data-id="${v.id}" aria-label="Bookmark">${v.bm ? "★" : "☆"}</button><button class="btn small ghost" data-act="vsexport" data-id="${v.id}">Export</button><button class="btn small ghost" data-act="vsdel" data-id="${v.id}">Remove</button></div></div>`).join("")}</div>` : `<div class="empty">No videos here yet. Create one above, or press “Watch video lesson” on any lesson.</div>`}</section>
<details class="panel"><summary><b>Make real MP4 files (free, on your computer)</b></summary><div class="prose" style="margin-top:8px"><p>Videos here play live in the app. To get a shareable MP4, press <b>Export</b> on a video to save its storyboard, then run the free <code>render_video.py</code> script included with the installable app package. It renders each scene with Chromium (Playwright), narrates with Piper TTS (free, offline) or your computer's built-in voice, and joins everything with FFmpeg. No accounts or paid services.</p>
<p>Free cloud AI video services (Runway, Pika, HeyGen, Synthesia and others) were checked and not used: their free tiers are small one-off or monthly credit allowances, often watermarked, without a free API, and they generate generic footage rather than accurate architectural diagrams.</p></div></details>`;
}
ACTS.vsmake = () => { const kind = $("#vsKind").value, id = $("#vsSrc").value, fmt = $("#vsFmt").value; UI.vsSrc = id; UI.vsAI = $("#vsAI").checked; if (!id) return; ST.create({ kind, id }, fmt, { ai: $("#vsAI").checked }); };
ACTS.vsplay = (t) => ST.play(t.dataset.id);
ACTS.vsbm = (t) => { const v = E.S.videos[t.dataset.id]; v.bm = !v.bm; E.save(); rer(); };
ACTS.vsf = (t) => { UI.vsF = t.dataset.f; rer(); };
ACTS.vsdel = (t) => { if (t.dataset.sure !== "1") { t.dataset.sure = "1"; t.textContent = "Remove?"; return; } delete E.S.videos[t.dataset.id]; E.save(); rer(); };
ACTS.vsexport = async (t) => { const v = E.S.videos[t.dataset.id]; const data = ST.exportJSON(v.id); const name = "storyboard-" + v.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 50) + ".json"; await saveFile(name, data); };
async function saveFile(name, data) {
  try { const dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null; if (dl) { await dl.save({ filename: name, data }); toast("Saved " + name); return; } } catch (e) { if (e && e.code === "declined") return; }
  const url = URL.createObjectURL(new Blob([data], { type: name.endsWith(".ics") ? "text/calendar" : "application/json" })); const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000); toast("Saved " + name);
}

/* ============================================================
   LEARNING ANALYTICS + ACHIEVEMENTS
   ============================================================ */
function vAnalytics() {
  const A = L.analytics(), cal = A.calib, G = E.S.game, lv = L.level(G.xp || 0), st = L.streak(), wk = L.week();
  const secRows = Object.values(A.bySec).sort((a, b) => a.ok / a.n - b.ok / b.n);
  const maxT = Math.max(1, ...Object.values(A.timeByDiv));
  const lvls = (A.levels || []).slice(-30);
  return `<div class="stack" style="gap:6px"><span class="eyebrow">How well you know it, and how well it's sticking</span><h1>Learning Analytics</h1></div>
<div class="grid g4"><div class="panel kpi"><b>${A.retention === null ? "—" : pct(A.retention)}</b><span>Long-term retention (correct after 6+ days, ${A.retentionN} items)</span></div><div class="panel kpi"><b>${cal.accuracy === null ? "—" : pct(cal.accuracy)}</b><span>Confidence calibration (${cal.n} rated answers)</span></div><div class="panel kpi"><b>${A.srs.mature}</b><span>Mature review items (21+ day interval)</span></div><div class="panel kpi"><b>${A.reviewAcc === null ? "—" : pct(A.reviewAcc)}</b><span>Spaced-review accuracy</span></div></div>

<section class="stack"><h2>Achievements <small class="muted">${Object.keys(G.badges).length}/${L.BADGES.length}</small></h2><div class="grid g4 badges">${L.BADGES.map(b => `<div class="badge ${G.badges[b.id] ? "got" : ""}"><span class="bi" aria-hidden="true">${G.badges[b.id] ? "★" : "☆"}</span><b>${esc(b.t)}</b><small>${esc(b.d)}</small>${G.badges[b.id] ? `<small class="mono">${fmtDate(G.badges[b.id])}</small>` : ""}</div>`).join("")}</div>
<p class="muted" style="font-size:.85rem">Personal bests: ${ARE.DIVISIONS.map(d => G.bests["form-" + d.id] ? d.code + " " + pct(G.bests["form-" + d.id]) : null).filter(Boolean).join(" · ") || "finish a practice exam form to set one"}.</p></section>
<section class="panel stack"><h2>Confidence vs. results</h2><p class="muted" style="font-size:.88rem">Rate your confidence before checking practice answers. Being sure and wrong points to a misconception; being unsure and right means you need more retrieval practice, not more reading.</p>
<div class="grid g4 calib"><div class="cb ok"><b>${cal.sureRight}</b><span>Sure &amp; right<br><small>Understood confidently</small></span></div><div class="cb under"><b>${cal.unsureRight}</b><span>Unsure &amp; right<br><small>Understood, low confidence</small></span></div><div class="cb bad"><b>${cal.sureWrong}</b><span>Sure &amp; wrong<br><small>Thinks they know it</small></span></div><div class="cb need"><b>${cal.unsureWrong}</b><span>Unsure &amp; wrong<br><small>Needs instruction</small></span></div></div>
${[["illusion", "You believe you know these, but don't yet", "var(--bad)"], ["underconfident", "You know these better than you think", "var(--accent)"], ["needs", "Need more instruction", "var(--warn)"], ["confident", "Confident and correct", "var(--ok)"]].map(([k, t]) => cal.groups[k].length ? `<p><b>${t}:</b> ${cal.groups[k].map(o => `<a href="#div-${ARE.OBJ[o].div}">${objLabel(o)}</a>`).join(" · ")}</p>` : "").join("")}</section>
<section class="panel stack"><h2>Accuracy over time</h2>${spark(A.weekly)}<p class="muted" style="font-size:.85rem">Weekly accuracy, last 10 weeks (bars scale with number answered).</p></section>
<div class="grid g2"><section class="panel stack"><h2>By difficulty</h2>${A.byDiff.map(d => `<div class="row between"><span>${["", "Foundational", "Applied", "Analytical"][d.d]}</span><span class="mono">${d.n} · ${pct(d.acc)}</span></div>${bar(d.acc || 0)}`).join("")}</section>
<section class="panel stack"><h2>Study time by division</h2>${ARE.DIVISIONS.map(d => `<div class="row between"><span>${d.code}</span><span class="mono">${fmtMin(A.timeByDiv[d.id] || 0)}</span></div>${bar((A.timeByDiv[d.id] || 0) / maxT, "var(--sand)")}`).join("")}</section></div>
<section class="panel stack"><h2>Accuracy by subject (weakest first)</h2>${secRows.length ? `<div class="list">${secRows.slice(0, 14).map(r => `<div class="row between"><span>${divCode(r.div)} §${r.sec} ${esc(r.name)}</span><span class="mono">${r.ok}/${r.n} · ${pct(r.ok / r.n)}</span></div>`).join("")}</div>` : `<div class="empty">Answer some questions to see this.</div>`}</section>
<section class="panel stack"><h2>Repeated misconceptions</h2>${A.repeated.length ? `<div class="list">${A.repeated.map(m => { const q = E.QMAP[m.q]; if (!q) return ""; const top = Object.entries(m.opts).sort((a, b) => b[1] - a[1])[0]; return `<div class="row between" style="flex-wrap:nowrap"><span style="min-width:0"><span class="chip code">${objLabel(q.obj)}</span> ${esc(L.strip(q.q).slice(0, 110))}…${top && q.opts ? `<br><small class="muted">Chose “${esc(L.strip(q.opts[top[0]]).slice(0, 70))}” ${top[1]}×</small>` : ""}</span><span class="row" style="flex-wrap:nowrap"><b class="mono">${m.n}×</b><a class="btn small" href="#note-${q.obj}">Note</a></span></div>`; }).join("")}</div>` : `<div class="empty">No repeated mistakes yet.</div>`}</section>
<section class="panel stack"><h2>Spaced repetition</h2><p>${A.srs.cards} items scheduled · ${A.srs.due} due now · average ease ${A.srs.avgEF ? A.srs.avgEF.toFixed(2) : "—"} (2.5 is the SM-2 default; lower means harder for you) · ${A.srs.lapses} lapses.</p></section>
<section class="panel stack"><h2>Competency progression</h2>${lvls.length ? `<div class="lvchart">${lvls.map(x => { const tot = x.dist.reduce((a, b) => a + b, 0) || 1; return `<div class="lvcol" title="${x.d}">${[4, 3, 2, 1].map(i => `<i class="lvs${i}" style="height:${x.dist[i] / tot * 100}%"></i>`).join("")}</div>`; }).join("")}</div><p class="muted" style="font-size:.85rem">Share of the 91 objectives at each level, one column per study day. <span class="lv lv4"><i></i>Mastered</span> <span class="lv lv3"><i></i>Proficient</span> <span class="lv lv2"><i></i>Developing</span> <span class="lv lv1"><i></i>Introduced</span></p>` : `<div class="empty">Builds up as you study.</div>`}</section>`;
}
function spark(w) {
  const max = Math.max(1, ...w.map(x => x.n));
  return `<div class="spark">${w.map(x => `<div class="sp"><i style="height:${x.acc === null ? 0 : Math.round(x.acc * 100)}%;opacity:${0.35 + 0.65 * x.n / max}"></i><small>${x.acc === null ? "" : Math.round(x.acc * 100)}</small><span>${fmtDate(x.a)}</span></div>`).join("")}</div>`;
}

/* ============================================================
   SETTINGS: appearance, AI provider, reminders, install, sync
   ============================================================ */
const isStandalone = () => window.matchMedia && (matchMedia("(display-mode: standalone)").matches || navigator.standalone);
const inClaude = () => !!(window.claude && window.claude.use) && window.top !== window;
function vSettings() {
  const p = ARE.prefs, c = AI.cfg, act = AI.active();
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Everything here is free</span><h1>Settings</h1></div>
<section class="panel stack"><h2>Appearance &amp; accessibility</h2>
<div class="row"><span style="min-width:110px">Theme</span>${[["auto", "Match device"], ["light", "Light"], ["dark", "Dark"]].map(([k, t]) => `<button class="chip ${p.theme === k ? "on" : ""}" data-act="pref" data-k="theme" data-v="${k}">${t}</button>`).join("")}</div>
<div class="row"><span style="min-width:110px">Text size</span>${[100, 115, 130, 150, 175].map(v => `<button class="chip ${p.text === v ? "on" : ""}" data-act="pref" data-k="text" data-v="${v}" aria-label="Text size ${v}%">${v}%</button>`).join("")}</div>
<div class="row"><span style="min-width:110px">Font</span>${[["standard", "Standard"], ["legible", "Easy-read (Atkinson Hyperlegible)"]].map(([k, t]) => `<button class="chip ${p.font === k ? "on" : ""}" data-act="pref" data-k="font" data-v="${k}">${t}</button>`).join("")}</div>
<div class="row"><span style="min-width:110px">Spacing</span>${[["normal", "Normal"], ["relaxed", "Relaxed lines and letters"]].map(([k, t]) => `<button class="chip ${p.spacing === k ? "on" : ""}" data-act="pref" data-k="spacing" data-v="${k}">${t}</button>`).join("")}</div>
<p class="muted" style="margin:0">Easy-read uses a typeface designed for low-vision readers, with distinct letter shapes (I, l, 1 and 0, O look different). Settings stay on this device.</p>
<div class="row"><span style="min-width:110px">Motion</span>${[["auto", "Follow device"], ["reduce", "Reduce animations"]].map(([k, t]) => `<button class="chip ${p.motion === k ? "on" : ""}" data-act="pref" data-k="motion" data-v="${k}">${t}</button>`).join("")}</div></section>

${voicePanel()}
<section class="panel stack" id="ai"><h2>AI tutor &amp; video scripts</h2>
<p>Status: <b>${act ? esc(AI.label(act)) : "not connected"}</b>. Live AI needs an internet connection. Everything else works offline.</p>
<div class="row">${[["auto", "Automatic"], ["claude", "Claude"], ["gemini", "Gemini (free key)"], ["openai", "Ollama / OpenAI-compatible"]].map(([k, t]) => `<button class="chip ${c.provider === k ? "on" : ""}" data-act="aiprov" data-v="${k}">${t}</button>`).join("")}</div>
<div class="aiopt"><h3>Claude ${AI.sampleState === "ready" ? `<span class="lv lv4"><i></i>Available here</span>` : `<span class="lv lv0"><i></i>Not available here</span>`}</h3><p class="muted">Works when ARE Academy is opened inside claude.ai or the Claude app (iPhone/iPad included). It uses your own Claude plan's usage. No key needed, and you're asked once to allow it. It isn't available in the installed web app, because only Claude's own pages can reach it.</p></div>
<div class="aiopt"><h3>Google Gemini API (free tier)</h3><p class="muted">Create a key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>. The free tier has per-minute and per-day request limits set per Google Cloud project; check your current limits in AI Studio. Google states that free-tier prompts may be used to improve its products, so don't paste confidential project information. Your key stays on this device and is never exported.</p>
<div class="row" style="align-items:flex-end"><label class="f" style="flex:1;min-width:200px">API key<input type="password" id="gKey" value="${esc(c.gemini.key)}" autocomplete="off" placeholder="AIza…"></label><label class="f">Model<input type="text" id="gModel" value="${esc(c.gemini.model)}" list="gModels" style="width:200px"><datalist id="gModels"></datalist></label><button class="btn small" data-act="gsave">Save</button><button class="btn small" data-act="glist">List my models</button></div></div>
<div class="aiopt"><h3>Ollama on your computer, or another OpenAI-compatible endpoint</h3><p class="muted">Free and private: <a href="https://ollama.com" target="_blank" rel="noopener">Ollama</a> runs open models (e.g. <code>llama3.2</code>, <code>qwen2.5</code>) locally. Start it with <code>OLLAMA_ORIGINS=*</code> (or this app's address) so the browser may call it. This works from the same computer; iPhone/iPad can't reach it without extra network setup. Free hosted tiers such as Groq also use this format (base <code>https://api.groq.com/openai/v1</code> + your key).</p>
<div class="row" style="align-items:flex-end"><label class="f" style="flex:1;min-width:200px">Base URL<input type="url" id="oBase" value="${esc(c.openai.base)}"></label><label class="f">Model<input type="text" id="oModel" value="${esc(c.openai.model)}" style="width:150px"></label><label class="f">Key (optional)<input type="password" id="oKey" value="${esc(c.openai.key)}" autocomplete="off" style="width:150px"></label><button class="btn small" data-act="osave">Save</button></div></div>
<div class="row"><button class="btn primary" data-act="aitest">Test connection</button><span id="aiTestOut" class="muted"></span></div>
<p class="muted" style="font-size:.85rem">Running a model fully inside the iPhone browser (WebGPU) was evaluated and not offered: published tests on iPhone Safari show small models crashing the tab during loading.</p></section>

<section class="panel stack"><h2>Daily study reminder</h2><p class="muted">Web apps can't schedule notifications on iPhone without a paid push server, so the free route is a repeating calendar event: it reminds you through the Calendar app and opens ARE Academy from its link.</p>
<div class="row" style="align-items:flex-end"><label class="f">Time<input type="time" id="remT" value="${esc(E.S.ui.remT || "19:30")}"></label><label class="f">Minutes<select id="remM">${[15, 30, 45, 60].map(m => `<option ${+(E.S.ui.remM || 30) === m ? "selected" : ""}>${m}</option>`).join("")}</select></label><button class="btn" data-act="ics">Add to Calendar (.ics)</button></div></section>

<section class="panel stack" id="install"><h2>Install on iPhone &amp; iPad</h2>
${isStandalone() ? `<p><span class="lv lv4"><i></i>Installed</span> You're using the home-screen app. Progress is saved on this device in IndexedDB.</p>` : inClaude() ? `<p>You're viewing ARE Academy inside Claude. Two ways to use it on iPhone/iPad:</p><ol class="prose"><li><b>In the Claude app</b>: open this artifact there. Progress syncs through your Claude account across iPhone, iPad and desktop automatically, and the AI tutor uses Claude.</li><li><b>As a home-screen app</b>: download the free installable package from the conversation, host it free on GitHub Pages, Cloudflare Pages or Netlify (instructions inside), open it in Safari, then Share → <b>Add to Home Screen</b>. It works offline.</li></ol>` : `<ol class="prose"><li>Open this page in <b>Safari</b>.</li><li>Tap <b>Share</b> (square with an arrow), then <b>Add to Home Screen</b>.</li><li>Open ARE Academy from the home screen: it runs full-screen and works offline.</li></ol>`}</section>

<section class="panel stack" id="sync"><h2>Sync between devices</h2>
<p>${inClaude() ? (E.sync.status === "synced" ? "<span class='lv lv4'><i></i>Syncing</span> Your progress is saved privately to your Claude account and follows you to any device where you open this artifact." : "Progress syncs through your Claude account when you're signed in.") : "This installed app saves to this device. Choose a free way to move progress between iPhone and iPad:"}</p>
<ul class="prose"><li><b>Backup file</b> (always works): Backup &amp; data → <i>Share backup to another device</i> (AirDrop, Files or iCloud Drive), then <i>Import</i> on the other device. You confirm before anything is overwritten.</li>
<li><b>Private GitHub Gist</b> (optional, free, automatic): a free GitHub account and a personal access token with only the <code>gist</code> permission. Your progress is stored in a secret gist you own and synced when the app opens, every few minutes, and when you leave. If both devices changed, answers and notes are merged rather than overwritten.</li></ul>
<div class="row" style="align-items:flex-end"><label class="f" style="flex:1;min-width:220px">GitHub token (gist scope)<input type="password" id="ghTok" value="${esc(ARE.SYNC.cfg.token)}" autocomplete="off"></label><label class="f">Gist ID (blank = create)<input type="text" id="ghId" value="${esc(ARE.SYNC.cfg.gist)}" style="width:220px"></label><button class="btn" data-act="ghsave">Save &amp; sync now</button>${ARE.SYNC.cfg.token ? `<button class="btn ghost" data-act="ghoff">Turn off</button>` : ""}</div>
<p class="muted" id="ghStatus">${esc(ARE.SYNC.status || "")}</p></section>
<section class="panel stack"><h2>What needs an internet connection</h2><div class="scroll"><table class="tbl"><thead><tr><th>Feature</th><th>Offline</th></tr></thead><tbody>
<tr><td>Lessons, questions, exams, flashcards, notes, planner, analytics</td><td>Yes</td></tr><tr><td>Video lessons (device voices)</td><td>Yes, if your device has an offline voice (iPhone/iPad do)</td></tr><tr><td>AI tutor, AI-written notes, AI video scripts, AI questions</td><td>No: needs Claude, Gemini or Ollama</td></tr><tr><td>Sync (Claude account or Gist)</td><td>Queued until you're back online; local saving never stops</td></tr><tr><td>Links to Drive, ICC, NCARB</td><td>No</td></tr></tbody></table></div></section>`;
}
function voicePanel() {
  const V = ARE.VOICE;
  if (!V.ok()) return `<section class="panel stack" id="voice"><h2>Read-aloud voice</h2><p class="muted">This browser has no speech voices. Captions still play.</p></section>`;
  const list = V.list(), cur = V.best();
  const tip = `<details class="elab"><summary>Get a more natural voice (free)</summary><ul class="prose">
<li><b>iPhone / iPad:</b> Settings → Accessibility → Spoken Content → Voices → English. Download a voice marked <i>Enhanced</i> or <i>Premium</i> (for example Ava, Zoe or Evan), then reopen ARE Academy and pick it here.</li>
<li><b>Mac:</b> System Settings → Accessibility → Spoken Content → System voice → Manage Voices, and download a Premium or Enhanced voice.</li>
<li><b>Windows:</b> open ARE Academy in Microsoft Edge, which offers free "Natural" voices.</li>
<li><b>Android / Chrome:</b> the "Google" voices are the most natural option there.</li></ul></details>`;
  return `<section class="panel stack" id="voice"><h2>Read-aloud voice</h2>
<p class="muted">Videos and narrated lessons use the voices built into your device. ARE Academy picks the most natural one it finds, reads abbreviations the way a person would (§ as "section", sf as "square feet", 29–35% as "29 to 35 percent") and pauses between sentences.</p>
${list.length ? `<div class="row" style="align-items:flex-end"><label class="f" style="flex:1;min-width:220px">Voice<select id="vSel">${list.map(v => `<option value="${esc(v.voiceURI)}" ${cur && v.voiceURI === cur.voiceURI ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)}) · ${V.quality(v)}</option>`).join("")}</select></label><button class="btn primary" data-act="vtry">Use &amp; preview</button><button class="btn" data-act="vstop">Stop</button></div>` : `<p class="muted">Voices are still loading. Reopen this page in a moment.</p>`}
<div class="row"><span style="min-width:110px">Speaking pace</span>${[[0.9, "Relaxed"], [1, "Normal"], [1.1, "Brisk"]].map(([r, t]) => `<button class="chip ${V.cfg.rate === r ? "on" : ""}" data-act="vrate" data-v="${r}">${t}</button>`).join("")}</div>
${list.length && !V.hasNatural() ? `<p class="cal bad">Only basic voices are installed on this device, so narration may sound robotic. The steps below add a natural voice for free.</p>` : ""}
${tip}</section>`;
}
ACTS.vtry = () => { const sel = $("#vSel"); if (sel) { ARE.VOICE.cfg.uri = sel.value; ARE.VOICE.save(); } ARE.VOICE.preview(); };
ACTS.vstop = () => { if (ARE.VOICE.ok()) speechSynthesis.cancel(); };
ACTS.vrate = (t) => { ARE.VOICE.cfg.rate = +t.dataset.v; ARE.VOICE.save(); rer(); ARE.VOICE.preview(); };
ARE.VOICE.onchange = () => { if (/^#settings/.test(location.hash) && !document.querySelector("#vSel")) rer(); };
let podF = { d: "all", q: "", left: false };
function vPodcast() {
  const P = ARE.PODCAST, all = P.eps;
  const heard = all.filter(e => P.heard(e.id)).length;
  const F = [["all", "All"], ["pcm", "PcM"], ["pjm", "PjM"], ["pa", "PA"], ["ppd", "PPD"], ["pdd", "PDD"], ["ce", "CE"], ["s", "Study strategy"], ["p", "Candidate stories"]];
  const q = podF.q.trim().toLowerCase();
  const list = all.filter(e => (podF.d === "all" || (podF.d === "s" || podF.d === "p" ? e.kind === podF.d : e.divs.includes(podF.d)))
    && (!podF.left || !P.heard(e.id)) && (!q || e.t.toLowerCase().includes(q)));
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Free · ${esc(P.by)}</span><h1>${esc(P.show)}</h1></div>
<section class="panel stack"><p>Short, single-topic episodes that turn NCARB objectives into plain explanations. Each episode is matched to the ARE divisions and the lessons in this app it supports. Episodes, articles and their free two-page study notes are Young Architect's and open on their site.</p>
<div class="row"><a class="btn primary" href="${esc(P.apple)}" target="_blank" rel="noopener">Follow on Apple Podcasts ↗</a><a class="btn" href="${esc(P.site)}" target="_blank" rel="noopener">All episodes on Young Architect ↗</a></div>
<div class="row between"><span class="muted">${heard} of ${all.length} listened</span><span class="muted" style="font-size:.85rem">Episode list checked ${esc(P.checked)}. New episodes appear weekly on their site.</span></div>
<div class="bar"><span style="width:${Math.round(heard / all.length * 100)}%"></span></div></section>
<section class="stack"><div class="row">${F.map(([k, t]) => `<button class="chip ${podF.d === k ? "on" : ""}" data-act="podfilter" data-v="${k}">${t}</button>`).join("")}</div>
<div class="row"><div class="searchbox" style="flex:1;min-width:200px">${'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>'}<input type="search" id="podQ" placeholder="Search episodes" value="${esc(podF.q)}" aria-label="Search episodes"></div><label class="row" style="gap:6px"><input type="checkbox" id="podLeft" ${podF.left ? "checked" : ""}> Not yet listened</label></div>
<div class="pod-list">${list.length ? list.map(e => P.row(e)).join("") : `<div class="empty">No episodes match.</div>`}</div></section>`;
}
ACTS.podfilter = (t) => { podF.d = t.dataset.v; if (location.hash !== "#podcast") location.hash = "#podcast"; else rer(); };
ACTS.podopen = (t) => { ARE.E.S.pod = ARE.E.S.pod || {}; if (!ARE.E.S.pod[t.dataset.id]) { ARE.E.S.pod[t.dataset.id] = Date.now(); ARE.E.save(); setTimeout(rer, 300); } };
ACTS.podmark = (t) => { const S = ARE.E.S; S.pod = S.pod || {}; if (S.pod[t.dataset.id]) delete S.pod[t.dataset.id]; else S.pod[t.dataset.id] = Date.now(); ARE.E.save(); rer(); };
document.addEventListener("input", (e) => { if (e.target.id === "podQ") { podF.q = e.target.value; clearTimeout(podF.tm); podF.tm = setTimeout(() => { const pos = e.target.selectionStart; rer(); const n = document.getElementById("podQ"); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} } }, 250); } });
document.addEventListener("change", (e) => { if (e.target.id === "podLeft") { podF.left = e.target.checked; rer(); } });
ACTS.pref = (t) => { const k = t.dataset.k; ARE.prefs[k] = k === "text" ? +t.dataset.v : t.dataset.v; savePrefs(); rer(); };
ACTS.aiprov = (t) => { AI.cfg.provider = t.dataset.v; AI.saveCfg(); rer(); };
ACTS.gsave = () => { AI.cfg.gemini.key = $("#gKey").value.trim(); AI.cfg.gemini.model = $("#gModel").value.trim() || "gemini-flash-latest"; AI.saveCfg(); toast("Saved on this device"); rer(); };
ACTS.osave = () => { AI.cfg.openai.base = $("#oBase").value.trim(); AI.cfg.openai.model = $("#oModel").value.trim(); AI.cfg.openai.key = $("#oKey").value.trim(); AI.cfg.openai.ok = false; AI.saveCfg(); toast("Saved. Press Test connection."); rer(); };
ACTS.glist = async () => { ACTS.gsave(); try { const m = await AI.listGemini(); $("#gModels").innerHTML = m.map(x => `<option value="${esc(x)}">`).join(""); toast(m.length + " models available to your key"); } catch (e) { toast(AI.errText(e)); } };
ACTS.aitest = async () => {
  const out = $("#aiTestOut"); out.textContent = "Testing…";
  const prev = AI.cfg.openai.ok; if (AI.cfg.provider === "openai" || AI.cfg.provider === "auto") AI.cfg.openai.ok = true;
  try { const r = await AI.test(); out.textContent = "✓ " + AI.label(AI.active()) + " replied: " + r; AI.saveCfg(); ARE.TUTOR.refresh(); }
  catch (e) { AI.cfg.openai.ok = prev; AI.saveCfg(); out.textContent = "✗ " + AI.errText(e); }
};
ACTS.ics = async () => {
  const tm = $("#remT").value || "19:30", mins = +$("#remM").value || 30; E.S.ui.remT = tm; E.S.ui.remM = mins; E.save();
  const [hh, mm] = tm.split(":"); const d = new Date(); d.setHours(+hh, +mm, 0, 0); if (d < new Date()) d.setDate(d.getDate() + 1);
  const f = (x) => x.getFullYear() + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0") + "T" + String(x.getHours()).padStart(2, "0") + String(x.getMinutes()).padStart(2, "0") + "00";
  const end = new Date(d.getTime() + mins * 60000); const url = location.href.split("#")[0] + "#today";
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ARE Academy//EN", "BEGIN:VEVENT", "UID:are-academy-daily-" + Date.now() + "@local", "DTSTAMP:" + f(new Date()), "DTSTART:" + f(d), "DTEND:" + f(end), "RRULE:FREQ=DAILY", "SUMMARY:ARE study · " + mins + " min", "DESCRIPTION:Open Today's Study Plan: " + url, "URL:" + url, "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", "DESCRIPTION:Time for ARE study", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  await saveFile("are-study-reminder.ics", ics);
};
ACTS.ghsave = async () => { ARE.SYNC.cfg.token = $("#ghTok").value.trim(); ARE.SYNC.cfg.gist = $("#ghId").value.trim(); ARE.SYNC.save(); await ARE.SYNC.run(true); rer(); };
ACTS.ghoff = () => { ARE.SYNC.cfg = { token: "", gist: "" }; ARE.SYNC.save(); ARE.SYNC.status = "Gist sync turned off. Your gist was not deleted."; rer(); };

/* ============================================================
   MERGE + OPTIONAL GIST SYNC (free; GitHub account + token)
   ============================================================ */
E.merge = (a, b) => {
  // a, b: two states; returns a merged state that keeps work from both
  const newer = (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b, older = newer === a ? b : a;
  const m = JSON.parse(JSON.stringify(newer));
  const key = (x) => x.q + "|" + x.t;
  const seen = new Set(m.attempts.map(key)); (older.attempts || []).forEach(x => { if (!seen.has(key(x))) { m.attempts.push(x); seen.add(key(x)); } }); m.attempts.sort((x, y) => x.t - y.t);
  const byLatest = (A, B, f) => { Object.entries(B || {}).forEach(([k, v]) => { if (!A[k] || (f(v) || 0) > (f(A[k]) || 0)) A[k] = v; }); };
  byLatest(m.srs, older.srs, v => v.last); byLatest(m.fc, older.fc, v => v.last); byLatest(m.lnotes, older.lnotes, v => v.updated); byLatest(m.videos, older.videos, v => v.watched || v.created);
  Object.entries(older.lessons || {}).forEach(([k, v]) => { const c = m.lessons[k]; if (!c) m.lessons[k] = v; else { c.done = c.done || v.done; c.viewed = Math.min(c.viewed || Infinity, v.viewed || Infinity); if (v.check && (!c.check || v.check.t > c.check.t)) c.check = v.check; } });
  const unionT = (A, B) => { const s = new Set(A.map(x => x.t)); B.forEach(x => { if (!s.has(x.t)) A.push(x); }); A.sort((x, y) => x.t - y.t); };
  unionT(m.results, older.results || []); unionT(m.time, older.time || []);
  Object.entries((older.game || {}).days || {}).forEach(([k, v]) => { const c = m.game.days[k]; if (!c) m.game.days[k] = v; else ["xp", "n", "ok", "fc", "plan"].forEach(f => c[f] = Math.max(c[f] || 0, v[f] || 0)); });
  m.game.xp = Math.max(m.game.xp || 0, (older.game || {}).xp || 0); Object.assign(m.game.badges, Object.assign({}, (older.game || {}).badges, m.game.badges));
  Object.entries(older.notes || {}).forEach(([k, v]) => { if (!(k in m.notes)) m.notes[k] = v; });
  (older.cards || []).forEach(c => { if (!m.cards.some(x => x.id === c.id)) m.cards.push(c); });
  m.pod = Object.assign({}, older.pod || {}, m.pod || {});
  m.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  if (ARE.migrateOpts) ARE.migrateOpts(m);
  return m;
};
const SY = ARE.SYNC = { cfg: (() => { try { return Object.assign({ token: "", gist: "" }, JSON.parse(localStorage.getItem("are-gist") || "{}")); } catch (e) { return { token: "", gist: "" }; } })(), status: "", busy: false };
SY.save = () => { try { localStorage.setItem("are-gist", JSON.stringify(SY.cfg)); } catch (e) {} };
const GH = "https://api.github.com", FILE = "are-academy-progress.json";
SY.run = async (manual) => {
  if (!SY.cfg.token || SY.busy) return; if (!navigator.onLine) { SY.status = "Offline. Will sync when you're back online."; return; }
  SY.busy = true;
  const h = { Authorization: "Bearer " + SY.cfg.token, Accept: "application/vnd.github+json", "Content-Type": "application/json" };
  try {
    let remote = null;
    if (SY.cfg.gist) {
      const r = await fetch(GH + "/gists/" + SY.cfg.gist, { headers: h, cache: "no-store" });
      if (!r.ok) throw new Error("GitHub " + r.status);
      const j = await r.json(); const f = j.files && j.files[FILE];
      if (f) { let txt = f.content; if (f.truncated && f.raw_url) txt = await (await fetch(f.raw_url, { cache: "no-store" })).text(); try { remote = E.sanitize(JSON.parse(txt).state); } catch (e) { remote = null; } }
    }
    let merged = E.S;
    if (remote && remote.updatedAt) {
      merged = E.merge(E.S, remote);
      if (JSON.stringify(merged.attempts.length) !== JSON.stringify(E.S.attempts.length) || remote.updatedAt > E.S.updatedAt) { ARE.Store && await ARE.Store.addSnapshot(JSON.stringify(E.S), "Before sync " + new Date().toLocaleString()).catch(() => {}); E.S = E.sanitize(merged); E.rebuild(); E.save(true); }
    }
    const body = JSON.stringify({ description: "ARE Academy progress (private)", files: { [FILE]: { content: JSON.stringify({ app: "are-academy", synced: new Date().toISOString(), state: E.S }) } } });
    const w = SY.cfg.gist ? await fetch(GH + "/gists/" + SY.cfg.gist, { method: "PATCH", headers: h, body }) : await fetch(GH + "/gists", { method: "POST", headers: h, body: JSON.stringify(Object.assign(JSON.parse(body), { public: false })) });
    if (!w.ok) throw new Error("GitHub " + w.status);
    const wj = await w.json(); if (!SY.cfg.gist) { SY.cfg.gist = wj.id; SY.save(); }
    SY.status = "Synced " + new Date().toLocaleTimeString() + " · secret gist " + SY.cfg.gist.slice(0, 8) + "…"; SY.last = Date.now();
    if (manual) toast("Synced");
  } catch (e) { SY.status = "Sync failed: " + (e.message || e) + ". Your progress is still saved on this device."; if (manual) toast(SY.status); }
  finally { SY.busy = false; }
};
let syT = null;
E.hooks.save.push(() => { if (!SY.cfg.token) return; clearTimeout(syT); syT = setTimeout(() => SY.run(), 180000); });
document.addEventListener("visibilitychange", () => { if (document.hidden && SY.cfg.token && (!SY.last || Date.now() - SY.last > 30000)) SY.run(); });
window.addEventListener("online", () => SY.cfg.token && SY.run());
setTimeout(() => { if (SY.cfg.token) SY.run().then(() => H.route()); }, 1500);

/* ============================================================
   ROUTES + after-render binding
   ============================================================ */
ARE.ROUTE = (h) => {
  if (h === "today") return vToday();
  if (h === "lnotes") return vLnotes();
  if (h.startsWith("note-") && ARE.OBJ[h.slice(5)]) return vNote(h.slice(5));
  if (h === "studio") return vStudio();
  if (h === "analytics") return vAnalytics();
  if (h === "settings") return vSettings();
  if (h === "podcast") return vPodcast();
  return null;
};
ARE.AFTER = (h) => {
  if (h === "data") {
    const box = $("#snapList"); if (box && ARE.Store) ARE.Store.snapshots().then(list => { box.innerHTML = list.length ? list.map(x => `<div class="row between"><span><b>${esc(x.label)}</b><br><small class="muted mono">${new Date(x.t).toLocaleString()} · ${Math.round(x.size / 1024)} KB</small></span><button class="btn small" data-act="snaprestore" data-t="${x.t}">Restore…</button></div>`).join("") : `<span class="muted">No snapshots yet. The first one is taken after you start studying.</span>`; }).catch(() => { box.innerHTML = `<span class="muted">Snapshots need IndexedDB, which this browser blocked.</span>`; });
  }
  if (h === "studio") {
    const k = $("#vsKind"); if (k) k.addEventListener("change", () => { UI.vsKind = k.value; UI.vsSrc = null; rer(); });
    const f = $("#vsFmt"); if (f) f.addEventListener("change", () => { UI.vsFmt = f.value; });
    [["#vsDiv", "vsDiv"], ["#vsDur", "vsDur"], ["#vsObj", "vsObj"]].forEach(([s, kk]) => { const el = $(s); if (el) el.addEventListener("change", () => { UI[kk] = el.value; if (kk === "vsDiv") UI.vsObj = ""; rer(); }); });
  }
  if (h === "lnotes") {
    const d = $("#lnDiv"); if (d) d.addEventListener("change", () => { UI.lnDiv = d.value; UI.lnSec = "all"; rer(); });
    const s = $("#lnSec"); if (s) s.addEventListener("change", () => { UI.lnSec = s.value; rer(); });
    const q = $("#lnQ"); if (q) { q.addEventListener("input", () => { UI.lnQ = q.value; clearTimeout(q._t); q._t = setTimeout(() => { rer(); const n = $("#lnQ"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 400); }); }
  }
  if (h.startsWith("note-")) {
    $$("[data-lnedit],[data-lncomment]").forEach(ta => ta.addEventListener("input", () => { const n = E.S.lnotes[ta.dataset.lnedit || ta.dataset.lncomment]; if (ta.dataset.lnedit) n.edit = ta.value; else n.comment = ta.value; E.save(); }));
    const fig = $(".nfig"); if (fig) $$(".tip", fig).forEach(g => { g.setAttribute("tabindex", "0"); g.addEventListener("click", () => $$(".tip", fig).forEach(x => x.classList.toggle("on", x === g))); });
  }
  if (h === "analytics") { const g = $("#weekGoal"); if (g) g.addEventListener("change", () => { E.S.game.weekGoal = Math.max(20, +g.value || 150); E.save(); rer(); }); }
};
ACTS.snaprestore = async (t) => {
  if (t.dataset.sure !== "1") { t.dataset.sure = "1"; t.textContent = "Replace current progress?"; return; }
  const snap = await ARE.Store.getSnapshot(+t.dataset.t); if (!snap) return;
  await ARE.Store.addSnapshot(JSON.stringify(E.S), "Before restore " + new Date().toLocaleString()).catch(() => {});
  E.S = E.sanitize(JSON.parse(snap.json)); E.S.updatedAt = Date.now(); E.rebuild(); E.save(true); E.flush(); toast("Snapshot restored"); rer();
};
/* daily-challenge completion + video plan-step completion */
E.hooks.finish.push((s) => { if (s.title === "Daily challenge") { const ch = L.dailyChallenge(); ch.done = Date.now(); ch.score = s.correct; L.addXP(25, "Daily challenge"); E.save(); } });
ARE.boot();
})();
