/* Handbook-based practice lessons + key takeaways for every lesson.
   Source framework: AIA, The Architect's Handbook of Professional Practice, 15th ed. (Wiley, 2013).
   Explanations are original; no Handbook text is reproduced. */

ARE.LESSONS.push({
  id: "pcm-firm", div: "pcm", obj: ["pcm-1.1", "pcm-1.2", "pcm-2.3", "pcm-4.2"], title: "Running the Firm: People, Law & Growth",
  minutes: 35, level: "Practice",
  summary: "How a firm staffs, follows employment law, plans strategically, and wins work through marketing and business development.",
  objectives: [
    "Apply the main federal employment laws by firm size and classify employees correctly.",
    "Explain the difference between an employee and an independent contractor.",
    "Describe a strategic plan, a marketing plan and a go/no-go decision for pursuing work.",
    "Explain qualifications-based selection and how public owners hire architects."
  ],
  why: "A firm's most important asset is its people, and its future depends on a steady pipeline of the right projects. Both are managed deliberately in well-run firms.",
  exam: "Items describe a staffing or hiring situation and ask which law applies, or describe a pursuit and ask whether to bid, how to price it, or how the owner will select.",
  body: `
<h3>Employment law the exam expects (US federal, simplified)</h3>
<table class="tbl"><thead><tr><th>Law</th><th>What it governs</th><th>Applies to</th></tr></thead><tbody>
<tr><td>Fair Labor Standards Act (FLSA)</td><td>Minimum wage; overtime at 1.5× for non-exempt employees over 40 hours/week</td><td>Most employers</td></tr>
<tr><td>Title VII, Civil Rights Act</td><td>Discrimination by race, color, religion, sex, national origin</td><td>15+ employees</td></tr>
<tr><td>Americans with Disabilities Act, Title I</td><td>Employment discrimination; reasonable accommodation</td><td>15+ employees</td></tr>
<tr><td>Age Discrimination in Employment Act</td><td>Protects workers 40 and older</td><td>20+ employees</td></tr>
<tr><td>Family and Medical Leave Act</td><td>Up to 12 weeks unpaid, job-protected leave</td><td>50+ employees</td></tr>
<tr><td>Occupational Safety and Health Act</td><td>Safe workplace, recordkeeping</td><td>Most employers</td></tr>
</tbody></table>
<p>Whether an employee is <strong>exempt</strong> from overtime depends on salary level and duties, not job title. Interns and junior staff are usually <strong>non-exempt</strong>, so unpaid overtime is a legal risk. ADA <strong>Title III</strong> (public accommodations) is the part that governs building design; Title I governs the firm as an employer.</p>
<p>An <strong>independent contractor</strong> controls how and when the work is done, uses their own tools and serves other clients. If the firm controls the work like an employer, the worker is an employee regardless of the label, and misclassification brings back taxes and penalties.</p>

<h3>Strategic and business planning</h3>
<p>A <strong>strategic plan</strong> states where the firm wants to be (markets, size, services, ownership transition) over several years. A <strong>SWOT analysis</strong> (strengths, weaknesses, opportunities, threats) is a common starting tool. The <strong>business plan</strong> turns strategy into budgets and targets; the <strong>marketing plan</strong> names target clients and markets and the activities to reach them. Ownership <strong>succession</strong> planning should start years before principals retire.</p>

<h3>Winning work</h3>
<p><strong>Marketing</strong> builds the firm's reputation in chosen markets; <strong>business development</strong> pursues specific projects. Before pursuing, make a <strong>go/no-go decision</strong>: fit with strategy, relationship with the client, competition, available staff, fee potential and risk.</p>
<p>Public owners often use <strong>qualifications-based selection (QBS)</strong>: rank firms on qualifications first, then negotiate a fee with the top-ranked firm, moving to the next only if negotiation fails. US federal agencies must use QBS for architect-engineer services under the <strong>Brooks Act</strong>, and many states have similar laws. An <strong>RFQ</strong> asks for qualifications; an <strong>RFP</strong> asks for a proposal that may include approach and fee.</p>`,
  diagram: "",
  formulas: [
    { name: "Win rate", f: "Win rate = Proposals won ÷ Proposals submitted" },
    { name: "Backlog (months)", f: "Backlog = Remaining contracted fee ÷ Average monthly NOR" }
  ],
  example: { title: "Applying it", html: `<p>A 12-person firm receives an RFP for a hospital addition. It has never designed health care, its two senior staff are fully booked, and the fee is a fixed lump sum. A disciplined go/no-go review says no, or yes only with a health-care partner firm. Chasing work outside the firm's capacity and expertise raises risk more than it raises revenue.</p>` },
  mistakes: [
    "Treating a salaried employee as exempt from overtime because they are salaried. Duties and salary level decide.",
    "Calling a full-time drafter who works only for the firm an independent contractor.",
    "Assuming QBS means the cheapest qualified firm wins. Fee is negotiated after ranking."
  ],
  scenario: { prompt: "A 30-person firm asks interns to log 'unbilled' evening hours on a competition without pay. What is the problem?",
    answer: "Interns are typically non-exempt under the FLSA and must be paid overtime for hours over 40 in a week, including competition work. The firm also risks state wage claims. Pay the hours or limit the work to the normal workweek." },
  refs: [
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — firm management, human resources, marketing and business development topics", a: "Purchase" },
    { t: "US Department of Labor, FLSA overtime and exemption guidance", a: "Free (dol.gov)" },
    { t: "Brooks Act (40 U.S.C. §§1101–1104)", a: "Free (uscode.house.gov)" }
  ],
  check: ["q-pcm-14", "q-pcm-15", "q-pcm-16"]
});

