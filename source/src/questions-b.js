/* QUESTION BANK — PPD, PDD, CE */

/* ---------------- PPD ---------------- */
Q({ id: "q-ppd-01", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "calc", diff: 1, fmt: "Code calculation",
  q: "Using a load factor of 150 sf gross per occupant for business areas (2021 IBC Table 1004.5), what is the occupant load of a 30,000 sf gross office floor?",
  ans: 200, tol: 0, unit: "occupants",
  explain: "30,000 ÷ 150 = 200 occupants.",
  ref: "2021 IBC Table 1004.5" });

Q({ id: "q-ppd-02", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "calc", diff: 2, fmt: "Code calculation",
  q: "A community hall has a 2,400 sf net dining area with tables and chairs (15 sf net per occupant) and an 800 sf commercial kitchen (200 sf gross per occupant). What is the total occupant load?",
  ans: 164, tol: 0, unit: "occupants",
  explain: "Dining: 2,400 ÷ 15 = 160. Kitchen: 800 ÷ 200 = 4. Total = 164. Calculate each function separately, then add.",
  ref: "2021 IBC §1004.5 and Table 1004.5" });

Q({ id: "q-ppd-03", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "calc", diff: 2, fmt: "Code calculation",
  q: "A stair serves 240 occupants in a sprinklered building that has no emergency voice/alarm communication system. Using 0.3 in per occupant, what egress capacity (in inches) must the stair provide before checking code minimum widths?",
  ans: 72, tol: 0, unit: "in",
  explain: "240 × 0.3 = 72 in. The reduced 0.2 in factor requires both sprinklers and an emergency voice/alarm system, so it does not apply here.",
  ref: "2021 IBC §1005.3.1" });

Q({ id: "q-ppd-04", div: "ppd", obj: "ppd-3.4", lesson: "ppd-envelope", type: "calc", diff: 2, fmt: "Calculation",
  q: "A wall consists of: inside air film R-0.68, gypsum board R-0.45, cavity insulation R-13, sheathing R-0.62, continuous insulation R-5.0, outside air film R-0.17. Ignoring framing, what is the U-factor? (Three decimals.)",
  ans: 0.050, tol: 0.0015, unit: "Btu/h·ft²·°F",
  explain: "R_T = 0.68 + 0.45 + 13 + 0.62 + 5.0 + 0.17 = 19.92. U = 1 ÷ 19.92 ≈ 0.050.",
  ref: "ASHRAE Handbook—Fundamentals, Ch. 25–27" });

Q({ id: "q-ppd-05", div: "ppd", obj: "ppd-3.4", lesson: "ppd-envelope", type: "calc", diff: 2, fmt: "Calculation",
  q: "A 1,500 sf wall with a U-factor of 0.05 separates a 70°F interior from 10°F outdoor air. What is the conductive heat loss through the wall?",
  ans: 4500, tol: 1, unit: "Btu/h",
  explain: "Q = U × A × ΔT = 0.05 × 1,500 × (70 − 10) = 4,500 Btu/h.",
  ref: "ASHRAE Handbook—Fundamentals" });

Q({ id: "q-ppd-06", div: "ppd", obj: "ppd-3.4", lesson: "ppd-envelope", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "For large west-facing windows on an office in a cooling-dominated climate, which glazing properties are most appropriate?",
  opts: ["High SHGC, high VT", "Low SHGC, high VT", "High SHGC, low VT", "Low U-factor only; SHGC does not matter"],
  ans: 1,
  why: ["High SHGC admits afternoon solar heat.", "Correct. Low SHGC limits heat gain; high VT keeps daylight.", "This admits heat while blocking light, the worst combination.", "In cooling climates solar gain usually matters more than conduction."],
  explain: "Look for a high light-to-solar-gain ratio (VT ÷ SHGC).",
  ref: "2021 IECC Table C402.4 (fenestration)" });

