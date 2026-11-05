/* ---------- Deeper lesson content: Project Development & Documentation (v19) ----------
   Code references are to the 2021 IBC/IECC unless stated; check the adopted edition. */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["pdd-envelope"] = {
  sections: [
    ],
  tips: [
    "The priority order of control layers is water, then air, then vapor, then heat.",
    "Two Class I layers on either side of a cavity is a classic moisture trap on the exam.",
    "Air barriers stop air leakage; they may or may not also be vapor retarders."
  ]
};

ARE.DEEP["pdd-specs"] = {
  sections: [
    ],
  tips: [
    "Submittal requirements are Part 1; manufacturers and materials are Part 2; installation and field testing are Part 3.",
    "Division 00 (procurement and contracting) holds bid forms and conditions; Division 01 holds general requirements for all trades.",
    "Delegated design is specified by performance and requires a sealed submittal from the contractor's engineer."
  ]
};
ARE.DEEP_TERMS.push(
  ["Descriptive specification", "Specifications", "States the required materials, properties and workmanship without naming manufacturers.", "pdd-specs"],
  ["Reference standard specification", "Specifications", "Requires compliance with a published standard such as an ASTM specification.", "pdd-specs"],
  ["Proprietary specification", "Specifications", "Names specific products; closed allows no substitutes, open allows approved equals.", "pdd-specs"],
  ["UniFormat", "Specifications", "Classification by building element (substructure, shell, interiors, services), used for early estimates.", "pdd-specs"]
);

ARE.DEEP["pdd-sizing"] = {
  sections: [
    { h: "Worked beam check", html: `
<p>A simply supported steel beam spans 24 ft and carries floor joists over a tributary width of 10 ft. Dead load 60 psf, live load 50 psf.</p>
<table class="tbl"><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Uniform load w</td><td>(60 + 50) psf × 10 ft</td><td>1,100 lb/ft</td></tr>
<tr><td>Maximum moment</td><td>wL²/8 = 1,100 × 24² ÷ 8</td><td>79,200 ft-lb</td></tr>
<tr><td>Maximum shear</td><td>wL/2 = 1,100 × 24 ÷ 2</td><td>13,200 lb</td></tr>
<tr><td>Live-load deflection limit (IBC Table 1604.3)</td><td>L/360 = 288 in ÷ 360</td><td>0.8 in</td></tr>
</tbody></table>
<p>Moment grows with the square of the span and deflection with the fourth power (Δ = 5wL⁴/384EI), so long spans are often governed by stiffness rather than strength.</p>` },
    ],
  tips: [
    "Tributary area = the floor area a member supports, half way to the next member on each side.",
    "Deflection limits (L/360, L/240) protect finishes and comfort; strength checks protect safety.",
    "Clash detection finds conflicts, but someone still has to decide how to resolve each one."
  ]
};
ARE.DEEP_TERMS.push(
  ["Bending moment", "Structures", "The internal rotational effect of loads on a member; wL²/8 at midspan for a uniformly loaded simple span.", "pdd-sizing"],
  ["Deflection limit", "Structures", "Maximum allowed sag of a member, such as span/360 for floor live load.", "pdd-sizing"]
);

ARE.DEEP["pdd-docs"] = {
  sections: [
    { h: "How a drawing set is organized (US National CAD Standard)", html: `
<p>Sheets are grouped by discipline designator in a standard order: G (general), C (civil), L (landscape), S (structural), A (architectural), I (interiors), Q (equipment), F (fire protection), P (plumbing), M (mechanical), E (electrical), T (telecommunications). A sheet number such as <b>A-201</b> means architectural, sheet type 2 (elevations), sheet 01.</p>
<table class="tbl"><thead><tr><th>Sheet type digit</th><th>Contents</th></tr></thead><tbody>
<tr><td>0</td><td>General: symbols, legend, notes</td></tr>
<tr><td>1</td><td>Plans</td></tr>
<tr><td>2</td><td>Elevations</td></tr>
<tr><td>3</td><td>Sections</td></tr>
<tr><td>4</td><td>Large-scale views (enlarged plans, sections)</td></tr>
<tr><td>5</td><td>Details</td></tr>
<tr><td>6</td><td>Schedules and diagrams</td></tr>
</tbody></table>` },
    { h: "Revisions and record documents", html: `
<ul>
<li>Changes after issue are clouded, tagged with a revision delta, and logged in the title block with date and description.</li>
<li>During bidding, changes go out as numbered addenda; during construction, as ASIs, proposal requests, change orders or CCDs with revised sheets.</li>
<li><b>As-builts</b> are the contractor's marked-up record of what was actually built. <b>Record drawings</b> are documents the architect prepares from that information, if the agreement includes it.</li>
</ul>` }
  ],
  tips: [
    "Plans show location and quantity; schedules show repetitive data (doors, finishes, equipment).",
    "A sheet index on the cover sheet lists every sheet; reissued sheets keep their numbers with a new revision.",
    "Site plans locate the building and improvements by dimensions or coordinates from property lines or benchmarks."
  ]
};
ARE.DEEP_TERMS.push(
  ["As-built drawings", "Documentation", "The contractor's marked-up set showing how the work was actually built.", "pdd-docs"],
  ["Record drawings", "Documentation", "Drawings prepared from the contractor's as-built information to record the completed project.", "pdd-docs"],
  ["Revision cloud", "Documentation", "A scalloped outline marking a change on a reissued drawing, tagged with a revision number.", "pdd-docs"]
);

