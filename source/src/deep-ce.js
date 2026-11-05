/* ---------- Deeper lesson content: Construction & Evaluation (v19) ---------- */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["ce-admin"] = {
  sections: [
    ],
  tips: [
    "If the stem says the architect \"orders the contractor to stop work\", that is usually wrong; the owner has that right.",
    "Look for whether a deviation was identified in writing. If not, the contractor is still bound by the documents even after approval.",
    "Safety on the site is the contractor's responsibility; the architect who sees an imminent hazard should notify the contractor and owner immediately, not take charge."
  ]
};

ARE.DEEP["ce-payment"] = {
  sections: [
    { h: "After occupancy", html: `
<p>B101 §3.6.6.5 asks the architect, at the owner's request and within a year of substantial completion, to meet with the owner to review how the facility is operating and performing, at no extra fee. A post-occupancy evaluation goes further: surveys, energy data and observation used to compare performance with the design intent. Commissioning continues through the first seasons of operation.</p>` }
  ],
  tips: [
    "Seven days is the number for A201 certification, for the contractor's notice to stop work, and for each step of §9.7.",
    "Substantial completion starts the correction period and usually the warranties; final completion releases final payment.",
    "Stored materials count toward the payment only if the conditions in §9.3.2 are met (on site, or off site with the owner's advance approval, insurance and title)."
  ]
};

ARE.DEEP["ce-observation"] = {
  sections: [
    { h: "Measuring progress for a payment", html: `
<p>The architect compares the application line by line with the schedule of values and what was seen on site. A line that claims 80% when the work looks like 60% is reduced to what the architect can support. Watch for <b>front-loading</b>: early line items, such as mobilization or general conditions, priced high so the contractor is paid ahead of the work. Ask for a revised schedule of values before the first payment if it looks unbalanced.</p>` },
    { h: "Field reports that hold up", html: `
<ul>
<li>Date, weather, people present and the areas observed.</li>
<li>Progress compared with the schedule.</li>
<li>Work observed as conforming, and work observed as not conforming, with photos and references to drawing or specification sections.</li>
<li>Actions required and by whom.</li>
<li>A statement that observations are limited to the areas seen, consistent with the architect's role.</li>
</ul>
<p>Distribute reports to the owner and contractor promptly. Avoid words like <i>inspect</i> or <i>approve</i> for work you only observed.</p>` }
  ],
  tips: [
    "Progress is judged by the work in place, not by the money or time spent.",
    "Bidding advice: in design-bid-build, the architect helps the owner evaluate bids but the owner awards the contract.",
    "Commissioning verifies performance against the owner's project requirements; it is not the same as a punch list."
  ]
};
ARE.DEEP_TERMS.push(
  ["Front-loading", "Construction admin", "Pricing early schedule-of-values items high so the contractor is paid ahead of the work completed.", "ce-observation"],
  ["Field report", "Construction admin", "The architect's written record of a site visit: progress, observations, nonconforming work and required actions.", "ce-observation"]
);

ARE.DEEP["ce-claims"] = {
  sections: [
    { h: "Common claim types", html: `
<ul>
<li><b>Concealed or unknown conditions</b> (§3.7.4): the contractor must give notice within 14 days of discovery and before disturbing the condition. The architect investigates and recommends an adjustment.</li>
<li><b>Delay</b>: the contractor documents the cause and the effect on the critical path. Weather delays need proof that conditions were abnormal for the period and location.</li>
<li><b>Changes</b> where the parties cannot agree on price: resolved through a CCD and, if still disputed, a Claim.</li>
</ul>` }
  ],
  tips: [
    "As IDM, the architect must be impartial and not favor the owner who pays it.",
    "The 21-day notice window is a favorite number on the exam; so is the 14-day concealed-conditions notice.",
    "Claims discovered after the one-year correction period skip the IDM and go straight to mediation (§15.2.1)."
  ]
};
ARE.DEEP_TERMS.push(
  ["Claim", "Construction admin", "A demand by the owner or contractor for an adjustment of contract terms, payment, time or other relief (A201 §15.1.1).", "ce-claims"],
  ["Initial Decision Maker", "Construction admin", "The person who renders initial decisions on Claims; the architect unless the agreement names another.", "ce-claims"],
  ["Concealed condition", "Construction admin", "A subsurface or hidden physical condition that differs materially from the documents or from what is ordinarily found (A201 §3.7.4).", "ce-claims"],
  ["Condition precedent", "Contracts", "A step that must happen before a right can be used; in A201, mediation before binding dispute resolution.", "ce-claims"]
);

