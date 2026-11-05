/* ============================================================
   ENGINE: state, persistence, indexes, competency, adaptive
   recommendations, spaced repetition, planner, grading
   ============================================================ */
(function () {
const E = ARE.E = {};
const DAY = 86400000;
const LS_KEY = "are-academy-v1", LS_SESSION = "are-academy-session";
E.LV = ["Not started", "Introduced", "Developing", "Proficient", "Mastered"];
E.LVV = [0, 0.15, 0.4, 0.75, 1];
E.SRS_DAYS = [0, 1, 3, 7, 16, 35];

/* ---------- state ---------- */
E.blank = () => ({
  v: 1, updatedAt: 0, created: Date.now(),
  lessons: {}, attempts: [], srs: {}, flags: {}, bookmarks: [], notes: {}, hbLoc: {},
  results: [], time: [], packs: { lessons: [], questions: [], glossary: [] },
  planner: { examDate: "", divs: [], hours: 8, goals: [], sessions: [] },
  weakFlags: {}, touch: {}, fc: {},
  lnotes: {}, game: { xp: 0, days: {}, badges: {}, bests: {}, log: [] }, cards: [], videos: {}, ailog: {}, today: null, pod: {},
  ui: {}
});
E.S = E.blank();

function sanitize(s) {
  const b = E.blank();
  if (!s || typeof s !== "object") return b;
  for (const k of Object.keys(b)) if (s[k] !== undefined && typeof s[k] === typeof b[k]) b[k] = s[k];
  b.planner = Object.assign(E.blank().planner, s.planner || {});
  b.packs = Object.assign(E.blank().packs, s.packs || {});
  if (!Array.isArray(b.attempts)) b.attempts = [];
  b.game = Object.assign(E.blank().game, s.game || {});
  if (!Array.isArray(b.cards)) b.cards = [];
  return b;
}
E.sanitize = sanitize;

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

E.loadLocal = () => {
  const raw = lsGet(LS_KEY);
  if (raw) { try { E.S = sanitize(JSON.parse(raw)); } catch (e) { E.S = E.blank(); } }
  E.rebuild();
};
/* IndexedDB is the primary store; localStorage is a fast mirror for first paint. */
E.loadDurable = async () => {
  const St = ARE.Store; if (!St) return false;
  try {
    const rec = await St.get("state");
    St.status.idb = true;
    if (rec && rec.json) {
      const S = sanitize(JSON.parse(rec.json));
      if ((S.updatedAt || 0) > (E.S.updatedAt || 0)) { E.S = S; lsSet(LS_KEY, rec.json); E.rebuild(); return true; }
    } else if (E.S.updatedAt) { await St.put("state", { json: JSON.stringify(E.S), updatedAt: E.S.updatedAt }); }
    const ses = await St.get("session");
    if (ses && !lsGet(LS_SESSION)) lsSet(LS_SESSION, ses);
  } catch (e) { St.status.idb = false; }
  return false;
};

/* ---------- account sync via the db capability (private per-user docs) ---------- */
E.sync = { status: "local", uid: null, db: null };
let saveTimer = null, writing = Promise.resolve();
let idbTimer = null;
E.saveError = null;
E.save = (immediate) => {
  E.S.updatedAt = Date.now();
  E._dirty = true;
  const json = JSON.stringify(E.S);
  const okLS = lsSet(LS_KEY, json);
  clearTimeout(idbTimer);
  idbTimer = setTimeout(() => saveDurable(json, okLS), immediate ? 0 : 250);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushRemote, immediate ? 50 : 2000);
  E.hooks.save.forEach(f => { try { f(); } catch (e) {} });
};
E.hooks = { save: [], record: [], finish: [] };
function saveDurable(json, okLS) {
  const St = ARE.Store;
  if (!St) { E.saveError = okLS ? null : "Your browser refused to save. Export a backup now."; E.onSaveState && E.onSaveState(); return; }
  json = JSON.stringify(E.S);
  St.put("state", { json, updatedAt: E.S.updatedAt }).then(async () => {
    St.status.idb = true; St.status.lastSave = Date.now(); E.saveError = null;
    const today = E.dayKey(Date.now());
    if (E.S.ui.lastSnap !== today && E.S.attempts.length + Object.keys(E.S.lessons).length > 0) {
      E.S.ui.lastSnap = today;
      try { await St.addSnapshot(json); } catch (e) {}
    }
    E.onSaveState && E.onSaveState();
  }).catch(err => {
    St.status.idb = false;
    E.saveError = okLS ? null : "Progress could not be saved on this device (" + (err && err.message || "storage error") + "). Export a backup now.";
    E.onSaveState && E.onSaveState();
  });
}
E.flush = () => { clearTimeout(idbTimer); saveDurable(JSON.stringify(E.S), true); };
window.addEventListener("pagehide", () => { if (E._dirty) E.flush(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && E._dirty) E.flush(); });
function compactAttempts(a) { return a.slice(-3000).map(x => [x.q, x.ok ? 1 : 0, x.d || 1, x.t, x.m || "q", x.c || 0, x.ch === undefined ? -1 : x.ch]); }
function expandAttempts(a) { return (a || []).map(x => { const o = { q: x[0], ok: !!x[1], d: x[2], t: x[3], m: x[4] }; if (x[5]) o.c = x[5]; if (x[6] !== undefined && x[6] !== -1) o.ch = x[6]; return o; }); }
const DOCS = ["core", "attempts", "notes", "packs", "learn", "media"];
function splitDocs(S) {
  const core = Object.assign({}, S); ["attempts", "notes", "packs", "lnotes", "game", "cards", "videos", "ailog"].forEach(k => delete core[k]);
  return {
    learn: { json: JSON.stringify({ lnotes: S.lnotes, game: S.game, cards: S.cards }), updatedAt: S.updatedAt },
    media: { json: JSON.stringify({ videos: S.videos, ailog: S.ailog }), updatedAt: S.updatedAt },
    core: { json: JSON.stringify(core), updatedAt: S.updatedAt },
    attempts: { json: JSON.stringify(compactAttempts(S.attempts)), updatedAt: S.updatedAt },
    notes: { json: JSON.stringify(S.notes), updatedAt: S.updatedAt },
    packs: { json: JSON.stringify(S.packs), updatedAt: S.updatedAt }
  };
}
function pushRemote() {
  const { db, uid } = E.sync;
  if (!db || !uid) return;
  const docs = splitDocs(E.S);
  writing = writing.then(async () => {
    try {
      for (const [k, v] of Object.entries(docs)) {
        if (v.json.length > 240000) continue; // stays local; export covers it
        await db.doc("data/users/" + uid + "/" + k).set(v);
      }
      E.sync.status = "synced"; E._dirty = false; E.onSync && E.onSync();
    } catch (e) { E.sync.status = "local"; E.onSync && E.onSync(); }
  });
}
E.connect = async () => {
  if (!window.claude || !window.claude.use) return;
  let timer;
  try {
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) return;
    const uid = await user.id();
    if (!uid) return;
    E.sync.db = db; E.sync.uid = uid;
    const timeout = new Promise(r => { timer = setTimeout(() => r("timeout"), 10000); });
    const read = Promise.all(DOCS.map(k => db.doc("data/users/" + uid + "/" + k).get()));
    const res = await Promise.race([read, timeout]);
    clearTimeout(timer);
    if (res === "timeout") { E.sync.status = "local"; E.onSync && E.onSync(); return; }
    const [c, a, n, p, ln, md] = res;
    if (c.exists) {
      const remote = c.data();
      if ((remote.updatedAt || 0) > (E.S.updatedAt || 0)) {
        const S = JSON.parse(remote.json);
        S.attempts = a.exists ? expandAttempts(JSON.parse(a.data().json)) : E.S.attempts;
        S.notes = n.exists ? JSON.parse(n.data().json) : E.S.notes;
        S.packs = p.exists ? JSON.parse(p.data().json) : E.S.packs;
        if (ln && ln.exists) Object.assign(S, JSON.parse(ln.data().json));
        if (md && md.exists) Object.assign(S, JSON.parse(md.data().json));
        E.S = sanitize(S); lsSet(LS_KEY, JSON.stringify(E.S)); saveDurable(JSON.stringify(E.S), true); E.rebuild();
        E.sync.status = "synced"; E.onSync && E.onSync(true); return;
      }
    }
    E.sync.status = "synced"; E.onSync && E.onSync();
    if ((E.S.updatedAt || 0) > ((c.exists && c.data().updatedAt) || 0)) pushRemote();
  } catch (e) { clearTimeout(timer); E.sync.status = "local"; E.onSync && E.onSync(); }
};

