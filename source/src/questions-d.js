/* QUESTION BANK (set 4): PA, PPD, PDD gap coverage. Original items. */

/* ---------- PA ---------- */
Q({ id: "q-pa-13", div: "pa", obj: "pa-1.3", lesson: "pa-site", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A site has a large stand of mature deciduous trees along its south edge. How can they best serve a new one-story library?",
  opts: ["Remove them for solar panels", "Keep them to shade the south facade in summer while admitting winter sun after leaf drop", "Replace them with evergreens", "Pave beneath them for parking"],
  ans: 1,
  why: ["Loses free shading and habitat.", "Correct.", "Evergreens block winter sun.", "Paving harms roots."],
  explain: "Deciduous trees provide seasonal shading, one of the simplest onsite resources.", ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-pa-14", div: "pa", obj: "pa-1.3", lesson: "pa-site", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "Which three strategies make use of onsite resources to reduce a project's environmental impact? Check the three that apply.",
  opts: ["Bioswales that infiltrate roof runoff", "Reusing the existing building's structure", "Orienting glazing for daylight", "Importing fill to raise the whole site", "Removing all vegetation for a clear site", "Piping all stormwater directly to the municipal sewer"],
  ans: [0, 1, 2],
  why: ["Correct.", "Correct.", "Correct.", "Adds embodied impact.", "Loses shade and habitat.", "Increases downstream load."],
  explain: "Work with the site's water, structures, sun and vegetation.", ref: "AIA Architect's Handbook, 15th ed., §16.3 (Sustainable design, p. 1021)" });

Q({ id: "q-pa-15", div: "pa", obj: "pa-2.1", lesson: "pa-zoning", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "Under the 2021 IBC, a building used mainly for offices with a 40-seat training room (under 750 sf) would typically be classified as:",
  opts: ["Group A-3 throughout", "Group B, with the small assembly room treated as part of the B occupancy", "Group E", "Group M"],
  ans: 1,
  why: ["The room is small enough to be treated as Group B.", "Correct. Assembly spaces under 50 occupants (or under 750 sf) accessory to another occupancy can be classified with it (§303.1.2).", "Education above 12th grade is Group B.", "Mercantile is retail."],
  explain: "Small assembly spaces can be classified as part of the main occupancy.", ref: "2021 IBC §303.1" });

Q({ id: "q-pa-16", div: "pa", obj: "pa-3.1", lesson: "pa-site", type: "calc", diff: 2, fmt: "Calculation",
  q: "A 3-acre site (1 acre = 43,560 sf) has a 50 ft wide utility easement running 300 ft across it and 0.4 acres of protected wetland. What is the remaining area in square feet before setbacks?",
  ans: 98256, tol: 1, unit: "sf",
  explain: "3 × 43,560 = 130,680. Easement 50 × 300 = 15,000. Wetland 0.4 × 43,560 = 17,424. 130,680 − 15,000 − 17,424 = 98,256 sf.", ref: "Site analysis method" });

Q({ id: "q-pa-17", div: "pa", obj: "pa-3.1", lesson: "pa-site", type: "mc", diff: 2, fmt: "Scenario",
  q: "Which site attribute most directly limits whether a three-story building with a basement is feasible?",
  opts: ["Views", "Groundwater level and soil bearing capacity", "Adjacent building color", "Distance to the nearest coffee shop"],
  ans: 1,
  why: ["Affects quality, not feasibility.", "Correct.", "Irrelevant.", "Irrelevant."],
  explain: "High groundwater makes basements costly; weak soils need deep foundations.", ref: "Geotechnical engineering practice" });

Q({ id: "q-pa-18", div: "pa", obj: "pa-3.2", lesson: "pa-site", type: "mc", diff: 3, fmt: "Report synthesis",
  q: "The survey shows the site is flat; the geotechnical report finds fill to 8 ft over soft clay; the Phase I flags a former dry cleaner next door. What should the architect recommend first?",
  opts: ["Begin schematic design immediately", "A Phase II ESA and foundation cost study before committing to the site", "Ignore the neighbor's history", "Specify a basement"],
  ans: 1,
  why: ["Unknown costs remain.", "Correct. Both findings can change cost and feasibility.", "Dry-cleaning solvents can migrate.", "Poor soils make basements costly."],
  explain: "Synthesize reports into decisions: resolve the big unknowns before design.", ref: "ASTM E1527-21, E1903" });

Q({ id: "q-pa-19", div: "pa", obj: "pa-3.3", lesson: "pa-site", type: "hot", diff: 2, fmt: "Hotspot",
  q: "On this topographic plan (contour interval 2 ft), click the area best suited for a parking lot.",
  svg: `<svg viewBox="0 0 520 300" role="img" aria-label="Topographic plan with three candidate zones A, B and C">
<g class="dg-text" font-size="11">
<rect x="20" y="20" width="480" height="260" class="dg-soft"/>
<path d="M20 60 Q200 40 500 70" class="dg-line"/><path d="M20 75 Q200 55 500 85" class="dg-line"/><path d="M20 90 Q200 70 500 100" class="dg-line"/><path d="M20 105 Q200 85 500 115" class="dg-line"/>
<path d="M20 200 Q200 190 500 205" class="dg-line"/><path d="M20 265 Q200 255 500 268" class="dg-line"/>
<path d="M330 120 L400 200 L470 120" class="dg-line" stroke-dasharray="3 3"/>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="Zone A"><circle cx="150" cy="78" r="18" class="hs-dot"/><text x="150" y="83" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="Zone B"><circle cx="160" cy="230" r="18" class="hs-dot"/><text x="160" y="235" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="Zone C"><circle cx="400" cy="160" r="18" class="hs-dot"/><text x="400" y="165" text-anchor="middle">C</text></g>
</g></svg>`,
  ans: "B",
  explain: "Zone A sits where contours are tightly spaced (steep). Zone C sits in a drainage swale (contours forming a V). Zone B has widely spaced contours (gentle slope) and is suited to parking.", ref: "Site analysis graphics" });

