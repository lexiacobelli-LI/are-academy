/* LESSONS (set 4): gap-filling lessons for PPD, PDD, PA, PjM and CE.
   Interactive fields:
   - diagram: SVG; elements with data-tip="Title|Explanation" are clickable
   - quick:   inline checks [{q, opts, a, why}] (feedback only, not scored)
   - tryit:   slider calculators by kind (see views.js TRY)  */

ARE.LESSONS.push({
  id: "ppd-siting", div: "ppd", obj: ["ppd-1.1", "ppd-1.3", "ppd-2.1", "ppd-4.1", "ppd-4.4"], title: "Siting, Configuration & Context",
  minutes: 40, level: "Core",
  summary: "Place the building on the site, shape it, and respond to zoning, environmental rules and the neighborhood.",
  objectives: [
    "Locate a building and site improvements from a site analysis (slope, flood zone, access, sun, soils).",
    "Apply zoning and environmental regulations: setbacks, stormwater, floodplain, wetlands buffers.",
    "Choose a building configuration that fits program, daylight and circulation.",
    "Respond to neighborhood context: street wall, scale, materials and historic character."
  ],
  why: "Siting decisions are made once and paid for forever: in earthwork, foundations, energy use, accessibility and how the neighborhood receives the building.",
  exam: "Hotspot items show a site plan and ask where the building, parking or entry should go. Multiple choice items ask which configuration best meets daylight, circulation and context goals.",
  body: `
<h3>Reading the site for placement</h3>
<p>Start with what you <em>cannot</em> build on, then where you <em>should</em> build. Rule out setbacks, easements, floodplain, wetlands and their buffers, steep slopes and poor soils. Within what is left, prefer:</p>
<ul>
<li><strong>Gentle slopes</strong> (under about 5%) for the footprint and parking, which limits cut, fill and retaining walls.</li>
<li><strong>High ground</strong> above the base flood elevation; drainage flows away from the building.</li>
<li><strong>Solar access</strong>: long facades facing north and south; outdoor spaces on the sunny side.</li>
<li><strong>Short, safe access</strong>: vehicle entry away from intersections; pedestrian entry directly from the public sidewalk.</li>
<li><strong>Preserved assets</strong>: mature trees, views, existing utilities.</li>
</ul>
<div class="callout"><b>Access rules to remember.</b> An accessible route must connect accessible parking, passenger loading zones, public transit stops and public sidewalks to the accessible entrance. Fire apparatus access roads typically must reach within 150 ft of all portions of the exterior walls (International Fire Code §503.1.1, unless modified by sprinklers or the fire official).</div>

<h3>Environmental regulations</h3>
<ul>
<li><strong>Stormwater</strong>: most jurisdictions limit post-development runoff to pre-development rates. <em>Detention</em> stores water temporarily and releases it slowly; <em>retention</em> holds it permanently or lets it infiltrate.</li>
<li><strong>Floodplain</strong>: build the lowest floor at or above the design flood elevation set by the jurisdiction (often base flood elevation plus freeboard).</li>
<li><strong>Wetlands and waterways</strong>: protected buffers; disturbance usually needs a permit.</li>
<li><strong>Impervious cover limits</strong> in some zoning codes push toward permeable paving and green roofs.</li>
</ul>

<h3>Configuration</h3>
<p>Building shape follows program, daylight and circulation. A <strong>double-loaded corridor</strong> (rooms both sides) is efficient. A <strong>single-loaded</strong> corridor gives every room daylight and views but more circulation area. Daylight reaches roughly <strong>1.5 to 2.5 times the window head height</strong> into a room, so deep floor plates need courtyards, atria or clerestories. Compact forms (low surface-to-volume ratio) save energy in cold climates. Elongated forms help daylight and cross-ventilation.</p>

<h3>Neighborhood context</h3>
<p>Match the <strong>street wall</strong> (consistent front setback) and cornice lines. Step building height down toward smaller neighbors. Place parking behind or beside the building rather than between the building and the street. Draw on local materials and rhythm. In historic districts, a review board may control massing, materials and windows.</p>`,
  diagram: `<svg viewBox="0 0 640 300" role="img" aria-label="Site plan with floodplain, steep slope, setbacks and the best building location. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<rect x="20" y="20" width="600" height="250" class="dg-soft"/>
<g class="tip" data-tip="Floodplain|Land below the base flood elevation. Keep the building and its lowest floor out of it; parking or open space may be allowed."><path d="M20 200 Q160 180 240 270 L20 270 Z" class="dg-air"/><text x="60" y="250">Floodplain</text></g>
<g class="tip" data-tip="Steep slope (over 15%)|Close contour lines. Building here means retaining walls, stepped foundations and higher cost."><path d="M470 20 L620 20 L620 150 Q540 120 470 20 Z" class="dg-hatch"/><text x="540" y="60">Steep slope</text></g>
<line x1="20" y1="245" x2="620" y2="245" class="dg-line" stroke-dasharray="5 4"/>
<g class="tip" data-tip="Best building zone|Gentle slope, above the flood zone, inside the setbacks, long faces north and south, entry close to the street."><rect x="260" y="90" width="190" height="80" class="dg-accent"/><text x="355" y="135" text-anchor="middle" class="dg-ontint">Building</text></g>
<g class="tip" data-tip="Parking|Beside or behind the building, not between the building and the street. Keeps the street wall and a direct pedestrian entry."><rect x="470" y="170" width="140" height="70" class="dg-accent2"/><text x="540" y="210" text-anchor="middle">Parking</text></g>
<g class="tip" data-tip="Pedestrian entry|Accessible route straight from the public sidewalk and from accessible parking."><circle cx="355" cy="180" r="9" class="hs-dot"/><text x="372" y="196">Entry</text></g>
<text x="320" y="290" text-anchor="middle">Street (south) · public sidewalk</text>
<text x="30" y="36" font-size="11">N ↑</text>
</g></svg>`,
  formulas: [
    { name: "Daylight depth (rule of thumb)", f: "Useful daylight depth ≈ 1.5–2.5 × window head height" },
    { name: "Slope", f: "Slope % = Rise ÷ Run × 100" }
  ],
  example: { title: "Worked example: choosing between two sites on one lot", html: `<p>A 2-acre lot has a flat area near the street and a wooded rise at the back with 12% slopes. A creek corner sits in the 100-year floodplain. Place a one-story clinic on the flat area near the street, set back to match neighbors, with parking to the side. Use the floodplain corner for a bioretention basin and keep the wooded rise as open space. Result: minimal grading, a short accessible route, a street-facing entry and stormwater handled on site.</p>` },
  mistakes: [
    "Putting the parking lot between the building and the street in a walkable neighborhood.",
    "Siting on the flattest ground without checking the flood zone.",
    "Choosing a deep floor plate for an office that depends on daylight."
  ],
  scenario: { prompt: "A town wants a library on a corner lot that slopes 8% from the north down to the south street. Where do you put the building, parking and entry?",
    answer: "Set the building near the south street to hold the corner and give a level, accessible entry from the sidewalk. Step the floor or use a lower level to absorb the grade. Put parking to the side or rear, entered from the side street away from the intersection, and connect it with an accessible route. Long glazing faces north and south, with shading on the south." },
  quick: [
    { q: "Which stormwater approach stores runoff temporarily and releases it at a controlled rate?", opts: ["Retention", "Detention", "Infiltration trench", "Green roof"], a: 1, why: "Detention releases slowly. Retention keeps water permanently or lets it soak in." },
    { q: "Where should surface parking go to support a strong street wall?", opts: ["Between building and street", "Beside or behind the building", "Across the whole frontage", "On the roof only"], a: 1, why: "Keeping parking off the frontage lets the building define the street." }
  ],
  tryit: ["slope", "far"],
  refs: [
    { t: "2021 International Fire Code §503 (fire apparatus access roads)", a: "Free read-only (codes.iccsafe.org)" },
    { t: "2021 IBC §1104 (accessible route from site arrival points)", a: "Free read-only (codes.iccsafe.org)" },
    { t: "Brown & DeKay, Sun, Wind & Light, 3rd ed.", a: "Purchase" },
    { t: "AIA, Architect's Handbook, 15th ed., §9.6 case studies on neighborhood context (pp. 567–572)", a: "Your copy (Drive)" }
  ],
  check: ["q-ppd-14", "q-ppd-16", "q-ppd-20"]
});

