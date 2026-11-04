/* ============================================================
   AI: real language-model providers + context-aware tutor
   Providers (all free to use; nothing is simulated):
   - claude  : Claude via the artifact "sample" capability (inside claude.ai only;
               uses the viewer's own Claude plan, asks permission on first use)
   - gemini  : Google Gemini API free tier with your own key (installed app)
   - openai  : any OpenAI-compatible endpoint — Ollama/LM Studio on your computer,
               or a free hosted tier such as Groq (installed app)
   If no provider is connected the tutor says so and offers setup; it never
   returns canned answers.
   ============================================================ */
(function () {
const E = ARE.E, L = ARE.L, AI = ARE.AI = {};
const CFG_KEY = "are-ai-config";
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const strip = L.strip;

/* ---------- configuration (device-local; never synced or exported) ---------- */
AI.cfg = (() => { try { return Object.assign({ provider: "auto", gemini: { key: "", model: "gemini-flash-latest" }, openai: { base: "http://localhost:11434/v1", key: "", model: "llama3.2" } }, JSON.parse(localStorage.getItem(CFG_KEY) || "{}")); } catch (e) { return { provider: "auto", gemini: { key: "", model: "gemini-flash-latest" }, openai: { base: "http://localhost:11434/v1", key: "", model: "llama3.2" } }; } })();
AI.saveCfg = () => { try { localStorage.setItem(CFG_KEY, JSON.stringify(AI.cfg)); } catch (e) {} };
AI.sample = null; AI.sampleState = "checking"; // checking | ready | none | denied
AI.init = async () => {
  if (window.claude && window.claude.use) {
    try { AI.sample = await window.claude.use("sample"); } catch (e) { AI.sample = null; }
  }
  AI.sampleState = AI.sample ? "ready" : "none";
  AI.onChange && AI.onChange();
};
AI.active = () => {
  const c = AI.cfg;
  if (c.provider === "claude" || c.provider === "auto") { if (AI.sample && AI.sampleState === "ready") return "claude"; if (c.provider === "claude") return null; }
  if ((c.provider === "gemini" || c.provider === "auto") && c.gemini.key) return "gemini";
  if ((c.provider === "openai" || c.provider === "auto") && c.openai.base && c.openai.model && (c.provider === "openai" || c.openai.ok)) return "openai";
  return null;
};
AI.label = (p) => ({ claude: "Claude (your Claude plan)", gemini: "Gemini API · " + AI.cfg.gemini.model, openai: "OpenAI-compatible · " + AI.cfg.openai.model })[p] || "Not connected";

/* ---------- transport ---------- */
async function readSSE(res, onLine, signal) {
  const rd = res.body.getReader(), dec = new TextDecoder(); let buf = "";
  while (true) {
    if (signal && signal.aborted) { try { rd.cancel(); } catch (e) {} throw { code: "cancelled" }; }
    const { value, done } = await rd.read(); if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split(/\r?\n/); buf = lines.pop();
    lines.forEach(l => { if (l.startsWith("data:")) onLine(l.slice(5).trim()); });
  }
  if (buf.startsWith("data:")) onLine(buf.slice(5).trim());
}
/* turns: [{role:"user"|"assistant", content}], rules: string */
AI.call = async (rules, turns, opt = {}) => {
  const p = AI.active();
  if (!p) throw { code: "no_provider", message: "No AI provider is connected." };
  let text = "";
  const emit = (t) => { text = t; opt.onText && opt.onText(text); };
  if (p === "claude") {
    const input = [{ role: "user", content: rules }, ...turns];
    const r = await AI.sample(input, { onText: ({ text }) => emit(text), signal: opt.signal, cache: false, modelTier: opt.tier || "default" });
    return { text: r.text, provider: p, truncated: r.truncated };
  }
  if (p === "gemini") {
    const g = AI.cfg.gemini;
    const body = { systemInstruction: { parts: [{ text: rules }] }, contents: turns.map(t => ({ role: t.role === "assistant" ? "model" : "user", parts: [{ text: t.content }] })), generationConfig: { temperature: 0.4 } };
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(g.model) + ":streamGenerateContent?alt=sse", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": g.key }, body: JSON.stringify(body), signal: opt.signal });
    if (!res.ok) { const e = await res.text().catch(() => ""); throw { code: res.status === 429 ? "rate_limited" : "http_" + res.status, message: e.slice(0, 300) }; }
    await readSSE(res, (d) => { try { const j = JSON.parse(d); const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || []; const add = parts.map(x => x.text || "").join(""); if (add) emit(text + add); } catch (e) {} }, opt.signal);
    return { text, provider: p };
  }
  if (p === "openai") {
    const o = AI.cfg.openai;
    const headers = { "Content-Type": "application/json" }; if (o.key) headers.Authorization = "Bearer " + o.key;
    const res = await fetch(o.base.replace(/\/$/, "") + "/chat/completions", { method: "POST", headers, body: JSON.stringify({ model: o.model, stream: true, temperature: 0.4, messages: [{ role: "system", content: rules }, ...turns] }), signal: opt.signal });
    if (!res.ok) { const e = await res.text().catch(() => ""); throw { code: res.status === 429 ? "rate_limited" : "http_" + res.status, message: e.slice(0, 300) }; }
    await readSSE(res, (d) => { if (d === "[DONE]") return; try { const j = JSON.parse(d); const add = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content; if (add) emit(text + add); } catch (e) {} }, opt.signal);
    return { text, provider: p };
  }
};
AI.json = async (rules, prompt, opt = {}) => {
  if (AI.active() === "claude" && AI.sample && AI.sample.json) {
    return AI.sample.json([{ role: "user", content: rules }, { role: "user", content: prompt }], { signal: opt.signal, modelTier: opt.tier || "default", cache: false });
  }
  const r = await AI.call(rules, [{ role: "user", content: prompt + "\n\nReply with only the JSON value, no other text." }], opt);
  const t = r.text.trim(); const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence ? fence[1] : t.slice(Math.min(...["{", "["].map(c => t.indexOf(c)).filter(i => i >= 0)), Math.max(t.lastIndexOf("}"), t.lastIndexOf("]")) + 1);
  try { return JSON.parse(raw); } catch (e) { throw { code: "invalid_json", message: "The model did not return valid JSON.", text: t }; }
};
AI.test = async () => {
  const r = await AI.call("You are a connection test.", [{ role: "user", content: "Reply with exactly: OK" }]);
  return r.text.trim().slice(0, 60);
};
AI.listGemini = async () => {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=100", { headers: { "x-goog-api-key": AI.cfg.gemini.key } });
  if (!res.ok) throw { code: "http_" + res.status, message: (await res.text()).slice(0, 200) };
  const j = await res.json();
  return (j.models || []).filter(m => (m.supportedGenerationMethods || []).includes("generateContent")).map(m => m.name.replace(/^models\//, ""));
};
AI.errText = (e) => {
  const c = e && e.code;
  if (c === "no_provider") return "No AI provider is connected. Open Settings → AI tutor to connect one (all options are free).";
  if (c === "not_granted") return "Claude access was declined for this page. Reload the page to be asked again, or connect another provider in Settings.";
  if (c === "rate_limited") return "The AI service is rate-limiting requests (free-tier limit or your plan's usage limit). Try again in a little while.";
  if (c === "sampling_disabled") return "Claude isn't available for this account here.";
  if (c === "cancelled") return "Stopped.";
  if (c === "refused") return "The model declined that request. Try rephrasing.";
  if (c === "invalid_json") return "The model's reply wasn't in the expected format. Try again.";
  if (e instanceof TypeError || (e && /fetch|network|Load failed/i.test(e.message || ""))) return "Couldn't reach the AI service (network, CORS or offline). Live AI needs a connection; everything else works offline.";
  return "The AI request failed" + (e && e.message ? ": " + String(e.message).slice(0, 160) : ".");
};

/* ---------- grounding: what the tutor knows about the current page and the learner ---------- */
AI.context = () => {
  const C = ARE.CTX || {}; const out = { label: "General ARE study", parts: [], obj: null, lesson: null, q: null, div: C.div || null };
  if (C.lesson && E.LMAP[C.lesson]) {
    const l = E.LMAP[C.lesson]; out.lesson = l.id; out.obj = (l.obj || [])[0]; out.div = l.div;
    out.label = "Lesson · " + l.title;
    out.parts.push("CURRENT LESSON: " + l.title + " (" + ARE.DIV[l.div].code + ")\nObjectives: " + (l.obj || []).map(k => ARE.DIV[ARE.OBJ[k].div].code + " " + ARE.OBJ[k].code + " " + ARE.OBJ[k].title).join("; ") +
      "\nSummary: " + l.summary + "\nLesson text (course material, verified):\n" + strip(l.body).slice(0, 7000) +
      "\nKey takeaways: " + (ARE.TAKEAWAYS[l.id] || l.takeaways || []).join(" | ") +
      ((l.formulas || []).length ? "\nFormulas: " + l.formulas.map(f => f.name + ": " + f.f).join(" | ") : "") +
      "\nHow it is tested: " + l.exam + "\nCommon mistakes: " + (l.mistakes || []).join(" | ") +
      "\nReferences for this lesson: " + (l.refs || []).map(r => r.t).join(" | "));
  }
  if (C.qid && E.QMAP[C.qid]) {
    const q = E.QMAP[C.qid]; out.q = q.id; out.obj = q.obj; out.div = q.div;
    out.label = "Question · " + ARE.DIV[q.div].code + " " + ARE.OBJ[q.obj].code;
    const answered = !!C.answered;
    out.parts.push("CURRENT QUESTION (" + (answered ? "the learner has answered" : "NOT YET ANSWERED — do not reveal the answer unless the learner explicitly asks for the full explanation") + "):\n" + strip(q.q) +
      (q.opts ? "\nOptions: " + q.opts.map((o, i) => String.fromCharCode(65 + i) + ") " + strip(o)).join("  ") : "") +
      "\nCorrect answer (for your reasoning): " + (q.type === "mc" ? String.fromCharCode(65 + q.ans) + ") " + strip(q.opts[q.ans]) : q.type === "ms" ? q.ans.map(i => String.fromCharCode(65 + i)).join(", ") : q.type === "calc" ? q.ans + " " + (q.unit || "") : String(q.ans)) +
      "\nCourse explanation (verified): " + strip(q.explain) +
      (q.why ? "\nWhy each option is right/wrong: " + q.why.map((w, i) => String.fromCharCode(65 + i) + ": " + w).join(" | ") : "") +
      (C.chosen !== undefined && C.chosen !== null && q.opts ? "\nThe learner chose: " + String.fromCharCode(65 + C.chosen) + ") " + strip(q.opts[C.chosen]) : "") +
      (q.ref ? "\nReference: " + q.ref : ""));
    if (!out.lesson && q.lesson && E.LMAP[q.lesson]) { const l = E.LMAP[q.lesson]; out.parts.push("RELATED LESSON: " + l.title + " — " + l.summary + "\nTakeaways: " + (ARE.TAKEAWAYS[l.id] || l.takeaways || []).join(" | ")); }
  }
  if (!out.lesson && !out.q && C.div && ARE.DIV[C.div]) { const d = ARE.DIV[C.div]; out.label = "Division · " + d.code; out.parts.push("CURRENT DIVISION: " + d.code + " " + d.name + "\nSections: " + d.sections.map(s => s.n + " " + s.name + " (" + s.w[0] + "–" + s.w[1] + "%)").join("; ")); }
  if (C.note && E.S.lnotes[C.note]) { out.obj = C.note; out.label = "Learning note · " + ARE.OBJ[C.note].div.toUpperCase() + " " + ARE.OBJ[C.note].code; }
  if (C.caseId) { const c = ARE.CASES.find(x => x.id === C.caseId); if (c) out.parts.push("CASE STUDY: " + c.title + " — " + c.brief + "\nResources: " + c.resources.map(r => r.name + ": " + strip(r.html).slice(0, 1200)).join("\n")); }
  if (C.page === "reference") out.label = "Reference library";
  // learner profile
  const weak = Object.keys(ARE.OBJ).map(k => E.comp(k)).filter(c => c.n >= 3).sort((a, b) => a.score - b.score).slice(0, 5);
  const prof = ["LEARNER PROFILE:"];
  if (weak.length) prof.push("Weakest objectives: " + weak.map(c => ARE.DIV[ARE.OBJ[c.key].div].code + " " + ARE.OBJ[c.key].code + " (" + Math.round(c.score * 100) + "%)").join(", "));
  if (out.obj) {
    const c = E.comp(out.obj); prof.push("On this objective: " + c.n + " answers, " + (c.score === null ? "no score" : Math.round(c.score * 100) + "% weighted") + ", level " + E.LV[c.level] + ".");
    const n = E.S.lnotes[out.obj];
    if (n) {
      const b = L.buildNote(n);
      if (b.misunderstood.length) prof.push("Past mistakes on this objective: " + b.misunderstood.slice(0, 3).map(m => "Q: " + m.stem.slice(0, 140) + (m.chosen ? " → chose “" + m.chosen.slice(0, 80) + "”" : "") + (m.conf === 3 ? " (was confident)" : "")).join(" || "));
      if (n.triggers.some(t => t.kind === "confused")) prof.push("The learner marked this concept as confusing.");
      if (n.comment || n.edit) prof.push("Learner's own note: " + (n.edit || n.comment).slice(0, 600));
    }
    const used = ((E.S.ailog._modes || {})[out.obj] || []).slice(-4);
    if (used.length) prof.push("Explanations already given for this concept used: " + used.join(", ") + ". The learner still needs help, so use a DIFFERENT teaching approach (new analogy, worked example, visual, or comparison) rather than repeating.");
  }
  if (C.lesson && E.S.notes["lesson:" + C.lesson]) prof.push("Learner's lesson notes: " + E.S.notes["lesson:" + C.lesson].slice(0, 600));
  out.parts.push(prof.join("\n"));
  return out;
};
AI.RULES = `You are the ARE Academy tutor: a patient, rigorous architecture tutor helping one candidate prepare for NCARB's ARE 5.0.
Rules:
- Teach actively. Prefer questions, hints and steps over long lectures. Keep answers focused (usually under 250 words unless asked for depth).
- Ground answers in the COURSE MATERIAL provided below. When you go beyond it, say so with the label "General explanation".
- Never invent code section numbers, table numbers, AIA document article/clause numbers, NCARB objective wording, statistics, or quotations. If you are not certain of a citation, tell the learner which source to check (e.g. "verify in IBC 2021 Chapter 10" only if that chapter is given in the material) instead of guessing.
- The ARE tests US practice (IBC, AIA documents). The learner also works under Ontario/Canadian practice (OBC, CCDC); keep those distinct and label any Canadian comparison as not on the ARE.
- Use plain construction-document language. Use Markdown: short paragraphs, bullet lists, **bold** for key terms, tables when comparing.
- For a process or sequence you may include a flowchart block exactly like:
\`\`\`flow
Step one -> Step two -> Step three
\`\`\`
- End every answer with one line starting "Sources:" listing only the course lesson, objective or reference named in the material that you relied on, or "General explanation — verify in the primary source" if none.`;
AI.MODES = {
  simple: { t: "Explain simply", p: "Explain this as if I'm learning it for the first time. Use an everyday analogy, then the precise definition. Finish with one quick check question for me." },
  practice: { t: "Architect's perspective", p: "Explain how this concept is applied in real architectural practice on a project: who does what, when, and what goes wrong. Use a concrete project example." },
  exam: { t: "Exam perspective", p: "Explain how NCARB is likely to test this: typical question setups, the distinctions they probe, common distractors and traps, and how to eliminate wrong answers." },
  steps: { t: "Step-by-step", p: "Walk me through this step by step (a calculation, process or problem). Number the steps, show the working and units, and pause with a check question at the key step." },
  compare: { t: "Compare & contrast", p: "Compare this concept with the one it is most easily confused with. Give a comparison table (rows: definition, who/when, purpose, consequence, exam clue) and a memory hook." },
  visual: { t: "Visual explanation", p: "Explain this visually: give a flowchart block and/or a comparison table, plus a short description of the diagram I should picture or sketch. Point to the lesson's diagram if relevant." },
  test: { t: "Test my understanding", p: "Test my understanding. Ask me ONE question at a time (start with recall, then application). Wait for my answer, tell me if I'm right and why, then ask the next. Start now with question 1." },
  hint: { t: "Hint", p: "Give me a single hint for the current question without revealing the answer or eliminating options outright. One or two sentences." },
  guide: { t: "Guide me", p: "Guide me through the reasoning for the current question with Socratic questions. Do not give the answer; ask me what I think at each step." },
  full: { t: "Full explanation", p: "Give the full explanation for the current question: the correct answer, why it is correct, and why each other option is wrong. Then ask me one elaborative 'why' question." },
  why: { t: "Why are the others wrong?", p: "For the current question, explain why each wrong option is wrong and what misconception would lead someone to choose it." }
};

/* ---------- conversation log (persisted per context, trimmed) ---------- */
AI.ctxKey = (ctx) => ctx.q ? "q:" + ctx.q : ctx.lesson ? "l:" + ctx.lesson : ctx.obj ? "o:" + ctx.obj : ctx.div ? "d:" + ctx.div : "general";
AI.log = (key) => { const L0 = E.S.ailog; return L0[key] = L0[key] || []; };
AI.pushLog = (key, turn) => { const a = AI.log(key); a.push(turn); if (a.length > 24) a.splice(0, a.length - 24); const keys = Object.keys(E.S.ailog).filter(k => k !== "_modes"); if (keys.length > 60) delete E.S.ailog[keys[0]]; E.save(); };
AI.noteMode = (obj, mode) => { if (!obj) return; const M = E.S.ailog._modes = E.S.ailog._modes || {}; (M[obj] = M[obj] || []).push(mode); if (M[obj].length > 8) M[obj] = M[obj].slice(-8); };

/* ---------- generators that write into the app ---------- */
AI.generateQuestions = async (ctx, n = 4, signal) => {
  const obj = ctx.obj || (ctx.lesson && E.LMAP[ctx.lesson].obj[0]);
  if (!obj) throw { code: "no_context", message: "Open a lesson, question or note first so I know the topic." };
  const o = ARE.OBJ[obj];
  const rules = AI.RULES + "\n\n" + ctx.parts.join("\n\n");
  const prompt = `Write ${n} original ARE-style multiple-choice practice questions for objective ${ARE.DIV[o.div].code} ${o.code}: "${o.title}". Base every fact on the COURSE MATERIAL above; do not cite section numbers that are not in it. Target the learner's past mistakes if listed. Vary difficulty (1 = recall, 2 = application, 3 = scenario).
Return a JSON array of objects: {"q": stem, "opts": [4 strings], "ans": index 0-3, "why": [4 strings explaining each option], "explain": short explanation, "diff": 1|2|3}.`;
  const arr = await AI.json(rules, prompt, { signal });
  if (!Array.isArray(arr)) throw { code: "invalid_json", message: "Expected a list of questions." };
  const t = Date.now(), lesson = (E.objLessons[obj] || [])[0];
  const qs = arr.filter(x => x && typeof x.q === "string" && Array.isArray(x.opts) && x.opts.length >= 3 && x.opts.length <= 5 && Number.isInteger(x.ans) && x.ans >= 0 && x.ans < x.opts.length).slice(0, 8).map((x, i) => ({
    id: "ai-" + t + "-" + i, div: o.div, obj, lesson, type: "mc", diff: [1, 2, 3].includes(x.diff) ? x.diff : 2, fmt: "AI-generated · verify",
    q: esc(x.q), opts: x.opts.map(s => esc(String(s))), ans: x.ans, why: Array.isArray(x.why) ? x.why.map(s => esc(String(s))) : null,
    explain: esc(String(x.explain || "")) + " <em>(AI-generated practice item: check against the lesson and primary sources.)</em>", ref: "AI-generated from course material for " + ARE.DIV[o.div].code + " " + o.code, ai: true
  }));
  if (!qs.length) throw { code: "invalid_json", message: "No usable questions came back." };
  E.S.packs.questions = (E.S.packs.questions || []).concat(qs).slice(-300);
  E.rebuild(); E.save();
  return qs.map(q => q.id);
};
AI.enrichNote = async (obj, signal, onText) => {
  const n = E.S.lnotes[obj]; if (!n) throw { code: "no_context" };
  const b = L.buildNote(n);
  ARE.CTX = Object.assign({}, ARE.CTX, { note: obj, lesson: b.lesson && b.lesson.id });
  const ctx = AI.context();
  const used = ((E.S.ailog._modes || {})[obj] || []);
  const prompt = `Write a personalized study note for me on "${b.concept.code}: ${b.concept.title}". My specific mistakes are in the learner profile. Structure: **What I misunderstood** (name the underlying misconception, not just the wrong answer), **The correct idea**, **In plain words** (2 sentences), **On a real project**, **How the ARE tests it**, **Remember** (3-5 bullets), and a \`flow\` block or table if it helps. ${used.length ? "Use a different teaching approach than before (" + used.join(", ") + ")." : ""}`;
  const r = await AI.call(AI.RULES + "\n\n" + ctx.parts.join("\n\n"), [{ role: "user", content: prompt }], { signal, onText });
  n.ai.push({ t: Date.now(), text: r.text, provider: r.provider }); if (n.ai.length > 6) n.ai = n.ai.slice(-6);
  AI.noteMode(obj, "personal note"); E.save();
  return r.text;
};
/* AI-written video script grounded in course material (Video Studio) */
AI.videoScript = async (src, fmt, signal) => {
  const rules = AI.RULES + "\n\nCOURSE MATERIAL FOR THE VIDEO:\n" + src.material.slice(0, 14000);
  const prompt = `Write the narration for a ${fmt.label} educational video titled "${src.title}" (target ${fmt.min}–${fmt.max} minutes at about 150 words per minute). Follow this structure: Introduction (why it matters for the ARE), Core concepts, Visual explanation (refer to the diagram if one is provided), Practical application on a real project, ARE exam relevance, Common mistakes, and a closing recap. Use only facts from the course material; no invented code sections.
Return JSON: {"scenes":[{"kind":"title|bullets|diagram|compare|flow|recap","title": string,"bullets":[up to 5 short strings],"narration": string}]}`;
  const j = await AI.json(rules, prompt, { signal, tier: "default" });
  if (!j || !Array.isArray(j.scenes)) throw { code: "invalid_json", message: "No scenes returned." };
  return j.scenes.filter(s => s && s.narration).slice(0, 24).map(s => ({ kind: ["title", "bullets", "diagram", "compare", "flow", "recap"].includes(s.kind) ? s.kind : "bullets", title: String(s.title || "").slice(0, 120), bullets: (Array.isArray(s.bullets) ? s.bullets : []).map(String).slice(0, 6), narration: String(s.narration).slice(0, 2000) }));
};

/* ---------- Markdown (escaped first, then a small safe subset) ---------- */
AI.md = (src) => {
  const blocks = []; let s = String(src || "");
  s = s.replace(/```flow\s*([\s\S]*?)```/g, (m, b) => { blocks.push(flowSVG(b)); return "\u0000" + (blocks.length - 1) + "\u0000"; });
  s = s.replace(/```[a-z]*\s*([\s\S]*?)```/g, (m, b) => { blocks.push("<pre class=\"code\">" + esc(b) + "</pre>"); return "\u0000" + (blocks.length - 1) + "\u0000"; });
  const lines = esc(s).split(/\n/); const out = []; let list = null, table = null;
  const inline = (t) => t.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<i>$2</i>").replace(/`([^`]+)`/g, "<code>$1</code>");
  const flush = () => { if (list) { out.push("<" + list.t + ">" + list.items.map(i => "<li>" + inline(i) + "</li>").join("") + "</" + list.t + ">"); list = null; } if (table) { const rows = table.filter(r => !/^\s*\|?\s*:?-{2,}/.test(r)); out.push("<div class=\"scroll\"><table class=\"tbl\">" + rows.map((r, i) => "<tr>" + r.replace(/^\s*\||\|\s*$/g, "").split("|").map(c => i === 0 ? "<th>" + inline(c.trim()) + "</th>" : "<td>" + inline(c.trim()) + "</td>").join("") + "</tr>").join("") + "</table></div>"); table = null; } };
  lines.forEach(l => {
    if (/^\s*\|.*\|\s*$/.test(l)) { if (list) flush(); (table = table || []).push(l); return; } else if (table) flush();
    let m;
    if ((m = l.match(/^\s*[-*•]\s+(.*)/))) { if (!list || list.t !== "ul") { flush(); list = { t: "ul", items: [] }; } list.items.push(m[1]); return; }
    if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (!list || list.t !== "ol") { flush(); list = { t: "ol", items: [] }; } list.items.push(m[1]); return; }
    flush();
    if ((m = l.match(/^#{1,4}\s+(.*)/))) out.push("<h4>" + inline(m[1]) + "</h4>");
    else if (/^\u0000\d+\u0000$/.test(l.trim())) out.push(l.trim());
    else if (l.trim()) out.push("<p>" + inline(l) + "</p>");
  });
  flush();
  return out.join("").replace(/\u0000(\d+)\u0000/g, (m, i) => blocks[+i]);
};
function flowSVG(src) {
  const steps = src.split(/->|→|\n/).map(x => x.trim()).filter(Boolean).slice(0, 8);
  if (!steps.length) return "";
  const w = 150, h = 62, gap = 26, W = steps.length * w + (steps.length - 1) * gap;
  const wrap = (t) => { const words = t.split(/\s+/); const ls = [""]; words.forEach(x => { if ((ls[ls.length - 1] + " " + x).trim().length > 20) ls.push(x); else ls[ls.length - 1] = (ls[ls.length - 1] + " " + x).trim(); }); return ls.slice(0, 3); };
  return `<div class="scroll"><svg class="flow" viewBox="0 0 ${W} ${h + 4}" style="min-width:${Math.min(W, 640)}px" role="img" aria-label="Flowchart: ${esc(steps.join(", then "))}">${steps.map((t, i) => { const x = i * (w + gap); const ls = wrap(t); return `<g><rect x="${x + 1}" y="2" width="${w - 2}" height="${h}" rx="8" class="fl-box"/>${ls.map((ln, j) => `<text x="${x + w / 2}" y="${2 + h / 2 + (j - (ls.length - 1) / 2) * 14 + 4}" text-anchor="middle" class="fl-t">${esc(ln)}</text>`).join("")}${i < steps.length - 1 ? `<path d="M${x + w + 3} ${2 + h / 2}h${gap - 8}" class="fl-a"/><path d="M${x + w + gap - 5} ${2 + h / 2 - 5}l6 5-6 5" class="fl-a"/>` : ""}</g>`; }).join("")}</svg></div>`;
}
AI.flowSVG = flowSVG;
})();
