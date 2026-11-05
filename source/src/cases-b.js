/* CASE STUDIES (set 2): PcM and PPD. Fictional projects; table values given
   in the resources are for the case, as the ARE supplies them. */
ARE.CASES.push({
  id: "case-fieldstone", title: "Fieldstone Studio — Year-End Review", divs: ["pcm", "pjm"], level: 2,
  brief: "You are an associate at a 14-person firm. The principals ask you to review the year's numbers and a contract the firm has been offered for a municipal arena renovation.",
  resources: [
    { name: "Financial summary", html: `
<table class="tbl"><tbody>
<tr><th>Gross revenue</th><td>$2,850,000</td></tr>
<tr><th>Consultant costs</th><td>$520,000</td></tr>
<tr><th>Reimbursable expenses</th><td>$80,000</td></tr>
<tr><th>Direct labor</th><td>$700,000</td></tr>
<tr><th>Indirect expenses (including non-billable salary)</th><td>$1,260,000</td></tr>
<tr><th>Total hours paid</th><td>28,000</td></tr>
<tr><th>Billable hours</th><td>17,920</td></tr>
<tr><th>Accounts receivable over 90 days</th><td>$410,000 (one client)</td></tr>
</tbody></table>` },
    { name: "Offered agreement (key clauses, paraphrased)", html: `
<ol>
<li>Compensation: stipulated sum of 6.5% of the construction budget; scope includes an existing-conditions survey of an arena with no record drawings.</li>
<li>The Architect shall indemnify the Owner against all claims arising out of the Project, regardless of cause.</li>
<li>The Architect warrants that the design will achieve LEED Silver certification.</li>
<li>Payment within 90 days of invoice; no interest on late payment.</li>
<li>Disputes: mediation, then litigation in the county court.</li>
<li>Standard of care: the skill and care ordinarily used by architects practicing under similar circumstances.</li>
<li>The Owner will furnish a hazardous-materials survey of the arena.</li>
</ol>` }
  ],
  questions: [
    { id: "cs-fs-1", type: "calc", diff: 2, obj: "pcm-1.1", q: "What was the firm's utilization rate?", ans: 64, tol: 0.1, unit: "%",
      explain: "17,920 ÷ 28,000 = 0.64, or 64%." },
    { id: "cs-fs-2", type: "calc", diff: 2, obj: "pcm-2.1", q: "What was the net multiplier? (Two decimals.)", ans: 3.21, tol: 0.006, unit: "",
      explain: "NOR = 2,850,000 − 520,000 − 80,000 = 2,250,000. Net multiplier = 2,250,000 ÷ 700,000 = 3.21." },
    { id: "cs-fs-3", type: "calc", diff: 2, obj: "pcm-2.1", q: "What was the break-even rate? (Two decimals.)", ans: 2.80, tol: 0.006, unit: "",
      explain: "Overhead rate = 1,260,000 ÷ 700,000 = 1.80. Break-even = 1 + 1.80 = 2.80. With a net multiplier of 3.21 the firm is profitable (profit = 2,250,000 − 1,960,000 = $290,000)." },
    { id: "cs-fs-4", type: "mc", diff: 2, obj: "pcm-2.1", q: "Which financial issue needs the most urgent attention?",
      opts: ["Utilization of 64% across all hours paid", "The $410,000 receivable over 90 days from one client", "Consultant costs of $520,000, about 18% of gross revenue", "A break-even rate of 2.80 against a 3.21 net multiplier"],
      ans: 1, why: ["64% is within a typical range.", "Correct. Aged receivables threaten cash flow and may never be collected.", "Pass-through costs.", "The firm is above break-even."],
      explain: "Profit on paper does not pay salaries; collect receivables and review terms with that client." },
    { id: "cs-fs-5", type: "ms", diff: 3, obj: "pcm-3.3", pick: 3, q: "Which three clauses create the greatest professional-liability or uninsurable risk and should be negotiated before signing? Check the three that apply.",
      opts: ["Clause 1: fixed fee including an undefined existing-conditions survey", "Clause 2: indemnity regardless of cause", "Clause 3: warranty of LEED Silver certification", "Clause 5: mediation before litigation", "Clause 6: standard of care", "Clause 7: owner-furnished hazardous-materials survey"],
      ans: [0, 1, 2], why: ["Correct. Price the survey hourly or define its scope.", "Correct. Limit indemnity to the architect's negligence.", "Correct. Replace the warranty with a commitment to design to LEED Silver criteria.", "Mediation before litigation follows AIA practice.", "This is the normal professional standard; it adds no liability.", "Owner-furnished information shifts that risk to the owner; it helps the architect."],
      explain: "Clause 4 (90-day payment, no interest) is a cash-flow issue worth raising too, but it is a business term rather than a liability risk.", ref: "AIA B101–2017, §2.2 (standard of care) and §8.2" }
  ]
});

