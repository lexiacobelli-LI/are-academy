/* ============================================================
   LEARN: learning-science layer
   - personalized learning notes (auto-generated from performance)
   - confidence calibration (metacognition)
   - progressive difficulty + interleaving
   - XP, streaks, badges, personal bests (rewarding retention)
   - Today's Study Plan builder + session summaries
   - analytics
   ============================================================ */
(function () {
const E = ARE.E, L = ARE.L = {};
const DAY = 86400000;
const strip = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
L.strip = strip;

/* ---------- commonly confused pairs (definitions come from the course glossary) ---------- */
L.CONFUSABLES = [
  ["Statute of limitations", "Statute of repose"], ["Quality assurance", "Quality control"], ["Air barrier", "Vapor retarder"],
  ["Water-resistive barrier", "Air barrier"], ["Detention", "Retention"], ["STC", "NRC"], ["Allowance", "Alternate"],
  ["Addendum", "Change order"], ["Change order", "Construction change directive"], ["RFI", "ASI"],
  ["CM at risk", "Design-build"], ["Design-bid-build", "Design-build"], ["Claims-made policy", "Extended reporting period"],
  ["Net multiplier", "Break-even rate"], ["Overhead rate", "Break-even rate"], ["U-factor", "SHGC"],
  ["Variance", "Nonconforming use"], ["Floor area ratio", "Lot coverage"], ["VAV system", "VRF system"], ["LLC", "LLP"],
  ["Exempt employee", "Independent contractor"], ["Substantial completion", "Punch list"], ["Bubble diagram", "Stacking diagram"]
];
L.term = (t) => E.glossary.find(g => g.term.toLowerCase() === t.toLowerCase());
L.pairsFor = (lessonId) => L.CONFUSABLES.filter(([a, b]) => { const A = L.term(a), B = L.term(b); return A && B && (A.lesson === lessonId || B.lesson === lessonId); });

/* ============================================================
   PERSONALIZED LEARNING NOTES
   One note per objective (the concept). Each trigger is logged;
   content is assembled from verified course material.
   ============================================================ */
const TRIG = {
  wrong: "Answered incorrectly", repeat: "Same mistake made again", calc: "Struggled with a calculation",
  sure: "Was confident but wrong (likely misconception)", poor: "Low performance on this objective",
  confused: "Marked as confusing", confuse_pair: "Confused two similar terms", exam: "Missed on a practice exam"
};
L.TRIG = TRIG;
function noteFor(obj) {
  const N = E.S.lnotes;
  if (!N[obj]) N[obj] = { id: obj, obj, created: Date.now(), updated: Date.now(), triggers: [], miss: [], bm: false, comment: "", edit: "", understood: false, archived: false, ai: [], checks: [] };
  return N[obj];
}
L.savePassage = (obj, src, text, href) => {
  if (!ARE.OBJ[obj] || !text) return null;
  const n = noteFor(obj); n.saved = n.saved || [];
  if (n.saved.some(x => x.text === text)) return n;
  n.saved.push({ t: Date.now(), src, text: String(text).slice(0, 2000), href: href || "" });
  if (n.saved.length > 30) n.saved = n.saved.slice(-30);
  n.updated = Date.now(); if (n.archived) { n.archived = false; n.reopened = Date.now(); }
  return n;
};
L.addTrigger = (obj, kind, data) => {
  if (!ARE.OBJ[obj]) return null;
  const n = noteFor(obj);
  n.triggers.push(Object.assign({ t: Date.now(), kind }, data || {}));
  if (n.triggers.length > 40) n.triggers = n.triggers.slice(-40);
  n.updated = Date.now();
  if (n.archived && kind !== "poor") { n.archived = false; n.reopened = Date.now(); }
  n.understood = false;
  return n;
};
/* called from engine record hook */
function onRecordNotes(q, a, prev, extra) {
  if (!q || !ARE.OBJ[q.obj]) return;
  const n = E.S.lnotes[q.obj];
  if (a.ok) { if (n) n.checks.push({ t: a.t, ok: true, q: q.id }); return; }
  const kind = a.c === 3 ? "sure" : q.type === "calc" ? "calc" : (a.m === "exam" || a.m === "case") ? "exam" : "wrong";
  const note = L.addTrigger(q.obj, kind, { q: q.id, ch: a.ch });
  note.checks.push({ t: a.t, ok: false, q: q.id });
  if (note.checks.length > 60) note.checks = note.checks.slice(-60);
  const m = { q: q.id, t: a.t, ch: a.ch, conf: a.c };
  const again = note.miss.filter(x => x.q === q.id).length;
  note.miss.push(m); if (note.miss.length > 25) note.miss = note.miss.slice(-25);
  if (again >= 1) L.addTrigger(q.obj, "repeat", { q: q.id });
  // poor objective performance
  const c = E.comp(q.obj);
  if (c && c.n >= 5 && c.score < 0.55 && !note.triggers.some(t => t.kind === "poor" && Date.now() - t.t < 7 * DAY)) L.addTrigger(q.obj, "poor", { score: c.score });
  // confusable terms: wrong option text names one term of a pair whose partner is in the stem/answer
  if (q.type === "mc" && typeof a.ch === "number") {
    const wrongTxt = strip(q.opts[a.ch]).toLowerCase(), rightTxt = (strip(q.opts[q.ans]) + " " + strip(q.q)).toLowerCase();
    L.CONFUSABLES.forEach(([x, y]) => {
      const X = x.toLowerCase(), Y = y.toLowerCase();
      if ((wrongTxt.includes(X) && rightTxt.includes(Y)) || (wrongTxt.includes(Y) && rightTxt.includes(X))) L.addTrigger(q.obj, "confuse_pair", { pair: [x, y] });
    });
  }
}
/* Archive rule: never auto-delete; a note becomes archivable only after
   consistent success over multiple assessments: >= 3 correct answers on the
   objective since the last miss, on >= 2 different days, objective score >= 75%. */
L.noteStatus = (n) => {
  const lastMiss = Math.max(0, ...n.triggers.filter(t => t.kind !== "confused" || true).map(t => t.t));
  const after = E.objAttempts(n.obj).filter(a => a.t > lastMiss);
  const ok = after.filter(a => a.ok), days = new Set(ok.map(a => E.dayKey(a.t)));
  const c = E.comp(n.obj);
  const wrongAfter = after.some(a => !a.ok);
  const ready = ok.length >= 3 && days.size >= 2 && !wrongAfter && c && c.score >= 0.75;
  return { okSince: ok.length, daysSince: days.size, ready, needed: Math.max(0, 3 - ok.length), dayNeed: Math.max(0, 2 - days.size), score: c ? c.score : null, level: c ? c.level : 0 };
};
L.notes = (filter) => Object.values(E.S.lnotes).filter(n => ARE.OBJ[n.obj] && (!filter || filter(n))).sort((a, b) => b.updated - a.updated);
L.activeNotes = () => L.notes(n => !n.archived);

/* Build the 10-part note content from course material + my history */
L.buildNote = (n) => {
  const o = ARE.OBJ[n.obj], d = ARE.DIV[o.div];
  const lessonIds = E.objLessons[n.obj] || [];
  const l = E.LMAP[lessonIds[0]];
  const missQs = [...new Set(n.miss.map(m => m.q))].map(id => E.QMAP[id]).filter(Boolean);
  const misconceptions = [];
  n.miss.slice().reverse().forEach(m => {
    const q = E.QMAP[m.q]; if (!q) return;
    if (misconceptions.some(x => x.q === q.id)) return;
    let chosen = null, why = null;
    if (q.type === "mc" && typeof m.ch === "number" && q.opts) { chosen = strip(q.opts[m.ch]); why = q.why && q.why[m.ch] ? q.why[m.ch] : null; }
    misconceptions.push({ q: q.id, stem: strip(q.q).slice(0, 240), chosen, why, correct: q.type === "mc" ? strip(q.opts[q.ans]) : q.type === "calc" ? q.ans + (q.unit ? " " + q.unit : "") : null, explain: q.explain, conf: m.conf, type: q.type });
  });
  const takeaways = l ? (ARE.TAKEAWAYS[l.id] || l.takeaways || []) : [];
  const pairs = [];
  n.triggers.filter(t => t.kind === "confuse_pair" && t.pair).forEach(t => { const k = t.pair.join("|"); if (!pairs.some(p => p.join("|") === k)) pairs.push(t.pair); });
  if (l) L.pairsFor(l.id).forEach(p => { if (!pairs.some(x => x.join("|") === p.join("|"))) pairs.push(p); });
  const terms = E.glossary.filter(g => lessonIds.includes(g.lesson)).slice(0, 6);
  const reinforce = (E.objQ[n.obj] || []).filter(id => !missQs.some(q => q.id === id)).slice(0, 3);
  const hb = (ARE.HB_OBJ && ARE.HB_OBJ[n.obj]) || [];
  return {
    concept: { obj: n.obj, code: d.code + " " + o.code, title: o.title, div: d.name, sec: o.secName },
    misunderstood: misconceptions.slice(0, 5),
    correct: misconceptions.length ? misconceptions[0].explain : (l ? l.summary : o.title),
    simple: takeaways[0] || (l && l.summary) || "",
    practice: l ? l.why : "",
    exam: l ? l.exam : "",
    remember: takeaways.slice(0, 5), formulas: l ? (l.formulas || []) : [], terms,
    visual: l && l.diagram ? { lesson: l.id, svg: l.diagram } : null,
    pairs: pairs.slice(0, 3).map(([a, b]) => ({ a: L.term(a), b: L.term(b) })).filter(p => p.a && p.b),
    reinforce, quick: l && l.quick ? l.quick.slice(0, 2) : [],
    lesson: l || null,
    sources: { obj: d.code + " " + o.code + " — " + o.title + " (" + ARE.META.guidelines + ")", hb, refs: l ? l.refs : [] }
  };
};

/* ============================================================
   CONFIDENCE CALIBRATION
   ============================================================ */
L.calibration = (filter) => {
  const m = { sureRight: 0, sureWrong: 0, unsureRight: 0, unsureWrong: 0, n: 0 };
  const byObj = {};
  E.S.attempts.forEach(a => {
    if (!a.c) return; const q = E.QMAP[a.q]; if (!q || (filter && !filter(q))) return;
    const sure = a.c >= 2; m.n++;
    if (sure && a.ok) m.sureRight++; else if (sure) m.sureWrong++; else if (a.ok) m.unsureRight++; else m.unsureWrong++;
    const b = byObj[q.obj] = byObj[q.obj] || { sureRight: 0, sureWrong: 0, unsureRight: 0, unsureWrong: 0 };
    if (sure && a.ok) b.sureRight++; else if (sure) b.sureWrong++; else if (a.ok) b.unsureRight++; else b.unsureWrong++;
  });
  m.byObj = byObj;
  m.accuracy = m.n ? (m.sureRight + m.unsureWrong) / m.n : null; // confidence matched outcome
  const cls = (b) => { const sure = b.sureRight + b.sureWrong, uns = b.unsureRight + b.unsureWrong; if (b.sureWrong >= 2 && b.sureWrong >= b.sureRight * 0.5) return "illusion"; if (uns >= 2 && b.unsureRight / uns >= 0.7) return "underconfident"; if (sure >= 2 && b.sureRight / sure >= 0.8) return "confident"; if (b.unsureWrong >= 2) return "needs"; return null; };
  m.groups = { confident: [], underconfident: [], illusion: [], needs: [] };
  Object.entries(byObj).forEach(([k, b]) => { const c = cls(b); if (c) m.groups[c].push(k); });
  return m;
};

/* ============================================================
   PROGRESSIVE DIFFICULTY + INTERLEAVING
   ============================================================ */
L.STAGES = ["Recognition", "Understanding", "Application", "Scenario analysis", "Exam-level"];
L.stage = (obj) => { const c = E.comp(obj); if (!c || !c.n) return 0; return Math.min(4, c.level); };
L.interleave = (n, opts = {}) => {
  // pull from several divisions; weak + due + retention; never two in a row from the same objective or division
  const due = new Set(E.dueIds());
  const latest = {}; E.S.attempts.forEach(a => latest[a.q] = a);
  const pool = E.questions.filter(q => !q.case && q.type !== "order" && q.type !== "match" && (!opts.divs || opts.divs.includes(q.div)));
  const scored = pool.map(q => {
    const c = E.comp(q.obj); let p = Math.random() * 5;
    if (due.has(q.id)) p += 8; if (latest[q.id] && !latest[q.id].ok) p += 7; if (!latest[q.id]) p += 3;
    p += (1 - E.LVV[c.level]) * 5;
    const target = [1, 1, 2, 3, 3][c.level] || 1; p -= Math.abs((q.diff || 1) - target) * 2;
    return { q, p };
  }).sort((a, b) => b.p - a.p);
  const out = [];
  for (const { q } of scored) {
    if (out.length >= n) break;
    const last = out[out.length - 1];
    if (last && (last.div === q.div || last.obj === q.obj)) continue;
    if (out.filter(x => x.obj === q.obj).length >= 2) continue;
    out.push(q);
  }
  for (const { q } of scored) { if (out.length >= n) break; if (!out.includes(q)) out.push(q); }
  return out.map(q => q.id);
};
/* daily challenge: same 5 interleaved questions all day (seeded by date) */
L.dailyChallenge = () => {
  const key = E.dayKey(Date.now()), G = E.S.game;
  if (G.challenge && G.challenge.day === key) return G.challenge;
  let seed = key.split("-").join("") * 1 % 2147483647;
  const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const pool = E.questions.filter(q => !q.case && (q.type === "mc" || q.type === "ms"));
  const ids = []; const divs = ARE.DIVISIONS.map(d => d.id).sort(() => rnd() - 0.5);
  divs.slice(0, 5).forEach(dv => { const p = pool.filter(q => q.div === dv); if (p.length) ids.push(p[Math.floor(rnd() * p.length)].id); });
  G.challenge = { day: key, ids, done: false, score: null };
  return G.challenge;
};

/* ============================================================
   XP, STREAKS, BADGES, PERSONAL BESTS
   XP rewards correct answers (weighted by difficulty), retention of
   items after long intervals, lessons completed, closed knowledge gaps.
   No XP for time spent or for wrong answers.
   ============================================================ */
const day = () => E.dayKey(Date.now());
function dayRec(k) { const D = E.S.game.days; return D[k] = D[k] || { xp: 0, n: 0, ok: 0, fc: 0, plan: 0 }; }
L.addXP = (n, why) => {
  if (!n) return; const G = E.S.game; G.xp = (G.xp || 0) + n; dayRec(day()).xp += n;
  G.log.push({ t: Date.now(), n, why }); if (G.log.length > 200) G.log = G.log.slice(-200);
  const k = day(), best = G.bests.dayXP || 0; if (dayRec(k).xp > best) G.bests.dayXP = dayRec(k).xp;
};
L.level = (xp) => { let lv = 1, need = 200, rem = xp; while (rem >= need) { rem -= need; lv++; need = Math.round(need * 1.18); } return { lv, into: rem, need }; };
function onRecordGame(q, a, prev) {
  const r = dayRec(day()); r.n++; if (a.ok) r.ok++;
  if (!a.ok) return;
  const dw = [0, 10, 14, 18][q.diff || 1] || 10;
  let xp = dw;
  if (prev && prev.iv >= 6 && prev.last && Date.now() - prev.last >= 6 * DAY) { xp += 15; E.S.game.retained = (E.S.game.retained || 0) + 1; if (prev.lapses >= 1) E.S.game.retainedHard = (E.S.game.retainedHard || 0) + 1; }
  if (a.m === "exam" || a.m === "case") xp = Math.round(xp * 1.2);
  L.addXP(xp, "Correct · " + q.id);
}
L.streak = () => {
  const D = E.S.game.days; let s = 0; let t = E.startOfDay(Date.now());
  const active = (k) => { const r = D[k]; return r && (r.n >= 10 || r.plan >= 1 || r.fc >= 15 || (r.n + r.fc >= 15)); };
  if (!active(E.dayKey(t))) t -= DAY; // today not yet earned: streak still counts through yesterday
  while (active(E.dayKey(t))) { s++; t -= DAY; }
  const G = E.S.game; if (s > (G.bests.streak || 0)) G.bests.streak = s;
  return { days: s, today: active(day()), need: (() => { const r = D[day()] || { n: 0, fc: 0 }; return Math.max(0, 10 - r.n); })() };
};
L.week = () => {
  const start = E.startOfDay(Date.now()) - ((new Date().getDay() + 6) % 7) * DAY;
  let xp = 0, n = 0, ok = 0;
  for (let i = 0; i < 7; i++) { const r = E.S.game.days[E.dayKey(start + i * DAY)]; if (r) { xp += r.xp; n += r.n; ok += r.ok; } }
  const goal = E.S.game.weekGoal || 150; // questions per week
  return { xp, n, ok, goal, min: E.minutesSince(start) };
};
L.BADGES = [
  { id: "first-lesson", t: "First lesson complete", d: "Passed a lesson knowledge check.", test: () => Object.values(E.S.lessons).some(l => l.done) },
  ...ARE.DIVISIONS.map(dv => ({ id: "curr-" + dv.id, t: dv.code + " curriculum complete", d: "Completed every lesson in " + dv.name + ".", test: () => { const ls = E.lessons.filter(l => l.div === dv.id); return ls.length && ls.every(l => E.S.lessons[l.id] && E.S.lessons[l.id].done); } })),
  { id: "first-mastery", t: "First mastered objective", d: "Reached Mastered on an objective: 85%+, 8+ answers, 2+ days, a hard item right, no outstanding misses.", test: () => Object.keys(ARE.OBJ).some(k => E.comp(k).level === 4) },
  { id: "mastery-10", t: "Ten objectives mastered", d: "Mastered 10 objectives.", test: () => Object.keys(ARE.OBJ).filter(k => E.comp(k).level === 4).length >= 10 },
  { id: "comeback", t: "Weak spot turned around", d: "Closed a learning note: an objective you struggled with is now consistently right.", test: () => Object.values(E.S.lnotes).some(n => n.archived) },
  { id: "comeback-10", t: "Ten gaps closed", d: "Archived 10 learning notes after proving understanding.", test: () => Object.values(E.S.lnotes).filter(n => n.archived).length >= 10 },
  { id: "full-form", t: "Full practice exam", d: "Finished a full practice exam form.", test: () => E.S.results.some(r => r.form) },
  { id: "form-70", t: "Passing pace", d: "Scored 70% or more on a practice exam form.", test: () => E.S.results.some(r => r.form && r.correct / r.n >= 0.7) },
  { id: "all-six", t: "All six divisions attempted", d: "Finished a practice exam form in every division.", test: () => ARE.DIVISIONS.every(dv => E.S.results.some(r => r.form && r.div === dv.id)) },
  { id: "streak-7", t: "Seven-day streak", d: "Studied meaningfully seven days in a row.", test: () => (E.S.game.bests.streak || 0) >= 7 },
  { id: "streak-30", t: "Thirty-day streak", d: "Thirty consecutive study days.", test: () => (E.S.game.bests.streak || 0) >= 30 },
  { id: "retain-10", t: "Long-term memory", d: "Answered 10 items correctly after a gap of 6+ days.", test: () => (E.S.game.retained || 0) >= 10 },
  { id: "retain-hard", t: "Hard-won retention", d: "Remembered 5 previously missed items after a long gap.", test: () => (E.S.game.retainedHard || 0) >= 5 },
  { id: "calibrated", t: "Well calibrated", d: "Your confidence matched your result on 80%+ of 40 rated answers.", test: () => { const c = L.calibration(); return c.n >= 40 && c.accuracy >= 0.8; } },
  { id: "plan-5", t: "Five study plans", d: "Completed Today's Study Plan on five days.", test: () => Object.values(E.S.game.days).filter(r => r.plan).length >= 5 }
];
L.checkBadges = () => {
  const G = E.S.game, got = [];
  L.BADGES.forEach(b => { if (!G.badges[b.id]) { let ok = false; try { ok = b.test(); } catch (e) {} if (ok) { G.badges[b.id] = Date.now(); got.push(b); L.addXP(100, "Badge · " + b.t); } } });
  if (got.length && L.onCelebrate) got.forEach(b => L.onCelebrate({ kind: "badge", title: b.t, text: b.d }));
  return got;
};
/* competency milestone detection */
let lastLevels = null;
L.snapshotLevels = () => { const o = {}; Object.keys(ARE.OBJ).forEach(k => o[k] = E.comp(k).level); return o; };
function checkMilestones() {
  const now = L.snapshotLevels();
  if (lastLevels) Object.keys(now).forEach(k => {
    if (now[k] > lastLevels[k] && now[k] >= 3 && L.onCelebrate) L.onCelebrate({ kind: "level", title: ARE.OBJ[k].div.toUpperCase() + " " + ARE.OBJ[k].code + " → " + E.LV[now[k]], text: ARE.OBJ[k].title });
  });
  lastLevels = now;
}
L.primeMilestones = () => { lastLevels = L.snapshotLevels(); };

E.hooks.record.push(onRecordNotes, onRecordGame);
E.hooks.finish.push((s) => {
  if (s.form && s.n) { const p = s.correct / s.n, k = "form-" + s.div; if (p > (E.S.game.bests[k] || 0)) { E.S.game.bests[k] = p; L.onCelebrate && L.onCelebrate({ kind: "best", title: "Personal best · " + ARE.DIV[s.div].code, text: Math.round(p * 100) + "% on " + s.title }); } L.addXP(100, "Practice exam completed"); }
  checkMilestones(); L.checkBadges();
});
L.lessonDone = (id) => { L.addXP(50, "Lesson complete · " + id); checkMilestones(); L.checkBadges(); };
L.fcRated = (ok, box) => { dayRec(day()).fc++; if (ok && box >= 3) L.addXP(3, "Flashcard retained"); };

/* ============================================================
   TODAY'S STUDY PLAN
   ============================================================ */
L.buildToday = (minutes) => {
  const plan = { day: day(), min: minutes, created: Date.now(), steps: [], before: L.snapshotLevels(), xp0: E.S.game.xp || 0, n0: E.S.attempts.length };
  const scale = minutes / 30;
  const recs = E.recommend();
  // 1 quick recall: flashcards due (or new) — ~3 min
  plan.steps.push({ k: "recall", t: "Quick recall", d: "Flashcards due today. Answer from memory before flipping.", min: Math.max(2, Math.round(3 * scale)), n: Math.max(5, Math.round(8 * scale)) });
  // 2 new learning: next lesson not done, guided by recommendations / plan
  const planned = E.S.planner.divs && E.S.planner.divs.length ? E.S.planner.divs : ARE.DIVISIONS.map(d => d.id);
  const recLesson = recs.find(r => r.act && r.act.a === "lesson");
  const nextLesson = (recLesson && E.LMAP[recLesson.act.id]) || E.lessons.find(l => planned.includes(l.div) && !(E.S.lessons[l.id] && E.S.lessons[l.id].done)) || E.lessons[0];
  if (minutes >= 30) plan.steps.push({ k: "learn", t: "New learning", d: "Study: " + nextLesson.title, lesson: nextLesson.id, min: Math.round(10 * scale) });
  // 3 deep understanding: lecture/video or try-it on that lesson
  if (minutes >= 45) plan.steps.push({ k: "deep", t: "Deep understanding", d: "Watch the narrated lesson video for " + nextLesson.title + ", then explain it back.", lesson: nextLesson.id, min: Math.round(7 * scale) });
  // 4 practice on the new material
  const pObjs = (nextLesson.obj || []);
  plan.steps.push({ k: "practice", t: "Practice", d: "Questions on " + (minutes >= 30 ? nextLesson.title : "your weakest topics") + ", difficulty matched to your level.", objs: minutes >= 30 ? pObjs : null, n: Math.max(4, Math.round(6 * scale)), min: Math.round(6 * scale) });
  // 5 weak areas: from learning notes / weak objectives
  const notes = L.activeNotes().slice(0, 4).map(n => n.obj);
  let weak;
  if (ARE.R) {
    // misconceptions first, then learning notes, then recall-only objectives (known facts not yet applied)
    const ev = Object.keys(ARE.OBJ).map(k => ARE.R.obj(k));
    const mis = ev.filter(e => e.status === "weak").sort((a, b) => b.misconceptions.length - a.misconceptions.length || (a.acc || 0) - (b.acc || 0)).map(e => e.key);
    const rec = ev.filter(e => e.status === "recall").map(e => e.key);
    weak = Array.from(new Set(mis.concat(notes, rec))).slice(0, 3);
  } else weak = notes.length ? notes : Object.keys(ARE.OBJ).map(k => E.comp(k)).filter(c => c.n >= 3 && c.score < 0.7).sort((a, b) => a.score - b.score).slice(0, 3).map(c => c.key);
  if (weak.length) plan.steps.push({ k: "weak", t: "Weak-area review", d: "Revisit concepts you previously missed: " + weak.map(k => ARE.OBJ[k].div.toUpperCase() + " " + ARE.OBJ[k].code).join(", ") + ".", objs: weak, n: Math.max(3, Math.round(5 * scale)), min: Math.round(5 * scale) });
  // 6 retention check: interleaved, due reviews + older material
  const stale = ARE.R ? Object.keys(ARE.OBJ).filter(k => ARE.R.obj(k).stale).length : 0;
  plan.steps.push({ k: "retain", t: "Retention check", d: "An interleaved mix across divisions, including items due for spaced review" + (stale ? " and " + stale + " topic" + (stale === 1 ? "" : "s") + " not practised for three weeks" : "") + ".", n: Math.max(4, Math.round(6 * scale)), min: Math.round(5 * scale) });
  plan.steps.forEach((s, i) => { s.i = i; s.done = false; });
  E.S.today = plan;
  return plan;
};
L.todayPlan = () => { const p = E.S.today; return p && p.day === day() ? p : null; };
L.completeStep = (i, result) => {
  const p = L.todayPlan(); if (!p || !p.steps[i] || p.steps[i].done) return;
  p.steps[i].done = Date.now(); if (result) p.steps[i].result = result;
  if (p.steps.every(s => s.done)) { p.finished = Date.now(); dayRec(day()).plan = 1; L.addXP(60, "Today's plan completed"); L.checkBadges(); }
  E.save();
};
L.summary = (p) => {
  const after = L.snapshotLevels();
  const changed = Object.keys(after).filter(k => after[k] !== (p.before || {})[k]).map(k => ({ k, from: (p.before || {})[k] || 0, to: after[k] }));
  const at = E.S.attempts.slice(p.n0 || 0);
  const objs = {}; at.forEach(a => { const q = E.QMAP[a.q]; if (!q) return; const o = objs[q.obj] = objs[q.obj] || { n: 0, ok: 0 }; o.n++; if (a.ok) o.ok++; });
  const learned = p.steps.filter(s => s.lesson && s.done).map(s => E.LMAP[s.lesson] && E.LMAP[s.lesson].title).filter(Boolean);
  const improved = changed.filter(c => c.to > c.from);
  const still = Object.entries(objs).filter(([, o]) => o.ok / o.n < 0.7).map(([k]) => k);
  return { n: at.length, ok: at.filter(a => a.ok).length, xp: (E.S.game.xp || 0) - (p.xp0 || 0), learned, improved, down: changed.filter(c => c.to < c.from), still, next: E.recommend()[0] };
};

/* ============================================================
   ANALYTICS
   ============================================================ */
L.analytics = () => {
  const A = E.S.attempts, out = {};
  // retention: accuracy when an item is seen again after >= 6 days
  const lastSeen = {}; let rN = 0, rOk = 0; const reviewAcc = [];
  A.forEach(a => { const p = lastSeen[a.q]; if (p && a.t - p >= 6 * DAY) { rN++; if (a.ok) rOk++; } lastSeen[a.q] = a.t; });
  out.retention = rN ? rOk / rN : null; out.retentionN = rN;
  // by difficulty
  out.byDiff = [1, 2, 3].map(d => { const x = A.filter(a => (a.d || 1) === d); return { d, n: x.length, acc: x.length ? x.filter(a => a.ok).length / x.length : null }; });
  // by division/section
  out.bySec = {};
  A.forEach(a => { const q = E.QMAP[a.q]; if (!q) return; const o = ARE.OBJ[q.obj]; const k = o.div + "|" + o.sec; const b = out.bySec[k] = out.bySec[k] || { div: o.div, sec: o.sec, name: o.secName, n: 0, ok: 0 }; b.n++; if (a.ok) b.ok++; });
  // time by division
  out.timeByDiv = {}; E.S.time.forEach(t => { const k = t.div || "other"; out.timeByDiv[k] = (out.timeByDiv[k] || 0) + t.min; });
  // repeated misconceptions: same question missed 2+ times, or same wrong option chosen twice
  const miss = {}; A.forEach(a => { if (a.ok) return; const k = a.q; const m = miss[k] = miss[k] || { q: a.q, n: 0, opts: {} }; m.n++; if (a.ch !== undefined) m.opts[a.ch] = (m.opts[a.ch] || 0) + 1; });
  out.repeated = Object.values(miss).filter(m => m.n >= 2).sort((a, b) => b.n - a.n).slice(0, 12);
  // improvement: weekly accuracy, last 10 weeks
  const w0 = E.startOfDay(Date.now()) - ((new Date().getDay() + 6) % 7) * DAY;
  out.weekly = []; for (let i = 9; i >= 0; i--) { const a = w0 - i * 7 * DAY, b = a + 7 * DAY; const x = A.filter(t => t.t >= a && t.t < b); out.weekly.push({ a, n: x.length, acc: x.length ? x.filter(t => t.ok).length / x.length : null }); }
  // spaced repetition health
  const cards = Object.values(E.S.srs); const now = Date.now();
  out.srs = { cards: cards.length, due: cards.filter(c => c.due <= now).length, avgEF: cards.length ? cards.reduce((s, c) => s + (c.ef || 2.5), 0) / cards.length : null, mature: cards.filter(c => (c.iv || 0) >= 21).length, lapses: cards.reduce((s, c) => s + (c.lapses || 0), 0) };
  const rv = A.filter(a => a.m === "review"); out.reviewAcc = rv.length ? rv.filter(a => a.ok).length / rv.length : null;
  // competency progression: proficient+ count from daily snapshots
  out.levels = E.S.game.levels || [];
  out.calib = L.calibration();
  return out;
};
/* keep one competency snapshot per day for progression charts */
E.hooks.save.push(() => {
  const G = E.S.game, k = day(); G.levels = G.levels || [];
  const last = G.levels[G.levels.length - 1];
  if (!last || last.d !== k || Date.now() - (L._lvT || 0) > 60000) {
    L._lvT = Date.now();
    const dist = [0, 0, 0, 0, 0]; Object.keys(ARE.OBJ).forEach(o => dist[E.comp(o).level]++);
    if (last && last.d === k) last.dist = dist; else G.levels.push({ d: k, dist });
    if (G.levels.length > 400) G.levels = G.levels.slice(-400);
  }
});

/* ============================================================
   CUSTOM FLASHCARDS (from notes) + SM-2 for cards
   ============================================================ */
L.addCardsFromNote = (n) => {
  const b = L.buildNote(n); let added = 0;
  const push = (front, back) => { const id = "nc:" + n.obj + ":" + front.slice(0, 40); if (E.S.cards.some(c => c.id === id)) return; E.S.cards.push({ id, obj: n.obj, front, back, t: Date.now() }); added++; };
  b.misunderstood.forEach(m => { if (m.correct) push(m.stem.slice(0, 200), "Answer: " + m.correct + ". " + strip(m.explain).slice(0, 400)); });
  b.pairs.forEach(p => push("How does “" + p.a.term + "” differ from “" + p.b.term + "”?", p.a.term + ": " + p.a.def + " — " + p.b.term + ": " + p.b.def));
  b.remember.slice(0, 2).forEach(t => push("Key point · " + b.concept.code + ": " + b.concept.title.slice(0, 80) + " — recall one rule", t));
  return added;
};
})();
