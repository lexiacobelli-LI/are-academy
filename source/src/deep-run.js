/* Add deep-lesson glossary terms (skip any term already defined). */
(() => { const have = new Set(ARE.GLOSSARY.map(g => g.term.toLowerCase()));
  (ARE.DEEP_TERMS || []).forEach(([term, cat, def, lesson]) => { if (!have.has(term.toLowerCase())) { have.add(term.toLowerCase()); ARE.GLOSSARY.push({ term, cat, def, lesson }); } }); })();