Q({ id: "q-ppd-07", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "hot", diff: 2, fmt: "Hotspot",
  q: "The plan shows a 120 ft × 90 ft open floor in a building <b>without</b> sprinklers. Exit 1 is at the lower-left corner. Two exits are required. Click the only candidate location (A, B or C) that satisfies the remoteness requirement for the second exit.",
  svg: `<svg viewBox="0 0 520 380" role="img" aria-label="Floor plan 120 by 90 feet with exit 1 and three candidate exit locations">
<g class="dg-text" font-size="12">
<rect x="40" y="30" width="440" height="330" class="dg-soft"/>
<line x1="40" y1="360" x2="480" y2="30" class="dg-line" stroke-dasharray="6 4"/>
<rect x="40" y="346" width="26" height="14" class="dg-accent"/><text x="46" y="376">Exit 1</text>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="Location A"><circle cx="187" cy="360" r="16" class="hs-dot"/><text x="187" y="365" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="Location B"><circle cx="40" cy="140" r="16" class="hs-dot"/><text x="40" y="145" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="Location C"><circle cx="333" cy="30" r="16" class="hs-dot"/><text x="333" y="35" text-anchor="middle">C</text></g>
<text x="260" y="22" text-anchor="middle" font-size="11">120 ft</text><text x="490" y="200" font-size="11">90 ft</text>
<text x="200" y="120" font-size="11">A: 40 ft from Exit 1 · B: 60 ft · C: about 120 ft</text>
</g></svg>`,
  ans: "C",
  explain: "Diagonal = √(120² + 90²) = 150 ft. Without sprinklers, exits must be at least ½ × 150 = 75 ft apart. A (40 ft) and B (60 ft) fail; C (about 120 ft) complies. With sprinklers the requirement would drop to 50 ft and B would also comply.",
  ref: "2021 IBC §1007.1.1" });

Q({ id: "q-ppd-08", div: "ppd", obj: "ppd-2.3", lesson: "ppd-egress", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "What is the maximum running slope of a ramp on an accessible route under the 2010 ADA Standards?",
  opts: ["1:8", "1:10", "1:12", "1:20"],
  ans: 2,
  why: ["Too steep for new construction (limited allowances exist for some existing conditions).", "Too steep.", "Correct. 1:12 (8.33%).", "1:20 is the limit for a walk before it becomes a ramp."],
  explain: "Ramps also limit rise to 30 in per run and need 60 in landings.",
  ref: "2010 ADA Standards §405.2" });

Q({ id: "q-ppd-09", div: "ppd", obj: "ppd-3.2", lesson: "ppd-envelope", type: "mc", diff: 3, fmt: "Scenario",
  q: "A three-story steel-framed retail building needs a fully glazed, open ground-floor storefront on all street faces. Which lateral force-resisting system best preserves the open facade?",
  opts: ["Concrete shear walls at the perimeter", "Concentrically braced frames at the storefront", "Moment-resisting frames", "Load-bearing masonry walls"],
  ans: 2,
  why: ["Perimeter shear walls block the storefront.", "Diagonal bracing obstructs the glazing.", "Correct. Rigid beam-to-column connections resist lateral loads without walls or braces, keeping bays open.", "Bearing walls close the facade."],
  explain: "Moment frames cost more and drift more than braced frames or shear walls, but they leave openings clear.",
  ref: "Ching, Building Structures Illustrated; AISC 341 (concepts)" });

Q({ id: "q-ppd-10", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "In a Group B office building equipped throughout with an automatic sprinkler system, what is the maximum length of a dead-end corridor under the 2021 IBC?",
  opts: ["20 ft", "35 ft", "50 ft", "75 ft"],
  ans: 2,
  why: ["20 ft is the general limit.", "Not a value used for this rule.", "Correct. The 50 ft allowance applies to Group B (and several other groups) in sprinklered buildings.", "Not a value used for this rule."],
  explain: "Dead ends trap occupants who choose the wrong direction; sprinklers justify a longer allowance.",
  ref: "2021 IBC §1020.5 (dead ends)" });

Q({ id: "q-ppd-11", div: "ppd", obj: "ppd-5.3", lesson: "ppd-envelope", type: "calc", diff: 3, fmt: "Calculation",
  q: "Mechanical option A costs $100,000 installed and $12,000/yr to operate. Option B costs $130,000 and $8,000/yr. Ignoring the time value of money, what is the simple payback period of option B relative to option A?",
  ans: 7.5, tol: 0.05, unit: "years",
  explain: "Extra first cost = 30,000. Annual savings = 4,000. Payback = 30,000 ÷ 4,000 = 7.5 years. A full life-cycle cost analysis would discount future savings to present value.",
  ref: "ASTM E917 (life-cycle cost concepts)" });

