/* LESSONS — PcM, PjM, PA
   Original instructional text. Code and contract references cite the
   document and edition; verify against the edition your jurisdiction
   and the current ARE Guidelines reference. */
ARE.LESSONS = ARE.LESSONS || [];

ARE.LESSONS.push({
  id: "pcm-finance", div: "pcm", obj: ["pcm-2.1", "pcm-1.1"], title: "Firm Financial Health",
  minutes: 35, level: "Core",
  summary: "Read a firm's numbers the way NCARB expects: utilization, overhead rate, break-even rate, net multiplier, profit and cash flow.",
  objectives: [
    "Separate gross revenue from net operating revenue and explain why the difference matters.",
    "Calculate utilization rate, overhead rate, break-even rate and net multiplier from given data.",
    "Diagnose a firm's financial problem from a set of metrics and choose the most effective corrective action.",
    "Distinguish cash-basis from accrual-basis accounting and read a balance sheet and income statement at a basic level."
  ],
  why: "Firms rarely fail for lack of design talent; they fail because fees do not cover labor and overhead, or because cash runs out while receivables age. These metrics let an architect price work, staff a project and see trouble early.",
  exam: "Expect quantitative fill-in-the-blank items that give a short data table and ask for one ratio, and A/E items that ask which action would MOST improve profitability. Watch for distractors that use gross revenue where net operating revenue is required.",
  body: `
<h3>Where the money goes</h3>
<p>Every fee a firm collects is split into layers. <strong>Gross revenue</strong> is everything billed, including money that passes straight through the firm: consultant fees and reimbursable expenses (printing, travel, permit fees paid on the client's behalf). Strip those out and you have <strong>net operating revenue (NOR)</strong>, the money the firm actually earns with its own people.</p>
<p>NOR pays for two kinds of cost. <strong>Direct labor</strong> is the salary cost of hours charged to projects. <strong>Indirect expenses (overhead)</strong> are everything else needed to keep the doors open: rent, software, insurance, marketing, and the salary cost of non-billable time (administration, vacation, training). What is left is <strong>profit</strong>.</p>
<div class="callout"><b>Key idea.</b> Direct labor is only the salary for <em>billable</em> hours. When an employee spends a day on a proposal, that day's salary moves into overhead. This is why low utilization raises the overhead rate.</div>

<h3>The four metrics you must know</h3>
<p><strong>Utilization rate</strong> measures how much paid time is charged to projects. Principals often run 40–60%, production staff 85–95%. A firm-wide rate in the 60–70% range is common.</p>
<p><strong>Overhead rate</strong> compares indirect expenses to direct labor. An overhead rate of 1.60 means the firm spends $1.60 on overhead for every $1.00 of billable salary.</p>
<p><strong>Break-even rate</strong> (a multiplier) is what the firm must earn on each dollar of direct labor just to cover that labor plus overhead: 1 + overhead rate.</p>
<p><strong>Net multiplier</strong> (effective multiplier) is what the firm actually earns: NOR divided by direct labor. If the net multiplier exceeds the break-even rate, the firm is profitable on its operations.</p>

<h3>Reading the statements</h3>
<p>The <strong>income statement</strong> (profit and loss) shows revenue and expenses over a period. The <strong>balance sheet</strong> is a snapshot: assets = liabilities + owners' equity. Under <strong>cash-basis</strong> accounting, revenue is recorded when cash arrives and expenses when paid; under <strong>accrual-basis</strong> accounting, revenue is recorded when earned and expenses when incurred. Accrual gives a truer picture of performance; cash basis shows liquidity. Most firms track both.</p>
<p>Two liquidity signals matter on the exam: <strong>accounts receivable aging</strong> (how long clients take to pay; 60–90 days is a warning sign) and the <strong>current ratio</strong> (current assets ÷ current liabilities; above 1.0 means short-term bills can be met).</p>

<h3>Choosing the right fix</h3>
<ul>
<li>Net multiplier below break-even, normal utilization: fees are too low or projects run over budget. Fix pricing and project control.</li>
<li>Low utilization: too much non-billable time or too many staff for the backlog. Fix workload planning before cutting overhead items.</li>
<li>Profitable on paper but short of cash: invoicing is late or receivables are aging. Invoice monthly, follow up at 30 days, consider retainers.</li>
</ul>`,
  diagram: `<svg viewBox="0 0 640 250" role="img" aria-label="Revenue stack: gross revenue minus reimbursables and consultants equals net operating revenue, which covers direct labor, overhead and profit">
<g class="dg-text" font-size="12">
<rect x="20" y="30" width="120" height="190" class="dg-soft"/><text x="80" y="22" text-anchor="middle">Gross revenue</text>
<rect x="20" y="30" width="120" height="40" class="dg-hatch"/><text x="80" y="54" text-anchor="middle">Consultants</text>
<rect x="20" y="70" width="120" height="20" class="dg-hatch"/><text x="80" y="84" text-anchor="middle" font-size="11">Reimbursables</text>
<path d="M150 90 L210 90 M150 220 L210 220" class="dg-line" stroke-dasharray="4 3"/>
<rect x="220" y="90" width="120" height="130" class="dg-soft"/><text x="280" y="82" text-anchor="middle">Net operating revenue</text>
<rect x="400" y="90" width="120" height="22" class="dg-accent2"/><text x="460" y="105" text-anchor="middle">Profit</text>
<rect x="400" y="112" width="120" height="62" class="dg-soft"/><text x="460" y="147" text-anchor="middle">Overhead</text>
<rect x="400" y="174" width="120" height="46" class="dg-accent"/><text x="460" y="201" text-anchor="middle" class="dg-ontint">Direct labor</text>
<path d="M350 90 L390 90 M350 220 L390 220" class="dg-line" stroke-dasharray="4 3"/>
<text x="540" y="201">× 1.00</text><text x="540" y="147">overhead rate</text><text x="540" y="105">net multiplier −</text><text x="540" y="119">break-even</text>
</g></svg>`,
  formulas: [
    { name: "Net operating revenue", f: "NOR = Gross revenue − Reimbursable expenses − Consultant costs" },
    { name: "Utilization rate", f: "Utilization = Billable (direct) hours ÷ Total hours paid" },
    { name: "Overhead rate", f: "OH rate = Indirect expenses ÷ Direct labor expense", note: "Indirect expenses include the salary cost of non-billable time." },
    { name: "Break-even rate", f: "Break-even = (Direct labor + Indirect expenses) ÷ Direct labor = 1 + OH rate" },
    { name: "Net multiplier", f: "Net multiplier = NOR ÷ Direct labor expense" },
    { name: "Profit", f: "Profit = NOR − (Direct labor + Indirect expenses)" }
  ],
  example: { title: "Worked example: a 12-person studio", html: `
<p>Annual data: gross revenue $2,400,000; consultant costs $380,000; reimbursables $70,000; direct labor $560,000; indirect expenses $952,000.</p>
<ol>
<li>NOR = 2,400,000 − 380,000 − 70,000 = <b>$1,950,000</b></li>
<li>Overhead rate = 952,000 ÷ 560,000 = <b>1.70</b></li>
<li>Break-even rate = 1 + 1.70 = <b>2.70</b></li>
<li>Net multiplier = 1,950,000 ÷ 560,000 = <b>3.48</b></li>
<li>Profit = 1,950,000 − (560,000 + 952,000) = <b>$438,000</b> (22.5% of NOR)</li>
</ol>
<p>The firm earns $3.48 for every dollar of billable salary and needs $2.70 to break even, so operations are healthy. If you had used gross revenue, you would have reported a misleading multiplier of 4.29.</p>` },
  mistakes: [
    "Dividing gross revenue by direct labor. Consultant fees and reimbursables are not earned by the firm's staff.",
    "Counting all salaries as direct labor. Only salary for hours charged to projects is direct labor.",
    "Assuming high profit means healthy cash flow. A profitable firm can still miss payroll if receivables age past 90 days.",
    "Treating 'multiplier' in a contract (a billing rate factor) as the same thing as the firm's achieved net multiplier."
  ],
  scenario: { prompt: "Your firm's net multiplier is 2.55 and its break-even rate is 2.80. Utilization is 68%, which is normal for the firm. Projects are routinely finishing 15–20% over their labor budgets. The principal proposes cancelling the training budget to cut overhead. What would you recommend instead, and why?",
    answer: "Overhead is not the main problem: utilization is normal and the gap comes from projects overrunning their labor budgets, which erodes the effective multiplier. The most effective fix is project-level control: build realistic work plans, track hours against budget by phase, catch scope creep and bill additional services. Training is a small overhead item; cutting it barely moves the break-even rate and weakens the firm long term. Re-examine fee proposals as well, since chronic overruns may mean fees are set too low." },
  refs: [
    { t: "NCARB, ARE 5.0 Guidelines — PcM objectives and references list", a: "Free PDF (ncarb.org)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — financial management chapters", a: "Purchase" },
    { t: "AIA Firm Survey Report (benchmark utilization and multipliers)", a: "Purchase / member access" }
  ],
  check: ["q-pcm-01", "q-pcm-02", "q-pcm-03"]
});

