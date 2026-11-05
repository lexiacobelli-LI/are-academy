/* QUESTION BANK — original items written for this platform.
   type: mc (single), ms (check all), calc (numeric), order (sequence),
         match (pair each item), hot (hotspot on a diagram)
   diff: 1 foundational · 2 applied · 3 analytical
   For mc/ms, `why` explains each option in order. */
ARE.Q = ARE.Q || [];
const Q = (o) => ARE.Q.push(o);

/* ---------------- PcM ---------------- */
Q({ id: "q-pcm-01", div: "pcm", obj: "pcm-2.1", lesson: "pcm-finance", type: "calc", diff: 1, fmt: "Calculation",
  q: "An associate is paid for 2,080 hours in a year and charges 1,560 hours to projects. What is the associate's utilization rate?",
  ans: 75, tol: 0.5, unit: "%",
  explain: "Utilization = billable hours ÷ total hours paid = 1,560 ÷ 2,080 = 0.75, or 75%.",
  ref: "Architect's Handbook of Professional Practice, 15th ed. — financial management" });

Q({ id: "q-pcm-02", div: "pcm", obj: "pcm-2.1", lesson: "pcm-finance", type: "calc", diff: 2, fmt: "Calculation",
  q: "A firm reports: gross revenue $3,200,000; consultant costs $600,000; reimbursable expenses $100,000; direct labor $800,000; indirect expenses $1,240,000. What is the firm's net multiplier? (Two decimals.)",
  ans: 3.13, tol: 0.011, unit: "",
  explain: "NOR = 3,200,000 − 600,000 − 100,000 = 2,500,000. Net multiplier = NOR ÷ direct labor = 2,500,000 ÷ 800,000 = 3.125 ≈ 3.13. Indirect expenses are not used in this ratio; they set the break-even rate (1 + 1,240,000 ÷ 800,000 = 2.55).",
  ref: "Architect's Handbook of Professional Practice, 15th ed." });

Q({ id: "q-pcm-03", div: "pcm", obj: "pcm-2.1", lesson: "pcm-finance", type: "mc", diff: 3, fmt: "Scenario",
  q: "A firm's net multiplier is 2.6 and its break-even rate is 2.9. Projects are finishing on their labor budgets. Firm-wide utilization has fallen to 58% from a historical 68% because several staff have been waiting for new work. Which action would MOST directly restore profitability?",
  opts: ["Raise billing multipliers on all active contracts", "Reduce rent by moving to a smaller office", "Rebalance staffing to the backlog and reduce non-billable time", "Hire additional production staff to pursue more work"],
  ans: 2,
  why: ["Active contracts have fixed terms; you generally cannot raise rates mid-contract, and pricing is not the identified problem.",
    "Rent is one overhead item; cutting it helps a little but ignores the cause.",
    "Correct. Low utilization moves salary from direct labor into overhead, raising the overhead rate and the break-even rate. Restoring utilization addresses the cause.",
    "Adding staff without backlog lowers utilization further."],
  explain: "When projects are on budget, the gap between net multiplier and break-even comes from overhead. Here overhead rose because idle salary is counted as indirect expense.",
  ref: "Architect's Handbook of Professional Practice, 15th ed." });

Q({ id: "q-pcm-04", div: "pcm", obj: "pcm-2.2", lesson: "pcm-risk", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "An owner files a claim alleging that a structural detail on the architect's drawings was negligently designed. Which policy is intended to respond?",
  opts: ["Commercial general liability", "Professional liability (errors and omissions)", "Workers' compensation", "Valuable papers coverage"],
  ans: 1,
  why: ["General liability covers bodily injury and property damage from non-professional operations; it usually excludes professional services.",
    "Correct. Professional liability covers negligent acts, errors and omissions in professional services.",
    "Workers' compensation covers employee job injuries.",
    "Valuable papers coverage protects records and documents from loss."],
  explain: "Design negligence claims are the core risk professional liability insurance exists to cover.",
  ref: "Architect's Handbook of Professional Practice — risk management" });