Q({ id: "q-ppd-12", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "A story has an occupant load of 620. What is the minimum number of exits from the story under the 2021 IBC?",
  opts: ["2", "3", "4", "5"],
  ans: 1,
  why: ["Two exits serve 1–500 occupants.", "Correct. 501–1,000 occupants require at least three exits.", "Four are required above 1,000.", "No such threshold."],
  explain: "2021 IBC Table 1006.3.3 sets 2/3/4 exits at 1–500/501–1,000/over 1,000 occupants per story.",
  ref: "2021 IBC §1006.3.3 (Table 1006.3.3)" });

Q({ id: "q-ppd-13", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two conditions can increase a building's allowable area beyond the tabular value in the 2021 IBC? Select two.",
  opts: ["Open frontage along a public way or open space", "A higher occupant load", "An automatic sprinkler system throughout (where not already required for the tabular value)", "A fire alarm system", "Use of Type V-B construction", "Providing more exits than the minimum required"],
  ans: [0, 2],
  why: ["Correct. Frontage increase under §506.3.", "Occupant load does not increase area.", "Correct. Sprinkler increases are built into Table 506.2 values (S1, SM).", "Fire alarms do not increase area.", "Type V-B has the lowest allowable areas.", "Extra exits improve egress but do not change allowable area."],
  explain: "Allowable area depends on occupancy, construction type, sprinklers and frontage.",
  ref: "2021 IBC §506" });

/* ---------------- PDD ---------------- */
Q({ id: "q-pdd-01", div: "pdd", obj: "pdd-2.3", lesson: "pdd-envelope", type: "hot", diff: 2, fmt: "Hotspot",
  q: "Click the layer in this wall section that acts as the continuous air and water-resistive barrier.",
  svg: `<svg viewBox="0 0 420 260" role="img" aria-label="Wall section with seven selectable layers">
<g class="dg-text" font-size="11">
<g class="hs" data-hs="gyp" tabindex="0" role="button" aria-label="Layer 1"><rect x="40" y="20" width="22" height="200" class="dg-soft hs-r"/></g>
<g class="hs" data-hs="ins" tabindex="0" role="button" aria-label="Layer 2"><rect x="62" y="20" width="80" height="200" class="dg-hatch hs-r"/></g>
<g class="hs" data-hs="sh" tabindex="0" role="button" aria-label="Layer 3"><rect x="142" y="20" width="16" height="200" class="dg-soft hs-r"/></g>
<g class="hs" data-hs="awb" tabindex="0" role="button" aria-label="Layer 4"><rect x="158" y="20" width="14" height="200" class="dg-accent2 hs-r"/></g>
<g class="hs" data-hs="ci" tabindex="0" role="button" aria-label="Layer 5"><rect x="172" y="20" width="50" height="200" class="dg-soft hs-r"/></g>
<g class="hs" data-hs="cav" tabindex="0" role="button" aria-label="Layer 6"><rect x="222" y="20" width="24" height="200" class="dg-air hs-r"/></g>
<g class="hs" data-hs="clad" tabindex="0" role="button" aria-label="Layer 7"><rect x="246" y="20" width="22" height="200" class="dg-soft hs-r"/></g>
<text x="51" y="240" text-anchor="middle">1</text><text x="102" y="240" text-anchor="middle">2</text><text x="150" y="240" text-anchor="middle">3</text>
<text x="165" y="240" text-anchor="middle">4</text><text x="197" y="240" text-anchor="middle">5</text><text x="234" y="240" text-anchor="middle">6</text><text x="257" y="240" text-anchor="middle">7</text>
<text x="290" y="60">Interior ←</text><text x="290" y="80">→ Exterior</text>
<text x="290" y="120" font-size="11">Layers are unlabeled;</text><text x="290" y="134" font-size="11">identify by position.</text>
</g></svg>`,
  ans: "awb",
  explain: "Layer 4, applied to the face of the sheathing (3) and behind the exterior insulation (5), is the air and water-resistive barrier. Placing it inboard of the continuous insulation keeps it warm and protected; the drained cavity (6) behind the cladding (7) lets water escape.",
  ref: "BSC Building Science Digest on control layers; 2021 IBC §1403.2" });

