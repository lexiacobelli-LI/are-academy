/* LESSONS — PPD, PDD, CE */
ARE.LESSONS.push({
  id: "ppd-egress", div: "ppd", obj: ["ppd-2.2", "ppd-2.3"], title: "Occupant Load & Means of Egress",
  minutes: 45, level: "Core",
  summary: "Calculate occupant load, required exits and egress width, and check remoteness, travel distance and dead ends under the IBC.",
  objectives: [
    "Calculate occupant load with IBC Table 1004.5 load factors, using net or gross area as the table requires.",
    "Determine the number of exits or exit access doorways a space or story needs.",
    "Calculate required egress width for stairs and other components.",
    "Apply the remoteness rule, maximum travel distance and dead-end corridor limits.",
    "Apply basic accessible route and ramp requirements."
  ],
  why: "Egress is the core of life safety. Every plan decision (stair locations, corridor widths, door swings) traces back to occupant load.",
  exam: "PPD and PDD use quantitative items (occupant load, width) and hotspot items (pick the location for a second exit on a plan). The exam supplies code excerpts in case studies; know how to apply them quickly.",
  body: `
<p class="edition">Code basis: <b>2021 International Building Code (IBC)</b>, model code. Adopted editions and local amendments vary by jurisdiction; the ARE provides excerpts when a specific value is needed.</p>
<h3>Step 1: occupant load</h3>
<p>Occupant load = floor area ÷ occupant load factor (IBC Table 1004.5). Each factor is listed as <strong>gross</strong> or <strong>net</strong>. Gross area includes corridors, walls, washrooms and support spaces within the building's exterior walls; net area is the actual occupied area, excluding corridors, washrooms, stairs and other accessory spaces.</p>
<table class="tbl"><thead><tr><th>Function of space (selected)</th><th>Factor (sf per occupant)</th></tr></thead><tbody>
<tr><td>Business areas</td><td>150 gross</td></tr>
<tr><td>Assembly, unconcentrated (tables and chairs)</td><td>15 net</td></tr>
<tr><td>Assembly, concentrated (chairs only, not fixed)</td><td>7 net</td></tr>
<tr><td>Assembly, standing space</td><td>5 net</td></tr>
<tr><td>Educational, classroom area</td><td>20 net</td></tr>
<tr><td>Mercantile</td><td>60 gross</td></tr>
<tr><td>Exercise rooms</td><td>50 gross</td></tr>
<tr><td>Kitchens, commercial</td><td>200 gross</td></tr>
<tr><td>Residential</td><td>200 gross</td></tr>
<tr><td>Warehouses</td><td>500 gross</td></tr>
</tbody></table>
<p>Round fractional results up. For mixed spaces, calculate each function area separately and add. Fixed seating is counted by the number of seats.</p>
<div class="callout warn"><b>Edition alert.</b> Business areas were 100 gross in the 2015 IBC and earlier. If a question supplies a table, use the table given.</div>

<h3>Step 2: number of exits</h3>
<p>Most rooms and spaces need <strong>two</strong> exits or exit access doorways once the occupant load exceeds 49 (lower thresholds apply to some occupancies, and long common paths of travel also trigger a second exit). A story needs at least <strong>2</strong> exits for 1–500 occupants, <strong>3</strong> for 501–1,000 and <strong>4</strong> above 1,000 (Table 1006.3.3).</p>

<h3>Step 3: egress width</h3>
<p>Required capacity = occupant load × width factor: <strong>0.3 in per occupant for stairways</strong> and <strong>0.2 in per occupant for other components</strong> (doors, corridors, ramps). In buildings with an automatic sprinkler system and an emergency voice/alarm communication system, the factors drop to 0.2 and 0.15 (not for Group H or I-2). Code minimums still apply: corridors 44 in (36 in serving fewer than 50; §1020.3), door clear width 32 in, stairs typically 44 in. Distribute capacity so losing one exit does not cut available capacity below 50% of the required total.</p>

<h3>Step 4: arrangement</h3>
<ul>
<li><strong>Remoteness:</strong> where two exits are required, separate them by at least <strong>1/2 the overall diagonal</strong> of the area served, or <strong>1/3</strong> in a fully sprinklered building, measured in a straight line between the nearest edges of the doors.</li>
<li><strong>Exit access travel distance</strong> (Table 1017.2, selected): Group B 200 ft unsprinklered / 300 ft sprinklered; Groups A, E, M 200 ft / 250 ft.</li>
<li><strong>Dead-end corridors</strong> (§1020.5): 20 ft maximum; 50 ft in Groups B, E, F, I-1, M, R-1, R-2, R-4, S and U where the building is sprinklered.</li>
<li>Exit doors serving 50 or more occupants swing in the direction of egress travel.</li>
</ul>

<h3>Accessibility basics (2010 ADA Standards / ICC A117.1)</h3>
<p>Accessible route clear width 36 in; running slope not steeper than 1:20 (otherwise it is a ramp); cross slope 1:48. Ramps: maximum slope 1:12, maximum rise 30 in per run, landings at least 60 in long, handrails both sides where rise exceeds 6 in. Wheelchair turning space: 60 in circle or T-shaped space. Clear floor space at fixtures and controls: 30 × 48 in.</p>`,
  diagram: `<svg viewBox="0 0 640 250" role="img" aria-label="Plan of a room with its diagonal; two exits separated by at least one third of the diagonal in a sprinklered building">
<g class="dg-text" font-size="12">
<rect x="80" y="30" width="420" height="190" class="dg-soft"/>
<line x1="80" y1="220" x2="500" y2="30" class="dg-line" stroke-dasharray="6 4"/>
<text x="300" y="110" transform="rotate(-24 300 110)" text-anchor="middle">Overall diagonal D = 460 ft</text>
<rect x="104" y="214" width="36" height="12" class="dg-accent"/><text x="122" y="244" text-anchor="middle">Exit 1</text>
<rect x="400" y="24" width="36" height="12" class="dg-accent"/><text x="418" y="18" text-anchor="middle">Exit 2</text>
<line x1="140" y1="214" x2="400" y2="36" class="dg-accentline" stroke-width="2"/>
<text x="520" y="120">Sprinklered:</text><text x="520" y="136">≥ D/3 ≈ 153 ft</text><text x="520" y="160">Unsprinklered:</text><text x="520" y="176">≥ D/2 = 230 ft</text>
</g></svg>`,
  formulas: [
    { name: "Occupant load", f: "OL = Area ÷ load factor (round up; net or gross per Table 1004.5)" },
    { name: "Stair width", f: "Width (in) = OL × 0.3   (0.2 with sprinklers + voice alarm)" },
    { name: "Other components", f: "Width (in) = OL × 0.2   (0.15 with sprinklers + voice alarm)" },
    { name: "Remoteness", f: "Separation ≥ D ÷ 2   (D ÷ 3 sprinklered)" }
  ],
  example: { title: "Worked example: a fitness floor", html: `<p>A sprinklered building (no voice alarm) has a 6,000 sf gross exercise floor. Occupant load = 6,000 ÷ 50 = <b>120</b>. Two exits are required (OL > 49).</p>
<ul><li>Door capacity: 120 × 0.2 = 24 in total, but each door must still provide 32 in clear.</li>
<li>If egress continues down one shared stair: 120 × 0.3 = 36 in, but the code minimum (typically 44 in) governs.</li>
<li>Room diagonal 110 ft: exits at least 110 ÷ 3 ≈ <b>36.7 ft</b> apart.</li></ul>
<p>Lesson: calculated width often falls below code minimums at small occupant loads. Always compare to the minimum.</p>` },
  mistakes: [
    "Using gross area with a net factor (or the reverse).",
    "Rounding occupant load down. Always round up.",
    "Applying the 1/3 remoteness rule in an unsprinklered building.",
    "Forgetting minimum widths after calculating capacity."
  ],
  scenario: { prompt: "A 3,000 sf net banquet room (tables and chairs) on the second floor of an unsprinklered building has one stair. Is that enough?",
    answer: "Occupant load = 3,000 ÷ 15 = 200. The room needs two exit access doorways, separated by half the diagonal. The story needs at least two exits (1–500 occupants), so a single stair does not work. Stair capacity at 0.3 in per occupant would be 60 in total, split between the two stairs and still meeting the 44 in minimum each." },
  refs: [
    { t: "2021 IBC, Chapter 10: §1004.5 occupant load; §1005.3.1 stair capacity; Table 1006.3.3 exits per story; §1007.1.1 remoteness; §1017.2 travel distance; §1020.3 corridor width; §1020.5 dead ends", a: "Free read-only (codes.iccsafe.org); premium features paid" },
    { t: "2010 ADA Standards for Accessible Design, Chapters 3–4", a: "Free (ada.gov)" },
    { t: "ICC A117.1, Accessible and Usable Buildings and Facilities", a: "Free read-only (codes.iccsafe.org)" }
  ],
  check: ["q-ppd-01", "q-ppd-02", "q-ppd-03"],
  canada: "The Ontario Building Code (Div. B, Part 3) uses different occupant load tables, exit width rules and travel distances. Keep the two codes separate in your notes."
});

