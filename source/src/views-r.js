/* ============================================================
   VIEWS-R: Readiness reports (v20)
   ============================================================ */
(function () {
const E = ARE.E, R = ARE.R, H = ARE.H;
const { esc, pct, fmtDate, bar, objLabel } = H;
const DAY = 864e5;
const minutes = (t) => { const m = /(\d+)\s*h\s*(\d+)?/.exec(t || ""); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : null; };
const pill = (st) => `<span class="st-pill ${R.STATUS[st].cls}" title="${esc(R.STATUS[st].d)}">${R.STATUS[st].t}</span>`;
const ago = (t) => { if (!t) return "never"; const d = Math.floor((Date.now() - t) / DAY); return d === 0 ? "today" : d === 1 ? "yesterday" : d + " days ago"; };
const secFmt = (s) => s === null || s === undefined ? "—" : s < 90 ? Math.round(s) + " s" : (s / 60).toFixed(1) + " min";

function spark(arr, idx, color) {
  if (!arr || arr.length < 2) return `<p class="muted" style="font-size:var(--t-sm);margin:0">The trend appears after you study on two or more days.</p>`;
  const W = 320, Hh = 70, n = arr.length, xs = (i) => 6 + i * (W - 12) / (n - 1), ys = (v) => Hh - 6 - v * (Hh - 12);
  const pts = arr.map((r, i) => xs(i).toFixed(1) + "," + ys(r[idx]).toFixed(1)).join(" ");
  return `<svg viewBox="0 0 ${W} ${Hh}" class="spark" role="img" aria-label="Trend from ${arr[0][0]} to ${arr[n - 1][0]}: ${pct(arr[0][idx])} to ${pct(arr[n - 1][idx])}"><line x1="6" x2="${W - 6}" y1="${ys(0.75)}" y2="${ys(0.75)}" stroke="var(--line)" stroke-dasharray="3 3"/><polyline fill="none" stroke="${color}" stroke-width="2.5" points="${pts}"/><circle cx="${xs(n - 1)}" cy="${ys(arr[n - 1][idx])}" r="4" fill="${color}"/></svg><div class="row between muted" style="font-size:var(--t-sm)"><span>${arr[0][0]}</span><span>${arr[n - 1][0]}</span></div>`;
}
function distBar(dist, total) {
  const order = ["retained", "applied", "recall", "weak", "thin", "none"];
  return `<div class="stbar" role="img" aria-label="${order.map(s => dist[s] + " " + R.STATUS[s].t).join(", ")}">${order.map(s => dist[s] ? `<span class="${R.STATUS[s].cls}" style="flex:${dist[s]}" title="${dist[s]} · ${R.STATUS[s].t}"></span>` : "").join("")}</div>
<div class="stlegend">${order.map(s => `<span><i class="${R.STATUS[s].cls}"></i>${R.STATUS[s].t} <b>${dist[s]}</b></span>`).join("")}</div>`;
}
function recoBtns(key) {
  return R.recommend(key).map(r => r.href ? `<a class="btn small" href="${r.href}">${esc(r.t)}</a>` : `<button class="btn small" data-act="${r.act}" data-obj="${key}">${esc(r.t)}</button>`).join("");
}
const method = `<details class="panel"><summary><b>How this is worked out</b></summary><div class="prose" style="margin-top:10px">
<p><b>Learning progress</b> counts what you have done: lessons completed, questions seen, objectives practised. <b>Readiness evidence</b> asks what your answers show you can do. They are kept apart because finishing lessons is not the same as being able to answer exam questions.</p>
<p>Each question is classed by what it asks you to do: <b>recall</b> a fact, <b>apply</b> a rule or calculation, <b>analyze</b> a drawing, document or case, or make a <b>professional judgment</b>. An objective counts as <b>demonstrated</b> when you have at least 4 answers over 2 or more days, recent weighted accuracy of at least 60%, at least 2 correct application-level answers with 65%+ accuracy at that level, and fewer than 2 unresolved misconceptions. It counts as <b>retained</b> when, in addition, questions you got right were answered correctly again 7 or more days later.</p>
<p>A <b>misconception</b> is a question you answered wrong while marking yourself sure, or where you chose the same wrong answer twice, and have not since answered correctly. Topics not practised for 21 days are flagged for a retention check.</p>
<p>The evidence figure weights each objective by its share of the division in NCARB's exam guidelines: retained 100%, demonstrated 80%, recall only 40%, not yet understood 15%, insufficient evidence 10%, no evidence 0.</p>
<p><b>This is not a pass probability.</b> NCARB reports a scaled pass/fail result against a cut score it does not publish per item, and practice questions here are not calibrated against real exam items, so no honest conversion exists. Use the report to decide what to study; use full-length timed practice exams (including NCARB's own) as the closest check of exam conditions.</p></div></details>`;

function vReadiness(divId) {
  R.snapshot();
  const tabs = `<nav class="row rtabs" aria-label="Division">${[["", "All divisions"]].concat(ARE.DIVISIONS.map(d => [d.id, d.code])).map(([k, t]) => `<a class="chip ${(divId || "") === k ? "on" : ""}" href="#readiness${k ? "-" + k : ""}">${t}</a>`).join("")}</nav>`;
  if (!divId) {
    const reps = ARE.DIVISIONS.map(d => R.div(d.id));
    return `<div class="stack" style="gap:6px"><span class="eyebrow">Progress</span><h1>Readiness</h1><p class="muted" style="max-width:72ch;margin:0">What you have done, and what your answers show you can do, for each division and NCARB objective. No pass probability is given; see how this is worked out below.</p></div>${tabs}
<div class="scroll"><table class="tbl rtbl"><thead><tr><th>Division</th><th>Learning progress</th><th>Readiness evidence</th><th>Gaps</th><th>Misconceptions</th><th>Last timed exam</th></tr></thead><tbody>
${reps.map(r => `<tr><td><a href="#readiness-${r.d.id}"><b>${r.d.code}</b> ${esc(r.d.name)}</a></td><td>${r.progress.lessons[0]}/${r.progress.lessons[1]} lessons<br><span class="muted">${r.progress.questions[0]}/${r.progress.questions[1]} questions seen</span></td><td style="min-width:150px">${bar(r.evidence)}<span class="muted">${pct(r.evidence)} · ${R.evidenceLabel(r.evidence)}</span></td><td>${r.gaps.length}/${r.objs.length}</td><td>${r.misconceptions.length}</td><td>${r.lastExam ? pct(r.lastExam.correct / r.lastExam.n) + `<br><span class="muted">${ago(r.lastExam.t)}</span>` : `<span class="muted">none</span>`}</td></tr>`).join("")}
</tbody></table></div>
${method}`;
  }
  const r = R.div(divId), d = r.d;
  const pace = minutes(d.time) && d.items ? minutes(d.time) * 60 / d.items : null;
  const tr = (E.S.rtrend || {})[divId] || [];
  const lvRows = Object.entries(R.LEVELS).map(([k, t]) => { const [n, ok] = r.lv[k]; return `<tr><td>${t}</td><td>${n}</td><td>${n ? pct(ok / n) : "—"}</td><td style="min-width:120px">${n ? bar(ok / n) : ""}</td></tr>`; }).join("");
  const recallVsHi = (() => { const lo = r.lv.recall, hi = ["apply", "analyze", "judge"].reduce((s, k) => [s[0] + r.lv[k][0], s[1] + r.lv[k][1]], [0, 0]); if (lo[0] < 5 || hi[0] < 5) return "Answer more questions at each level to compare recall with application."; const a = lo[1] / lo[0], b = hi[1] / hi[0]; return a - b > 0.15 ? `You recall facts (${pct(a)}) better than you apply them (${pct(b)}). Spend time on scenarios, calculations and case questions rather than re-reading.` : b - a > 0.1 ? `You apply concepts (${pct(b)}) better than you recall exact facts (${pct(a)}). Flashcards and the key-term lists will help.` : `Recall (${pct(a)}) and application (${pct(b)}) are balanced.`; })();
  return `<div class="stack" style="gap:6px"><a href="#readiness" class="muted" style="font-size:.9rem">← All divisions</a><span class="eyebrow">${d.code} · Readiness report</span><h1>${esc(d.name)}</h1></div>${tabs}
<div class="grid g2">
<section class="panel stack"><span class="eyebrow">Learning progress</span><div class="kv"><div><b>${r.progress.lessons[0]}/${r.progress.lessons[1]}</b><span>lessons completed</span></div><div><b>${r.progress.questions[0]}/${r.progress.questions[1]}</b><span>questions seen</span></div><div><b>${r.progress.objectivesPracticed}/${r.objs.length}</b><span>objectives practised</span></div></div>${spark(tr, 2, "var(--muted)")}</section>
<section class="panel stack"><span class="eyebrow">Readiness evidence</span><div class="row between"><b style="font-size:1.6rem">${pct(r.evidence)}</b><span class="muted">${R.evidenceLabel(r.evidence)} · weighted by NCARB objective share</span></div>${bar(r.evidence)}${distBar(r.dist)}${spark(tr, 1, "var(--accent)")}</section>
</div>
<div class="grid g2">
<section class="panel stack"><h2>Understanding vs. memorizing</h2><div class="scroll"><table class="tbl"><thead><tr><th>Question level</th><th>Answers</th><th>Accuracy</th><th></th></tr></thead><tbody>${lvRows}</tbody></table></div><p style="margin:0">${recallVsHi}</p></section>
<section class="panel stack"><h2>Exam conditions</h2>
<p style="margin:0"><b>Pace.</b> Your median time per question in this division is <b>${secFmt(r.medSec)}</b>${pace ? `; the exam allows about <b>${secFmt(pace)}</b> per item (${d.items} items in ${esc(d.time)}), including case studies` : ""}.${r.medSec && pace ? (r.medSec > pace ? " You are slower than exam pace; practise timed sets." : " You are within exam pace.") : ""}</p>
<p style="margin:0"><b>Last full timed exam.</b> ${r.lastExam ? `${pct(r.lastExam.correct / r.lastExam.n)} (${r.lastExam.correct}/${r.lastExam.n}), ${ago(r.lastExam.t)}.` : "None yet. A full-length timed form is the closest practice to the real exam."}</p>
<div class="row"><a class="btn small" href="#exams">Practice exams</a></div></section>
</div>
${r.gaps.length ? `<section class="panel stack"><h2>Not yet demonstrated <small class="muted" style="font-weight:400">highest exam weight first</small></h2><div class="list">${r.gaps.slice(0, 12).map(({ o, e }) => `<div class="stack gap-row" style="gap:6px"><div class="row between"><span style="min-width:0"><span class="chip code">${objLabel(o.key)}</span> ${esc(ARE.OBJ[o.key].title)}</span>${pill(e.status)}</div>${e.why.length ? `<span class="muted" style="font-size:var(--t-sm)">${esc(e.why.join(" · "))}</span>` : ""}<div class="row" style="gap:6px">${recoBtns(o.key)}</div></div>`).join("")}</div></section>` : ""}
${r.misconceptions.length ? `<section class="panel stack"><h2>Recurring misconceptions</h2><div class="list">${r.misconceptions.slice(0, 10).map(m => `<div class="stack" style="gap:4px"><span class="chip code" style="width:max-content">${objLabel(m.obj)}</span><span>${esc(m.stem)}${m.stem.length >= 160 ? "…" : ""}</span>${m.chosen ? `<span class="muted" style="font-size:var(--t-sm)">You chose: “${esc(m.chosen)}”${m.confident ? " while sure" : ""}${m.repeated ? " more than once" : ""}</span>` : ""}${E.S.lnotes[m.obj] ? `<a class="btn small" style="width:max-content" href="#note-${m.obj}">Open the learning note</a>` : (E.objLessons[m.obj] || [])[0] ? `<a class="btn small" style="width:max-content" href="#lesson-${E.objLessons[m.obj][0]}">Review the lesson</a>` : ""}</div>`).join("")}</div></section>` : ""}
${r.stale.length ? `<section class="panel stack"><h2>Due for a retention check</h2><p class="muted" style="margin:0">Demonstrated earlier but not practised for 3+ weeks.</p><div class="row">${r.stale.map(({ o }) => `<button class="btn small" data-act="quiz" data-obj="${o.key}">${objLabel(o.key)} ${esc(ARE.OBJ[o.key].title)}</button>`).join("")}</div></section>` : ""}
<section class="panel stack"><h2>Every objective</h2><div class="scroll"><table class="tbl rtbl"><thead><tr><th>Objective</th><th>Status</th><th>Answers</th><th>Accuracy</th><th>Application+</th><th>Retention</th><th>Last practised</th><th>Median time</th></tr></thead><tbody>
${r.objs.map(({ o, e }) => `<tr><td><span class="chip code">${objLabel(o.key)}</span> ${esc(ARE.OBJ[o.key].title)}</td><td>${pill(e.status)}${e.stale ? ` <span class="st-pill st-thin">Due</span>` : ""}</td><td>${e.n}</td><td>${pct(e.acc)}</td><td>${e.hi[0] ? pct(e.hiAcc) + ` <span class="muted">(${e.hi[0]})</span>` : "—"}</td><td>${e.retest[0] ? e.retest[1] + "/" + e.retest[0] : "—"}</td><td>${ago(e.last)}</td><td>${secFmt(e.medSec)}</td></tr>`).join("")}
</tbody></table></div></section>
${method}`;
}


/* ---------- Content quality report ---------- */
const CHECKS = { key: "Answer key validity", objective: "NCARB objective alignment", rationale: "Explanation supports the answer", distractor: "Distractor quality", wording: "Ambiguous wording", duplicate: "Duplicate or overlapping questions", source: "Source documentation" };
function qPreview(id) {
  const q = E.QMAP[id]; if (!q) return "";
  const keys = Array.isArray(q.ans) ? q.ans : [q.ans];
  return `<div class="stack" style="gap:6px;margin-top:8px"><p style="margin:0">${q.q}</p>${Array.isArray(q.opts) ? `<ol type="A" style="margin:0;padding-left:22px">${q.opts.map((o, i) => `<li style="${keys.includes(i) ? "font-weight:700" : ""}">${o}${q.why ? ` <span class="muted" style="font-weight:400">— ${q.why[i] || ""}</span>` : ""}</li>`).join("")}</ol>` : `<p class="muted" style="margin:0">Answer: ${esc(String(q.ans))} ${esc(q.unit || "")}</p>`}<p class="muted" style="margin:0;font-size:var(--t-sm)">${esc(String(q.explain || "").replace(/<[^>]+>/g, ""))} · Ref: ${esc(q.ref || "none")}</p></div>`;
}
function vQuality() {
  const QA = ARE.QA, t0 = performance.now(), S = QA.summary(), ms = Math.round(performance.now() - t0);
  const f = H.UI.qaf || "all";
  const sevs = ["high", "medium", "low"];
  const list = S.findings.filter(x => f === "all" || x.check === f);
  const lesIssues = S.lessons.filter(l => l.issues.length);
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Settings · Content quality</span><h1>Content quality report</h1><p class="muted" style="max-width:75ch;margin:0">Automated checks over all ${ARE.QA.all().length} questions and ${E.lessons.length} lessons, run just now (${ms} ms). A flag means "look at this", not "this is wrong"; a clean check is not proof of accuracy. Independent reviews are logged below.</p></div>
<section class="panel stack"><h2>Checks</h2><div class="scroll"><table class="tbl"><thead><tr><th>Check</th><th>High</th><th>Medium</th><th>Low</th></tr></thead><tbody>${Object.entries(CHECKS).map(([k, t]) => { const b = S.by[k] || { high: 0, medium: 0, low: 0 }; return `<tr><td>${t}</td>${sevs.map(s => `<td class="mono" style="${b[s] && s === "high" ? "color:var(--bad);font-weight:700" : ""}">${b[s]}</td>`).join("")}</tr>`; }).join("")}</tbody></table></div>
<details><summary class="muted">What each check looks for</summary><ul class="prose" style="margin-top:8px">
<li><b>Answer key validity</b>: the key points to a real choice; check-all items key as many answers as the stem asks for; calculations have numeric answers.</li>
<li><b>Objective alignment</b>: the objective exists, belongs to the question's division, and the linked lesson covers it.</li>
<li><b>Explanation supports the answer</b>: every choice has a rationale; the keyed choice's rationale does not read as wrong and no distractor's rationale says "Correct"; explanations are not one-liners.</li>
<li><b>Distractor quality</b>: no identical or near-identical choices; the key is not conspicuously the longest; distractors are not all marked by absolute words the key lacks.</li>
<li><b>Ambiguous wording</b>: "all/none of the above", double negatives, unemphasized NOT/EXCEPT stems.</li>
<li><b>Duplicates</b>: stems 75%+ similar in wording, or similar stems on the same objective with the same keyed answer.</li>
<li><b>Source documentation</b>: every question cites a reference; references that name a general principle rather than a specific document are listed so they can be upgraded.</li></ul></details></section>
<section class="panel stack"><h2>Needs verification against your jurisdiction</h2><p style="margin:0"><b>${S.codeQ} questions</b> and <b>${S.lessons.filter(l => l.code).length} lessons</b> rely on model-code or federal values (2021 IBC/IECC/IEBC, 2010 ADA Standards and others). The ARE tests these model editions; projects follow whatever edition and amendments the jurisdiction has adopted, and Ontario projects follow the OBC instead. These items show a reminder after you answer.</p></section>
<section class="panel stack"><h2>Independent review log</h2><div class="scroll"><table class="tbl"><thead><tr><th>Date</th><th>Scope</th><th>Method</th><th>Result</th></tr></thead><tbody>${QA.LOG.map(r => `<tr><td class="mono">${r.date}</td><td>${esc(r.scope)}</td><td>${esc(r.method)}</td><td>${esc(r.result)}</td></tr>`).join("")}</tbody></table></div></section>
<section class="panel stack"><h2>Lessons</h2><div class="scroll"><table class="tbl"><thead><tr><th>Lesson</th><th>Words</th><th>Key terms</th><th>Diagram</th><th>Code-dependent</th><th>Open items</th></tr></thead><tbody>${S.lessons.map(l => `<tr><td><a href="#lesson-${l.id}">${esc(l.title)}</a></td><td class="mono">${l.words}</td><td class="mono">${l.terms}</td><td>${l.diagram ? "Yes" : "—"}</td><td>${l.code ? "Yes" : "—"}</td><td>${l.issues.length ? esc(l.issues.join("; ")) : `<span class="muted">none</span>`}</td></tr>`).join("")}</tbody></table></div><p class="muted" style="margin:0;font-size:var(--t-sm)">${lesIssues.length} of ${S.lessons.length} lessons have open items.</p></section>
<section class="panel stack"><div class="row between"><h2>Flagged questions <small class="muted" style="font-weight:400">${list.length}</small></h2><select id="qaf" aria-label="Filter by check"><option value="all">All checks</option>${Object.entries(CHECKS).map(([k, t]) => `<option value="${k}" ${f === k ? "selected" : ""}>${t}</option>`).join("")}</select></div>
<div class="list">${list.slice(0, 150).map(x => `<details class="qaf-row"><summary><span class="st-pill ${x.sev === "high" ? "st-weak" : x.sev === "medium" ? "st-recall" : "st-none"}">${x.sev}</span> <span class="chip code">${esc(x.id)}</span> ${esc(x.msg)}</summary>${qPreview(x.id)}${x.other ? `<p class="muted" style="margin:8px 0 0">Compare with ${esc(x.other)}:</p>${qPreview(x.other)}` : ""}</details>`).join("")}</div>${list.length > 150 ? `<p class="muted">Showing the first 150.</p>` : ""}</section>`;
}
const prevRoute = ARE.ROUTE;
ARE.ROUTE = (h) => {
  if (h === "readiness") return vReadiness(null);
  if (h === "quality") return vQuality();
  if (h.startsWith("readiness-") && ARE.DIV[h.slice(10)]) return vReadiness(h.slice(10));
  return prevRoute(h);
};
ARE.vReadiness = vReadiness;
document.addEventListener("change", (e) => { if (e.target && e.target.id === "qaf") { H.UI.qaf = e.target.value; H.rerender(); } });
})();
/* ---------- save lesson sections and explanations to Learning Notes (v20) ---------- */
(function () {
const E = ARE.E, H = ARE.H, L = ARE.L;
const txt = (el) => (el ? el.textContent : "").replace(/\s+/g, " ").trim();
Object.assign(ARE.ACTS, {
  savesec: (t) => {
    const h3 = t.closest("h3"); const id = (location.hash.match(/^#lesson-(.+)$/) || [])[1]; const l = id && E.LMAP[id]; if (!l || !h3) return;
    let s = "", el = h3.nextElementSibling; while (el && el.tagName !== "H3") { s += " " + txt(el); el = el.nextElementSibling; }
    const title = txt(h3).replace(/Save to notes|Saved/g, "").replace(/^\d+\s*/, "").trim();
    const n = L.savePassage((l.obj || [])[0], "Lesson · " + l.title + " — " + title, s.trim(), "#lesson-" + id);
    if (n) { E.save(); t.textContent = "Saved"; t.disabled = true; H.toast("Saved to your Learning Notes for " + ARE.DIV[ARE.OBJ[n.obj].div].code + " " + ARE.OBJ[n.obj].code + "."); }
  },
  saveexpl: (t) => {
    const q = E.QMAP[t.dataset.id]; if (!q) return;
    const keys = Array.isArray(q.ans) ? q.ans : [q.ans];
    const body = String(q.explain || "").replace(/<[^>]+>/g, "") + (Array.isArray(q.opts) ? " Answer: " + keys.map(k => String(q.opts[k]).replace(/<[^>]+>/g, "")).join("; ") + "." : "") + (q.ref ? " (" + q.ref + ")" : "");
    const n = L.savePassage(q.obj, "Question · " + String(q.q).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 90) + "…", body, "");
    if (n) { E.save(); t.textContent = "Saved to notes"; t.disabled = true; }
  }
});
const prevAfter = ARE.AFTER;
ARE.AFTER = (h) => {
  if (prevAfter) prevAfter(h);
  if (h.startsWith("lesson-")) document.querySelectorAll("#lessonBody h3").forEach(h3 => { if (!h3.querySelector("[data-act=savesec]")) h3.insertAdjacentHTML("beforeend", ` <button class="btn tiny ghost savesec" data-act="savesec" title="Save this section to your Learning Notes">Save to notes</button>`); });
};
})();