Q({ id: "q-pdd-02", div: "pdd", obj: "pdd-2.3", lesson: "pdd-envelope", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "In a cold, heating-dominated climate with no exterior continuous insulation, where should a Class I or II vapor retarder be placed in a framed wall?",
  opts: ["On the exterior face of the sheathing", "On the interior (warm) side of the insulation", "In the middle of the insulation", "A vapor retarder should not be used in cold climates"],
  ans: 1,
  why: ["An exterior low-perm layer traps interior moisture in the cold sheathing.", "Correct. Winter vapor drive is from the warm, humid interior outward.", "Mid-cavity placement leaves cold surfaces exposed to interior vapor.", "Codes require vapor retarders in cold climate zones for framed walls (with exceptions)."],
  explain: "Place vapor control where it keeps moist air from reaching surfaces colder than its dew point.",
  ref: "2021 IBC §1404.3 (vapor retarders by climate zone)" });

Q({ id: "q-pdd-03", div: "pdd", obj: "pdd-2.3", lesson: "pdd-envelope", type: "match", diff: 1, fmt: "Matching",
  q: "Match each vapor retarder class to its permeance range.",
  pairs: [["Class I", "0.1 perm or less"], ["Class II", "Greater than 0.1 and up to 1.0 perm"], ["Class III", "Greater than 1.0 and up to 10 perm"]],
  explain: "Lower permeance means less vapor passes through. Polyethylene is Class I; kraft facing is Class II; latex paint is Class III.",
  ref: "2021 IBC §202 definitions; §1404.3" });

Q({ id: "q-pdd-04", div: "pdd", obj: "pdd-3.1", lesson: "pdd-specs", type: "match", diff: 2, fmt: "Drag and place",
  q: "Place each article in the correct part of a three-part specification section.",
  pairs: [["Submittals", "Part 1 — General"], ["Warranty", "Part 1 — General"], ["Manufacturers", "Part 2 — Products"], ["Installation", "Part 3 — Execution"], ["Field quality control", "Part 3 — Execution"]],
  explain: "Part 1 covers administrative requirements; Part 2 products and materials; Part 3 work at the site.",
  ref: "CSI SectionFormat" });

Q({ id: "q-pdd-05", div: "pdd", obj: "pdd-3.1", lesson: "pdd-specs", type: "match", diff: 2, fmt: "Drag and place",
  q: "Place each item in its MasterFormat division.",
  pairs: [["Gypsum board", "09 Finishes"], ["Hollow metal doors and frames", "08 Openings"], ["Modified bituminous roofing", "07 Thermal & Moisture Protection"], ["Toilet compartments", "10 Specialties"], ["Cast-in-place concrete", "03 Concrete"]],
  explain: "Curtain walls and storefronts also fall in Division 08; sealants and firestopping in Division 07.",
  ref: "CSI MasterFormat" });

Q({ id: "q-pdd-06", div: "pdd", obj: "pdd-3.2", lesson: "pdd-specs", type: "mc", diff: 2, fmt: "Scenario",
  q: "A public owner requires open competition. The design calls for a curtain wall to be engineered by the manufacturer to meet stated wind load, water penetration and thermal criteria. Which specifying method fits best?",
  opts: ["Closed proprietary", "Descriptive", "Performance", "Base bid with a single named product"],
  ans: 2,
  why: ["Closed specs defeat competition.", "Describing every component removes the manufacturer's engineering role.", "Correct. Performance criteria let qualified manufacturers compete and engineer the system (delegated design).", "A single named product limits competition."],
  explain: "Performance specs state required results and how they will be verified.",
  ref: "CSI Project Delivery Practice Guide" });

Q({ id: "q-pdd-07", div: "pdd", obj: "pdd-2.4", lesson: "pdd-specs", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Under the US National CAD Standard sheet numbering, what does sheet A-501 most likely contain?",
  opts: ["Architectural floor plans", "Architectural elevations", "Architectural details", "Architectural schedules"],
  ans: 2,
  why: ["Plans are sheet type 1 (A-101).", "Elevations are type 2.", "Correct. Type 5 is details.", "Schedules and diagrams are type 6."],
  explain: "Sheet types: 0 general, 1 plans, 2 elevations, 3 sections, 4 large-scale views, 5 details, 6 schedules and diagrams.",
  ref: "US National CAD Standard — Uniform Drawing System" });

Q({ id: "q-pdd-08", div: "pdd", obj: "pdd-3.3", lesson: "pdd-specs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which information belongs in the specifications rather than on the drawings?",
  opts: ["The location of control joints in a slab", "The required ASTM standard and movement class for exterior sealant", "The dimension from grid line to a wall face", "The number of windows on the east elevation"],
  ans: 1,
  why: ["Location belongs on drawings.", "Correct. Quality and standards belong in specifications.", "Dimensions belong on drawings.", "Quantity and arrangement belong on drawings."],
  explain: "Drawings: quantity, location, size, relationships. Specs: quality, materials, workmanship.",
  ref: "CSI Project Delivery Practice Guide" });

