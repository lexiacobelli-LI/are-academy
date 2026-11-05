/* Round 2 dedicated lessons (v10), continued. Code references are to the 2021 IBC and 2021 IEBC unless stated;
   adopted editions and local amendments vary by jurisdiction, so confirm the edition the AHJ enforces. */

ARE.LESSONS.push({
  id: "pa-existing", div: "pa", obj: ["pa-4.1", "pa-4.2", "pa-2.3"], title: "Existing Buildings & Historic Preservation",
  minutes: 35, level: "Core",
  summary: "How to analyze an existing building before you design: condition and hazard surveys, the existing building code's compliance paths, accessibility triggers, and the four preservation treatments.",
  objectives: [
    "Plan the surveys an existing building needs before programming.",
    "Describe the IEBC compliance methods and the work-area classifications.",
    "Apply the accessibility 'path of travel' rule for alterations.",
    "Distinguish preservation, rehabilitation, restoration and reconstruction."
  ],
  why: "Most work in practice touches an existing building. The surprises (hidden structure, asbestos, code triggers) are where budgets and schedules break.",
  exam: "PA items give a renovation scenario and ask what to survey first, which code path applies, what a change of occupancy triggers, or which preservation treatment fits the owner's goal.",
  body: `
<h3>Know the building before you design</h3>
<ul>
<li><strong>Existing conditions survey:</strong> verify record drawings in the field; they are often wrong or missing.</li>
<li><strong>Structural assessment:</strong> capacity for new loads, deterioration, and seismic or wind deficiencies.</li>
<li><strong>Hazardous materials survey:</strong> asbestos, lead paint, PCBs and mold, required before materials are disturbed. The owner commissions it; abatement is usually a separate contract.</li>
<li><strong>Systems and envelope:</strong> remaining service life of roofing, windows, mechanical and electrical equipment.</li>
</ul>

<h3>The existing building code</h3>
<p>Many U.S. jurisdictions adopt the <strong>International Existing Building Code (IEBC)</strong>. It offers three compliance paths; the designer picks one for the project:</p>
<ul>
<li><strong>Prescriptive</strong> method: specific requirements by type of work.</li>
<li><strong>Work area</strong> method: requirements scale with the extent of work, classified as repair, <strong>Alteration Level 1</strong> (replace or cover existing materials), <strong>Level 2</strong> (reconfigure space, add or remove doors and walls, extend systems), <strong>Level 3</strong> (work area over 50% of the building area), change of occupancy, addition, historic building or relocated building.</li>
<li><strong>Performance</strong> method: evaluate and score the building's overall safety.</li>
</ul>
<p>A <strong>change of occupancy</strong> can trigger major upgrades (egress, fire protection, structure) even with little physical work.</p>

<h3>Accessibility in alterations</h3>
<p>Altered areas must comply. When an alteration affects a <strong>primary function area</strong>, the path of travel to it (and the restrooms, phones and fountains serving it) must also be made accessible, but the cost is capped: spending beyond <strong>20% of the cost of the alteration</strong> is considered disproportionate (2010 ADA Standards and 28 CFR §35.151(b)(4) and §36.403).</p>

<h3>Historic preservation</h3>
<p>The Secretary of the Interior's Standards define four treatments:</p>
<table class="tbl"><thead><tr><th>Treatment</th><th>Goal</th></tr></thead><tbody>
<tr><td>Preservation</td><td>Maintain and repair existing historic materials as they are</td></tr>
<tr><td>Rehabilitation</td><td>Make a compatible new use possible while keeping character-defining features (the most common treatment)</td></tr>
<tr><td>Restoration</td><td>Depict the property at a particular period, removing later work</td></tr>
<tr><td>Reconstruction</td><td>Recreate a vanished building or feature with new construction</td></tr>
</tbody></table>
<p>Federally funded or permitted projects affecting historic properties go through <strong>Section 106</strong> review under the National Historic Preservation Act. Federal historic tax credits require a certified rehabilitation that meets the Standards for Rehabilitation.</p>
`,
  diagram: "",
  formulas: [
    { name: "Level 3 test (IEBC)", f: "Work area > 50% of building area → Alteration Level 3" },
    { name: "Disproportionality cap", f: "Path-of-travel spending required up to 20% × cost of the alteration" }
  ],
  example: { title: "Applying it", html: `<p>An owner wants to turn a 1955 two-story school (Group E) into offices (Group B). Before programming, the architect recommends a field-verified existing conditions survey, a structural assessment for new floor loads, and a hazardous materials survey (the building predates 1980). Under the IEBC, the change of occupancy will drive the code review regardless of how little is rebuilt. Because the building is listed on a local register, the team confirms the review process with the preservation commission and plans a rehabilitation that keeps the original corridors and windows.</p>` },
  mistakes: [
    "Trusting record drawings without field verification.",
    "Assuming minor physical work means minor code upgrades. A change of occupancy can trigger a lot.",
    "Confusing restoration (depict one period) with rehabilitation (compatible new use).",
    "Forgetting the path of travel when altering a primary function area."
  ],
  scenario: { prompt: "A client wants to add a café to a historic bank and qualify for federal historic tax credits. Which treatment should guide the design?",
    answer: "Rehabilitation. It allows a compatible new use while retaining character-defining features, and certified rehabilitations meeting the Secretary of the Interior's Standards for Rehabilitation are what qualify for the federal credit." },
  canada: "In Ontario, renovations follow Part 11 of the Ontario Building Code, and heritage properties are designated under the Ontario Heritage Act. Parks Canada's Standards and Guidelines for the Conservation of Historic Places in Canada use similar treatments: preservation, rehabilitation and restoration.",
  refs: [
    { t: "2021 International Existing Building Code — compliance methods and work-area classifications", a: "Free to read (codes.iccsafe.org)" },
    { t: "Secretary of the Interior's Standards for the Treatment of Historic Properties", a: "Free (nps.gov)" },
    { t: "2010 ADA Standards; 28 CFR §35.151(b)(4) and §36.403 (path of travel)", a: "Free (ada.gov)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — existing buildings and preservation", a: "Purchase" }
  ],
  check: ["q-pa-y01", "q-pa-y02", "q-pa-y03"]
});