ARE.LESSONS.push({
  id: "pjm-quality", div: "pjm", obj: ["pjm-1.1", "pjm-2.3", "pjm-5.2", "pjm-5.3", "pjm-5.4"], title: "Teams, Communication & Quality Management",
  minutes: 35, level: "Practice",
  summary: "Assemble the right team, keep a clear project record, and build QA/QC into the work instead of checking at the end.",
  objectives: [
    "Select team members and consultants against project needs.",
    "Choose the right communication instrument and keep a project record.",
    "Distinguish quality assurance from quality control and plan both.",
    "Use constructability and coordination reviews to reduce risk."
  ],
  why: "Most claims against architects trace back to coordination errors and poor records, not bad design ideas. Process prevents them.",
  exam: "PjM's Quality Control section is analysis/evaluation level. Expect scenarios asking which review would have caught an error, or what the architect should document.",
  body: `
<h3>Assembling the team</h3>
<p>Match the team to the project's type, size, schedule and client. Typical roles: a <strong>principal-in-charge</strong> (client relationship, contract), a <strong>project manager</strong> (scope, schedule, fee, team), a <strong>project architect</strong> (technical quality and coordination) and production staff. Select consultants for relevant experience, capacity, insurance and working relationship; QBS logic applies to consultants too.</p>

<h3>Communication and the project record</h3>
<ul>
<li><strong>Meeting minutes</strong>: issue promptly, record decisions and action items with owners and dates, and ask recipients to report corrections by a deadline.</li>
<li><strong>Transmittals</strong>: record what was sent, to whom and when.</li>
<li><strong>Decision log</strong>: owner approvals at each phase, signed where possible.</li>
<li><strong>Emails and calls</strong>: confirm verbal directions in writing.</li>
</ul>
<p>Communication on a design-bid-build project follows defined paths. Under A201–2017 §4.2.4, the owner and contractor must include the architect in all communications that affect the architect's services or responsibilities. Consultants communicate through the architect.</p>

<h3>QA versus QC</h3>
<p><strong>Quality assurance</strong> is the system that prevents errors: standards, checklists, templates, staffing, training and a quality plan for the project. <strong>Quality control</strong> checks the work: milestone reviews, cross-discipline coordination checks, code reviews and peer review by someone outside the team. Schedule QC reviews in the work plan (for example at 50% and 90% CDs) with time to fix what they find.</p>

<h3>Constructability and coordination</h3>
<p>A <strong>constructability review</strong> asks whether the building can be built as drawn, in a sensible sequence, with available materials and trades. <strong>Coordination reviews</strong> overlay disciplines: structure against ceilings and ducts, plumbing against beams, door swings against equipment. BIM <strong>clash detection</strong> helps but does not replace a person reading the set.</p>`,
  diagram: "",
  formulas: [],
  example: { title: "Applying it", html: `<p>At the 90% CD review of a municipal fire hall, the project architect overlays the structural framing plan on the reflected ceiling plan and finds a W-beam crossing the apparatus bay exhaust duct at the same elevation. Catching it now costs a day of redesign; catching it in the field would cost a change order and a delay.</p>` },
  mistakes: [
    "Doing all checking at the end. Reviews must be scheduled and resourced.",
    "Letting the owner talk directly to the contractor about design changes during construction without the architect.",
    "Relying on software clash detection without a human review."
  ],
  scenario: { prompt: "An owner's facilities manager verbally approves a revised toilet room layout during a site meeting. What should you do?",
    answer: "Record the decision in the meeting minutes and confirm it in writing to the owner's designated representative, since the facilities manager may not have authority. If it changes the contract, process it as a change through the proper instrument." },
  refs: [
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project management, quality management and risk management topics", a: "Purchase" },
    { t: "AIA E203–2013 and G202–2013 (BIM and digital data protocols)", a: "Purchase" }
  ],
  check: ["q-pjm-14", "q-pjm-15", "q-pjm-16"]
});