Q({ id: "q-pcm-05", div: "pcm", obj: "pcm-2.2", lesson: "pcm-risk", type: "mc", diff: 2, fmt: "Scenario",
  q: "A sole practitioner is closing her practice after 30 years and will stop renewing her claims-made professional liability policy. What should she do to remain protected against claims on past projects?",
  opts: ["Nothing; the policy in force when each project was designed will respond", "Purchase an extended reporting period (tail) endorsement", "Convert to an occurrence-based general liability policy", "Form an LLC so past claims cannot reach her personally"],
  ans: 1,
  why: ["Wrong: claims-made coverage responds only to claims made while a policy is in force.",
    "Correct. A tail extends the time to report claims arising from work performed while the policy was active.",
    "General liability does not cover professional services.",
    "An entity formed now does not shield her from liability for her own past negligence."],
  explain: "Claims on design work can arrive years after construction, within the statute of repose. Without a tail, a retired architect is uninsured for those claims.",
  ref: "Architect's Handbook of Professional Practice — insurance" });

Q({ id: "q-pcm-06", div: "pcm", obj: "pcm-1.4", lesson: "pcm-risk", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two clauses in a proposed owner–architect agreement would raise the architect's obligation above the standard of care? Select two.",
  opts: ["“The Architect warrants that the Drawings will be free of errors and omissions.”",
    "“The Architect shall perform its services consistent with the professional skill and care ordinarily provided by architects practicing in the same or similar locality under similar circumstances.”",
    "“The Architect guarantees that the Project will achieve LEED Gold certification.”",
    "“The Architect shall review laws and regulations applicable to its services and use reasonable efforts to comply.”",
    "“The Architect shall coordinate its services with those services provided by the Owner and the Owner's consultants.”",
    "“The Architect shall be entitled to rely on the accuracy and completeness of services and information furnished by the Owner.”"],
  ans: [0, 2],
  why: ["Correct. A warranty of error-free documents is a promise of perfection.",
    "This is the standard of care as written in B101–2017.",
    "Correct. Certification depends on factors outside the architect's control; a guarantee is an express warranty.",
    "Reasonable-efforts language is consistent with the standard of care.",
    "Coordination with the owner's consultants is an ordinary B101 obligation, not a heightened one.",
    "A right to rely on owner-furnished information limits, rather than raises, the architect's obligation."],
  explain: "Warranties and guarantees create contractual liability beyond negligence, which professional liability policies typically exclude.",
  ref: "AIA B101–2017, §2.2 (standard of care)" });

Q({ id: "q-pcm-07", div: "pcm", obj: "pcm-3.2", lesson: "pcm-delivery", type: "match", diff: 2, fmt: "Matching",
  q: "Match each owner priority to the delivery method that best serves it.",
  pairs: [["One contract and one party responsible for design and construction", "Design-build"],
    ["Lowest competitive price on complete documents; schedule is flexible", "Design-bid-build"],
    ["Guaranteed maximum price and builder input during design, with the owner keeping a direct contract with the architect", "CM at risk"],
    ["Shared risk and reward through one multi-party agreement", "Integrated project delivery"]],
  explain: "Each method trades price certainty, speed, owner control and collaboration differently. CM at risk keeps the owner–architect relationship while bringing in a builder who commits to a GMP.",
  ref: "Architect's Handbook of Professional Practice — project delivery" });

Q({ id: "q-pcm-08", div: "pcm", obj: "pcm-3.2", lesson: "pcm-delivery", type: "mc", diff: 2, fmt: "Scenario",
  q: "A client asks for a feasibility study of a 1920s warehouse with unknown structural condition and no existing drawings. Which compensation method best protects the architect?",
  opts: ["Stipulated sum", "Percentage of construction cost", "Hourly with a not-to-exceed limit", "Unit cost per square foot"],
  ans: 2,
  why: ["A lump sum on an undefined scope puts the overrun risk on the architect.",
    "There is no construction cost yet to base it on.",
    "Correct. Hourly billing matches pay to effort on an uncertain scope, and the cap gives the owner budget certainty.",
    "Unit pricing suits repetitive, well-defined work."],
  explain: "Undefined scope calls for time-based compensation.",
  ref: "Architect's Handbook of Professional Practice — compensation" });

