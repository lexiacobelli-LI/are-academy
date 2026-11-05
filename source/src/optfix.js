/* ---------- Distractor length balancing (v14) ----------
   In many items the correct choice was the longest, a cue test-wise readers exploit. For each such item one short
   wrong choice is rewritten as a longer, plausible wrong choice. Replacement is by exact text, so answer positions,
   saved attempts and explanations for the other choices are unchanged. */
ARE.OPTFIXES = ARE.OPTFIXES || [];
ARE.applyOptfix = () => {
  const strip = (s) => String(s).replace(/<[^>]+>/g, "").trim();
  const all = (ARE.Q || []).concat(...(ARE.CASES || []).map(c => c.questions || []));
  const map = {}; all.forEach(q => { map[q.id] = q; });
  ARE.OPTFIXES.forEach(fx => Object.entries(fx).forEach(([id, [oldT, newT, newWhy]]) => {
    const q = map[id]; if (!q || !Array.isArray(q.opts)) return;
    const i = q.opts.findIndex(o => strip(o) === oldT);
    if (i < 0 || i === q.ans || (Array.isArray(q.ans) && q.ans.includes(i))) return;
    q.opts[i] = newT; if (Array.isArray(q.why) && newWhy) q.why[i] = newWhy;
  }));
};