/* ---- New questions for Handbook-based lessons ---- */
Q({ id: "q-pcm-14", div: "pcm", obj: "pcm-1.2", lesson: "pcm-firm", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A firm with 22 employees must comply with which of these federal laws?",
  opts: ["Family and Medical Leave Act only", "Title VII and ADA Title I, but not FMLA", "None until it reaches 50 employees", "Only OSHA"],
  ans: 1,
  why: ["FMLA applies at 50 or more employees.", "Correct. Title VII and ADA Title I apply at 15 or more; ADEA at 20 or more; FMLA at 50.", "Several laws apply well below 50.", "OSHA applies, but so do the anti-discrimination laws."],
  explain: "Know the thresholds: 15 (Title VII, ADA I), 20 (ADEA), 50 (FMLA).",
  ref: "US EEOC and DOL guidance; Architect's Handbook, 15th ed. — human resources" });

Q({ id: "q-pcm-15", div: "pcm", obj: "pcm-1.2", lesson: "pcm-firm", type: "mc", diff: 2, fmt: "Scenario",
  q: "A drafter works full time at the firm's office, on the firm's software, on hours the project manager sets, and has no other clients. The firm pays her as an independent contractor. What is the risk?",
  opts: ["None, if she signed an independent contractor agreement", "Misclassification: she functions as an employee, exposing the firm to back taxes, overtime and penalties", "Only that she cannot be named on proposals", "The firm must buy her professional liability insurance"],
  ans: 1,
  why: ["Labels do not control; the actual working relationship does.", "Correct. The firm controls how, when and where she works.", "Not the main issue.", "Not the main issue."],
  explain: "Regulators look at behavioral control, financial control and the relationship.",
  ref: "IRS and DOL worker classification guidance" });

Q({ id: "q-pcm-16", div: "pcm", obj: "pcm-2.3", lesson: "pcm-firm", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A federal agency selects an architect under the Brooks Act. How is the fee determined?",
  opts: ["Lowest fee among qualified firms wins", "Firms are ranked on qualifications, then the agency negotiates a fee with the top-ranked firm", "Fee is set by a published schedule", "Fee is bid in a sealed envelope with qualifications"],
  ans: 1,
  why: ["That is price-based selection.", "Correct. Qualifications-based selection.", "No federal fee schedule applies.", "Fee is not part of initial ranking."],
  explain: "If negotiation fails, the agency moves to the next-ranked firm.",
  ref: "40 U.S.C. §§1101–1104 (Brooks Act)" });

Q({ id: "q-pjm-14", div: "pjm", obj: "pjm-5.2", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which is an example of quality assurance rather than quality control?",
  opts: ["A 90% CD peer review", "Overlaying structural and mechanical plans to find conflicts", "Establishing office detail standards and checklists before the project starts", "Checking a door schedule against the floor plans"],
  ans: 2,
  why: ["Review of finished work is QC.", "Checking work is QC.", "Correct. Systems that prevent errors are QA.", "Checking work is QC."],
  explain: "QA prevents; QC detects.",
  ref: "Architect's Handbook, 15th ed. — quality management" });

Q({ id: "q-pjm-15", div: "pjm", obj: "pjm-2.3", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Scenario",
  q: "After an owner meeting, what is the most effective way to protect the project record?",
  opts: ["Keep personal notes in the project file", "Issue minutes promptly with decisions and action items, and ask attendees to report corrections by a stated date", "Record the meeting on video without notice", "Wait for the owner to send a summary"],
  ans: 1,
  why: ["Private notes are not shared or confirmed.", "Correct.", "Recording without consent raises legal issues and is not a record of agreed decisions.", "The architect should control the record."],
  explain: "Uncorrected minutes become strong evidence of what was agreed.",
  ref: "Architect's Handbook, 15th ed. — project communication" });