Q({ id: "q-pcm-09", div: "pcm", obj: "pcm-3.2", lesson: "pcm-delivery", type: "mc", diff: 3, fmt: "Multiple choice",
  q: "Under construction management at risk, which party typically holds the contracts with the trade contractors?",
  opts: ["The owner", "The architect", "The construction manager", "Each trade contracts with the owner and the construction manager jointly"],
  ans: 2,
  why: ["That describes CM as adviser (agency), where the owner holds the trade contracts.",
    "The architect does not hold construction contracts.",
    "Correct. The CM at risk acts as the constructor, holds the trade contracts and carries the GMP risk.",
    "Joint contracting is not the standard arrangement."],
  explain: "The key distinction between CM adviser and CM at risk is who holds the trade contracts and who carries cost risk.",
  ref: "AIA A133–2019 (Owner–CMc) synopsis" });

Q({ id: "q-pcm-10", div: "pcm", obj: "pcm-1.3", lesson: "pcm-risk", type: "mc", diff: 2, fmt: "Ethics",
  q: "A developer asks a licensed architect to seal a set of drawings prepared by an unlicensed designer the architect has never supervised, for a fee. What should the architect do?",
  opts: ["Seal them after a careful review for code compliance", "Seal them and note on the cover sheet that she did not prepare them", "Decline unless the work was prepared under her responsible control", "Seal only the life-safety sheets"],
  ans: 2,
  why: ["Review after the fact does not establish responsible control. This is 'plan stamping'.",
    "A disclaimer does not cure sealing work she did not control.",
    "Correct. Licensing laws and the rules of conduct allow sealing only documents prepared by the architect or under the architect's responsible control.",
    "Partial sealing has the same problem."],
  explain: "Responsible control is the legal basis for sealing. Sealing work you did not control misrepresents its authorship to the public and the building official.",
  ref: "NCARB Model Rules of Conduct; NCARB Legislative Guidelines (responsible control)" });

Q({ id: "q-pcm-11", div: "pcm", obj: "pcm-4.1", lesson: "pcm-risk", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Two architects want to shield their personal assets from the firm's business debts while keeping pass-through taxation by default. Which entity fits best (where state law permits architects to use it)?",
  opts: ["General partnership", "Sole proprietorship", "Limited liability company (LLC/PLLC)", "C corporation"],
  ans: 2,
  why: ["General partners are personally liable for partnership debts.",
    "A sole proprietorship has one owner and no liability shield.",
    "Correct. An LLC shields owners from business debts and is taxed as a pass-through by default.",
    "A C corporation shields owners but is taxed at the entity level (double taxation on distributions)."],
  explain: "No entity protects an architect from personal liability for their own professional negligence.",
  ref: "Architect's Handbook of Professional Practice — firm legal structures" });

Q({ id: "q-pcm-12", div: "pcm", obj: "pcm-2.2", lesson: "pcm-risk", type: "order", diff: 2, fmt: "Drag to sequence",
  q: "Put the steps for resolving an owner–architect dispute under B101–2017 in order.",
  items: ["Parties attempt to resolve the dispute directly", "Mediation", "Binding dispute resolution by the method selected in the agreement (arbitration, litigation or other)"],
  explain: "The 2017 AIA documents make mediation a condition precedent to binding dispute resolution. If no binding method is selected in the agreement, litigation applies.",
  ref: "AIA B101–2017, Article 8" });

Q({ id: "q-pcm-13", div: "pcm", obj: "pcm-2.2", lesson: "pcm-risk", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A statute of repose for claims against design professionals most commonly begins to run from which event?",
  opts: ["Discovery of the defect", "Substantial completion of the project", "Signing of the owner–architect agreement", "Final payment to the architect"],
  ans: 1,
  why: ["Discovery typically starts a statute of limitations, not a statute of repose.",
    "Correct. Repose periods usually run from substantial completion (or a similar fixed event), regardless of when a defect is found.",
    "Contract signing is not the usual trigger.",
    "Final payment is not the usual trigger."],
  explain: "A statute of repose sets an absolute outer limit; periods and triggers vary by state.",
  ref: "Architect's Handbook of Professional Practice — legal concepts" });