Q({ id: "q-pa-20", div: "pa", obj: "pa-3.3", lesson: "pa-site", type: "mc", diff: 1, fmt: "Diagram interpretation",
  q: "On a wind rose, the longest bar extends toward the northwest. What does this indicate?",
  opts: ["Winds most often blow toward the northwest", "Winds most often come from the northwest", "The site faces northwest", "Wind speed is highest to the southeast"],
  ans: 1,
  why: ["Bars point to the source direction.", "Correct.", "Unrelated to orientation.", "Frequency, not speed, is shown by length."],
  explain: "Shield entries from prevailing winter winds; open to summer breezes.", ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-pa-21", div: "pa", obj: "pa-4.1", lesson: "pa-building", type: "mc", diff: 2, fmt: "Scenario",
  q: "An owner plans to convert a 1975 two-story office building to a daycare. Which issue is most likely to require major work?",
  opts: ["Paint colors", "Change of occupancy triggers for egress, fire protection and accessibility, plus hazardous materials abatement", "Window cleaning", "Parking lot striping"],
  ans: 1,
  why: ["Cosmetic.", "Correct.", "Maintenance.", "Minor."],
  explain: "Change of occupancy brings the building under new requirements; a 1975 building likely contains asbestos.", ref: "2021 IEBC (change of occupancy)" });

Q({ id: "q-pa-22", div: "pa", obj: "pa-4.2", lesson: "pa-building", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which document best informs the program for renovating an existing university building?",
  opts: ["A facility condition assessment with space utilization data", "The original construction contract", "The contractor's warranty letter", "A bid tabulation from 1990"],
  ans: 0,
  why: ["Correct.", "Historical; not programmatic.", "Expired and limited.", "Irrelevant."],
  explain: "Condition and utilization data show what exists and how it is used.", ref: "Pena & Parshall, Problem Seeking" });

