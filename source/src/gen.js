/* ============================================================
   ALGORITHMIC QUESTION GENERATORS
   Each generator builds an original calculation item from a seed, so
   the same id always rebuilds the same question (history and spaced
   review keep working). Ids look like "g-<name>-<seed>".
   ============================================================ */
(function () {
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const between = (r, lo, hi, step = 1) => lo + Math.floor(r() * ((hi - lo) / step + 1)) * step;
const $f = (v, d = 0) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const r2 = (v) => Math.round(v * 100) / 100;

const G = {
  nm: { obj: "pcm-2.1", lesson: "pcm-finance", diff: 2, make(r) {
    const gross = between(r, 18, 60) * 100000, cons = Math.round(gross * between(r, 12, 25) / 100 / 1000) * 1000, reimb = between(r, 2, 8) * 10000, dl = Math.round(gross * between(r, 22, 32) / 100 / 1000) * 1000;
    const nor = gross - cons - reimb, ans = r2(nor / dl);
    return { q: `A firm reports gross revenue $${$f(gross)}, consultant costs $${$f(cons)}, reimbursable expenses $${$f(reimb)} and direct labor $${$f(dl)}. What is its net multiplier? (Two decimals.)`, ans, tol: 0.006, unit: "",
      explain: `NOR = ${$f(gross)} − ${$f(cons)} − ${$f(reimb)} = ${$f(nor)}. Net multiplier = NOR ÷ direct labor = ${$f(nor)} ÷ ${$f(dl)} = ${ans.toFixed(2)}.` }; } },
  be: { obj: "pcm-2.1", lesson: "pcm-finance", diff: 1, make(r) {
    const dl = between(r, 30, 120) * 10000, ie = Math.round(dl * between(r, 120, 210) / 100 / 1000) * 1000, ans = r2(1 + ie / dl);
    return { q: `Direct labor is $${$f(dl)} and indirect expenses are $${$f(ie)}. What is the break-even rate? (Two decimals.)`, ans, tol: 0.006, unit: "",
      explain: `Overhead rate = ${$f(ie)} ÷ ${$f(dl)} = ${(ie / dl).toFixed(2)}. Break-even = 1 + overhead rate = ${ans.toFixed(2)}.` }; } },
  util: { obj: "pcm-1.1", lesson: "pcm-finance", diff: 1, make(r) {
    const tot = pick(r, [1880, 1960, 2000, 2080]), bill = between(r, Math.round(tot * 0.45 / 10), Math.round(tot * 0.95 / 10)) * 10, ans = r2(bill / tot * 100);
    return { q: `A staff member is paid for ${$f(tot)} hours and bills ${$f(bill)} hours to projects. What is the utilization rate (%)? (Two decimals.)`, ans, tol: 0.006, unit: "%",
      explain: `Utilization = ${$f(bill)} ÷ ${$f(tot)} × 100 = ${ans.toFixed(2)}%.` }; } },
  phase: { obj: "pjm-2.1", lesson: "pjm-schedule", diff: 2, make(r) {
    const fee = between(r, 20, 120) * 10000, cons = Math.round(fee * between(r, 15, 35) / 100 / 1000) * 1000, ph = pick(r, [["Schematic Design", 15], ["Design Development", 20], ["Construction Documents", 40], ["Construction Administration", 20]]), ans = Math.round((fee - cons) * ph[1] / 100);
    return { q: `Total fee $${$f(fee)} includes $${$f(cons)} for consultants. Using SD 15%, DD 20%, CD 40%, bidding 5%, CA 20% of the architect's own share, what is the ${ph[0]} allocation?`, ans, tol: 1, unit: "$",
      explain: `Architect's share = ${$f(fee)} − ${$f(cons)} = ${$f(fee - cons)}. ${ph[0]} = ${ph[1]}% × ${$f(fee - cons)} = $${$f(ans)}.` }; } },
  eac: { obj: "pjm-4.1", lesson: "pjm-schedule", diff: 3, make(r) {
    const bac = between(r, 20, 150) * 1000, pc = between(r, 20, 80, 5), cpi = pick(r, [0.8, 0.75, 0.9, 1.25, 0.85]), ev = bac * pc / 100, ac = Math.round(ev / cpi), ans = Math.round(bac / (ev / ac));
    return { q: `A phase budget is $${$f(bac)}. The work is ${pc}% complete and $${$f(ac)} has been spent. At the current efficiency, what is the estimate at completion?`, ans, tol: Math.max(1, ans * 0.002), unit: "$",
      explain: `EV = ${pc}% × ${$f(bac)} = ${$f(ev)}. CPI = EV ÷ AC = ${(ev / ac).toFixed(3)}. EAC = BAC ÷ CPI = $${$f(ans)}.` }; } },
  float: { obj: "pjm-2.2", lesson: "pjm-schedule", diff: 2, make(r) {
    const a = between(r, 2, 6), b = between(r, 4, 10), c = between(r, 1, b - 1), d = between(r, 2, 6), ans = b - c;
    return { q: `Activity A (${a} days) is followed by B (${b} days) and C (${c} days) in parallel; both precede D (${d} days). How many days of total float does C have?`, ans, tol: 0, unit: "days",
      explain: `Critical path A–B–D = ${a + b + d} days. Longest path through C = ${a + c + d}. Float = ${a + b + d} − ${a + c + d} = ${ans} days.` }; } },
  far: { obj: "pa-2.2", lesson: "pa-zoning", diff: 3, make(r) {
    const w = between(r, 60, 160, 10), dpt = between(r, 100, 250, 10), lot = w * dpt, far = pick(r, [0.75, 1, 1.5, 2, 2.5, 3]), cov = between(r, 30, 70, 5), st = between(r, 2, 5);
    const a = lot * far, b = lot * cov / 100 * st, ans = Math.min(a, b);
    return { q: `A ${w} × ${dpt} ft lot allows FAR ${far}, maximum lot coverage ${cov}% and ${st} stories. Assuming each story uses the full allowed footprint (setbacks do not govern), what is the maximum gross floor area?`, ans, tol: 1, unit: "sf",
      explain: `Lot = ${$f(lot)} sf. FAR limit = ${$f(a)} sf. Coverage × stories = ${$f(lot * cov / 100)} × ${st} = ${$f(b)} sf. The smaller governs: ${$f(ans)} sf.` }; } },
  ntg: { obj: "pa-4.3", lesson: "pa-program", diff: 1, make(r) {
    const net = between(r, 40, 400) * 100, eff = pick(r, [0.6, 0.65, 0.7, 0.72, 0.75, 0.8]), ans = Math.round(net / eff);
    return { q: `A program totals ${$f(net)} net assignable sf. With an efficiency ratio of ${eff}, what gross area is needed? (Nearest sf.)`, ans, tol: 1, unit: "gsf",
      explain: `Gross = net ÷ efficiency = ${$f(net)} ÷ ${eff} = ${$f(ans)} gsf.` }; } },
  slope: { obj: "pa-1.2", lesson: "pa-program", diff: 1, make(r) {
    const rise = between(r, 1, 12, 0.5), run = between(r, 20, 200, 5), ans = r2(rise / run * 100);
    return { q: `Grade rises ${rise} ft over a horizontal distance of ${run} ft. What is the slope (%)? (Two decimals.)`, ans, tol: 0.006, unit: "%",
      explain: `Slope = ${rise} ÷ ${run} × 100 = ${ans.toFixed(2)}%. ${ans <= 5 ? "This is within 1:20, usable as an accessible walk." : ans <= 8.33 ? "Steeper than 1:20, so it would have to be a ramp (max 1:12)." : "Too steep for an accessible ramp."}` }; } },
  budget: { obj: "pa-4.5", lesson: "pa-building", diff: 3, make(r) {
    const c = between(r, 30, 150) * 100000, y = between(r, 1, 3), e = pick(r, [3, 4, 5, 6]), s = pick(r, [20, 25, 30]), esc = c * Math.pow(1 + e / 100, y), ans = Math.round(esc * (1 + s / 100) / 1000) * 1000;
    return { q: `Construction cost today is $${$f(c)}. The construction midpoint is ${y} year(s) away at ${e}% annual escalation. Soft costs are ${s}% of escalated construction cost. What is the total project budget? (Nearest $1,000.)`, ans, tol: 1000, unit: "$",
      explain: `Escalated construction = ${$f(c)} × 1.${String(e).padStart(2, "0")}^${y} = ${$f(Math.round(esc))}. Total = × ${1 + s / 100} = $${$f(ans)}.` }; } },
  ol: { obj: "ppd-2.2", lesson: "ppd-egress", diff: 1, make(r) {
    const f = pick(r, [["business area", 150, "gross"], ["exercise room", 50, "gross"], ["classroom", 20, "net"], ["unconcentrated assembly (tables and chairs)", 15, "net"], ["mercantile area", 60, "gross"], ["concentrated assembly (chairs only)", 7, "net"]]), a = between(r, 8, 300) * 100, ans = Math.ceil(a / f[1] - 1e-9);
    return { q: `Using ${f[1]} sf ${f[2]} per occupant for a ${f[0]} (2021 IBC Table 1004.5), what is the occupant load of ${$f(a)} sf ${f[2]}?`, ans, tol: 0, unit: "occupants",
      explain: `${$f(a)} ÷ ${f[1]} = ${(a / f[1]).toFixed(2)}, rounded up to ${ans}.` }; } },
  stair: { obj: "ppd-2.2", lesson: "ppd-egress", diff: 2, make(r) {
    const n = between(r, 50, 600, 10), sp = r() < 0.4, f = sp ? 0.2 : 0.3, ans = r2(n * f);
    return { q: `A stair serves ${n} occupants in a building ${sp ? "with an automatic sprinkler system and an emergency voice/alarm communication system" : "without an emergency voice/alarm system"}. What egress capacity (in) is required before checking minimum widths?`, ans, tol: 0.06, unit: "in",
      explain: `${n} × ${f} in = ${ans} in (2021 IBC §1005.3.1${sp ? ", reduced factor applies" : ""}).` }; } },
  ufac: { obj: "ppd-3.4", lesson: "ppd-envelope", diff: 2, make(r) {
    const cav = pick(r, [11, 13, 15, 19, 21]), ci = pick(r, [0, 5, 7.5, 10, 15]), R = 0.68 + 0.45 + cav + 0.62 + ci + 0.17, ans = Math.round(1 / R * 1000) / 1000;
    return { q: `A wall has inside air film R-0.68, gypsum R-0.45, cavity insulation R-${cav}, sheathing R-0.62, continuous insulation R-${ci} and outside air film R-0.17. Ignoring framing, what is the U-factor? (Three decimals.)`, ans, tol: 0.0015, unit: "",
      explain: `R_T = ${R.toFixed(2)}. U = 1 ÷ ${R.toFixed(2)} = ${ans.toFixed(3)}.` }; } },
  heat: { obj: "ppd-3.4", lesson: "ppd-envelope", diff: 2, make(r) {
    const u = pick(r, [0.03, 0.04, 0.05, 0.06, 0.08, 0.3, 0.45]), a = between(r, 2, 40) * 100, ti = 70, to = between(r, -10, 30, 5), ans = Math.round(u * a * (ti - to));
    return { q: `An assembly with U = ${u} covers ${$f(a)} sf. Indoor air is ${ti}°F and outdoor design temperature is ${to}°F. What is the conductive heat loss (Btu/h)?`, ans, tol: 1, unit: "Btu/h",
      explain: `Q = U × A × ΔT = ${u} × ${$f(a)} × ${ti - to} = ${$f(ans)} Btu/h.` }; } },
  beam: { obj: "ppd-3.2", lesson: "ppd-systems", diff: 1, make(r) {
    const s = between(r, 16, 48, 2), ans = s / 2;
    return { q: `Using the schematic rule "steel beam depth (in) ≈ span (ft) ÷ 2," what depth should be assumed for a ${s} ft span?`, ans, tol: 0, unit: "in",
      explain: `${s} ÷ 2 = ${ans} in.` }; } },
  ifront: { obj: "ppd-2.2", lesson: "ppd-integration", diff: 3, make(r) {
    const p = between(r, 400, 1000, 20), f = Math.round(p * pick(r, [0.4, 0.5, 0.6, 0.75, 1]) / 10) * 10, w = pick(r, [20, 25, 30]), ns = between(r, 6, 20) * 500, at = ns * pick(r, [3, 4]), ifv = Math.max(0, (f / p - 0.25) * w / 30), ans = Math.round(at + ns * ifv);
    return { q: `One-story building: perimeter ${p} ft, of which ${f} ft fronts open space with W = ${w} ft. Tabular area A_t = ${$f(at)} sf; NS = ${$f(ns)} sf. Using I_f = [F/P − 0.25] × W/30 and A_a = A_t + NS × I_f, what is the allowable area?`, ans, tol: 2, unit: "sf",
      explain: `I_f = [${f}/${p} − 0.25] × ${w}/30 = ${ifv.toFixed(3)}. A_a = ${$f(at)} + ${$f(ns)} × ${ifv.toFixed(3)} = ${$f(ans)} sf.` }; } },
  payback: { obj: "ppd-5.3", lesson: "ppd-envelope", diff: 2, make(r) {
    const extra = between(r, 5, 80) * 1000, save = between(r, 2, 20) * 500, ans = r2(extra / save);
    return { q: `An upgrade costs $${$f(extra)} more and saves $${$f(save)} per year. What is the simple payback period (years)? (Two decimals.)`, ans, tol: 0.006, unit: "years",
      explain: `${$f(extra)} ÷ ${$f(save)} = ${ans.toFixed(2)} years.` }; } },
  trib: { obj: "pdd-1.3", lesson: "pdd-sizing", diff: 2, make(r) {
    const psf = pick(r, [40, 50, 65, 80, 100, 125, 150]), a = between(r, 12, 30), b = between(r, 12, 30), ans = psf * a * b;
    return { q: `A column has a tributary area of ${a} × ${b} ft. With a ${psf} psf load, what is the load on the column (lb)?`, ans, tol: 1, unit: "lb",
      explain: `${a} × ${b} = ${a * b} sf × ${psf} psf = ${$f(ans)} lb.` }; } },
  moment: { obj: "pdd-1.3", lesson: "pdd-sizing", diff: 3, make(r) {
    const psf = pick(r, [50, 60, 80, 100]), tw = between(r, 6, 16), L = between(r, 12, 36, 2), w = psf * tw, ans = w * L * L / 8;
    return { q: `A simply supported beam spans ${L} ft with a ${tw} ft tributary width under ${psf} psf. What is the maximum bending moment (ft-lb)?`, ans, tol: 1, unit: "ft-lb",
      explain: `w = ${psf} × ${tw} = ${w} plf. M = wL²/8 = ${w} × ${L * L} ÷ 8 = ${$f(ans)} ft-lb.` }; } },
  duct: { obj: "pdd-1.2", lesson: "pdd-sizing", diff: 1, make(r) {
    const v = pick(r, [600, 800, 1000, 1200, 1500]), q = between(r, 4, 60) * v / 4, ans = r2(q / v);
    return { q: `A duct carries ${$f(q)} cfm at ${$f(v)} fpm. What cross-sectional area (sf) is required? (Two decimals.)`, ans, tol: 0.006, unit: "sf",
      explain: `A = Q ÷ V = ${$f(q)} ÷ ${$f(v)} = ${ans.toFixed(2)} sf.` }; } },
  wc: { obj: "pdd-1.2", lesson: "pdd-sizing", diff: 2, make(r) {
    const n = between(r, 10, 300, 5), ans = Math.ceil(Math.min(n, 50) / 25) + (n > 50 ? Math.ceil((n - 50) / 50) : 0);
    return { q: `A Group B floor has ${n} occupants of one sex. Using water closets at 1 per 25 for the first 50 and 1 per 50 for the remainder, how many are required for that sex?`, ans, tol: 0, unit: "WCs",
      explain: `First ${Math.min(n, 50)} ÷ 25 → ${Math.ceil(Math.min(n, 50) / 25)}${n > 50 ? `; remaining ${n - 50} ÷ 50 → ${Math.ceil((n - 50) / 50)}` : ""}. Total ${ans}.` }; } },
  est: { obj: "pdd-5.1", lesson: "pdd-docs", diff: 2, make(r) {
    const q = between(r, 5, 80) * 100, u = between(r, 6, 60) * 0.5, c = pick(r, [5, 8, 10, 15]), ans = r2(q * u * (1 + c / 100));
    return { q: `A takeoff shows ${$f(q)} sf at $${u.toFixed(2)}/sf. With a ${c}% contingency, what is the estimated cost? (Nearest cent.)`, ans, tol: 0.01, unit: "$",
      explain: `${$f(q)} × ${u.toFixed(2)} = ${$f(q * u, 2)}; × ${1 + c / 100} = $${$f(ans, 2)}.` }; } },
  pay: { obj: "ce-3.3", lesson: "ce-payment", diff: 2, make(r) {
    const done = between(r, 20, 400) * 10000, st = between(r, 0, 10) * 5000, ret = pick(r, [5, 10]), prev = Math.round((done + st) * (1 - ret / 100) * between(r, 40, 85) / 100 / 1000) * 1000, ans = Math.round((done + st) * (1 - ret / 100) - prev);
    return { q: `Work completed $${$f(done)}; stored materials $${$f(st)}; retainage ${ret}%; previous certificates $${$f(prev)}. What is the current payment due?`, ans, tol: 1, unit: "$",
      explain: `(${$f(done)} + ${$f(st)}) × ${(1 - ret / 100).toFixed(2)} = ${$f((done + st) * (1 - ret / 100))}; − ${$f(prev)} = $${$f(ans)}.` }; } },
  pct: { obj: "ce-2.3", lesson: "ce-observation", diff: 2, make(r) {
    const lines = [["Sitework", between(r, 10, 40) * 10000], ["Structure", between(r, 30, 90) * 10000], ["Envelope", between(r, 20, 60) * 10000], ["Interiors", between(r, 30, 90) * 10000]].map(([n, v]) => [n, v, pick(r, [0, 25, 50, 75, 100])]);
    const tot = lines.reduce((s, x) => s + x[1], 0), done = lines.reduce((s, x) => s + x[1] * x[2] / 100, 0), ans = r2(done / tot * 100);
    return { q: `Schedule of values: ${lines.map(([n, v, p]) => `${n} $${$f(v)} (${p}% complete)`).join("; ")}. What percent of the contract is complete? (Two decimals.)`, ans, tol: 0.006, unit: "%",
      explain: `Earned = ${$f(done)} of ${$f(tot)} = ${ans.toFixed(2)}%.` }; } }
};

ARE.GEN = G;
ARE.genQ = (id) => {
  const m = /^g-([a-z]+)-(\d+)$/.exec(id); if (!m || !G[m[1]]) return null;
  const g = G[m[1]], o = g.make(rng(+m[2]));
  return Object.assign({ id, type: "calc", obj: g.obj, div: g.obj.split("-")[0], lesson: g.lesson, diff: g.diff, fmt: "Calculation · generated", gen: m[1], ref: "Generated from the method in the linked lesson" }, o);
};
ARE.genFor = (filter, n, seedBase) => {
  const names = Object.keys(G).filter(k => filter(G[k]));
  const out = []; let s = seedBase || (Date.now() % 1e9);
  for (let i = 0; i < n && names.length; i++) out.push("g-" + names[i % names.length] + "-" + ((s + i * 7919) % 2147483647));
  return out;
};
})();