ARE.LESSONS.push({
  id: "ppd-heightarea", div: "ppd", obj: ["ppd-2.2", "ppd-2.3", "ppd-3.4"], title: "Construction Types, Allowable Height & Area, Fire Separations",
  minutes: 40, level: "Core",
  summary: "How the IBC links occupancy, construction type, sprinklers and frontage to how tall and large a building can be, and which rated walls separate what.",
  objectives: [
    "Describe the five construction types and what their ratings mean.",
    "Use Tables 504.3, 504.4 and 506.2 with the frontage increase to find allowable height and area.",
    "Choose between fire walls, fire barriers, fire partitions and smoke barriers.",
    "Set opening protection for rated walls."
  ],
  why: "Construction type is one of the biggest cost decisions in schematic design, and the allowable-area check is a classic PPD calculation.",
  exam: "Expect a calculation using a case-provided table and the frontage formula, and scenarios asking which wall type separates two uses or encloses a stair.",
  body: `
<h3>Construction types (IBC Chapter 6)</h3>
<p>Types I and II are noncombustible; III has noncombustible exterior walls and any permitted interior; IV is heavy or mass timber; V allows combustible materials throughout. "A" subtypes are protected (rated), "B" are unprotected. Table 601 gives hourly ratings for the primary frame, bearing walls, floors and roofs. For the primary structural frame: I-A 3 h, I-B 2 h, II-A 1 h, II-B 0, III-A 1 h, III-B 0, V-A 1 h, V-B 0. Table 602 adds exterior wall ratings based on fire separation distance.</p>

<h3>Allowable height and area (Chapter 5)</h3>
<ul>
<li><strong>Height in feet</strong> (Table 504.3) and <strong>stories</strong> (Table 504.4) depend on occupancy, type and sprinklers (NS or S).</li>
<li><strong>Area per story</strong> (Table 506.2) gives NS, S1 (one story, sprinklered) and SM (multistory, sprinklered) values. The sprinkler benefit is built into the table.</li>
<li><strong>Frontage increase</strong> (§506.3): I<sub>f</sub> = [F/P − 0.25] × W/30, where F is perimeter on a public way or open space at least 20 ft wide, P the total perimeter, and W the width of that open space (use no more than 30 for the ratio). The increase is capped at 0.75.</li>
<li><strong>One story</strong> (§506.2.1): A<sub>a</sub> = A<sub>t</sub> + (NS × I<sub>f</sub>). <strong>Multistory</strong> (§506.2.3): use the SM value, A<sub>a</sub> = [A<sub>t</sub> + (NS × I<sub>f</sub>)] × S<sub>a</sub>, where S<sub>a</sub> is the number of stories above grade plane, not more than three.</li>
</ul>
<p>If the building is too large, the options are a higher construction type, adding sprinklers, more frontage, or dividing it with <strong>fire walls</strong> into separate buildings.</p>

<h3>Which rated element?</h3>
<table class="tbl"><thead><tr><th>Element</th><th>Use</th><th>Key trait</th></tr></thead><tbody>
<tr><td>Fire wall (§706)</td><td>Divides one structure into separate buildings for height and area</td><td>Continuous from foundation through the roof; stays standing if one side collapses</td></tr>
<tr><td>Fire barrier (§707)</td><td>Exit stair and shaft enclosures, occupancy separations, fire areas</td><td>Floor to floor or to the roof deck, continuous through concealed spaces</td></tr>
<tr><td>Fire partition (§708)</td><td>Corridor walls, dwelling and sleeping unit separations, tenant separations in malls</td><td>Usually 1 hour or less; may terminate at a rated ceiling membrane in some cases</td></tr>
<tr><td>Smoke barrier (§709)</td><td>Smoke compartments, such as in hospitals</td><td>Resists smoke movement; typically 1 hour</td></tr>
</tbody></table>
<p>Openings need protectives rated for the wall (Table 716.1(2)): for example, 1½-hour doors in 2-hour fire barriers and 1-hour doors in 1-hour exit enclosures and shafts. Doors are labeled and self-closing, installed to NFPA 80.</p>
`,
  diagram: "",
  formulas: [
    { name: "Frontage increase", f: "If = [F/P − 0.25] × W/30   (W ≤ 30 for the ratio; If ≤ 0.75)" },
    { name: "Allowable area, one story", f: "Aa = At + (NS × If)" },
    { name: "Occupant load", f: "Occupant load = area ÷ load factor (Table 1004.5)" }
  ],
  example: { title: "Applying it", html: `<p>A one-story Group B clinic, Type V-B, fully sprinklered. Case values: NS = 9,000 sf, S1 = 36,000 sf. The building is 220 ft × 180 ft (perimeter 800 ft); the 220 ft and 180 ft sides face streets at least 30 ft wide. F = 400 ft, so I<sub>f</sub> = [400/800 − 0.25] × 30/30 = 0.25. A<sub>a</sub> = 36,000 + (9,000 × 0.25) = 38,250 sf. The footprint is 39,600 sf, so it does not comply as Type V-B. The options are Type V-A, more frontage, or a fire wall.</p>` },
  mistakes: [
    "Adding a separate sprinkler increase on top of the S1 or SM value. The table already includes it.",
    "Using W greater than 30 in the frontage ratio.",
    "Using a fire barrier where you need separate buildings. Only a fire wall creates them.",
    "Using NS instead of the S value as A<sub>t</sub> in a sprinklered building."
  ],
  scenario: { prompt: "A two-story Type II-B office building is slightly over its allowable area. The owner does not want to upgrade the construction type. What else could work?",
    answer: "Increase the frontage (site the building so more perimeter faces streets or open space at least 20 ft wide), confirm the building is fully sprinklered so the SM value applies, or divide it with a fire wall into two separate buildings that each comply." },
  canada: "In Ontario, the OBC sets building size by occupancy, height and area in Part 3 (Subsection 3.2.2) using different articles and terms (for example, 'combustible' and 'noncombustible construction' and 'streets' for firefighting access). Do not mix IBC and OBC values.",
  refs: [
    { t: "2021 IBC Chapter 5 (Tables 504.3, 504.4, 506.2; §506.2.1, §506.2.3, §506.3)", a: "Free to read (codes.iccsafe.org)" },
    { t: "2021 IBC Chapter 6 (Tables 601, 602) and Chapter 7 (§706–§709, Table 716.1(2))", a: "Free to read (codes.iccsafe.org)" },
    { t: "NFPA 80, Standard for Fire Doors and Other Opening Protectives", a: "Free to read (nfpa.org)" }
  ],
  check: ["q-ppd-y01", "q-ppd-y02", "q-ppd-y03"]
});