/* ---------------- PjM ---------------- */
Q({ id: "q-pjm-01", div: "pjm", obj: "pjm-2.2", lesson: "pjm-schedule", type: "calc", diff: 2, fmt: "Calculation",
  q: "Activities: A (3 days) starts the project. B (5 days) and C (2 days) both follow A. D (4 days) follows both B and C. E (2 days) follows D and ends the project. What is the minimum project duration in days?",
  ans: 14, tol: 0, unit: "days",
  explain: "Paths: A–B–D–E = 3 + 5 + 4 + 2 = 14 days; A–C–D–E = 3 + 2 + 4 + 2 = 11 days. The longest path (14 days) is critical and sets the duration.",
  ref: "PMI, PMBOK Guide — critical path method" });

Q({ id: "q-pjm-02", div: "pjm", obj: "pjm-2.2", lesson: "pjm-schedule", type: "calc", diff: 2, fmt: "Calculation",
  q: "Using the same network (A 3, B 5, C 2, D 4, E 2; B and C follow A; D follows B and C; E follows D), how many days of total float does activity C have?",
  ans: 3, tol: 0, unit: "days",
  explain: "C: ES = 3, EF = 5. D cannot start until day 8 (after B), so C's LF = 8 and LS = 6. Total float = LS − ES = 6 − 3 = 3 days. Shortcut: 14 (critical) − 11 (longest path through C) = 3.",
  ref: "PMI, PMBOK Guide" });

Q({ id: "q-pjm-03", div: "pjm", obj: "pjm-4.1", lesson: "pjm-schedule", type: "calc", diff: 3, fmt: "Calculation",
  q: "The CD phase has a labor budget of $80,000. The team reports the phase is 50% complete and has spent $50,000. If performance continues at the same efficiency, what is the estimate at completion for the phase?",
  ans: 100000, tol: 1, unit: "$",
  explain: "EV = 0.50 × 80,000 = 40,000. CPI = EV ÷ AC = 40,000 ÷ 50,000 = 0.80. EAC = BAC ÷ CPI = 80,000 ÷ 0.80 = $100,000, a $20,000 projected overrun.",
  ref: "PMI, PMBOK Guide — earned value management" });

Q({ id: "q-pjm-04", div: "pjm", obj: "pjm-3.3", lesson: "pjm-contracts", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Who are the parties to the owner–contractor agreement (A101) to which A201 is attached as the general conditions?",
  opts: ["Owner, contractor and architect", "Owner and contractor", "Architect and contractor", "Owner and architect"],
  ans: 1,
  why: ["The architect is named in A201 and given duties, but is not a party to the construction contract.",
    "Correct. Only the owner and contractor sign A101.",
    "There is no contract between architect and contractor.",
    "That is B101."],
  explain: "The architect's construction-phase authority comes from A201's description of the role and the architect's obligation under B101 to perform it.",
  ref: "AIA A201–2017, §1.1.2 and Article 4" });

Q({ id: "q-pjm-05", div: "pjm", obj: "pjm-4.2", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Scenario",
  q: "During construction documents, the owner asks the architect to prepare a full second set of interior elevations with an alternative finish palette for comparison. What should the architect do FIRST?",
  opts: ["Prepare the elevations and bill them as an additional service on the next invoice", "Decline because the request is outside basic services", "Notify the owner in writing that this is an additional service, with its fee and schedule effect, and obtain written authorization", "Ask the interior design consultant to absorb the work in their fee"],
  ans: 2,
  why: ["Billing after the fact risks a fee dispute; authorization should come first.",
    "Additional services are legitimate; declining is unnecessary.",
    "Correct. B101–2017 requires notice and owner authorization before the architect provides additional services.",
    "Shifting the burden to a consultant without a contract change is improper."],
  explain: "Written notice and authorization before starting protects the fee and the schedule.",
  ref: "AIA B101–2017, Article 4 (Supplemental and Additional Services)" });