ARE.LESSONS.push({
  id: "pcm-risk", div: "pcm", obj: ["pcm-1.3", "pcm-1.4", "pcm-4.1", "pcm-2.2"], title: "Risk, Insurance, Ethics & Business Structure",
  minutes: 40, level: "Core",
  summary: "How a firm protects itself: standard of care, rules of conduct, liability insurance, entity choice and dispute resolution.",
  objectives: [
    "State the standard of care and explain why architects should not warrant perfection.",
    "Distinguish professional liability insurance from general liability and the other common policies.",
    "Explain what claims-made coverage means for retiring principals and closing firms.",
    "Compare business entities and explain what liability protection they do and do not provide.",
    "Apply the NCARB Model Rules of Conduct and AIA Code of Ethics to practice situations."
  ],
  why: "Professional liability is the largest risk an architectural firm carries. The structure of the firm, the language of its contracts and its insurance decide whether a single claim is survivable.",
  exam: "Scenario items describe an ethical dilemma or a contract clause and ask what the architect should do FIRST or which policy responds. Many distractors are actions that sound responsible but exceed the architect's role or raise the standard of care.",
  body: `
<h3>The standard of care</h3>
<p>An architect is expected to perform with the skill and care ordinarily used by other architects practicing under similar circumstances, at the same time and place. It is a standard of reasonableness, not perfection. The 2017 AIA B101 states this standard expressly and lets the parties add more specific performance expectations.</p>
<div class="callout warn"><b>Risk trap.</b> Words like <em>guarantee</em>, <em>warrant</em>, <em>ensure</em>, <em>certify</em> (outside its defined contract meaning) or <em>highest standard</em> raise the bar above the standard of care. Professional liability policies generally exclude liability you assume by contract beyond what you would owe anyway.</div>

<h3>Insurance a firm carries</h3>
<table class="tbl"><thead><tr><th>Policy</th><th>Covers</th><th>Trigger</th></tr></thead><tbody>
<tr><td>Professional liability (E&amp;O)</td><td>Negligent acts, errors or omissions in professional services</td><td>Claims-made</td></tr>
<tr><td>Commercial general liability</td><td>Bodily injury or property damage from non-professional operations (a visitor trips in the office)</td><td>Occurrence</td></tr>
<tr><td>Workers' compensation</td><td>Employee job-related injury; required by state law</td><td>Statutory</td></tr>
<tr><td>Commercial auto</td><td>Vehicles owned or used for business</td><td>Occurrence</td></tr>
<tr><td>Umbrella / excess</td><td>Additional limits above GL and auto (not usually above E&amp;O)</td><td>Follows underlying</td></tr>
<tr><td>Valuable papers / property</td><td>Office contents, records, equipment</td><td>Occurrence</td></tr>
</tbody></table>
<p><strong>Claims-made</strong> means the policy in force when the claim is <em>made</em> responds, not the one in force when the work was done. A firm that stops buying coverage has no protection for past projects unless it buys an <strong>extended reporting period</strong> ("tail"). <strong>Prior acts</strong> coverage protects work performed before the current policy began.</p>

<h3>Time limits on claims</h3>
<p>A <strong>statute of limitations</strong> limits how long after a claim arises (often after discovery of the defect) a suit can be filed. A <strong>statute of repose</strong> sets an outer limit measured from a fixed event, usually substantial completion, regardless of when the defect is found. Both vary by state.</p>

<h3>Business entities</h3>
<table class="tbl"><thead><tr><th>Entity</th><th>Owner liability for business debts</th><th>Taxation</th></tr></thead><tbody>
<tr><td>Sole proprietorship</td><td>Unlimited, personal</td><td>Pass-through</td></tr>
<tr><td>General partnership</td><td>Unlimited, joint and several</td><td>Pass-through</td></tr>
<tr><td>LLP</td><td>Shielded from partners' negligence</td><td>Pass-through</td></tr>
<tr><td>Professional corporation (PC/PA)</td><td>Shielded from business debts</td><td>C or S election</td></tr>
<tr><td>LLC / PLLC</td><td>Shielded from business debts</td><td>Pass-through by default</td></tr>
</tbody></table>
<p>No entity protects an architect from liability for <em>their own</em> professional negligence. The shield covers business debts and, in LLPs, the negligence of other partners. Most jurisdictions also restrict who may own an architecture firm (often a minimum share of licensed owners or a licensed architect in responsible charge); check the jurisdiction's rules.</p>

<h3>Ethics and conduct</h3>
<p>Two codes appear on the exam. The <strong>NCARB Model Rules of Conduct</strong> are the basis for many state boards' enforceable rules: competence, conflict-of-interest disclosure, full disclosure, compliance with laws, and the duty to protect public health, safety and welfare. The <strong>AIA Code of Ethics and Professional Conduct</strong> binds AIA members only. When a client overrules you on a matter that endangers life safety and the building official has not been told, the rules expect you to refuse to proceed and, where required, notify the building official.</p>

<h3>Dispute resolution under AIA documents</h3>
<p>The 2017 AIA family makes <strong>mediation</strong> a condition precedent to binding dispute resolution. In the agreement, the parties select <strong>arbitration</strong>, <strong>litigation</strong> or another method; if they make no selection, disputes go to litigation.</p>`,
  diagram: `<svg viewBox="0 0 640 170" role="img" aria-label="Timeline comparing claims-made coverage: work done in 2020, policy lapses 2024, claim made 2026 has no coverage without tail">
<g class="dg-text" font-size="12">
<line x1="30" y1="90" x2="610" y2="90" class="dg-line"/>
<g><line x1="80" y1="80" x2="80" y2="100" class="dg-line"/><text x="80" y="118" text-anchor="middle">2020</text><text x="80" y="70" text-anchor="middle">Design work</text></g>
<g><line x1="300" y1="80" x2="300" y2="100" class="dg-line"/><text x="300" y="118" text-anchor="middle">2024</text><text x="300" y="70" text-anchor="middle">Firm closes, policy ends</text></g>
<g><line x1="520" y1="80" x2="520" y2="100" class="dg-line"/><text x="520" y="118" text-anchor="middle">2026</text><text x="520" y="70" text-anchor="middle">Claim made</text></g>
<rect x="80" y="130" width="220" height="14" class="dg-accent"/><text x="190" y="160" text-anchor="middle">Policy in force</text>
<rect x="300" y="130" width="250" height="14" class="dg-hatch"/><text x="425" y="160" text-anchor="middle">Covered only if a tail (ERP) was purchased</text>
</g></svg>`,
  formulas: [],
  example: { title: "Applying it: the 'guarantee' clause", html: `<p>A client's contract says the architect "warrants that the documents will be free of errors and will comply with all applicable codes." The architect should strike or revise the clause to the standard of care (for example, "will use reasonable care to comply with applicable codes as interpreted by the authority having jurisdiction at the time of submission"). As written, it creates an express warranty that insurance will likely not cover.</p>` },
  mistakes: [
    "Believing an LLC or PC protects you from your own negligent design. It does not.",
    "Choosing general liability coverage for a design error claim. Design errors fall under professional liability.",
    "Forgetting that claims-made coverage ends when the policy ends. Retirement and firm closure require a tail.",
    "Treating the AIA Code of Ethics as binding on non-members. State board rules (often based on the NCARB Model Rules) bind licensees."
  ],
  scenario: { prompt: "During DD, the owner directs you to remove a required exit stair to gain leasable area and says the building department 'never checks that.' What do you do?",
    answer: "Explain in writing that removing the stair violates the code and endangers occupants. Offer code-compliant alternatives that recover area. If the owner insists, you must refuse to produce non-compliant documents; the rules of conduct put public safety first, and you may need to withdraw from the project. Document the exchange. Producing the documents and noting the owner's direction does not relieve you of responsibility." },
  refs: [
    { t: "AIA B101–2017, Standard Form of Agreement Between Owner and Architect (standard of care, Art. 2; dispute resolution, Art. 8)", a: "Purchase; sample previews on AIA Contract Documents site" },
    { t: "NCARB Model Rules of Conduct (current edition)", a: "Free (ncarb.org)" },
    { t: "AIA Code of Ethics and Professional Conduct", a: "Free (aia.org)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — risk management", a: "Purchase" }
  ],
  check: ["q-pcm-04", "q-pcm-05", "q-pcm-06"],
  canada: "In Ontario, firms practice under a Certificate of Practice from the OAA and must carry professional liability insurance through Pro-Demnity Insurance Company. The ARE tests US practice; do not substitute Ontario rules on the exam."
});

