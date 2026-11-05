/* ---------- Deeper lesson content: Practice Management (v19) ----------
   ARE.DEEP[lessonId] = { sections:[{h, html}], tips:[html] }
   Glossary additions use the same {term, cat, def, lesson} shape as reference.js. */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];

ARE.DEEP["pcm-risk"] = {
  sections: [
    { h: "Risk allocation clauses in the agreement", html: `
<p>Most of a firm's exposure is set before any drawing is made, by the clauses that decide who carries which loss. Read every owner-drafted agreement for these four items.</p>
<table class="tbl"><thead><tr><th>Clause</th><th>What it does</th><th>What to look for</th></tr></thead><tbody>
<tr><td>Indemnification</td><td>One party agrees to cover the other's losses from third-party claims.</td><td>Limit it to losses <i>caused by your negligence</i> and only to that extent. Avoid a duty to <i>defend</i>: insurers generally cover defense of your own negligence, not an up-front promise to defend the owner.</td></tr>
<tr><td>Limitation of liability</td><td>Caps the architect's total liability, often at the fee or a fixed amount.</td><td>Not in B101–2017; it is added by amendment or in Article 12 (Special Terms). Enforceability varies by state.</td></tr>
<tr><td>Waiver of consequential damages</td><td>Each party gives up claims for indirect losses such as lost rent or profit.</td><td>Mutual in B101–2017 (§8.1.3). Watch for owner edits that make it one-way.</td></tr>
<tr><td>Insurance requirements</td><td>Sets the types and limits the architect must carry.</td><td>B101 §2.5 lists them; if they exceed what you normally carry, the owner pays the extra premium (§11.9).</td></tr>
</tbody></table>
<div class="callout"><b>Additional insured.</b> B101 §2.5.7 asks the architect to name the owner as an additional insured on its general liability and auto policies. Professional liability policies generally cannot add additional insureds, so a demand to do so should be struck.</div>` },
    { h: "How a professional liability policy works", html: `
<ul>
<li><b>Limits.</b> A <i>per-claim</i> limit and an <i>aggregate</i> limit for the policy year. A run of claims can exhaust the aggregate.</li>
<li><b>Deductible.</b> Paid by the firm on each claim, sometimes only on damages and sometimes on defense as well.</li>
<li><b>Defense inside limits.</b> Many policies pay legal fees out of the limit, so a long defense reduces the money left for a settlement.</li>
<li><b>Practice vs. project policy.</b> A practice policy covers all of the firm's work. A project-specific policy covers one project, often a large or design-build project, and is usually bought by the owner or design-builder.</li>
<li><b>Reporting.</b> Claims-made policies require prompt notice of claims and, under most policies, of circumstances that could become claims. Late notice can void coverage.</li>
</ul>` },
    { h: "Copyright and instruments of service", html: `
<p>Under B101–2017 the architect and its consultants are the authors and owners of the drawings and specifications (§7.2). The owner receives a <b>nonexclusive license</b> to use them to build, use, maintain, alter and add to <i>this</i> project, conditioned on substantially performing the agreement, including paying (§7.3). If the owner uses the documents without the architect, the owner releases the architect from claims arising from that use (§7.3.1). The license cannot be transferred without the architect's written agreement (§7.4).</p>
<p>Separately, federal copyright law protects architectural works as built and as drawn. Copying another firm's design, or reusing a former employer's documents, can infringe even when a client asks for it.</p>` },
    { h: "Time limits and termination in B101–2017", html: `
<ul>
<li>Claims must be brought within the period set by applicable law, and in any case <b>no more than 10 years after Substantial Completion</b> (§8.1.1). State statutes of repose may be shorter.</li>
<li>If the owner does not pay, the architect may suspend services after <b>seven days' written notice</b> (§9.1).</li>
<li>Either party may terminate for the other's substantial nonperformance on seven days' written notice (§9.4). The owner may also terminate <b>for convenience</b> on seven days' notice (§9.5) and must pay for services performed, reimbursables and termination costs (§9.6).</li>
<li>If the owner suspends the project for more than 90 cumulative days, the architect may terminate (§9.3).</li>
</ul>` },
    { h: "Managing risk day to day", html: `
<p>Contracts and insurance transfer risk; good practice reduces it. The habits the Handbook and insurers stress most are: choosing clients and projects the firm can serve well; defining scope in writing; documenting decisions and owner direction (meeting minutes, confirming emails); scheduling internal quality reviews before each issue; and responding to problems promptly and factually without admitting liability. When something goes wrong, notify the insurer early and let it guide communications with the claimant.</p>` }
  ],
  tips: [
    "When a stem offers an indemnity, warranty or guarantee clause, the best answer usually <b>limits</b> it to the architect's negligence or replaces it with standard-of-care language.",
    "\"Which policy responds?\" Design error → professional liability. Slip-and-fall in the office → general liability. Employee injured → workers' compensation.",
    "Claims-made questions often hinge on timing. Ask: is a policy in force on the date the claim is <i>made</i>? If not, was a tail purchased?",
    "Entity questions: no entity protects you from <i>your own</i> negligence. LLPs protect partners from <i>each other's</i> negligence."
  ]
};

