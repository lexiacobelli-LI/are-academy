/* ---------- Deeper lesson content: Programming & Analysis (v19) ---------- */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["pa-zoning"] = {
  sections: [
    { h: "Worked zoning check", html: `
<p>Lot 120 ft × 200 ft = 24,000 sf. Zoning: FAR 2.0, maximum lot coverage 60%, front setback 20 ft, side setbacks 10 ft each, rear 25 ft, height 55 ft.</p>
<table class="tbl"><thead><tr><th>Control</th><th>Calculation</th><th>Limit</th></tr></thead><tbody>
<tr><td>Maximum gross floor area</td><td>24,000 × 2.0</td><td>48,000 sf</td></tr>
<tr><td>Maximum footprint by coverage</td><td>24,000 × 0.60</td><td>14,400 sf</td></tr>
<tr><td>Buildable area inside setbacks</td><td>(120 − 20) × (200 − 20 − 25)</td><td>100 × 155 = 15,500 sf</td></tr>
<tr><td>Governing footprint</td><td>Lesser of coverage and setback area</td><td>14,400 sf</td></tr>
<tr><td>Minimum stories to use full FAR</td><td>48,000 ÷ 14,400</td><td>3.33, so 4 stories</td></tr>
</tbody></table>
<p>Check height last: 4 stories at about 13 ft is 52 ft, under the 55 ft limit. Parking, open-space and bulk-plane rules may still reduce what can be built.</p>` },
    { h: "Where zoning sits among other rules", html: `
<table class="tbl"><thead><tr><th>Source</th><th>Controls</th><th>Who enforces</th></tr></thead><tbody>
<tr><td>Zoning ordinance</td><td>Use, density, bulk, setbacks, parking, signs</td><td>Planning or zoning department</td></tr>
<tr><td>Building code</td><td>Construction, fire and life safety, accessibility</td><td>Building official</td></tr>
<tr><td>Subdivision regulations</td><td>Lot creation, streets, utilities</td><td>Planning commission</td></tr>
<tr><td>Deed restrictions and covenants</td><td>Private limits recorded on title</td><td>Private parties, through the courts</td></tr>
<tr><td>Easements</td><td>Rights of others to use part of the lot</td><td>The easement holder</td></tr>
</tbody></table>
<p>Public zoning does not cancel private restrictions; a project must satisfy both. A title report and survey reveal recorded easements and covenants.</p>` }
  ],
  tips: [
    "FAR counts gross floor area on all floors; lot coverage counts only the footprint.",
    "The more restrictive of setbacks and lot coverage controls the footprint.",
    "A variance relieves a hardship from the land itself; a conditional (special) use is a use the district allows only with approval."
  ]
};

ARE.DEEP["pa-program"] = {
  sections: [
    { h: "Writing a program", html: `
<ol>
<li><b>Gather</b>: interviews, workshops, observation of current operations, surveys, benchmarking of similar facilities.</li>
<li><b>Organize</b>: goals, facts, concepts, needs, and the problem statement (the Peña method).</li>
<li><b>Quantify</b>: list each space with net area, occupants, equipment and special requirements.</li>
<li><b>Relate</b>: adjacency matrix and bubble diagrams for which spaces must be near, visible or separated.</li>
<li><b>Gross up</b>: net area ÷ efficiency ratio = gross area, to account for circulation, walls and service space.</li>
<li><b>Test against the budget and site</b> before design begins.</li>
</ol>
<p>Example: 30,000 nsf at an efficiency of 0.70 needs about 42,860 gsf. At 0.65 it needs about 46,150 gsf, a difference of more than 3,000 sf that the budget must carry.</p>` },
    { h: "Climate data the program should record", html: `
<ul>
<li>Heating and cooling degree days, and design temperatures.</li>
<li>Sun path: summer sun high in the south, winter sun low; east and west glazing is hardest to shade.</li>
<li>Prevailing winds by season from a wind rose.</li>
<li>Precipitation and snow loads; flood risk.</li>
<li>Humidity, which affects natural ventilation and moisture control.</li>
</ul>
<p>Record these during programming so orientation, glazing and system choices in design respond to them.</p>` }
  ],
  tips: [
    "Programming defines the problem; design solves it. A stem asking what to do \"before design\" usually points to programming tasks.",
    "Efficiency ratio = net ÷ gross. A lower ratio means more gross area for the same net program.",
    "Adjacency diagrams show relationships, not sizes or shapes."
  ]
};
ARE.DEEP_TERMS.push(
  ["Net assignable area", "Programming", "Floor area assigned to a function, excluding circulation, walls, structure and building services.", "pa-program"],
  ["Gross area", "Programming", "Total floor area measured to the outside of exterior walls, including all spaces.", "pa-program"],
  ["Problem seeking", "Programming", "The Peña method: organize goals, facts, concepts, needs and the problem statement.", "pa-program"]
);

