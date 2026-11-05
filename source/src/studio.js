/* ============================================================
   VIDEO STUDIO: narrated, animated video lessons generated from
   course material (free: runs in the browser with the device's
   own speech voices; optional AI-written scripts; local MP4 export)
   ============================================================ */
(function () {
const E = ARE.E, L = ARE.L, AI = ARE.AI, ST = ARE.STUDIO = {};
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const strip = L.strip;
const words = (t) => (String(t).match(/\S+/g) || []).length;
const sentences = (t) => (String(t).replace(/\s+/g, " ").match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []).map(s => s.trim()).filter(s => s.length > 1);
const short = (s, n = 110) => s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s;

ST.FORMATS = {
  // min/max: target for AI-written scripts (the brief); est: typical length of the course-material script
  quick: { label: "Quick Review", min: 2, max: 3, est: "about 2 min" },
  standard: { label: "Standard Lesson", min: 5, max: 10, est: "4–7 min" },
  deep: { label: "Deep Dive", min: 10, max: 15, est: "6–11 min" },
  visual: { label: "Visual Explainer", min: 3, max: 6, est: "2–4 min" },
  exam: { label: "Exam Preparation", min: 4, max: 8, est: "2–4 min" },
  remedial: { label: "Personalized Remedial", min: 4, max: 10, est: "4–7 min" }
};

/* ---------- source material ---------- */
ST.sourceList = (kind) => {
  if (kind === "lesson") return E.lessons.map(l => ({ id: l.id, t: ARE.DIV[l.div].code + " · " + l.title }));
  if (kind === "objective") return Object.values(ARE.OBJ).filter(o => (E.objLessons[o.key] || []).length).map(o => ({ id: o.key, t: ARE.DIV[o.div].code + " " + o.code + " · " + short(o.title, 80) }));
  if (kind === "note") return L.notes().map(n => ({ id: n.obj, t: ARE.DIV[ARE.OBJ[n.obj].div].code + " " + ARE.OBJ[n.obj].code + " · " + short(ARE.OBJ[n.obj].title, 70) + (n.archived ? " (archived)" : "") }));
  if (kind === "question") return E.missedIds().concat(Object.keys(E.S.flags)).filter((v, i, a) => a.indexOf(v) === i && E.QMAP[v] && E.QMAP[v].explain).slice(0, 80).map(id => ({ id, t: ARE.DIV[E.QMAP[id].div].code + " · " + short(strip(E.QMAP[id].q), 80) }));
  if (kind === "handbook") return ARE.HANDBOOK.topics.map(t => ({ id: t.id, t: "AHPP · " + t.topic }));
  if (kind === "code") return (ARE.IBC && ARE.IBC.chapters || []).map(c => ({ id: String(c[0]), t: "IBC 2021 Ch. " + c[0] + " · " + c[1] })).filter(c => lessonsForCode(c.id).length);
  if (kind === "compare") return L.CONFUSABLES.filter(([a, b]) => L.term(a) && L.term(b)).map(([a, b]) => ({ id: a + "|" + b, t: a + " vs " + b }));
  return [];
};
ST.KINDS = [["lesson", "Study module"], ["objective", "NCARB objective"], ["note", "My learning note"], ["question", "Practice question explanation"], ["compare", "Commonly confused terms"], ["handbook", "AIA Handbook topic"], ["code", "Building code topic"]];
function lessonsForCode(ch) { return E.lessons.filter(l => (l.refs || []).some(r => new RegExp("IBC[^;]*\\b(Ch(apter)?\\.?\\s*" + ch + "\\b|§\\s*" + ch + "\\d\\d)").test(r.t)) || (l.body || "").match(new RegExp("\\b" + ch + "\\d\\d(\\.\\d)?\\b")) && /IBC/.test(l.body)); }

/* ---------- scene builders ---------- */
function sectionScenes(l, maxSec, perSecWords) {
  const parts = String(l.body).split(/<h3>/).slice(1).map(p => { const i = p.indexOf("</h3>"); return { h: strip(p.slice(0, i)), html: p.slice(i + 5) }; });
  return parts.slice(0, maxSec).map(p => {
    const txt = strip(p.html); const ss = sentences(txt);
    let narr = ""; for (const s of ss) { if (words(narr + " " + s) > perSecWords && narr) break; narr += (narr ? " " : "") + s; }
    const table = /<table/.test(p.html) ? p.html.match(/<table[\s\S]*?<\/table>/)[0] : null;
    const bullets = (p.html.match(/<li>([\s\S]*?)<\/li>/g) || []).map(x => short(strip(x), 100));
    return { kind: table ? "table" : "bullets", title: p.h, bullets: (bullets.length ? bullets : ss.map(s => short(s, 100))).slice(0, 5), table, narration: table ? narr || ("This table summarizes " + p.h.toLowerCase() + ".") : narr, chapter: "Core concepts" };
  });
}
function diagramScene(l, maxTips) {
  if (!l.diagram) return null;
  const tips = (l.diagram.match(/data-tip="([^"]*)"/g) || []).map(x => x.slice(10, -1)).map(s => { const [t, d] = s.split("|"); return { t, d: d || "" }; }).slice(0, maxTips);
  const narr = tips.length ? "Let's walk through the diagram. " + tips.map(t => t.t + ": " + t.d).join(" ") : "Here is the diagram for this topic. Study how the parts relate before moving on.";
  return { kind: "diagram", title: "Visual explanation", svg: l.diagram, tips, narration: narr, chapter: "Visual explanation", verified: "Course diagram (schematic, not to scale)" };
}
function checkScene(objs, n, exclude) {
  const ids = []; (objs || []).forEach(k => (E.objQ[k] || []).forEach(id => { const q = E.QMAP[id]; if (q && q.type === "mc" && !ids.includes(id) && !(exclude || []).includes(id)) ids.push(id); }));
  const pick = E.shuffle(ids).slice(0, n);
  return pick.length ? { kind: "quiz", title: "Knowledge check", qids: pick, narration: "Time to check your understanding. Answer each question; the video continues when you're done.", chapter: "Knowledge check" } : null;
}
function sourcesScene(l, objs) {
  const list = [];
  (objs || []).forEach(k => list.push("NCARB objective " + ARE.DIV[ARE.OBJ[k].div].code + " " + ARE.OBJ[k].code + ": " + ARE.OBJ[k].title + " — " + ARE.META.guidelines));
  if (l) (l.refs || []).forEach(r => list.push(strip(r.t)));
  (objs || []).forEach(k => ((ARE.HB_OBJ && ARE.HB_OBJ[k]) || []).slice(0, 2).forEach(r => list.push("AIA Architect's Handbook of Professional Practice, 15th ed., §" + r[0] + " (p. " + r[1] + ")")));
  return { kind: "sources", title: "Sources", items: [...new Set(list)].slice(0, 10), narration: "Sources for this video are listed on screen. Narration is drawn from the ARE Academy lesson; diagrams are schematic.", chapter: "Sources" };
}
function lessonVideo(l, fmt, extra) {
  const F = ST.FORMATS[fmt], objs = l.obj || [];
  const tk = ARE.TAKEAWAYS[l.id] || l.takeaways || [];
  const S = [];
  S.push({ kind: "title", title: l.title, sub: ARE.DIV[l.div].code + " · " + ARE.DIV[l.div].name + " · " + F.label, narration: l.title + ". " + l.summary + " Why this matters for the ARE: " + l.why, chapter: "Introduction" });
  if (fmt === "quick") {
    S.push({ kind: "bullets", title: "The essentials", bullets: tk.slice(0, 5), narration: tk.slice(0, 5).join(" "), chapter: "Core concepts" });
    const d = diagramScene(l, 3); if (d) S.push(d);
    S.push({ kind: "bullets", title: "How the ARE tests it", bullets: sentences(l.exam).map(s => short(s)), narration: l.exam, chapter: "ARE exam relevance" });
    S.push({ kind: "bullets", title: "Watch out for", bullets: (l.mistakes || []).slice(0, 3).map(m => short(m)), narration: (l.mistakes || []).slice(0, 3).join(" "), chapter: "Common mistakes" });
  } else if (fmt === "visual") {
    const d = diagramScene(l, 12); if (d) S.push(d);
    (l.formulas || []).length && S.push({ kind: "formulas", title: "Formulas", rows: l.formulas, narration: l.formulas.map(f => f.name + ". " + f.f.replace(/×/g, " times ").replace(/÷/g, " divided by ")).join(". ") + ".", chapter: "Visual explanation" });
    L.pairsFor(l.id).slice(0, 2).forEach(p => S.push(compareScene(p)));
    S.push(...sectionScenes(l, 6, 60).filter(s => s.kind === "table"));
    S.push({ kind: "bullets", title: "Remember", bullets: tk.slice(0, 5), narration: tk.slice(0, 4).join(" "), chapter: "Recap" });
  } else if (fmt === "exam") {
    S.push({ kind: "bullets", title: "How NCARB tests this", bullets: sentences(l.exam).map(s => short(s)), narration: l.exam, chapter: "ARE exam relevance" });
    objs.forEach(k => { const o = ARE.OBJ[k]; S.push({ kind: "bullets", title: ARE.DIV[o.div].code + " " + o.code, bullets: [o.title, o.lvl ? "Cognitive level: " + (o.lvl === "A/E" ? "Analyze / Evaluate" : "Understand / Apply") : "", o.pct ? "About " + o.pct[0] + "–" + o.pct[1] + "% of the division" : ""].filter(Boolean), narration: "Objective " + o.code + ": " + o.title + ".", chapter: "ARE exam relevance" }); });
    S.push({ kind: "bullets", title: "Traps and common mistakes", bullets: (l.mistakes || []).map(m => short(m)), narration: (l.mistakes || []).join(" "), chapter: "Common mistakes" });
    S.push({ kind: "bullets", title: "Key distinctions", bullets: tk.slice(0, 5), narration: tk.join(" "), chapter: "Core concepts" });
    S.push(...workedScenes(objs, extra && extra.question ? 1 : 3));
    if (extra && extra.question) S.splice(1, 0, ...extra.question);
  } else {
    const per = fmt === "deep" ? 220 : 120;
    S.push(...sectionScenes(l, fmt === "deep" ? 9 : 6, per));
    const d = diagramScene(l, fmt === "deep" ? 12 : 6); if (d) S.push(d);
    if ((l.formulas || []).length) S.push({ kind: "formulas", title: "Formulas", rows: l.formulas, narration: l.formulas.map(f => f.name + ": " + f.f.replace(/×/g, " times ").replace(/÷/g, " divided by ") + (f.note ? ". " + f.note : "")).join(". ") + ".", chapter: "Core concepts" });
    S.push({ kind: "bullets", title: strip(l.example.title), bullets: sentences(strip(l.example.html)).slice(0, 5).map(s => short(s)), narration: strip(l.example.html).split(" ").slice(0, fmt === "deep" ? 400 : 200).join(" "), chapter: "Practical application" });
    if (fmt === "deep") { const tsc = termsScene(l); if (tsc) S.splice(2, 0, tsc); L.pairsFor(l.id).slice(0, 2).forEach(p => S.push(compareScene(p)));
      (l.quick || []).forEach((qq, i) => S.push({ kind: "bullets", title: "Check yourself " + (i + 1), bullets: [qq.q].concat(qq.opts.map((o, k) => String.fromCharCode(65 + k) + ". " + o)), narration: qq.q + " Pause and choose. The answer is " + String.fromCharCode(65 + qq.a) + ": " + qq.opts[qq.a] + ". " + qq.why, chapter: "Practical application" }));
      S.push(...workedScenes(objs, 3)); S.push({ kind: "bullets", title: "Scenario", bullets: [short(l.scenario.prompt, 160)], narration: "Consider this scenario. " + l.scenario.prompt + " Pause and decide before continuing. " + l.scenario.answer, chapter: "Practical application" }); }
    S.push({ kind: "bullets", title: "How the ARE tests it", bullets: sentences(l.exam).map(s => short(s)), narration: l.exam, chapter: "ARE exam relevance" });
    S.push({ kind: "bullets", title: "Common mistakes", bullets: (l.mistakes || []).map(m => short(m)), narration: (l.mistakes || []).join(" "), chapter: "Common mistakes" });
    if (fmt === "standard") S.push(...workedScenes(objs, 1));
    S.push({ kind: "bullets", title: "Recap", bullets: tk.slice(0, 5), narration: "To recap. " + tk.join(" "), chapter: "Recap" });
  }
  const q = checkScene(objs, fmt === "quick" ? 2 : 3); if (q) S.push(q);
  S.push(sourcesScene(l, objs));
  return S;
}
function workedScenes(objs, n, chapter) {
  const ids = []; (objs || []).forEach(k => (E.objQ[k] || []).forEach(id => { const q = E.QMAP[id]; if (q && q.type === "mc" && q.why && !ids.includes(id)) ids.push(id); }));
  return E.shuffle(ids).slice(0, n).map((id, i) => { const q = E.QMAP[id];
    return { kind: "bullets", title: "Worked question " + (i + 1), bullets: [short(strip(q.q), 200)].concat(q.opts.map((o, k) => String.fromCharCode(65 + k) + ". " + short(strip(o), 80))), narration: "Here is an exam-style question. " + strip(q.q) + " Think about it before I explain. The answer is " + String.fromCharCode(65 + q.ans) + ": " + strip(q.opts[q.ans]) + ". " + strip(q.explain) + " " + q.why.map((w, k) => k === q.ans ? "" : "Option " + String.fromCharCode(65 + k) + " is wrong: " + strip(w)).join(" "), chapter: chapter || "ARE exam relevance" }; });
}
function termsScene(l) {
  const ts = E.glossary.filter(g => g.lesson === l.id).slice(0, 6);
  return ts.length ? { kind: "bullets", title: "Key terms", bullets: ts.map(g => g.term + ": " + short(g.def, 80)), narration: ts.map(g => g.term + ". " + g.def).join(" "), chapter: "Core concepts" } : null;
}
function compareScene([a, b]) {
  const A = L.term(a), B = L.term(b);
  return { kind: "compare", title: a + " vs " + b, left: { h: A.term, d: A.def }, right: { h: B.term, d: B.def }, narration: "Don't confuse these. " + A.term + ": " + A.def + " By contrast, " + B.term + ": " + B.def, chapter: "Compare and contrast", verified: "Definitions from the course glossary" };
}
function remedialScenes(n) {
  const b = L.buildNote(n), S = [], l = b.lesson;
  S.push({ kind: "title", title: "Fixing a gap: " + short(b.concept.title, 80), sub: b.concept.code + " · Personalized remedial lesson", narration: "This lesson was made from your own answers on " + b.concept.code + ": " + b.concept.title + ".", chapter: "Introduction" });
  b.misunderstood.slice(0, 3).forEach(m => {
    S.push({ kind: "bullets", title: "Where it went wrong", bullets: [short(m.stem, 160), m.chosen ? "You chose: " + short(m.chosen, 100) : "", m.correct ? "Correct: " + short(String(m.correct), 100) : ""].filter(Boolean), narration: "You were asked: " + m.stem + (m.chosen ? " You chose " + m.chosen + "." : "") + (m.why ? " Here's the trap: " + m.why : "") + " " + strip(m.explain), chapter: "What I misunderstood" });
  });
  b.pairs.forEach(p => S.push(compareScene([p.a.term, p.b.term])));
  if (l) {
    S.push(...sectionScenes(l, 3, 110));
    const d = diagramScene(l, 6); if (d) S.push(d);
    S.push({ kind: "bullets", title: "On a real project", bullets: [short(l.why, 160)], narration: l.why, chapter: "Practical application" });
    S.push({ kind: "bullets", title: "How the ARE tests it", bullets: sentences(l.exam).map(s => short(s)), narration: l.exam, chapter: "ARE exam relevance" });
  }
  S.push({ kind: "bullets", title: "Remember", bullets: b.remember, narration: b.remember.join(" "), chapter: "Recap" });
  const q = checkScene([n.obj], 3, b.misunderstood.map(m => m.q)); if (q) S.push(q);
  S.push(sourcesScene(l, [n.obj]));
  return S;
}

/* ---------- build ---------- */
ST.build = (src, fmt) => {
  let title, scenes, objs = [], div = null, lesson = null, material = "";
  const lessonFor = (obj) => E.LMAP[(E.objLessons[obj] || [])[0]];
  if (src.kind === "lesson" || src.kind === "objective") {
    const l = src.kind === "lesson" ? E.LMAP[src.id] : lessonFor(src.id);
    if (!l) throw new Error("No lesson for that topic yet.");
    lesson = l; objs = src.kind === "objective" ? [src.id] : (l.obj || []); div = l.div;
    title = src.kind === "objective" ? ARE.DIV[div].code + " " + ARE.OBJ[src.id].code + " · " + short(ARE.OBJ[src.id].title, 70) : l.title;
    if (fmt === "remedial" && E.S.lnotes[objs[0]]) scenes = remedialScenes(E.S.lnotes[objs[0]]);
    else scenes = lessonVideo(l, fmt === "remedial" ? "standard" : fmt);
  } else if (src.kind === "note") {
    const n = E.S.lnotes[src.id]; if (!n) throw new Error("Note not found.");
    objs = [n.obj]; div = ARE.OBJ[n.obj].div; lesson = lessonFor(n.obj); title = "Remedial · " + ARE.DIV[div].code + " " + ARE.OBJ[n.obj].code;
    scenes = remedialScenes(n); fmt = "remedial";
  } else if (src.kind === "question") {
    const q = E.QMAP[src.id]; if (!q) throw new Error("Question not found.");
    objs = [q.obj]; div = q.div; lesson = q.lesson && E.LMAP[q.lesson]; title = "Explained · " + short(strip(q.q), 60);
    const qs = [{ kind: "bullets", title: "The question", bullets: [short(strip(q.q), 220)].concat((q.opts || []).map((o, i) => String.fromCharCode(65 + i) + ". " + short(strip(o), 90))), narration: strip(q.q) + (q.opts ? " The options are: " + q.opts.map((o, i) => String.fromCharCode(65 + i) + ", " + strip(o)).join("; ") + "." : ""), chapter: "Introduction" },
      { kind: "bullets", title: "The answer", bullets: [q.type === "mc" ? "Correct: " + String.fromCharCode(65 + q.ans) + ". " + short(strip(q.opts[q.ans]), 120) : q.type === "calc" ? "Answer: " + q.ans + " " + (q.unit || "") : "See explanation"], narration: strip(q.explain), chapter: "Core concepts" }];
    if (q.why) qs.push({ kind: "bullets", title: "Why the other options fail", bullets: q.why.map((w, i) => i === q.ans ? null : String.fromCharCode(65 + i) + ": " + short(strip(w), 110)).filter(Boolean), narration: q.why.map((w, i) => i === q.ans ? "" : "Option " + String.fromCharCode(65 + i) + ". " + strip(w)).join(" "), chapter: "Common mistakes" });
    scenes = lesson ? lessonVideo(lesson, "exam", { question: qs }) : qs.concat([sourcesScene(null, objs)]);
    fmt = "exam";
  } else if (src.kind === "compare") {
    const [a, b] = src.id.split("|"); const A = L.term(a), B = L.term(b); lesson = E.LMAP[A.lesson] || E.LMAP[B.lesson]; div = lesson ? lesson.div : null; objs = lesson ? lesson.obj : [];
    title = a + " vs " + b;
    scenes = [{ kind: "title", title, sub: "Compare & contrast", narration: "Two terms that are easy to confuse on the ARE: " + a + " and " + b + ".", chapter: "Introduction" }, compareScene([a, b])];
    if (lesson) { scenes.push({ kind: "bullets", title: "Where this comes up", bullets: [lesson.title, short(lesson.exam, 160)], narration: "These come up in " + lesson.title + ". " + lesson.exam, chapter: "ARE exam relevance" }); const q = checkScene(objs, 2); if (q) scenes.push(q); }
    scenes.push(sourcesScene(lesson, objs)); fmt = fmt === "quick" ? "quick" : "visual";
  } else if (src.kind === "handbook") {
    const t = ARE.HANDBOOK.topics.find(x => x.id === src.id); lesson = E.LMAP[(t.lessons || [])[0]]; objs = t.objs || []; div = lesson ? lesson.div : null;
    title = "AHPP · " + t.topic;
    scenes = (lesson ? lessonVideo(lesson, fmt === "remedial" ? "standard" : fmt) : []);
    scenes.splice(1, 0, { kind: "bullets", title: "Read in your Handbook", bullets: t.sections.map(sn => "§" + sn + " " + (ARE.HB_SEC[sn] ? ARE.HB_SEC[sn].t + " · p. " + ARE.HB_SEC[sn].p : "")), narration: "For depth, read these sections of the Architect's Handbook of Professional Practice. This video teaches the ARE-relevant ideas in our own words; it does not reproduce the Handbook.", chapter: "Introduction", verified: "Section and page references from your copy (15th ed.)" });
  } else if (src.kind === "code") {
    const ls = lessonsForCode(src.id); lesson = ls[0]; if (!lesson) throw new Error("No lesson covers that chapter yet."); objs = lesson.obj; div = lesson.div;
    const ch = ARE.IBC.chapters.find(c => String(c[0]) === src.id); title = "IBC 2021 Chapter " + src.id + " · " + (ch ? ch[1] : "");
    scenes = lessonVideo(lesson, fmt === "remedial" ? "standard" : fmt);
    scenes.splice(1, 0, { kind: "bullets", title: "Code source", bullets: ["International Building Code 2021, Chapter " + src.id + (ch ? " — " + ch[1] : ""), "Verify requirements in the code itself; your jurisdiction may amend it.", "The ARE tests the IBC model code, not the Ontario Building Code."], narration: "This video is based on IBC 2021 Chapter " + src.id + ". Always verify requirements in the code and any local amendments.", chapter: "Introduction" });
  }
  scenes.forEach(s => { s.sents = sentences(s.narration || s.title || ""); });
  material = lesson ? [lesson.title, lesson.summary, strip(lesson.body), lesson.why, lesson.exam, (lesson.mistakes || []).join(" "), (ARE.TAKEAWAYS[lesson.id] || []).join(" "), strip(lesson.example.html)].join("\n") : scenes.map(s => s.narration).join("\n");
  const w = scenes.reduce((a, s) => a + words(s.narration || ""), 0);
  return { title, scenes, objs, div, lesson: lesson && lesson.id, fmt, words: w, estMin: w / 150, material };
};

/* ---------- library records ---------- */
ST.create = async (src, fmt, opt = {}) => {
  let v; try { v = ST.build(src, fmt); } catch (e) { ARE.H.toast(e.message); return; }
  const id = "v" + Date.now().toString(36);
  const rec = { id, src, fmt: v.fmt, title: v.title, div: v.div, objs: v.objs, created: Date.now(), watched: 0, pos: 0, done: false, bm: false, kc: null, estMin: v.estMin, ai: false };
  if (opt.planStep !== undefined) { rec.planStep = opt.planStep; rec.planDay = E.dayKey(Date.now()); }
  if (opt.ai && AI.active()) {
    ARE.H.toast("Writing the script with " + AI.label(AI.active()) + "…");
    try {
      const sc = await AI.videoScript({ title: v.title, material: v.material }, ST.FORMATS[v.fmt]);
      const keep = v.scenes.filter(s => s.kind === "diagram" || s.kind === "quiz" || s.kind === "sources" || s.kind === "formulas");
      const diagram = keep.find(s => s.kind === "diagram");
      const aiScenes = sc.map(s => s.kind === "diagram" && diagram ? Object.assign({}, diagram, { narration: s.narration, title: s.title || diagram.title }) : s.kind === "flow" ? { kind: "flow", title: s.title, steps: s.bullets, narration: s.narration, chapter: s.title } : { kind: s.kind === "compare" ? "bullets" : s.kind, title: s.title, bullets: s.bullets, narration: s.narration, chapter: s.kind === "title" ? "Introduction" : s.title, sub: s.kind === "title" ? ST.FORMATS[v.fmt].label + " · AI-written script" : "" });
      if (!aiScenes.some(s => s.kind === "diagram") && diagram) aiScenes.splice(Math.min(3, aiScenes.length), 0, diagram);
      keep.filter(s => s.kind !== "diagram").forEach(s => aiScenes.push(s));
      aiScenes.forEach(s => s.sents = sentences(s.narration || s.title));
      rec.scenes = aiScenes; rec.ai = AI.active(); rec.estMin = aiScenes.reduce((a, s) => a + words(s.narration || ""), 0) / 150;
    } catch (e) { ARE.H.toast("AI script unavailable (" + AI.errText(e) + ") — using the course script."); }
  }
  E.S.videos[id] = rec; E.save();
  ST.play(id);
  return id;
};
ST.scenesFor = (rec) => rec.scenes || ST.build(rec.src, rec.fmt).scenes;

/* ---------- player ---------- */
let P = null; // { rec, scenes, si, xi, playing, timer, rate, cc, voice }
let box = null;
const canSpeak = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
function pickVoice() { return ARE.VOICE.best(); }
ST.play = (id) => {
  const rec = E.S.videos[id]; if (!rec) return;
  const scenes = ST.scenesFor(rec);
  let pref = {}; try { pref = JSON.parse(localStorage.getItem("are-player") || "{}"); } catch (e) {}
  P = { rec, scenes, si: Math.min(rec.pos || 0, scenes.length - 1), xi: 0, playing: false, rate: pref.rate || 1, cc: pref.cc !== false, voice: pref.voice !== false && canSpeak(), panel: pref.panel || "chapters", kc: {} };
  if (!box) mount();
  box.hidden = false; document.body.classList.add("vp-open");
  rec.watched = Date.now(); E.save();
  render(); renderSide();
};
function mount() {
  box = document.createElement("div"); box.className = "vplayer"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Video lesson");
  box.innerHTML = `<div class="vp-inner"><div class="vp-top"><b class="vp-title"></b><span class="vp-fmt"></span><button class="vp-b" data-v="bm" aria-label="Bookmark">☆</button><button class="vp-b" data-v="close" aria-label="Close video">✕</button></div>
<div class="vp-body"><div class="vp-main"><div class="vp-stage" id="vpStage" aria-live="polite"></div><div class="vp-cc" id="vpCC"></div>
<div class="vp-prog" id="vpProg" role="slider" aria-label="Video position" tabindex="0"></div>
<div class="vp-ctrl"><button class="vp-b" data-v="prev" aria-label="Previous chapter">⏮</button><button class="vp-b big" data-v="play" aria-label="Play">▶</button><button class="vp-b" data-v="next" aria-label="Next chapter">⏭</button>
<span class="vp-time mono" id="vpTime"></span><span style="flex:1"></span>
<button class="vp-b" data-v="cc" aria-label="Captions">CC</button><button class="vp-b" data-v="voice" aria-label="Narration on/off">🔊</button>
<select class="vp-sel" data-v="rate" aria-label="Playback speed">${[0.75, 1, 1.25, 1.5, 1.75].map(r => `<option value="${r}">${r}×</option>`).join("")}</select>
<button class="vp-b" data-v="side" aria-label="Chapters and transcript">☰</button><button class="vp-b" data-v="fs" aria-label="Full screen">⛶</button></div></div>
<aside class="vp-side" id="vpSide"><div class="tabs"><button data-v="tab" data-t="chapters">Chapters</button><button data-v="tab" data-t="transcript">Transcript</button><button data-v="tab" data-t="notes">Notes</button></div><div class="vp-sidebody" id="vpSideBody"></div></aside></div></div>`;
  document.body.appendChild(box);
  box.addEventListener("click", onClick);
  box.addEventListener("change", e => { if (e.target.dataset.v === "rate") { P.rate = +e.target.value; savePref(); if (P.playing) { stopAudio(); speak(); } } });
  box.querySelector("#vpProg").addEventListener("click", e => { const r = e.currentTarget.getBoundingClientRect(); const f = (e.clientX - r.left) / r.width; goScene(Math.floor(f * P.scenes.length)); });
  document.addEventListener("keydown", e => {
    if (!P || box.hidden || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    else if (e.key === "ArrowRight") goScene(P.si + 1); else if (e.key === "ArrowLeft") goScene(P.si - 1);
    else if (e.key === "Escape") close(); else if (e.key === "c") { P.cc = !P.cc; savePref(); render(); }
  });
  // swipe between chapters on touch
  let sx = null; box.querySelector("#vpStage").addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  box.querySelector("#vpStage").addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 60) goScene(P.si + (dx < 0 ? 1 : -1)); sx = null; });
  if (canSpeak()) speechSynthesis.onvoiceschanged = () => {};
}
function savePref() { try { localStorage.setItem("are-player", JSON.stringify({ rate: P.rate, cc: P.cc, voice: P.voice, panel: P.panel })); } catch (e) {} }
function sceneHTML(s, xi) {
  const n = s.sents.length || 1, f = Math.min(1, (xi + 1) / n);
  const reveal = (arr) => arr.map((b, i) => `<li class="${i < Math.ceil(f * arr.length) ? "in" : ""}">${esc(b)}</li>`).join("");
  let inner = "";
  if (s.kind === "title") inner = `<div class="vs-title"><span class="eyebrow">${esc(s.sub || "")}</span><h2>${esc(s.title)}</h2><i class="vs-rule"></i></div>`;
  else if (s.kind === "bullets" || s.kind === "recap") inner = `<h3>${esc(s.title)}</h3><ul class="vs-list">${reveal(s.bullets || [])}</ul>`;
  else if (s.kind === "table") inner = `<h3>${esc(s.title)}</h3><div class="vs-table">${s.table}</div>`;
  else if (s.kind === "formulas") inner = `<h3>${esc(s.title)}</h3><div class="vs-formulas">${s.rows.map((r, i) => `<div class="${i < Math.ceil(f * s.rows.length) ? "in" : ""}"><b>${esc(r.name)}</b><code>${esc(r.f)}</code></div>`).join("")}</div>`;
  else if (s.kind === "compare") inner = `<h3>${esc(s.title)}</h3><div class="vs-compare"><div class="in"><b>${esc(s.left.h)}</b><p>${esc(s.left.d)}</p></div><div class="${f > 0.5 ? "in" : ""}"><b>${esc(s.right.h)}</b><p>${esc(s.right.d)}</p></div></div>`;
  else if (s.kind === "flow") inner = `<h3>${esc(s.title)}</h3>${AI.flowSVG((s.steps || []).join(" -> "))}`;
  else if (s.kind === "diagram") {
    const tipI = s.tips.length ? Math.min(s.tips.length - 1, Math.floor(f * s.tips.length - 0.001)) : -1;
    inner = `<h3>${esc(s.title)}</h3><div class="vs-diagram"><div class="vs-fig" data-tipi="${tipI}">${s.svg}</div>${tipI >= 0 ? `<div class="vs-callout"><b>${esc(s.tips[tipI].t)}</b><p>${esc(s.tips[tipI].d)}</p></div>` : ""}</div>`;
  }
  else if (s.kind === "quiz") inner = `<h3>${esc(s.title)}</h3><div class="vs-quiz">${s.qids.map((qid, k) => { const q = E.QMAP[qid]; if (!q) return ""; const r = P.kc[qid]; return `<div class="vs-q"><p><b>${k + 1}.</b> ${q.q}</p><div class="opts">${q.opts.map((o, i) => `<button class="opt ${r !== undefined ? (i === q.ans ? "good" : i === r ? "wrong" : "") : ""}" data-v="kc" data-q="${qid}" data-i="${i}" ${r !== undefined ? "disabled" : ""}><span class="mk">${String.fromCharCode(65 + i)}</span><span>${o}</span></button>`).join("")}</div>${r !== undefined ? `<p class="vs-fb ${r === q.ans ? "good" : "bad"}">${r === q.ans ? "Correct." : "Not quite."} ${q.explain}</p>` : ""}</div>`; }).join("")}</div>`;
  else if (s.kind === "sources") inner = `<h3>${esc(s.title)}</h3><ul class="vs-src">${s.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul><p class="muted" style="font-size:.85em">Narration is from ARE Academy's own lessons${P.rec.ai ? " (script written by AI from that material — verify)" : ""}. Diagrams are schematic and illustrative, not construction details.</p>`;
  return `<div class="vs vs-${s.kind}">${inner}${s.verified ? `<span class="vs-tag">${esc(s.verified)}</span>` : ""}</div>`;
}
function render() {
  if (!P) return;
  const s = P.scenes[P.si];
  box.querySelector(".vp-title").textContent = P.rec.title;
  box.querySelector(".vp-fmt").textContent = ST.FORMATS[P.rec.fmt].label + " · " + Math.max(1, Math.round(P.rec.estMin / P.rate)) + " min";
  box.querySelector("[data-v=bm]").textContent = P.rec.bm ? "★" : "☆";
  const stage = box.querySelector("#vpStage");
  stage.innerHTML = sceneHTML(s, P.xi);
  const fig = stage.querySelector(".vs-fig");
  if (fig) { const tips = fig.querySelectorAll(".tip"); const ti = +fig.dataset.tipi; tips.forEach((t, i) => t.classList.toggle("on", i === ti)); }
  box.querySelector("#vpCC").textContent = P.cc ? (s.sents[P.xi] || "") : "";
  box.querySelector("#vpCC").hidden = !P.cc || !s.sents[P.xi];
  box.querySelector("[data-v=play]").textContent = P.playing ? "❚❚" : "▶";
  box.querySelector("[data-v=play]").setAttribute("aria-label", P.playing ? "Pause" : "Play");
  box.querySelector("[data-v=cc]").classList.toggle("on", P.cc);
  box.querySelector("[data-v=voice]").textContent = P.voice ? "🔊" : "🔇";
  box.querySelector("[data-v=voice]").disabled = !canSpeak();
  box.querySelector("[data-v=rate]").value = P.rate;
  box.querySelector("#vpProg").innerHTML = P.scenes.map((x, i) => `<i class="${i < P.si ? "past" : i === P.si ? "cur" : ""}" style="flex:${Math.max(1, x.sents.length)}"><b style="width:${i === P.si ? Math.round((P.xi + 1) / Math.max(1, x.sents.length) * 100) : i < P.si ? 100 : 0}%"></b></i>`).join("");
  const wDone = P.scenes.slice(0, P.si).reduce((a, x) => a + words(x.narration || ""), 0) + words((s.sents || []).slice(0, P.xi).join(" "));
  box.querySelector("#vpTime").textContent = fmtT(wDone / 150 / P.rate) + " / " + fmtT(P.rec.estMin / P.rate) + " · " + (P.si + 1) + "/" + P.scenes.length;
  if (P.panel === "transcript") renderSide();
  else box.querySelectorAll(".vp-chap").forEach((c, i) => c.classList.toggle("cur", +c.dataset.i === P.si));
}
const fmtT = (m) => { const s = Math.round(m * 60); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function renderSide() {
  const b = box.querySelector("#vpSideBody");
  box.querySelectorAll("[data-v=tab]").forEach(t => t.classList.toggle("on", t.dataset.t === P.panel));
  if (P.panel === "chapters") {
    const chaps = []; P.scenes.forEach((s, i) => { const c = s.chapter || s.title; if (!chaps.length || chaps[chaps.length - 1].c !== c) chaps.push({ c, i, t: s.title }); });
    b.innerHTML = chaps.map(c => `<button class="vp-chap ${c.i === P.si ? "cur" : ""}" data-v="go" data-i="${c.i}"><b>${esc(c.c)}</b><small>${esc(c.t)}</small></button>`).join("");
  } else if (P.panel === "transcript") {
    b.innerHTML = P.scenes.map((s, i) => `<div class="vp-tr"><b data-v="go" data-i="${i}">${esc(s.title)}</b>${s.sents.map((x, j) => `<span class="${i === P.si && j === P.xi ? "cur" : ""}" data-v="seek" data-i="${i}" data-j="${j}">${esc(x)} </span>`).join("")}</div>`).join("");
    const cur = b.querySelector(".cur"); if (cur) cur.scrollIntoView({ block: "nearest" });
  } else {
    const l = P.rec.src && E.LMAP[(P.rec.src.kind === "lesson" ? P.rec.src.id : null) || (P.rec.objs && (E.objLessons[P.rec.objs[0]] || [])[0])];
    const tk = l ? (ARE.TAKEAWAYS[l.id] || l.takeaways || []) : [];
    b.innerHTML = (l ? `<p><b>${esc(l.title)}</b></p><ul>${tk.map(t => `<li>${esc(t)}</li>`).join("")}</ul><a href="#lesson-${l.id}" data-v="close">Open the lesson</a>` : "") + `<label class="f" style="margin-top:10px">My notes on this video<textarea id="vpNote" rows="6">${esc(E.S.notes["video:" + P.rec.id] || "")}</textarea></label>`;
    const ta = b.querySelector("#vpNote"); ta.addEventListener("input", () => { E.S.notes["video:" + P.rec.id] = ta.value; E.save(); });
  }
}
function speak() {
  const s = P.scenes[P.si]; const text = s.sents[P.xi];
  if (s.kind === "quiz" && P.xi >= s.sents.length - 1 && !s.qids.every(q => P.kc[q] !== undefined)) {
    // pause on the knowledge check until answered
    if (P.voice && text && !P.spokeQuiz) { P.spokeQuiz = true; say(text, () => {}); }
    return;
  }
  if (!text) { advance(); return; }
  if (P.voice) say(text, advance);
  else { clearTimeout(P.timer); P.timer = setTimeout(advance, Math.max(1500, words(text) / 150 * 60000 / P.rate)); }
}
function say(text, done) {
  stopAudio();
  const token = P.token = Math.random(); let fired = false; const fin = () => { if (fired) return; fired = true; done(); };
  P.cancelVoice = ARE.VOICE.speak(text, { rate: P.rate, onend: () => { if (P && P.token === token && P.playing) fin(); } });
  // watchdog: some browsers never fire onend
  clearTimeout(P.timer); P.timer = setTimeout(() => { if (P && P.token === token && P.playing && !speechSynthesis.speaking) fin(); }, words(text) / 150 * 60000 / P.rate + 4000);
}
function stopAudio() { clearTimeout(P && P.timer); if (canSpeak()) speechSynthesis.cancel(); }
function advance() {
  const s = P.scenes[P.si];
  if (P.xi < s.sents.length - 1) P.xi++;
  else if (P.si < P.scenes.length - 1) { P.si++; P.xi = 0; P.spokeQuiz = false; }
  else { finish(); return; }
  savePos(); render(); if (P.playing) speak();
}
function savePos() { P.rec.pos = P.si; P.rec.prog = (P.si + 1) / P.scenes.length; E.save(); }
function finish() {
  P.playing = false; stopAudio();
  if (!P.rec.done) { P.rec.done = Date.now(); E.touch(P.rec.objs || [], 2); L.addXP(20, "Video lesson completed"); }
  if (P.rec.planStep !== undefined && P.rec.planDay === E.dayKey(Date.now())) { L.completeStep(P.rec.planStep, P.rec.kc ? { n: P.rec.kc.n, ok: P.rec.kc.ok } : {}); delete P.rec.planStep; }
  P.rec.pos = 0; E.save(); render();
  ARE.H.toast("Video complete" + (P.rec.kc ? " · knowledge check " + P.rec.kc.ok + "/" + P.rec.kc.n : ""));
}
function toggle() { P.playing = !P.playing; if (P.playing) { if (P.si === 0 && P.xi === 0) savePos(); speak(); } else stopAudio(); render(); }
function goScene(i) { if (i < 0 || i >= P.scenes.length) return; stopAudio(); P.si = i; P.xi = 0; P.spokeQuiz = false; savePos(); render(); if (P.playing) speak(); }
function close() { if (!P) return; stopAudio(); P.playing = false; box.hidden = true; document.body.classList.remove("vp-open"); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); box.classList.remove("fs"); ARE.H.rerender && ARE.H.rerender(); }
function onClick(e) {
  const b = e.target.closest("[data-v]"); if (!b) return;
  const a = b.dataset.v;
  if (a === "close") close();
  else if (a === "play") toggle();
  else if (a === "prev") goScene(P.si - 1);
  else if (a === "next") goScene(P.si + 1);
  else if (a === "go") goScene(+b.dataset.i);
  else if (a === "seek") { stopAudio(); P.si = +b.dataset.i; P.xi = +b.dataset.j; savePos(); render(); if (P.playing) speak(); }
  else if (a === "cc") { P.cc = !P.cc; savePref(); render(); }
  else if (a === "voice") { P.voice = !P.voice; savePref(); if (P.playing) { stopAudio(); speak(); } render(); }
  else if (a === "bm") { P.rec.bm = !P.rec.bm; E.save(); render(); }
  else if (a === "tab") { P.panel = b.dataset.t; savePref(); renderSide(); }
  else if (a === "side") box.classList.toggle("side-open");
  else if (a === "fs") { const inner = box.querySelector(".vp-inner"); const req = inner.requestFullscreen || inner.webkitRequestFullscreen; if (document.fullscreenElement) document.exitFullscreen(); else if (req) { try { const r = req.call(inner); if (r && r.catch) r.catch(() => box.classList.toggle("fs")); } catch (x) { box.classList.toggle("fs"); } } else box.classList.toggle("fs"); }
  else if (a === "kc") {
    const q = E.QMAP[b.dataset.q], i = +b.dataset.i; if (P.kc[q.id] !== undefined) return;
    P.kc[q.id] = i; const ok = i === q.ans; E.record(q.id, ok, "video", { chosen: i });
    const s = P.scenes[P.si]; const answered = s.qids.filter(x => P.kc[x] !== undefined);
    if (answered.length === s.qids.length) { const okN = answered.filter(x => P.kc[x] === E.QMAP[x].ans).length; P.rec.kc = { n: answered.length, ok: okN, t: Date.now() }; E.save(); render(); if (P.playing) setTimeout(() => { if (P.playing) advance(); }, 1800); }
    else { E.save(); render(); }
  }
}