ARE.LESSONS.push({
  id: "pcm-delivery", div: "pcm", obj: ["pcm-3.2", "pcm-3.3", "pcm-3.1"], title: "Compensation Methods & Project Delivery",
  minutes: 30, level: "Core",
  summary: "Match the fee structure and delivery method to the client's priorities and understand who carries which risk.",
  objectives: [
    "Compare stipulated sum, percentage of construction cost, hourly, multiple-of-direct-personnel-expense and unit-cost compensation.",
    "Compare design-bid-build, CM as adviser, CM at risk, design-build and integrated project delivery.",
    "Identify which party carries cost, schedule and design risk under each method."
  ],
  why: "The way a firm is paid and the way a project is delivered decide how much risk the architect carries, how much control the owner keeps, and how early the contractor's knowledge enters the design.",
  exam: "Items describe an owner's priorities (fixed price early, fastest schedule, single point of responsibility, unclear scope) and ask for the best fit. Know the trade-offs, not just definitions.",
  body: `
<h3>Compensation methods</h3>
<table class="tbl"><thead><tr><th>Method</th><th>Best when</th><th>Architect's risk</th></tr></thead><tbody>
<tr><td>Stipulated sum (lump sum)</td><td>Scope is well defined</td><td>High: overruns come out of profit</td></tr>
<tr><td>Percentage of construction cost</td><td>Traditional building types; fee scales with size</td><td>Moderate; perceived conflict of interest when cost rises</td></tr>
<tr><td>Hourly / time and materials</td><td>Scope unclear (feasibility, programming, existing buildings)</td><td>Low; owner often sets a not-to-exceed cap</td></tr>
<tr><td>Multiple of direct personnel expense (DPE)</td><td>Hourly variant: salary + benefits × multiplier</td><td>Low</td></tr>
<tr><td>Unit cost (per square foot, per room)</td><td>Repetitive work: prototypes, multi-unit housing</td><td>Moderate</td></tr>
</tbody></table>
<p><strong>Reimbursable expenses</strong> (printing, travel, permit fees) are typically billed at cost or cost plus a small markup, as the agreement states. <strong>Additional services</strong> are outside basic services and require the owner's written authorization before you perform them.</p>

<h3>Delivery methods</h3>
<table class="tbl"><thead><tr><th>Method</th><th>Contracts</th><th>Strengths</th><th>Weaknesses</th></tr></thead><tbody>
<tr><td>Design-bid-build</td><td>Owner–architect; owner–contractor (after bid)</td><td>Competitive price, complete documents, clear roles</td><td>Longest; no contractor input during design; adversarial</td></tr>
<tr><td>CM as adviser (agency)</td><td>Owner–CM (adviser); owner holds trade contracts</td><td>Cost and schedule advice; owner control</td><td>Owner carries cost risk; more contracts to manage</td></tr>
<tr><td>CM at risk (CMc)</td><td>Owner–CM; CM holds trade contracts; GMP</td><td>Early cost input, fast-track possible, GMP</td><td>GMP set on incomplete documents adds contingency</td></tr>
<tr><td>Design-build</td><td>Owner–design-builder; architect usually works for the design-builder</td><td>Single point of responsibility, speed</td><td>Owner loses direct line to the architect; quality depends on criteria</td></tr>
<tr><td>Integrated project delivery</td><td>Multi-party agreement; shared risk and reward</td><td>Collaboration, early knowledge, aligned incentives</td><td>Requires experienced, trusting team; legal complexity</td></tr>
</tbody></table>
<p><strong>Fast-track</strong> is a scheduling technique, not a delivery method: construction of early packages (site work, foundations) begins before later documents are finished. It is easiest under CM at risk or design-build.</p>`,
  diagram: `<svg viewBox="0 0 640 210" role="img" aria-label="Contract relationships in design-bid-build and design-build">
<g class="dg-text" font-size="12">
<text x="150" y="20" text-anchor="middle" font-weight="600">Design-bid-build</text>
<rect x="100" y="34" width="100" height="32" class="dg-accent"/><text x="150" y="55" text-anchor="middle" class="dg-ontint">Owner</text>
<rect x="20" y="130" width="110" height="32" class="dg-soft"/><text x="75" y="151" text-anchor="middle">Architect</text>
<rect x="170" y="130" width="110" height="32" class="dg-soft"/><text x="225" y="151" text-anchor="middle">Contractor</text>
<line x1="130" y1="66" x2="80" y2="130" class="dg-line"/><line x1="170" y1="66" x2="220" y2="130" class="dg-line"/>
<line x1="130" y1="146" x2="170" y2="146" class="dg-line" stroke-dasharray="4 3"/>
<text x="150" y="190" text-anchor="middle" font-size="11">Dashed: no contract, communication only</text>
<text x="480" y="20" text-anchor="middle" font-weight="600">Design-build</text>
<rect x="430" y="34" width="100" height="32" class="dg-accent"/><text x="480" y="55" text-anchor="middle" class="dg-ontint">Owner</text>
<rect x="415" y="92" width="130" height="32" class="dg-soft"/><text x="480" y="113" text-anchor="middle">Design-builder</text>
<rect x="360" y="152" width="110" height="32" class="dg-soft"/><text x="415" y="173" text-anchor="middle">Architect</text>
<rect x="490" y="152" width="110" height="32" class="dg-soft"/><text x="545" y="173" text-anchor="middle">Trades</text>
<line x1="480" y1="66" x2="480" y2="92" class="dg-line"/><line x1="460" y1="124" x2="425" y2="152" class="dg-line"/><line x1="500" y1="124" x2="535" y2="152" class="dg-line"/>
</g></svg>`,
  formulas: [
    { name: "Billing rate (DPE method)", f: "Billing rate = DPE hourly cost × multiplier", note: "DPE = salary + mandatory and customary benefits." },
    { name: "Percentage fee", f: "Fee = Construction cost × fee percentage" }
  ],
  example: { title: "Applying it", html: `<p>A school board must open a new wing for the September term and wants a guaranteed price before construction starts, with builder input on phasing. The best fit is <b>CM at risk</b>: the CM joins during design, prices early packages, provides a GMP and can fast-track. Design-bid-build is too slow; design-build would cut the board's direct relationship with the architect, which many public owners want to keep.</p>` },
  mistakes: [
    "Calling fast-track a delivery method. It is a scheduling approach used within several methods.",
    "Assuming the architect manages the CM's trade contractors under CM at risk. The CM holds those contracts.",
    "Agreeing to a stipulated sum for an undefined existing-building study. Use hourly with a cap."
  ],
  scenario: { prompt: "A developer client has a fixed land-closing date and wants one contract and one party responsible for both design and construction. Which delivery method fits, and what changes for you?",
    answer: "Design-build. You will likely contract with the design-builder instead of the owner, so your duty of loyalty and lines of communication run through the design-builder. Confirm your agreement addresses standard of care, payment and who owns the instruments of service, and that the owner's performance criteria are clear." },
  refs: [
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project delivery and compensation", a: "Purchase" },
    { t: "AIA Document Synopses (A101, A133, A141, A195, B101, B133, B143)", a: "Free (aiacontracts.com)" }
  ],
  check: ["q-pcm-07", "q-pcm-08", "q-pcm-09"]
});

