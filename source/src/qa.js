/* ============================================================
   Content validation (v20)
   Automated checks over every question and lesson. They flag items for a
   human to look at; a flag is not proof of an error, and a clean result is
   not proof of accuracy. Independent human/AI reviews are logged in QA_LOG.
   ============================================================ */
(function () {
const E = ARE.E, QA = ARE.QA = {};
const strip = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
const STOP = new Set("a an the of to in on for and or is are be by with as at from that this which what who when where how it its their there into under over than then not no can may must should would will does do did has have had any each all".split(" "));
const toks = (s) => strip(s).toLowerCase().replace(/[^a-z0-9§.%/ -]/g, " ").split(/\s+/).filter(w => w.length > 2 && !STOP.has(w));
const jacc = (a, b) => { const A = new Set(a), B = new Set(b); if (!A.size || !B.size) return 0; let i = 0; A.forEach(x => { if (B.has(x)) i++; }); return i / (A.size + B.size - i); };

QA.CODE_RX = /\b(IBC|IECC|IEBC|IPC|IMC|NEC|NFPA|ADA|ABA|ICC A117|ASCE|ASHRAE|FHA|Fair Housing)\b/;
QA.SOURCE_RX = /\b(AIA|[ABCG]\d{3}|IBC|IECC|IEBC|IPC|IMC|NEC|NFPA|ADA|ABA|ICC|ASCE|ASHRAE|ASTM|AAMA|UL|NCARB|Handbook|CSI|MasterFormat|SectionFormat|UniFormat|FEMA|IES|OSHA|FLSA|EEOC|Brooks Act|Miller Act|National CAD Standard|Secretary of the Interior|Ching|Allen|Brown|DeKay|Mehta|Lechner|Peña|Pena|International (Building|Existing Building|Fire|Mechanical|Energy Conservation|Plumbing) Code|PMI|PMBOK|Brick Industry|Grondzik|FGI|RSMeans|IRS|Department of Labor|DOL|HUD|EPA|CFR|Clean Water Act|NRCA|Occupational Safety|Age Discrimination|Carbon Leadership|Architecture 2030|SITES|Planning and Urban Design Standards|ordinance|statutes?|registration laws|regulations|Strom|LaGro|Lynch|Bachman|Straube|Onouye|AISC|Cherry|WaterSense|ENERGY STAR)\b/i;

/* Log of independent reviews (factual history of this project). */
QA.LOG = [
  { date: "2026-11-05", scope: "All 930 questions and 6 case studies", method: "Six independent reviewers checked keys, rationales, citations (AIA text grep) and distractors; every finding triaged by the author", result: "1 wrong key corrected (q-ce-z10); several factual errors fixed (A201 testing costs, supplanting, supplier compensation, accessible routes, dampers); about 300 restated or giveaway distractors rewritten" },
  { date: "2026-11-05", scope: "New lesson text added in v19 (about 6,500 words across 38 lessons)", method: "Three independent reviewers checked AIA citations against document text, recomputed every worked example and checked code values (some from reviewer knowledge, not code text)", result: "11 corrections applied (2 medium, 9 low); no high-severity errors" }
];

QA.questions = () => {
  const ids = new Set(E.questions.map(q => q.id)); const qs = E.questions.concat(...(ARE.CASES || []).map(c => (c.questions || []).filter(q => !ids.has(q.id)).map(q => E.QMAP[q.id] || q))), out = [];
  const add = (q, check, sev, msg) => out.push({ id: q.id, div: q.div, obj: q.obj, check, sev, msg });
  // per-question checks
  qs.forEach(q => {
    const stem = strip(q.q);
    const isChoice = (q.type === "mc" || q.type === "ms") && Array.isArray(q.opts);
    // key validity
    if (q.type === "mc" && !(Number.isInteger(q.ans) && q.ans >= 0 && q.ans < (q.opts || []).length)) add(q, "key", "high", "Answer key is not a valid choice.");
    if (q.type === "ms" && !(Array.isArray(q.ans) && q.ans.length && q.ans.every(i => i >= 0 && i < q.opts.length))) add(q, "key", "high", "Multiple-response key is not valid.");
    if (q.type === "ms" && q.pick && Array.isArray(q.ans) && q.pick !== q.ans.length) add(q, "key", "high", `Stem asks for ${q.pick} but ${q.ans.length} are keyed.`);
    if (q.type === "ms" && Array.isArray(q.ans)) { const m = /\b(two|three|four)\b[^.?]*\b(apply|that apply)/i.exec(stem); const n = m ? { two: 2, three: 3, four: 4 }[m[1].toLowerCase()] : null; if (n && n !== q.ans.length) add(q, "key", "high", `Stem says ${m[1]} apply but ${q.ans.length} are keyed.`); }
    if (q.type === "calc" && (typeof q.ans !== "number" || isNaN(q.ans))) add(q, "key", "high", "Calculation answer is not a number.");
    // objective alignment
    const O = ARE.OBJ[q.obj];
    if (!O) add(q, "objective", "high", "Objective does not exist.");
    else if (O.div !== q.div) add(q, "objective", "high", "Objective belongs to another division.");
    if (q.lesson && E.LMAP[q.lesson] && O && !(E.LMAP[q.lesson].obj || []).includes(q.obj)) add(q, "objective", "low", "Linked lesson does not list this objective.");
    // source / rationale
    if (!q.ref) add(q, "source", "medium", "No reference given.");
    else if (!QA.SOURCE_RX.test(q.ref)) add(q, "source", "low", "Cites a general principle rather than a named source; the rationale and the linked lesson's references apply.");
    if (!q.explain || strip(q.explain).length < 25) add(q, "rationale", "medium", "Explanation is missing or very short.");
    // ambiguous wording
    if (/\b(all|none) of the above\b/i.test(stem + " " + (q.opts || []).join(" "))) add(q, "wording", "medium", "Uses 'all/none of the above'.");
    if (/\b(NOT|EXCEPT)\b/.test(stem) && /\bnot\b/i.test(stem.replace(/\bNOT\b/, ""))) add(q, "wording", "medium", "Possible double negative.");
    if (/\b(not|except)\b/.test(stem) && !/\b(NOT|EXCEPT)\b/.test(stem) && /\bwhich\b[^?]*\b(not|except)\b/i.test(stem)) add(q, "wording", "low", "Negative stem; consider emphasizing NOT/EXCEPT.");
    if (isChoice) {
      const opts = q.opts.map(strip), keys = Array.isArray(q.ans) ? q.ans : [q.ans];
      // weak distractors
      for (let i = 0; i < opts.length; i++) for (let j = i + 1; j < opts.length; j++) {
        if (opts[i].toLowerCase() === opts[j].toLowerCase()) add(q, "distractor", "high", `Choices ${String.fromCharCode(65 + i)} and ${String.fromCharCode(65 + j)} are identical.`);
        else if (opts[i].length > 25 && jacc(toks(opts[i]), toks(opts[j])) >= 0.8) add(q, "distractor", "low", `Choices ${String.fromCharCode(65 + i)} and ${String.fromCharCode(65 + j)} use very similar wording; check that they differ in a meaningful way (a deliberate reversal is fine).`);
      }
      if (q.type === "mc") {
        const L = opts.map(o => o.length), k = q.ans, others = L.filter((_, i) => i !== k);
        if (L[k] > 1.6 * Math.max(...others) && L[k] > 40) add(q, "distractor", "low", "Correct answer is much longer than every distractor (length cue).");
        const abs = /\b(always|never|only|all|none|every|guarantees?)\b/i;
        const absD = opts.filter((o, i) => i !== k && abs.test(o)).length;
        if (absD === opts.length - 1 && !abs.test(opts[k])) add(q, "distractor", "low", "Every distractor uses an absolute word and the key does not (wording cue).");
      }
      // explanation supports key
      if (Array.isArray(q.why)) {
        keys.forEach(k => { const w = strip(q.why[k]); if (/^(incorrect|wrong|no\b|not correct|false)/i.test(w)) add(q, "rationale", "high", `Rationale for the keyed choice ${String.fromCharCode(65 + k)} reads as wrong.`); });
        q.why.forEach((w, i) => { if (!keys.includes(i) && /^correct\b/i.test(strip(w))) add(q, "rationale", "high", `Rationale for distractor ${String.fromCharCode(65 + i)} says "Correct".`); });
        if (q.why.length !== q.opts.length) add(q, "rationale", "medium", "Rationale count does not match the number of choices.");
      } else add(q, "rationale", "medium", "No per-choice rationales.");
    }
  });
  // duplicate stems within a division
  const all = qs.map(q => ({ q, t: toks(q.q), k: q.type === "mc" && q.opts ? strip(q.opts[q.ans]).toLowerCase() : null }));
  [all].forEach(list => {
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j];
      if (a.t.length < 4 || b.t.length < 4) continue;
      const s = jacc(a.t, b.t);
      if (s >= 0.75 && (a.q.div === b.q.div || (a.k && a.k === b.k))) out.push({ id: a.q.id, div: a.q.div, obj: a.q.obj, check: "duplicate", sev: "medium", msg: `Stem is ${Math.round(s * 100)}% similar to ${b.q.id}${a.q.div !== b.q.div ? " (another division)" : ""}.`, other: b.q.id });
      else if (s >= 0.55 && a.k && a.k === b.k && a.q.obj === b.q.obj) out.push({ id: a.q.id, div: a.q.div, obj: a.q.obj, check: "duplicate", sev: "low", msg: `Tests the same point as ${b.q.id} (same objective, same keyed answer, similar stem).`, other: b.q.id });
    }
  });
  return out;
};