/* ---------- session persistence ---------- */
E.saveSession = (s) => {
  if (s) { const j = JSON.stringify(s); lsSet(LS_SESSION, j); ARE.Store && ARE.Store.put("session", j).catch(() => {}); }
  else { lsDel(LS_SESSION); ARE.Store && ARE.Store.del("session").catch(() => {}); }
};
E.loadSession = () => { try { return JSON.parse(lsGet(LS_SESSION) || "null"); } catch (e) { return null; } };

/* ---------- indexes ---------- */
E.rebuild = () => {
  const P = E.S.packs || {};
  E.lessons = ARE.LESSONS.concat((P.lessons || []).filter(l => l && l.id && ARE.DIV[l.div]));
  E.LMAP = {}; E.lessons.forEach(l => E.LMAP[l.id] = l);
  E.questions = ARE.Q.concat((P.questions || []).filter(q => q && q.id && ARE.OBJ[q.obj]));
  E.QMAP = {};
  E.questions.forEach(q => { q.div = q.div || q.obj.split("-")[0]; E.QMAP[q.id] = q; });
  ARE.CASES.forEach(c => c.questions.forEach(q => { q.case = c.id; q.div = q.obj.split("-")[0]; E.QMAP[q.id] = q; }));
  const S0 = E.S;
  [S0.attempts.map(a => a.q), Object.keys(S0.srs || {}), Object.keys(S0.flags || {})].forEach(list => list.forEach(id => E.ensureQ(id)));
  E.glossary = ARE.GLOSSARY.concat((P.glossary || []).filter(g => g && g.term));
  E.objLessons = {}; E.objQ = {}; E.objQAll = {};
  Object.keys(ARE.OBJ).forEach(k => { E.objLessons[k] = []; E.objQ[k] = []; E.objQAll[k] = []; });
  E.lessons.forEach(l => (l.obj || []).forEach(k => E.objLessons[k] && E.objLessons[k].push(l.id)));
  Object.values(E.QMAP).forEach(q => { if (!E.objQAll[q.obj]) return; E.objQAll[q.obj].push(q.id); if (!q.case) E.objQ[q.obj].push(q.id); });
  E._memo = null;
};