ARE.LESSONS.push({
  id: "pjm-schedule", div: "pjm", obj: ["pjm-2.1", "pjm-2.2", "pjm-4.1"], title: "Work Plans, Scheduling & Budget Tracking",
  minutes: 40, level: "Core",
  summary: "Turn a fee into a staffed work plan, build a critical path schedule and track progress with earned value.",
  objectives: [
    "Allocate a fee across phases and convert phase fees into staff hours.",
    "Calculate a critical path, early and late dates and total float.",
    "Use earned value (PV, EV, AC, CPI, SPI) to judge whether a project is over budget or behind schedule."
  ],
  why: "Most project losses start in the first week, when a fee is accepted without a work plan to test it. A schedule with a known critical path shows which delays actually move the finish date.",
  exam: "Expect a CPM network or activity table with durations and a question asking for the project duration, the float on an activity, or the effect of a delay. Budget items often give hours spent and percent complete and ask for the projected overrun.",
  body: `
<h3>From fee to hours</h3>
<p>Start with the total fee, remove consultant fees and reimbursables, then remove target profit. What remains is the labor budget. A common traditional split for basic services is <strong>Schematic Design 15%, Design Development 20%, Construction Documents 40%, Bidding/Negotiation 5%, Construction Administration 20%</strong>. Firms adjust this to the project; renovation work, for example, often shifts effort earlier into existing-condition investigation.</p>
<p>Divide each phase's labor dollars by a blended <strong>billing rate</strong> to get hours, then assign those hours to staff by role and week.</p>

<h3>The critical path method (CPM)</h3>
<p>List activities, durations and dependencies. The <strong>forward pass</strong> finds each activity's early start (ES) and early finish (EF = ES + duration); an activity's ES is the latest EF of its predecessors. The <strong>backward pass</strong> finds late finish (LF) and late start (LS = LF − duration); an activity's LF is the earliest LS of its successors. <strong>Total float</strong> = LS − ES. Activities with zero float form the <strong>critical path</strong>, the longest path through the network, which sets the project duration.</p>
<div class="callout"><b>Exam shortcut.</b> For small networks, list every path from start to finish and add durations. The longest path is critical. Float on any activity = critical path length − longest path through that activity.</div>
<p><strong>Gantt (bar) charts</strong> communicate a schedule clearly but hide dependencies. <strong>Milestones</strong> are zero-duration events (permit received, owner approval of DD). <strong>Fast-tracking</strong> overlaps sequential activities; <strong>crashing</strong> adds resources to critical activities to shorten them at extra cost.</p>

<h3>Earned value</h3>
<p><strong>Planned value (PV)</strong> is the budget for work scheduled to date. <strong>Earned value (EV)</strong> is the budget for work actually completed (budget × percent complete). <strong>Actual cost (AC)</strong> is what was spent. If CPI = EV ÷ AC is below 1.0, the work is costing more than planned; if SPI = EV ÷ PV is below 1.0, it is behind schedule. A simple projection of final cost is <strong>EAC = BAC ÷ CPI</strong>.</p>`,
  diagram: `<svg viewBox="0 0 640 220" role="img" aria-label="CPM network. Path A-B-D is 14 days and critical; A-C-D is 11 days; C has 3 days float">
<g class="dg-text" font-size="12">
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="dg-arrowhead"/></marker></defs>
<rect x="20" y="90" width="100" height="44" class="dg-accent"/><text x="70" y="108" text-anchor="middle" class="dg-ontint">A  Survey</text><text x="70" y="124" text-anchor="middle" class="dg-ontint">4 d</text>
<rect x="200" y="30" width="110" height="44" class="dg-accent"/><text x="255" y="48" text-anchor="middle" class="dg-ontint">B  Program</text><text x="255" y="64" text-anchor="middle" class="dg-ontint">6 d · float 0</text>
<rect x="200" y="150" width="110" height="44" class="dg-soft"/><text x="255" y="168" text-anchor="middle">C  Code review</text><text x="255" y="184" text-anchor="middle">3 d · float 3</text>
<rect x="400" y="90" width="110" height="44" class="dg-accent"/><text x="455" y="108" text-anchor="middle" class="dg-ontint">D  Concept</text><text x="455" y="124" text-anchor="middle" class="dg-ontint">4 d</text>
<path d="M120 104 L200 56" class="dg-line" marker-end="url(#arr)"/><path d="M120 120 L200 170" class="dg-line" marker-end="url(#arr)"/>
<path d="M310 56 L400 104" class="dg-line" marker-end="url(#arr)"/><path d="M310 170 L400 120" class="dg-line" marker-end="url(#arr)"/>
<text x="530" y="108">Critical path</text><text x="530" y="124">A–B–D = 14 d</text>
</g></svg>`,
  formulas: [
    { name: "Phase labor budget", f: "Labor budget = (Fee − Consultants − Reimbursables) × (1 − target profit %)" },
    { name: "Hours available", f: "Hours = Phase labor budget ÷ blended billing rate" },
    { name: "Total float", f: "TF = LS − ES = LF − EF" },
    { name: "Cost performance index", f: "CPI = EV ÷ AC" },
    { name: "Schedule performance index", f: "SPI = EV ÷ PV" },
    { name: "Estimate at completion", f: "EAC = BAC ÷ CPI" }
  ],
  example: { title: "Worked example: is DD over budget?", html: `<p>The DD phase budget (BAC) is $60,000. Today the plan called for 50% completion (PV = $30,000). The team reports 40% complete (EV = $24,000) and has spent $32,000 (AC).</p>
<ul><li>CPI = 24,000 ÷ 32,000 = <b>0.75</b>: each dollar spent produces 75 cents of planned work.</li>
<li>SPI = 24,000 ÷ 30,000 = <b>0.80</b>: behind schedule.</li>
<li>EAC = 60,000 ÷ 0.75 = <b>$80,000</b>, a projected $20,000 overrun.</li></ul>
<p>Next step: find the cause (scope growth, rework from late consultant input, owner changes). If scope grew, document it and request an additional-services authorization.</p>` },
  mistakes: [
    "Using hours spent as the measure of progress. Progress is percent of work complete, judged against deliverables.",
    "Assuming any delayed activity delays the project. Only delays beyond an activity's float extend the finish.",
    "Computing percent complete as AC ÷ BAC. That measures spending, not progress."
  ],
  scenario: { prompt: "Using the diagram, the code review (C) slips by 2 days because the plans examiner is out. Does the concept submission date move?",
    answer: "No. Activity C has 3 days of total float, so a 2-day slip is absorbed. Path A–C–D becomes 13 days, still shorter than the 14-day critical path A–B–D. A slip of more than 3 days would make A–C–D critical and push the finish." },
  refs: [
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project management", a: "Purchase" },
    { t: "PMI, A Guide to the Project Management Body of Knowledge (earned value concepts)", a: "Purchase; free to PMI members" }
  ],
  check: ["q-pjm-01", "q-pjm-02", "q-pjm-03"]
});

