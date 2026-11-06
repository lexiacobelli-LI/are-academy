/* ============================================================
   VIEWS-SIM: branching project simulations (v20)
   ============================================================ */
(function () {
const E = ARE.E, H = ARE.H;
const { esc, objLabel } = H;
const M0 = () => { const m = {}; ARE.SIM_METERS.forEach(([k]) => m[k] = 5); return m; };
const order = (n, seed) => { let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const clamp = (v) => Math.max(0, Math.min(10, v));
const st = (id) => { E.S.sims = E.S.sims || {}; return E.S.sims[id] = E.S.sims[id] || { node: null, hist: [], m: M0(), flags: {}, pending: null, done: false, runs: [] }; };
const sim = (id) => ARE.SIMS.find(s => s.id === id);
const RATE = { best: ["Strong decision", "st-retained"], ok: ["Defensible, not the best", "st-recall"], poor: ["Weak decision", "st-weak"] };

function meters(m, delta) {
  return `<div class="sim-meters">${ARE.SIM_METERS.map(([k, t]) => { const v = m[k], good = k === "risk" ? 10 - v : v, d = delta && delta[k]; return `<div class="sm"><span class="sm-k">${t}${k === "risk" ? " <i class='muted'>(lower is better)</i>" : ""}</span><div class="sm-bar"><span style="width:${v * 10}%;background:${good >= 6 ? "var(--ok)" : good <= 3 ? "var(--bad)" : "var(--accent)"}"></span></div>${d ? `<b class="sm-d ${(k === "risk" ? -d : d) > 0 ? "up" : "down"}">${d > 0 ? "+" : ""}${d}</b>` : `<b class="sm-d"></b>`}</div>`; }).join("")}</div>`;
}
function ending(s, S) { return s.endings.find(e => e.if(S.m, S.flags || {})); }

function vSims() {
  return `<div class="stack" style="gap:6px"><span class="eyebrow">Practice</span><h1>Project simulations</h1><p class="muted" style="max-width:72ch;margin:0">Work through a project as the architect. Each decision changes the client relationship, your firm's risk, the fee, the schedule and quality, and some decisions change what happens next. Several answers are defensible; the debrief explains the trade-offs.</p></div>
<div class="grid g3">${ARE.SIMS.map(s => { const S = (E.S.sims || {})[s.id]; const runs = S ? S.runs.length : 0; const inProg = S && S.node && !S.done; return `<article class="panel stack sim-card"><span class="eyebrow">${s.divs.map(d => ARE.DIV[d].code).join(" · ")} · ${Object.keys(s.nodes).length} decisions</span><h2 style="margin:0">${esc(s.title)}</h2><p class="muted" style="margin:0">${esc(s.role)}</p><div class="row" style="gap:6px;flex-wrap:wrap">${s.objs.slice(0, 6).map(k => `<span class="chip code">${objLabel(k)}</span>`).join("")}</div><div class="row">${inProg ? `<a class="btn primary" href="#${s.id}">Continue</a>` : `<button class="btn primary" data-act="simstart" data-id="${s.id}">${runs ? "Play again" : "Start"}</button>`}${runs ? `<span class="muted" style="font-size:var(--t-sm)">Played ${runs}× · last: ${esc(S.runs[S.runs.length - 1].ending)}</span>` : ""}</div></article>`; }).join("")}</div>`;
}

function vSim(id) {
  const s = sim(id); if (!s) return `<div class="empty">Simulation not found. <a href="#sims">All simulations</a></div>`;
  const S = st(id);
  if (!S.node && !S.done) { S.node = s.start; }
  const head = `<div class="stack" style="gap:6px"><a href="#sims" class="muted" style="font-size:.9rem">← All simulations</a><span class="eyebrow">${s.divs.map(d => ARE.DIV[d].code).join(" · ")} · Simulation</span><h1>${esc(s.title)}</h1></div>`;
  if (S.done) {
    const en = ending(s, S); const nodes = s.nodes;
    return `${head}<section class="panel stack sim-end"><span class="eyebrow">Outcome</span><h2 style="margin:0">${esc(en.t)}</h2><p style="margin:0">${esc(en.d)}</p>${meters(S.m)}</section>
<section class="panel stack"><h2>Debrief: your decisions</h2><div class="list">${S.hist.map(([nid, ci]) => { const n = nodes[nid], c = n.choices[ci], best = n.choices.find(x => x.rate === "best"); return `<div class="stack gap-row" style="gap:6px"><span class="eyebrow">${esc(n.phase)} · ${esc(n.title)}</span><div class="row between"><span><b>You chose:</b> ${esc(c.t)}</span><span class="st-pill ${RATE[c.rate][1]}">${RATE[c.rate][0]}</span></div>${c.rate !== "best" && best ? `<p style="margin:0"><b>Stronger choice:</b> ${esc(best.t)}</p><div class="prose muted" style="font-size:.95rem">${best.out}</div>` : `<div class="prose muted" style="font-size:.95rem">${c.out}</div>`}</div>`; }).join("")}</div></section>
<section class="panel stack"><h2>Study the objectives behind this simulation</h2><div class="list">${s.objs.map(k => { const lid = (E.objLessons[k] || [])[0]; return `<div class="row between" style="flex-wrap:wrap;gap:6px"><span><span class="chip code">${objLabel(k)}</span> ${esc(ARE.OBJ[k].title)}</span><span class="row" style="gap:6px">${lid ? `<a class="btn small" href="#lesson-${lid}">Lesson</a>` : ""}<button class="btn small ghost" data-act="quiz" data-obj="${k}">Quiz</button></span></div>`; }).join("")}</div></section>
<div class="row"><button class="btn primary" data-act="simstart" data-id="${s.id}">Play again</button><a class="btn" href="#sims">Other simulations</a></div>`;
  }
  const n = s.nodes[S.node];
  const step = S.hist.length + 1, total = Object.keys(s.nodes).length;
  const pend = S.pending !== null && S.pending !== undefined ? n.choices[S.pending] : null;
  return `${head}
<section class="panel stack sim-brief"><p style="margin:0"><b>Your role.</b> ${esc(s.role)}</p>${step === 1 && !pend ? `<p class="muted" style="margin:0">${esc(s.brief)}</p>` : ""}${meters(S.m, pend ? pend.fx : null)}</section>
<section class="panel stack sim-node"><span class="eyebrow">Decision ${step} of ${total} · ${esc(n.phase)}</span><h2 style="margin:0">${esc(n.title)}</h2><div class="prose">${n.situation}</div>
${(n.docs || []).map(d => `<details class="panel sim-doc"><summary><b>${esc(d.name)}</b></summary><div class="prose" style="margin-top:8px">${d.html}</div></details>`).join("")}
<h3 class="sub">${esc(n.prompt)}</h3>
<div class="opts">${order(n.choices.length, s.id + S.node).map((i, pos) => { const c = n.choices[i]; return `<button class="opt ${pend ? (i === S.pending ? "picked" : "dim") : ""}" data-act="simchoose" data-id="${s.id}" data-i="${i}" ${pend ? "disabled" : ""}><span class="mk">${String.fromCharCode(65 + pos)}</span><span>${esc(c.t)}</span></button>`; }).join("")}</div>
${pend ? `<div class="feedback ${pend.rate === "poor" ? "bad" : "good"}" role="status"><h3>${RATE[pend.rate][0]}</h3><div class="prose">${pend.out}</div><div class="row"><button class="btn primary" data-act="simnext" data-id="${s.id}">${pend.next === "end" ? "See the outcome" : "Continue"}</button></div></div>` : ""}
</section>
<p class="muted" style="font-size:var(--t-sm)">Simulations are practice in professional judgment; they are not scored as ARE items and do not change your readiness evidence.</p>`;
}

Object.assign(ARE.ACTS, {
  simstart: (t) => { const id = t.dataset.id; const S = st(id); Object.assign(S, { node: sim(id).start, hist: [], m: M0(), flags: {}, pending: null, done: false }); E.save(); if (location.hash === "#" + id) H.rerender(); else location.hash = "#" + id; },
  simchoose: (t) => { const id = t.dataset.id, s = sim(id), S = st(id); if (S.pending !== null && S.pending !== undefined) return; const i = +t.dataset.i, c = s.nodes[S.node].choices[i]; S.pending = i; Object.entries(c.fx || {}).forEach(([k, v]) => S.m[k] = clamp(S.m[k] + v)); if (c.flag) S.flags[c.flag] = true; E.save(); H.rerender(); },
  simnext: (t) => { const id = t.dataset.id, s = sim(id), S = st(id); const c = s.nodes[S.node].choices[S.pending]; S.hist.push([S.node, S.pending]); S.pending = null; if (c.next === "end") { S.done = true; S.node = null; const en = ending(s, S); S.runs.push({ t: Date.now(), ending: en.t, m: Object.assign({}, S.m), best: S.hist.filter(([nid, ci]) => s.nodes[nid].choices[ci].rate === "best").length, n: S.hist.length }); if (S.runs.length > 20) S.runs.shift(); } else S.node = c.next; E.save(); H.rerender(); }
});
const prevRoute = ARE.ROUTE;
ARE.ROUTE = (h) => {
  if (h === "sims") return vSims();
  if (h.startsWith("sim-") && sim(h)) return vSim(h);
  return prevRoute(h);
};
})();
