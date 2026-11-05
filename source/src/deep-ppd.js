/* ---------- Deeper lesson content: Project Planning & Design (v19) ----------
   Code references are to the 2021 IBC and the 2010 ADA Standards unless stated. Adopted editions and local amendments vary; check the jurisdiction. */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["ppd-egress"] = {
  sections: [
    { h: "Worked example: one office floor", html: `
<p>A 12,000 sf (gross) business floor, not sprinklered, with a 200 ft diagonal.</p>
<table class="tbl"><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Occupant load (Table 1004.5, business 150 gross)</td><td>12,000 ÷ 150</td><td>80 occupants</td></tr>
<tr><td>Number of exits (Table 1006.3.3, 1–500)</td><td></td><td>2</td></tr>
<tr><td>Stair width (0.3 in per occupant, §1005.3.1)</td><td>80 × 0.3 = 24 in</td><td>Use the 44 in minimum (§1011.2)</td></tr>
<tr><td>Door and corridor width (0.2 in, §1005.3.2)</td><td>80 × 0.2 = 16 in</td><td>Use minimums: 32 in clear doors, 44 in corridors</td></tr>
<tr><td>Remoteness (§1007.1.1)</td><td>½ × 200 ft</td><td>Exits at least 100 ft apart</td></tr>
<tr><td>Exit access travel distance (Table 1017.2, B)</td><td></td><td>200 ft maximum without sprinklers</td></tr>
</tbody></table>
<p>With an NFPA 13 sprinkler system the remoteness drops to ⅓ of the diagonal (about 67 ft) and the travel distance rises to 300 ft. That is why sprinklers often make a floor plan work.</p>` },
    { h: "Parts of the means of egress", html: `
<table class="tbl"><thead><tr><th>Part</th><th>Where it is</th><th>Examples</th></tr></thead><tbody>
<tr><td>Exit access</td><td>From any occupied point to an exit</td><td>Rooms, aisles, corridors; includes common path of travel</td></tr>
<tr><td>Exit</td><td>Separated from the rest of the building by rated construction</td><td>Interior exit stairways, exit passageways, exterior exit doors</td></tr>
<tr><td>Exit discharge</td><td>From the exit to the public way</td><td>Exterior walkways, egress courts</td></tr>
</tbody></table>
<p>Travel distance is measured to the entrance of an exit, not through it. Interior exit stairways connecting four or more stories need 2-hour enclosures; fewer than four, 1-hour (§1023.2).</p>` }
  ],
  tips: [
    "Gross vs net matters: business uses gross area; assembly, classrooms and similar uses use net.",
    "Calculated width is often less than the code minimum; the larger number governs.",
    "Sprinklers change remoteness (½ → ⅓), travel distance and dead-end limits; read the stem for \"sprinklered\"."
  ]
};
ARE.DEEP_TERMS.push(
  ["Exit access", "Codes", "The part of the means of egress from any occupied point to an exit.", "ppd-egress"],
  ["Exit discharge", "Codes", "The part of the means of egress between the end of an exit and a public way.", "ppd-egress"],
  ["Common path of egress travel", "Codes", "The part of exit access occupants travel before two separate paths to two exits are available.", "ppd-egress"],
  ["Exit access travel distance", "Codes", "Distance from the most remote point to the entrance of the nearest exit; limited by Table 1017.2.", "ppd-egress"]
);

ARE.DEEP["ppd-envelope"] = {
  sections: [
    { h: "Worked heat-loss comparison", html: `
<p>Heat flow through an assembly: <b>Q = U × A × ΔT</b> (Btu/h). Indoor 70°F, outdoor design 10°F, so ΔT = 60°F.</p>
<table class="tbl"><thead><tr><th>Element</th><th>Area</th><th>U-factor</th><th>Q</th></tr></thead><tbody>
<tr><td>Opaque wall</td><td>2,000 sf</td><td>0.06</td><td>0.06 × 2,000 × 60 = 7,200 Btu/h</td></tr>
<tr><td>Windows</td><td>500 sf</td><td>0.30</td><td>0.30 × 500 × 60 = 9,000 Btu/h</td></tr>
</tbody></table>
<p>The windows are one-fifth of the area but lose more heat than all the wall. Improving glazing or reducing window area usually saves more than adding wall insulation once the wall is already well insulated.</p>` },
    ],
  tips: [
    "R-values add in series; U-factor = 1 ÷ total R. Never average U-factors of layers.",
    "Low SHGC suits cooling-dominated climates; higher SHGC with south glazing helps heating-dominated ones.",
    "Visible transmittance (VT) affects daylight; a high VT and low SHGC glass is \"spectrally selective\"."
  ]
};