ARE.DEEP["pcm-finance"] = {
  sections: [
    { h: "Worked numbers: reading a firm's year", html: `
<p>A firm reports net operating revenue (NOR) of $2,400,000, direct labor of $800,000 and indirect expenses (overhead) of $1,200,000. Staff were paid for 30,000 hours and charged 19,500 to projects.</p>
<table class="tbl"><thead><tr><th>Metric</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Utilization</td><td>19,500 ÷ 30,000</td><td>65%</td></tr>
<tr><td>Overhead rate</td><td>1,200,000 ÷ 800,000</td><td>1.50</td></tr>
<tr><td>Break-even rate</td><td>1 + overhead rate</td><td>2.50</td></tr>
<tr><td>Net multiplier</td><td>NOR ÷ direct labor = 2,400,000 ÷ 800,000</td><td>3.00</td></tr>
<tr><td>Profit</td><td>NOR − (direct labor + overhead) = 2,400,000 − 2,000,000</td><td>$400,000</td></tr>
</tbody></table>
<p>The net multiplier (3.00) is above break-even (2.50), so the firm earns about 0.50 × direct labor = $400,000. Profit as a share of NOR is 16.7%.</p>` },
    { h: "Work in progress and backlog", html: `
<ul>
<li><b>Work in progress (WIP)</b> is work performed but not yet billed. A growing WIP balance means invoicing lags the work, which drains cash even when projects are profitable.</li>
<li><b>Backlog</b> is signed work not yet performed. Backlog ÷ monthly net revenue gives the months of work on hand; a falling number warns that utilization will drop unless new work is won.</li>
<li>Use the agreement's payment terms: B101 §11.10.2.1 allows interest on late payments and §9.1 allows suspension after seven days' written notice for nonpayment.</li>
</ul>` },
    { h: "Budgets and the annual plan", html: `
<p>Firms set an annual budget from a target profit: estimate overhead, set a target utilization for each staff level, and compute the billing rates or multipliers needed to cover both plus profit. Mid-year, compare actuals with the budget monthly. If utilization falls, the overhead rate rises (idle salary moves into overhead) and the break-even rate rises with it, so the remedy is usually workload and staffing, not price.</p>` }
  ],
  tips: [
    "Know which number goes on top: utilization = billable ÷ total hours; net multiplier = NOR ÷ direct labor; overhead rate = overhead ÷ direct labor.",
    "NOR excludes consultant costs and reimbursables. If a stem gives gross revenue, subtract them first.",
    "If projects are on budget but the firm is losing money, look at overhead and utilization, not project fees."
  ]
};

ARE.DEEP["pcm-delivery"] = {
  sections: [
    ],
  tips: [
    "A stem that stresses \"owner wants the contractor's pricing and constructability input during design\" points to CM at risk.",
    "\"Single point of responsibility\" is the design-build signal; the architect then works for the design-builder (B143).",
    "Fast-track overlaps design and construction; it saves time but means building from incomplete documents."
  ]
};

ARE.DEEP["pcm-firm"] = {
  sections: [
    { h: "Ownership transition and succession", html: `
<p>Firms plan who will own and lead them next. Common routes are an internal sale to key employees over several years, an employee stock ownership plan (ESOP), a merger with or sale to another firm, or an orderly closure. Each needs a valuation, a timeline and a plan for licensure requirements: most jurisdictions require that a share of owners or the person in responsible charge be licensed. A principal who retires and stops buying professional liability insurance also needs a tail (extended reporting period) for past work.</p>` },
    ],
  tips: [
    "Under QBS, the fee is <b>not</b> a ranking factor; it is negotiated after ranking.",
    "Independent-contractor questions turn on who controls how, when and where the work is done.",
    "A SWOT analysis looks inward (strengths, weaknesses) and outward (opportunities, threats); a go/no-go decision applies it to one pursuit."
  ]
};