ARE.LESSONS.push({
  id: "ppd-envelope", div: "ppd", obj: ["ppd-3.4", "ppd-1.2", "ppd-3.2", "ppd-5.3"], title: "Envelope Heat Transfer & Passive Strategies",
  minutes: 35, level: "Core",
  summary: "Calculate R-values, U-factors and heat loss, and choose glazing and passive strategies by climate.",
  objectives: [
    "Add R-values in series and convert to a U-factor.",
    "Calculate heat loss through an assembly with Q = U × A × ΔT and estimate annual loss with degree days.",
    "Explain thermal bridging and why continuous insulation matters.",
    "Select glazing properties (U-factor, SHGC, VT) for a climate and orientation."
  ],
  why: "Envelope decisions made in schematic design fix most of a building's heating and cooling load for its whole life. They are cheap to get right early and expensive to fix later.",
  exam: "Quantitative items ask for total R, U or heat loss. A/E items ask which glazing or strategy best fits a climate and orientation.",
  body: `
<h3>Resistance and transmittance</h3>
<p>The <strong>R-value</strong> measures resistance to heat flow (ft²·°F·h/Btu). For layers in series, R-values add: R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + … including inside and outside air films. The <strong>U-factor</strong> is the inverse of total resistance: U = 1 ÷ R<sub>T</sub>. You can add R-values but you cannot add U-factors.</p>
<table class="tbl"><thead><tr><th>Material (typical)</th><th>R per inch</th></tr></thead><tbody>
<tr><td>Glass-fiber batt</td><td>≈ 3.1–3.4</td></tr><tr><td>Mineral wool board</td><td>≈ 4.0–4.2</td></tr>
<tr><td>Extruded polystyrene (XPS)</td><td>≈ 5.0</td></tr><tr><td>Polyisocyanurate</td><td>≈ 5.6–6.0</td></tr>
<tr><td>Softwood lumber</td><td>≈ 1.25</td></tr><tr><td>Concrete</td><td>≈ 0.08</td></tr>
</tbody></table>
<p>Values are typical; use manufacturer data or ASHRAE Fundamentals for design.</p>

<h3>Heat flow</h3>
<p>Conduction through an assembly: <strong>Q = U × A × ΔT</strong> (Btu/h). Annual heating load can be estimated with heating degree days: <strong>Q<sub>year</sub> = U × A × HDD × 24</strong>. Infiltration (air leakage) often matters as much as conduction, which is why air barriers are required by the energy code.</p>

<h3>Thermal bridging</h3>
<p>Studs, slab edges, balcony slabs and shelf angles conduct heat around the insulation. A 2×6 wood-stud wall with R-21 batts performs well below R-21 overall; a steel-stud wall is far worse because steel conducts so well. <strong>Continuous insulation (ci)</strong> outside the framing breaks those bridges, which is why the IECC and ASHRAE 90.1 assign ci values for many climate zones.</p>

<h3>Glazing properties</h3>
<ul>
<li><strong>U-factor:</strong> lower insulates better. Most important in cold climates.</li>
<li><strong>Solar heat gain coefficient (SHGC):</strong> fraction of solar radiation admitted (0–1). Low SHGC suits cooling-dominated climates and east/west glass.</li>
<li><strong>Visible transmittance (VT):</strong> fraction of visible light admitted. A high VT with low SHGC (a high light-to-solar-gain ratio) gives daylight without heat.</li>
</ul>
<h3>Passive strategies by climate</h3>
<p><b>Cold:</b> compact form, south glazing with mass for direct gain, wind protection, vestibules. <b>Hot-arid:</b> thermal mass with night flushing, courtyards, small shaded openings, light colors. <b>Hot-humid:</b> shading, cross-ventilation, raised and lightweight construction. <b>Temperate:</b> a balance, with operable shading.</p>`,
  diagram: `<svg viewBox="0 0 640 220" role="img" aria-label="Wall layers in series with R-values adding up to total R">
<g class="dg-text" font-size="12">
<rect x="60" y="30" width="20" height="150" class="dg-soft"/><rect x="80" y="30" width="110" height="150" class="dg-hatch"/>
<rect x="190" y="30" width="12" height="150" class="dg-soft"/><rect x="202" y="30" width="60" height="150" class="dg-accent2"/>
<rect x="262" y="30" width="18" height="150" class="dg-soft"/><rect x="280" y="30" width="16" height="150" class="dg-accent"/>
<text x="70" y="198" text-anchor="middle" font-size="11">Gyp</text><text x="135" y="198" text-anchor="middle" font-size="11">Batt R-19</text>
<text x="232" y="198" text-anchor="middle" font-size="11">ci R-10</text><text x="288" y="198" text-anchor="middle" font-size="11">Clad</text>
<text x="360" y="60">R films ≈ 0.68 + 0.17</text><text x="360" y="84">R gyp 0.45 · sheathing 0.62</text><text x="360" y="108">R cladding ≈ 0.6</text>
<text x="360" y="140" font-weight="600">R_T ≈ 31.5  →  U ≈ 0.032</text>
<text x="360" y="166" font-size="11">(clear-field values; framing lowers the whole-wall value)</text>
</g></svg>`,
  formulas: [
    { name: "Total resistance", f: "R_T = ΣR (layers + air films)" },
    { name: "U-factor", f: "U = 1 ÷ R_T  (Btu/h·ft²·°F)" },
    { name: "Conductive heat flow", f: "Q = U × A × ΔT  (Btu/h)" },
    { name: "Annual heating loss", f: "Q_yr = U × A × HDD × 24  (Btu/yr)" }
  ],
  example: { title: "Worked example", html: `<p>A 1,200 sf wall has R<sub>T</sub> = 25. Indoor 70°F, design outdoor 0°F.</p>
<ul><li>U = 1 ÷ 25 = 0.04</li><li>Q = 0.04 × 1,200 × 70 = <b>3,360 Btu/h</b></li></ul>
<p>Replace 200 sf of that wall with windows at U = 0.30: windows lose 0.30 × 200 × 70 = 4,200 Btu/h, and the remaining 1,000 sf of wall loses 2,800 Btu/h, a total of 7,000 Btu/h, more than double. Glazing area drives heat loss.</p>` },
  mistakes: [
    "Adding U-factors for layers in series. Add R-values, then invert.",
    "Using nominal batt R-value as the wall's R-value. Framing reduces it.",
    "Choosing high SHGC glass for west elevations in cooling climates."
  ],
  scenario: { prompt: "A daycare in a cold climate (heating-dominated) has a large south-facing play room. The owner wants maximum daylight but no overheating in September. What glazing and shading would you propose?",
    answer: "Low U-factor (triple or high-performance double glazing), moderate-to-high SHGC on the south to capture winter sun, high VT for daylight, and a fixed horizontal overhang sized to shade the glass near the equinox and in summer while admitting low winter sun. Exposed thermal mass in the floor stores the gain." },
  refs: [
    { t: "ASHRAE Handbook—Fundamentals (thermal properties, design temperatures)", a: "Purchase" },
    { t: "2021 International Energy Conservation Code (envelope requirements by climate zone)", a: "Free read-only (codes.iccsafe.org)" },
    { t: "ANSI/ASHRAE/IES Standard 90.1", a: "Free read-only view on ashrae.org; purchase for full use" }
  ],
  check: ["q-ppd-04", "q-ppd-05", "q-ppd-06"]
});