Q({ id: "q-pjm-06", div: "pjm", obj: "pjm-3.2", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "How should an architect–consultant agreement (C401) relate to the owner–architect agreement (B101)?",
  opts: ["It should be independent so the consultant's terms do not affect the owner", "The consultant's obligations to the architect should be consistent with the architect's obligations to the owner for that consultant's services", "It should give the consultant direct rights against the owner", "It should be signed by the owner as well"],
  ans: 1,
  why: ["Independent terms create gaps the architect must cover.",
    "Correct. Flow-down keeps the consultant bound to the same standard, schedule and requirements the architect owes the owner.",
    "Consultants generally have no contract with the owner in this arrangement.",
    "The owner is not a party to C401."],
  explain: "C401 is drafted to coordinate with B101; check insurance, schedule, ownership of documents and dispute terms.",
  ref: "AIA C401–2017" });

Q({ id: "q-pjm-07", div: "pjm", obj: "pjm-2.1", lesson: "pjm-schedule", type: "calc", diff: 2, fmt: "Calculation",
  q: "The total fee is $500,000, of which $150,000 is for consultants. Using a traditional phase split (SD 15%, DD 20%, CD 40%, bidding 5%, CA 20%) applied to the architect's own portion, how much fee is allocated to the CD phase?",
  ans: 140000, tol: 1, unit: "$",
  explain: "Architect's portion = 500,000 − 150,000 = 350,000. CD = 0.40 × 350,000 = $140,000.",
  ref: "Architect's Handbook of Professional Practice — project management" });

Q({ id: "q-pjm-08", div: "pjm", obj: "pjm-3.1", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under B101–2017, in which phase does the architect prepare documents that fix and describe the size and character of the project, including structural, mechanical and electrical systems and materials?",
  opts: ["Schematic Design", "Design Development", "Construction Documents", "Procurement"],
  ans: 1,
  why: ["SD establishes the general concept and options.",
    "Correct. DD fixes and describes the size and character of the project.",
    "CDs set forth requirements for construction in detail.",
    "Procurement covers bidding or negotiation."],
  explain: "Know the verbs of each phase: SD explores, DD fixes, CD details.",
  ref: "AIA B101–2017, Article 3" });

Q({ id: "q-pjm-09", div: "pjm", obj: "pjm-5.2", lesson: "pjm-contracts", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "Which three are part of an architect's internal quality-control process for construction documents? Select three.",
  opts: ["Interdisciplinary coordination checks at set milestones", "Directing the contractor's construction sequence", "A code compliance review against a checklist", "Peer review of the set by a senior architect not on the team", "Verifying the contractor's crew sizes on site", "Approving the contractor's site safety program"],
  ans: [0, 2, 3],
  why: ["Correct.", "Means, methods and sequences belong to the contractor.", "Correct.", "Correct.", "Crew sizing is a contractor matter.", "Site safety is the contractor's responsibility (A201 Article 10)."],
  explain: "QC belongs to the architect's own work product: checking, coordinating and reviewing documents before issue.",
  ref: "Architect's Handbook of Professional Practice — quality management" });

Q({ id: "q-pjm-10", div: "pjm", obj: "pjm-3.4", lesson: "pjm-contracts", type: "mc", diff: 3, fmt: "Scenario",
  q: "The owner retained its own geotechnical engineer. The report arrives three weeks late, and the foundation design cannot proceed. Later, a soil condition the report did not identify causes a redesign. Which statement is most accurate under B101–2017?",
  opts: ["The architect is responsible for the late report because the architect coordinates all consultants", "The owner furnishes the geotechnical services, and the architect is entitled to rely on their accuracy; the architect should notify the owner of the schedule impact", "The architect must verify the geotechnical findings with independent borings", "The geotechnical engineer is the architect's consultant once the report is delivered"],
  ans: 1,
  why: ["The architect coordinates its own consultants; the owner is responsible for services it furnishes.",
    "Correct. B101 makes the owner responsible for furnishing such services and entitles the architect to rely on them. Redesign from a missed condition may be an additional service.",
    "Independent verification is not required and would duplicate the owner's consultant.",
    "Delivery of the report does not change the contracting relationship."],
  explain: "Owner-furnished information (surveys, geotechnical reports) is the owner's responsibility; the architect relies on it and notifies the owner of impacts.",
  ref: "AIA B101–2017, §3.1.2 (reliance on owner-furnished services) and Article 5 (Owner's Responsibilities)" });