QA.lessons = () => E.lessons.map(l => {
  const deep = (ARE.DEEP || {})[l.id] || {};
  const words = strip(l.body + " " + (deep.sections || []).map(s => s.html).join(" ")).split(" ").length;
  const terms = E.glossary.filter(g => g.lesson === l.id).length;
  const qn = (l.obj || []).map(k => (E.objQ[k] || []).length);
  const code = QA.CODE_RX.test(strip(l.body + " " + (deep.sections || []).map(s => s.html).join(" ") + " " + (l.refs || []).map(r => r.t).join(" ")));
  const issues = [];
  if (!(l.objectives || []).length) issues.push("No learning objectives");
  if (!(l.refs || []).length) issues.push("No references");
  if (words < 500) issues.push(`Short (${words} words)`);
  if (terms < 3) issues.push(`Only ${terms} key terms`);
  if (!l.example || !l.example.html) issues.push("No worked example");
  if ((l.mistakes || []).length < 3) issues.push("Fewer than 3 common mistakes");
  if (qn.some(n => n < 6)) issues.push("An objective has fewer than 6 questions");
  if (!l.diagram) issues.push("No diagram");
  return { id: l.id, div: l.div, title: l.title, words, terms, diagram: !!l.diagram, refs: (l.refs || []).length, deep: (deep.sections || []).length, code, issues };
});

QA.summary = () => {
  const f = QA.questions(); const by = {}; f.forEach(x => { by[x.check] = by[x.check] || { high: 0, medium: 0, low: 0 }; by[x.check][x.sev]++; });
  const codeQ = QA.all().filter(q => QA.CODE_RX.test((q.ref || "") + " " + strip(q.q))).length;
  return { findings: f, by, codeQ, lessons: QA.lessons() };
};
QA.all = () => { const ids = new Set(E.questions.map(q => q.id)); return E.questions.concat(...(ARE.CASES || []).map(c => (c.questions || []).filter(q => !ids.has(q.id)).map(q => E.QMAP[q.id] || q))); };
QA.isCode = (q) => QA.CODE_RX.test((q.ref || "") + " " + strip(q.q));
})();