ARE.LESSONS.push({
  id: "pdd-envelope", div: "pdd", obj: ["pdd-2.3", "pdd-1.5", "pdd-4.1"], title: "Wall Assemblies & Control Layers",
  minutes: 40, level: "Core",
  summary: "Detail walls that manage water, air, vapor and heat: control layer order, rainscreens, flashing, vapor retarder class and placement.",
  objectives: [
    "Name the four control layers and their priority.",
    "Explain how a drained and ventilated rainscreen works.",
    "Classify vapor retarders and place them correctly by climate.",
    "Detail flashing laps, drips and sealant joints that last."
  ],
  why: "Most envelope failures are water failures at transitions: windows, roof-to-wall, slab edges. Getting the layers continuous through those transitions is the real work of detailing.",
  exam: "Hotspot items show a wall section and ask you to locate the air barrier or the place where flashing is missing. A/E items ask which assembly best suits a climate or why a detail failed.",
  body: `
<h3>Four control layers, in priority order</h3>
<ol>
<li><strong>Water control</strong> (rain): the water-resistive barrier (WRB) and flashings that drain water out.</li>
<li><strong>Air control</strong>: a continuous air barrier that stops air leakage, which carries far more moisture than vapor diffusion does.</li>
<li><strong>Vapor control</strong>: a vapor retarder sized and placed so moisture that does get in can dry out.</li>
<li><strong>Thermal control</strong>: insulation, ideally continuous.</li>
</ol>
<p>One material can serve several layers (a fully adhered membrane on sheathing can be the WRB, air barrier and vapor retarder). Each layer must be continuous across the whole envelope, including at openings, roof edges and foundations: trace each one with a coloured pencil around every detail.</p>

<h3>Rainscreen walls</h3>
<p>A <strong>rainscreen</strong> places cladding in front of a cavity (typically ¾ in or more) with the WRB behind. Water that passes the cladding drains down the cavity and exits through weeps or open joints at the base; air movement dries the cavity. A <strong>pressure-equalized</strong> rainscreen compartmentalizes the cavity so wind pressure inside matches outside, removing the force that pushes water through joints.</p>

<h3>Vapor retarders</h3>
<table class="tbl"><thead><tr><th>Class</th><th>Permeance</th><th>Examples</th></tr></thead><tbody>
<tr><td>Class I</td><td>≤ 0.1 perm</td><td>Polyethylene sheet, foil facers</td></tr>
<tr><td>Class II</td><td>&gt; 0.1 and ≤ 1.0 perm</td><td>Kraft-faced batts, some vapor-retarder paints</td></tr>
<tr><td>Class III</td><td>&gt; 1.0 and ≤ 10 perm</td><td>Latex paint on gypsum board</td></tr>
</tbody></table>
<p>In heating climates, vapor drives from the warm, moist interior outward, so the vapor retarder goes on the <strong>warm (interior) side</strong> of the insulation. In hot-humid climates the drive reverses, and an interior polyethylene sheet traps moisture. Enough exterior continuous insulation keeps the sheathing warm, above the dew point, and allows a more permeable interior layer. Avoid two Class I layers that trap a wet assembly between them.</p>

<h3>Flashing and joints</h3>
<ul>
<li>Lap every layer <strong>shingle-fashion</strong>: upper layers over lower layers, so water always runs onto the outside face.</li>
<li>Provide flashing with <strong>end dams</strong> at window heads, sills, shelf angles and base of wall, and a <strong>drip edge</strong> that projects past the face below.</li>
<li>Sill pans under windows slope outward and turn up at the back and ends.</li>
<li>Sealant joints: use a backer rod for two-sided adhesion; avoid three-sided adhesion, which tears the sealant as the joint moves. A common rule sets sealant depth at about half the joint width (within manufacturer limits).</li>
</ul>`,
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="Wall section from interior to exterior: gypsum, stud cavity with insulation, sheathing, air and water barrier, continuous insulation, drained cavity, cladding">
<g class="dg-text" font-size="11">
<rect x="40" y="20" width="14" height="200" class="dg-soft"/>
<rect x="54" y="20" width="90" height="200" class="dg-hatch"/>
<rect x="144" y="20" width="10" height="200" class="dg-soft"/>
<rect x="154" y="20" width="5" height="200" class="dg-accent" data-hs="awb"/>
<rect x="159" y="20" width="50" height="200" class="dg-accent2"/>
<rect x="209" y="20" width="22" height="200" class="dg-air"/>
<rect x="231" y="20" width="18" height="200" class="dg-soft"/>
<path d="M200 225 L260 232" class="dg-accentline" stroke-width="3"/>
<g>
<line x1="47" y1="20" x2="300" y2="40" class="dg-leader"/><text x="306" y="44">Gypsum board (interior; Class III with latex paint)</text>
<line x1="100" y1="60" x2="300" y2="70" class="dg-leader"/><text x="306" y="74">Stud cavity insulation</text>
<line x1="149" y1="100" x2="300" y2="100" class="dg-leader"/><text x="306" y="104">Sheathing</text>
<line x1="157" y1="128" x2="300" y2="130" class="dg-leader"/><text x="306" y="134">Air + water-resistive barrier (continuous)</text>
<line x1="184" y1="160" x2="300" y2="160" class="dg-leader"/><text x="306" y="164">Continuous exterior insulation</text>
<line x1="220" y1="186" x2="300" y2="190" class="dg-leader"/><text x="306" y="194">Drained, ventilated cavity</text>
<line x1="240" y1="210" x2="300" y2="216" class="dg-leader"/><text x="306" y="220">Cladding</text>
<line x1="250" y1="230" x2="300" y2="244" class="dg-leader"/><text x="306" y="248">Base flashing with drip and weeps</text>
</g></g></svg>`,
  formulas: [
    { name: "Vapor retarder classes", f: "I ≤ 0.1 perm · II > 0.1–1.0 · III > 1.0–10", note: "Per IBC/IRC definitions." },
    { name: "Sealant geometry (rule of thumb)", f: "Depth ≈ ½ joint width, within manufacturer min/max" }
  ],
  example: { title: "Diagnosing a failure", html: `<p>Brick veneer above a storefront shows staining and efflorescence just above the steel lintel. Inspection shows the lintel flashing stops short of the jambs with no end dams. Water collected on the flashing runs off its ends into the wall below. Fix: remove brick at the lintel, install continuous through-wall flashing with end dams and a drip edge projecting past the face, and restore weeps.</p>` },
  mistakes: [
    "Putting polyethylene on the interior in a hot-humid climate.",
    "Relying on face-sealed cladding with no drainage plane behind it.",
    "Lapping the WRB backward (lower layer over upper), which directs water into the wall.",
    "Treating the air barrier as a product instead of a continuous system across transitions."
  ],
  scenario: { prompt: "A mid-rise in climate zone 5 is detailed with steel studs, cavity batts, exterior gypsum sheathing, a fluid-applied air/water barrier, no exterior insulation and metal panel cladding. What do you flag?",
    answer: "Steel studs bridge the cavity insulation badly, so whole-wall R is far below the batt rating and likely fails energy code. The cold sheathing invites condensation at the air barrier plane. Add continuous exterior insulation outboard of the air/water barrier, using thermally broken clips or girts for the panel attachment, and confirm the interior vapor control suits the reduced risk." },
  refs: [
    { t: "Building Science Corporation, Building Science Digests (BSD-104, BSD-106 and related)", a: "Free (buildingscience.com)" },
    { t: "2021 IBC, Chapter 14: §1403.2 water-resistive barrier; §1404.3 vapor retarders. 2021 IECC air barrier requirements", a: "Free read-only (codes.iccsafe.org)" },
    { t: "Ching, Building Construction Illustrated, 6th ed.", a: "Purchase" }
  ],
  check: ["q-pdd-01", "q-pdd-02", "q-pdd-03"],
  canada: "Lake Erie–area work falls in a heating climate similar to US climate zones 5–6, so the same physics applies, but the OBC and SB-10/SB-12 set Ontario's numeric requirements."
});

ARE.LESSONS.push({
  id: "pdd-specs", div: "pdd", obj: ["pdd-3.1", "pdd-3.2", "pdd-3.3", "pdd-2.4"], title: "The Project Manual, Specifications & Drawing Sets",
  minutes: 35, level: "Core",
  summary: "How MasterFormat and SectionFormat organize the project manual, the four ways to specify, and how drawings and specs divide the work.",
  objectives: [
    "Identify what belongs in the project manual and where.",
    "Use MasterFormat division numbers and the three-part SectionFormat.",
    "Choose descriptive, performance, reference-standard or proprietary specifying.",
    "Explain the division of information between drawings and specifications and organize sheets per the US National CAD Standard."
  ],
  why: "Most construction disputes start where drawings and specs disagree or where a spec leaves a decision open. A well-organized manual tells the contractor exactly where to look.",
  exam: "Drag-and-place items ask you to sort content into the correct MasterFormat division or SectionFormat part. A/E items ask which specifying method fits an owner's goals.",
  body: `
<h3>What is in the project manual</h3>
<p>The project manual bound with the drawings typically holds: procurement requirements (invitation to bid, instructions to bidders, bid form), contracting requirements (agreement form, bonds, general and supplementary conditions) and the technical specifications. Under MasterFormat, procurement and contracting requirements fall in <strong>Division 00</strong>; <strong>Division 01 General Requirements</strong> holds project-wide administrative and procedural rules (submittal procedures, quality requirements, temporary facilities, closeout).</p>
<h3>MasterFormat divisions (selected)</h3>
<table class="tbl"><thead><tr><th>Div.</th><th>Title</th><th>Div.</th><th>Title</th></tr></thead><tbody>
<tr><td>00</td><td>Procurement &amp; Contracting Requirements</td><td>10</td><td>Specialties</td></tr>
<tr><td>01</td><td>General Requirements</td><td>14</td><td>Conveying Equipment</td></tr>
<tr><td>03</td><td>Concrete</td><td>21</td><td>Fire Suppression</td></tr>
<tr><td>04</td><td>Masonry</td><td>22</td><td>Plumbing</td></tr>
<tr><td>05</td><td>Metals</td><td>23</td><td>HVAC</td></tr>
<tr><td>06</td><td>Wood, Plastics &amp; Composites</td><td>26</td><td>Electrical</td></tr>
<tr><td>07</td><td>Thermal &amp; Moisture Protection</td><td>31</td><td>Earthwork</td></tr>
<tr><td>08</td><td>Openings</td><td>32</td><td>Exterior Improvements</td></tr>
<tr><td>09</td><td>Finishes</td><td>33</td><td>Utilities</td></tr>
</tbody></table>
<p>Each section follows the three-part <strong>SectionFormat</strong>: <b>Part 1 General</b> (summary, references, submittals, quality assurance, delivery and storage, warranty), <b>Part 2 Products</b> (manufacturers, materials, fabrication, performance), <b>Part 3 Execution</b> (examination, preparation, installation, field quality control, cleaning, protection).</p>

<h3>Four specifying methods</h3>
<table class="tbl"><thead><tr><th>Method</th><th>How it works</th><th>Use when</th></tr></thead><tbody>
<tr><td>Descriptive</td><td>Describes materials and workmanship in detail without naming products</td><td>You must control exact properties; public work that avoids brand names</td></tr>
<tr><td>Performance</td><td>States required results and how they will be verified</td><td>Contractor or manufacturer innovation is welcome; delegated design (curtain wall)</td></tr>
<tr><td>Reference standard</td><td>Cites published standards (ASTM, ANSI) for quality</td><td>Commodity materials with established standards</td></tr>
<tr><td>Proprietary</td><td>Names products. <em>Closed</em>: no substitutions. <em>Open</em>: named products "or equal" or with a substitution process</td><td>Matching existing work, owner standards; open versions preserve competition</td></tr>
</tbody></table>

<h3>Drawings versus specifications</h3>
<p>Drawings show <strong>quantity, location, size and relationships</strong>. Specifications state <strong>quality, materials, workmanship and standards</strong>. Say each thing once, in the right place: duplication invites conflict. Under A201–2017 the contract documents are complementary, and what one requires is binding as if required by all; an order of precedence, if wanted, is set in the agreement or supplementary conditions.</p>

<h3>Organizing the drawing set (US National CAD Standard)</h3>
<p>Sheet identifiers combine a discipline designator and a sheet type: <b>G</b> general, <b>C</b> civil, <b>L</b> landscape, <b>S</b> structural, <b>A</b> architectural, <b>I</b> interiors, <b>P</b> plumbing, <b>M</b> mechanical, <b>E</b> electrical, <b>F</b> fire protection. Sheet type digits: 0 general (symbols, notes), 1 plans, 2 elevations, 3 sections, 4 large-scale views, 5 details, 6 schedules and diagrams, 9 3D representations. So A-301 is the first architectural section sheet.</p>`,
  diagram: "",
  formulas: [],
  example: { title: "Applying it", html: `<p>A city owner forbids sole-sourcing but wants a specific level of quality for exterior sealants. Specify by reference standard (ASTM C920, with class, grade and use stated) plus performance requirements (movement capability), and if you name products, list several and allow "or equal" with a substitution procedure in Division 01.</p>` },
  mistakes: [
    "Putting submittal procedures in each technical section. Procedures belong in Division 01; each section lists only what to submit.",
    "Writing 'or equal' with no procedure for judging equality.",
    "Dimensioning in the specs or describing installation quality on the drawings."
  ],
  scenario: { prompt: "The drawings show 5/8 in Type X gypsum board on a rated wall; the spec section lists 1/2 in regular board for 'all partitions.' What governs, and what should you do?",
    answer: "A201 treats the documents as complementary; ambiguity is interpreted by the architect, and contractors are generally expected to report discrepancies they discover. The rated assembly requires Type X, so respond to the RFI (or issue a clarification) confirming 5/8 in Type X at rated walls, and correct the spec so it defers to the partition schedule. Check whether supplementary conditions set an order of precedence." },
  refs: [
    { t: "CSI MasterFormat (current edition) and SectionFormat/PageFormat", a: "Purchase; division list free on csiresources.org" },
    { t: "US National CAD Standard, Uniform Drawing System modules", a: "Purchase (NIBS)" },
    { t: "CSI, The CSI Project Delivery Practice Guide", a: "Purchase" }
  ],
  check: ["q-pdd-04", "q-pdd-05", "q-pdd-06"],
  canada: "MasterFormat is also used in Canada (with NMS, the National Master Specification), so this lesson carries directly into your work."
});

ARE.LESSONS.push({
  id: "ce-admin", div: "ce", obj: ["ce-3.1", "ce-3.2", "ce-2.1", "ce-2.2", "ce-3.4"], title: "Submittals, RFIs, Changes & Site Observation",
  minutes: 45, level: "Core",
  summary: "The architect's construction-phase role under A201–2017: what you review, what you sign, and what is never yours.",
  objectives: [
    "Describe the architect's site-visit duties and limits under A201–2017.",
    "Explain the limited purpose of submittal review and the contractor's responsibilities.",
    "Choose the right instrument: RFI response, ASI, CCD or change order.",
    "Respond to nonconforming work correctly."
  ],
  why: "Construction administration is where architects are most often sued. Staying inside the role A201 defines protects the owner, the contractor and you.",
  exam: "CE's largest sections are observation and administrative procedures. Items ask what the architect should do next, which form applies, or who must sign.",
  body: `
<p class="edition">Contract basis: <b>AIA A201–2017</b>, General Conditions of the Contract for Construction, with B101–2017.</p>
<h3>Site visits</h3>
<p>The architect visits the site at intervals appropriate to the stage of construction to become generally familiar with the progress and quality of the work and to determine, in general, whether the work observed is being performed in accordance with the contract documents. The architect is <strong>not</strong> required to make exhaustive or continuous inspections and has no control over, and is not responsible for, the contractor's <strong>construction means, methods, techniques, sequences or procedures, or safety precautions</strong>. Report what you observe to the owner, typically in a field report.</p>
<p>The architect may <strong>reject work</strong> that does not conform and may require additional inspection or testing. The architect does not have authority to stop the work; under A201 §2.4 that right belongs to the owner.</p>

<h3>Submittals</h3>
<p>Shop drawings, product data and samples are <strong>not contract documents</strong>. They show how the contractor proposes to meet the documents. The contractor reviews, approves and coordinates each submittal before sending it on. The architect reviews only for the limited purpose of checking conformance with information given and the design concept in the contract documents, and does not check dimensions, quantities or means and methods. Approval of a submittal does not approve a deviation unless the contractor identified the deviation in writing and the architect specifically approved it.</p>
<p>Under <strong>delegated design</strong> (for example, a curtain wall or fire sprinkler system designed by the contractor's licensed engineer to performance criteria), the architect may rely on the design professional's certification.</p>

<h3>Choosing the instrument</h3>
<table class="tbl"><thead><tr><th>Instrument</th><th>Used for</th><th>Signed by</th></tr></thead><tbody>
<tr><td>RFI response</td><td>Interpreting or clarifying the documents</td><td>Architect</td></tr>
<tr><td>ASI (G710)</td><td>Minor change, no change in contract sum or time, consistent with intent</td><td>Architect (contractor acknowledges)</td></tr>
<tr><td>Construction Change Directive (G714)</td><td>Change ordered before sum/time are agreed</td><td>Owner and architect</td></tr>
<tr><td>Change Order (G701)</td><td>Agreed change in work, sum and/or time</td><td>Owner, contractor and architect</td></tr>
</tbody></table>
<p>A CCD lets work continue while the parties settle the price; once agreed, it is recorded in a change order. If the contractor believes an ASI or RFI response changes cost or time, the contractor must say so before proceeding.</p>

<h3>Claims</h3>
<p>Under A201–2017, claims must be initiated within <strong>21 days</strong> after the event giving rise to the claim or after the claimant first recognizes the condition. The Initial Decision Maker is the architect unless the parties name someone else.</p>`,
  diagram: `<svg viewBox="0 0 640 250" role="img" aria-label="Flowchart: question from contractor leads to RFI response; if a change is needed, choose ASI when no cost or time change, CCD when not agreed, change order when agreed">
<g class="dg-text" font-size="12">
<defs><marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="dg-arrowhead"/></marker></defs>
<rect x="20" y="100" width="120" height="44" class="dg-soft"/><text x="80" y="118" text-anchor="middle">Contractor</text><text x="80" y="134" text-anchor="middle">question</text>
<rect x="180" y="100" width="120" height="44" class="dg-soft"/><text x="240" y="126" text-anchor="middle">Changes cost/time?</text>
<rect x="350" y="20" width="130" height="40" class="dg-accent"/><text x="415" y="44" text-anchor="middle" class="dg-ontint">RFI answer / ASI</text>
<rect x="350" y="102" width="130" height="40" class="dg-soft"/><text x="415" y="126" text-anchor="middle">Agreed now?</text>
<rect x="520" y="70" width="104" height="40" class="dg-accent"/><text x="572" y="94" text-anchor="middle" class="dg-ontint">Change Order</text>
<rect x="520" y="150" width="104" height="40" class="dg-accent2"/><text x="572" y="174" text-anchor="middle">CCD → CO</text>
<path d="M140 122 L180 122" class="dg-line" marker-end="url(#arr2)"/>
<path d="M240 100 L240 40 L350 40" class="dg-line" marker-end="url(#arr2)"/><text x="250" y="62">No</text>
<path d="M300 122 L350 122" class="dg-line" marker-end="url(#arr2)"/><text x="310" y="114">Yes</text>
<path d="M480 115 L520 90" class="dg-line" marker-end="url(#arr2)"/><text x="486" y="96">Yes</text>
<path d="M480 130 L520 168" class="dg-line" marker-end="url(#arr2)"/><text x="486" y="164">No</text>
</g></svg>`,
  formulas: [],
  example: { title: "Applying it", html: `<p>On a site visit you see workers on a third-floor slab edge with no guardrail. Safety is the contractor's responsibility, but an architect who sees an imminent hazard should not walk past it: tell the superintendent immediately, then confirm in writing to the contractor and owner. Do not direct how the hazard is fixed; that would take on means-and-methods responsibility.</p>` },
  mistakes: [
    "Stamping a submittal 'approved' and assuming it changed the contract. Only identified, specifically approved deviations do.",
    "Using an ASI for a change that adds cost.",
    "Telling the contractor to stop work. Advise the owner, who holds that right.",
    "Checking quantities and dimensions on shop drawings as if you were the contractor."
  ],
  scenario: { prompt: "The owner wants a different floor tile installed now; the contractor says it adds $18,000 and two days, but the owner thinks it should be $9,000. Flooring starts Monday. What do you issue?",
    answer: "A Construction Change Directive (G714), signed by the owner and architect, directing the change and stating the proposed method of adjustment. The contractor proceeds, and the parties settle the amount later and record it in a change order. A change order is not possible yet because the parties have not agreed." },
  refs: [
    { t: "AIA A201–2017: §2.4 (owner's right to stop the Work), §3.12 (submittals), §4.2 (administration), §7.2–7.4 (changes), §13.4 (tests), §15.1.3 and §15.2 (claims, Initial Decision Maker)", a: "Sample in your ARE Prep folder; full use requires purchase" },
    { t: "AIA G701, G710, G714 forms", a: "Purchase" },
    { t: "AIA, The Architect's Handbook of Professional Practice — construction contract administration", a: "Purchase" }
  ],
  check: ["q-ce-01", "q-ce-02", "q-ce-03"],
  canada: "Under CCDC 2–2020 the Consultant issues Supplemental Instructions, Change Directives and Change Orders with parallel roles, but terms, timelines and the Construction Act's prompt payment rules in Ontario differ from A201."
});

ARE.LESSONS.push({
  id: "ce-payment", div: "ce", obj: ["ce-3.3", "ce-4.1", "ce-4.2", "ce-1.2", "ce-1.3"], title: "Payment, Completion & Closeout",
  minutes: 40, level: "Core",
  summary: "Certify payment applications, administer substantial and final completion, and close out the project.",
  objectives: [
    "Calculate the amount due on a payment application with retainage and stored materials.",
    "State what the architect's certificate for payment represents and when to withhold.",
    "Sequence substantial completion, punch list and final completion.",
    "List the closeout documents required before final payment."
  ],
  why: "Payment certification is a representation the owner relies on. Completion dates start warranties, shift insurance and utilities, and can start the statute of repose.",
  exam: "Quantitative items give a G702 summary and ask for current payment due. Ordering items ask you to sequence closeout steps.",
  body: `
<p class="edition">Contract basis: <b>AIA A201–2017</b> Article 9; forms G702/G703, G704, G706, G706A, G707.</p>
<h3>The payment cycle</h3>
<p>The contractor's <strong>schedule of values</strong>, approved early, allocates the contract sum among portions of the work and becomes the basis for each application. The contractor submits an itemized <strong>Application for Payment</strong> (G702 with G703 continuation sheet) at least 10 days before the payment date. Within <strong>7 days</strong> of receipt, the architect either issues a certificate for payment for the amount the architect determines is due or notifies the owner and contractor in writing of the reasons for withholding all or part.</p>
<p>The certificate is the architect's representation that, based on site evaluations and the application, and to the best of the architect's knowledge, information and belief, the work has progressed to the point indicated and its quality conforms with the contract documents. It is <strong>not</strong> a representation that the architect has made exhaustive inspections, reviewed means and methods, or checked how the contractor used previous payments.</p>

<h3>Withholding</h3>
<p>The architect may withhold a certificate, in whole or part, to protect the owner from loss because of defective work not remedied, third-party claims, failure to pay subcontractors or suppliers, reasonable evidence that the work cannot be completed for the unpaid balance, damage to the owner or a separate contractor, reasonable evidence that the work will not be done within the contract time, or repeated failure to carry out the work.</p>
<p><strong>Stored materials</strong> not yet incorporated can be included if approved in advance and suitably stored, protected and insured, with title transferring to the owner.</p>

<h3>Substantial completion</h3>
<p>Substantial completion is the stage when the work is sufficiently complete for the owner to occupy or use it for its intended purpose. The <strong>contractor</strong> prepares and submits a comprehensive list of items to be completed or corrected (the punch list). The architect inspects; if the work is substantially complete, the architect prepares the <strong>Certificate of Substantial Completion (G704)</strong>, which sets the date and the responsibilities for security, maintenance, heat, utilities, damage to the work and insurance, and the time to finish the list. Warranties generally begin and the one-year correction period starts at substantial completion.</p>

<h3>Final completion and final payment</h3>
<p>When the contractor notifies that the work is complete, the architect makes a final inspection and, if satisfied, issues a final certificate for payment. Before final payment the contractor submits: an affidavit that payrolls and bills are paid (G706), a release or waiver of liens (G706A), consent of surety to final payment (G707), a certificate that insurance will remain in force, and closeout items specified in Division 01 (record documents, O&amp;M manuals, warranties, attic stock, training).</p>

<h3>After occupancy</h3>
<p>Many firms walk the building with the owner about 11 months after substantial completion, before the correction period ends, to list defects the contractor must fix. A <strong>post-occupancy evaluation (POE)</strong> measures how the building performs for its users (comfort, energy, function) and feeds lessons into future work.</p>`,
  diagram: "",
  formulas: [
    { name: "Total completed and stored", f: "= Work completed to date + Stored materials" },
    { name: "Retainage", f: "= Retainage % × Total completed and stored" },
    { name: "Current payment due", f: "= Total completed and stored − Retainage − Previous certificates" }
  ],
  example: { title: "Worked example: certifying an application", html: `<p>Original contract sum $1,200,000; approved change orders +$50,000. Work completed to date $600,000; stored materials $40,000; retainage 10%; previous certificates $450,000.</p>
<ol><li>Contract sum to date = <b>$1,250,000</b></li>
<li>Total completed and stored = 600,000 + 40,000 = <b>$640,000</b></li>
<li>Retainage = 0.10 × 640,000 = <b>$64,000</b></li>
<li>Earned less retainage = <b>$576,000</b></li>
<li>Current payment due = 576,000 − 450,000 = <b>$126,000</b></li>
<li>Balance to finish including retainage = 1,250,000 − 576,000 = <b>$674,000</b></li></ol>` },
  mistakes: [
    "Having the architect prepare the punch list. The contractor prepares it; the architect inspects and may add items.",
    "Treating a payment certificate as acceptance of the work. Payment does not waive the owner's right to have defects corrected.",
    "Starting warranties at final completion. Under A201 they generally start at substantial completion."
  ],
  scenario: { prompt: "A subcontractor calls you saying it has not been paid for two months. The contractor's current application includes their work as complete. What can you do?",
    answer: "Failure to pay subcontractors is a listed ground for withholding. Ask the contractor for an explanation and lien waivers for the prior period. If there is reasonable evidence of nonpayment, certify only the amount you can justify and notify the owner and contractor in writing of the reason for withholding the rest. Do not pay the subcontractor directly or advise them on legal action." },
  refs: [
    { t: "AIA A201–2017: §9.3.1–9.3.2 (applications, stored materials), §9.4.1 (7-day certification), §9.5.1 (withholding), §9.8.2–9.8.4 (substantial completion), §9.10.2 (final payment), §12.2.2.1 (correction period)", a: "Sample in your ARE Prep folder; full use requires purchase" },
    { t: "AIA G702/G703, G704, G706, G706A, G707 forms", a: "Purchase" }
  ],
  check: ["q-ce-04", "q-ce-05", "q-ce-06"],
  canada: "In Ontario, the Construction Act requires a 10% holdback and sets prompt payment timelines. CCDC 2 adapts to these. The ARE uses A201 retainage set by the agreement, not Ontario holdback."
});