ARE.LESSONS.push({
  id: "pjm-contracts", div: "pjm", obj: ["pjm-3.1", "pjm-3.3", "pjm-3.2", "pjm-4.2"], title: "The AIA Contract Family on a Project",
  minutes: 40, level: "Core",
  summary: "How B101, A101/A201 and C401 fit together, what each requires of the architect, and how to handle scope changes.",
  objectives: [
    "Identify the agreements that bind owner, architect, contractor and consultants.",
    "Describe the architect's basic services by phase under B101–2017.",
    "Explain flow-down (consistency) between B101 and C401.",
    "Handle additional services and owner-requested changes correctly."
  ],
  why: "Every architect's obligation on a project comes from a contract. Knowing which document governs a question is half of answering it.",
  exam: "PjM's largest section is Contracts (25–31%). Items quote or paraphrase a contract requirement and ask what the architect must do, or describe a situation and ask which document controls.",
  body: `
<h3>The family</h3>
<table class="tbl"><thead><tr><th>Document</th><th>Parties / role</th></tr></thead><tbody>
<tr><td>B101</td><td>Owner–Architect agreement (design-bid-build and similar)</td></tr>
<tr><td>A101 / A102 / A103</td><td>Owner–Contractor agreement: stipulated sum / cost plus fee with GMP / cost plus fee without GMP</td></tr>
<tr><td>A201</td><td>General Conditions of the Contract for Construction; defines the architect's construction-phase role</td></tr>
<tr><td>C401</td><td>Architect–Consultant agreement</td></tr>
<tr><td>A701</td><td>Instructions to Bidders</td></tr>
<tr><td>G-series</td><td>Forms: G701 Change Order, G702/G703 Payment Application and Continuation Sheet, G704 Substantial Completion, G710 ASI, G714 CCD</td></tr>
</tbody></table>
<p>The architect is <strong>not a party</strong> to the owner–contractor agreement, but A201 assigns the architect duties as the owner's representative during construction, and B101 obligates the architect to perform them. Make sure the two documents describe the same role; AIA coordinates them by edition, so use matching editions (for example, all 2017).</p>

<h3>Basic services by phase (B101–2017)</h3>
<ul>
<li><strong>Schematic Design:</strong> evaluate the program, schedule and budget; prepare a preliminary evaluation and design options; consider sustainable design alternatives; submit an estimate of the Cost of the Work.</li>
<li><strong>Design Development:</strong> fix and describe size and character: structural, MEP and materials; update the cost estimate.</li>
<li><strong>Construction Documents:</strong> drawings and specifications for construction; assist the owner with bidding documents; update the estimate.</li>
<li><strong>Procurement:</strong> assist in obtaining bids or negotiated proposals, issue addenda, respond to bidder questions.</li>
<li><strong>Construction:</strong> administer the contract per A201: site visits, certificates for payment, submittal review, RFIs, changes, substantial and final completion.</li>
</ul>

<h3>Consultant agreements</h3>
<p>C401 is written to be consistent with B101. The architect's consultants owe the architect the services the architect owes the owner for that discipline, on the same terms. When you negotiate B101, check that you can flow those terms down: insurance limits, schedule, ownership of documents and dispute resolution.</p>

<h3>Changes in scope</h3>
<p>Owner-requested work beyond basic services is an <strong>additional service</strong>. Before you start, notify the owner in writing, describe the service and its effect on compensation and schedule, and obtain written authorization. Doing the work first and asking later is how fees disappear.</p>`,
  diagram: "",
  formulas: [],
  example: { title: "Applying it", html: `<p>Midway through CDs, the owner asks for a second interior finish scheme for comparison. This exceeds basic services. Send a written notice describing the extra work, its fee and its schedule impact, and wait for written approval. Keep working on the base scope in the meantime.</p>` },
  mistakes: [
    "Thinking the architect signs A101. The owner and contractor sign it; the architect's role comes from A201 and B101.",
    "Mixing editions (B101–2017 with A201–2007). Definitions and section references no longer line up.",
    "Starting additional services on a verbal request."
  ],
  scenario: { prompt: "Your MEP engineer's C401 limits their insurance to $1M, but your B101 promises the owner $2M of professional liability coverage from the architect and its consultants. What should you have done?",
    answer: "Coordinated the agreements before signing: require the consultant to carry the same limits (and confirm they can), or negotiate the owner requirement down. The C401 should mirror the B101 obligations for that discipline so the architect is not left holding an uncovered gap." },
  refs: [
    { t: "AIA B101–2017 and A201–2017", a: "Purchase; sample previews free on aiacontracts.com" },
    { t: "AIA C401–2017", a: "Purchase" },
    { t: "AIA Document Commentaries (A201–2017, B101–2017)", a: "Free PDFs (aiacontracts.com)" }
  ],
  check: ["q-pjm-04", "q-pjm-05", "q-pjm-06"],
  canada: "Your day-to-day CCDC 2 (stipulated price) and RAIC Document Six play roles similar to A101/A201 and B101, but terms differ (for example, CCDC's 'Consultant' and 'Change Directive'). Answer exam items using AIA terms."
});