Q({ id: "q-pjm-11", div: "pjm", obj: "pjm-3.1", lesson: "pjm-contracts", type: "order", diff: 1, fmt: "Drag to sequence",
  q: "Put the phases of basic services under B101–2017 in order.",
  items: ["Schematic Design", "Design Development", "Construction Documents", "Procurement", "Construction"],
  explain: "B101–2017 Article 3 lists the phases in this order.",
  ref: "AIA B101–2017, Article 3" });

Q({ id: "q-pjm-12", div: "pjm", obj: "pjm-3.1", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under B101–2017, who prepares the estimate of the Cost of the Work during design as part of basic services?",
  opts: ["The contractor", "The owner", "The architect", "No estimate is required"],
  ans: 2,
  why: ["There is no contractor during design in design-bid-build.",
    "The owner sets the budget but does not prepare the estimate.",
    "Correct. The architect prepares a preliminary estimate at SD (§3.2.6) and updates it at DD (§3.3.2) and CD (§3.4.4), using area, volume or similar conceptual techniques (§6.3). A detailed estimate by the architect is a Supplemental Service.",
    "B101 requires estimates as a basic service."],
  explain: "If the estimate exceeds the owner's budget, B101 sets out the owner's options and the architect's obligation to modify the documents.",
  ref: "AIA B101–2017, §§3.2.6, 3.3.2, 3.4.4 and 6.3" });

Q({ id: "q-pjm-13", div: "pjm", obj: "pjm-4.4", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Scenario",
  q: "A plans examiner's comment requires an additional exit stair based on an interpretation the architect believes is incorrect. What is the best FIRST step?",
  opts: ["Revise the drawings to comply and bill the owner", "Meet with the examiner, citing the specific code sections and the calculation, and document the outcome", "File an appeal with the board of appeals immediately", "Ask the contractor to resolve it during construction"],
  ans: 1,
  why: ["Complying without discussion may add cost unnecessarily.",
    "Correct. Most interpretations are resolved by discussion with the code official. Inform the owner and record the result.",
    "An appeal is the next step if discussion fails.",
    "Permit issues must be resolved before construction."],
  explain: "The building official interprets the code. Start with a documented technical discussion, then use the formal appeal process if needed.",
  ref: "2021 IBC, Chapter 1 (§104 duties of the building official; §113 board of appeals)" });

/* ---------------- PA ---------------- */
Q({ id: "q-pa-01", div: "pa", obj: "pa-2.2", lesson: "pa-zoning", type: "calc", diff: 1, fmt: "Calculation",
  q: "A 100 ft × 150 ft lot is zoned with a floor area ratio of 2.5. What is the maximum gross floor area permitted by FAR alone?",
  ans: 37500, tol: 1, unit: "sf",
  explain: "Lot area = 15,000 sf. Max GFA = 2.5 × 15,000 = 37,500 sf.",
  ref: "Local zoning ordinance (FAR definition)" });

Q({ id: "q-pa-02", div: "pa", obj: "pa-2.2", lesson: "pa-zoning", type: "calc", diff: 3, fmt: "Calculation",
  q: "A lot measures 80 ft wide × 160 ft deep. Zoning: FAR 2.0; maximum lot coverage 50%; height limit 3 stories; setbacks front 20 ft, rear 15 ft, each side 5 ft. Assuming each story uses the full allowable footprint, what is the maximum gross floor area?",
  ans: 19200, tol: 1, unit: "sf",
  explain: "Lot area = 12,800 sf. FAR → 25,600 sf. Coverage → 6,400 sf footprint. Setback envelope = 70 × 125 = 8,750 sf, so coverage governs the footprint. Height → 3 × 6,400 = 19,200 sf, which is less than the FAR limit. Maximum = 19,200 sf.",
  ref: "Local zoning ordinance" });