ARE.LESSONS.push({
  id: "pdd-firerated", div: "pdd", obj: ["pdd-4.1", "pdd-1.5", "pdd-2.3"], title: "Fire-Rated Assemblies, Penetrations & Joints",
  minutes: 30, level: "Core",
  summary: "How to document rated walls and floors so they actually keep their rating: tested assemblies, continuity, penetrations, joints, ducts and doors.",
  objectives: [
    "Specify a rated assembly by a tested listing.",
    "Detail continuity of rated walls to the deck and through concealed spaces.",
    "Choose firestop systems for penetrations and joints by F and T ratings.",
    "Coordinate fire and smoke dampers and opening protectives."
  ],
  why: "A rated wall is only as good as its weakest hole. Most failures are at penetrations, head-of-wall joints and doors, which are exactly the details CDs must show.",
  exam: "PDD items show a wall section or a penetration and ask what is missing, or ask which test standard or rating applies.",
  body: `
<h3>Rated assemblies</h3>
<p>Fire-resistance ratings come from testing to <strong>ASTM E119 / UL 263</strong> (§703). Designers specify a <strong>listed design</strong>, such as a UL design number, and build exactly what was tested: stud size and spacing, board type (Type X), layers, fasteners and joint treatment. Note the design number on the partition type schedule.</p>

<h3>Continuity</h3>
<p>Fire barriers run from the floor to the floor or roof deck above and continue through concealed spaces above ceilings (§707.5). The top of the wall needs a <strong>head-of-wall joint</strong> that allows deck deflection and keeps the rating.</p>

<h3>Penetrations (§714)</h3>
<ul>
<li><strong>Through-penetrations</strong> (pipes, cables or conduit passing through the whole assembly) use a tested <strong>firestop system</strong> to ASTM E814 / UL 1479.</li>
<li>The <strong>F rating</strong> is how long flame is kept from passing. The <strong>T rating</strong> also limits temperature rise on the unexposed side; floor penetrations often need T ratings as well.</li>
<li><strong>Membrane penetrations</strong> (an outlet box in one face) are limited in size and spacing or need protection, such as putty pads.</li>
</ul>

<h3>Joints (§715)</h3>
<p>Joints between rated assemblies, such as head-of-wall and floor-to-curtain-wall perimeter joints, use tested joint systems (ASTM E1966 / UL 2079 for joints; ASTM E2307 for the perimeter fire barrier at curtain walls).</p>

<h3>Ducts and openings</h3>
<p>Ducts passing through rated assemblies need <strong>fire dampers</strong> where §717 requires them, and <strong>smoke dampers</strong> at smoke barriers. Show access panels for inspection. Doors and windows in rated walls are labeled opening protectives, self-closing or automatic-closing, installed to NFPA 80 (§716).</p>
`,
  diagram: `<svg viewBox="0 0 480 220" role="img" aria-label="Section of a fire barrier extending to the deck with a head-of-wall joint, a pipe through-penetration with firestop, and a fire damper at a duct"><g class="dg-text" font-size="11">
<rect x="20" y="20" width="440" height="14" class="dg-hatch"/><text x="240" y="16" text-anchor="middle">Floor or roof deck above</text>
<rect x="210" y="44" width="24" height="160" class="dg-soft"/><rect x="206" y="34" width="32" height="10" class="dg-accent2"/>
<path d="M238 39h70" class="dg-leader"/><text x="312" y="43">Head-of-wall joint system (§715)</text>
<path d="M120 100h220" class="dg-line" stroke-width="5"/><circle cx="222" cy="100" r="9" class="dg-accent2"/>
<path d="M231 106l60 30" class="dg-leader"/><text x="294" y="140">Firestop system: F and T ratings (§714)</text>
<rect x="170" y="160" width="104" height="22" class="dg-air"/><rect x="214" y="156" width="16" height="30" class="dg-accent2"/>
<path d="M230 186l60 18" class="dg-leader"/><text x="294" y="210">Fire damper with access panel (§717)</text>
<text x="120" y="70">Ceiling below</text><path d="M60 76h150M234 76h150" class="dg-leader" stroke-dasharray="4 3"/>
<text x="30" y="214">Rated wall runs through the ceiling space to the deck (§707.5)</text></g></svg>`,
  formulas: [],
  example: { title: "Applying it", html: `<p>At the 90% CD review, the partition schedule shows a 2-hour exit stair enclosure ending at the ceiling. The reviewer redlines it to extend to the deck, adds a listed head-of-wall joint, tags the sprinkler main and conduits passing through with a firestop system number, and asks the mechanical engineer to confirm whether the supply duct entering the stair is allowed at all. Ducts generally may not penetrate exit enclosures except as the code allows.</p>` },
  mistakes: [
    "Stopping a fire barrier at the ceiling.",
    "Writing 'seal penetration with fire caulk' instead of naming a tested firestop system.",
    "Ignoring the T rating at floor penetrations.",
    "Forgetting access panels for fire dampers."
  ],
  scenario: { prompt: "A plumber wants to run PVC drain lines through a 1-hour corridor floor using the firestop sealant already on site. What should the architect check?",
    answer: "That the firestop system used is listed for that penetrant (plastic pipe of that size), that assembly, and the required F and T ratings, and that it matches the system shown in the documents or an approved submittal. Plastic pipe usually needs an intumescent system, not just sealant." },
  refs: [
    { t: "2021 IBC Chapter 7: §703, §707.5, §714, §715, §716, §717", a: "Free to read (codes.iccsafe.org)" },
    { t: "UL Product iQ / Fire Resistance Directory (listed designs and firestop systems)", a: "Free with registration (productiq.ulprospector.com)" },
    { t: "ASTM E119, E814, E1966, E2307; NFPA 80", a: "Purchase (ASTM); free to read (NFPA)" }
  ],
  check: ["q-pdd-y01", "q-pdd-y02", "q-pdd-y03"]
});

Object.assign(ARE.TAKEAWAYS || (ARE.TAKEAWAYS = {}), {
  "pa-existing": ["Survey before you design: conditions, structure, hazards.", "IEBC paths: prescriptive, work area, performance.", "Level 3 = work area over 50% of the building.", "Change of occupancy can trigger big upgrades.", "Path of travel up to 20% of alteration cost.", "Rehabilitation = compatible new use, keep character."],
  "ppd-heightarea": ["Type I–V; A = protected, B = unprotected.", "Tables 504.3, 504.4 and 506.2 already include sprinkler benefits.", "If = [F/P − 0.25] × W/30, W ≤ 30, max 0.75.", "Aa = At + (NS × If).", "Only fire walls create separate buildings.", "Fire barriers enclose stairs and shafts and go to the deck."],
  "pdd-firerated": ["Build the tested, listed design.", "Fire barriers continue to the deck.", "Penetrations: listed firestop with F (and often T) ratings.", "Joints need tested joint systems.", "Fire dampers need access.", "Rated doors: labeled, self-closing, NFPA 80."]
});