Q({ id: "q-pjm-16", div: "pjm", obj: "pjm-5.3", lesson: "pjm-quality", type: "ms", diff: 3, fmt: "Check all that apply", pick: 2,
  q: "A duct and a steel beam occupy the same space in a corridor ceiling, discovered during construction. Which two reviews were most likely to have caught it? Select two.",
  opts: ["Interdisciplinary coordination review of structural and mechanical drawings", "Code compliance review", "BIM clash detection followed by human review", "Specification spell-check", "Cost estimate update", "Value-engineering review of interior finishes"],
  ans: [0, 2],
  why: ["Correct.", "Code review would not normally find a physical conflict.", "Correct.", "Not related.", "Not related.", "Finish selections do not reveal duct–beam conflicts."],
  explain: "Spatial conflicts are coordination problems.",
  ref: "Architect's Handbook, 15th ed. — quality management" });

/* ---- Key takeaways for every lesson ---- */
ARE.TAKEAWAYS = {
  "pcm-finance": ["NOR excludes consultants and reimbursables.", "Break-even = 1 + overhead rate.", "Net multiplier = NOR ÷ direct labor.", "Low utilization raises overhead.", "Profit is not cash; watch receivables."],
  "pcm-risk": ["Standard of care = reasonable, not perfect.", "Avoid warranties and guarantees.", "Professional liability is claims-made; buy a tail when you stop.", "No entity shields your own negligence.", "AIA 2017: mediation before binding resolution; litigation if none selected."],
  "pcm-delivery": ["Undefined scope → hourly with a cap.", "CM at risk holds trade contracts and a GMP.", "Design-build = one contract, one responsible party.", "Fast-track is a scheduling technique."],
  "pcm-firm": ["15 / 20 / 50 employee thresholds: Title VII & ADA I / ADEA / FMLA.", "Exempt status depends on duties and salary, not title.", "Control decides employee vs contractor.", "QBS ranks first, negotiates fee second."],
  "pjm-schedule": ["Longest path = critical path.", "Float = LS − ES.", "CPI = EV ÷ AC; SPI = EV ÷ PV.", "EAC = BAC ÷ CPI.", "Traditional split: 15/20/40/5/20."],
  "pjm-contracts": ["The architect is not a party to A101.", "Use matching document editions.", "C401 should flow down B101 terms.", "Additional services need written authorization first.", "SD explores, DD fixes, CD details."],
  "pjm-quality": ["QA prevents; QC detects.", "Schedule QC reviews in the work plan.", "Minutes record decisions and action items.", "Coordinate by overlay; clash detection needs a human."],
  "pa-zoning": ["Run every control: FAR, coverage, setbacks, height.", "Variance = dimensional hardship.", "Conditional use = listed with review.", "Nonconforming = lawful before current rules."],
  "pa-program": ["Gross = net ÷ efficiency.", "South: horizontal overhangs. East/west: vertical fins.", "Slope % = rise ÷ run × 100.", "1:20 walk, 1:12 ramp."],
  "ppd-egress": ["OL = area ÷ factor; round up.", "Stairs 0.3, other 0.2 in/occupant.", "Remoteness ½ diagonal, ⅓ sprinklered.", "Exits per story: 2 / 3 / 4.", "Check code minimum widths."],
  "ppd-envelope": ["Add R, then invert for U.", "Q = U × A × ΔT.", "Steel studs bridge badly; use ci.", "Low SHGC for west glass in cooling climates."],
  "pdd-envelope": ["Water > air > vapor > thermal.", "Shingle-lap every layer.", "Vapor control on the warm side.", "Backer rod: two-sided adhesion only."],
  "pdd-specs": ["Drawings: quantity, location. Specs: quality.", "Part 1 General, Part 2 Products, Part 3 Execution.", "Div 00 contracting, Div 01 general requirements.", "Performance specs suit delegated design."],
  "ce-admin": ["Site visits: general familiarity, not inspection.", "Submittals are not contract documents.", "ASI no cost/time; CCD owner + architect; CO all three.", "Architect rejects work; owner stops work.", "Claims within 21 days."],
  "ce-payment": ["Certify within 7 days.", "Due = completed + stored − retainage − previous.", "Contractor prepares the punch list.", "Warranties start at substantial completion.", "Final payment needs G706, G706A, G707."]
};

/* ---- Handbook cross-reference map ----
   Topics are organized by subject. Chapter numbers are intentionally left
   for the user to fill from their own copy (stored locally), because the
   full text is not available here and chapter numbers must not be guessed. */