Q({ id: "q-pdd-09", div: "pdd", obj: "pdd-1.5", lesson: "pdd-envelope", type: "mc", diff: 3, fmt: "Detail diagnosis",
  q: "Sealant in a precast panel joint has torn along its centre a year after installation. The sealant was installed directly against the back of the joint with no backer. What most likely caused the failure?",
  opts: ["Excess sealant depth only", "Three-sided adhesion prevented the sealant from stretching", "Ultraviolet exposure", "Use of a backer rod"],
  ans: 1,
  why: ["Depth matters, but the key error is bonding to the back of the joint.", "Correct. Bonding to three surfaces restrains the bead; it tears when the joint opens.", "UV degrades sealants over longer periods and affects the surface first.", "A backer rod (or bond breaker tape) is the fix, not the cause."],
  explain: "Sealant should bond to the two joint faces only, with a backer rod or bond breaker controlling depth and shape.",
  ref: "ASTM C1193 (guide for use of joint sealants)" });

Q({ id: "q-pdd-10", div: "pdd", obj: "pdd-4.1", lesson: "pdd-envelope", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "A plumbing pipe passes through a 1-hour fire-resistance-rated wall. How must the penetration be protected under the IBC?",
  opts: ["With any acoustical sealant", "With a tested through-penetration firestop system (e.g., ASTM E814 or UL 1479) or as the code otherwise allows", "By wrapping the pipe in fiberglass insulation", "No protection is needed for walls rated less than 2 hours"],
  ans: 1,
  why: ["Acoustical sealant is not a tested firestop.", "Correct. Penetrations must maintain the rating, generally through a listed system tested to ASTM E814 / UL 1479.", "Insulation alone is not a firestop.", "Rated walls of any rating require penetration protection."],
  explain: "Detail firestop systems by listing number on the drawings and coordinate them with the specification.",
  ref: "2021 IBC §714" });

Q({ id: "q-pdd-11", div: "pdd", obj: "pdd-5.1", lesson: "pdd-specs", type: "calc", diff: 2, fmt: "Calculation",
  q: "A quantity takeoff shows 2,400 sf of partition at a unit cost of $14.00/sf. Adding an 8% design contingency, what is the estimated cost?",
  ans: 36288, tol: 1, unit: "$",
  explain: "2,400 × 14 = 33,600. 33,600 × 1.08 = $36,288.",
  ref: "RSMeans (unit cost estimating concepts)" });

Q({ id: "q-pdd-12", div: "pdd", obj: "pdd-2.5", lesson: "pdd-specs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "After the drawings are issued for construction, a sheet is revised. How should the change be identified on the reissued sheet?",
  opts: ["Redraw the sheet with no markings so it is clean", "Enclose the change in a revision cloud with a revision symbol and record it in the sheet's revision block", "Note the change only in a separate memo", "Change the sheet number"],
  ans: 1,
  why: ["Unmarked changes are easily missed and cause disputes.", "Correct. Clouds, delta symbols and the revision block create a clear record.", "A memo alone leaves the sheet ambiguous.", "Sheet numbers stay constant so cross-references remain valid."],
  explain: "Changes after bidding are issued through an ASI, bulletin or change order, with the revised sheets attached.",
  ref: "US National CAD Standard — drafting conventions" });

/* ---------------- CE ---------------- */
Q({ id: "q-ce-01", div: "ce", obj: "ce-2.1", lesson: "ce-admin", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Under A201–2017, what is the purpose of the architect's site visits during construction?",
  opts: ["To supervise the contractor's work continuously", "To become generally familiar with progress and quality and determine, in general, whether the work observed conforms to the contract documents", "To direct construction means and methods", "To enforce jobsite safety"],
  ans: 1,
  why: ["Not required to make exhaustive or continuous inspections.", "Correct.", "Means and methods are the contractor's responsibility.", "Safety is the contractor's responsibility."],
  explain: "Staying within this defined role limits the architect's liability.",
  ref: "AIA A201–2017, §4.2.2" });