Q({ id: "q-pa-03", div: "pa", obj: "pa-2.3", lesson: "pa-zoning", type: "match", diff: 2, fmt: "Matching",
  q: "Match each situation to the zoning tool that addresses it.",
  pairs: [["An irregular lot makes the 25 ft rear setback unworkable", "Area (dimensional) variance"],
    ["The ordinance lists a daycare as allowed in the district subject to review and conditions", "Special (conditional) use permit"],
    ["A corner store built in 1955 in what is now a residential-only district", "Legal nonconforming use"],
    ["The owner wants the parcel reclassified from industrial to mixed-use", "Rezoning (map amendment)"]],
  explain: "Variances relieve dimensional hardship; conditional uses are anticipated by the ordinance; nonconforming uses predate current rules; rezoning changes the district itself.",
  ref: "Planning and Urban Design Standards — zoning administration" });

Q({ id: "q-pa-04", div: "pa", obj: "pa-4.3", lesson: "pa-program", type: "calc", diff: 1, fmt: "Calculation",
  q: "A program totals 21,000 net assignable square feet. The target efficiency ratio (net ÷ gross) is 0.75. What gross area should the architect plan for?",
  ans: 28000, tol: 1, unit: "gsf",
  explain: "Gross = net ÷ efficiency = 21,000 ÷ 0.75 = 28,000 gsf.",
  ref: "Pena & Parshall, Problem Seeking" });

Q({ id: "q-pa-05", div: "pa", obj: "pa-1.1", lesson: "pa-program", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "In a hot climate in the northern hemisphere, which shading device is most effective for a west-facing window?",
  opts: ["A horizontal overhang", "Vertical fins", "A light shelf", "Clear glazing with an interior blind"],
  ans: 1,
  why: ["Low afternoon sun passes under horizontal overhangs on west faces.",
    "Correct. Vertical fins (ideally angled toward the north) block low-angle east and west sun.",
    "Light shelves redirect daylight; they are not primarily for low-angle sun control.",
    "Interior blinds stop glare but the heat is already inside."],
  explain: "Horizontal devices suit south faces; vertical devices suit east and west faces.",
  ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-pa-06", div: "pa", obj: "pa-1.2", lesson: "pa-program", type: "calc", diff: 2, fmt: "Calculation",
  q: "A proposed walk rises 3 ft over a horizontal distance of 60 ft. What is its slope, as a percentage?",
  ans: 5, tol: 0.05, unit: "%",
  explain: "Slope = 3 ÷ 60 × 100 = 5%. That is 1:20, the steepest running slope allowed for an accessible route before it must be designed as a ramp.",
  ref: "2010 ADA Standards §403.3" });

Q({ id: "q-pa-07", div: "pa", obj: "pa-3.2", lesson: "pa-program", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A lender requires an environmental assessment before purchase of a former gas station site. Which assessment involves collecting and testing soil and groundwater samples?",
  opts: ["Phase I Environmental Site Assessment", "Phase II Environmental Site Assessment", "A geotechnical boring log", "An ALTA/NSPS land title survey"],
  ans: 1,
  why: ["Phase I is records review, interviews and site reconnaissance; no sampling.",
    "Correct. Phase II samples and tests to confirm or rule out contamination flagged by Phase I.",
    "Geotechnical work tests soil for engineering properties, not contamination.",
    "A title survey maps boundaries, easements and improvements."],
  explain: "Phase I (per ASTM E1527) identifies recognized environmental conditions; Phase II (ASTM E1903) investigates them.",
  ref: "ASTM E1527-21 and E1903" });