ARE.DEEP["pcm-ethics"] = {
  sections: [
    { h: "Situations the exam likes", html: `
<table class="tbl"><thead><tr><th>Situation</th><th>Expected response</th></tr></thead><tbody>
<tr><td>Client insists on a design that violates life-safety code</td><td>Advise in writing; refuse to proceed; where required, report to the building official.</td></tr>
<tr><td>Supplier offers a gift tied to specifying its product</td><td>Decline. Accepting compensation for specifying is prohibited, disclosed or not.</td></tr>
<tr><td>Architect has a financial interest in a product or contractor</td><td>Disclose to the client in writing before acting; let the client decide.</td></tr>
<tr><td>Asked to seal drawings prepared by others outside your control</td><td>Decline. Seal only work prepared under your responsible control.</td></tr>
<tr><td>Owner wants to replace another architect still under contract</td><td>Confirm the first agreement has ended before accepting.</td></tr>
<tr><td>Practicing in a state where you are not licensed</td><td>Do not practice there until licensed. Some jurisdictions let an out-of-state architect (often an NCARB Certificate holder) offer services or compete for a commission first if the board is notified; check that jurisdiction's rules. NCARB certification makes reciprocity easier.</td></tr>
</tbody></table>` },
    { h: "Licensure and the board's role", html: `
<p>Each state or jurisdiction licenses architects and enforces its own rules of conduct, which are often based on the NCARB Model Rules. Boards can reprimand, fine, suspend or revoke a license. Requirements for initial licensure follow NCARB's path: an accredited degree (or an alternative), the Architectural Experience Program (AXP) and the ARE. Continuing education is required to renew in most jurisdictions. An NCARB Certificate makes it easier to obtain reciprocal licenses in other jurisdictions.</p>` }
  ],
  tips: [
    "When several actions sound ethical, choose the one that protects public health, safety and welfare first, then the client's interests.",
    "Disclosure fixes many conflicts, but not compensation for specifying a product, and not a life-safety violation.",
    "The AIA Code binds AIA members; state board rules bind licensees. Stems often test which applies."
  ]
};
ARE.DEEP_TERMS.push(
  ["Responsible control", "Practice", "The amount of control over and detailed knowledge of the work that licensing boards require before an architect may seal it.", "pcm-ethics"],
  ["NCARB Model Rules of Conduct", "Practice", "NCARB's model rules on competence, conflicts of interest, full disclosure, compliance with laws and professional conduct, adopted in whole or part by many boards.", "pcm-ethics"],
  ["AIA Code of Ethics", "Practice", "The AIA's code of canons, ethical standards and rules of conduct; enforceable only against AIA members.", "pcm-ethics"],
  ["Reciprocity", "Practice", "Obtaining a license in another jurisdiction based on an existing license, usually with an NCARB Certificate.", "pcm-ethics"]
);

ARE.DEEP["pcm-fees"] = {
  sections: [
    { h: "Worked fee build-up", html: `
<p>A small clinic needs an estimated 1,400 hours: 200 principal, 500 project architect, 700 staff. Direct salary rates are $90, $55 and $38 per hour. The firm's overhead rate is 1.6 and its target profit is 15% of the fee.</p>
<table class="tbl"><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Direct labor</td><td>200×90 + 500×55 + 700×38</td><td>$72,100</td></tr>
<tr><td>Overhead</td><td>72,100 × 1.6</td><td>$115,360</td></tr>
<tr><td>Cost</td><td>72,100 + 115,360</td><td>$187,460</td></tr>
<tr><td>Fee for 15% profit</td><td>187,460 ÷ (1 − 0.15)</td><td>$220,541</td></tr>
</tbody></table>
<p>Add consultants' fees (with any markup) and reimbursables separately. Check the result top-down against a percentage of construction cost for similar projects; a large gap means the scope or hours need another look.</p>` },
    { h: "Writing the scope so the fee holds", html: `
<p>A fee is only as good as the scope it buys. State the deliverables, the number of design options and meetings, the phases included, and what is excluded (for example, surveys, geotechnical work, LEED documentation, extended construction administration). B101–2017 handles this with Supplemental Services chosen at signing (§4.1) and Additional Services that arise later (§4.2), and it limits construction-phase effort, such as the number of site visits and submittal reviews, so extra effort is compensated (§4.2.3).</p>` }
  ],
  tips: [
    "To get a fee from cost and a profit percentage of the fee, divide by (1 − profit %). Multiplying cost by (1 + profit %) gives profit as a percentage of cost instead.",
    "If the stem gives a multiplier on direct personnel expense, the multiplier covers overhead and profit (benefits are already in DPE). A multiplier on direct salary expense covers benefits, overhead and profit.",
    "Scope exclusions belong in the agreement, not in a later email."
  ]
};
ARE.DEEP_TERMS.push(
  ["Stipulated sum", "Compensation", "A fixed fee for a defined scope; the architect carries the risk of exceeding its own costs.", "pcm-fees"],
  ["Not-to-exceed", "Compensation", "An hourly arrangement with a maximum total the fee cannot pass without the owner's approval.", "pcm-fees"],
  ["Direct personnel expense (DPE)", "Compensation", "Salaries of staff working on the project plus mandatory and customary benefits.", "pcm-fees"],
  ["Supplemental services", "Contracts", "Services beyond basic services that are identified and agreed when the agreement is signed (B101 §4.1).", "pcm-fees"]
);