ARE.LESSONS.push({
  id: "ppd-systems", div: "ppd", obj: ["ppd-3.1", "ppd-3.2", "ppd-3.3", "ppd-4.2"], title: "Choosing Structural, MEP & Special Systems",
  minutes: 45, level: "Core",
  summary: "Match structural, HVAC, plumbing, electrical, fire suppression, vertical transportation and acoustic systems to the building's use, spans, budget and height.",
  objectives: [
    "Select a structural system from spans, loads, height and construction type.",
    "Size structural members by rule of thumb for schematic design.",
    "Select an HVAC system type and reserve space for it.",
    "Select fire suppression, elevator and acoustic strategies for the use."
  ],
  why: "Systems drive floor-to-floor height, shaft locations, roof equipment, structure and cost. Choosing them early lets the design make room for them instead of fighting them.",
  exam: "PPD asks which system best fits a scenario (budget, span, flexibility, noise) and how systems affect configuration. Expect comparisons rather than engineering calculations.",
  body: `
<h3>Structure: match the system to the span</h3>
<table class="tbl"><thead><tr><th>System</th><th>Typical economical span</th><th>Notes</th></tr></thead><tbody>
<tr><td>Wood joists / light frame</td><td>12–20 ft</td><td>Low cost, combustible (Type V or III)</td></tr>
<tr><td>Open-web steel joists</td><td>20–60 ft</td><td>Light, fast; ducts pass through webs</td></tr>
<tr><td>Steel beams and girders</td><td>20–40 ft bays</td><td>Flexible, needs fireproofing in rated types</td></tr>
<tr><td>Concrete flat plate</td><td>15–30 ft</td><td>Thin, flat soffit; good for housing</td></tr>
<tr><td>Post-tensioned concrete</td><td>25–40 ft</td><td>Thinner slabs, longer spans; coring is restricted</td></tr>
<tr><td>Long-span trusses / space frames</td><td>60 ft and over</td><td>Gyms, arenas, hangars</td></tr>
</tbody></table>
<p>These ranges are typical, not limits; the structural engineer confirms them. Schematic rules of thumb: <strong>steel beam depth (in) ≈ span (ft) ÷ 2</strong>; <strong>open-web joist depth (in) ≈ span (ft) ÷ 2</strong> (roughly span/24); <strong>concrete flat plate thickness ≈ span ÷ 30</strong>. Lateral loads (wind, seismic) are resisted by shear walls, braced frames or moment frames, tied together by floor and roof diaphragms.</p>

<h3>HVAC: match the system to the use</h3>
<table class="tbl"><thead><tr><th>System</th><th>Fits</th><th>Space needs</th></tr></thead><tbody>
<tr><td>Packaged rooftop units</td><td>Low-rise retail, small offices</td><td>Roof structure and curbs; ducts in ceiling</td></tr>
<tr><td>Variable air volume (VAV), central air handler</td><td>Mid- and high-rise offices</td><td>Mechanical rooms, large shafts, deep plenums</td></tr>
<tr><td>Variable refrigerant flow (VRF) + dedicated outdoor air</td><td>Many zones, renovations, schools</td><td>Small refrigerant piping; outdoor units</td></tr>
<tr><td>Fan coil units + central plant</td><td>Hotels, residences</td><td>Piping shafts; unit in each room</td></tr>
<tr><td>Radiant floors / chilled beams + DOAS</td><td>High-performance buildings</td><td>Shallow ceilings; careful humidity control</td></tr>
</tbody></table>
<p>All-air systems need the most space: shafts, plenum depth and mechanical rooms. Water- and refrigerant-based systems move energy in small pipes and save ceiling depth.</p>

<h3>Special systems</h3>
<ul>
<li><strong>Fire suppression</strong> (NFPA 13): <em>wet pipe</em> in heated spaces; <em>dry pipe</em> where pipes could freeze; <em>preaction</em> where accidental discharge is costly (data rooms, archives); <em>deluge</em> for high-hazard spaces.</li>
<li><strong>Elevators</strong>: hydraulic for low-rise (typically up to about five or six stops), traction (including machine-room-less) for taller buildings and faster service.</li>
<li><strong>Acoustics</strong>: <em>STC</em> rates how well a partition blocks sound between rooms; <em>NRC</em> rates how much a surface absorbs. Use high-STC walls between noisy and quiet rooms and absorptive finishes to reduce reverberation.</li>
<li><strong>Lighting, security, communications</strong>: coordinate ceiling space, power and pathways early.</li>
</ul>`,
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="Section through a floor showing structure depth, duct, sprinkler and light fixture in the plenum. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Floor slab on deck|Structure on top of the plenum. Concrete on metal deck is common over steel framing."><rect x="40" y="30" width="560" height="16" class="dg-hatch"/><text x="610" y="42">Slab</text></g>
<g class="tip" data-tip="Steel beam|Depth roughly span ÷ 2 in inches at schematic design: a 30 ft span needs about a 16 in beam. Deepest element in the plenum."><rect x="200" y="46" width="22" height="64" class="dg-accent"/><text x="232" y="100">Beam</text></g>
<g class="tip" data-tip="Main supply duct|Largest MEP element. Route it parallel to beams or through planned openings; the engineer must approve any beam penetrations."><rect x="300" y="52" width="200" height="40" class="dg-air"/><text x="400" y="76" text-anchor="middle">Supply duct</text></g>
<g class="tip" data-tip="Sprinkler branch line|Small pipe below the duct; heads drop to the ceiling. Light hazard spacing is up to 225 sf per standard head (NFPA 13)."><line x1="40" y1="112" x2="600" y2="112" class="dg-line" stroke-width="3"/><text x="520" y="126">Sprinkler main</text></g>
<g class="tip" data-tip="Recessed light fixture|Needs 6–8 in of clear depth above the ceiling; coordinate with the duct layout."><rect x="110" y="122" width="60" height="14" class="dg-accent2"/><text x="110" y="152">Light</text></g>
<line x1="40" y1="138" x2="600" y2="138" class="dg-line"/><text x="610" y="142">Ceiling</text>
<g class="tip" data-tip="Plenum depth|Add the beam, duct, sprinkler, lights and clearances. This sets floor-to-floor height."><line x1="20" y1="46" x2="20" y2="138" class="dg-accentline" stroke-width="2"/><text x="24" y="170">Plenum depth sets floor-to-floor height</text></g>
</g></svg>`,
  formulas: [
    { name: "Steel beam depth (schematic)", f: "Depth (in) ≈ Span (ft) ÷ 2" },
    { name: "Concrete flat plate", f: "Thickness ≈ Span ÷ 30" },
    { name: "Floor-to-floor height", f: "= Ceiling height + plenum (structure + MEP) + floor assembly" }
  ],
  example: { title: "Worked example: a three-story office", html: `<p>Bays are 30 × 30 ft. Steel beams ≈ 30 ÷ 2 = 15 in, so W16. A VAV supply duct needs about 16–20 in, lights 8 in. If the duct runs under the beams: 16 + 18 + 8 ≈ 42 in of plenum, plus a 6 in slab and a 9 ft ceiling, gives about 13.5 ft floor-to-floor. Running ducts between beams or switching to VRF with a dedicated outdoor air system could save a foot per floor.</p>` },
  mistakes: [
    "Choosing a dry-pipe sprinkler system for a heated office. Wet pipe is simpler and responds faster.",
    "Forgetting roof structure for rooftop units.",
    "Coring post-tensioned slabs without locating tendons."
  ],
  scenario: { prompt: "A two-story elementary school addition needs many small zones, quiet classrooms and a tight floor-to-floor height to match the existing building. Which HVAC approach would you propose?",
    answer: "VRF (or a water-source heat pump) with a dedicated outdoor air system. It gives individual classroom control, small piping instead of large ducts (saving plenum depth to match existing floor levels), and quiet indoor units if selected for low noise. Locate outdoor units on the roof or in a screened yard." },
  quick: [
    { q: "A data room needs sprinklers but water damage from an accidental discharge would be costly. Which system?", opts: ["Wet pipe", "Dry pipe", "Preaction", "Deluge"], a: 2, why: "Preaction needs a detection signal before water enters the pipes." },
    { q: "Which rating describes how well a wall blocks sound between rooms?", opts: ["NRC", "STC", "IIC", "RT60"], a: 1, why: "STC is transmission loss through a partition. NRC is absorption." }
  ],
  tryit: ["beam"],
  refs: [
    { t: "Ching, Building Structures Illustrated, 2nd ed.", a: "Purchase" },
    { t: "Grondzik & Kwok, Mechanical and Electrical Equipment for Buildings, 13th ed. (an NCARB-listed reference)", a: "Purchase" },
    { t: "NFPA 13, Standard for the Installation of Sprinkler Systems", a: "Free read-only (nfpa.org, account required)" }
  ],
  check: ["q-ppd-24", "q-ppd-25", "q-ppd-28"]
});

ARE.LESSONS.push({
  id: "ppd-integration", div: "ppd", obj: ["ppd-2.3", "ppd-4.3", "ppd-5.1", "ppd-5.2", "ppd-5.3", "ppd-1.2"], title: "Integrating Program, Codes & Cost",
  minutes: 45, level: "Core",
  summary: "Bring program, multiple codes and budget together: allowable area, which code governs, evaluating alternatives and checking cost estimates.",
  objectives: [
    "Calculate allowable area with a frontage increase.",
    "Resolve requirements from several codes and standards (the more restrictive governs).",
    "Evaluate design alternatives against the program with a weighted matrix.",
    "Evaluate cost estimates by phase and test the design against the budget."
  ],
  why: "PPD's largest section is integration (32–38%), and the April 2026 update made cost objectives about evaluating estimates and design decisions, not producing them.",
  exam: "Case studies give a code excerpt and a program. You calculate allowable area, pick the governing requirement, or judge whether an estimate is reasonable.",
  body: `
<p class="edition">Code basis: <b>2021 IBC</b> Chapter 5 and §102.1. The exam supplies table values; this lesson teaches the method.</p>
<h3>Allowable area (one story above grade plane)</h3>
<p>Start with the tabular area <strong>A<sub>t</sub></strong> from IBC Table 506.2 for the occupancy, construction type and sprinkler condition. Add a <strong>frontage increase</strong> when the building faces a public way or open space at least 20 ft wide:</p>
<p><strong>I<sub>f</sub> = [F ÷ P − 0.25] × W ÷ 30</strong>, where F is the building perimeter that fronts a qualifying open space, P is the total perimeter and W is the open-space width (taken as no more than 30 ft unless the code permits more).</p>
<p>Then <strong>A<sub>a</sub> = A<sub>t</sub> + (NS × I<sub>f</sub>)</strong>, where NS is the tabular area for a nonsprinklered building. For multistory buildings, the code multiplies by the number of stories (to a limit), so read the excerpt given.</p>

<h3>When several codes apply</h3>
<p>A project typically follows the IBC plus the IECC (energy), IMC and IPC (mechanical and plumbing), IFC (fire), the accessibility standard (ICC A117.1, and for many owners the 2010 ADA Standards as civil-rights law), referenced NFPA standards and local zoning. When two provisions conflict, <strong>the most restrictive governs</strong>, and a specific requirement governs over a general one (IBC §102.1). Federal ADA requirements apply regardless of local adoption.</p>

<h3>Evaluating alternatives</h3>
<p>Use a <strong>weighted decision matrix</strong>: list criteria from the program (cost, adjacency, daylight, flexibility, schedule), weight each, score each option, and multiply. The highest total is the most defensible choice, and the matrix records why.</p>

<h3>Evaluating cost estimates</h3>
<table class="tbl"><thead><tr><th>Phase</th><th>Estimate method</th><th>Typical design contingency</th></tr></thead><tbody>
<tr><td>Programming / SD</td><td>Cost per square foot or per unit, from comparable buildings</td><td>Higher (often 10–20%)</td></tr>
<tr><td>DD</td><td>Systems / assemblies (UniFormat elements)</td><td>Moderate (often 5–10%)</td></tr>
<tr><td>CD</td><td>Quantity takeoff × unit prices</td><td>Low (often 0–5%)</td></tr>
</tbody></table>
<p>Percentages vary by firm and owner; the trend is what matters. To evaluate an estimate, check that quantities match the drawings, unit costs fit the region and date, escalation is carried to the midpoint of construction, and markups (general conditions, overhead and profit, bonds, contingency) are present but not doubled.</p>`,
  diagram: `<svg viewBox="0 0 640 230" role="img" aria-label="Allowable area build-up: tabular area plus frontage increase. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Tabular area (At)|From IBC Table 506.2 for the occupancy, construction type and sprinkler status. The exam gives you the value."><rect x="40" y="110" width="200" height="90" class="dg-accent"/><text x="140" y="160" text-anchor="middle" class="dg-ontint">At</text></g>
<g class="tip" data-tip="Frontage increase (NS × If)|Only for qualifying open frontage at least 20 ft wide. NS is the nonsprinklered tabular value."><rect x="240" y="150" width="120" height="50" class="dg-accent2"/><text x="300" y="180" text-anchor="middle">NS × If</text></g>
<g class="tip" data-tip="Allowable area (Aa)|The sum. Compare it to the actual floor area of each story. If too small, change the construction type, add sprinklers or add fire walls."><line x1="40" y1="96" x2="360" y2="96" class="dg-line"/><text x="200" y="88" text-anchor="middle">Aa = At + NS × If</text></g>
<g class="tip" data-tip="Frontage (F)|Perimeter facing a public way or open space at least 20 ft wide. Here 3 of 4 sides qualify."><rect x="430" y="70" width="150" height="110" class="dg-soft"/><line x1="430" y1="70" x2="580" y2="70" class="dg-accentline" stroke-width="4"/><line x1="580" y1="70" x2="580" y2="180" class="dg-accentline" stroke-width="4"/><line x1="430" y1="180" x2="580" y2="180" class="dg-accentline" stroke-width="4"/><text x="505" y="130" text-anchor="middle">Building</text><text x="505" y="210" text-anchor="middle">Thick edges = F</text></g>
</g></svg>`,
  formulas: [
    { name: "Frontage increase", f: "If = [F ÷ P − 0.25] × W ÷ 30" },
    { name: "Allowable area, one story", f: "Aa = At + (NS × If)" },
    { name: "Weighted score", f: "Score = Σ(weight × rating)" },
    { name: "Escalation", f: "Cost₂ = Cost₁ × (1 + rate)ⁿ to construction midpoint" }
  ],
  example: { title: "Worked example: frontage increase", html: `<p>A one-story building has a 400 ft perimeter; 300 ft faces streets 30 ft wide. Assume the table gives NS = 9,500 sf and A<sub>t</sub> (sprinklered) = 38,000 sf.</p>
<ol><li>I<sub>f</sub> = [300 ÷ 400 − 0.25] × 30 ÷ 30 = 0.50</li><li>NS × I<sub>f</sub> = 9,500 × 0.50 = 4,750 sf</li><li>A<sub>a</sub> = 38,000 + 4,750 = <b>42,750 sf</b></li></ol>` },
  mistakes: [
    "Using the sprinklered tabular value in the frontage term. The increase multiplies NS.",
    "Assuming local code adoption decides whether the ADA applies. It is federal law.",
    "Accepting an estimate without checking its date and escalation."
  ],
  scenario: { prompt: "The DD estimate is 9% over budget. The owner asks you to 'make it work' without losing program area. What do you evaluate first?",
    answer: "Find where the cost sits: compare the estimate by system to benchmarks. Look at envelope ratio and glazing, structural bay sizes, mechanical system type, finishes and site work. Offer priced alternatives (simpler massing, standard bay sizes, finish changes, bid alternates) with their effect on the program, and let the owner decide. Confirm the estimate's escalation and contingency assumptions are reasonable before redesigning." },
  quick: [
    { q: "The IBC requires a 44 in corridor; the accessibility standard requires 36 in for the route. What must the corridor be?", opts: ["36 in", "40 in", "44 in", "Either"], a: 2, why: "The most restrictive requirement governs." },
    { q: "Which estimate method fits schematic design?", opts: ["Quantity takeoff", "Cost per square foot from comparables", "Subcontractor bids", "Unit prices per item"], a: 1, why: "Detail is too limited for takeoff at SD." }
  ],
  tryit: ["allow"],
  refs: [
    { t: "2021 IBC Chapter 5: §506.2 allowable area; §506.3 frontage increase; §102.1 conflicting provisions", a: "Free read-only (codes.iccsafe.org)" },
    { t: "RSMeans Square Foot Costs (current year)", a: "Purchase" },
    { t: "ASTM E1557, UniFormat II classification", a: "Purchase" }
  ],
  check: ["q-ppd-37", "q-ppd-38", "q-ppd-40"]
});

ARE.LESSONS.push({
  id: "pdd-sizing", div: "pdd", obj: ["pdd-1.1", "pdd-1.2", "pdd-1.3", "pdd-1.4", "pdd-1.6"], title: "Sizing & Coordinating Structure and MEP",
  minutes: 45, level: "Core",
  summary: "Rough-size beams, ducts and plumbing fixture counts, then coordinate systems in plenums and shafts so they fit.",
  objectives: [
    "Calculate tributary loads and beam loads.",
    "Size a duct from airflow and velocity.",
    "Count required plumbing fixtures from occupant load.",
    "Coordinate structure, MEP and specialty systems in plenums and shafts."
  ],
  why: "PDD expects you to check whether systems fit and to spot conflicts before they become change orders.",
  exam: "Quantitative items (shown as multiple choice) ask for a tributary load, a duct area or a fixture count. Hotspot items ask where a conflict occurs in a section.",
  body: `
<h3>Structural loads</h3>
<p>A beam carries the floor area halfway to the next beam on each side: its <strong>tributary width</strong>. Uniform load <strong>w (plf) = load (psf) × tributary width (ft)</strong>. A column carries its <strong>tributary area</strong>: half the bay in each direction. Total load = load (psf) × tributary area. For a simply supported beam under uniform load, maximum moment <strong>M = wL² ÷ 8</strong> and each end reaction <strong>R = wL ÷ 2</strong>.</p>
<p>Typical live loads (ASCE 7): offices 50 psf, corridors above the first floor 80 psf, assembly with movable seats 100 psf, light storage 125 psf.</p>

<h3>Ducts</h3>
<p>Airflow <strong>Q (cfm) = A (sf) × V (fpm)</strong>, so <strong>A = Q ÷ V</strong>. Main ducts in quiet buildings run at roughly 1,000–1,500 fpm; higher velocity means smaller ducts but more noise and fan energy. Example: 2,400 cfm at 1,200 fpm needs 2 sf, such as a 24 × 12 in duct.</p>

<h3>Plumbing fixtures</h3>
<p>Fixture counts come from IBC Table 2902.1 by occupancy, usually split 50/50 by sex, rounding up. For Group B (business), the table requires water closets at 1 per 25 for the first 50 occupants and 1 per 50 for the remainder, and lavatories at 1 per 40 for the first 80 and 1 per 80 for the remainder, plus drinking fountains (1 per 100) and a service sink. Use the table excerpt the exam provides.</p>

<h3>Specialty systems</h3>
<p>Elevators need a pit, overhead clearance and, for traction units with machine rooms, a machine room. Light-hazard sprinkler spacing is up to 225 sf per standard head (NFPA 13). Wall assemblies between dwelling units need STC 50 (45 if field-tested) under IBC §1206.</p>

<h3>Coordination</h3>
<p>Stack shafts, wet walls and electrical rooms vertically. Reserve plenum depth for the deepest element at its worst crossing. Locate beam penetrations only where the structural engineer approves. Run interdisciplinary clash checks in BIM, then review the overlaid plans as a person.</p>`,
  diagram: `<svg viewBox="0 0 640 270" role="img" aria-label="Framing plan showing a beam's tributary width and a column's tributary area. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<rect x="60" y="30" width="480" height="210" class="dg-soft"/>
<line x1="60" y1="135" x2="540" y2="135" class="dg-line" stroke-width="3"/><line x1="300" y1="30" x2="300" y2="240" class="dg-line" stroke-width="3"/>
<g class="tip" data-tip="Beam tributary width|Halfway to the beams on each side. Here 10 ft + 10 ft = 20 ft. Load per foot = psf × 20."><rect x="60" y="85" width="240" height="100" class="dg-accent2" opacity=".75"/><text x="180" y="126" text-anchor="middle">Beam tributary</text><text x="180" y="142" text-anchor="middle">width 20 ft</text></g>
<g class="tip" data-tip="Column tributary area|Half the bay in each direction around the column. 24 ft × 20 ft = 480 sf. Load = psf × 480."><rect x="420" y="85" width="120" height="100" class="dg-air"/><text x="480" y="132" text-anchor="middle">Column</text><text x="480" y="148" text-anchor="middle">tributary</text></g>
<g class="tip" data-tip="Column|Carries the reactions from beams framing into it."><rect x="534" y="129" width="12" height="12" class="dg-accent"/></g>
<text x="300" y="262" text-anchor="middle">Bays: 24 ft × 20 ft</text>
</g></svg>`,
  formulas: [
    { name: "Beam uniform load", f: "w (plf) = psf × tributary width (ft)" },
    { name: "Simple-span moment", f: "M = wL² ÷ 8 · R = wL ÷ 2" },
    { name: "Column / area load", f: "P = psf × tributary area" },
    { name: "Duct size", f: "A (sf) = Q (cfm) ÷ V (fpm)" },
    { name: "Fixture count", f: "Fixtures = occupants per sex ÷ table ratio (round up)" }
  ],
  example: { title: "Worked example: a 20 × 24 ft tributary area", html: `<p>A column supports a tributary area of 20 × 24 = 480 sf. With a 150 psf storage live load, the live load on the column is 480 × 150 = <b>72,000 lb</b> (72 kips). Dead load is added separately by the engineer.</p>` },
  mistakes: [
    "Using the full bay rather than half the bay on each side.",
    "Sizing ducts at high velocity in quiet spaces such as classrooms and libraries.",
    "Rounding fixture counts down."
  ],
  scenario: { prompt: "During CD coordination, a 30 in deep duct must cross a 24 in deep girder in a corridor with a 9 ft ceiling and 12 ft floor-to-floor. What are your options?",
    answer: "Stacked, they need 54 in, but only 36 in exists (12 ft − 9 ft). Options: reroute the duct to cross elsewhere; flatten it (same area, wider and shallower, e.g. 48 × 16 in); ask the engineer about a reinforced web opening; or lower the corridor ceiling locally with a soffit. Document the decision on the drawings and in the coordination log." },
  quick: [
    { q: "A 3,000 cfm supply at 1,000 fpm needs a duct of about how many square feet?", opts: ["0.3 sf", "3 sf", "30 sf", "1 sf"], a: 1, why: "A = Q ÷ V = 3,000 ÷ 1,000 = 3 sf." },
    { q: "A beam's tributary width with beams 10 ft apart on both sides is:", opts: ["5 ft", "10 ft", "20 ft", "40 ft"], a: 1, why: "Half of 10 ft on each side: 5 + 5 = 10 ft." }
  ],
  tryit: ["trib", "duct", "fixtures"],
  refs: [
    { t: "ASCE 7-22, Table 4.3-1 (minimum live loads)", a: "Purchase; free read-only access on some platforms" },
    { t: "2021 IBC §2902.1 and Table 2902.1 (minimum plumbing fixtures); §1206 (sound transmission)", a: "Free read-only (codes.iccsafe.org)" },
    { t: "Grondzik & Kwok, Mechanical and Electrical Equipment for Buildings", a: "Purchase" }
  ],
  check: ["q-pdd-15", "q-pdd-17", "q-pdd-21"]
});

ARE.LESSONS.push({
  id: "pdd-docs", div: "pdd", obj: ["pdd-2.1", "pdd-2.2", "pdd-2.5", "pdd-4.2", "pdd-5.1"], title: "Documenting Site, Building & Changes",
  minutes: 40, level: "Core",
  summary: "What each drawing type must show, how to document site work and accessibility at detail level, how to issue changes, and how to check an estimate.",
  objectives: [
    "Choose the right drawing or schedule for each kind of information.",
    "Document grading, utilities and site details.",
    "Detail accessibility requirements: clearances, mounting heights, grab bars.",
    "Issue and track changes to the documents; analyze a CD estimate."
  ],
  why: "Clear documents reduce RFIs, change orders and claims. Accessibility errors at detail level are among the most common and visible failures.",
  exam: "Items ask which sheet should carry a piece of information, what a grading plan must show, the correct mounting height, or how to communicate a late change.",
  body: `
<h3>Which document carries what</h3>
<table class="tbl"><thead><tr><th>Information</th><th>Where</th></tr></thead><tbody>
<tr><td>Room layout, dimensions, wall types</td><td>Floor plans and wall-type legend</td></tr>
<tr><td>Vertical relationships, heights</td><td>Building and wall sections</td></tr>
<tr><td>Exterior materials, openings</td><td>Elevations</td></tr>
<tr><td>Ceiling heights, lights, diffusers</td><td>Reflected ceiling plans</td></tr>
<tr><td>Repetitive data (doors, hardware, finishes)</td><td>Schedules</td></tr>
<tr><td>How pieces connect</td><td>Details (large scale)</td></tr>
<tr><td>Quality, products, installation standards</td><td>Specifications</td></tr>
</tbody></table>

<h3>Site documentation</h3>
<p>The civil set starts from a <strong>survey</strong> (boundaries, easements, topography, utilities). The <strong>grading plan</strong> shows existing contours dashed and proposed contours solid, spot elevations at critical points (doors, ramps, curbs, drains), slopes with arrows, and the finished floor elevation. The <strong>utility plan</strong> shows connections, inverts and sizes. Site details cover paving, curbs, ramps and curb ramps. Positive drainage away from the building, often 5% for the first 10 ft where the code requires it, protects foundations.</p>

<h3>Accessibility at detail level (2010 ADA Standards)</h3>
<ul>
<li>Water closet centerline 16–18 in from the side wall; grab bars mounted 33–36 in above the floor.</li>
<li>Lavatory rim or counter no higher than 34 in, with knee clearance below.</li>
<li>Operable parts (switches, hardware) within reach range, generally 15–48 in above the floor; door hardware 34–48 in.</li>
<li>Clear floor space 30 × 48 in at fixtures and controls; 60 in turning space in toilet rooms.</li>
</ul>

<h3>Issuing changes</h3>
<p>During bidding, changes go out as <strong>addenda</strong>. After award, minor clarifications go by <strong>ASI</strong>; changes affecting cost or time by <strong>proposal request</strong> (G709), then <strong>change order</strong> or <strong>CCD</strong>. Revised sheets carry revision clouds, delta tags and revision block entries. Keep a change log so the owner and consultants can see each change, its cause and its status.</p>

<h3>Analyzing a CD estimate</h3>
<p>Check quantities against the drawings, unit prices for region and date, escalation to the construction midpoint, and markups. Reconcile with the DD estimate: large swings point to scope added or missed.</p>`,
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="Accessible toilet room plan with dimensions. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<rect x="80" y="30" width="360" height="210" class="dg-soft"/>
<g class="tip" data-tip="Water closet|Centerline 16–18 in from the side wall (ADA 604.2). Seat height 17–19 in."><rect x="96" y="40" width="40" height="56" class="dg-accent"/><text x="146" y="70">WC</text></g>
<g class="tip" data-tip="Side grab bar|At least 42 in long, 33–36 in above the floor (ADA 604.5, 609.4)."><line x1="84" y1="60" x2="84" y2="150" class="dg-accentline" stroke-width="5"/><text x="20" y="110">Grab bar</text></g>
<g class="tip" data-tip="Turning space|60 in diameter circle or T-shaped space (ADA 304)."><circle cx="300" cy="150" r="70" class="dg-air" opacity=".7"/><text x="300" y="154" text-anchor="middle">60 in turning</text></g>
<g class="tip" data-tip="Lavatory|Rim or counter 34 in max above the floor, with knee and toe clearance (ADA 606)."><rect x="380" y="40" width="50" height="40" class="dg-accent2"/><text x="405" y="64" text-anchor="middle">Lav</text></g>
<g class="tip" data-tip="Door|32 in clear width minimum, with maneuvering clearance on the pull side (ADA 404)."><line x1="440" y1="180" x2="440" y2="230" class="dg-line" stroke-width="6"/><text x="450" y="210">Door</text></g>
<line x1="84" y1="30" x2="116" y2="30" class="dg-line"/><text x="100" y="22" text-anchor="middle" font-size="11">16–18″</text>
</g></svg>`,
  formulas: [
    { name: "Grade slope", f: "% = Δ elevation ÷ distance × 100" },
    { name: "Estimate check", f: "Σ(qty × unit cost) × (1 + markups) × escalation factor" }
  ],
  example: { title: "Applying it: a late change during bidding", html: `<p>Ten days before bids are due, the owner adds a card-access system at three doors. Issue an addendum with the revised door hardware schedule, the electrical drawings and the specification section, delivered to all plan holders, with enough time for bidders to price it (or extend the bid date). Bidders acknowledge it on the bid form.</p>` },
  mistakes: [
    "Dimensioning the same item on both plan and detail with different values.",
    "Showing proposed contours as dashed lines.",
    "Locating grab bars by eye instead of by dimension."
  ],
  scenario: { prompt: "A contractor's RFI says a door near the entry has no strike-side maneuvering clearance on the pull side. What do you check and how do you respond?",
    answer: "Check the plan against the ADA 404.2.4 maneuvering clearances for a front-approach pull side (18 in beyond the latch side). If the clearance is missing, revise the layout: shift the door, change the swing, or add a power operator. Issue the fix by ASI, or by proposal request and change order if it affects cost, with clouded revised sheets." },
  quick: [
    { q: "On a grading plan, proposed contours are usually drawn:", opts: ["Dashed", "Solid", "Dotted", "Not shown"], a: 1, why: "Existing contours are dashed; proposed are solid." },
    { q: "Grab bars are mounted at what height above the floor?", opts: ["27–30 in", "33–36 in", "38–42 in", "44–48 in"], a: 1, why: "ADA 609.4: 33 in minimum to 36 in maximum to the top of the gripping surface." }
  ],
  tryit: ["slope"],
  refs: [
    { t: "2010 ADA Standards for Accessible Design §§304, 404, 604, 606, 609", a: "Free (ada.gov)" },
    { t: "US National CAD Standard (sheet types and conventions)", a: "Purchase" },
    { t: "AIA G709 Proposal Request (sample in your ARE Prep folder)", a: "Your copy (Drive)" }
  ],
  check: ["q-pdd-23", "q-pdd-25", "q-pdd-30"]
});

