/* ============================================================
   Readiness engine (v20)
   Evidence-based view of what the learner has DEMONSTRATED for each NCARB objective.
   It never predicts a pass probability: NCARB scores the ARE on a scaled cut score that
   is not published per item, so no defensible conversion exists from practice data.
   ============================================================ */
(function () {
const E = ARE.E, DAY = 864e5;
const R = ARE.R = {};

/* ---------- cognitive level of each question ----------
   recall: remember a fact or definition
   apply:  use a rule, method or calculation in a stated situation
   analyze: interpret drawings, data, documents or a case to find the issue
   judge:  choose the best professional action among defensible options */
R.LEVELS = { recall: "Recall", apply: "Application", analyze: "Analysis", judge: "Professional judgment" };
R.LEVEL_W = { recall: 0.6, apply: 1, analyze: 1.15, judge: 1.15 };
ARE.QLEVEL = ARE.QLEVEL || {};
const judgeRx = /\b(should the architect|what should|best (response|course|action|way|first step)|most appropriate|first step|recommend|advise the owner|what is the best|how should|which action|next step)\b/i;
const recallRx = /^(what is (a|an|the)\b|which (term|document|of the following (is|are) (called|defined|known))|define\b|what does\b.*\b(mean|stand for)|.*\b(is called|refers to|is known as)\b)/i;
const sceneRx = /\b(in an? [a-z-]+(,? [a-z-]+)? (climate|region|zone)|for (a|an) [a-z-]+ (building|project|office|school|clinic|library|room|wall|roof|site)|is surrounded|the drawings show|the specifications|when reviewing|reviewing an?|most appropriate|most important|should prioritize|a client|an owner|the owner|the architect|a contractor|the contractor|during (construction|design|bidding)|a firm|your firm|a project|the project|\$\s?\d|\d[\d,]*\s?(sf|ft|in|psf|cfm|%))/i;
R.level = (q) => {
  if (ARE.QLEVEL[q.id]) return ARE.QLEVEL[q.id];
  if (q._lvl) return q._lvl;
  const f = q.fmt || "", stem = String(q.q || "").replace(/<[^>]+>/g, " ");
  let l;
  if (q.case || q.type === "hot" || /Diagram|Hotspot|Detail diagnosis|Bid analysis|Report synthesis|Drag and place|Code interpretation/.test(f)) l = "analyze";
  else if (/Ethics|Risk/.test(f)) l = "judge";
  else if (q.type === "calc" || /Calculation/.test(f)) l = "apply";
  else if (judgeRx.test(stem) && (sceneRx.test(stem) || /Scenario/.test(f))) l = "judge";
  else if (/Scenario/.test(f) || q.type === "order") l = "apply";
  else if (recallRx.test(stem.trim()) || q.type === "match") l = "recall";
  else if (sceneRx.test(stem) || stem.length > 160) l = "apply";
  else l = "recall";
  q._lvl = l; return l;
};

/* ---------- per-objective evidence ---------- */
let memoKey = null, memo = {};
const keyNow = () => E.S.attempts.length + ":" + (E.S.attempts.length ? E.S.attempts[E.S.attempts.length - 1].t : 0) + ":" + Object.keys(E.S.lessons).length + ":" + new Date().toDateString();
const median = (a) => { if (!a.length) return null; const s = a.slice().sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

R.STATUS = {
  none: { t: "No evidence", d: "Not attempted yet.", pts: 0, cls: "st-none" },
  thin: { t: "Insufficient evidence", d: "Too few answers, or all on one day, to judge.", pts: 0.1, cls: "st-thin" },
  weak: { t: "Not yet understood", d: "Recent accuracy is low or misconceptions are unresolved.", pts: 0.15, cls: "st-weak" },
  recall: { t: "Recall only", d: "Facts are known, but application, analysis or judgment questions are not yet answered reliably.", pts: 0.4, cls: "st-recall" },
  applied: { t: "Demonstrated", d: "Answers application-level questions correctly across more than one session.", pts: 0.8, cls: "st-applied" },
  retained: { t: "Demonstrated and retained", d: "Demonstrated, and still answered correctly a week or more later.", pts: 1, cls: "st-retained" }
};

R.obj = (key) => {
  const k = keyNow(); if (k !== memoKey) { memoKey = k; memo = {}; }
  if (memo[key]) return memo[key];
  const now = Date.now();
  const at = E.objAttempts(key).filter(a => E.QMAP[a.q]);
  const c = E.comp(key);
  const r = { key, n: at.length, acc: c.score, lvl: { recall: [0, 0], apply: [0, 0], analyze: [0, 0], judge: [0, 0] }, misconceptions: [], guesses: 0, secs: [], retest: [0, 0], last: c.last, days: c.days, lessonDone: c.lessonDone, status: "none", why: [] };
  const byQ = {};
  at.forEach(a => {
    const q = E.QMAP[a.q], L = R.level(q);
    r.lvl[L][0]++; if (a.ok) r.lvl[L][1]++;
    if (a.c === 1 && a.ok) r.guesses++;
    if (a.s) r.secs.push(a.s);
    (byQ[a.q] = byQ[a.q] || []).push(a);
  });
  // misconceptions: confident and wrong, or the same wrong choice picked twice, and not since answered correctly
  Object.entries(byQ).forEach(([qid, list]) => {
    list.sort((x, y) => x.t - y.t);
    const lastA = list[list.length - 1];
    const wrongCh = {}; let confWrong = false;
    list.forEach(a => { if (!a.ok) { if (a.ch !== undefined) wrongCh[a.ch] = (wrongCh[a.ch] || 0) + 1; if (a.c === 3) confWrong = true; } });
    const repeated = Object.entries(wrongCh).find(([, n]) => n >= 2);
    if ((confWrong || repeated) && !lastA.ok) {
      const q = E.QMAP[qid]; const ch = repeated ? +repeated[0] : lastA.ch;
      r.misconceptions.push({ q: qid, stem: String(q.q).replace(/<[^>]+>/g, " ").slice(0, 160), chosen: q.opts && ch !== undefined && ch >= 0 ? String(q.opts[ch]).replace(/<[^>]+>/g, "") : null, confident: confWrong, repeated: !!repeated });
    }
    // retention: a correct answer followed by another attempt 7+ days later
    for (let i = 0; i < list.length; i++) {
      if (!list[i].ok) continue;
      const later = list.slice(i + 1).find(b => b.t - list[i].t >= 7 * DAY);
      if (later) { r.retest[0]++; if (later.ok) r.retest[1]++; break; }
    }
  });
  r.medSec = median(r.secs);
  const hi = ["apply", "analyze", "judge"].reduce((s, L) => [s[0] + r.lvl[L][0], s[1] + r.lvl[L][1]], [0, 0]);
  r.hi = hi; r.hiAcc = hi[0] ? hi[1] / hi[0] : null;
  r.loAcc = r.lvl.recall[0] ? r.lvl.recall[1] / r.lvl.recall[0] : null;
  r.staleDays = r.last ? Math.floor((now - r.last) / DAY) : null;
  // status
  if (!r.n) r.status = "none";
  else if (r.n < 4 || r.days < 2) { r.status = "thin"; r.why.push(r.n < 4 ? `${r.n} answer${r.n === 1 ? "" : "s"} so far; at least 4 needed` : "all answers on one day"); }
  else if ((r.acc !== null && r.acc < 0.6) || r.misconceptions.length >= 2) { r.status = "weak"; if (r.acc < 0.6) r.why.push(`recent weighted accuracy ${Math.round(r.acc * 100)}%`); if (r.misconceptions.length) r.why.push(`${r.misconceptions.length} unresolved misconception${r.misconceptions.length === 1 ? "" : "s"}`); }
  else if (hi[1] < 2 || (r.hiAcc !== null && r.hiAcc < 0.65)) { r.status = "recall"; r.why.push(hi[0] ? `application-level accuracy ${Math.round((r.hiAcc || 0) * 100)}% on ${hi[0]}` : "no application-level answers yet"); }
  else if (r.retest[0] && r.retest[1] / r.retest[0] >= 0.75 && !r.misconceptions.length) r.status = "retained";
  else { r.status = "applied"; if (!r.retest[0]) r.why.push("not yet re-tested after a week"); }
  if (r.staleDays !== null && r.staleDays > 21 && (r.status === "applied" || r.status === "retained" || r.status === "recall")) r.stale = true;
  if (r.guesses >= 2) r.why.push(`${r.guesses} correct answers marked as guesses`);
  memo[key] = r; return r;
};

/* ---------- division report ---------- */
R.div = (divId) => {
  const d = ARE.DIV[divId];
  const objs = d.objectives.map(o => ({ o, e: R.obj(o.key) }));
  let w = 0, ev = 0; const dist = {}; Object.keys(R.STATUS).forEach(s => dist[s] = 0);
  objs.forEach(({ o, e }) => { w += o.w; ev += o.w * R.STATUS[e.status].pts; dist[e.status]++; });
  const lessons = E.lessons.filter(l => l.div === divId);
  const done = lessons.filter(l => E.S.lessons[l.id] && E.S.lessons[l.id].done).length;
  const bank = E.questions.filter(q => q.div === divId);
  const seen = new Set(E.S.attempts.filter(a => E.QMAP[a.q] && E.QMAP[a.q].div === divId).map(a => a.q));
  const exams = E.S.results.filter(r => r.div === divId && (r.mode === "exam" || r.mode === "official") && r.n >= 20).sort((a, b) => b.t - a.t);
  const secs = [].concat(...objs.map(x => x.e.secs));
  const lv = { recall: [0, 0], apply: [0, 0], analyze: [0, 0], judge: [0, 0] };
  objs.forEach(({ e }) => Object.keys(lv).forEach(L => { lv[L][0] += e.lvl[L][0]; lv[L][1] += e.lvl[L][1]; }));
  return {
    d, objs, dist,
    evidence: w ? ev / w : 0,
    progress: { lessons: [done, lessons.length], questions: [seen.size, bank.length], objectivesPracticed: objs.filter(x => x.e.n).length },
    exams, lastExam: exams[0] || null,
    medSec: median(secs), lv,
    gaps: objs.filter(x => ["none", "thin", "weak", "recall"].includes(x.e.status)).sort((a, b) => b.o.w - a.o.w || R.STATUS[a.e.status].pts - R.STATUS[b.e.status].pts),
    misconceptions: [].concat(...objs.map(x => x.e.misconceptions.map(m => Object.assign({ obj: x.o.key }, m)))),
    stale: objs.filter(x => x.e.stale)
  };
};
R.evidenceLabel = (v) => v < 0.25 ? "Little shown yet" : v < 0.5 ? "Partly shown" : v < 0.75 ? "Mostly shown" : "Broadly shown";

/* ---------- daily trend snapshots (one per division per day, kept 180 days) ---------- */
R.snapshot = () => {
  const day = E.dayKey(Date.now()); E.S.rtrend = E.S.rtrend || {}; let changed = false;
  ARE.DIVISIONS.forEach(d => {
    const rep = R.div(d.id); const arr = E.S.rtrend[d.id] = E.S.rtrend[d.id] || [];
    const v = Math.round(rep.evidence * 1000) / 1000, p = rep.progress.lessons[1] ? Math.round(rep.progress.lessons[0] / rep.progress.lessons[1] * 1000) / 1000 : 0;
    const last = arr[arr.length - 1];
    if (!last || last[0] !== day) { if (E.S.attempts.length || p) { arr.push([day, v, p]); changed = true; } }
    else if (last[1] !== v || last[2] !== p) { last[1] = v; last[2] = p; changed = true; }
    if (arr.length > 180) arr.splice(0, arr.length - 180);
  });
  if (changed) setTimeout(() => E.save(), 0);
};

/* ---------- recommendations for one objective ---------- */
R.recommend = (key) => {
  const e = R.obj(key), lessons = E.objLessons[key] || [];
  const out = [];
  const lid = lessons[0];
  if (e.status === "none") out.push(lid ? { t: "Study the lesson", href: "#lesson-" + lid } : null, { t: "Answer a first set of questions", act: "quiz" });
  else if (e.status === "thin") out.push({ t: "Answer more questions on another day", act: "quiz" });
  else if (e.status === "weak") out.push(lid ? { t: "Re-study the lesson", href: "#lesson-" + lid } : null, e.misconceptions.length && E.S.lnotes[key] ? { t: "Review your misconceptions", href: "#note-" + key } : null, { t: "Targeted quiz", act: "quiz" });
  else if (e.status === "recall") out.push({ t: "Practise application questions", act: "quiz" }, lid ? { t: "Work the lesson's example", href: "#lesson-" + lid } : null);
  else if (e.stale || e.status === "applied") out.push({ t: e.stale ? "Retention check (it's been a while)" : "Retention check after a week", act: "quiz" });
  return out.filter(Boolean);
};
})();