/* ---------- export for local MP4 rendering (tools/render_video.py) ---------- */
ST.exportJSON = (id) => {
  const rec = E.S.videos[id]; const scenes = ST.scenesFor(rec);
  return JSON.stringify({ format: "are-academy-storyboard", version: 1, title: rec.title, fmt: ST.FORMATS[rec.fmt].label, created: new Date().toISOString(), scenes: scenes.map(s => ({ kind: s.kind, title: s.title, sub: s.sub, bullets: s.bullets, table: s.table, rows: s.rows, left: s.left, right: s.right, steps: s.steps, svg: s.svg, tips: s.tips, items: s.items, narration: s.narration, sentences: s.sents, questions: s.kind === "quiz" ? s.qids.map(q => ({ q: strip(E.QMAP[q].q), opts: E.QMAP[q].opts.map(strip), ans: E.QMAP[q].ans })) : undefined })) }, null, 1);
};
/* recommendations: videos worth making from current weak spots */
ST.recommend = () => {
  const out = [];
  L.activeNotes().slice(0, 4).forEach(n => { if (!Object.values(E.S.videos).some(v => v.src.kind === "note" && v.src.id === n.obj && v.created > n.updated)) out.push({ src: { kind: "note", id: n.obj }, fmt: "remedial", why: "You've struggled with " + ARE.DIV[ARE.OBJ[n.obj].div].code + " " + ARE.OBJ[n.obj].code, t: "Remedial · " + short(ARE.OBJ[n.obj].title, 60) }); });
  const rec = E.recommend().find(r => r.act && r.act.a === "lesson"); if (rec && E.LMAP[rec.act.id]) out.push({ src: { kind: "lesson", id: rec.act.id }, fmt: "standard", why: "Next lesson in your plan", t: E.LMAP[rec.act.id].title });
  return out.slice(0, 5);
};
})();