ARE.DEEP["ppd-siting"] = {
  sections: [
    { h: "Flood zones and building location", html: `
<table class="tbl"><thead><tr><th>FEMA zone</th><th>Meaning</th><th>Design response</th></tr></thead><tbody>
<tr><td>A, AE</td><td>1% annual chance flood (\"100-year\")</td><td>Lowest floor at or above the design flood elevation; flood-resistant materials below</td></tr>
<tr><td>V, VE</td><td>Coastal high-hazard area with wave action</td><td>Elevated on piles or columns; breakaway walls below; stricter rules</td></tr>
<tr><td>X</td><td>Moderate or minimal hazard</td><td>Normal construction; consider risk anyway</td></tr>
</tbody></table>
<p>The design flood elevation is usually the base flood elevation plus any freeboard the jurisdiction requires (IBC §1612 refers to ASCE 24).</p>` },
    ],
  tips: [
    "Locate the building where it is level, above the floodplain, and close to access and utilities.",
    "Street walls and setbacks matching neighbors are common answers for context-sensitive design.",
    "Detention releases water; retention keeps it."
  ]
};
ARE.DEEP_TERMS.push(
  ["Base flood elevation", "Site", "The elevation the 1% annual chance flood is expected to reach, shown on FEMA flood maps.", "ppd-siting"],
  ["Low-impact development", "Site", "Managing stormwater near where it falls through infiltration and vegetation rather than pipes.", "ppd-siting"]
);

ARE.DEEP["ppd-systems"] = {
  sections: [
    { h: "Acoustics basics", html: `
<ul>
<li><b>STC</b> rates how well a wall or floor blocks airborne sound. Higher is better. The IBC requires STC 50 (45 if field tested) between dwelling units (§1206).</li>
<li><b>IIC</b> rates impact sound through floors; also 50 between dwelling units.</li>
<li><b>NRC</b> rates how much sound a surface absorbs (0 to 1). Absorbent ceilings reduce reverberation inside a room but do not stop sound passing through walls.</li>
<li>Mass, airtightness, decoupled framing and cavity insulation raise STC. Flanking paths (ducts, gaps, outlets back to back) lower it.</li>
</ul>` }
  ],
  tips: [
    "Match the HVAC system to zoning needs, ceiling space and noise limits stated in the program.",
    "Absorption (NRC) controls echo in a room; isolation (STC) controls sound between rooms.",
    "Preaction sprinklers protect rooms where accidental water discharge is costly (archives, data rooms)."
  ]
};
ARE.DEEP_TERMS.push(["IIC", "Acoustics", "Impact Insulation Class: rating of a floor-ceiling assembly's resistance to impact sound.", "ppd-systems"]);

ARE.DEEP["ppd-integration"] = {
  sections: [
    { h: "Weighted decision matrix: worked example", html: `
<p>The owner's priorities: cost (weight 40%), energy (30%), schedule (20%), appearance (10%). Two envelope options are scored 1–5.</p>
<table class="tbl"><thead><tr><th>Criterion</th><th>Weight</th><th>Option A score</th><th>Option B score</th></tr></thead><tbody>
<tr><td>Cost</td><td>0.40</td><td>4</td><td>3</td></tr>
<tr><td>Energy</td><td>0.30</td><td>2</td><td>5</td></tr>
<tr><td>Schedule</td><td>0.20</td><td>4</td><td>3</td></tr>
<tr><td>Appearance</td><td>0.10</td><td>3</td><td>4</td></tr>
<tr><td><b>Weighted total</b></td><td></td><td>1.6 + 0.6 + 0.8 + 0.3 = <b>3.3</b></td><td>1.2 + 1.5 + 0.6 + 0.4 = <b>3.7</b></td></tr>
</tbody></table>
<p>Option B wins even though it costs more, because energy carries heavy weight. Change the weights and the answer can change, so agree on them with the owner first.</p>` },
    { h: "Life-cycle cost", html: `
<p>Simple payback = extra first cost ÷ annual savings. A system that costs $60,000 more and saves $8,000 a year pays back in 7.5 years. Life-cycle cost analysis goes further: it adds first cost, energy, maintenance, replacement and residual value over the study period, discounted to present value, so options with different lives can be compared fairly.</p>` }
  ],
  tips: [
    "When two codes or standards apply, design to meet both; where they differ, the more restrictive usually controls in practice.",
    "Value engineering should keep the function at lower cost, not simply cut scope.",
    "Escalate estimates to the construction midpoint when comparing with the budget."
  ]
};
ARE.DEEP_TERMS.push(
  ["Life-cycle cost", "Cost", "Total cost of owning a system over its life: first cost, operation, maintenance, replacement and residual value.", "ppd-integration"],
  ["Simple payback", "Cost", "Extra first cost divided by annual savings; ignores interest and system life.", "ppd-integration"],
  ["Value engineering", "Cost", "Reviewing a design to deliver the required function at lower cost.", "ppd-integration"]
);