ARE.DEEP["pa-site"] = {
  sections: [
    { h: "Reading a topographic plan", html: `
<ul>
<li><b>Spacing</b>: close contours are steep, wide contours are gentle.</li>
<li><b>Valleys</b>: contours form V's that point uphill. <b>Ridges</b>: V's that point downhill.</li>
<li><b>Slope</b> = vertical rise ÷ horizontal run × 100. A 2 ft contour interval with contours 50 ft apart is a 4% slope.</li>
<li><b>Suitable slopes</b> (general guidance): parking and play fields under about 5%; buildings easiest under about 8–10%; above about 15–20%, terracing or retaining walls are usually needed and erosion risk rises.</li>
</ul>` },
    { h: "Using the site's own resources", html: `
<table class="tbl"><thead><tr><th>Resource</th><th>Strategy</th></tr></thead><tbody>
<tr><td>Sun</td><td>Orient long façades north and south; daylight; solar panels on south-facing roofs</td></tr>
<tr><td>Wind</td><td>Cross-ventilation from summer breezes; shield entries from winter winds</td></tr>
<tr><td>Water</td><td>Infiltrate or harvest rainwater; bioswales and rain gardens reduce runoff</td></tr>
<tr><td>Vegetation</td><td>Keep mature trees; deciduous trees on the south shade in summer and admit winter sun</td></tr>
<tr><td>Soil and earth</td><td>Balance cut and fill; reuse topsoil; earth-sheltering in some climates</td></tr>
<tr><td>Existing structures</td><td>Reuse buildings and materials to cut embodied carbon</td></tr>
</tbody></table>` }
  ],
  tips: [
    "Wind-rose bars point toward the direction the wind comes FROM.",
    "Geotechnical reports give bearing capacity, groundwater and recommended foundations; surveys give boundaries, topography and utilities.",
    "Phase I environmental site assessments review records for likely contamination; Phase II takes samples."
  ]
};
ARE.DEEP_TERMS.push(
  ["Phase I environmental site assessment", "Site", "A records review and site visit to identify likely contamination before buying or developing land.", "pa-site"],
  ["Cut and fill", "Site", "Earth removed (cut) and placed (fill) to reach design grades; balancing them reduces hauling.", "pa-site"]
);

ARE.DEEP["pa-building"] = {
  sections: [
    { h: "Comparing structural systems early", html: `
<table class="tbl"><thead><tr><th>System</th><th>Typical spans</th><th>Strengths</th><th>Watch for</th></tr></thead><tbody>
<tr><td>Wood light frame</td><td>Short</td><td>Low cost, fast</td><td>Construction type limits height and area</td></tr>
<tr><td>Steel frame with composite deck</td><td>Medium to long</td><td>Speed, flexibility</td><td>Fireproofing, vibration</td></tr>
<tr><td>Cast-in-place concrete flat plate</td><td>Short to medium</td><td>Thin floors, fire resistance</td><td>Formwork time, weight</td></tr>
<tr><td>Precast or post-tensioned concrete</td><td>Medium to long</td><td>Long clear spans, parking</td><td>Penetrations after construction</td></tr>
<tr><td>Mass timber</td><td>Medium</td><td>Low embodied carbon, speed</td><td>Code type (IV-A to IV-HT), moisture during construction</td></tr>
</tbody></table>` }
  ],
  tips: [
    "Soft costs (fees, permits, furniture, financing) are part of the project budget, not the construction budget.",
    "Stacking diagrams show which functions go on which floor; blocking diagrams show their rough areas on a floor.",
    "Long spans favor steel trusses, post-tensioned concrete or precast; repetitive short spans favor flat plates or light frame."
  ]
};

ARE.DEEP["pa-existing"] = {
  sections: [
    ],
  tips: [
    "Survey the existing building, including hazardous materials (asbestos, lead paint), before programming.",
    "The 20% disproportionality rule is a cost test on path-of-travel work, not a limit on making the altered area itself accessible.",
    "Rehabilitation keeps character-defining features while allowing new uses."
  ]
};
ARE.DEEP_TERMS.push(
  ["Work area compliance method", "Codes", "IEBC method where requirements depend on the level of alteration (Levels 1–3), change of occupancy or addition.", "pa-existing"],
  ["Primary function area", "Accessibility", "An area where a major activity of the facility takes place; altering it triggers path-of-travel requirements under the ADA.", "pa-existing"],
  ["Disproportionate cost", "Accessibility", "Path-of-travel work costing more than 20% of the alteration; the owner must still spend up to 20%.", "pa-existing"],
  ["Rehabilitation", "Preservation", "Adapting a historic building for use while keeping its character-defining features.", "pa-existing"],
  ["Section 106 review", "Preservation", "Federal review of how projects using federal funds, permits or land affect historic properties.", "pa-existing"]
);

ARE.DEEP["pa-budget"] = {
  sections: [
    { h: "From total budget to construction budget", html: `
<p>An owner has $20,000,000 in total. Typical soft costs might be: design fees 9%, furniture and equipment 6%, permits, testing and surveys 3%, owner's contingency 5%. That is 23% of the total, or $4,600,000, leaving $15,400,000 for construction including site work.</p>
<p>If the building is expected to cost $420/sf at today's prices and construction will start in 18 months at 4% annual escalation, escalate to the <b>midpoint of construction</b>. With a 12-month build, the midpoint is 18 + 6 = 24 months out: $420 × 1.04² ≈ $454/sf. With a 10% design contingency at SD, the planning number becomes about $500/sf. Divide: $15,400,000 ÷ $500 ≈ 30,800 gsf affordable. Compare that with the program's gross area.</p>` },
    ],
  tips: [
    "Escalate to the midpoint of construction, not the start.",
    "Design contingency should drop at each phase as the documents develop.",
    "If the numbers do not work, the owner chooses among scope, quality, budget and schedule; the architect presents options."
  ]
};
ARE.DEEP_TERMS.push(
  ["Project budget", "Cost", "The owner's total cost: construction plus soft costs such as fees, furniture, permits, financing and contingencies.", "pa-budget"],
  ["Construction budget", "Cost", "The portion of the project budget for the cost of the work, including site work.", "pa-budget"],
  ["Design contingency", "Cost", "An allowance in estimates for design not yet complete; it shrinks as documents develop.", "pa-budget"],
  ["Construction midpoint", "Cost", "Halfway through the construction period; the date to which costs are escalated.", "pa-budget"]
);