E.ensureQ = (id) => {
  if (!id || E.QMAP[id]) return E.QMAP[id];
  const q = ARE.genQ && ARE.genQ(id);
  if (q) E.QMAP[id] = q;
  return q;
};
E.genIds = (filter, n, seed) => { const ids = ARE.genFor(filter, n, seed); ids.forEach(E.ensureQ); return ids; };

/* ---------- reinforcement touchpoints ---------- */
E.touch = (objs, n = 1) => { E.S.touch = E.S.touch || {}; (objs || []).forEach(k => { if (ARE.OBJ[k]) E.S.touch[k] = (E.S.touch[k] || 0) + n; }); E.save(); };
E.reinforce = (k) => (E.objAttempts(k).length) + ((E.S.touch || {})[k] || 0) + ((E.objLessons[k] || []).some(id => E.S.lessons[id] && E.S.lessons[id].done) ? 1 : 0);
E.REINFORCE_TARGET = 12;

/* ---------- exam forms ---------- */
function seeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function sshuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
E.FORMS = { A: 1101, B: 2202, C: 3303 };
E.buildForm = (divId, form) => {
  const d = ARE.DIV[divId];
  const seed = form === "R" ? (Date.now() % 1e9) : (E.FORMS[form] + d.n * 17);
  const r = seeded(seed);
  const drill = (q) => q.type === "order" || q.type === "match";
  const cases = ARE.CASES.filter(c => c.divs.includes(divId));
  const caseList = form === "R" ? sshuffle(cases, r) : cases.filter((c, i) => i % 3 === ("ABC".indexOf(form) % 3) || cases.length <= 2);
  const caseIds = []; caseList.slice(0, 2).forEach(c => c.questions.filter(q => !drill(q)).forEach(q => caseIds.push(q.id)));
  const target = Math.max(10, d.items - caseIds.length);
  const msum = d.sections.reduce((a, x) => a + x.mid, 0);
  let ids = [];
  d.sections.forEach(sec => {
    const want = Math.round(target * sec.mid / msum);
    const keys = sec.obj.map(([c]) => divId + "-" + c);
    const bank = sshuffle(E.questions.filter(q => !q.case && !drill(q) && keys.includes(q.obj)).map(q => q.id), r);
    let take = bank.slice(0, want);
    if (take.length < want) {
      const perObj = {};
      const gens = Object.keys(ARE.GEN).filter(k => keys.includes(ARE.GEN[k].obj));
      let i = 0;
      while (take.length < want && gens.length && i < want * 3) {
        const g = gens[i % gens.length]; const o = ARE.GEN[g].obj;
        if ((perObj[o] || 0) < 4) { const id = "g-" + g + "-" + Math.floor(r() * 2147483646); E.ensureQ(id); take.push(id); perObj[o] = (perObj[o] || 0) + 1; }
        i++;
      }
    }
    ids = ids.concat(take);
  });
  ids = sshuffle(ids, r);
  return { ids: ids.concat(caseIds), discrete: ids.length, cases: caseList.slice(0, 2).map(c => c.id), real: d.items };
};
E.dayKey = (t) => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
E.startOfDay = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };

/* ---------- competency ---------- */
function memo() {
  const S = E.S, key = S.attempts.length + ":" + (S.attempts.length ? S.attempts[S.attempts.length - 1].t : 0) + ":" + Object.keys(S.lessons).length + ":" + S.updatedAt;
  if (E._memo && E._memo.key === key) return E._memo;
  const byObj = {};
  S.attempts.forEach(a => { const q = E.QMAP[a.q]; if (!q) return; (byObj[q.obj] = byObj[q.obj] || []).push(a); });
  const comp = {};
  Object.keys(ARE.OBJ).forEach(k => comp[k] = computeObj(k, byObj[k] || []));
  E._memo = { key, byObj, comp };
  return E._memo;
}
function computeObj(key, at) {
  const now = Date.now();
  const lessons = E.objLessons[key] || [];
  const lessonDone = lessons.some(id => E.S.lessons[id] && E.S.lessons[id].done);
  const viewed = lessons.some(id => E.S.lessons[id]);
  const qcount = (E.objQAll[key] || []).length;
  const r = { key, n: at.length, score: null, days: 0, last: 0, outstanding: 0, lessonDone, hasLesson: lessons.length > 0, qcount, level: 0, hardOk: false };
  if (!at.length) { r.level = (lessonDone || viewed) ? 1 : 0; return r; }
  const latest = {};
  at.forEach(a => { if (!latest[a.q] || a.t >= latest[a.q].t) latest[a.q] = a; });
  let wsum = 0, wok = 0; const days = new Set();
  const maxD = Math.max(...(E.objQAll[key] || []).map(id => (E.QMAP[id] && E.QMAP[id].diff) || 1), 1);
  at.forEach(a => {
    const dw = [1, 1, 1.3, 1.6][a.d || 1] || 1;
    const age = (now - a.t) / DAY;
    const w = dw * Math.pow(0.5, age / 45) * (latest[a.q] === a ? 1 : 0.6);
    wsum += w; if (a.ok) wok += w;
    days.add(E.dayKey(a.t)); r.last = Math.max(r.last, a.t);
    if (a.ok && (a.d || 1) >= Math.min(3, maxD)) r.hardOk = true;
  });
  r.score = wsum ? wok / wsum : 0;
  r.days = days.size;
  r.outstanding = Object.values(latest).filter(a => !a.ok).length;
  const n = at.length;
  if (n < 3) r.level = 1;
  else if (n < 5 || r.score < 0.6) r.level = 2;
  else if (r.score >= 0.85 && n >= 8 && r.days >= 2 && r.hardOk && r.outstanding === 0 && (lessonDone || !r.hasLesson)) r.level = 4;
  else if (r.score >= 0.7) r.level = 3;
  else r.level = 2;
  return r;
}
E.comp = (key) => memo().comp[key];
E.objAttempts = (key) => memo().byObj[key] || [];
E.divStats = (divId) => {
  const d = ARE.DIV[divId]; let w = 0, v = 0; const dist = [0, 0, 0, 0, 0];
  let n = 0, ok = 0;
  d.objectives.forEach(o => { const c = E.comp(o.key); w += o.w; v += o.w * E.LVV[c.level]; dist[c.level]++; });
  E.S.attempts.forEach(a => { const q = E.QMAP[a.q]; if (q && q.div === divId) { n++; if (a.ok) ok++; } });
  const coverage = w ? v / w : 0;
  const recent = E.S.results.filter(r => r.div === divId && (r.mode === "exam" || r.mode === "case" || r.mode === "official") && Date.now() - r.t < 30 * DAY);
  const examPct = recent.length ? recent.reduce((s, r) => s + r.correct / r.n, 0) / recent.length : null;
  const readiness = examPct === null ? coverage : 0.65 * coverage + 0.35 * examPct;
  return { coverage, examPct, readiness, dist, n, ok, acc: n ? ok / n : null };
};
E.readyLabel = (r) => r < 0.4 ? "Early" : r < 0.65 ? "Building" : r < 0.8 ? "Approaching" : "Exam-ready";
E.overall = () => {
  let tot = 0, wsum = 0;
  ARE.DIVISIONS.forEach(d => { const s = E.divStats(d.id); tot += s.readiness; wsum += 1; });
  const n = E.S.attempts.length, ok = E.S.attempts.filter(a => a.ok).length;
  return { readiness: tot / wsum, n, ok, acc: n ? ok / n : null };
};

