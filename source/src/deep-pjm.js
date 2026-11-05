/* ---------- Deeper lesson content: Project Management (v19) ---------- */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["pjm-schedule"] = {
  sections: [
    { h: "Building the work plan step by step", html: `
<ol>
<li><b>Start from the fee.</b> Fee − consultants − reimbursables − target profit = the labor budget the team can spend.</li>
<li><b>Split by phase.</b> Apply the phase split in the agreement (B101 §11.5 sets percentages for stipulated-sum work; a typical split is SD 15%, DD 20%, CD 40%, bidding 5%, CA 20%).</li>
<li><b>Convert dollars to hours.</b> Phase labor ÷ blended billing rate (or salary rate, if the budget is in salary dollars).</li>
<li><b>List tasks and deliverables</b> for each phase and assign hours, staff and dates.</li>
<li><b>Set milestones</b> for owner reviews, consultant coordination, internal QC and agency submissions.</li>
</ol>
<p>B101 §3.1.3 requires the architect to submit a schedule of its services for the owner's approval soon after signing; the work plan is the internal version that makes that schedule achievable.</p>` },
    { h: "Earned value worked example", html: `
<p>CD labor budget (BAC) $60,000. At week 12 the plan called for 60% complete; the team reports 50% complete and has spent $34,000.</p>
<table class="tbl"><thead><tr><th>Measure</th><th>Formula</th><th>Value</th></tr></thead><tbody>
<tr><td>Planned value (PV)</td><td>Planned % × BAC</td><td>$36,000</td></tr>
<tr><td>Earned value (EV)</td><td>Actual % × BAC</td><td>$30,000</td></tr>
<tr><td>Actual cost (AC)</td><td>Spent to date</td><td>$34,000</td></tr>
<tr><td>Cost performance index (CPI)</td><td>EV ÷ AC = 30,000 ÷ 34,000</td><td>0.88 (over budget)</td></tr>
<tr><td>Schedule performance index (SPI)</td><td>EV ÷ PV = 30,000 ÷ 36,000</td><td>0.83 (behind schedule)</td></tr>
<tr><td>Estimate at completion (EAC)</td><td>BAC ÷ CPI = 60,000 ÷ 0.882</td><td>$68,000</td></tr>
</tbody></table>
<p>An index below 1.0 is unfavorable. Here the phase is forecast to overrun by about $8,000 unless productivity improves or scope is reduced with the owner's agreement.</p>` },
    { h: "Responding when the project slips", html: `
<p>Find the cause before choosing the fix. If the owner added scope, it is an Additional Service: notify in writing and seek authorization (B101 §4.2.1). If the team underestimated, options are re-sequencing, adding experienced staff to critical tasks, cutting non-essential internal effort, or accepting a lower profit; reducing quality control or construction administration is not an acceptable fix. On a CPM schedule, only delays to critical-path activities move the end date; activities with float can slip up to their float without delaying completion.</p>` }
  ],
  tips: [
    "CPI uses actual cost; SPI uses planned value. Both put earned value on top.",
    "If the stem asks \"what should the PM do first\", choose the step that finds the cause or notifies the owner, not one that silently absorbs the overrun.",
    "Float belongs to the project; using it on one activity reduces what remains for others on the same path."
  ]
};
ARE.DEEP_TERMS.push(
  ["Planned value", "Project management", "The budgeted cost of the work scheduled to be done by a given date (planned % complete × budget).", "pjm-schedule"],
  ["Cost performance index", "Project management", "Earned value ÷ actual cost; below 1.0 means the work is costing more than budgeted.", "pjm-schedule"],
  ["Schedule performance index", "Project management", "Earned value ÷ planned value; below 1.0 means the work is behind schedule.", "pjm-schedule"]
);

ARE.DEEP["pjm-contracts"] = {
  sections: [
    { h: "What B101 expects in each design phase", html: `
<table class="tbl"><thead><tr><th>Phase</th><th>Architect's key obligations (B101–2017)</th></tr></thead><tbody>
<tr><td>Schematic Design</td><td>Evaluate the owner's program, schedule, budget, site and delivery method against each other (§3.2.2); agree on requirements; present a preliminary design; prepare SD documents and a cost estimate (§3.2.6); request approval.</td></tr>
<tr><td>Design Development</td><td>Develop systems, materials and dimensions; update the estimate (§3.3.2); advise of adjustments; request approval (§3.3.3).</td></tr>
<tr><td>Construction Documents</td><td>Incorporate the requirements of authorities having jurisdiction (§3.4.2); help prepare procurement information and the project manual (§3.4.3); update the estimate (§3.4.4); request approval (§3.4.5).</td></tr>
<tr><td>Procurement</td><td>Help the owner obtain bids or proposals; issue addenda and respond to questions.</td></tr>
<tr><td>Construction</td><td>Administer the contract: site visits, certificates for payment, submittal review, interpretations, rejecting nonconforming work, substantial and final completion.</td></tr>
</tbody></table>
<p>Throughout, the architect coordinates with the owner's consultants and may rely on the information they provide (§3.1.2), contacts the governmental authorities and utilities that must approve the work (§3.1.5), and is not responsible for owner directives or acceptance of nonconforming work given without its written approval (§3.1.4).</p>` },
    { h: "Owner responsibilities", html: `
<p>Article 5 of B101–2017 assigns the owner duties that the architect relies on: provide a program and the owner's budget (§5.2), designate a representative, furnish site surveys and geotechnical information, coordinate the owner's own consultants, and respond to submittals promptly. When the owner is late or its information is wrong, the resulting extra work is an Additional Service (§4.2.1.4).</p>` }
  ],
  tips: [
    "\"Who provides the survey / geotechnical report?\" The owner, under B101 Article 5.",
    "A cost estimate is a Basic Service at SD, DD and CD; a detailed estimate is extra.",
    "If a stem shows a material change in size, quality or budget, the redesign is an Additional Service requiring written authorization first."
  ]
};
ARE.DEEP_TERMS.push(
  ["Initial Information", "Contracts", "Facts about the project recorded in B101 Article 1 (program, site, budget, schedule, delivery method); changes to it trigger Additional Services.", "pjm-contracts"],
  ["Instruments of Service", "Contracts", "The drawings, specifications, models and other documents the architect prepares; the architect owns their copyright.", "pjm-contracts"]
);