ARE.HANDBOOK = {
  title: "The Architect's Handbook of Professional Practice",
  edition: "15th edition",
  publisher: "American Institute of Architects / John Wiley & Sons, © 2014 (Library of Congress data 2013), ISBN 978-1-118-30882-0",
  note: "Section numbers and start pages come from the contents page of your copy (ARE Prep folder). Objective-level page references come from Wiley's “Navigating the ARE 5.0 with AHPP 15th Ed.” crosswalks in the same folder; they were written for the 2017 objective wording and have been re-keyed to the current objectives. Explanations in this app are original; no Handbook text is reproduced.",
  topics: [
    { id: "hb-ethics", area: "The Profession", topic: "Professional ethics, licensure and the standard of care", objs: ["pcm-1.3", "pcm-1.4"], lessons: ["pcm-risk"], terms: ["Standard of care", "Responsible control"], docs: ["NCARB Model Rules of Conduct", "AIA Code of Ethics", "B101 §2.2"],
      summary: "What licensure means, the duties architects owe the public and clients, and the reasonable-care standard against which performance is judged." },
    { id: "hb-firm-org", area: "The Firm", topic: "Firm legal structures, ownership and organization", objs: ["pcm-4.1"], lessons: ["pcm-risk"], terms: ["LLC", "LLP", "Professional corporation"], docs: [],
      summary: "Choosing an entity, ownership rules for architecture firms, studio versus departmental organization, and succession." },
    { id: "hb-strategy", area: "The Firm", topic: "Strategic planning and business planning", objs: ["pcm-2.3"], lessons: ["pcm-firm"], terms: ["SWOT analysis", "Backlog"], docs: [],
      summary: "Setting direction for the firm and translating it into budgets, targets and ownership transition plans." },
    { id: "hb-finance", area: "The Firm", topic: "Financial management and accounting", objs: ["pcm-2.1", "pcm-1.1"], lessons: ["pcm-finance"], terms: ["Net operating revenue", "Utilization rate", "Overhead rate", "Break-even rate", "Net multiplier", "Accrual accounting"], docs: [],
      summary: "Revenue layers, labor and overhead, the core ratios, financial statements, cash flow and receivables." },
    { id: "hb-hr", area: "The Firm", topic: "Human resources, staffing and the work environment", objs: ["pcm-1.1", "pcm-1.2"], lessons: ["pcm-firm"], terms: ["Exempt employee", "Independent contractor"], docs: ["FLSA", "Title VII", "ADA Title I", "ADEA", "FMLA", "OSHA"],
      summary: "Hiring, compensation, development and the federal laws that govern employers." },
    { id: "hb-risk", area: "The Firm", topic: "Risk management and professional liability insurance", objs: ["pcm-2.2", "pjm-5.2"], lessons: ["pcm-risk"], terms: ["Claims-made", "Extended reporting period", "Statute of repose", "Statute of limitations"], docs: ["B101 Art. 8"],
      summary: "Identifying and allocating risk through contracts, insurance and practice habits; dispute resolution." },
    { id: "hb-marketing", area: "Securing the Project", topic: "Marketing, business development and proposals", objs: ["pcm-2.3", "pcm-3.1"], lessons: ["pcm-firm"], terms: ["Qualifications-based selection", "RFQ", "RFP", "Go/no-go"], docs: ["Brooks Act"],
      summary: "Choosing markets, deciding which projects to pursue, writing proposals and how owners select architects." },
    { id: "hb-agreements", area: "Securing the Project", topic: "Owner–architect agreements, services and compensation", objs: ["pcm-3.2", "pjm-3.1", "pjm-4.2"], lessons: ["pcm-delivery", "pjm-contracts"], terms: ["Stipulated sum", "Multiple of DPE", "Additional services", "Reimbursable expenses"], docs: ["B101–2017", "B133", "B143"],
      summary: "Defining scope, setting fees by method, and negotiating the agreement." },
    { id: "hb-delivery", area: "Securing the Project", topic: "Project delivery methods", objs: ["pcm-3.2", "pcm-3.3", "pjm-4.3"], lessons: ["pcm-delivery"], terms: ["Design-bid-build", "CM at risk", "Design-build", "Integrated project delivery", "Fast-track", "GMP"], docs: ["A133", "A141", "A195"],
      summary: "How owner, architect and builder relationships differ by method, and the risk each carries." },
    { id: "hb-pm", area: "Managing the Project", topic: "Project management: work plans, schedules and budgets", objs: ["pjm-2.1", "pjm-2.2", "pjm-4.1"], lessons: ["pjm-schedule"], terms: ["Work plan", "Critical path", "Float", "Earned value"], docs: [],
      summary: "Turning the fee into a staffed plan, scheduling, and monitoring cost and progress." },
    { id: "hb-team", area: "Managing the Project", topic: "Project teams, consultants and client communication", objs: ["pjm-1.1", "pjm-1.2", "pjm-2.3", "pjm-3.2", "pjm-3.4"], lessons: ["pjm-quality", "pjm-contracts"], terms: ["Transmittal", "Meeting minutes"], docs: ["C401–2017"],
      summary: "Assembling the team, consultant agreements and coordination, and keeping the project record." },
    { id: "hb-quality", area: "Managing the Project", topic: "Quality management (QA/QC) and constructability", objs: ["pjm-5.1", "pjm-5.2", "pjm-5.3", "pcm-4.2", "pdd-2.4"], lessons: ["pjm-quality"], terms: ["Quality assurance", "Quality control", "Constructability review", "Clash detection"], docs: [],
      summary: "Preventing errors through standards and detecting them through scheduled reviews." },
    { id: "hb-predesign", area: "Design Services", topic: "Programming, site analysis and feasibility", objs: ["pa-4.3", "pa-4.4", "pa-4.5", "pa-3.1", "pa-1.1"], lessons: ["pa-program", "pa-zoning"], terms: ["Efficiency ratio", "Adjacency matrix", "Floor area ratio"], docs: [],
      summary: "Pre-design services: defining needs, evaluating sites and testing budget and schedule." },
    { id: "hb-regulatory", area: "Design Services", topic: "Codes, zoning and regulatory approvals", objs: ["pa-2.2", "pa-2.1", "pa-2.3", "pjm-4.4", "ppd-2.2"], lessons: ["pa-zoning", "ppd-egress"], terms: ["Variance", "Nonconforming use", "Occupant load", "Authority having jurisdiction"], docs: ["IBC", "Local zoning ordinance"],
      summary: "Working with the regulatory framework and authorities having jurisdiction through design." },
    { id: "hb-design", area: "Design Services", topic: "Design phases, systems integration and sustainability", objs: ["ppd-4.3", "ppd-4.2", "ppd-1.2", "ppd-3.4", "ppd-5.3"], lessons: ["ppd-envelope", "pjm-contracts"], terms: ["U-factor", "SHGC", "Continuous insulation"], docs: ["IECC", "ASHRAE 90.1"],
      summary: "SD and DD services, coordinating consultants' systems, and performance and cost decisions." },
    { id: "hb-cd", area: "Design Services", topic: "Construction documents and specifications", objs: ["pdd-2.4", "pdd-3.1", "pdd-3.2", "pdd-3.3", "pdd-2.3"], lessons: ["pdd-specs", "pdd-envelope"], terms: ["Project manual", "MasterFormat", "SectionFormat", "Performance specification", "Air barrier"], docs: ["A201 §1.2", "CSI MasterFormat"],
      summary: "Organizing drawings and the project manual, specification methods and coordination." },
    { id: "hb-procurement", area: "Construction Services", topic: "Bidding, negotiation and contract award", objs: ["ce-1.2", "ce-1.3", "ce-1.1"], lessons: ["ce-payment", "ce-admin"], terms: ["Addendum", "Bid bond", "Alternate", "Allowance"], docs: ["A701–2018", "A310"],
      summary: "Bidding documents, addenda, bonds, evaluating bids and awarding the contract." },
    { id: "hb-ca", area: "Construction Services", topic: "Construction contract administration", objs: ["ce-2.1", "ce-3.4", "ce-2.3", "ce-3.2", "ce-3.1", "pjm-3.3"], lessons: ["ce-admin"], terms: ["Submittal", "RFI", "ASI", "Construction change directive", "Change order", "Initial Decision Maker"], docs: ["A201–2017", "G701", "G710", "G714"],
      summary: "The architect's role during construction: observation, submittals, RFIs, changes and claims." },
    { id: "hb-closeout", area: "Construction Services", topic: "Payment, completion, closeout and post-occupancy", objs: ["ce-3.3", "ce-4.1", "ce-4.2"], lessons: ["ce-payment"], terms: ["Schedule of values", "Retainage", "Substantial completion", "Punch list", "Post-occupancy evaluation"], docs: ["G702/G703", "G704", "G706", "G706A", "G707"],
      summary: "Certifying payment, completion steps, closeout documents and evaluating the finished building." }
  ]
};