Q({ id: "q-pa-08", div: "pa", obj: "pa-2.3", lesson: "pa-zoning", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under a typical zoning ordinance, how does a legal nonconforming use most commonly lose its protected status?",
  opts: ["When the property is sold", "When the use is discontinued or abandoned for the period the ordinance sets", "When the zoning map is reprinted", "When the building is repainted"],
  ans: 1,
  why: ["Status normally runs with the land, not the owner.",
    "Correct. Abandonment beyond a set period (often 6–12 months) ends the protection.",
    "Reprinting the map has no effect.",
    "Ordinary maintenance is allowed."],
  explain: "Ordinances also commonly limit expansion and reconstruction after major damage.",
  ref: "Local zoning ordinance (nonconformities)" });

Q({ id: "q-pa-09", div: "pa", obj: "pa-4.1", lesson: "pa-program", type: "mc", diff: 3, fmt: "Scenario",
  q: "An owner wants to convert the upper floor of a 1970s office building into an event hall with movable seating. Which existing-building condition should the architect investigate FIRST?",
  opts: ["Exterior window style", "The floor structure's live load capacity", "Ceiling tile condition", "Carpet age"],
  ans: 1,
  why: ["Aesthetic items do not govern feasibility.",
    "Correct. Office floors are commonly designed for about 50 psf live load; assembly with movable seats requires about 100 psf under ASCE 7. Inadequate capacity can make the conversion infeasible.",
    "Finishes are replaceable.",
    "Finishes are replaceable."],
  explain: "Change of occupancy triggers structural, egress and fire-protection review. Structural capacity is the most expensive to fix.",
  ref: "ASCE 7-22, Table 4.3-1; 2021 IEBC (change of occupancy)" });

Q({ id: "q-pa-10", div: "pa", obj: "pa-2.1", lesson: "pa-zoning", type: "mc", diff: 2, fmt: "Code interpretation",
  q: "Under the 2021 IBC, a restaurant with an occupant load of 60 is most likely classified as which occupancy?",
  opts: ["Group B", "Group A-2", "Group M", "Group A-3"],
  ans: 1,
  why: ["A dining space with fewer than 50 occupants may be classified as Group B; 60 exceeds that.",
    "Correct. Restaurants and similar food and drink spaces are Group A-2.",
    "Group M is mercantile.",
    "Group A-3 covers worship, recreation and similar assembly uses not elsewhere classified."],
  explain: "Small assembly spaces under 50 occupants can be treated as Group B (IBC §303.1.1), but 60 occupants puts this restaurant in A-2.",
  ref: "2021 IBC §303.1.1 and §303.3" });

Q({ id: "q-pa-11", div: "pa", obj: "pa-1.1", lesson: "pa-program", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "Which three strategies suit a hot-arid climate? Select three.",
  opts: ["High thermal mass walls with night ventilation", "Shaded courtyards", "Lightweight, raised construction to catch breezes", "Small, shaded openings", "Large unshaded west-facing glazing", "Dark, heat-absorbing roof surfaces"],
  ans: [0, 1, 3],
  why: ["Correct. Mass absorbs daytime heat; cool night air flushes it.", "Correct.", "This suits hot-humid climates, where large day–night swings are absent.", "Correct.", "This maximizes unwanted heat gain.", "Dark roofs absorb solar heat; light, reflective roofs suit hot-arid sites."],
  explain: "Hot-arid climates have large daily temperature swings, which thermal mass exploits.",
  ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-pa-12", div: "pa", obj: "pa-1.2", lesson: "pa-program", type: "mc", diff: 1, fmt: "Diagram interpretation",
  q: "On a topographic survey, contour lines are drawn very close together in one area of the site. What does this indicate?",
  opts: ["A flat area", "A steep slope", "A drainage swale", "A wetland"],
  ans: 1,
  why: ["Flat areas show widely spaced contours.", "Correct. Close spacing means a large change in elevation over a short distance.", "A swale shows as contours that point uphill.", "Wetlands are shown by symbols or delineation lines."],
  explain: "Contour spacing is inversely related to slope.",
  ref: "Ching, Site Planning concepts; Planning and Urban Design Standards" });