/* ---------- spaced repetition ---------- */
E.record = (qid, ok, mode, extra) => {
  const q = E.QMAP[qid]; if (!q) return;
  const t = Date.now();
  const prev = E.S.srs[qid] ? Object.assign({}, E.S.srs[qid]) : null;
  const a = { q: qid, ok, d: q.diff || 1, t, m: mode };
  if (extra && extra.conf) a.c = extra.conf;
  if (extra && extra.chosen !== undefined && extra.chosen !== null && typeof extra.chosen === "number") a.ch = extra.chosen;
  E.S.attempts.push(a);
  if (E.S.attempts.length > 6000) E.S.attempts = E.S.attempts.slice(-6000);
  const s = E.sm2(E.S.srs[qid], E.quality(ok, a.c), t);
  E.S.srs[qid] = s;
  E.hooks.record.forEach(f => { try { f(q, a, prev, extra || {}); } catch (e) { console.warn(e); } });
};
/* ---------- SM-2 (SuperMemo 2) scheduling ----------
   quality 0-5: wrong & sure = 0, wrong = 1, wrong & guessing = 2,
   right & guessing = 3, right = 4, right & sure = 5 */
E.quality = (ok, conf) => ok ? (conf === 1 ? 3 : conf === 3 ? 5 : 4) : (conf === 3 ? 0 : conf === 1 ? 2 : 1);
E.sm2 = (card, quality, t) => {
  t = t || Date.now();
  const c = card ? Object.assign({}, card) : {};
  if (c.ef === undefined) { c.ef = 2.5; c.n = c.box ? Math.max(0, c.box - 1) : 0; c.iv = c.box ? E.SRS_DAYS[c.box] || 0 : 0; }
  if (quality < 3) { c.n = 0; c.iv = 1; c.lapses = (c.lapses || 0) + 1; }
  else {
    c.n = (c.n || 0) + 1;
    c.iv = c.n === 1 ? 1 : c.n === 2 ? 6 : Math.round((c.iv || 6) * c.ef);
    if (c.lapses >= 3 && c.iv > 10) c.iv = Math.round(c.iv * 0.7); // leech: extra reinforcement
  }
  c.ef = Math.max(1.3, c.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  c.iv = Math.min(c.iv, 180);
  c.due = E.startOfDay(t) + c.iv * DAY + (quality < 3 ? 0 : 0);
  if (quality < 3) c.due = t + 10 * 60000; // relearn later today
  c.last = t; c.q = quality;
  c.box = Math.min(5, c.n <= 0 ? 1 : c.iv <= 1 ? 2 : c.iv <= 6 ? 3 : c.iv <= 20 ? 4 : 5);
  return c;
};
E.dueIds = (filter) => {
  const now = Date.now();
  return Object.entries(E.S.srs).filter(([id, s]) => s.due <= now && E.QMAP[id] && !E.QMAP[id].case && (!filter || filter(E.QMAP[id])))
    .sort((a, b) => a[1].box - b[1].box).map(([id]) => id);
};
E.missedIds = (filter) => {
  const latest = {};
  E.S.attempts.forEach(a => latest[a.q] = a);
  return Object.values(latest).filter(a => !a.ok && E.QMAP[a.q] && !E.QMAP[a.q].case && (!filter || filter(E.QMAP[a.q]))).map(a => a.q);
};

/* ---------- adaptive selection ---------- */
E.pick = ({ div, obj, objs, n = 10, ids, adaptive = true }) => {
  let pool = ids ? ids.slice() : E.questions.filter(q => !q.case && (!div || q.div === div) && (!obj || q.obj === obj) && (!objs || objs.includes(q.obj))).map(q => q.id);
  if (!adaptive) return shuffle(pool).slice(0, n);
  const latest = {}; E.S.attempts.forEach(a => latest[a.q] = a);
  const now = Date.now();
  const scored = pool.map(id => {
    const q = E.QMAP[id], c = E.comp(q.obj), s = E.S.srs[id];
    const target = c.level <= 2 ? 1.5 : 2.6;
    let p = 10 - Math.abs((q.diff || 1) - target) * 3;
    if (!latest[id]) p += 6;
    else if (!latest[id].ok) p += 9;
    if (s && s.due <= now) p += 7;
    if (s && s.due > now) p -= 4;
    p += (1 - E.LVV[c.level]) * 6 + Math.random() * 4;
    return [id, p];
  });
  return scored.sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
};
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
E.shuffle = shuffle;

/* ---------- Next Best Study Session ---------- */
E.recommend = () => {
  const P = E.S.planner, planned = P.divs && P.divs.length ? P.divs : null;
  const now = Date.now();
  const cands = [];
  const due = E.dueIds();
  if (due.length >= 3) cands.push({ pri: 85 + Math.min(due.length, 20), kind: "review", title: `Review ${due.length} questions due today`, why: "Spaced repetition: these items are scheduled now, while recall is still effortful enough to strengthen memory.", act: { a: "review-due" } });
  Object.entries(E.S.weakFlags || {}).forEach(([k, t]) => {
    if (!ARE.OBJ[k] || now - t > 30 * DAY) return;
    if (planned && !planned.includes(ARE.OBJ[k].div)) return;
    const c = E.comp(k); if (c.level >= 4) return;
    const lesson = (E.objLessons[k] || [])[0];
    const o = ARE.OBJ[k], d = ARE.DIV[o.div];
    cands.push({ pri: 78 + o.w, kind: "flag", obj: k, title: c.qcount ? `Targeted quiz: ${d.code} ${o.code}` : lesson ? `Review “${E.LMAP[lesson].title}”` : `Read the Handbook for ${d.code} ${o.code}`, why: `You flagged ${d.code} ${o.code} after an NCARB practice exam. Close the gap while the misses are fresh.`, act: c.qcount ? { a: "quiz", obj: k } : lesson ? { a: "lesson", id: lesson } : { a: "hbobj", obj: k } });
  });
  const daysToExam = P.examDate ? Math.ceil((new Date(P.examDate + "T00:00") - now) / DAY) : null;
  ARE.DIVISIONS.forEach(d => {
    if (planned && !planned.includes(d.id)) return;
    const boost = planned ? 1.25 : 1;
    let allProf = true;
    d.objectives.forEach(o => {
      const c = E.comp(o.key), lessons = E.objLessons[o.key];
      const nextLesson = lessons.find(id => !(E.S.lessons[id] && E.S.lessons[id].done));
      if (c.level < 3) allProf = false;
      const base = o.w * 2 * boost;
      if (c.level === 2 && c.n >= 3 && c.score < 0.6) {
        if (nextLesson) cands.push({ pri: (60 + 25 * (1 - c.score) + base), kind: "weak-lesson", obj: o.key, title: `Revisit “${E.LMAP[nextLesson].title}”`, why: `You are scoring ${Math.round(c.score * 100)}% on ${d.code} ${o.code}. Rereading the lesson before more questions fixes the concept, not just the answer.`, act: { a: "lesson", id: nextLesson } });
        else if (c.qcount) cands.push({ pri: (58 + 25 * (1 - c.score) + base), kind: "weak-quiz", obj: o.key, title: `Targeted quiz: ${d.code} ${o.code}`, why: `Weakest area at ${Math.round(c.score * 100)}%. Questions you missed come back first.`, act: { a: "quiz", obj: o.key } });
      } else if (c.level <= 1 && nextLesson && !(E.S.lessons[nextLesson] && E.S.lessons[nextLesson].done)) {
        cands.push({ pri: 45 + base * 1.4, kind: "new-lesson", obj: o.key, title: `Start “${E.LMAP[nextLesson].title}”`, why: `${d.code} ${o.code} has not been studied yet. Section ${o.sec} carries ${ARE.DIV[d.id].sections[o.sec - 1].w.join("–")}% of the division.`, act: { a: "lesson", id: nextLesson } });
      } else if (c.level <= 2 && c.qcount) {
        cands.push({ pri: 50 + base, kind: "practice", obj: o.key, title: `Practice quiz: ${d.code} ${o.code}`, why: `${E.LV[c.level]} with ${c.n} answers so far. A few more spaced attempts build a reliable score.`, act: { a: "quiz", obj: o.key } });
      } else if (c.level === 3 && now - c.last > 21 * DAY) {
        cands.push({ pri: 42 + base, kind: "refresh", obj: o.key, title: `Refresh ${d.code} ${o.code}`, why: `Not practiced in ${Math.round((now - c.last) / DAY)} days. A short refresh prevents decay.`, act: { a: "quiz", obj: o.key } });
      } else if (c.level === 3) {
        cands.push({ pri: 30 + base, kind: "push", obj: o.key, title: `Push ${d.code} ${o.code} toward mastery`, why: "Proficient. Mastery needs harder items, answers on more than one day and no outstanding misses.", act: { a: "quiz", obj: o.key } });
      }
    });
    if (allProf || (daysToExam !== null && daysToExam <= 21 && planned)) cands.push({ pri: allProf ? 75 : 70, kind: "exam", title: `Timed practice exam: ${d.name}`, why: allProf ? "Every objective is proficient or better. Test it under time pressure." : `Your exam is ${daysToExam} days away. Rehearse pacing.`, act: { a: "exam", div: d.id } });
  });
  cands.sort((a, b) => b.pri - a.pri);
  const out = [], seen = new Set();
  for (const c of cands) { const k = c.kind + (c.obj || "") + JSON.stringify(c.act); if (seen.has(k)) continue; seen.add(k); out.push(c); if (out.length >= 4) break; }
  if (!out.length) out.push({ kind: "start", title: "Start with Practice Management", why: "PcM is short (65 items) and builds on your AXP practice experience.", act: { a: "lesson", id: "pcm-finance" } });
  return out;
};

/* ---------- grading ---------- */
E.grade = (q, r) => {
  if (r === undefined || r === null || r === "") return false;
  switch (q.type) {
    case "mc": return r === q.ans;
    case "ms": return Array.isArray(r) && r.length === q.ans.length && q.ans.every(x => r.includes(x));
    case "calc": { const v = parseFloat(String(r).replace(/[,$%\s]/g, "")); return !isNaN(v) && Math.abs(v - q.ans) <= (q.tol || 0) + 1e-9; }
    case "order": return Array.isArray(r) && r.every((x, i) => x === i);
    case "match": return Array.isArray(r) && q.pairs.every((p, i) => r[i] === p[1]);
    case "hot": return r === q.ans;
  }
  return false;
};
E.answered = (q, r) => {
  if (r === undefined || r === null || r === "") return false;
  if (q.type === "ms") return r.length > 0;
  if (q.type === "match") return r.every(x => x);
  return true;
};

/* ---------- study time ---------- */
E.addTime = (min, kind, div) => {
  if (min < 0.25) return;
  E.S.time.push({ t: Date.now(), min: Math.min(min, 90), kind, div });
  if (E.S.time.length > 4000) E.S.time = E.S.time.slice(-4000);
  E.save();
};
E.minutesSince = (t0) => {
  let m = 0;
  E.S.time.forEach(x => { if (x.t >= t0) m += x.min; });
  (E.S.planner.sessions || []).forEach(s => { const t = new Date(s.date + "T12:00").getTime(); if (t >= t0) m += +s.min || 0; });
  return m;
};
E.weeklyMinutes = (weeks) => {
  const out = []; const start = E.startOfDay(Date.now()) - ((new Date().getDay() + 6) % 7) * DAY;
  for (let i = weeks - 1; i >= 0; i--) {
    const a = start - i * 7 * DAY, b = a + 7 * DAY; let m = 0;
    E.S.time.forEach(x => { if (x.t >= a && x.t < b) m += x.min; });
    (E.S.planner.sessions || []).forEach(s => { const t = new Date(s.date + "T12:00").getTime(); if (t >= a && t < b) m += +s.min || 0; });
    out.push({ start: a, min: m });
  }
  return out;
};

/* ---------- planner ---------- */
function parseMinE(s) { const m = s.match(/(\d+)\s*h\s*(\d+)?/); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 180; }
E.plan = () => {
  const P = E.S.planner;
  const divs = P.divs.length ? P.divs : [];
  if (!divs.length || !P.examDate) return null;
  const now = E.startOfDay(Date.now());
  const end = new Date(P.examDate + "T00:00").getTime();
  const weeks = Math.max(1, Math.ceil((end - now) / (7 * DAY)));
  const hours = Math.max(1, +P.hours || 8);
  const total = weeks * hours;
  const reserveWeeks = weeks > 2 ? Math.max(1, Math.round(weeks * 0.2)) : 0;
  const studyWeeks = Math.max(1, weeks - reserveWeeks);
  const studyBudget = studyWeeks * hours * (reserveWeeks ? 1 : 0.7);
  const items = [];
  divs.forEach(dId => ARE.DIV[dId].objectives.forEach(o => {
    const c = E.comp(o.key);
    if (c.level >= 4) return;
    const qs = E.objQAll[o.key].map(id => E.QMAP[id].diff || 1);
    const avgD = qs.length ? qs.reduce((a, b) => a + b, 0) / qs.length : 2;
    const pri = o.w * (1 - E.LVV[c.level]) * (1 + 0.15 * (avgD - 1));
    items.push({ o, c, pri });
  }));
  const psum = items.reduce((s, x) => s + x.pri, 0) || 1;
  items.forEach(x => x.hours = Math.max(0.5, Math.round(studyBudget * x.pri / psum * 2) / 2));
  items.sort((a, b) => (divs.indexOf(a.o.div) - divs.indexOf(b.o.div)) || (b.pri - a.pri));
  const sched = []; let wk = 0, used = 0;
  const perWeek = studyBudget / studyWeeks;
  for (let i = 0; i < weeks; i++) sched.push({ start: now + i * 7 * DAY, tasks: [], hours: 0 });
  items.forEach(x => {
    const lesson = E.objLessons[x.o.key].find(id => !(E.S.lessons[id] && E.S.lessons[id].done));
    let left = x.hours, first = true;
    while (left > 0.01) {
      if (used >= perWeek - 0.25 && wk < studyWeeks - 1) { wk++; used = 0; }
      const room = wk < studyWeeks - 1 ? Math.max(0.5, perWeek - used) : left;
      const h = Math.min(left, Math.round(room * 2) / 2 || 0.5);
      sched[wk].tasks.push({ kind: first && lesson ? "lesson" : "quiz", obj: x.o.key, lesson: first ? lesson : null, hours: h, level: x.c.level, cont: !first });
      sched[wk].hours += h; used += h; left -= h; first = false;
    }
  });
  // Exam rehearsal: final ~20% of weeks (or the remaining 30% of a short plan's only week)
  const rehearsal = reserveWeeks ? sched.slice(studyWeeks) : [sched[sched.length - 1]];
  rehearsal.forEach((w, i) => {
    const budget = reserveWeeks ? hours : hours * 0.3;
    const examH = Math.min(divs.length * 1.5, budget * 0.7);
    divs.forEach((dId, j) => { if (!reserveWeeks || (i + j) % Math.max(1, Math.ceil(divs.length / 2)) === 0 || divs.length <= 2) w.tasks.push({ kind: "exam", div: dId, hours: Math.max(1, Math.round(examH / Math.min(divs.length, 2) * 2) / 2) }); });
    if (i === rehearsal.length - 1 || rehearsal.length === 1) divs.forEach(dId => { if (ARE.NCARB_PE.exams[dId] && !E.S.results.some(r => r.mode === "official" && r.div === dId)) w.tasks.push({ kind: "official", div: dId, hours: Math.round(parseMinE(ARE.DIV[dId].time) / 60 * 2) / 2 }); });
    w.tasks.push({ kind: "review", hours: Math.max(0.5, Math.round((budget - w.tasks.filter(t => t.kind === "exam").reduce((s, t) => s + t.hours, 0)) * 2) / 2) });
    w.hours = w.tasks.reduce((s, t) => s + t.hours, 0);
  });
  return { weeks, hours, total, sched, days: Math.ceil((end - now) / DAY) };
};
})();