ARE.CASES.push({
  id: "case-cedar", title: "Cedar Hollow Community Health Center", divs: ["ppd", "pa"], level: 3,
  brief: "A nonprofit is building a one-story health center on a suburban lot. You are in schematic design and must confirm code area limits, choose systems and review an early cost estimate.",
  resources: [
    { name: "Code summary (case excerpt)", html: `
<p>Code: 2021 IBC. Occupancy: Group B (outpatient clinic). Construction type: V-B. Sprinklered throughout (NFPA 13).</p>
<table class="tbl"><tbody>
<tr><th>Tabular area, NS (Group B, V-B, nonsprinklered) — case value</th><td>9,000 sf</td></tr>
<tr><th>Tabular area, S1 (Group B, V-B, sprinklered one story) — case value</th><td>36,000 sf</td></tr>
<tr><th>Frontage increase</th><td>I<sub>f</sub> = [F/P − 0.25] × W/30</td></tr>
<tr><th>Allowable area (one story)</th><td>A<sub>a</sub> = A<sub>t</sub> + (NS × I<sub>f</sub>)</td></tr>
<tr><th>Building</th><td>Footprint 220 ft × 180 ft = 39,600 sf; perimeter 800 ft</td></tr>
<tr><th>Open frontage</th><td>South (220 ft) and west (180 ft) face streets; width W = 30 ft for calculation</td></tr>
<tr><th>Plumbing ratios (case excerpt, Group B)</th><td>WC: 1 per 25 for first 50, 1 per 50 for remainder; lav: 1 per 40 for first 80, 1 per 80 for remainder</td></tr>
</tbody></table>` },
    { name: "Program & estimate notes", html: `
<ul>
<li>Program: 40 exam rooms, 2 procedure rooms, pharmacy, lab, waiting for 80, staff areas. Design occupant load for fixture purposes: 200 (100 per sex).</li>
<li>Owner priorities: individual temperature control in exam rooms, low operating cost, quiet waiting room.</li>
<li>Geotechnical summary: medium-dense sand, allowable bearing 3,000 psf, groundwater at 14 ft.</li>
<li>SD cost estimate (by consultant): $265/sf for 39,600 sf; dated 18 months before construction midpoint; no escalation shown; 3% design contingency.</li>
<li>Regional comparables for outpatient clinics completed last year: $420–480/sf.</li>
</ul>` }
  ],
  questions: [
    { id: "cs-ch-1", type: "calc", diff: 3, obj: "ppd-2.2", q: "What is the frontage increase factor I_f? (Two decimals.)", ans: 0.25, tol: 0.001, unit: "",
      explain: "F = 220 + 180 = 400 ft. F/P = 400 ÷ 800 = 0.50. I_f = (0.50 − 0.25) × 30/30 = 0.25." },
    { id: "cs-ch-2", type: "calc", diff: 3, obj: "ppd-2.2", q: "What is the allowable area A_a?", ans: 38250, tol: 1, unit: "sf",
      explain: "A_a = 36,000 + (9,000 × 0.25) = 38,250 sf." },
    { id: "cs-ch-3", type: "mc", diff: 3, obj: "ppd-2.3", q: "The proposed footprint is 39,600 sf. What is the most appropriate design response?",
      opts: ["No change; the frontage increase already brings it into compliance", "Reduce the footprint to 38,250 sf or less, or change the frontage, construction type or fire-wall layout", "Remove the sprinklers and design to the nonsprinklered area limit", "Add a second story to the same footprint to spread the area"],
      ans: 1, why: ["39,600 > 38,250, which already includes the frontage increase.", "Correct. Any of these brings the building into compliance; the owner's cost and program decide.", "Sprinklers increase allowable area; removing them lowers it.", "Adding a story does not fix the per-story limit."],
      explain: "Compare the actual area to the allowable area for each story." },
    { id: "cs-ch-4", type: "mc", diff: 2, obj: "ppd-3.1", q: "Which HVAC approach best meets the owner's priorities?",
      opts: ["A single large rooftop unit serving the whole building", "VRF with a dedicated outdoor air system, with low-noise indoor units in the waiting room", "Packaged terminal units in each exam room with a central exhaust fan", "Electric baseboard heat with operable windows for cooling"],
      ans: 1, why: ["One zone cannot control 40 exam rooms individually.", "Correct. Many zones, efficient, quiet indoor units.", "Noisy at every room and hard to ventilate well.", "No mechanical cooling or controlled ventilation."],
      explain: "Match zoning, efficiency and noise to the program." },
    { id: "cs-ch-5", type: "calc", diff: 2, obj: "pdd-1.2", q: "How many water closets are required for the women's room (100 women)?", ans: 3, tol: 0, unit: "WCs",
      explain: "First 50 ÷ 25 = 2; remaining 50 ÷ 50 = 1. Total 3." },
    { id: "cs-ch-6", type: "ms", diff: 3, obj: "ppd-5.2", pick: 2, q: "Which two problems with the SD estimate should you raise with the cost consultant? Check the two that apply.",
      opts: ["No escalation to the construction midpoint", "Unit cost far below regional comparables", "The geotechnical bearing capacity", "The use of square-foot costing at SD", "Including any design contingency", "Costing on gross rather than net floor area"],
      ans: [0, 1], why: ["Correct. 18 months of escalation is missing.", "Correct. $265/sf vs $420–480/sf needs reconciliation.", "Bearing of 3,000 psf supports spread footings; not an estimate flaw.", "Square-foot costing is appropriate at SD.", "Including a design contingency at SD is appropriate.", "Gross area is the normal basis for square-foot costs."],
      explain: "Evaluate estimates for date, unit costs and markups before reporting to the owner." }
  ]
});
