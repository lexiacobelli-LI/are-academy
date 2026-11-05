/* ---------- Corrections from the independent review (v17) ----------
   Keyed to the final, displayed choice letters (A, B, C…), the same order the reviewers saw.
   Each entry may replace the stem, individual choices, rationales, the key, the explanation or the reference. */
ARE.QFIX = ARE.QFIX || {};
ARE.applyQfix = () => {
  const all = (ARE.Q || []).concat(...(ARE.CASES || []).map(c => c.questions || []));
  const map = {}; all.forEach(q => { map[q.id] = q; });
  const ix = (L) => "ABCDEFGH".indexOf(L);
  Object.entries(ARE.QFIX).forEach(([id, f]) => {
    const q = map[id]; if (!q) return;
    if (f.q) q.q = f.q;
    if (f.opts && Array.isArray(q.opts)) Object.entries(f.opts).forEach(([L, t]) => { const i = ix(L); if (i >= 0 && i < q.opts.length) q.opts[i] = t; });
    if (f.why && Array.isArray(q.why)) Object.entries(f.why).forEach(([L, t]) => { const i = ix(L); if (i >= 0 && i < q.why.length) q.why[i] = t; });
    if (f.ans !== undefined) {
      if (Array.isArray(f.ans)) { q.ans = f.ans.map(ix).sort((a, b) => a - b); if (q.type === "ms") q.pick = q.ans.length; }
      else if (typeof f.ans === "string") q.ans = ix(f.ans); else q.ans = f.ans;
    }
    if (f.explain) q.explain = f.explain;
    if (f.ref) q.ref = f.ref;
    if (f.unit !== undefined) q.unit = f.unit;
  });
};