ARE.DEEP["ppd-heightarea"] = {
  sections: [
    { h: "Mixed occupancies (§508)", html: `
<table class="tbl"><thead><tr><th>Option</th><th>How it works</th><th>Best when</th></tr></thead><tbody>
<tr><td>Accessory</td><td>A minor use (no more than 10% of the story's area) is treated as part of the main occupancy</td><td>A small conference room or break area in an office</td></tr>
<tr><td>Nonseparated</td><td>No separations, but the most restrictive requirements apply throughout</td><td>Uses with similar hazards</td></tr>
<tr><td>Separated</td><td>Rated separations (Table 508.4); each area meets its own rules; sum of area ratios ≤ 1 on each story</td><td>Very different hazards, such as storage below offices</td></tr>
</tbody></table>
<p>A <b>fire wall</b> (§706) does something different: it divides a structure into separate buildings, each with its own allowable area.</p>` }
  ],
  tips: [
    "Height is checked two ways: feet above grade plane (Table 504.3) and number of stories (Table 504.4).",
    "Sprinkler benefits are built into the S1, SM and S13R values in Table 506.2; frontage is added on top.",
    "Fire walls create separate buildings; fire barriers and fire partitions do not."
  ]
};
ARE.DEEP_TERMS.push(
  ["Construction type", "Codes", "IBC classification (I to V, A or B) based on materials and fire resistance of building elements.", "ppd-heightarea"],
  ["Fire wall", "Codes", "A rated wall with structural stability that divides a structure into separate buildings (IBC §706).", "ppd-heightarea"],
  ["Accessory occupancy", "Codes", "A minor use, no more than 10% of a story's area, treated as part of the main occupancy (IBC §508.2).", "ppd-heightarea"],
  ["Grade plane", "Codes", "The reference plane representing the average finished ground level next to the building, used to measure height.", "ppd-heightarea"],
  ["Frontage increase", "Codes", "Increase in allowable area for building perimeter facing a public way or open space (IBC §506.3).", "ppd-heightarea"]
);

ARE.DEEP["ppd-access"] = {
  sections: [
    { h: "Scoping: how many must be accessible", html: `
<ul>
<li>Accessible parking follows Table 208.2 (for example, 1 space for 1–25, 4 for 76–100). At least 1 of every 6 accessible spaces, or fraction, must be van accessible (208.2.4).</li>
<li>Multistory buildings generally need an accessible route between floors (an elevator), with limited exceptions for small buildings.</li>
</ul>
<p>Federal facilities follow the Architectural Barriers Act standards; most multifamily housing also follows the Fair Housing Act design requirements. The IBC (Chapter 11) adopts ICC A117.1 for building-code accessibility.</p>` }
  ],
  tips: [
    "Stairs are never part of an accessible route.",
    "When the ADA and the building code differ, design to satisfy both; the stricter number usually controls.",
    "Van-accessible spaces need a 96 in wide aisle with a standard space, or a 132 in space with a 60 in aisle."
  ]
};
ARE.DEEP_TERMS.push(
  ["Accessible route", "Accessibility", "A continuous unobstructed path connecting accessible elements and spaces, with limited slopes and no steps.", "ppd-access"],
  ["Clear floor space", "Accessibility", "A 30 in × 48 in minimum area for a stationary wheelchair at fixtures and controls (ADA 305).", "ppd-access"],
  ["Van-accessible space", "Accessibility", "An accessible parking space with a wider aisle or space and 98 in vertical clearance.", "ppd-access"],
  ["ICC A117.1", "Accessibility", "The accessibility standard referenced by the IBC for building-code compliance.", "ppd-access"]
);
