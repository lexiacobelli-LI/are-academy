/* ---------- Question bank expansion (v9): compact rows → standard question objects ----------
   Row: [objective, difficulty 1-3, format, stem, options, answer (index, or array for check-all), why-per-option, explanation, reference]
   All items are original. References name the document and section only where the section was checked. */
ARE.QX = (div, rows) => rows.forEach((r, i) => {
  const [obj, diff, fmt, q, opts, ans, why, explain, ref] = r;
  const lesson = (ARE.LESSONS.find(l => (l.obj || []).includes(obj)) || ARE.LESSONS.find(l => l.div === div) || {}).id;
  const ms = Array.isArray(ans);
  const id = `q-${div}-x${String(i + 1).padStart(2, "0")}`;
  // Fixed, per-question order so the correct answer isn't always in the same position. Numeric answers stay in ascending order.
  let order = opts.map((_, k) => k);
  if (fmt !== "Calculation") {
    let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const rnd = () => { h = (h + 0x6D2B79F5) >>> 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    for (let k = order.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [order[k], order[j]] = [order[j], order[k]]; }
  }
  const pos = (k) => order.indexOf(k);
  ARE.Q.push({ id, div, obj, lesson, type: ms ? "ms" : "mc", diff, fmt: ms ? "Check all that apply" : fmt, pick: ms ? ans.length : undefined, q,
    opts: order.map(k => opts[k]), ans: ms ? ans.map(pos).sort((x, y) => x - y) : pos(ans), why: order.map(k => why[k]), explain, ref });
});
