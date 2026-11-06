/* ============================================================
   Project simulations (v20)
   Branching scenarios: each decision changes five meters and can change
   what happens next. Meters run 0–10 and start at 5. For "risk", lower is better.
   Clause references are to AIA B101–2017 and A201–2017 and were checked against the document text.
   ============================================================ */
ARE.SIM_METERS = [
  ["client", "Client trust"], ["risk", "Firm risk exposure"], ["fee", "Fee health"], ["schedule", "Schedule"], ["quality", "Quality & compliance"]
];
ARE.SIMS = [
/* ---------------------------------------------------------- */
{ id: "sim-library", title: "Riverside Branch Library: winning and setting up the project", divs: ["pcm", "pjm"],
  objs: ["pcm-3.1", "pcm-3.3", "pcm-2.2", "pcm-3.2", "pjm-1.1", "pjm-2.1", "pjm-3.1"],
  role: "You are a project architect at a 25-person firm. A town library board wants a 12,000 sf branch library with a community room.",
  brief: "Take the project from the first meeting to a signed agreement and a working team. Each decision affects the client relationship, your firm's risk, the fee, the schedule and quality.",
  start: "l1",
  nodes: {
    l1: { phase: "Project initiation", title: "The first meeting",
      situation: "<p>The board chair says: \"We have $4.2 million in total and we want to open in 18 months. We'd like you to start drawings next week so we can show the council.\" Recent libraries of this size in the region have cost about $430/sf to build.</p>",
      docs: [{ name: "Board's notes", html: "<ul><li>Program: 12,000 sf, community room for 120, children's area, 40 parking spaces.</li><li>Total funds: $4.2M (includes everything).</li><li>Target opening: 18 months from now.</li><li>Site: town-owned lot, survey not yet done.</li></ul>" }],
      prompt: "What do you do first?",
      choices: [
        { t: "Start schematic sketches next week as asked, to keep the board's enthusiasm", fx: { client: 1, risk: 2, quality: -1 }, next: "l2", rate: "poor",
          out: "<p>The board likes the sketches, but nobody has tested the numbers. 12,000 sf × $430 = $5.16M for construction alone, before fees, furniture and contingency. The budget gap will surface later, when it is more expensive and embarrassing to fix.</p>" },
        { t: "Explain that you need to test program, budget and schedule against each other first, and propose a short feasibility study", fx: { client: 1, risk: -1, quality: 2 }, next: "l2", rate: "best",
          out: "<p>B101–2017 §3.2.2 asks the architect to evaluate the owner's program, schedule, budget and site \"each in terms of the other\". A quick check already shows construction alone would be about $5.16M against $4.2M total. Raising it now lets the board decide with facts.</p>" },
        { t: "Tell the board the budget is impossible and decline the project", fx: { client: -2, fee: -2, risk: -1 }, next: "l2", rate: "ok",
          out: "<p>Declining avoids risk but also gives up a client you could have helped. Boards rarely know construction costs; your job is to show the options (smaller program, phasing, more funding), not to walk away at the first gap.</p>" }
      ] },
    l2: { phase: "Project initiation", title: "Closing the budget gap",
      situation: "<p>Your quick feasibility check: construction at $430/sf for 12,000 sf is $5.16M. With design fees, furniture, permits, testing and a 5% owner contingency (about 23% of the total), the $4.2M total supports only about $3.23M of construction.</p>",
      docs: [{ name: "Feasibility summary", html: "<table class='tbl'><tr><td>Total funds</td><td>$4,200,000</td></tr><tr><td>Soft costs (≈23%)</td><td>$966,000</td></tr><tr><td>Available for construction</td><td>$3,234,000</td></tr><tr><td>At $430/sf</td><td>≈ 7,500 gsf</td></tr></table>" }],
      prompt: "How do you present this to the board?",
      choices: [
        { t: "Present three options: reduce to about 7,500 sf, phase the building, or raise more funds; give the cost and program effect of each", fx: { client: 2, risk: -1, quality: 1 }, next: "l3", rate: "best",
          out: "<p>The board chooses a 9,000 sf first phase with the community room, and starts fundraising for a later children's wing. Presenting options keeps the decision with the owner, where it belongs, and records the basis for the budget.</p>" },
        { t: "Keep 12,000 sf and use lower-cost materials to make it fit", fx: { client: 1, risk: 2, quality: -2 }, next: "l3", rate: "poor",
          out: "<p>A 37% cost gap cannot be closed by cheaper finishes. When bids come in high, B101 §6.7 may require you to redesign at no extra fee if the overrun is not due to market conditions. You have set the project up to fail.</p>" },
        { t: "Ask the board to hire a cost consultant before you say anything more", fx: { client: -1, fee: -1, schedule: -1 }, next: "l3", rate: "ok",
          out: "<p>A cost consultant helps later, but the board needed a clear message now. A preliminary estimate is part of your own services (B101 §3.2.6 at schematic design), and an order-of-magnitude check during feasibility is reasonable professional judgment.</p>" }
      ] },
    l3: { phase: "Agreement", title: "The board's contract",
      situation: "<p>The town attorney sends its standard agreement instead of an AIA form. Two clauses stand out.</p>",
      docs: [{ name: "Clause 7.2", html: "<p>\"The Architect shall defend, indemnify and hold harmless the Town from any and all claims arising out of the Project.\"</p>" }, { name: "Clause 9.1", html: "<p>\"The Architect warrants that the Project will be completed within the Town's budget.\"</p>" }],
      prompt: "What do you do?",
      choices: [
        { t: "Sign it; municipal clients rarely negotiate and the clauses are standard", fx: { fee: 1, risk: 3 }, next: "l4", flag: "badContract", rate: "poor",
          out: "<p>Both clauses go beyond the standard of care. An indemnity for \"any and all claims\" with a duty to defend, and a warranty of the budget, are generally not covered by professional liability insurance. You may now carry uninsured risk for the life of the project.</p>" },
        { t: "Ask your insurer's contract review service, then propose: indemnity limited to the extent caused by your negligence, no duty to defend, and replace the budget warranty with the owner's budget and B101-style cost provisions", fx: { client: 1, risk: -2, quality: 1 }, next: "l4", rate: "best",
          out: "<p>The attorney accepts most of it: negligence-based indemnity, and cost estimating described as professional judgment rather than a guarantee. Many insurers review agreements for free, and owners usually accept reasonable, insurable terms.</p>" },
        { t: "Insist on switching to AIA B101 or you will not proceed", fx: { client: -2, risk: -1, schedule: -1 }, next: "l4", rate: "ok",
          out: "<p>You get better terms, but the relationship starts on a hard note and a month is lost. Many public owners must use their own forms; negotiating specific clauses usually gets the same protection with less friction.</p>" }
      ] },
    l4: { phase: "Fee", title: "Pricing the work",
      situation: "<p>The board asks for a stipulated sum fee. Your work plan estimates 4,600 hours. Your average direct salary rate is $48/h, overhead rate 1.6, and target profit 15% of fee. Consultants (structural, MEP, civil, landscape) will cost $160,000.</p>",
      docs: [{ name: "Fee build-up", html: "<table class='tbl'><tr><td>Direct labor</td><td>4,600 × $48 = $220,800</td></tr><tr><td>Overhead</td><td>220,800 × 1.6 = $353,280</td></tr><tr><td>Cost</td><td>$574,080</td></tr><tr><td>Fee for 15% profit</td><td>574,080 ÷ 0.85 ≈ $675,400</td></tr><tr><td>Plus consultants</td><td>$160,000</td></tr><tr><td>Total</td><td>≈ $835,400</td></tr></table>" }],
      prompt: "What do you propose?",
      choices: [
        { t: "Propose ≈ $835,000 with a defined scope, listed exclusions (surveys, geotech, LEED documentation) and hourly Additional Services", fx: { fee: 2, client: 0, risk: -1 }, next: "l5", rate: "best",
          out: "<p>The board accepts after one meeting. A clear scope protects the fee: B101 §4.1 lists Supplemental Services you can select or exclude, and §4.2 covers Additional Services that arise later.</p>" },
        { t: "Cut the fee to $650,000 to be sure you win, and absorb the difference", fx: { fee: -3, client: 1, quality: -1 }, next: "l5", rate: "poor",
          out: "<p>You win, but your labor budget now covers only about 3,500 hours. Either the firm loses money or the team cuts corners on coordination and CA. Low fees are a leading cause of quality problems and claims.</p>" },
        { t: "Propose 8% of construction cost without checking hours", fx: { fee: 0, risk: 1 }, next: "l5", rate: "ok",
          out: "<p>8% of about $3.9M is about $312,000, less than half of what the work requires. Percentage fees are a useful check, but always build the fee up from the work plan.</p>" }
      ] },
    l5: { phase: "Delivery", title: "Choosing a delivery method",
      situation: "<p>The board must open in 18 months and is nervous about bids coming in high. State law allows design-bid-build or CM at risk for town buildings.</p>",
      prompt: "What do you recommend?",
      choices: [
        { t: "CM at risk: hire the CM during design for estimates and constructability, and set a GMP when documents allow", fx: { schedule: 2, risk: -1, client: 1 }, next: "l6", rate: "best",
          out: "<p>The CM's estimates at each phase catch overruns early, and early bid packages (site work, steel) save time. The architect still serves the owner under B101, with added coordination with the CM.</p>" },
        { t: "Design-bid-build, because it gives the lowest price", fx: { schedule: -1, risk: 1 }, next: "l6", rate: "ok",
          out: "<p>DBB gives a firm price on complete documents, but no contractor input during design and the longest timeline. With an 18-month target and budget anxiety, it is a weaker fit, though defensible.</p>" },
        { t: "Fast-track design-bid-build: issue foundations for bid before the design is finished", fx: { schedule: 1, risk: 2, quality: -1 }, next: "l6", rate: "poor",
          out: "<p>Fast-tracking DBB creates several prime contracts on incomplete documents with no one managing the overlap. Changes and claims are likely. Fast-tracking works best with a CM.</p>" }
      ] },
    l6: { phase: "Team", title: "Kickoff with consultants",
      situation: "<p>Your MEP consultant proposes to skip the coordination meetings during design development to save fee, and to \"sort out conflicts during CDs\".</p>",
      prompt: "How do you respond?",
      choices: [
        { t: "Hold to biweekly coordination with model exchanges, and add a clash review at 50% CDs in the work plan", fx: { quality: 2, schedule: 1, fee: -1 }, next: "end", rate: "best",
          out: "<p>Coordination costs a little fee now and saves much more in RFIs and change orders later. As the prime design professional you are responsible for coordinating your consultants' work; B101 Article 3 includes their services in your Basic Services.</p>" },
        { t: "Agree, to keep the consultant's fee down", fx: { fee: 1, quality: -2, risk: 1 }, next: "end", rate: "poor",
          out: "<p>Late coordination pushes conflicts into construction, where they become change orders and claims against the architect.</p>" },
        { t: "Let the CM coordinate the consultants directly", fx: { quality: -1, risk: 1 }, next: "end", rate: "poor",
          out: "<p>The CM gives constructability input, but coordinating the design team is the architect's responsibility. Handing it off blurs responsibility.</p>" }
      ] }
  },
  endings: [
    { if: (m, f) => f.badContract, t: "Project underway, with uninsured exposure", d: "The design is going well, but the agreement you signed carries obligations your insurance does not cover. If anything goes wrong in construction, the firm's own assets are exposed. Next time, have contracts reviewed before signing." },
    { if: (m) => m.risk <= 4 && m.fee >= 6 && m.quality >= 6, t: "Strong start", d: "Realistic budget, insurable contract, a fee that pays for the work, the right delivery method and a coordinated team. This is what good project initiation looks like." },
    { if: (m) => m.fee <= 3, t: "Underpriced project", d: "The project is set up, but the fee does not cover the work. Expect pressure to cut corners in CDs and construction administration." },
    { if: () => true, t: "Workable start with gaps", d: "The project can succeed, but some decisions left risk, budget or coordination problems that will need attention." }
  ] },

/* ---------------------------------------------------------- */
{ id: "sim-clinic", title: "Maple Street Clinic: design and documentation decisions", divs: ["pa", "ppd", "pdd"],
  objs: ["pa-2.2", "pa-3.2", "ppd-2.2", "ppd-3.1", "ppd-4.1", "pdd-1.2", "pdd-2.1", "pdd-4.2"],
  role: "You are the project architect for a one-story, 14,000 sf outpatient clinic (Group B) on a suburban site.",
  brief: "Work from site analysis through construction documents. Decisions affect compliance, cost, schedule and the owner's confidence. Code references use the 2021 IBC and 2010 ADA Standards; a real project uses the jurisdiction's adopted editions.",
  start: "c1",
  nodes: {
    c1: { phase: "Site analysis", title: "Reading the survey",
      situation: "<p>The survey shows the north 60 ft of the site in FEMA Zone AE and a 25 ft drainage easement along the east line. The owner's sketch puts the parking on the south and the building in the north half, closest to the street.</p>",
      docs: [{ name: "Survey notes", html: "<ul><li>Zone AE, base flood elevation 612.0; north half of site, existing grade 608–611.</li><li>South half grade 615–618, outside the floodplain.</li><li>25 ft drainage easement held by the county along the east line.</li></ul>" }],
      prompt: "Where do you place the building?",
      choices: [
        { t: "Move the building to the higher south half and put parking in the floodplain area, outside the easement", fx: { quality: 2, risk: -1, client: 0 }, next: "c2", rate: "best",
          out: "<p>Building above the flood zone avoids elevating the floor and flood-resistant construction. Parking can usually occupy flood-prone ground. Nothing permanent goes in the easement without the county's consent.</p>" },
        { t: "Keep the owner's layout and raise the floor to the base flood elevation", fx: { quality: -1, schedule: -1, client: 1, risk: 1 }, next: "c2", rate: "ok",
          out: "<p>It can be done, but the lowest floor usually has to be at or above the design flood elevation, often BFE plus freeboard, which here means filling 2–5 ft, plus flood-resistant materials and an accessible route up to the higher floor. It costs more and adds risk for no program benefit.</p>" },
        { t: "Keep the owner's layout and let the civil engineer handle the flood zone", fx: { quality: -2, risk: 2 }, next: "c2", rate: "poor",
          out: "<p>Siting is the architect's decision. Leaving the building in Zone AE without a plan creates a code and insurance problem that cannot be solved by drainage alone.</p>" }
      ] },
    c2: { phase: "Code analysis", title: "Construction type and sprinklers",
      situation: "<p>The owner wants the least expensive structure. For Group B, Table 506.2 gives type V-B an allowable area of 9,000 sf nonsprinklered and 36,000 sf sprinklered for a one-story building. The clinic is 14,000 sf.</p>",
      prompt: "What do you propose?",
      choices: [
        { t: "Type V-B with an NFPA 13 sprinkler system throughout", fx: { quality: 2, client: 1, fee: 0 }, next: "c3", rate: "best",
          out: "<p>Sprinklers raise the allowable area well above 14,000 sf and also relax other requirements (travel distance, exit separation). It is usually cheaper than upgrading the construction type.</p>" },
        { t: "Type V-B without sprinklers, divided by a fire wall into two buildings of 7,000 sf", fx: { quality: 0, schedule: -1, client: -1 }, next: "c3", rate: "ok",
          out: "<p>It complies, but a fire wall through a clinic splits the plan, needs rated openings and continuity to the roof, and gives up the other benefits of sprinklers.</p>" },
        { t: "Type V-B without sprinklers; 14,000 sf is close enough", fx: { quality: -3, risk: 3 }, next: "c3", rate: "poor",
          out: "<p>14,000 sf exceeds the 9,000 sf nonsprinklered limit (frontage could add some area, but not this much). The plans reviewer will reject it, or worse, it gets built non-compliant.</p>" }
      ] },
    c3: { phase: "Systems", title: "Choosing the HVAC system",
      situation: "<p>The program has 30 exam rooms, procedure rooms, offices and a waiting room. The owner wants individual comfort control, quiet exam rooms and low energy use. Ceiling space is limited to 24 in.</p>",
      prompt: "Which system do you recommend to the owner?",
      choices: [
        { t: "Variable refrigerant flow with a dedicated outdoor air system", fx: { quality: 2, client: 1, fee: 0 }, next: "c4", rate: "best",
          out: "<p>VRF gives many small zones with small refrigerant piping, which suits a shallow ceiling, and the DOAS handles ventilation. Health-care ventilation rates come from ASHRAE 170 and the FGI Guidelines where adopted.</p>" },
        { t: "Two large packaged rooftop units with constant-volume ducts", fx: { quality: -1, client: -1 }, next: "c4", rate: "ok",
          out: "<p>Cheap and simple, but two zones cannot give 30 exam rooms individual control, and large ducts are hard to fit in 24 in.</p>" },
        { t: "Through-wall units in each exam room", fx: { quality: -2, client: -1 }, next: "c4", rate: "poor",
          out: "<p>Noisy, hard to ventilate properly and a poor fit for clinical spaces.</p>" }
      ] },
    c4: { phase: "Design development", title: "A coordination conflict",
      situation: "<p>The 50% DD model shows the main supply duct crossing a steel beam at the corridor, leaving 7 ft 2 in to the corridor ceiling. The program requires 8 ft 6 in.</p>",
      prompt: "What do you do?",
      choices: [
        { t: "Meet with the structural and mechanical engineers: reroute the duct over a lower-load area, or use a web opening the engineer designs, and record the decision", fx: { quality: 2, schedule: 0 }, next: "c5", rate: "best",
          out: "<p>Resolving clashes in design is the cheapest point to fix them. Holes in steel beams need the structural engineer's design; never note \"field coordinate\".</p>" },
        { t: "Lower the corridor ceiling to 7 ft 2 in without telling the owner", fx: { quality: -1, client: -2, risk: 1 }, next: "c5", rate: "poor",
          out: "<p>Changing an approved program requirement without the owner's agreement undermines trust and may trigger a claim.</p>" },
        { t: "Leave it for the contractor to resolve in the field", fx: { quality: -2, risk: 2 }, next: "c5", rate: "poor",
          out: "<p>Known conflicts left in the documents become RFIs, change orders and possibly a claim against the architect for coordination errors.</p>" }
      ] },
    c5: { phase: "Construction documents", title: "QC review finds problems",
      situation: "<p>Your 90% CD review finds: the accessible toilet room plan shows the water closet centerline 20 in from the side wall; Section 08 71 00 specifies lever hardware but the door schedule shows knobs on four doors; the reflected ceiling plan omits sprinkler heads in two procedure rooms.</p>",
      prompt: "How do you handle the findings?",
      choices: [
        { t: "Correct all three before issue, log them in the QC record, and check every similar condition (other toilet rooms, every door, every room's ceiling)", fx: { quality: 3, schedule: -1, risk: -1 }, next: "end", rate: "best",
          out: "<p>The ADA requires the centerline 16–18 in from the side wall (§604.2), and knobs are not accessible hardware (§404.2.7). An error found once usually repeats; checking similar conditions is what makes QC effective.</p>" },
        { t: "Fix the toilet room only; the rest can be handled with RFIs", fx: { quality: -1, risk: 1 }, next: "end", rate: "ok",
          out: "<p>Known errors issued to bidders become RFIs and possibly change orders. Fixing them now costs a few hours.</p>" },
        { t: "Issue on schedule and fix them in an addendum if bidders ask", fx: { quality: -2, risk: 2, schedule: 1 }, next: "end", rate: "poor",
          out: "<p>Issuing documents with known accessibility errors falls below the standard of care.</p>" }
      ] }
  },
  endings: [
    { if: (m) => m.quality >= 9 && m.risk <= 4, t: "Compliant, coordinated documents", d: "Good siting, a sound code strategy, the right systems and a QC process that catches errors before bidding. Expect few RFIs." },
    { if: (m) => m.quality <= 3 || m.risk >= 8, t: "Documents at risk", d: "Code, coordination or accessibility problems remain. Expect plan review comments, RFIs and change orders, and possible claims." },
    { if: () => true, t: "Workable documents with soft spots", d: "Most decisions were sound, but some issues will surface as RFIs or change orders during construction." }
  ] },

/* ---------------------------------------------------------- */
{ id: "sim-firehall", title: "Station 3 Fire Hall: construction administration", divs: ["ce"],
  objs: ["ce-1.1", "ce-2.1", "ce-2.2", "ce-3.1", "ce-3.2", "ce-3.3", "ce-4.1"],
  role: "You are the architect administering a design-bid-build contract (AIA A101/A201–2017) for a $6.2M fire hall.",
  brief: "Handle the issues that come up during construction. A201 sets your role: you act for the owner, interpret the documents impartially, and do not control the contractor's means and methods or safety.",
  start: "f1",
  nodes: {
    f1: { phase: "Construction", title: "An RFI that is really a change",
      situation: "<p>RFI 14 asks whether the apparatus bay floor drains can be moved 6 ft east \"to suit the trench drain supplier's standard lengths\". Moving them changes slab slopes and adds about $9,000 of work. The fire chief likes the idea.</p>",
      prompt: "How do you respond?",
      choices: [
        { t: "Answer that the change affects cost, so it needs a proposal request; issue one and let the owner decide with the price in hand", fx: { quality: 1, client: 1, risk: -1 }, next: "f2", rate: "best",
          out: "<p>An RFI response cannot change the contract sum or time. Changes go by change order, or CCD if the price is not agreed (A201 Article 7). The owner decides; you advise.</p>" },
        { t: "Approve it in the RFI response since the chief likes it", fx: { client: 1, risk: 2, fee: -1 }, next: "f2", rate: "poor",
          out: "<p>The contractor later submits a $9,000 change order claim citing your RFI response. You authorized a change you had no authority to make, and the owner is unhappy about the surprise cost.</p>" },
        { t: "Reject it: the drawings govern", fx: { client: -1, quality: 0 }, next: "f2", rate: "ok",
          out: "<p>Defensible, but the owner wanted to consider it. The better answer is to price it and let the owner decide.</p>" }
      ] },
    f2: { phase: "Construction", title: "Shop drawing with a hidden change",
      situation: "<p>The steel fabricator's shop drawings show the apparatus bay roof beams at W21 where the structural drawings show W24. The contractor's transmittal says nothing about the change. The contractor stamped the submittal as reviewed.</p>",
      prompt: "What do you do?",
      choices: [
        { t: "Send it to the structural engineer for review, mark the deviation \"Revise and resubmit\", and remind the contractor that deviations must be identified in writing", fx: { quality: 2, risk: -1 }, next: "f3", rate: "best",
          out: "<p>A201 §3.12.8: approval of a submittal does not relieve the contractor of responsibility for deviations it did not specifically identify in writing. Still, catching it now prevents an under-designed roof.</p>" },
        { t: "Approve it; the contractor is responsible for deviations anyway", fx: { quality: -2, risk: 2 }, next: "f3", rate: "poor",
          out: "<p>Technically the contractor remains responsible, but an architect who notices a structural deviation and approves it anyway has a hard time defending that review.</p>" },
        { t: "Change the beam size to W21 in an ASI to match", fx: { quality: -3, risk: 3 }, next: "f3", rate: "poor",
          out: "<p>You changed a structural design without the engineer. Never do this.</p>" }
      ] },
    f3: { phase: "Construction", title: "A substitution request",
      situation: "<p>Three months after award, the contractor asks to substitute a different overhead door manufacturer: 6% cheaper, 10-week shorter lead time, but a 2-year warranty instead of the specified 10-year warranty on the operator.</p>",
      prompt: "How do you handle it?",
      choices: [
        { t: "Evaluate it against the specification, tell the owner the warranty is not equal, and recommend acceptance only with a credit and a matching warranty; the owner decides by change order", fx: { client: 2, quality: 1, risk: -1 }, next: "f4", rate: "best",
          out: "<p>After award, substitutions need the owner's consent, after evaluation by the architect, through a change order or CCD (A201 §3.4.2). Unequal products can be accepted, but the owner should get the value back.</p>" },
        { t: "Accept it; it saves time and money", fx: { schedule: 1, quality: -2, risk: 1 }, next: "f4", rate: "poor",
          out: "<p>You accepted a lesser warranty on the owner's behalf without telling them. In two years the operator fails and the owner pays.</p>" },
        { t: "Reject it automatically because substitutions are only allowed before bid", fx: { client: -1, schedule: -1 }, next: "f4", rate: "ok",
          out: "<p>A201 allows substitutions after award with the owner's consent. Rejecting without evaluation may cost the owner a real schedule benefit.</p>" }
      ] },
    f4: { phase: "Construction", title: "Application for payment No. 5",
      situation: "<p>The application claims 90% complete on masonry. On site you see the masonry is roughly 65% complete. It also includes $40,000 of rooftop units stored at the supplier's yard in another town, with no bill of sale or insurance certificate.</p>",
      prompt: "What do you certify?",
      choices: [
        { t: "Certify masonry at the percentage you can support, exclude the off-site units until the A201 §9.3.2 conditions are met, and notify the contractor and owner of the reasons in writing within 7 days", fx: { quality: 2, risk: -1, client: 1 }, next: "f5", rate: "best",
          out: "<p>A201 §9.4.1 gives you seven days to certify or withhold with reasons. Off-site stored materials need the owner's advance approval and proof of insurance and title (§9.3.2).</p>" },
        { t: "Certify the full amount to keep the contractor happy", fx: { risk: 3, client: -2 }, next: "f5", rate: "poor",
          out: "<p>Your certificate is a representation to the owner. Certifying work that is not in place exposes you if the contractor defaults.</p>" },
        { t: "Withhold the whole application until the contractor revises it", fx: { client: 0, schedule: -1, risk: 1 }, next: "f5", rate: "ok",
          out: "<p>You may withhold only to the extent reasonably necessary to protect the owner (§9.5.1). Withholding everything could trigger the contractor's right to stop work for nonpayment (§9.7).</p>" }
      ] },
    f5: { phase: "Construction", title: "Deficient work",
      situation: "<p>Concrete cylinder breaks for the apparatus bay slab come back at 3,200 psi against a specified 4,000 psi. The slab is already placed and the contractor wants to keep going.</p>",
      prompt: "What do you do?",
      choices: [
        { t: "Notify the owner and contractor that the results do not meet the specification, require further testing (cores) and the structural engineer's evaluation before accepting or rejecting the slab", fx: { quality: 2, risk: -1 }, next: "f6", rate: "best",
          out: "<p>Low cylinder results start an investigation, not an automatic tear-out. You have authority to reject nonconforming work and require additional testing (A201 §4.2.6, §13.4.2). If the work does not conform, the contractor pays for the testing and correction (§13.4.3).</p>" },
        { t: "Order the slab removed immediately", fx: { schedule: -2, client: -1, risk: 1 }, next: "f6", rate: "ok",
          out: "<p>Premature. Cores may show adequate strength, or the engineer may accept it with a credit. Investigate first.</p>" },
        { t: "Accept it; 80% of design strength is probably fine", fx: { quality: -3, risk: 3 }, next: "f6", rate: "poor",
          out: "<p>Accepting nonconforming structural work without the engineer's evaluation is a serious professional failure.</p>" }
      ] },
    f6: { phase: "Construction", title: "A delay claim",
      situation: "<p>The contractor gives written notice of a Claim for 15 days and $48,000, citing the owner's late approval of the apparatus bay door color and the concrete testing. The notice arrives 30 days after the color approval and 12 days after the core results.</p>",
      prompt: "As Initial Decision Maker, how do you approach it?",
      choices: [
        { t: "Review each part separately: note that notice of the color delay came after the 21-day limit (§15.1.3.1), check the critical-path effect of each event, and render a written, impartial decision with reasons", fx: { quality: 2, client: 1, risk: -1 }, next: "end", rate: "best",
          out: "<p>As IDM you must be impartial, even though the owner pays you. Late notice can bar part of a Claim. The testing delay depends on the results: if the slab did not conform, it is the contractor's delay.</p>" },
        { t: "Reject it outright to protect the owner", fx: { client: 1, risk: 2, quality: -1 }, next: "end", rate: "poor",
          out: "<p>Siding with the owner without analysis breaches your duty of impartiality and invites mediation and arbitration you will lose.</p>" },
        { t: "Grant it in full to keep the project moving", fx: { client: -2, fee: 0, risk: 1 }, next: "end", rate: "poor",
          out: "<p>You gave away the owner's money without checking notice, causation or the critical path.</p>" }
      ] }
  },
  endings: [
    { if: (m) => m.quality >= 9 && m.risk <= 3, t: "Well-administered project", d: "You stayed inside your A201 role: impartial, documented, protecting the owner's interests without taking control of the contractor's work." },
    { if: (m) => m.risk >= 8, t: "Exposure for the architect", d: "Several decisions went beyond your authority or certified things you could not support. Expect the owner or contractor to look to you for losses." },
    { if: () => true, t: "Completed with friction", d: "The building gets finished, but some decisions cost the owner money or time that careful administration would have saved." }
  ] }
];