Q({ id: "q-pa-23", div: "pa", obj: "pa-4.2", lesson: "pa-building", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Before programming the renovation of a 1960s school, which two reports should the architect request? Check the two that apply.",
  opts: ["Hazardous materials survey", "Structural condition assessment", "A marketing study of local restaurants", "The principal's résumé", "A traffic count from another city", "Historic stock prices"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Irrelevant.", "Irrelevant.", "Wrong location.", "Irrelevant."],
  explain: "Know what is in the building and whether it can carry the new program.", ref: "2021 IEBC; EPA asbestos guidance" });

Q({ id: "q-pa-24", div: "pa", obj: "pa-4.4", lesson: "pa-building", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "In a clinic adjacency matrix, the cell between 'Waiting' and 'Exam rooms' is marked 'essential' and between 'Waiting' and 'Staff lounge' is 'undesirable.' What does this mean for the plan?",
  opts: ["Put the staff lounge next to waiting", "Exam rooms must be close to waiting; the staff lounge should be separated from it", "Both must be adjacent", "Neither relationship matters"],
  ans: 1,
  why: ["Contradicts the matrix.", "Correct.", "Contradicts the matrix.", "The matrix records requirements."],
  explain: "Matrices translate program relationships into layout rules.", ref: "Pena & Parshall, Problem Seeking" });

Q({ id: "q-pa-25", div: "pa", obj: "pa-4.4", lesson: "pa-building", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A library's program says the circulation desk must see both the entry and the children's area. Which planning response fits best?",
  opts: ["Place the desk on an upper floor", "Locate the desk centrally with sight lines to the entry and children's area", "Put the children's area in the basement", "Separate the desk with full-height walls"],
  ans: 1,
  why: ["Breaks the relationship.", "Correct.", "Breaks supervision.", "Blocks sight lines."],
  explain: "Functional relationships include visual supervision, not just walking distance.", ref: "Programming principles" });

Q({ id: "q-pa-26", div: "pa", obj: "pa-4.5", lesson: "pa-building", type: "calc", diff: 3, fmt: "Calculation",
  q: "Construction cost today is estimated at $8,000,000. Construction midpoint is 2 years away; escalation is 5% per year. Soft costs are 25% of escalated construction cost. What is the total project budget (no land, no other contingency)? Round to the nearest $1,000.",
  ans: 11025000, tol: 1000, unit: "$",
  explain: "Escalated construction = 8,000,000 × 1.05² = 8,820,000. Soft costs = 0.25 × 8,820,000 = 2,205,000. Total = 11,025,000.", ref: "Feasibility budgeting method" });

Q({ id: "q-pa-27", div: "pa", obj: "pa-4.5", lesson: "pa-building", type: "mc", diff: 2, fmt: "Scenario",
  q: "The owner's total budget is $6M, but the feasibility estimate for the full program is $7.2M. What should the architect do?",
  opts: ["Proceed and hope bids come in low", "Present options to the owner: reduce scope, phase, adjust quality or increase the budget", "Cut the program without telling the owner", "Lower the fee"],
  ans: 1,
  why: ["Unprofessional.", "Correct. The owner decides.", "The owner must decide scope.", "Does not solve the gap."],
  explain: "Review and assess feasibility, then advise; do not hide the gap.", ref: "AIA B101–2017 §3.2.2 and Article 6" });

Q({ id: "q-pa-28", div: "pa", obj: "pa-4.6", lesson: "pa-building", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A gymnasium needs a 100 ft clear span with a tight budget. Which structural system is the most appropriate first option to study?",
  opts: ["Wood joists", "Concrete flat plate", "Long-span steel trusses or joist girders", "Load-bearing masonry with no roof framing"],
  ans: 2,
  why: ["Cannot span 100 ft.", "Not economical at this span.", "Correct.", "Masonry walls still need a long-span roof."],
  explain: "Match system to span and budget.", ref: "Ching, Building Structures Illustrated" });

Q({ id: "q-pa-29", div: "pa", obj: "pa-4.6", lesson: "pa-building", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "A developer wants 6-story apartments with low floor-to-floor height and a fast schedule. Which two structural systems should be studied? Check the two that apply.",
  opts: ["Concrete flat plate", "Light-frame wood over a concrete podium (where code permits)", "Long-span steel trusses", "Space frame", "Tensile fabric structure", "Masonry arches"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Overkill for apartments.", "Long-span system.", "Not for apartments.", "Impractical."],
  explain: "Flat plates minimize depth; wood over podium is economical for mid-rise housing where construction type permits.", ref: "2021 IBC Chapter 5 and 6" });

Q({ id: "q-pa-30", div: "pa", obj: "pa-4.7", lesson: "pa-building", type: "mc", diff: 1, fmt: "Diagram interpretation",
  q: "In a bubble diagram, what do the relative sizes of the bubbles usually represent?",
  opts: ["Construction cost", "Approximate floor area of each space", "Ceiling height", "Number of doors"],
  ans: 1,
  why: ["Not shown.", "Correct.", "Not shown.", "Not shown."],
  explain: "Line weight shows adjacency importance; bubble size shows area.", ref: "Programming graphics" });

Q({ id: "q-pa-31", div: "pa", obj: "pa-4.7", lesson: "pa-building", type: "mc", diff: 2, fmt: "Diagram interpretation",
  q: "Which graphic shows which department goes on which floor of a multistory building?",
  opts: ["Adjacency matrix", "Bubble diagram", "Stacking diagram", "Sun path diagram"],
  ans: 2,
  why: ["Shows relationships, not floors.", "Shows relationships.", "Correct.", "Shows sun angles."],
  explain: "Blocking is horizontal; stacking is vertical.", ref: "Programming graphics" });

/* ---------- PPD ---------- */
Q({ id: "q-ppd-14", div: "ppd", obj: "ppd-1.1", lesson: "ppd-siting", type: "hot", diff: 2, fmt: "Hotspot",
  q: "Click the best location for a new two-story clinic on this site. North is up; the street is along the south edge.",
  svg: `<svg viewBox="0 0 520 300" role="img" aria-label="Site with floodplain, steep slope and three candidate building locations">
<g class="dg-text" font-size="11">
<rect x="20" y="20" width="480" height="240" class="dg-soft"/>
<path d="M20 180 Q120 170 170 260 L20 260 Z" class="dg-air"/><text x="40" y="240">Floodplain</text>
<path d="M360 20 L500 20 L500 140 Q430 110 360 20 Z" class="dg-hatch"/><text x="420" y="60">15% slope</text>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="Location A"><circle cx="80" cy="215" r="18" class="hs-dot"/><text x="80" y="220" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="Location B"><circle cx="270" cy="170" r="18" class="hs-dot"/><text x="270" y="175" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="Location C"><circle cx="440" cy="80" r="18" class="hs-dot"/><text x="440" y="85" text-anchor="middle">C</text></g>
<text x="260" y="285" text-anchor="middle">Street (south)</text>
</g></svg>`,
  ans: "B",
  explain: "A is in the floodplain and C is on a 15% slope. B is level ground near the street, with good access and solar orientation.", ref: "Site planning principles" });

Q({ id: "q-ppd-15", div: "ppd", obj: "ppd-1.1", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Where should accessible parking spaces be located?",
  opts: ["Anywhere in the lot", "On the shortest accessible route to the accessible entrance", "At the far end to reduce traffic", "Across the street"],
  ans: 1,
  why: ["Location is regulated.", "Correct. 2010 ADA Standards §208.3.1.", "Wrong.", "Wrong."],
  explain: "Accessible parking is placed on the shortest accessible route to an accessible entrance.", ref: "2010 ADA Standards §208.3.1" });

Q({ id: "q-ppd-16", div: "ppd", obj: "ppd-1.2", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which strategy most reduces cooling loads for a building in a hot-humid climate?",
  opts: ["Large unshaded west glazing", "Deep overhangs, shaded windows and cross-ventilation", "Heavy thermal mass with no shading", "A dark roof"],
  ans: 1,
  why: ["Increases solar gain.", "Correct.", "Mass works poorly where nights stay warm and humid.", "Dark roofs absorb heat."],
  explain: "Shade, ventilate and keep the envelope light in hot-humid climates.", ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-ppd-17", div: "ppd", obj: "ppd-1.2", lesson: "ppd-envelope", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two strategies reduce operational energy in a cold climate office? Check the two that apply.",
  opts: ["Continuous exterior insulation", "Compact building form", "Maximizing north glazing", "Single-pane windows for daylight", "Removing vestibules", "Dark interior finishes"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Large north glazing loses heat with little gain.", "Very poor insulation.", "Vestibules reduce infiltration.", "Reduce daylight use."],
  explain: "Reduce surface area and thermal bridging.", ref: "2021 IECC" });

Q({ id: "q-ppd-18", div: "ppd", obj: "ppd-1.3", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Scenario",
  q: "A new four-story building is planned on a main street lined with two- and three-story buildings set at the sidewalk. Which response best fits the context?",
  opts: ["Set the building back 60 ft behind a parking lot", "Build to the sidewalk, align a cornice or setback with the neighbors' height, and step back the upper floor", "Use a single blank wall facing the street", "Rotate the building 45 degrees"],
  ans: 1,
  why: ["Breaks the street wall.", "Correct.", "Hostile to pedestrians.", "Ignores the street grid."],
  explain: "Respect the street wall, scale and rhythm of the block.", ref: "AIA Architect's Handbook, 15th ed., §9.6 (pp. 567–572)" });

Q({ id: "q-ppd-19", div: "ppd", obj: "ppd-1.3", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "In a designated historic district, who typically must approve the exterior design of a new building?",
  opts: ["Only the building official", "A historic preservation commission or design review board", "The contractor", "No one"],
  ans: 1,
  why: ["The building official reviews code, not historic character.", "Correct.", "No authority.", "Districts have review processes."],
  explain: "Plan for this review early; it affects massing and materials.", ref: "Local historic preservation ordinance" });

Q({ id: "q-ppd-20", div: "ppd", obj: "ppd-2.1", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A site is in a flood zone with a design flood elevation of 104.0 ft. Where must the lowest floor of a new building generally be?",
  opts: ["At 100.0 ft", "At or above 104.0 ft (plus any local freeboard)", "Below grade", "Floor level does not matter"],
  ans: 1,
  why: ["Below the flood elevation.", "Correct.", "Floods first.", "Floodplain rules regulate it."],
  explain: "Elevate the lowest floor to the design flood elevation per the code and local ordinance.", ref: "2021 IBC §1612; ASCE 24" });

Q({ id: "q-ppd-21", div: "ppd", obj: "ppd-2.1", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A jurisdiction requires post-development peak runoff not to exceed pre-development rates. Which site design element addresses this?",
  opts: ["A larger parking lot", "A detention basin or underground detention with a controlled outlet", "Steeper roof slopes", "More downspouts"],
  ans: 1,
  why: ["Increases runoff.", "Correct.", "Does not reduce peak flow.", "Does not reduce peak flow."],
  explain: "Detention stores water and releases it at a controlled rate.", ref: "Local stormwater ordinance" });

Q({ id: "q-ppd-22", div: "ppd", obj: "ppd-2.3", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "The IBC and the energy code both apply. The energy code requires a vestibule at the main entrance; the IBC does not prohibit it. What must the design include?",
  opts: ["Nothing; the IBC governs", "The vestibule, because all applicable codes must be met", "Either, at the owner's choice", "Only what the zoning code requires"],
  ans: 1,
  why: ["Both codes apply.", "Correct.", "Code compliance is mandatory.", "Zoning is separate."],
  explain: "Every adopted code applies; where they conflict, the most restrictive governs.", ref: "2021 IBC §102.1; 2021 IECC" });

Q({ id: "q-ppd-23", div: "ppd", obj: "ppd-2.3", lesson: "ppd-integration", type: "mc", diff: 1, fmt: "Code interpretation",
  q: "Two code sections specify different requirements for the same element. Under the 2021 IBC, which governs?",
  opts: ["The less restrictive", "The most restrictive, and a specific requirement over a general one", "The older section", "The architect's choice"],
  ans: 1,
  why: ["Wrong.", "Correct.", "Age does not decide.", "Not discretionary."],
  explain: "IBC §102.1 sets the rule.", ref: "2021 IBC §102.1" });

Q({ id: "q-ppd-24", div: "ppd", obj: "ppd-3.1", lesson: "ppd-systems", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A one-story big-box retail store needs a simple, low-first-cost HVAC system. Which is most appropriate?",
  opts: ["Central chilled water plant", "Packaged rooftop units", "Fan coil units in each room", "Radiant floor with chilled beams"],
  ans: 1,
  why: ["Too costly for a low-rise box.", "Correct.", "Not suited to open retail.", "High-performance but costly."],
  explain: "Rooftop units suit low-rise, open-plan buildings.", ref: "Grondzik & Kwok, Mechanical and Electrical Equipment for Buildings" });

Q({ id: "q-ppd-25", div: "ppd", obj: "ppd-3.1", lesson: "ppd-systems", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which HVAC system type usually needs the largest vertical shafts and deepest ceiling plenums?",
  opts: ["VRF with dedicated outdoor air", "All-air VAV", "Hydronic radiant", "Fan coils with central plant"],
  ans: 1,
  why: ["Small refrigerant lines.", "Correct. Air carries all the heating and cooling.", "Water carries energy in small pipes.", "Water distribution."],
  explain: "Air is a poor energy carrier per unit volume, so all-air systems need big ducts.", ref: "Grondzik & Kwok" });

Q({ id: "q-ppd-26", div: "ppd", obj: "ppd-3.2", lesson: "ppd-systems", type: "calc", diff: 2, fmt: "Calculation",
  q: "Using the schematic rule depth (in) ≈ span (ft) ÷ 2, what nominal steel beam depth (in inches) should be assumed for a 32 ft span?",
  ans: 16, tol: 0, unit: "in",
  explain: "32 ÷ 2 = 16 in, so plan for about a W16.", ref: "Schematic sizing rule of thumb" });

Q({ id: "q-ppd-27", div: "ppd", obj: "ppd-3.3", lesson: "ppd-systems", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which sprinkler system type suits an unheated parking garage in a cold climate?",
  opts: ["Wet pipe", "Dry pipe", "Deluge", "None is permitted"],
  ans: 1,
  why: ["Pipes would freeze.", "Correct. Pipes hold pressurized air until a head opens.", "For high-hazard rapid spread.", "Sprinklers are often required."],
  explain: "Match suppression type to the environment and hazard.", ref: "NFPA 13" });

Q({ id: "q-ppd-28", div: "ppd", obj: "ppd-3.3", lesson: "ppd-systems", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A recording studio shares a wall with a mechanical room. Which property matters most for that wall?",
  opts: ["High NRC", "High STC", "High SHGC", "High R-value"],
  ans: 1,
  why: ["Absorption inside a room.", "Correct. Blocks sound transmission.", "Glazing property.", "Thermal property."],
  explain: "STC rates sound isolation between spaces.", ref: "ASTM E413 (STC classification)" });

Q({ id: "q-ppd-29", div: "ppd", obj: "ppd-3.3", lesson: "ppd-systems", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "For a three-story medical office building, which elevator type is typically most economical?",
  opts: ["High-speed gearless traction", "Hydraulic", "Double-deck traction", "Escalator only"],
  ans: 1,
  why: ["For high-rise.", "Correct. Hydraulic suits low-rise buildings.", "For very tall buildings.", "Does not meet accessibility needs alone."],
  explain: "Hydraulic elevators are economical for low-rise buildings.", ref: "Grondzik & Kwok" });

Q({ id: "q-ppd-30", div: "ppd", obj: "ppd-4.1", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A school wants every classroom to have daylight and cross-ventilation. Which plan configuration fits best?",
  opts: ["Deep double-loaded block", "Single-loaded classroom wings or courtyard plan", "Windowless core", "Single large open room"],
  ans: 1,
  why: ["Interior rooms lose windows and cross-ventilation.", "Correct.", "No daylight.", "Not suitable for classrooms."],
  explain: "Narrow wings and courtyards bring light and air to each room.", ref: "Design principles" });

Q({ id: "q-ppd-31", div: "ppd", obj: "ppd-4.1", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which building form has the lowest surface-to-volume ratio and is therefore most efficient for heat retention?",
  opts: ["A long, thin bar", "A compact cube", "An H-shaped plan", "A star-shaped plan"],
  ans: 1,
  why: ["More surface per volume.", "Correct.", "More surface.", "More surface."],
  explain: "Compact forms lose less heat; elongated forms help daylight and ventilation.", ref: "Building science principles" });

Q({ id: "q-ppd-32", div: "ppd", obj: "ppd-4.2", lesson: "ppd-systems", type: "mc", diff: 2, fmt: "Scenario",
  q: "To reduce floor-to-floor height in an office, which systems integration move is most effective?",
  opts: ["Run all ducts below the deepest beams", "Use shallower structure or route ducts between beams and use smaller-duct systems", "Raise the ceiling", "Add a dropped soffit everywhere"],
  ans: 1,
  why: ["Increases plenum depth.", "Correct.", "Increases height.", "Increases height."],
  explain: "Integrate structure and MEP so they share depth instead of stacking.", ref: "Systems integration principles" });

Q({ id: "q-ppd-33", div: "ppd", obj: "ppd-4.2", lesson: "ppd-systems", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two decisions help MEP risers serve all floors efficiently? Check the two that apply.",
  opts: ["Stacking shafts and wet walls vertically", "Locating mechanical rooms near the riser", "Placing each floor's toilets in a different location", "Routing risers through long-span beams", "Hiding shafts inside stair enclosures", "Locating risers in tenant spaces at random"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Requires long horizontal runs.", "Weakens structure.", "Not permitted for most services.", "Inefficient."],
  explain: "Stacking and clustering shorten runs and simplify coordination.", ref: "Systems integration principles" });

Q({ id: "q-ppd-34", div: "ppd", obj: "ppd-4.3", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A program calls for 18,000 net sf at an efficiency of 0.72. The site footprint allows 9,000 gsf per floor. What is the minimum number of floors?",
  opts: ["2", "3", "4", "5"],
  ans: 1,
  why: ["Too few.", "Correct. 18,000 ÷ 0.72 = 25,000 gsf; ÷ 9,000 = 2.8, so 3 floors.", "More than needed.", "More than needed."],
  explain: "Gross up the program, then divide by the allowable floor plate.", ref: "Programming method" });

Q({ id: "q-ppd-35", div: "ppd", obj: "ppd-4.3", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Scenario",
  q: "A clinic program requires staff to move between exam rooms without passing through public waiting. Which plan move satisfies this?",
  opts: ["A single shared corridor", "Separate staff and patient circulation with exam rooms between them", "Exam rooms opening directly into waiting", "Staff use the main entrance"],
  ans: 1,
  why: ["Mixes flows.", "Correct.", "Mixes flows.", "Mixes flows."],
  explain: "Translate program relationships into separate circulation.", ref: "Health-care planning principles" });

Q({ id: "q-ppd-36", div: "ppd", obj: "ppd-4.4", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A site borders a highway on the east and a park on the west. How should a residential building respond?",
  opts: ["Bedrooms and balconies facing the highway", "Service spaces, stairs and corridors on the east; living spaces and balconies on the west", "No windows at all", "Main entry from the highway shoulder"],
  ans: 1,
  why: ["Noise and pollution.", "Correct.", "Unreasonable.", "Unsafe."],
  explain: "Buffer noise with service spaces and orient living spaces to amenities.", ref: "Design principles" });

Q({ id: "q-ppd-37", div: "ppd", obj: "ppd-5.1", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Calculation",
  q: "Two options are scored on cost (weight 0.5), daylight (0.3) and flexibility (0.2), each rated 1–5. Option A: 4, 3, 3. Option B: 3, 5, 4. Which scores higher?",
  opts: ["Option A (3.5)", "Option B (3.8)", "They tie", "Cannot be determined"],
  ans: 1,
  why: ["A = 0.5×4 + 0.3×3 + 0.2×3 = 3.5.", "Correct. B = 0.5×3 + 0.3×5 + 0.2×4 = 3.8.", "Scores differ.", "Data is sufficient."],
  explain: "Weighted matrices make trade-offs explicit.", ref: "Decision analysis method" });

Q({ id: "q-ppd-38", div: "ppd", obj: "ppd-5.2", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A cost consultant's SD estimate for a lab building is $280/sf, but comparable recent labs in the region cost $550–650/sf. What should the architect do?",
  opts: ["Accept it; the consultant is the expert", "Question the estimate and ask the consultant to reconcile it with comparables before reporting to the owner", "Reduce the design to match", "Ignore cost until DD"],
  ans: 1,
  why: ["The architect evaluates estimates, especially outliers.", "Correct.", "Premature.", "Cost decisions start at SD."],
  explain: "PPD 5.2 is about evaluating estimates based on the design.", ref: "AIA B101–2017 Article 6" });

Q({ id: "q-ppd-39", div: "ppd", obj: "ppd-5.2", lesson: "ppd-integration", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "When reviewing a DD cost estimate, which three checks are most important? Check the three that apply.",
  opts: ["Quantities match the drawings", "Escalation is carried to the construction midpoint", "Markups and contingency are included but not doubled", "The estimate uses the firm's logo", "The estimate font matches the drawings", "The estimator's office location"],
  ans: [0, 1, 2],
  why: ["Correct.", "Correct.", "Correct.", "Irrelevant.", "Irrelevant.", "Irrelevant."],
  explain: "Check quantities, unit costs, time and markups.", ref: "Cost estimating practice" });

Q({ id: "q-ppd-40", div: "ppd", obj: "ppd-5.3", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Scenario",
  q: "The design is 6% over budget at DD. Which change usually reduces cost with the least effect on the program?",
  opts: ["Removing required exits", "Simplifying the envelope (fewer corners and glazing changes) and standardizing structural bays", "Eliminating the accessible entrance", "Removing fire sprinklers required by code"],
  ans: 1,
  why: ["Code-required.", "Correct.", "Law-required.", "Code-required."],
  explain: "Evaluate the design for cost drivers that do not affect required elements.", ref: "Value analysis practice" });

/* ---------- PDD ---------- */
Q({ id: "q-pdd-13", div: "pdd", obj: "pdd-1.1", lesson: "pdd-sizing", type: "mc", diff: 2, fmt: "Scenario",
  q: "A project goal is net-zero energy. Which architectural system decision most supports it?",
  opts: ["Maximizing glazing on all sides", "A high-performance envelope with right-sized glazing and roof area reserved for photovoltaics", "Dark roofing", "Eliminating insulation"],
  ans: 1,
  why: ["Raises loads.", "Correct.", "Adds cooling load.", "Raises loads."],
  explain: "Reduce load first, then generate.", ref: "Systems integration principles" });

Q({ id: "q-pdd-14", div: "pdd", obj: "pdd-1.1", lesson: "pdd-sizing", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A roof is to carry rooftop units, photovoltaic arrays and a green roof. Which systems must be coordinated first?",
  opts: ["Interior finishes", "Structural capacity, roof drainage and equipment layout", "Door hardware", "Signage"],
  ans: 1,
  why: ["Not affected.", "Correct.", "Not affected.", "Not affected."],
  explain: "Loads and drainage set the roof design.", ref: "Systems integration principles" });

Q({ id: "q-pdd-15", div: "pdd", obj: "pdd-1.2", lesson: "pdd-sizing", type: "calc", diff: 2, fmt: "Calculation",
  q: "A supply duct must carry 2,400 cfm at 1,200 fpm. What is the required cross-sectional area in square feet?",
  ans: 2, tol: 0.01, unit: "sf",
  explain: "A = Q ÷ V = 2,400 ÷ 1,200 = 2 sf (for example, 24 × 12 in).", ref: "Q = A × V" });

Q({ id: "q-pdd-16", div: "pdd", obj: "pdd-1.2", lesson: "pdd-sizing", type: "calc", diff: 3, fmt: "Calculation",
  q: "A Group B floor has 120 occupants, split evenly by sex. Using 1 water closet per 25 for the first 50 and 1 per 50 for the remainder, how many water closets are required for the women's room?",
  ans: 3, tol: 0, unit: "WCs",
  explain: "60 women: first 50 ÷ 25 = 2; remaining 10 ÷ 50 = 0.2 → 1. Total 3.", ref: "2021 IBC Table 2902.1" });

Q({ id: "q-pdd-17", div: "pdd", obj: "pdd-1.3", lesson: "pdd-sizing", type: "calc", diff: 2, fmt: "Calculation",
  q: "A beam spans 24 ft with a tributary width of 10 ft and carries 80 psf total load. What is the uniform load on the beam in pounds per linear foot?",
  ans: 800, tol: 0, unit: "plf",
  explain: "w = 80 × 10 = 800 plf.", ref: "Structural load method" });

Q({ id: "q-pdd-18", div: "pdd", obj: "pdd-1.3", lesson: "pdd-sizing", type: "calc", diff: 3, fmt: "Calculation",
  q: "For that beam (w = 800 plf, L = 24 ft, simply supported), what is the maximum bending moment in foot-pounds?",
  ans: 57600, tol: 1, unit: "ft-lb",
  explain: "M = wL² ÷ 8 = 800 × 576 ÷ 8 = 57,600 ft-lb.", ref: "Simple beam formulas" });

Q({ id: "q-pdd-19", div: "pdd", obj: "pdd-1.4", lesson: "pdd-sizing", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under NFPA 13, the maximum protection area per standard spray sprinkler in a light-hazard office is:",
  opts: ["100 sf", "130 sf", "225 sf", "400 sf"],
  ans: 2,
  why: ["Too small.", "Ordinary hazard limit.", "Correct.", "Too large."],
  explain: "Light hazard allows up to 225 sf per standard head (with spacing limits).", ref: "NFPA 13" });

Q({ id: "q-pdd-20", div: "pdd", obj: "pdd-1.4", lesson: "pdd-sizing", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "Under the 2021 IBC, what minimum STC rating is required for walls separating dwelling units (laboratory-tested)?",
  opts: ["STC 35", "STC 45", "STC 50", "STC 65"],
  ans: 2,
  why: ["Too low.", "That is the field-tested value.", "Correct.", "Not required."],
  explain: "IBC §1206.2 requires STC 50 (45 if field-tested).", ref: "2021 IBC §1206.2" });

Q({ id: "q-pdd-21", div: "pdd", obj: "pdd-1.6", lesson: "pdd-sizing", type: "hot", diff: 2, fmt: "Hotspot",
  q: "This corridor section shows a 9 ft ceiling and 12 ft floor-to-floor. Click the location where systems conflict.",
  svg: `<svg viewBox="0 0 520 260" role="img" aria-label="Corridor section with beam, duct, sprinkler and lights; three marked locations">
<g class="dg-text" font-size="11">
<rect x="20" y="20" width="480" height="14" class="dg-hatch"/>
<rect x="120" y="34" width="20" height="60" class="dg-accent"/><text x="146" y="60">Beam</text>
<rect x="250" y="40" width="200" height="40" class="dg-air"/><text x="350" y="64" text-anchor="middle">Duct</text>
<rect x="100" y="70" width="190" height="34" class="dg-air"/><text x="200" y="92" text-anchor="middle">Duct</text>
<line x1="20" y1="150" x2="500" y2="150" class="dg-line"/><text x="440" y="168">Ceiling</text>
<line x1="20" y1="125" x2="500" y2="125" class="dg-line" stroke-width="3"/><text x="440" y="120">Sprinkler</text>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="Location A"><circle cx="130" cy="88" r="16" class="hs-dot"/><text x="130" y="93" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="Location B"><circle cx="350" cy="110" r="16" class="hs-dot"/><text x="350" y="115" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="Location C"><circle cx="60" cy="140" r="16" class="hs-dot"/><text x="60" y="145" text-anchor="middle">C</text></g>
</g></svg>`,
  ans: "A",
  explain: "At A the lower duct passes through the space the beam occupies. B has clear space between duct and sprinkler main; C is open plenum. Resolve A by rerouting, flattening the duct or an engineered beam opening.", ref: "Coordination practice" });

Q({ id: "q-pdd-22", div: "pdd", obj: "pdd-1.6", lesson: "pdd-sizing", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two practices best prevent MEP and structural conflicts in construction documents? Check the two that apply.",
  opts: ["Overlay structural framing plans on reflected ceiling and duct plans at milestones", "BIM clash detection followed by human review", "Letting the contractor resolve all conflicts in the field", "Leaving duct sizes to be determined", "Removing sections from the set", "Checking only the architectural drawings"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Leads to change orders.", "Prevents coordination.", "Sections reveal conflicts.", "Misses interdisciplinary conflicts."],
  explain: "Coordinate across disciplines before issue.", ref: "AIA Architect's Handbook, 15th ed., §12.3 (Checklists)" });

Q({ id: "q-pdd-23", div: "pdd", obj: "pdd-2.1", lesson: "pdd-docs", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Where should door types, sizes, fire ratings and hardware sets be documented?",
  opts: ["Elevations", "Door schedule", "Site plan", "Roof plan"],
  ans: 1,
  why: ["Elevations show appearance.", "Correct.", "Wrong sheet.", "Wrong sheet."],
  explain: "Schedules organize repetitive information.", ref: "US National CAD Standard" });

Q({ id: "q-pdd-24", div: "pdd", obj: "pdd-2.1", lesson: "pdd-docs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "The vertical relationship between a parapet, roof assembly, wall and window head is best shown in:",
  opts: ["A floor plan", "A wall section", "A door schedule", "A reflected ceiling plan"],
  ans: 1,
  why: ["Horizontal only.", "Correct.", "Tabular.", "Ceiling only."],
  explain: "Sections show vertical relationships; details enlarge connections.", ref: "Drawing conventions" });

Q({ id: "q-pdd-25", div: "pdd", obj: "pdd-2.2", lesson: "pdd-docs", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "On a grading plan, existing and proposed contours are typically shown as:",
  opts: ["Existing solid, proposed dashed", "Existing dashed, proposed solid", "Both solid", "Both dotted"],
  ans: 1,
  why: ["Reversed.", "Correct.", "Indistinguishable.", "Indistinguishable."],
  explain: "Dashed existing, solid proposed.", ref: "Civil drawing conventions" });

Q({ id: "q-pdd-26", div: "pdd", obj: "pdd-2.2", lesson: "pdd-docs", type: "calc", diff: 2, fmt: "Calculation",
  q: "Finished floor is 100.50 ft. Grade must slope away at 5% for 10 ft, starting 6 in below finished floor. What is the elevation at 10 ft from the wall?",
  ans: 99.5, tol: 0.01, unit: "ft",
  explain: "Start at 100.50 − 0.50 = 100.00. Drop 5% × 10 ft = 0.50 ft. Elevation = 99.50 ft.", ref: "2021 IBC §1804.4 (site grading)" });

Q({ id: "q-pdd-27", div: "pdd", obj: "pdd-2.4", lesson: "pdd-specs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which practice best keeps a drawing set coordinated?",
  opts: ["Repeating dimensions on several sheets", "Giving each piece of information in one place and cross-referencing it", "Omitting sheet numbers", "Using different symbols on each sheet"],
  ans: 1,
  why: ["Invites conflict.", "Correct.", "Breaks references.", "Confusing."],
  explain: "Say it once; reference it elsewhere.", ref: "US National CAD Standard" });

Q({ id: "q-pdd-28", div: "pdd", obj: "pdd-2.5", lesson: "pdd-docs", type: "mc", diff: 2, fmt: "Scenario",
  q: "After construction starts, the owner requests a new door in a corridor wall, adding cost. How is the change documented and communicated?",
  opts: ["Verbal instruction to the superintendent", "Proposal request (G709) to price it, then a change order or CCD with revised, clouded drawings", "An addendum", "Update the record drawings only"],
  ans: 1,
  why: ["Not documented.", "Correct.", "Addenda are issued before award.", "Too late and incomplete."],
  explain: "Price, authorize, revise and log.", ref: "AIA G709, G701, G714 (samples in your folder)" });

Q({ id: "q-pdd-29", div: "pdd", obj: "pdd-3.2", lesson: "pdd-specs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Where in a specification section are the products' required physical properties and performance stated?",
  opts: ["Part 1 General", "Part 2 Products", "Part 3 Execution", "Division 00"],
  ans: 1,
  why: ["Administrative.", "Correct.", "Installation.", "Procurement and contracting."],
  explain: "Products and materials go in Part 2.", ref: "CSI SectionFormat" });

Q({ id: "q-pdd-30", div: "pdd", obj: "pdd-4.2", lesson: "pdd-docs", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "Under the 2010 ADA Standards, grab bars in an accessible toilet compartment are mounted at what height?",
  opts: ["27–30 in", "33–36 in to the top of the gripping surface", "38–42 in", "Any height"],
  ans: 1,
  why: ["Too low.", "Correct. ADA 609.4.", "Too high.", "Regulated."],
  explain: "Detail-level accessibility errors are common and visible.", ref: "2010 ADA Standards §609.4" });

Q({ id: "q-pdd-31", div: "pdd", obj: "pdd-4.2", lesson: "pdd-docs", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two accessible toilet room details comply with the 2010 ADA Standards? Check the two that apply.",
  opts: ["Water closet centerline 17 in from the side wall", "Lavatory rim at 34 in above the floor", "Lavatory rim at 38 in", "Grab bar at 40 in", "Water closet centerline 22 in from the side wall", "Mirror bottom edge at 48 in above a lavatory"],
  ans: [0, 1],
  why: ["Correct (16–18 in).", "Correct (34 in max).", "Too high.", "Too high.", "Too far.", "Mirrors above lavatories must have the reflecting surface bottom at 40 in max."],
  explain: "Know the key dimensions by heart.", ref: "2010 ADA Standards §§603.3, 604.2, 606.3, 609.4" });

Q({ id: "q-pdd-32", div: "pdd", obj: "pdd-4.1", lesson: "pdd-envelope", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "A 1-hour fire barrier has a duct passing through it. What does the IBC generally require at the penetration?",
  opts: ["Nothing if the duct is metal", "A listed fire damper (or a compliant alternative) per Section 717", "Caulk only", "Removing the rating"],
  ans: 1,
  why: ["Duct penetrations need protection.", "Correct.", "Not compliant.", "Not permitted."],
  explain: "Ducts through rated assemblies need dampers unless an exception applies.", ref: "2021 IBC §717 (ducts and air transfer openings)" });

Q({ id: "q-pdd-33", div: "pdd", obj: "pdd-5.1", lesson: "pdd-docs", type: "mc", diff: 2, fmt: "Scenario",
  q: "The CD estimate jumped 12% from the DD estimate, though the design barely changed. What should the architect check first?",
  opts: ["Font sizes", "Quantities and items added or double-counted between estimates, and changes in unit prices or escalation", "The contractor's logo", "The number of sheets"],
  ans: 1,
  why: ["Irrelevant.", "Correct.", "Irrelevant.", "Irrelevant."],
  explain: "Reconcile estimates line by line to find the cause.", ref: "Cost estimating practice" });

Q({ id: "q-ppd-41", div: "ppd", obj: "ppd-4.4", lesson: "ppd-siting", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "In a cold, windy climate, where should the main entrance of a building be placed relative to the prevailing winter wind?",
  opts: ["Facing directly into it", "On the leeward (sheltered) side, or protected by a vestibule and windbreak", "On the roof", "It does not matter"],
  ans: 1,
  why: ["Drives cold air in and makes doors hard to open.", "Correct.", "Impractical.", "Wind exposure affects comfort and energy."],
  explain: "Integrate climate into the design: shelter entries and outdoor spaces from winter winds.", ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-ppd-42", div: "ppd", obj: "ppd-5.1", lesson: "ppd-integration", type: "mc", diff: 2, fmt: "Scenario",
  q: "Two schematic options meet the budget. Option A gives every exam room daylight but adds 8% corridor area; option B is more compact with interior exam rooms. The program ranks patient experience as the top priority. Which recommendation is best supported?",
  opts: ["Option B, because it is smaller", "Option A, because it better serves the top-ranked program criterion within budget", "Neither; restart design", "Let the contractor choose"],
  ans: 1,
  why: ["Size alone is not the program's priority.", "Correct.", "Both meet the budget.", "Design decisions belong to the owner and architect."],
  explain: "Evaluate alternatives against the program's weighted criteria.", ref: "Decision analysis method" });