ARE.LESSONS.push({
  id: "pa-site", div: "pa", obj: ["pa-1.3", "pa-3.1", "pa-3.2", "pa-3.3"], title: "Site Analysis, Site Reports & Sustainability",
  minutes: 40, level: "Core",
  summary: "Read a site and its reports, interpret site graphics, and use onsite resources sustainably.",
  objectives: [
    "Evaluate a site's attributes against a program (size, slope, soils, access, utilities).",
    "Combine findings from survey, geotechnical, environmental and traffic reports.",
    "Read contour maps, wind roses and sun path diagrams.",
    "Choose strategies that use onsite resources: sun, wind, water, vegetation, existing structures."
  ],
  why: "Programming decisions depend on whether the site can hold the program. Reports carry the facts that make or break feasibility.",
  exam: "PA case studies give a geotechnical summary, a survey and a program, and ask what the reports mean for the project. Graphic items ask you to read a contour map or wind rose.",
  body: `
<h3>Site attributes against the program</h3>
<p>Check net buildable area after setbacks and easements; slope (under 5% easiest); soil bearing and groundwater; access and frontage; utility capacity at the street; views, noise and neighbors. A site that fits the footprint but not the parking, or the parking but not the stormwater, does not fit the program.</p>

<h3>What each report tells you</h3>
<table class="tbl"><thead><tr><th>Report</th><th>Key content</th><th>Design impact</th></tr></thead><tbody>
<tr><td>Survey (ALTA/NSPS)</td><td>Boundaries, easements, topography, utilities, encroachments</td><td>Buildable area; legal constraints</td></tr>
<tr><td>Geotechnical</td><td>Borings, soil types, bearing capacity, groundwater, recommendations</td><td>Foundation type; basement feasibility</td></tr>
<tr><td>Phase I / II ESA</td><td>Recognized environmental conditions; sampling results</td><td>Remediation cost; purchase decision</td></tr>
<tr><td>Traffic study</td><td>Trip generation, turning movements</td><td>Driveway location, road improvements</td></tr>
<tr><td>Wetland delineation / flood map</td><td>Protected areas, flood zones</td><td>No-build zones; floor elevation</td></tr>
</tbody></table>
<p>Example: a geotech report finding soft clay to 15 ft with groundwater at 6 ft makes a basement costly and may call for deep foundations (piles or piers), affecting budget and schedule.</p>

<h3>Reading site graphics</h3>
<ul>
<li><strong>Contours</strong>: close spacing means steep; contours that bend to point uphill mark a valley (water collects); pointing downhill mark a ridge.</li>
<li><strong>Wind rose</strong>: bars point to the direction the wind comes <em>from</em>; length shows how often; color or width shows speed.</li>
<li><strong>Sun path diagram</strong>: altitude and azimuth by hour and season; use it to size overhangs and find shaded areas.</li>
</ul>

<h3>Using onsite resources</h3>
<p>Orient for passive solar and daylight; place outdoor spaces in the lee of winter winds and open to summer breezes; manage stormwater with bioswales, rain gardens, permeable paving and green roofs; reuse existing buildings and materials; preserve mature trees for shade; use high-reflectance roofing and shade to reduce heat-island effects.</p>`,
  diagram: `<svg viewBox="0 0 640 280" role="img" aria-label="Contour map with a ridge and valley, and a wind rose. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Steep zone|Contours close together: large change in elevation over a short distance."><path d="M40 60 Q140 40 240 60" class="dg-line"/><path d="M40 72 Q140 52 240 72" class="dg-line"/><path d="M40 84 Q140 64 240 84" class="dg-line"/><text x="250" y="72">Steep</text></g>
<g class="tip" data-tip="Gentle zone|Contours far apart: the easiest place to build and park."><path d="M40 150 Q140 140 240 150" class="dg-line"/><path d="M40 210 Q140 200 240 210" class="dg-line"/><text x="250" y="182">Gentle</text></g>
<g class="tip" data-tip="Valley (swale)|Contours form a V pointing uphill. Water collects and flows here; keep buildings out and use it for drainage."><path d="M60 250 L140 225 L220 250" class="dg-accentline" stroke-width="2"/><text x="140" y="270" text-anchor="middle">Valley: V points uphill</text></g>
<g class="tip" data-tip="Wind rose|Each bar points toward where the wind comes FROM. Longer bars mean more frequent winds. Here the prevailing wind is from the west-southwest."><circle cx="470" cy="140" r="90" class="dg-soft"/><line x1="470" y1="140" x2="390" y2="170" class="dg-accentline" stroke-width="10"/><line x1="470" y1="140" x2="470" y2="90" class="dg-accentline" stroke-width="5"/><line x1="470" y1="140" x2="520" y2="110" class="dg-accentline" stroke-width="4"/><text x="470" y="40" text-anchor="middle">N</text><text x="470" y="250" text-anchor="middle">Wind rose</text></g>
</g></svg>`,
  formulas: [
    { name: "Net buildable area", f: "= Lot area − setbacks − easements − protected areas" },
    { name: "Slope", f: "% = Δ elevation ÷ horizontal distance × 100" }
  ],
  example: { title: "Applying it: combining reports", html: `<p>A survey shows a 25 ft utility easement across the back third of the lot. The geotech report recommends shallow spread footings with 3,000 psf allowable bearing. The Phase I finds no recognized environmental conditions. Conclusion: build on the front two-thirds with conventional foundations, put parking or stormwater over the easement (if its terms allow), and no Phase II is needed.</p>` },
  mistakes: [
    "Reading a wind rose as where the wind blows toward.",
    "Treating a geotech recommendation as optional at programming.",
    "Ignoring utility capacity until design development."
  ],
  scenario: { prompt: "A school board has two candidate sites: A is flat with soft clay and a high water table; B slopes 6–8% with rock at 4 ft. The program needs a two-story school and fields. Which concerns does each raise?",
    answer: "Site A suits fields but may need deep foundations or soil improvement and makes a basement impractical; drainage design matters. Site B needs grading and possibly rock excavation (costly blasting or ripping), but rock gives good bearing; a stepped building could work with the slope while fields need terracing. Compare foundation, earthwork and stormwater costs against the budget before choosing." },
  quick: [
    { q: "On a wind rose, the longest bar points toward:", opts: ["Where the wind blows to", "Where the wind comes from most often", "True north", "The calmest direction"], a: 1, why: "Wind roses show the direction of origin and frequency." },
    { q: "Which report tells you the soil bearing capacity?", opts: ["ALTA survey", "Geotechnical report", "Phase I ESA", "Traffic study"], a: 1, why: "Geotechnical borings and lab tests give bearing and foundation recommendations." }
  ],
  tryit: ["slope"],
  refs: [
    { t: "Brown & DeKay, Sun, Wind & Light, 3rd ed. (an NCARB-listed reference)", a: "Purchase" },
    { t: "ASTM E1527-21 (Phase I ESA)", a: "Purchase" },
    { t: "AIA, Architect's Handbook, 15th ed., §16.3 Sustainable design (p. 1021)", a: "Your copy (Drive)" }
  ],
  check: ["q-pa-13", "q-pa-16", "q-pa-19"]
});