ARE.LESSONS.push({
  id: "pa-zoning", div: "pa", obj: ["pa-2.2", "pa-2.3", "pa-2.1", "pa-3.1"], title: "Zoning & Site Constraints",
  minutes: 35, level: "Core",
  summary: "Find the buildable envelope: setbacks, coverage, FAR, height, parking, easements and the forms of zoning relief.",
  objectives: [
    "Calculate floor area ratio, lot coverage and maximum buildable area.",
    "Locate the buildable area from setbacks and easements.",
    "Distinguish variances, special use permits, rezoning and nonconforming uses.",
    "Compare Euclidean and form-based zoning."
  ],
  why: "Zoning decides how much building a site can hold before any design starts. A feasibility study that misses a setback or an easement fails at permit, after the owner has bought the land.",
  exam: "Quantitative items give lot dimensions, setbacks and FAR and ask for the maximum floor area or number of floors. Case studies hide the critical number in a zoning excerpt.",
  body: `
<h3>The controls</h3>
<ul>
<li><strong>Setbacks:</strong> minimum distances from property lines to the building. Front, side and rear setbacks differ by district.</li>
<li><strong>Lot coverage:</strong> maximum percentage of the lot covered by building footprint.</li>
<li><strong>Floor area ratio (FAR):</strong> total gross floor area ÷ lot area. FAR 2.0 on a 10,000 sf lot allows 20,000 sf of floor area in any combination of footprint and stories, subject to the other limits.</li>
<li><strong>Height:</strong> maximum height in feet or stories, measured as the ordinance defines it (often to the roof deck or to the midpoint of a pitched roof).</li>
<li><strong>Parking and loading:</strong> minimum (sometimes maximum) spaces by use and area.</li>
<li><strong>Bulk plane / daylight plane:</strong> an inclined plane that the building must stay under, protecting light to the street or neighbors.</li>
</ul>
<p>The governing limit is whichever control produces the smallest building. Always run every control.</p>

<h3>Easements and other legal constraints</h3>
<p>An <strong>easement</strong> gives someone else a right to use part of the land (a utility corridor, shared driveway, access to a landlocked lot). You generally cannot build permanent structures within it. <strong>Deed restrictions and covenants</strong> are private limits that can be stricter than zoning.</p>

<h3>Relief from zoning</h3>
<table class="tbl"><thead><tr><th>Tool</th><th>What it does</th></tr></thead><tbody>
<tr><td>Variance (area/dimensional)</td><td>Relief from a dimensional rule (setback, height) because of a hardship unique to the property. Granted by the zoning board of appeals.</td></tr>
<tr><td>Use variance</td><td>Permits a use the district does not allow; harder to get, and not available in some jurisdictions.</td></tr>
<tr><td>Special / conditional use permit</td><td>A use the ordinance lists as allowed with review and conditions.</td></tr>
<tr><td>Rezoning (map amendment)</td><td>Changes the district designation; a legislative act.</td></tr>
<tr><td>Legal nonconforming use</td><td>A use or building that was lawful before the current rules; usually may continue but not expand, and may lose status if abandoned.</td></tr>
<tr><td>Planned unit development (PUD)</td><td>Negotiated site-specific rules for a large development.</td></tr>
</tbody></table>
<p><strong>Euclidean zoning</strong> separates land by use. <strong>Form-based codes</strong> regulate building form, frontage and relationship to the street more than use. <strong>Overlay districts</strong> add rules (historic, flood, airport) on top of the base district.</p>`,
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="Lot plan with front, side and rear setbacks and a utility easement reducing the buildable area">
<g class="dg-text" font-size="12">
<rect x="120" y="20" width="400" height="200" class="dg-soft"/>
<rect x="160" y="50" width="320" height="120" class="dg-accent" opacity=".85"/>
<rect x="440" y="50" width="40" height="120" class="dg-hatch"/>
<text x="300" y="115" text-anchor="middle" class="dg-ontint">Buildable area</text>
<text x="460" y="40" text-anchor="middle" font-size="11">Easement</text>
<text x="320" y="240" text-anchor="middle">Street (front)</text>
<line x1="300" y1="170" x2="300" y2="220" class="dg-line" stroke-dasharray="3 3"/><text x="306" y="200">Front 50′</text>
<line x1="300" y1="20" x2="300" y2="50" class="dg-line" stroke-dasharray="3 3"/><text x="306" y="40">Rear 30′</text>
<line x1="120" y1="110" x2="160" y2="110" class="dg-line" stroke-dasharray="3 3"/><text x="20" y="114">Side 40′</text>
<text x="530" y="114">Side 40′</text>
</g></svg>`,
  formulas: [
    { name: "Floor area ratio", f: "FAR = Gross floor area ÷ Lot area" },
    { name: "Maximum floor area", f: "Max GFA = FAR × Lot area" },
    { name: "Lot coverage", f: "Coverage = Footprint ÷ Lot area" },
    { name: "Stories needed", f: "Stories = Required GFA ÷ Allowed footprint (round up)" }
  ],
  example: { title: "Worked example", html: `<p>Lot 120′ × 200′ (24,000 sf). FAR 1.5, maximum coverage 40%, height limit 3 stories. Setbacks: front 25′, rear 20′, sides 10′.</p>
<ul><li>FAR limit: 1.5 × 24,000 = <b>36,000 sf</b>.</li>
<li>Coverage limit: 0.40 × 24,000 = 9,600 sf footprint.</li>
<li>Setback envelope: (120 − 20) × (200 − 45) = 100 × 155 = 15,500 sf, so coverage governs the footprint at 9,600 sf.</li>
<li>Height limit: 3 × 9,600 = 28,800 sf.</li></ul>
<p>Maximum buildable floor area = <b>28,800 sf</b>. Height, not FAR, governs.</p>` },
  mistakes: [
    "Stopping after FAR. Coverage and height can govern, as in the example.",
    "Calling a nonconforming use 'illegal'. It was legal when established and is protected within limits.",
    "Applying for a variance when the use is listed as conditional. A conditional use needs a special use permit, not a variance."
  ],
  scenario: { prompt: "A client wants to add a second floor to a 1950s store that sits 5′ from the street where the current front setback is 20′. What must you check first?",
    answer: "The building is likely a legal nonconforming structure. Check how the ordinance treats expansion of nonconforming structures: many allow vertical additions only within the current setbacks, or require the addition to meet current setbacks, or require a variance. Confirm with the zoning administrator before design." },
  refs: [
    { t: "The local zoning ordinance governing the site (jurisdiction-specific)", a: "Usually free online" },
    { t: "AIA, The Architect's Handbook of Professional Practice — site analysis and zoning", a: "Purchase" },
    { t: "American Planning Association, Planning and Urban Design Standards", a: "Purchase" }
  ],
  check: ["q-pa-01", "q-pa-02", "q-pa-03"]
});

ARE.LESSONS.push({
  id: "pa-program", div: "pa", obj: ["pa-4.3", "pa-4.4", "pa-4.1", "pa-1.1", "pa-1.2", "pa-3.2"], title: "Programming, Climate & Site Analysis",
  minutes: 40, level: "Core",
  summary: "Turn net space needs into gross area, map adjacencies, and read climate, sun, wind and slope for design decisions.",
  objectives: [
    "Convert net assignable area to gross area with an efficiency ratio or grossing factor.",
    "Build and read an adjacency matrix and bubble diagram.",
    "Orient a building and its shading for sun path and prevailing winds in the northern hemisphere.",
    "Calculate slope percentage and judge suitability for buildings, parking and accessible routes."
  ],
  why: "Programming sets the size and cost of the project; site analysis sets where it goes and how it sits. Errors here cascade into every later phase.",
  exam: "Calculation items ask for gross area from a program, or slope between contours. A/E items give a climate and ask for the best massing, glazing or shading strategy.",
  body: `
<h3>Net to gross</h3>
<p><strong>Net assignable area</strong> is space used for the program (offices, classrooms). <strong>Gross area</strong> adds circulation, walls, mechanical rooms, shafts, washrooms and other support. The <strong>efficiency ratio</strong> is net ÷ gross. Offices commonly run 0.65–0.80; hospitals and laboratories run lower because of heavy services.</p>
<div class="callout"><b>Two ways to say it.</b> An efficiency of 0.70 means gross = net ÷ 0.70 (net × 1.43). A "30% grossing factor" can mean net × 1.30, which gives a smaller building. Read the question for which definition it uses.</div>

<h3>Relationships</h3>
<p>An <strong>adjacency matrix</strong> rates the required closeness of each pair of spaces (essential, desirable, neutral, undesirable). A <strong>bubble diagram</strong> draws those relationships at rough scale. <strong>Blocking and stacking</strong> diagrams then assign departments to floors.</p>

<h3>Sun and shading (northern hemisphere)</h3>
<ul>
<li>Elongate the building east–west so the long faces face north and south.</li>
<li><strong>South</strong> glazing takes low winter sun and is easy to shade from high summer sun with <strong>horizontal overhangs</strong>.</li>
<li><strong>East and west</strong> glazing receives low-angle sun that overhangs do not block; use <strong>vertical fins</strong>, recessed glazing, or minimize glazing. West is the worst for overheating because afternoon sun adds to the day's peak air temperature.</li>
<li><strong>North</strong> glazing gives even, glare-free daylight with little solar gain.</li>
</ul>
<p>Climate type sets priorities: hot-humid climates favor shading and cross-ventilation with light construction; hot-arid climates favor thermal mass and courtyards; cold climates favor compact forms, solar gain and wind protection.</p>

<h3>Slope and drainage</h3>
<p>Slope % = vertical rise ÷ horizontal distance × 100. Rough guidance: under about 5% suits most building and parking; 5–10% needs some grading; 10–15% suits stepped buildings; steeper slopes are costly to build on. Accessible routes are limited to 1:20 (5%) without being a ramp; ramps are limited to 1:12 (8.33%). On a topographic map, contour lines close together mean steep; contours pointing uphill mark a valley (drainage path), pointing downhill a ridge.</p>`,
  diagram: `<svg viewBox="0 0 640 230" role="img" aria-label="Section showing summer sun blocked by a south overhang and winter sun admitted">
<g class="dg-text" font-size="12">
<line x1="40" y1="200" x2="600" y2="200" class="dg-line"/>
<rect x="300" y="80" width="200" height="120" class="dg-soft"/>
<line x1="300" y1="80" x2="250" y2="80" class="dg-line" stroke-width="4"/>
<line x1="300" y1="95" x2="300" y2="185" class="dg-accentline" stroke-width="5"/>
<path d="M120 20 L300 92" class="dg-sun" stroke-dasharray="6 4"/><text x="110" y="16">Summer sun (high)</text>
<path d="M60 150 L300 175" class="dg-sun"/><text x="40" y="142">Winter sun (low)</text>
<text x="252" y="74" font-size="11">Overhang</text><text x="310" y="140">Interior</text>
<text x="230" y="220">South</text><text x="520" y="220">North</text>
</g></svg>`,
  formulas: [
    { name: "Gross from efficiency", f: "Gross area = Net area ÷ Efficiency ratio" },
    { name: "Efficiency ratio", f: "Efficiency = Net assignable area ÷ Gross area" },
    { name: "Slope", f: "Slope % = Rise ÷ Run × 100" },
    { name: "Slope ratio", f: "1 : n  →  % = 100 ÷ n (1:12 = 8.33%)" }
  ],
  example: { title: "Worked example", html: `<p>A library program totals 18,200 net sf. The target efficiency is 0.70. Gross = 18,200 ÷ 0.70 = <b>26,000 gsf</b>. At a budget of $425/sf, construction cost is about $11.05 million.</p>
<p>Two contours 2′ apart are 40′ apart on plan: slope = 2 ÷ 40 × 100 = <b>5%</b>, the upper limit for an accessible walk that is not a ramp.</p>` },
  mistakes: [
    "Multiplying net by the efficiency ratio instead of dividing.",
    "Using horizontal overhangs on west glazing. Low afternoon sun passes under them.",
    "Reading contour spacing backwards. Close contours are steep."
  ],
  scenario: { prompt: "A clinic in a hot-humid climate has its long facade facing west because of the lot shape. What can you do?",
    answer: "Reduce west glazing and place service spaces (storage, stairs, washrooms) on the west as a buffer. Where glazing is needed, use vertical fins or deep recesses, high-performance low-SHGC glass and exterior shading. Orient roof forms and openings to catch prevailing breezes, and plant shade trees on the west side." },
  refs: [
    { t: "Pena & Parshall, Problem Seeking: An Architectural Programming Primer, 5th ed.", a: "Purchase" },
    { t: "Brown & DeKay, Sun, Wind & Light, 3rd ed.", a: "Purchase" },
    { t: "2010 ADA Standards for Accessible Design (§402–405 accessible routes, ramps)", a: "Free (ada.gov)" }
  ],
  check: ["q-pa-04", "q-pa-05", "q-pa-06"]
});