Q({ id: "q-ce-02", div: "ce", obj: "ce-3.1", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Who must sign a Construction Change Directive (G714) for it to be effective under A201–2017?",
  opts: ["Owner, contractor and architect", "Owner and architect", "Architect only", "Contractor and architect"],
  ans: 1,
  why: ["Three signatures make it a change order.", "Correct. The contractor's signature is not required; signing indicates agreement with the adjustment.", "An architect alone can issue only minor changes (ASI).", "The owner must authorize changes affecting the contract."],
  explain: "A CCD lets work proceed before the price is agreed.",
  ref: "AIA A201–2017, §7.3" });

Q({ id: "q-ce-03", div: "ce", obj: "ce-3.2", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Scenario",
  q: "A shop drawing showed a smaller anchor than specified. The contractor did not identify the deviation, and the architect stamped the submittal 'reviewed, no exceptions.' Who is responsible for the deviation?",
  opts: ["The architect, because the drawing was approved", "The contractor, because deviations must be specifically identified in writing and specifically approved", "The owner", "The anchor manufacturer"],
  ans: 1,
  why: ["Approval does not relieve the contractor of deviations not identified.", "Correct.", "The owner did not create or approve the deviation.", "The manufacturer may have contract obligations to the contractor, but under A201 the contractor remains responsible."],
  explain: "Submittal review is limited; contractors must call out deviations in writing.",
  ref: "AIA A201–2017, §3.12.8" });

Q({ id: "q-ce-04", div: "ce", obj: "ce-3.3", lesson: "ce-payment", type: "calc", diff: 2, fmt: "Calculation",
  q: "Application for payment: work completed to date $820,000; materials suitably stored $30,000; retainage 5%; previous certificates for payment $640,000. What is the current payment due?",
  ans: 167500, tol: 1, unit: "$",
  explain: "Total completed and stored = 850,000. Retainage = 42,500. Earned less retainage = 807,500. Current payment = 807,500 − 640,000 = $167,500.",
  ref: "AIA G702" });

Q({ id: "q-ce-05", div: "ce", obj: "ce-4.1", lesson: "ce-payment", type: "order", diff: 2, fmt: "Drag to sequence",
  q: "Put these closeout steps in order under A201–2017.",
  items: ["Contractor notifies that the work is substantially complete and submits its list of items to be completed or corrected",
    "Architect inspects to determine whether the work is substantially complete",
    "Architect issues the Certificate of Substantial Completion",
    "Contractor completes the list items and gives notice that the work is ready for final inspection",
    "Contractor submits closeout documents (payment affidavit, lien releases, consent of surety)",
    "Architect issues the final Certificate for Payment"],
  explain: "Substantial completion comes first and starts warranties; final payment requires the closeout documents.",
  ref: "AIA A201–2017, §9.8 and §9.10" });

Q({ id: "q-ce-06", div: "ce", obj: "ce-3.3", lesson: "ce-payment", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "Which three are grounds for the architect to withhold certification of payment under A201–2017? Select three.",
  opts: ["Defective work not remedied", "The contractor uses a construction sequence the architect would not have chosen", "Failure of the contractor to make payments to subcontractors", "Third-party claims filed or reasonable evidence they will be filed", "The owner's lender is late releasing funds", "An RFI from the contractor is still awaiting the architect's answer"],
  ans: [0, 2, 3],
  why: ["Correct.", "Sequence is the contractor's choice.", "Correct.", "Correct.", "Owner financing is not a ground under §9.5.1.", "An open RFI is not a ground; the architect must still respond with reasonable promptness."],
  explain: "Withholding protects the owner from loss tied to the contractor's performance.",
  ref: "AIA A201–2017, §9.5.1" });

Q({ id: "q-ce-07", div: "ce", obj: "ce-1.2", lesson: "ce-payment", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "What does a bid bond guarantee?",
  opts: ["That the contractor will complete the work as specified", "That subcontractors and suppliers will be paid", "That the bidder, if awarded, will enter into the contract and furnish the required performance and payment bonds", "That the work will be free of defects for one year"],
  ans: 2,
  why: ["That is a performance bond.", "That is a payment bond.", "Correct.", "That is the correction period, not a bond."],
  explain: "If the low bidder refuses to sign, the bid bond compensates the owner, typically up to the difference to the next bid within the bond amount.",
  ref: "AIA A310 (Bid Bond); A701" });