ARE.LESSONS.push({
  id: "pa-building", div: "pa", obj: ["pa-4.1", "pa-4.2", "pa-4.4", "pa-4.5", "pa-4.6", "pa-4.7"], title: "Building Analysis, Feasibility & System Alternatives",
  minutes: 40, level: "Core",
  summary: "Assess existing buildings and documents, test budget and schedule feasibility, choose system alternatives, and read program graphics.",
  objectives: [
    "Evaluate an existing building's condition, code status and fit with the program.",
    "Use assessments and reports to inform the program.",
    "Assess whether a budget and schedule can deliver the scope.",
    "Identify structural and building system alternatives for the program and budget.",
    "Read bubble, adjacency, blocking and stacking diagrams."
  ],
  why: "Section 4 is the largest part of PA (37–43%). The April 2026 update made 4.5 about reviewing whether a budget and schedule are feasible, not creating them.",
  exam: "Case studies give a facility assessment, a program and an owner's budget, and ask whether the scope fits or what to do first.",
  body: `
<h3>Existing buildings</h3>
<p>Gather existing drawings, a facility condition assessment, a hazardous materials survey (asbestos and lead are likely in buildings from before about 1980), and a code analysis. A <strong>change of occupancy</strong> or major alteration can trigger upgrades under the IEBC: egress, fire protection, accessibility and structure, especially floor live load and lateral capacity.</p>

<h3>Budget feasibility</h3>
<p>The owner's <strong>total project budget</strong> is more than construction cost. It includes soft costs: fees, permits, testing, furniture and equipment, technology, financing, moves, and owner contingency, often around 20–35% of construction cost, plus land if purchased. To test feasibility: gross area × cost per sf (escalated to the construction midpoint) + soft costs + contingency, compared with the available funds.</p>
<p>When the scope does not fit, the owner can reduce area, lower quality, phase the work, or increase the budget. The architect lays out these options; the owner decides.</p>

<h3>Schedule feasibility</h3>
<p>Add design (often 9–15 months for mid-size public work), permits, procurement and construction, then compare with the required occupancy date. Fast-tracking or CM at risk can compress the schedule, at a cost.</p>

<h3>System alternatives</h3>
<p>Offer structural and building system options that fit the program: long spans for gyms, flat plates for housing, steel for flexible offices. Compare first cost, schedule, floor-to-floor height and life-cycle cost.</p>

<h3>Program graphics</h3>
<ul>
<li><strong>Adjacency matrix</strong>: grid of required closeness between each pair of spaces.</li>
<li><strong>Bubble diagram</strong>: spaces as circles sized roughly to area, joined by lines whose weight shows importance.</li>
<li><strong>Blocking diagram</strong>: departments as rectangles on a floor plate.</li>
<li><strong>Stacking diagram</strong>: departments assigned to floors in section.</li>
</ul>`,
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="Bubble diagram of a clinic program. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<line x1="140" y1="130" x2="300" y2="90" class="dg-line" stroke-width="5"/><line x1="300" y1="90" x2="460" y2="130" class="dg-line" stroke-width="5"/><line x1="300" y1="90" x2="300" y2="200" class="dg-line" stroke-width="2"/><line x1="460" y1="130" x2="300" y2="200" class="dg-line" stroke-width="1" stroke-dasharray="4 3"/>
<g class="tip" data-tip="Entry / waiting|Public zone near the street. Strong link (thick line) to reception."><circle cx="140" cy="130" r="48" class="dg-air"/><text x="140" y="134" text-anchor="middle">Waiting</text></g>
<g class="tip" data-tip="Reception|Controls access between public and clinical zones; essential adjacency to both."><circle cx="300" cy="90" r="38" class="dg-accent2"/><text x="300" y="94" text-anchor="middle">Reception</text></g>
<g class="tip" data-tip="Exam rooms|Largest area, so the largest bubble. Essential adjacency to reception; private zone."><circle cx="460" cy="130" r="62" class="dg-accent"/><text x="460" y="134" text-anchor="middle" class="dg-ontint">Exam rooms</text></g>
<g class="tip" data-tip="Staff|Desirable link to reception (thin line), weak link to exams (dashed)."><circle cx="300" cy="200" r="34" class="dg-soft"/><text x="300" y="204" text-anchor="middle">Staff</text></g>
<text x="20" y="245">Line weight = importance of adjacency · bubble size ≈ area</text>
</g></svg>`,
  formulas: [
    { name: "Total project budget", f: "= Construction cost + soft costs + contingency (+ land)" },
    { name: "Construction cost (feasibility)", f: "= Gross area × $/sf × escalation factor" }
  ],
  example: { title: "Worked example: does the budget work?", html: `<p>Program: 24,000 gsf at $410/sf today; construction midpoint in 2 years at 4%/year escalation; soft costs 25%; owner contingency 5% of construction. Construction = 24,000 × 410 × 1.04² ≈ $10.64M. Soft costs ≈ $2.66M; contingency ≈ $0.53M; total ≈ <b>$13.8M</b>. If the owner has $12.5M, present options: reduce area about 10%, phase, adjust quality or add funds.</p>` },
  mistakes: [
    "Comparing construction cost alone to the owner's total budget.",
    "Ignoring escalation to the construction midpoint.",
    "Skipping a hazardous materials survey on an older building."
  ],
  scenario: { prompt: "A church wants to convert its 1960s education wing to a community kitchen and daycare. What do you investigate before programming?",
    answer: "Change of occupancy triggers (daycare is Group E or I-4 depending on ages and numbers; kitchen hood and fire suppression); egress and fire protection; accessibility; structural capacity for the new use; hazardous materials (asbestos tile and pipe insulation are likely in a 1960s building); mechanical capacity for the kitchen exhaust and makeup air; and licensing rules for daycare (outdoor play area, room sizes). Then test the budget." },
  quick: [
    { q: "Which diagram assigns departments to floors?", opts: ["Bubble diagram", "Adjacency matrix", "Stacking diagram", "Wind rose"], a: 2, why: "Stacking shows the vertical arrangement." },
    { q: "Which is a soft cost?", opts: ["Concrete", "Architect's fee", "Roofing", "Site paving"], a: 1, why: "Fees, permits, FF&E and similar items are soft costs." }
  ],
  tryit: ["budget"],
  refs: [
    { t: "2021 International Existing Building Code (change of occupancy)", a: "Free read-only (codes.iccsafe.org)" },
    { t: "Pena & Parshall, Problem Seeking, 5th ed.", a: "Purchase" },
    { t: "AIA, Architect's Handbook, 15th ed., §12.2 programming and net assignable area (pp. 825–827); §10.5 programming backgrounder (p. 664)", a: "Your copy (Drive)" }
  ],
  check: ["q-pa-20", "q-pa-24", "q-pa-26"]
});

ARE.LESSONS.push({
  id: "pjm-delivery-docs", div: "pjm", obj: ["pjm-1.2", "pjm-3.4", "pjm-4.3", "pjm-4.4", "pjm-5.1"], title: "Staffing, Delivery Documents & Approvals",
  minutes: 35, level: "Core",
  summary: "Level staff across projects, document to suit the delivery method, integrate owner consultants, and get regulatory approvals.",
  objectives: [
    "Allocate staff with a resource plan and resolve overloads.",
    "Adjust documentation for design-bid-build, CM at risk, design-build and IPD.",
    "Integrate the owner's separate consultants under B101.",
    "Plan for approvals from authorities having jurisdiction and comply with laws affecting the project."
  ],
  why: "The same building is documented differently depending on who builds it and when. Approvals and laws set hard deadlines the schedule must respect.",
  exam: "Scenarios ask what the documents must include for a given delivery method, who coordinates an owner's consultant, or which approval comes first.",
  body: `
<h3>Allocating resources</h3>
<p>A <strong>resource plan</strong> shows hours needed by person and week across all projects. When one person is overloaded, <strong>level</strong> the plan: move noncritical tasks into float, reassign work, add staff, or renegotiate milestones. Match skills to tasks: senior staff on decisions and coordination, junior staff on production with review.</p>

<h3>Documenting for the delivery method</h3>
<table class="tbl"><thead><tr><th>Method</th><th>Documentation approach</th></tr></thead><tbody>
<tr><td>Design-bid-build</td><td>Complete, coordinated CDs for competitive bidding; one bid set</td></tr>
<tr><td>CM at risk</td><td>Early packages (site, foundations, steel) issued in sequence; GMP set priced on partial documents with clear qualifications</td></tr>
<tr><td>Design-build (owner side)</td><td>Bridging or performance-criteria documents; the design-builder completes the design</td></tr>
<tr><td>IPD</td><td>Shared model and target-value design; documents developed with trade partners</td></tr>
</tbody></table>

<h3>Owner's consultants</h3>
<p>Under B101–2017 the owner furnishes services such as surveys, geotechnical work and specialty consultants it retains. The architect <strong>coordinates</strong> its services with theirs and is <strong>entitled to rely</strong> on the accuracy and completeness of the information they provide (§3.1.2), but must promptly notify the owner of any errors or inconsistencies it becomes aware of. The owner coordinates its own consultants' services with the architect's (§5.8).</p>

<h3>Approvals and laws</h3>
<p>Typical sequence: zoning approval (site plan, variances) → building permit plan review (building, fire, health) → inspections → certificate of occupancy. Laws beyond the building code include the ADA, Fair Housing Act design requirements for multifamily housing, energy codes, environmental permits, licensing law (who may seal) and antitrust law (firms may not agree on fees).</p>`,
  diagram: `<svg viewBox="0 0 640 220" role="img" aria-label="Timeline of approvals from zoning to certificate of occupancy. Tap steps to learn more.">
<g class="dg-text" font-size="11">
<defs><marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="dg-arrowhead"/></marker></defs>
<g class="tip" data-tip="Zoning / site plan approval|Planning commission or zoning board. Variances and conditional uses here. Often months; start in SD."><rect x="20" y="80" width="120" height="50" class="dg-accent"/><text x="80" y="110" text-anchor="middle" class="dg-ontint">Zoning</text></g>
<g class="tip" data-tip="Building permit review|Plans examiners check building, fire, accessibility, energy and plumbing codes. Respond to comments in writing."><rect x="170" y="80" width="120" height="50" class="dg-accent"/><text x="230" y="110" text-anchor="middle" class="dg-ontint">Permit review</text></g>
<g class="tip" data-tip="Inspections|The building official and special inspectors check the work during construction."><rect x="320" y="80" width="120" height="50" class="dg-soft"/><text x="380" y="110" text-anchor="middle">Inspections</text></g>
<g class="tip" data-tip="Certificate of occupancy|Issued by the building official when the work complies. Owners may not occupy before it (a temporary CO is sometimes possible)."><rect x="470" y="80" width="150" height="50" class="dg-accent2"/><text x="545" y="110" text-anchor="middle">Certificate of occupancy</text></g>
<path d="M140 105 L170 105" class="dg-line" marker-end="url(#arr3)"/><path d="M290 105 L320 105" class="dg-line" marker-end="url(#arr3)"/><path d="M440 105 L470 105" class="dg-line" marker-end="url(#arr3)"/>
</g></svg>`,
  formulas: [{ name: "Staff loading", f: "Load % = Assigned hours ÷ Available hours" }],
  example: { title: "Applying it: CM at risk early packages", html: `<p>The CM needs foundations to start in March, but the building design will not be finished until May. Issue a foundation package in January with the structural grid, loads and column sizes fixed, and note the information still open. The GMP is priced on DD-plus documents with a list of assumptions; later packages that change those assumptions become GMP adjustments.</p>` },
  mistakes: [
    "Issuing a complete bid set for CM at risk without planning early packages.",
    "Taking responsibility for the accuracy of the owner's geotechnical report.",
    "Waiting until CDs to start zoning approvals."
  ],
  scenario: { prompt: "Your project architect is booked at 140% for three weeks across two projects. What do you do?",
    answer: "Review the resource plan: move noncritical tasks into available float, reassign production work to staff with capacity under the project architect's review, and only then renegotiate a milestone with the owner if needed. Record the change in the work plan." },
  quick: [
    { q: "Under design-build, the owner's architect most often prepares:", opts: ["Complete CDs", "Bridging or performance-criteria documents", "Shop drawings", "Nothing"], a: 1, why: "The design-builder completes the design." },
    { q: "Who coordinates the owner's separate consultants' services with the architect's?", opts: ["The contractor", "The owner (B101 §5.8)", "The building official", "The geotechnical engineer"], a: 1, why: "The architect coordinates its own services with them and may rely on their information." }
  ],
  tryit: [],
  refs: [
    { t: "AIA B101–2017 §3.1.2 and §5.8 (sample in your ARE Prep folder)", a: "Your copy (Drive)" },
    { t: "AIA A133–2019 (CM as constructor) and A141–2014 (design-build), samples in your folder", a: "Your copy (Drive)" },
    { t: "AIA, Architect's Handbook, 15th ed., §9.1 Figure 9.2 (p. 512); §13.1–13.2 (pp. 868, 886–891)", a: "Your copy (Drive)" }
  ],
  check: ["q-pjm-19", "q-pjm-23", "q-pjm-26"]
});

ARE.LESSONS.push({
  id: "ce-observation", div: "ce", obj: ["ce-1.1", "ce-2.2", "ce-2.3", "ce-4.2"], title: "Bidding Advice, Observation, Progress & Performance",
  minutes: 35, level: "Core",
  summary: "Advise the owner during bidding by delivery method, judge conformance and progress on site, and evaluate the finished building.",
  objectives: [
    "Describe the architect's bidding-phase role in design-bid-build and CM at risk.",
    "Judge conformance with documents, codes and sustainability requirements.",
    "Determine progress from the schedule of values and site observation.",
    "Evaluate building performance after occupancy."
  ],
  why: "Construction Observation is 32–38% of CE. The April 2026 update clarified CE 1.1 around the architect's advisory role during bidding for each delivery method.",
  exam: "Scenarios ask what the architect should do when a bidder calls with a question, whether work conforms, how far along the project is, or what a post-occupancy review should cover.",
  body: `
<h3>Bidding advice by delivery method</h3>
<p><strong>Design-bid-build:</strong> the architect helps the owner prepare bidding documents, answers bidder questions <em>only by addendum to all bidders</em> (never by private phone answers), attends the pre-bid meeting and bid opening, and helps evaluate bids for responsiveness and responsibility. The owner awards the contract.</p>
<p><strong>CM at risk:</strong> the CM solicits and evaluates trade bids. The architect reviews scope gaps and substitutions against the design and advises the owner on the GMP and its qualifications.</p>
<p><strong>Public work</strong> often requires open competitive bidding to the lowest responsive, responsible bidder; private owners may prequalify or negotiate.</p>

<h3>Judging conformance</h3>
<p>Compare the work observed to the drawings, specifications, approved submittals and codes. Sustainability requirements (for example LEED documentation, commissioning, construction waste management) are part of the contract documents, so nonconformance with them is nonconformance. Report deviations in writing; reject nonconforming work under A201 §4.2.6.</p>

<h3>Determining progress</h3>
<p>Progress shows in three places: the <strong>schedule of values</strong> (percent complete per line), the contractor's <strong>construction schedule</strong> (A201 §3.10), and what you <strong>observe</strong> on site. When they disagree, believe what you see and certify accordingly.</p>

<h3>Evaluating performance</h3>
<ul>
<li><strong>Commissioning</strong> verifies that systems perform to the owner's project requirements (ASHRAE Guideline 0 process).</li>
<li><strong>Post-occupancy evaluation</strong>: occupant surveys, observation, comfort and energy measurement.</li>
<li><strong>Energy benchmarking</strong> (for example ENERGY STAR Portfolio Manager) compares actual use with peers.</li>
<li><strong>Warranty review</strong> before the one-year correction period ends.</li>
</ul>`,
  diagram: `<svg viewBox="0 0 640 220" role="img" aria-label="Three sources of progress: schedule of values, schedule and site observation. Tap each to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Schedule of values|The contractor's percent complete for each line. Check it against what you saw."><rect x="30" y="40" width="170" height="70" class="dg-soft"/><text x="115" y="80" text-anchor="middle">Schedule of values</text></g>
<g class="tip" data-tip="Construction schedule|Shows planned vs actual dates (A201 §3.10). Slippage on critical activities threatens the completion date."><rect x="235" y="40" width="170" height="70" class="dg-soft"/><text x="320" y="80" text-anchor="middle">Construction schedule</text></g>
<g class="tip" data-tip="Site observation|What you actually see. When records and observation disagree, certify based on what you observed."><rect x="440" y="40" width="170" height="70" class="dg-accent"/><text x="525" y="80" text-anchor="middle" class="dg-ontint">Site observation</text></g>
<path d="M115 110 L320 170 L525 110" class="dg-line"/><path d="M320 110 L320 170" class="dg-line"/>
<g class="tip" data-tip="Certificate for payment|The architect's representation that, to the best of its knowledge, the work has progressed to the point indicated (A201 §9.4.2)."><rect x="235" y="170" width="170" height="40" class="dg-accent2"/><text x="320" y="195" text-anchor="middle">Certify progress</text></g>
</g></svg>`,
  formulas: [{ name: "Percent complete (overall)", f: "= Σ(line value × % complete) ÷ contract sum" }],
  example: { title: "Applying it: a bidder calls", html: `<p>A bidder calls asking whether the specified roof membrane can be substituted. Do not answer on the phone. Tell the bidder to submit the request in writing by the deadline in the instructions to bidders (A701). If accepted, issue the approval by addendum to all bidders so everyone bids on the same basis.</p>` },
  mistakes: [
    "Answering a bidder's question privately.",
    "Certifying percent complete from the contractor's application alone.",
    "Treating LEED requirements as optional extras."
  ],
  scenario: { prompt: "A year after occupancy, staff in a new library say the reading room is too warm in the afternoon. What evaluation would you propose?",
    answer: "A focused post-occupancy evaluation: occupant survey and temperature logging in the reading room; review of the commissioning report and control sequences; check solar gain on west glazing and whether shading or blinds work as designed; compare energy data. Separate defects (contractor warranty or correction period) from design issues and owner operations." },
  quick: [
    { q: "During bidding, how should the architect answer a bidder's question that clarifies the documents?", opts: ["By phone to that bidder", "By addendum to all bidders", "After bids are opened", "Through the owner only"], a: 1, why: "All bidders must receive the same information." },
    { q: "Which process verifies that building systems meet the owner's project requirements?", opts: ["Punch list", "Commissioning", "Value engineering", "Substantial completion"], a: 1, why: "Commissioning tests and documents system performance." }
  ],
  tryit: ["pay"],
  refs: [
    { t: "AIA A701–2018 Instructions to Bidders (sample in your ARE Prep folder)", a: "Your copy (Drive)" },
    { t: "AIA A201–2017 §3.10, §4.2.6, §9.4.2", a: "Your copy (Drive)" },
    { t: "ASHRAE Guideline 0, The Commissioning Process", a: "Purchase" },
    { t: "AIA, Architect's Handbook, 15th ed., §10.8 (pp. 707–710); §10.9 (p. 719); §10.10 (p. 735)", a: "Your copy (Drive)" }
  ],
  check: ["q-ce-14", "q-ce-16", "q-ce-19"]
});

Object.assign(ARE.TAKEAWAYS, {
  "ppd-siting": ["Rule out flood zone, steep slopes, wetlands, easements first.", "Parking beside or behind, not in front.", "Detention releases slowly; retention keeps.", "Daylight reaches about 1.5–2.5 × head height.", "Fire access within 150 ft of exterior walls (IFC)."],
  "ppd-systems": ["Steel beam depth (in) ≈ span (ft) ÷ 2.", "Flat plate ≈ span ÷ 30.", "All-air systems need the most space.", "Wet, dry, preaction, deluge: match to risk.", "STC blocks; NRC absorbs."],
  "ppd-integration": ["If = [F/P − 0.25] × W/30.", "Aa = At + NS × If.", "Most restrictive governs (IBC §102.1).", "SD $/sf · DD systems · CD takeoff.", "Escalate to the construction midpoint."],
  "pdd-sizing": ["w = psf × tributary width.", "M = wL²/8.", "Duct A = cfm ÷ fpm.", "Fixtures: round up, split by sex.", "Light hazard ≤ 225 sf per head."],
  "pdd-docs": ["Existing contours dashed, proposed solid.", "Grab bars 33–36 in.", "Lav rim 34 in max.", "Addenda before award; ASI/CO/CCD after.", "Cloud, tag and log every revision."],
  "pa-site": ["Wind rose bars point to where wind comes from.", "V contours pointing uphill = valley.", "Geotech gives bearing and foundation type.", "Phase I has no sampling.", "Use sun, wind, water and trees on site."],
  "pa-building": ["Total budget = construction + soft costs + contingency.", "Soft costs often 20–35%.", "Change of occupancy triggers IEBC review.", "Pre-1980 buildings: survey for asbestos and lead.", "Bubble → blocking → stacking."],
  "pjm-delivery-docs": ["DBB: one complete bid set.", "CMAR: early packages and GMP set.", "DB: bridging or performance criteria.", "Architect may rely on owner-furnished info (B101 §3.1.2).", "Zoning → permit → inspections → CO."],
  "ce-observation": ["Answer bidders only by addendum.", "Sustainability requirements are contract requirements.", "Certify what you observe.", "Commissioning verifies systems.", "Review warranties before the one-year mark."]
});
