/* Round 3 dedicated lessons (v11). Original explanations. AIA sections checked against the user's 2017 copies.
   Accessibility references are to the 2010 ADA Standards for Accessible Design; codes to the 2021 IBC unless stated. */

ARE.LESSONS.push({
  id: "pcm-fees", div: "pcm", obj: ["pcm-3.1", "pcm-3.2", "pcm-2.1"], title: "Fee Proposals & Compensation Methods",
  minutes: 35, level: "Core",
  summary: "How to build a fee from the bottom up, check it from the top down, and choose a compensation method that fits the scope and the risk.",
  objectives: [
    "Build a fee from a work plan: hours, rates, consultants, expenses and profit.",
    "Convert salary to billing rates using direct personnel expense and multipliers.",
    "Compare stipulated sum, percentage, hourly and unit compensation.",
    "Recognize fee risks: undefined scope, long schedules and reimbursables."
  ],
  why: "A fee that does not cover the work cannot be fixed later. Most unprofitable projects were lost at the proposal stage.",
  exam: "Expect calculations (billing rate, fee from hours, percentage fees) and scenarios asking which compensation method suits a situation.",
  body: `
<h3>Bottom-up: from the work plan</h3>
<ol>
<li>List tasks by phase and estimate hours by staff level.</li>
<li>Multiply hours by billing rates to get the architect's labor.</li>
<li>Add consultant fees, usually with a markup for coordination and risk.</li>
<li>Add reimbursable expenses if they are not billed separately.</li>
<li>Add contingency and profit.</li>
</ol>
<p><strong>Top-down</strong> checks compare the result with a percentage of construction cost or with fees on similar projects. If the two methods disagree badly, the scope or the assumptions need another look.</p>

<h3>From salary to billing rate</h3>
<p><strong>Direct salary expense (DSE)</strong> is the salary cost of hours on projects. <strong>Direct personnel expense (DPE)</strong> adds mandatory and customary benefits (payroll taxes, health insurance, retirement, paid leave). Billing rate = DSE per hour × a multiplier, or DPE × a smaller multiplier. The multiplier must cover overhead and profit: it should exceed the break-even rate (1 + overhead rate).</p>

<h3>Compensation methods (B101 Article 11)</h3>
<table class="tbl"><thead><tr><th>Method</th><th>Fits</th><th>Risk sits with</th></tr></thead><tbody>
<tr><td>Stipulated sum</td><td>Well-defined scope</td><td>Architect (efficiency rewarded)</td></tr>
<tr><td>Percentage of construction cost</td><td>Traditional, simple</td><td>Shared; fee moves with cost, which can look like an incentive to raise cost</td></tr>
<tr><td>Hourly / multiple of DPE</td><td>Uncertain scope, studies</td><td>Owner (add a not-to-exceed cap to share risk)</td></tr>
<tr><td>Unit cost (per sf, per unit)</td><td>Repetitive work, prototypes</td><td>Shared</td></tr>
</tbody></table>
<p><strong>Reimbursable expenses</strong> (B101 §11.8), such as travel, printing and permit fees, are paid in addition to fees, often with a markup.</p>
`,
  diagram: "",
  formulas: [
    { name: "Billing rate", f: "Rate = Direct salary per hour × multiplier" },
    { name: "Labor fee", f: "Labor = Σ (hours × rate)" },
    { name: "Fee check", f: "% fee = Total fee ÷ construction cost" }
  ],
  example: { title: "Applying it", html: `<p>A clinic fit-out needs 1,200 architect hours at a blended $130/h ($156,000). MEP and structural consultants quote $48,000, marked up 10% ($52,800). Expenses are billed separately. Adding 12% profit on the architect's labor ($18,720) gives a proposed fee of $227,520. On a $3.2 million construction cost that is 7.1%, which falls in the range for similar fit-outs, so the proposal holds up.</p>` },
  mistakes: [
    "Forgetting consultant coordination time and markup.",
    "Using a multiplier below the break-even rate.",
    "Offering a stipulated sum when the scope is undefined.",
    "Leaving the number of site visits and the schedule open-ended in a fixed-fee agreement."
  ],
  scenario: { prompt: "An owner wants a fixed fee for a feasibility study whose scope depends on what an existing-conditions survey finds. What should the architect propose?",
    answer: "Hourly compensation with a not-to-exceed amount for the study, or a fixed fee for the survey phase with the rest of the study priced once conditions are known. A stipulated sum for undefined scope puts all the risk on the architect." },
  refs: [
    { t: "AIA B101–2017, Article 11 (§11.1, §11.8)", a: "Your copy" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — compensation and fee development", a: "Purchase" }
  ],
  check: ["q-pcm-z01", "q-pcm-z02", "q-pcm-z03"]
});

ARE.LESSONS.push({
  id: "pjm-agreements", div: "pjm", obj: ["pjm-3.3", "pjm-3.1", "pjm-3.2"], title: "Owner–Contractor Agreements & Delivery Documents",
  minutes: 30, level: "Core",
  summary: "Which AIA agreement fits which delivery method, what each one fixes (price, time, retainage, liquidated damages), and how they connect to A201.",
  objectives: [
    "Match AIA owner–contractor agreements to delivery methods and pricing.",
    "Explain how agreements, general conditions and specifications form the contract documents.",
    "Identify what is set in the agreement rather than in A201.",
    "Describe the architect's role when it is not a party to the agreement."
  ],
  why: "The agreement form decides who carries cost risk. PjM tests whether you can match the form to the owner's goals.",
  exam: "Items describe an owner's priorities (certainty of price, early start, single point of responsibility) and ask which agreement fits, or what a clause in the agreement controls.",
  body: `
<h3>The main AIA forms</h3>
<table class="tbl"><thead><tr><th>Document</th><th>Use</th></tr></thead><tbody>
<tr><td>A101</td><td>Owner–contractor, stipulated sum (design-bid-build)</td></tr>
<tr><td>A102</td><td>Cost of the Work plus a fee, with a guaranteed maximum price (GMP)</td></tr>
<tr><td>A103</td><td>Cost of the Work plus a fee, without a GMP</td></tr>
<tr><td>A133</td><td>Owner–construction manager as constructor, cost plus fee with a GMP (CM at risk)</td></tr>
<tr><td>A132</td><td>Owner–construction manager as adviser</td></tr>
<tr><td>A141</td><td>Owner–design-builder</td></tr>
<tr><td>A201</td><td>General Conditions used with A101, A102 and A103</td></tr>
</tbody></table>

<h3>The contract documents</h3>
<p>Under A201, the Contract Documents are the agreement, the conditions of the contract (general, supplementary and other), the drawings, the specifications, addenda issued before execution, other documents listed in the agreement, and modifications issued after execution. <strong>Bidding requirements</strong> (the advertisement, instructions to bidders, bid forms) and <strong>submittals</strong> are not Contract Documents unless listed.</p>

<h3>What the agreement sets</h3>
<ul>
<li>Contract Sum (or the cost-plus formula and GMP) and alternates or unit prices accepted.</li>
<li>Date of commencement and the date or period for Substantial Completion.</li>
<li>Liquidated damages, if any.</li>
<li>Progress payment timing and retainage.</li>
<li>The Initial Decision Maker, if not the architect, and the binding dispute resolution method.</li>
</ul>
<p>Supplementary Conditions modify A201 for the project (insurance limits, owner-specific procedures). Edit them there rather than changing A201's text.</p>

<h3>The architect's position</h3>
<p>The architect prepares the documents and administers the contract, but is not a party to the owner–contractor agreement. Its duties during construction come from both the owner–architect agreement and A201, which should be consistent (for example, B101 and A201 are coordinated editions).</p>
`,
  diagram: "",
  formulas: [],
  example: { title: "Applying it", html: `<p>A school board needs price certainty, competitive public bidding and complete documents before construction. The architect recommends design-bid-build with A101 and A201, supplementary conditions for the board's insurance and bonding, liquidated damages tied to the school opening date, and 5% retainage stated in the agreement. A private developer who wants to start early and cap cost would be better served by A133 with a GMP.</p>` },
  mistakes: [
    "Treating the bid form or instructions to bidders as contract documents.",
    "Rewriting A201 instead of using supplementary conditions.",
    "Assuming the architect is a party to the owner–contractor agreement.",
    "Confusing A102 (contractor, cost plus with GMP) with A133 (CM as constructor with GMP)."
  ],
  scenario: { prompt: "An owner wants to start foundations before design is complete but also needs a maximum price before committing. Which agreement fits, and when is the GMP set?",
    answer: "CM at risk using A133. The CM provides preconstruction services during design and commits to a GMP once the documents are developed enough to price, often in stages or with early packages." },
  refs: [
    { t: "AIA A101, A102, A103, A132, A133, A141 and A201 (2017 editions); AIA Contract Documents synopses", a: "Synopses free (aiacontracts.com)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project delivery and construction contracts", a: "Purchase" }
  ],
  check: ["q-pjm-z01", "q-pjm-z02", "q-pjm-z03"]
});

ARE.LESSONS.push({
  id: "pa-budget", div: "pa", obj: ["pa-4.5", "pa-4.3"], title: "Project Budgets, Cost Models & Feasibility",
  minutes: 30, level: "Core",
  summary: "Turn a program into a project budget: construction cost, soft costs, contingencies and escalation, and test whether the owner's numbers work.",
  objectives: [
    "Separate construction cost from total project cost.",
    "Apply design contingency, construction contingency and escalation correctly.",
    "Choose the estimating method that fits each phase.",
    "Recommend responses when program, budget and schedule don't align."
  ],
  why: "Many projects fail before design starts because the program never fit the budget. Programming is the cheapest moment to find that out.",
  exam: "PA items give a program, a cost per square foot and soft-cost percentages and ask for a total, or ask what to do when the numbers don't work.",
  body: `
<h3>Two different budgets</h3>
<p>The <strong>construction cost</strong> (Cost of the Work) is what the contractor is paid. The <strong>total project budget</strong> adds soft costs: design and consultant fees, permits, testing and inspection, furniture and equipment (FF&amp;E), technology, moving, financing, insurance, legal and the owner's contingency, and sometimes land. Soft costs often add 20–40% to construction cost depending on project type.</p>

<h3>Contingencies and escalation</h3>
<ul>
<li><strong>Design contingency</strong> covers scope not yet drawn. It is large at programming and shrinks to near zero at CDs.</li>
<li><strong>Construction (owner's) contingency</strong> covers unforeseen conditions and changes during construction, commonly 5–10% (higher for renovation).</li>
<li><strong>Escalation</strong> carries today's cost to the midpoint of construction: cost × (1 + rate)<sup>years</sup>.</li>
</ul>

<h3>Estimating by phase</h3>
<table class="tbl"><thead><tr><th>Phase</th><th>Method</th></tr></thead><tbody>
<tr><td>Programming / feasibility</td><td>Cost per square foot or per unit from comparables</td></tr>
<tr><td>Schematic design</td><td>Systems or assemblies estimate (UniFormat)</td></tr>
<tr><td>DD and CDs</td><td>Quantity takeoff and unit prices (MasterFormat)</td></tr>
</tbody></table>

<h3>When the numbers don't work</h3>
<p>The architect lays out the gap with evidence and the levers: reduce or phase the program, adjust quality, change the delivery method or schedule, or increase the budget. The owner decides. Record the decision; it becomes the basis for later estimates.</p>
`,
  diagram: "",
  formulas: [
    { name: "Gross area", f: "Gross = Net ÷ efficiency" },
    { name: "Escalation", f: "Future cost = Current cost × (1 + rate)^years to midpoint" },
    { name: "Project budget", f: "Total = Construction (incl. contingencies, escalation) + soft costs" }
  ],
  example: { title: "Applying it", html: `<p>A library needs 21,000 nsf at 0.70 efficiency, so 30,000 gsf. Comparable libraries cost $380/sf today, giving $11.4 million. With a 10% design contingency ($12.54 million) and two years of 4% escalation to the construction midpoint, construction is about $13.56 million. Soft costs at 30% add about $4.07 million, for a total project budget near $17.6 million. The owner's $14 million total budget does not fit, so the architect presents three options: reduce the program to about 24,000 gsf, phase the children's wing, or raise funds.</p>` },
  mistakes: [
    "Comparing the owner's total budget with construction cost alone.",
    "Applying escalation to the start of construction instead of the midpoint.",
    "Keeping a large design contingency at CDs.",
    "Pricing net area instead of gross."
  ],
  scenario: { prompt: "The owner's budget number turns out to include furniture, fees and technology. The architect has been designing to it as a construction cost. What should happen?",
    answer: "Stop and reconcile. Separate the owner's total budget into construction and soft costs, recalculate the construction budget available, and show the owner how the current design compares. Then agree on adjustments before design continues." },
  refs: [
    { t: "AIA B101–2017, Article 6 (Cost of the Work)", a: "Your copy" },
    { t: "CSI UniFormat and MasterFormat", a: "Purchase (csiresources.org)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project cost management", a: "Purchase" }
  ],
  check: ["q-pa-z01", "q-pa-z02", "q-pa-z03"]
});

ARE.LESSONS.push({
  id: "ppd-access", div: "ppd", obj: ["ppd-2.2", "ppd-2.3", "ppd-4.3"], title: "Accessibility in Building Design",
  minutes: 35, level: "Core",
  summary: "The accessibility rules that shape plans: which laws apply, accessible routes, entrances, parking, toilet rooms and the dimensions the exam expects you to know.",
  objectives: [
    "Distinguish the ADA, the Fair Housing Act and IBC Chapter 11 with ICC A117.1.",
    "Plan accessible routes, entrances and parking.",
    "Lay out accessible toilet rooms with the key clearances.",
    "Apply reach ranges, door clearances and ramp limits."
  ],
  why: "Accessibility drives plan dimensions from the first sketch: corridor widths, toilet room sizes, ramps and parking. Fixing it late is expensive.",
  exam: "Expect dimension questions (clear widths, turning space, ramp slopes, reach ranges) and scenarios about which rule applies to a building type.",
  body: `
<h3>Which rules apply</h3>
<ul>
<li><strong>ADA</strong> (civil rights law): the 2010 ADA Standards for Accessible Design apply to public accommodations, commercial facilities (Title III) and state and local government facilities (Title II). It is enforced through complaints and lawsuits, not permits.</li>
<li><strong>Fair Housing Act</strong>: design requirements for covered multifamily dwellings.</li>
<li><strong>IBC Chapter 11</strong> with <strong>ICC A117.1</strong>: the building code path, enforced by the building official. Projects often must meet both the ADA and the code; follow the more stringent requirement.</li>
</ul>

<h3>Key dimensions (2010 ADA Standards)</h3>
<table class="tbl"><thead><tr><th>Element</th><th>Requirement</th></tr></thead><tbody>
<tr><td>Accessible route width</td><td>36 in clear; 60 in where passing space is needed (§403.5)</td></tr>
<tr><td>Running and cross slope</td><td>Running ≤ 1:20 (or it is a ramp); cross slope ≤ 1:48 (§403.3)</td></tr>
<tr><td>Ramps</td><td>Slope ≤ 1:12; rise ≤ 30 in per run; landings 60 in long; handrails where rise &gt; 6 in (§405)</td></tr>
<tr><td>Door clear width</td><td>32 in clear with the door open 90° (§404.2.3)</td></tr>
<tr><td>Turning space</td><td>60 in diameter circle or a T-shaped space (§304.3)</td></tr>
<tr><td>Reach range</td><td>15 in to 48 in above the floor for unobstructed reach (§308)</td></tr>
<tr><td>Water closet</td><td>Centerline 16–18 in from the side wall (§604.2); side grab bar 42 in min, rear 36 in min (§604.5)</td></tr>
<tr><td>Parking</td><td>Access aisle 60 in; 1 of every 6 accessible spaces van accessible (§502, §208.2.4)</td></tr>
</tbody></table>

<h3>Entrances and routes</h3>
<p>At least 60% of public entrances must be accessible (§206.4.1), and an accessible route must connect parking, public sidewalks and transit stops to the accessible entrance (§206.2.1). Inside, an accessible route connects every accessible space and element.</p>
`,
  diagram: "",
  formulas: [
    { name: "Ramp length", f: "Run length = rise × 12 (at 1:12)" },
    { name: "Ramp runs", f: "Runs = rise ÷ 30 in, rounded up (landing between runs)" }
  ],
  example: { title: "Applying it", html: `<p>A clinic entrance sits 42 in above the sidewalk. At 1:12, the ramp needs 42 × 12 = 504 in (42 ft) of sloped length, split into two runs because the rise exceeds 30 in, with a 60 in landing between them and at top and bottom, plus handrails on both sides. Regrading the walk to stay at or below 1:20 over part of the rise would shorten the ramp.</p>` },
  mistakes: [
    "Using 36 in for door clear width. Doors need 32 in clear; routes need 36 in.",
    "Forgetting intermediate landings when the rise exceeds 30 in.",
    "Assuming a building permit means ADA compliance.",
    "Placing the water closet centerline outside 16–18 in."
  ],
  scenario: { prompt: "A two-story office building has accessible ground-floor entrances but no elevator. A tenant asks whether that is acceptable. What should the architect check?",
    answer: "Whether an exception applies. The ADA and the IBC have limited exceptions for some small multistory buildings, but they depend on building type, size and use (for example, medical offices and shopping centers generally do not qualify). Check the 2010 ADA Standards §206.2.3 and IBC §1104.4 for the specific case." },
  canada: "In Ontario, barrier-free design follows OBC Section 3.8, and the Accessibility for Ontarians with Disabilities Act (AODA) sets standards for public spaces. Dimensions differ from the ADA in places, so check the OBC directly.",
  refs: [
    { t: "2010 ADA Standards for Accessible Design (§206, §208, §304, §308, §403–§405, §502, §604)", a: "Free (ada.gov)" },
    { t: "2021 IBC Chapter 11; ICC A117.1", a: "Free to read (codes.iccsafe.org)" },
    { t: "Fair Housing Act Design Manual", a: "Free (hud.gov)" }
  ],
  check: ["q-ppd-z01", "q-ppd-z02", "q-ppd-z03"]
});

ARE.LESSONS.push({
  id: "pdd-roofing", div: "pdd", obj: ["pdd-1.5", "pdd-2.3", "pdd-1.1"], title: "Roofing & Below-Grade Waterproofing",
  minutes: 30, level: "Core",
  summary: "How to detail low-slope roofs and below-grade walls so water goes where it should: membranes, slope, drainage, flashing and the difference between dampproofing and waterproofing.",
  objectives: [
    "Compare common low-slope membranes and attachment methods.",
    "Provide slope, primary and secondary drainage.",
    "Detail base flashing, edges and penetrations.",
    "Choose dampproofing or waterproofing below grade."
  ],
  why: "Roofs and foundations are where water problems are most expensive. Most failures happen at edges, penetrations and transitions, not in the field of the membrane.",
  exam: "PDD items show a roof edge, parapet or foundation wall section and ask what is missing, or ask which membrane or drainage approach fits.",
  body: `
<h3>Low-slope membranes</h3>
<table class="tbl"><thead><tr><th>Type</th><th>Notes</th></tr></thead><tbody>
<tr><td>Built-up roofing (BUR)</td><td>Layers of felt and bitumen; durable, labor-intensive</td></tr>
<tr><td>Modified bitumen</td><td>Factory sheets, torched, mopped or self-adhered</td></tr>
<tr><td>EPDM (thermoset)</td><td>Rubber sheet; seams taped or glued; adhered, fastened or ballasted</td></tr>
<tr><td>TPO and PVC (thermoplastic)</td><td>Heat-welded seams; often white for a cool roof</td></tr>
</tbody></table>
<p>Membranes can be <strong>fully adhered</strong>, <strong>mechanically fastened</strong> or <strong>ballasted</strong>. Wind uplift design governs the choice at edges and corners.</p>

<h3>Slope and drainage</h3>
<p>The IBC requires a minimum slope of ¼ in per foot (2%) for most low-slope membranes (§1507). Achieve it with sloped structure or tapered insulation, with crickets behind curbs and between drains. Where parapets would trap water, the roof needs <strong>secondary (overflow) drainage</strong> by overflow drains or scuppers (IBC §1502.2 and the plumbing code), set above the primary drains so they only work if the primary system is blocked.</p>

<h3>Flashing and edges</h3>
<ul>
<li><strong>Base flashing</strong> turns the membrane up walls and curbs, terminated and covered by counterflashing.</li>
<li><strong>Edges</strong> need tested edge metal that resists wind uplift.</li>
<li><strong>Penetrations</strong> are minimized and grouped; use pipe boots or curbs, not pitch pans where avoidable.</li>
</ul>

<h3>Below grade</h3>
<p><strong>Dampproofing</strong> resists moisture without hydrostatic pressure. <strong>Waterproofing</strong> is needed where groundwater creates hydrostatic pressure (IBC §1805). Add drainage: a drainage mat or board against the wall and a perimeter foundation drain to daylight or a sump.</p>
`,
  diagram: `<svg viewBox="0 0 480 220" role="img" aria-label="Parapet section with membrane turned up as base flashing, counterflashing, coping, tapered insulation sloping to a primary drain and an overflow scupper set higher"><g class="dg-text" font-size="11">
<rect x="380" y="30" width="34" height="150" class="dg-hatch"/><rect x="372" y="22" width="50" height="10" class="dg-accent2"/><text x="300" y="18">Coping</text>
<path d="M40 170 L370 150" class="dg-line"/><path d="M40 176 L370 156" class="dg-leader"/>
<path d="M370 150 V100 H378" class="dg-accentline" stroke-width="3"/><text x="270" y="96">Base flashing</text><path d="M330 98 l40 6" class="dg-leader"/>
<path d="M378 92 h-14" class="dg-line"/><text x="250" y="80">Counterflashing</text><path d="M330 80 l34 10" class="dg-leader"/>
<rect x="58" y="168" width="20" height="10" class="dg-soft"/><text x="40" y="198">Primary drain (low point)</text>
<rect x="380" y="128" width="34" height="10" class="dg-air"/><text x="250" y="132">Overflow scupper, higher</text><path d="M360 130 h20" class="dg-leader"/>
<text x="150" y="150">Tapered insulation, ¼ in/ft min</text></g></svg>`,
  formulas: [
    { name: "Taper rise", f: "Rise = slope × distance (¼ in/ft × 40 ft = 10 in)" }
  ],
  example: { title: "Applying it", html: `<p>A 120 ft × 80 ft roof with parapets on all sides drains to four interior drains. The architect shows tapered insulation at ¼ in/ft to each drain, crickets between drains, overflow drains beside each primary drain with their inlets set 2 in higher, base flashing up each parapet under counterflashing, and edge metal tested for the project's wind exposure.</p>` },
  mistakes: [
    "Flat roofs with no slope. Ponding shortens membrane life.",
    "Parapet roofs without overflow drainage.",
    "Setting overflow drains at the same level as primary drains.",
    "Specifying dampproofing where groundwater exerts hydrostatic pressure."
  ],
  scenario: { prompt: "A basement wall will sit below the seasonal high water table. The specification calls for bituminous dampproofing. What should change?",
    answer: "Specify a waterproofing system rated for hydrostatic pressure, with a drainage layer and a foundation drain, because dampproofing does not resist water under pressure. Coordinate with the geotechnical report's groundwater findings." },
  refs: [
    { t: "2021 IBC §1502.2, §1507 and §1805", a: "Free to read (codes.iccsafe.org)" },
    { t: "NRCA Roofing Manual", a: "Purchase (nrca.net)" },
    { t: "ANSI/SPRI ES-1 (edge systems)", a: "Free (spri.org)" }
  ],
  check: ["q-pdd-z01", "q-pdd-z02", "q-pdd-z03"]
});

ARE.LESSONS.push({
  id: "ce-changes", div: "ce", obj: ["ce-3.1", "ce-1.3", "ce-3.3"], title: "Changes in the Work: Change Orders, CCDs & Minor Changes",
  minutes: 30, level: "Core",
  summary: "The three ways A201–2017 changes the work, who signs each, how cost is adjusted, and how the architect evaluates a contractor's price.",
  objectives: [
    "Choose between a change order, a construction change directive and a minor change.",
    "Apply the methods for adjusting the contract sum under a CCD.",
    "Evaluate a contractor's change proposal for reasonableness.",
    "Explain how deletions are credited and how CCD work is paid."
  ],
  why: "Changes are where construction budgets are won or lost. The architect manages the process and must keep each tool within its limits.",
  exam: "Expect 'which document?' items, signature questions, and scenarios where price or time is disputed but work must continue.",
  body: `
<h3>Three tools (A201 Article 7)</h3>
<table class="tbl"><thead><tr><th>Tool</th><th>Signed by</th><th>Use</th></tr></thead><tbody>
<tr><td>Change Order (G701)</td><td>Owner, contractor and architect</td><td>All agree on the change, the sum and the time (§7.2)</td></tr>
<tr><td>Construction Change Directive (G714)</td><td>Owner and architect</td><td>Directs a change before agreement on sum or time (§7.3.1)</td></tr>
<tr><td>Minor change (G710 often used)</td><td>Architect</td><td>Consistent with intent, no change to sum or time (§7.4)</td></tr>
</tbody></table>

<h3>Adjusting the sum under a CCD (§7.3.3)</h3>
<ol>
<li>A lump sum, properly itemized and supported;</li>
<li>Unit prices in the documents or agreed later;</li>
<li>Cost determined in an agreed way plus a fixed or percentage fee; or</li>
<li>If the contractor disagrees or doesn't respond, the architect determines the adjustment from reasonable expenditures and savings, plus allowances for overhead and profit (§7.3.4).</li>
</ol>
<p>The contractor proceeds promptly with CCD work (§7.3.6). If it signs the CCD, that is agreement and it becomes a change order (§7.3.7). Pending final cost, the contractor may bill CCD work in payment applications (§7.3.9). When agreement is reached later, the architect prepares a change order (§7.3.10).</p>

<h3>Evaluating a price</h3>
<p>Ask for an itemized breakdown: labor hours and rates, materials, equipment, subcontractor quotes, overhead and profit at the agreed markups, and time impact with schedule logic. Compare unit costs with the schedule of values and published data. For deletions, the credit is the net cost to the contractor (§7.3.8).</p>
`,
  diagram: "",
  formulas: [
    { name: "Change price", f: "Price = labor + materials + equipment + subs + markups" }
  ],
  example: { title: "Applying it", html: `<p>The owner wants heavier trench grates that engines can drive over. The contractor quotes $7,400; the owner thinks $4,000 is fair, and the grates are needed in five days. The architect prepares a CCD signed by the owner and architect directing the work, with the adjustment based on cost plus the contract's fee percentage. The contractor installs the grates, tracks costs, and bills them on the next application. Once costs are verified, the architect prepares a change order for the agreed amount.</p>` },
  mistakes: [
    "Using a minor change when cost or time changes.",
    "Waiting for price agreement before urgent work proceeds. Use a CCD.",
    "Accepting a lump-sum change with no breakdown.",
    "Thinking the contractor must sign a CCD for it to take effect."
  ],
  scenario: { prompt: "The architect wants to move a light switch 2 ft to suit the furniture plan. There is no cost or time effect. Which document applies?",
    answer: "A minor change in the work, ordered by the architect under A201 §7.4 (often issued on G710, Architect's Supplemental Instructions). It is binding on the owner and contractor and needs no change order." },
  refs: [
    { t: "AIA A201–2017, Article 7 (§7.1.2, §7.2, §7.3.1–§7.3.10, §7.4)", a: "Your copy" },
    { t: "AIA G701, G710, G714", a: "Purchase (aiacontracts.com)" }
  ],
  check: ["q-ce-z01", "q-ce-z02", "q-ce-z03"]
});

Object.assign(ARE.TAKEAWAYS || (ARE.TAKEAWAYS = {}), {
  "pcm-fees": ["Build fees bottom-up, check top-down.", "Rate = salary × multiplier; multiplier > break-even.", "Undefined scope → hourly with a cap.", "Mark up consultants for coordination.", "Reimbursables are in addition to fees."],
  "pjm-agreements": ["A101 stipulated sum; A102 cost plus with GMP; A103 without.", "A133 = CM at risk with GMP; A132 = CM adviser; A141 = design-build.", "Bid forms and submittals are not contract documents.", "Use supplementary conditions to modify A201.", "The architect is not party to the owner–contractor agreement."],
  "pa-budget": ["Project budget = construction + soft costs.", "Design contingency shrinks; construction contingency stays.", "Escalate to the construction midpoint.", "Price gross area, not net.", "Present the gap and the levers; the owner decides."],
  "ppd-access": ["Route 36 in; door 32 in clear; turning 60 in.", "Ramps ≤ 1:12, ≤ 30 in rise per run, 60 in landings.", "Walks ≤ 1:20; cross slope ≤ 1:48.", "Reach 15–48 in.", "WC centerline 16–18 in.", "ADA and code may both apply: meet the stricter."],
  "pdd-roofing": ["¼ in/ft minimum for most membranes.", "Parapets need overflow drainage set higher.", "Flash every edge, curb and penetration.", "Dampproofing ≠ waterproofing.", "Drain the foundation."],
  "ce-changes": ["CO: owner, contractor and architect sign.", "CCD: owner and architect; contractor proceeds.", "Minor change: architect; no sum or time.", "Architect determines CCD price if no agreement.", "Deletion credit = net cost."]
});