ARE.DEEP["pdd-firerated"] = {
  sections: [
    { h: "Rated walls compared", html: `
<table class="tbl"><thead><tr><th>Assembly</th><th>Purpose</th><th>Typical ratings</th><th>Continuity</th></tr></thead><tbody>
<tr><td>Fire wall (§706)</td><td>Creates separate buildings</td><td>2–4 h</td><td>Foundation to or through the roof; structurally stable if either side collapses</td></tr>
<tr><td>Fire barrier (§707)</td><td>Shafts, exit enclosures, occupancy and area separations</td><td>1–3 h</td><td>Floor to the floor or roof deck above</td></tr>
<tr><td>Fire partition (§708)</td><td>Corridors, dwelling and sleeping unit separations</td><td>½–1 h</td><td>Floor to deck, or to a rated ceiling in some cases</td></tr>
<tr><td>Smoke barrier (§709)</td><td>Smoke compartments (health care)</td><td>1 h</td><td>Outside wall to outside wall, floor to deck</td></tr>
<tr><td>Smoke partition (§710)</td><td>Limit smoke movement</td><td>Not rated</td><td>Floor to ceiling or deck</td></tr>
</tbody></table>` },
    ],
  tips: [
    "The opening rating is usually less than the wall rating; check Table 716.1(2) rather than assuming they match.",
    "Membrane penetrations (outlets, recessed boxes) have their own limits on size and separation.",
    "A rated assembly is only as good as its listing; substitutions need an equivalent tested design."
  ]
};
ARE.DEEP_TERMS.push(
  ["Fire barrier", "Codes", "A rated wall continuous from floor to deck, used for shafts, exits and occupancy separations (IBC §707).", "pdd-firerated"],
  ["Fire partition", "Codes", "A wall of ½ to 1 hour used for corridors and unit separations (IBC §708).", "pdd-firerated"],
  ["F rating", "Codes", "Time a firestop system prevents flame passage through a penetration.", "pdd-firerated"],
  ["T rating", "Codes", "Time a firestop system limits temperature rise on the unexposed side.", "pdd-firerated"],
  ["Opening protective", "Codes", "A rated door, window or damper that protects an opening in a rated assembly.", "pdd-firerated"]
);

ARE.DEEP["pdd-roofing"] = {
  sections: [
    ],
  tips: [
    "Ponding water within 48 hours after rain usually means slope or drainage problems.",
    "Secondary drains must not connect to the primary drain line; they discharge where overflow is visible.",
    "High groundwater means waterproofing and drainage, not dampproofing."
  ]
};
ARE.DEEP_TERMS.push(
  ["Cricket", "Roofing", "A small sloped surface that diverts water around a curb, chimney or toward a drain.", "pdd-roofing"],
  ["Secondary drainage", "Roofing", "Overflow drains or scuppers that relieve the roof if primary drains clog.", "pdd-roofing"],
  ["Counterflashing", "Roofing", "Flashing installed above and over base flashing to shed water off its top edge.", "pdd-roofing"],
  ["Hydrostatic pressure", "Waterproofing", "Water pressure against a below-grade wall or slab from groundwater.", "pdd-roofing"]
);

ARE.DEEP["pdd-mepsizing"] = {
  sections: [
    { h: "Cooling and airflow worked example", html: `
<p>A 4,000 sf office suite. Using a planning value of 350 sf per ton:</p>
<table class="tbl"><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Cooling load</td><td>4,000 ÷ 350</td><td>≈ 11.4 tons (≈ 137,000 Btu/h)</td></tr>
<tr><td>Supply air</td><td>11.4 × 400 cfm/ton</td><td>≈ 4,600 cfm</td></tr>
<tr><td>Main duct area at 1,000 fpm</td><td>4,600 ÷ 1,000</td><td>4.6 sf, for example 30 in × 22 in</td></tr>
</tbody></table>
<p>Check with the sensible-heat equation if loads are given: Q (Btu/h) = 1.08 × cfm × ΔT. Lower duct velocities are quieter and need larger ducts, which affects ceiling depth.</p>` },
    { h: "Lighting by the lumen method", html: `
<p>Number of fixtures = (target illuminance × area) ÷ (lumens per fixture × coefficient of utilization × light loss factor).</p>
<p>Example: a 30 ft × 40 ft classroom (1,200 sf) needs 40 footcandles. Fixtures deliver 4,000 lumens; CU 0.6; LLF 0.8. Fixtures = (40 × 1,200) ÷ (4,000 × 0.6 × 0.8) = 48,000 ÷ 1,920 = 25 fixtures. Then check the lighting power density against the energy code.</p>` }
  ],
  tips: [
    "1 ton of cooling = 12,000 Btu/h; about 400 cfm per ton is a common planning value.",
    "Duct area = airflow ÷ velocity; keep units consistent (cfm ÷ fpm = sf).",
    "Plumbing fixture counts come from the plumbing code table by occupancy and occupant load, split by sex unless single-user facilities are used."
  ]
};
ARE.DEEP_TERMS.push(
  ["Ton of refrigeration", "MEP", "A cooling rate of 12,000 Btu per hour.", "pdd-mepsizing"],
  ["Coefficient of utilization", "Lighting", "The fraction of lamp lumens that reach the work plane in a given room.", "pdd-mepsizing"],
  ["Light loss factor", "Lighting", "A multiplier for lumen depreciation and dirt over time.", "pdd-mepsizing"],
  ["Lighting power density", "Lighting", "Installed lighting watts per square foot, limited by the energy code.", "pdd-mepsizing"]
);