ARE.DEEP["pjm-quality"] = {
  sections: [
    { h: "A practical QC program", html: `
<table class="tbl"><thead><tr><th>When</th><th>Review</th><th>Who</th></tr></thead><tbody>
<tr><td>End of SD</td><td>Program compliance, code strategy, budget fit</td><td>Principal or senior reviewer not on the team</td></tr>
<tr><td>Mid-DD</td><td>System selection and coordination; constructability</td><td>Team with consultants</td></tr>
<tr><td>50–75% CD</td><td>Cross-discipline coordination; drawings vs. specs; code check</td><td>Independent reviewer; clash detection in BIM</td></tr>
<tr><td>Before issue</td><td>Final check, completeness, sealing requirements</td><td>Project architect and principal in charge</td></tr>
</tbody></table>
<p>Record each review: what was checked, by whom, the comments and how each was resolved. That record is evidence of the standard of care if a claim arises.</p>` },
    ],
  tips: [
    "QA is the process that prevents errors; QC is the checking that finds them.",
    "The best reviewer for an independent QC check is someone not on the project team.",
    "Minutes record decisions and actions, not a transcript."
  ]
};

ARE.DEEP["pjm-delivery-docs"] = {
  sections: [
    { h: "Staffing a project over its life", html: `
<p>Staffing follows the work plan's hour curve: a small senior team in SD, the largest team in CD, and a small team for bidding and CA. Assign people by skill to the critical tasks first, keep continuity (the same project architect from DD through CA where possible), and check firm-wide capacity across projects so one project's peak does not starve another. When the plan exceeds capacity, the options are re-sequencing, overtime for a short peak, adding staff, or using consultants; each costs money or risk that should be weighed against the schedule.</p>` },
    { h: "Approvals beyond the building permit", html: `
<ul>
<li><b>Zoning and planning:</b> site plan review, variances, conditional uses, design review boards.</li>
<li><b>Utilities:</b> service capacity, connections, easements.</li>
<li><b>Fire department:</b> access, hydrants, fire alarm and sprinkler review.</li>
<li><b>Health department:</b> food service, pools, health care.</li>
<li><b>Environmental:</b> stormwater, wetlands, floodplain.</li>
<li><b>Historic commissions:</b> work on designated buildings or districts.</li>
</ul>
<p>B101 §3.1.5 makes contacting these authorities part of Basic Services, and §3.1.6 has the architect assist the owner with required filings. Build review time into the schedule; agency reviews often control the critical path.</p>` }
  ],
  tips: [
    "Bridging documents are prepared for the owner before a design-build contract; the design-builder's architect completes the design.",
    "The certificate of occupancy comes from the building official, not the architect.",
    "When an agency's interpretation changes after permit and contradicts an earlier ruling, the resulting redesign is an Additional Service (B101 §4.2.1.3)."
  ]
};

ARE.DEEP["pjm-changes"] = {
  sections: [
    ],
  tips: [
    "Watch the verb in the stem: \"before proceeding\" signals §4.2.1; \"to avoid delay in construction\" signals §4.2.2.",
    "Billing for an Additional Service after the fact without notice is the classic wrong answer.",
    "A change requested by the owner after approval of a phase is a change to previous approvals, so it is an Additional Service."
  ]
};
ARE.DEEP_TERMS.push(
  ["Scope creep", "Project management", "Gradual growth of the work through small requests that are not tied to added fee or schedule.", "pjm-changes"],
  ["Basic services", "Contracts", "The services in B101 Article 3 included in the base fee: SD, DD, CD, procurement and construction phase services.", "pjm-changes"],
  ["Written authorization", "Contracts", "The owner's written approval required before the architect performs §4.2.1 Additional Services.", "pjm-changes"]
);

ARE.DEEP["pjm-agreements"] = {
  sections: [
    ],
  tips: [
    "Liquidated damages are stated in the owner–contractor agreement, not in A201 or B101.",
    "The contract documents are the agreement, the conditions, the drawings, the specifications, addenda issued before signing and modifications issued after.",
    "Bidding requirements (invitation, instructions to bidders, bid forms) are not contract documents unless enumerated."
  ]
};
ARE.DEEP_TERMS.push(
  ["Guaranteed maximum price", "Contracts", "A ceiling on the owner's cost under a cost-plus-fee contract; the contractor pays costs above it except for approved changes.", "pjm-agreements"],
  ["Contract documents", "Contracts", "The agreement, general and supplementary conditions, drawings, specifications, addenda issued before execution and later modifications.", "pjm-agreements"],
  ["Liquidated damages", "Contracts", "A pre-agreed daily amount the contractor pays for late completion, set in the owner–contractor agreement.", "pjm-agreements"],
  ["Supplementary conditions", "Contracts", "Project-specific changes and additions to the general conditions.", "pjm-agreements"]
);