Q({ id: "q-ce-08", div: "ce", obj: "ce-1.1", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "The architect must correct a door hardware set in the documents while the project is out to bid. How is this issued?",
  opts: ["Change order", "Addendum", "Architect's supplemental instruction", "Construction change directive"],
  ans: 1,
  why: ["Change orders modify an executed contract.", "Correct. Addenda modify the bidding documents before bids are received.", "ASIs are issued during construction.", "CCDs are issued during construction."],
  explain: "Issue addenda early enough for bidders to price them, and require bidders to acknowledge each addendum on the bid form.",
  ref: "AIA A701–2018 (Instructions to Bidders)" });

Q({ id: "q-ce-09", div: "ce", obj: "ce-1.3", lesson: "ce-payment", type: "mc", diff: 3, fmt: "Bid analysis",
  q: "Bids: Contractor A base $1,000,000, Alternate 1 add $40,000. Contractor B base $980,000, Alt 1 add $70,000. Contractor C base $1,010,000, Alt 1 add $20,000. The owner accepts Alternate 1. Who is the low bidder?",
  opts: ["Contractor A ($1,040,000)", "Contractor B ($1,050,000)", "Contractor C ($1,030,000)", "Contractor B, because its base bid is lowest"],
  ans: 2,
  why: ["A totals $1,040,000.", "B totals $1,050,000.", "Correct. C totals $1,030,000, the lowest with the accepted alternate.", "Award is based on base bid plus accepted alternates."],
  explain: "Owners should decide which alternates to accept in the order listed or by a stated rule, to prevent manipulation of the low bidder.",
  ref: "AIA A701–2018" });

Q({ id: "q-ce-10", div: "ce", obj: "ce-3.1", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under A201–2017, within what period must a claim be initiated after the event giving rise to it (or after the claimant first recognizes the condition)?",
  opts: ["7 days", "14 days", "21 days", "30 days"],
  ans: 2,
  why: ["Too short.", "Too short.", "Correct.", "Not the A201–2017 period."],
  explain: "Missing the notice period can waive a claim. CCDC 2 and other contracts use different periods.",
  ref: "AIA A201–2017, Article 15" });

Q({ id: "q-ce-11", div: "ce", obj: "ce-4.1", lesson: "ce-payment", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Under A201–2017, the contractor's one-year obligation to correct work begins on what date?",
  opts: ["Contract signing", "Date of substantial completion", "Date of final payment", "Date of first occupancy permit application"],
  ans: 1,
  why: ["Too early.", "Correct.", "Final payment does not start the correction period.", "Not the trigger."],
  explain: "The one-year correction period is separate from, and does not limit, other warranties or the owner's legal rights.",
  ref: "AIA A201–2017, §12.2.2" });

Q({ id: "q-ce-12", div: "ce", obj: "ce-3.4", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Scenario",
  q: "Cylinder test results show concrete in a footing below the specified 28-day strength. What should the architect do?",
  opts: ["Order the contractor to stop all work", "Reject the work, notify the owner and contractor, and require additional testing or engineering evaluation", "Accept the work because footings are concealed", "Direct the contractor's crew to remove the footing"],
  ans: 1,
  why: ["Under A201 §2.4 the right to stop the work belongs to the owner.", "Correct. The architect may reject nonconforming work and require testing; the structural engineer evaluates whether cores or remediation are needed.", "Acceptance of defective work needs the owner's decision and normally a price adjustment.", "Directing the crew is means and methods."],
  explain: "Reject, report, and let the engineer determine the remedy.",
  ref: "AIA A201–2017, §4.2.6, §2.4 and §13.4" });

Q({ id: "q-ce-13", div: "ce", obj: "ce-1.3", lesson: "ce-payment", type: "mc", diff: 2, fmt: "Calculation",
  q: "The contract includes a $20,000 allowance for light fixtures. The fixtures the owner selects cost $26,000 delivered to the site. What happens?",
  opts: ["The contractor absorbs the $6,000", "The contract sum is increased by $6,000 by change order", "The architect pays the difference", "The allowance is cancelled and the item rebid"],
  ans: 1,
  why: ["Allowances adjust to actual cost.", "Correct. A201 adjusts the contract sum by change order for the difference between actual cost and the allowance.", "The architect has no payment obligation.", "No rebid is needed."],
  explain: "Under A201, allowances cover the cost of materials delivered (less discounts); installation, overhead and profit are included in the contract sum, not the allowance.",
  ref: "AIA A201–2017, §3.8" });
