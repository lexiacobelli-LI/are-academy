/* ---------- Answer-position balancing for the original bank (v9) ----------
   Most early items had the correct choice in the second position. Choices are reordered with a fixed,
   per-question permutation (the same on every device). Saved answers are migrated: attempts recorded
   before v9 store the chosen index in the old order and are remapped once (marked v: 2). */
(function () {
  ARE.OPTPERM = {};
  const seedOf = (id) => { let h = 7; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  const perm = (id, n) => {
    let h = seedOf(id); const rnd = () => { h = (h + 0x6D2B79F5) >>> 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const o = Array.from({ length: n }, (_, k) => k); for (let k = n - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [o[k], o[j]] = [o[j], o[k]]; } return o;
  };
  const numeric = (opts) => opts.every(o => /^[\s$~≈]*[\d.,]+\s*(%|sf|ft|in|cfm|h|hours|days|weeks|months|years|lb|psf|ach|minutes|occupants|fixtures)?\.?\s*$/i.test(String(o).replace(/<[^>]+>/g, "")));
  const mix = (q) => {
    if (!q || /-x\d\d$/.test(q.id) || !Array.isArray(q.opts) || q.opts.length < 3) return;
    if (q.type !== "mc" && q.type !== "ms") return;
    if (q.fmt === "Calculation" || numeric(q.opts)) return;
    const o = perm(q.id, q.opts.length); const pos = (k) => o.indexOf(k);
    q.opts = o.map(k => q.opts[k]); if (Array.isArray(q.why) && q.why.length === o.length) q.why = o.map(k => q.why[k]);
    q.ans = Array.isArray(q.ans) ? q.ans.map(pos).sort((a, b) => a - b) : pos(q.ans);
    ARE.OPTPERM[q.id] = o;
  };
  (ARE.Q || []).forEach(mix);
  (ARE.CASES || []).forEach(c => (c.questions || []).forEach(mix));
  // Remap a saved state's stored choice indices from the old order. Idempotent.
  ARE.migrateOpts = (S) => {
    (S && Array.isArray(S.attempts) ? S.attempts : []).forEach(a => {
      if (a.v === 2) return;
      const o = ARE.OPTPERM[a.q];
      if (o && typeof a.ch === "number" && a.ch >= 0 && a.ch < o.length) a.ch = o.indexOf(a.ch);
      a.v = 2;
    });
    return S;
  };
  ARE.migrateSession = (s) => {
    if (!s || s.v2) return s;
    Object.keys(s.resp || {}).forEach(id => { const o = ARE.OPTPERM[id]; const r = s.resp[id]; if (!o) return;
      if (typeof r === "number") s.resp[id] = o.indexOf(r); else if (Array.isArray(r)) s.resp[id] = r.map(x => o.indexOf(x)); });
    Object.keys(s.strike || {}).forEach(id => { const o = ARE.OPTPERM[id]; const r = s.strike[id]; if (o && Array.isArray(r)) s.strike[id] = r.map(x => o.indexOf(x)); });
    s.v2 = true; return s;
  };
})();
