/* CASE STUDIES — fictional projects. Each has 1–2 resources (matching NCARB's
   April 2026 format) and items that require finding, interpreting and calculating. */
ARE.CASES = [
{
  id: "case-library", title: "Maple Street Branch Library", divs: ["pa", "ppd"], level: 1,
  brief: "A city plans a new one-story branch library on a corner lot. You are preparing the feasibility study and early code analysis.",
  resources: [
    { name: "Zoning & site data", html: `
<table class="tbl"><tbody>
<tr><th>Lot</th><td>150 ft (street frontage) × 220 ft deep = 33,000 sf</td></tr>
<tr><th>District</th><td>C-2 Community Commercial</td></tr>
<tr><th>Floor area ratio</th><td>0.75 maximum</td></tr>
<tr><th>Lot coverage</th><td>40% maximum (building footprint)</td></tr>
<tr><th>Setbacks</th><td>Front 30 ft · Side 15 ft each · Rear 25 ft</td></tr>
<tr><th>Height</th><td>35 ft / 2 stories</td></tr>
<tr><th>Parking</th><td>1 space per 300 sf of gross floor area</td></tr>
<tr><th>Easement</th><td>20 ft storm sewer easement along the entire rear lot line (within the rear setback)</td></tr>
</tbody></table>` },
    { name: "Program summary", html: `
<table class="tbl"><thead><tr><th>Space</th><th>Net sf</th><th>Use</th></tr></thead><tbody>
<tr><td>Adult collection &amp; reading</td><td>4,200</td><td>Library stacks/reading</td></tr>
<tr><td>Children's area</td><td>1,800</td><td>Library stacks/reading</td></tr>
<tr><td>Community meeting room</td><td>1,400</td><td>Assembly, chairs only (not fixed)</td></tr>
<tr><td>Staff work &amp; offices</td><td>900</td><td>Business</td></tr>
<tr><td>Total net</td><td><b>8,300</b></td><td></td></tr>
</tbody></table>
<p>Target efficiency (net ÷ gross): 0.72. Code basis: 2021 IBC. Building will be fully sprinklered.</p>
<p>Excerpt, occupant load factors: library reading rooms 50 net; stack areas 100 gross; assembly concentrated (chairs only) 7 net; business 150 gross.</p>` }
  ],
  questions: [
    { id: "cs-lib-1", type: "calc", diff: 1, obj: "pa-4.3", q: "What gross floor area should the feasibility study carry? (Round to the nearest whole sf.)", ans: 11528, tol: 1, unit: "gsf",
      explain: "8,300 ÷ 0.72 = 11,527.8 → 11,528 gsf." },
    { id: "cs-lib-2", type: "calc", diff: 1, obj: "pa-2.2", q: "What is the maximum gross floor area allowed by FAR?", ans: 24750, tol: 1, unit: "sf",
      explain: "0.75 × 33,000 = 24,750 sf. The library (about 11,528 gsf) fits easily; coverage (13,200 sf footprint) also permits a one-story scheme." },
    { id: "cs-lib-3", type: "calc", diff: 2, obj: "pa-2.2", q: "Using the gross area you calculated in the first item, how many parking spaces does zoning require?", ans: 39, tol: 0, unit: "spaces",
      explain: "11,528 ÷ 300 = 38.4 → round up to 39 spaces." },
    { id: "cs-lib-4", type: "calc", diff: 2, obj: "ppd-2.2", q: "What is the occupant load of the community meeting room?", ans: 200, tol: 0, unit: "occupants",
      explain: "1,400 ÷ 7 = 200. With more than 49 occupants the room needs two exit access doorways, and in this sprinklered building they must be at least ⅓ of the room diagonal apart. Assembly rooms with 50 or more occupants also need panic hardware on doors with latches." },
    { id: "cs-lib-5", type: "mc", diff: 2, obj: "pa-2.3", q: "The city's engineer wants to place a bioretention basin along the rear of the lot. Which statement is correct?",
      opts: ["The basin cannot be within the setback", "Permanent structures cannot be built within the storm sewer easement; a basin may be possible only if the easement holder agrees", "The easement reduces the lot area used for FAR", "The easement must be removed before permit"],
      ans: 1,
      why: ["Setbacks typically restrict buildings, not landscape or stormwater features.", "Correct. Easement terms and the holder's consent govern what may be placed there.", "Easements generally do not reduce lot area for FAR unless the ordinance says so.", "Easements can coexist with development."],
      explain: "Always read the easement document; its terms govern." }
  ]
},
{
  id: "case-clinic", title: "Harbourview Clinic Fit-Out — Project Ledger", divs: ["pjm", "pcm"], level: 2,
  brief: "You are project manager on a 9,000 sf clinic interior fit-out. Basic services are a stipulated sum. It is week 14 and the principal has asked for a status review.",
  resources: [
    { name: "Fee & work plan", html: `
<table class="tbl"><tbody>
<tr><th>Total fee</th><td>$240,000 (stipulated sum)</td></tr>
<tr><th>Consultants (MEP, structural)</th><td>$60,000</td></tr>
<tr><th>Target profit</th><td>15% of the architect's own fee</td></tr>
<tr><th>Blended billing rate</th><td>$120/h</td></tr>
<tr><th>Phase split (architect's own fee)</th><td>SD 15% · DD 20% · CD 40% · Bid 5% · CA 20%</td></tr>
</tbody></table>` },
    { name: "Week 14 status (CD phase)", html: `
<table class="tbl"><tbody>
<tr><th>CD labor budget (BAC)</th><td>$61,200</td></tr>
<tr><th>Planned % complete at week 14</th><td>60%</td></tr>
<tr><th>Reported % complete</th><td>45%</td></tr>
<tr><th>Labor cost to date (AC)</th><td>$36,720</td></tr>
<tr><th>Notes</th><td>Owner added a pharmacy and asked for two layout options in week 10 (verbal, at a site walk). No written authorization on file.</td></tr>
</tbody></table>` }
  ],
  questions: [
    { id: "cs-cl-1", type: "calc", diff: 2, obj: "pjm-2.1", q: "Confirm the CD labor budget: what is the architect's own fee, less target profit, allocated to CDs?", ans: 61200, tol: 1, unit: "$",
      explain: "Architect's fee = 240,000 − 60,000 = 180,000. Less 15% profit = 153,000 labor. CD = 0.40 × 153,000 = $61,200." },
    { id: "cs-cl-2", type: "calc", diff: 2, obj: "pjm-2.1", q: "How many hours does the CD labor budget buy at the blended rate?", ans: 510, tol: 0, unit: "h",
      explain: "61,200 ÷ 120 = 510 hours." },
    { id: "cs-cl-3", type: "calc", diff: 2, obj: "pjm-4.1", q: "What is the cost performance index (CPI) for CDs? (Two decimals.)", ans: 0.75, tol: 0.006, unit: "",
      explain: "EV = 0.45 × 61,200 = 27,540. CPI = 27,540 ÷ 36,720 = 0.75." },
    { id: "cs-cl-4", type: "calc", diff: 3, obj: "pjm-4.1", q: "At the current CPI, what is the estimate at completion for CDs?", ans: 81600, tol: 1, unit: "$",
      explain: "EAC = 61,200 ÷ 0.75 = $81,600, a projected $20,400 overrun." },
    { id: "cs-cl-5", type: "mc", diff: 3, obj: "pjm-4.2", q: "What is the most appropriate action now?",
      opts: ["Absorb the overrun to protect the client relationship", "Notify the owner in writing that the pharmacy and layout options are additional services, quantify fee and schedule effects, and request authorization; record the week-10 request", "Stop work until the owner pays", "Reduce CA effort to recover the fee"],
      ans: 1,
      why: ["Absorbing scope growth erodes profit and sets a precedent.", "Correct. The overrun traces to scope growth requested verbally; it should have been confirmed in writing at week 10.", "Stopping work is disproportionate and may breach the agreement.", "Cutting CA effort risks the standard of care and owner protection during construction."],
      explain: "Scope creep is the most common cause of overruns on stipulated-sum work." }
  ]
},
{
  id: "case-rec", title: "Lakeshore Recreation Centre — Envelope Package", divs: ["pdd", "ppd"], level: 2,
  brief: "A single-story recreation centre in a heating climate (similar to US climate zone 5). You are checking the 90% CD wall section and specification before issue.",
  resources: [
    { name: "Wall section W3 (interior → exterior)", html: `
<ol>
<li>5/8 in gypsum board, latex paint</li>
<li>6 mil polyethylene sheet</li>
<li>6 in steel studs at 16 in o.c. with R-19 glass-fiber batts</li>
<li>1/2 in exterior gypsum sheathing</li>
<li>Self-adhered membrane, specified in Section 07 27 26 as a vapor-impermeable air and water barrier (0.05 perm)</li>
<li>2 in mineral wool continuous insulation (R-8.4) on thermally broken clips</li>
<li>1 in ventilated cavity</li>
<li>Metal panel cladding</li>
</ol>
<p>Head-of-window detail 8/A-521: the head flashing membrane is applied <i>over</i> (outboard of) the WRB sheet above it.</p>` },
    { name: "Specification excerpt (paraphrased)", html: `
<p><b>Section 07 27 26 — Fluid-Applied and Self-Adhered Membrane Air Barriers</b></p>
<p>1.4 Submittals: product data; shop drawings of transitions; mock-up report.<br>
2.1 Membrane: self-adhered, vapor permeance 0.05 perm (ASTM E96, desiccant method).<br>
3.3 Installation: lap upper courses over lower courses a minimum of 2 in; prime substrates.</p>
<p><b>Section 07 21 00 — Thermal Insulation</b><br>2.2 Vapor retarder: 6 mil polyethylene, Class I, on warm side of all exterior walls.</p>` }
  ],
  questions: [
    { id: "cs-rec-1", type: "mc", diff: 2, obj: "pdd-2.3", q: "What is the main moisture risk in wall W3 as specified?",
      opts: ["Too much exterior insulation", "Two Class I (very low permeance) layers trap the stud cavity, so it cannot dry in either direction", "The cavity is too wide", "Mineral wool absorbs rain"],
      ans: 1,
      why: ["Exterior insulation helps here.", "Correct. Polyethylene inside and a 0.05 perm membrane outside sandwich the cavity.", "1 in is a normal rainscreen cavity.", "Mineral wool sheds water and dries; it is common behind rainscreens."],
      explain: "With 2 in of exterior mineral wool and a vapor-impermeable membrane, delete the polyethylene and use a Class III interior (latex paint), or switch to a vapor-permeable membrane after a hygrothermal check." },
    { id: "cs-rec-2", type: "mc", diff: 2, obj: "pdd-1.5", q: "What is wrong with head detail 8/A-521?",
      opts: ["Nothing; laps can go either way with self-adhered membranes", "It is reverse-lapped: the WRB above must lap over the head flashing membrane so water is shed outward", "The membrane should stop short of the window", "The detail needs a backer rod"],
      ans: 1,
      why: ["Lap direction matters for every water-shedding layer.", "Correct. The spec says upper over lower. Water running down the WRB above meets the top edge of the head membrane and gets behind it.", "Discontinuity breaks the water control layer.", "Backer rods are for sealant joints."],
      explain: "Trace water down the face of each layer; it must never meet an upturned edge." },
    { id: "cs-rec-3", type: "mc", diff: 2, obj: "pdd-3.3", q: "Which documents need revision to fix the vapor problem consistently?",
      opts: ["Only wall section W3", "Section 07 21 00 (delete the polyethylene requirement or limit its scope), wall section W3, and any wall types or details that reference the polyethylene", "Only Section 07 27 26", "None; the contractor will resolve it in a submittal"],
      ans: 1,
      why: ["The spec would still require polyethylene.", "Correct. Drawings and specs must agree, and specs should defer to wall types rather than saying 'all exterior walls'.", "The membrane is not the problem layer.", "Submittals cannot change contract documents."],
      explain: "Coordinate drawings and specs before issue; conflicts become RFIs and change orders." },
    { id: "cs-rec-4", type: "match", diff: 1, obj: "pdd-3.1", q: "Match each requirement to where it belongs in Section 07 27 26.",
      pairs: [["Mock-up report", "Part 1 — General"], ["Vapor permeance 0.05 perm", "Part 2 — Products"], ["Lap upper courses over lower 2 in", "Part 3 — Execution"]],
      explain: "Submittals in Part 1, product properties in Part 2, installation in Part 3." }
  ]
},
{
  id: "case-firehall", title: "Westgate Fire Hall — Construction Phase", divs: ["ce", "pjm"], level: 3,
  brief: "A municipal fire hall is under construction (design-bid-build, AIA A101/A201–2017). You are the architect administering the contract. Retainage is 10% until substantial completion.",
  resources: [
    { name: "Application for Payment No. 6 (summary)", html: `
<table class="tbl"><tbody>
<tr><th>Original contract sum</th><td>$4,850,000</td></tr>
<tr><th>Net change by change orders</th><td>+$62,000</td></tr>
<tr><th>Total completed to date (per G703)</th><td>$2,910,000</td></tr>
<tr><th>Materials presently stored</th><td>$85,000 — overhead doors, in contractor's yard 15 miles away; no insurance certificate or bill of sale provided; storage off-site not approved in advance</td></tr>
<tr><th>Previous certificates for payment</th><td>$2,250,000</td></tr>
</tbody></table>` },
    { name: "Change & RFI log (excerpt)", html: `
<table class="tbl"><thead><tr><th>Item</th><th>Status</th></tr></thead><tbody>
<tr><td>RFI 41: Apparatus bay trench drain — specified grate conflicts with load rating needed for engines. Contractor proposes heavier grate, +$7,400, +0 days.</td><td>Owner agrees to change; price disputed (owner says $4,000). Grates needed in 5 days.</td></tr>
<tr><td>RFI 44: Paint color for bunk room not in finish schedule.</td><td>Answer needed; no cost or time effect.</td></tr>
<tr><td>Observation: masonry at hose tower lacks the specified horizontal joint reinforcement in courses 12–18.</td><td>Found at site visit 9/28.</td></tr>
<tr><td>Subcontractor (roofing) letter: unpaid for applications 4 and 5.</td><td>Received 10/02.</td></tr>
</tbody></table>` }
  ],
  questions: [
    { id: "cs-fh-1", type: "calc", diff: 3, obj: "ce-3.3", q: "Excluding the stored materials that do not meet A201 conditions, what is the maximum amount the architect could certify for this application before considering any other withholding?", ans: 369000, tol: 1, unit: "$",
      explain: "Stored materials off-site were not approved in advance and lack insurance and title documentation, so exclude them. 2,910,000 × 0.90 = 2,619,000 earned less retainage. 2,619,000 − 2,250,000 = $369,000." },
    { id: "cs-fh-2", type: "mc", diff: 3, obj: "ce-3.1", q: "Which instrument should the architect prepare for RFI 41?",
      opts: ["Architect's supplemental instruction", "Change order", "Construction change directive", "Addendum"],
      ans: 2,
      why: ["An ASI cannot change the contract sum.", "A change order needs agreement on price.", "Correct. Owner and architect sign a CCD so the work proceeds while price is resolved.", "Addenda are issued during bidding."],
      explain: "When the change is agreed but the price is not, and time is short, use a CCD." },
    { id: "cs-fh-3", type: "mc", diff: 1, obj: "ce-3.1", q: "How should the architect handle RFI 44?",
      opts: ["Issue a change order", "Answer the RFI (or issue an ASI) selecting the color; no change in cost or time", "Ask the contractor to choose", "Issue a CCD"],
      ans: 1,
      why: ["No cost or time change.", "Correct.", "Selection is the architect's/owner's design decision.", "Unnecessary."],
      explain: "Minor changes consistent with the intent go by ASI." },
    { id: "cs-fh-4", type: "ms", diff: 3, obj: "ce-3.4", pick: 2, q: "Regarding the missing joint reinforcement, which two actions are appropriate? Select two.",
      opts: ["Reject the nonconforming masonry and notify the owner and contractor in writing", "Order the masons to stop work", "Ask the structural engineer to evaluate whether removal or another remedy is required", "Accept it since it is concealed", "Instruct the foreman how to rebuild the wall"],
      ans: [0, 2],
      why: ["Correct.", "Stopping work is the owner's right.", "Correct.", "Concealed defects remain nonconforming.", "Means and methods belong to the contractor."],
      explain: "Reject, report and get the engineer's evaluation; the contractor corrects at its cost." },
    { id: "cs-fh-5", type: "mc", diff: 2, obj: "ce-3.3", q: "How should the roofing subcontractor's letter affect this certification?",
      opts: ["It has no effect", "The architect pays the subcontractor directly", "It is a ground to withhold if there is reasonable evidence of nonpayment; request lien waivers and an explanation, certify the justified amount and notify the reasons in writing", "Withhold the entire application"],
      ans: 2,
      why: ["Failure to pay subcontractors is a listed ground.", "Architects do not make payments.", "Correct.", "Withhold only what is necessary to protect the owner."],
      explain: "A201 §9.5.1 lists failure to pay subcontractors among the grounds for withholding." }
  ]
}
];