ARE.DEEP["ce-changes"] = {
  sections: [
    { h: "Worked example", html: `
<p>The owner adds two doors. The contractor proposes: materials $3,200, labor 40 h × $85 = $3,400, overhead and profit 25% on the total, plus a $1,000 \"coordination\" fee. The contract allows 15% combined overhead and profit for self-performed work.</p>
<p>Direct cost = 3,200 + 3,400 = $6,600. Allowed markup = 15% × 6,600 = $990. Fair price ≈ $7,590. The coordination fee duplicates overhead and should be removed unless the contract allows it separately.</p>` }
  ],
  tips: [
    "A change order needs all three signatures; a CCD needs only owner and architect.",
    "When the contractor signs a CCD, it becomes a change order on the agreed terms (§7.3.7).",
    "Minor changes (§7.4) cannot change cost or time; if the contractor thinks they do, it must say so before proceeding."
  ]
};
ARE.DEEP_TERMS.push(
  ["Minor change in the work", "Construction admin", "An architect's written order consistent with the documents' intent that does not change contract sum or time (A201 §7.4).", "ce-changes"],
  ["Proposal request", "Construction admin", "A request (G709) for the contractor to price a proposed change before it is ordered.", "ce-changes"],
  ["Markup", "Construction admin", "The overhead and profit percentage added to the direct cost of changed work, as allowed by the contract.", "ce-changes"]
);

ARE.DEEP["ce-payapps"] = {
  sections: [
    { h: "Worked application for payment", html: `
<p>Contract sum $2,000,000 with approved change orders of +$50,000. Work completed to date $1,100,000; materials stored on site and meeting §9.3.2 $60,000. Retainage 10%. Previous certificates $800,000.</p>
<table class="tbl"><thead><tr><th>Line</th><th>Calculation</th><th>Amount</th></tr></thead><tbody>
<tr><td>Total completed and stored</td><td>1,100,000 + 60,000</td><td>$1,160,000</td></tr>
<tr><td>Retainage</td><td>10% × 1,160,000</td><td>$116,000</td></tr>
<tr><td>Earned less retainage</td><td>1,160,000 − 116,000</td><td>$1,044,000</td></tr>
<tr><td>Less previous certificates</td><td>1,044,000 − 800,000</td><td><b>$244,000</b></td></tr>
<tr><td>Balance to finish, plus retainage</td><td>2,050,000 − 1,044,000</td><td>$1,006,000</td></tr>
</tbody></table>` },
    ],
  tips: [
    "Apply retainage to stored materials as well as completed work unless the contract says otherwise.",
    "The architect can withhold certification only for the reasons in §9.5.1 and only to the extent needed to protect the owner.",
    "Off-site stored materials need the owner's advance approval and proof of insurance and title."
  ]
};
ARE.DEEP_TERMS.push(
  ["Application for payment", "Construction admin", "The contractor's periodic request for payment (G702 with G703 continuation sheet).", "ce-payapps"],
  ["Certificate for payment", "Construction admin", "The architect's representation to the owner of the amount due, based on observation and the application (A201 §9.4).", "ce-payapps"],
  ["Lien waiver", "Construction admin", "A release of the right to file a lien for amounts paid, given by the contractor, subcontractors or suppliers.", "ce-payapps"],
  ["Consent of surety", "Construction admin", "The bonding company's approval of reduced retainage or final payment.", "ce-payapps"]
);
