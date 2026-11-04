/* QUESTION BANK (set 3): PcM, PjM, CE gap coverage. Original items. */

/* ---------- PcM ---------- */
Q({ id: "q-pcm-17", div: "pcm", obj: "pcm-1.1", lesson: "pcm-finance", type: "mc", diff: 2, fmt: "Scenario",
  q: "A 20-person firm has a backlog of 4 months and two senior project architects retiring within a year. Which action best addresses the firm's resource risk?",
  opts: ["Pursue more projects to grow backlog", "Create a development plan that pairs the retiring architects with mid-level staff on current projects", "Cut the training budget to fund a marketing push", "Convert all staff to hourly contracts"],
  ans: 1,
  why: ["Backlog is adequate; capacity to deliver is the problem.", "Correct. Knowledge transfer and staff development protect delivery capacity.", "Cutting training worsens the skills gap.", "Contract type does not address leadership capacity."],
  explain: "Assessing resources includes people and their skills, not only money and equipment.", ref: "AIA Architect's Handbook, 15th ed., §8.4 (Professional Development and Mentoring)" });

Q({ id: "q-pcm-18", div: "pcm", obj: "pcm-1.1", lesson: "pcm-firm", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "A firm's billable utilization has dropped from 68% to 55% while revenue holds steady. Which two are the most likely causes to investigate? Check the two that apply.",
  opts: ["Staff spending more time on unbilled proposals", "Higher consultant fees on recent projects", "Overstaffing relative to current workload", "An increase in reimbursable printing costs", "Rising rent", "A change from accrual to cash accounting"],
  ans: [0, 2],
  why: ["Correct. Proposal time is non-billable.", "Consultant fees do not affect staff utilization.", "Correct. More people than work lowers the ratio.", "Reimbursables do not change hours.", "Rent is overhead, not time.", "Accounting method does not change hours worked."],
  explain: "Utilization is billable hours ÷ total hours. Look at what is consuming non-billable time and whether staffing matches workload.", ref: "AIA Architect's Handbook, 15th ed., §7.2" });

Q({ id: "q-pcm-19", div: "pcm", obj: "pcm-1.3", lesson: "pcm-risk", type: "mc", diff: 2, fmt: "Ethics",
  q: "An architect learns that a competing firm's principal, a friend, is seeking the same municipal commission. The friend suggests they each quote the same fee 'to keep things fair.' What should the architect do?",
  opts: ["Agree, since the fees will be reasonable", "Decline; agreeing on fees with a competitor violates antitrust law and professional conduct rules", "Agree only if the client is a public agency", "Quote 5% higher to avoid looking coordinated"],
  ans: 1,
  why: ["Price-fixing is illegal regardless of the amount.", "Correct.", "Public work does not change the prohibition.", "Any coordination is the problem."],
  explain: "Firms set fees independently. The AIA Code of Ethics history notes the limits antitrust law placed on fee practices.", ref: "AIA Architect's Handbook, 15th ed., §1.1 (p. 3, antitrust limits)" });

Q({ id: "q-pcm-20", div: "pcm", obj: "pcm-1.4", lesson: "pcm-risk", type: "mc", diff: 3, fmt: "Scenario",
  q: "An owner asks the architect to use a new, untested cladding system to save cost. Which approach best maintains the standard of care?",
  opts: ["Specify it as requested; the owner accepts the risk", "Refuse to use any product without a 10-year track record", "Research test data and code compliance, explain the risks in writing, and obtain the owner's informed decision", "Specify it and require the contractor to guarantee performance"],
  ans: 2,
  why: ["Following instructions without evaluation may fall below the standard of care.", "Reasonable care does not require refusing all new products.", "Correct. Investigation, disclosure and a documented owner decision reflect reasonable care.", "A contractor guarantee does not replace the architect's evaluation."],
  explain: "The standard of care asks what a prudent architect would do: investigate, advise and document.", ref: "AIA B101–2017 §2.2; Architect's Handbook §16.1 (heightened standard of care, p. 992)" });

Q({ id: "q-pcm-21", div: "pcm", obj: "pcm-2.3", lesson: "pcm-firm", type: "mc", diff: 2, fmt: "Scenario",
  q: "A mid-size firm earns 70% of its revenue from one school board client. What practice strategy best reduces this risk?",
  opts: ["Lower fees to secure more school work", "Diversify into one or two related markets under a marketing plan", "Stop pursuing school work", "Merge immediately with a larger firm"],
  ans: 1,
  why: ["Deepens dependence and cuts margin.", "Correct. Planned diversification reduces dependence on one client.", "Abandons the firm's strength.", "Drastic and not required to manage the risk."],
  explain: "Strategic planning balances markets so the loss of one client does not threaten the firm.", ref: "AIA Architect's Handbook, 15th ed., §5.3 and §6.2" });

Q({ id: "q-pcm-22", div: "pcm", obj: "pcm-3.1", lesson: "pcm-delivery", type: "mc", diff: 2, fmt: "Scenario",
  q: "A client asks for a fixed fee to design a building but cannot yet say how large it will be or what it must contain. What is the best response?",
  opts: ["Quote a fixed fee based on a guess at size", "Decline the project", "Propose a programming phase on an hourly basis, then a fixed fee for design once scope is defined", "Quote a percentage of an unknown construction cost"],
  ans: 2,
  why: ["Guessing scope puts the overrun risk on the firm.", "The project is viable with a better structure.", "Correct. Defining scope first lets you price design fairly.", "Without a cost basis the fee is undefined."],
  explain: "Analyze the request and match services and compensation to what is known.", ref: "AIA Architect's Handbook, 15th ed., §15.1 (pp. 952–960)" });

Q({ id: "q-pcm-23", div: "pcm", obj: "pcm-3.1", lesson: "pcm-delivery", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "A school board issues an RFP. Before deciding whether to respond, which three should the firm evaluate? Check the three that apply.",
  opts: ["The firm's relevant experience and available staff", "The selection criteria and scoring weights in the RFP", "The board members' political affiliations", "Contract terms and insurance requirements in the RFP", "The color scheme of the board's logo", "Whether competitors' fees will be lower than last year"],
  ans: [0, 1, 3],
  why: ["Correct.", "Correct.", "Irrelevant and inappropriate.", "Correct. Onerous terms can make a project unprofitable or uninsurable.", "Irrelevant.", "Unknowable and not a sound basis."],
  explain: "A go/no-go decision weighs fit, chance of winning, capacity and risk.", ref: "AIA Architect's Handbook, 15th ed., §6.5 (Reading the RFP, p. 382)" });

Q({ id: "q-pcm-24", div: "pcm", obj: "pcm-3.3", lesson: "pcm-delivery", type: "mc", diff: 3, fmt: "Risk",
  q: "A proposed agreement requires the architect to indemnify the owner for all claims arising from the project, regardless of fault. What is the main risk?",
  opts: ["None; indemnities are standard", "The architect assumes liability beyond its own negligence, which professional liability insurance typically does not cover", "It only affects the contractor", "It reduces the architect's fee"],
  ans: 1,
  why: ["Broad-form indemnity is not standard for architects.", "Correct. Limit indemnity to claims caused by the architect's negligence.", "The clause binds the architect.", "Fee is unaffected; risk is the issue."],
  explain: "Negotiate indemnity so it covers only damages to the extent caused by the architect's negligent acts.", ref: "AIA Architect's Handbook, 15th ed., §16.1 (making better agreements, p. 995)" });

Q({ id: "q-pcm-25", div: "pcm", obj: "pcm-3.3", lesson: "pcm-delivery", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two measures reduce a firm's risk on a fast-track project? Check the two that apply.",
  opts: ["Documenting which design decisions are fixed in each early package", "Agreeing to a stipulated sum for all design changes", "Defining additional services for redesign caused by owner changes after package release", "Skipping consultant coordination to save time", "Waiving the right to suspend services", "Accepting liability for the CM's pricing"],
  ans: [0, 2],
  why: ["Correct.", "Fixed compensation for unlimited change increases risk.", "Correct.", "Increases errors.", "Removes a remedy.", "Pricing is the CM's responsibility."],
  explain: "Fast-track multiplies changes; define what is fixed and how changes are paid.", ref: "AIA Architect's Handbook, 15th ed., §15.2 (basis of fees: value, effort and risk, p. 961)" });

Q({ id: "q-pcm-26", div: "pcm", obj: "pcm-4.1", lesson: "pcm-risk", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Two architects form a general partnership. One partner's negligent design causes a large judgment above the insurance limits. Who can be personally liable for the excess?",
  opts: ["Only the negligent partner", "Both partners", "Neither partner; the partnership absorbs it", "Only the firm's insurer"],
  ans: 1,
  why: ["In a general partnership, partners share liability.", "Correct. General partners are jointly and severally liable.", "A general partnership offers no liability shield.", "Insurance covers only up to its limit."],
  explain: "An LLP or corporation would shield the non-negligent partner's personal assets from the other's negligence.", ref: "AIA Architect's Handbook, 15th ed., §5.2 (Table 5.1, legal structures, p. 199)" });

Q({ id: "q-pcm-27", div: "pcm", obj: "pcm-4.2", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A firm doing both small renovations and large hospitals wants consistent quality. Which practice-wide approach is most effective?",
  opts: ["One identical checklist for every project", "Office standards and QA procedures scaled to project type, with checklists specific to health care", "Leaving QC to each project manager's judgment", "Outsourcing QC to the contractor"],
  ans: 1,
  why: ["Too generic for complex projects, too heavy for small ones.", "Correct. Processes should fit project type and complexity.", "Inconsistent results.", "The contractor does not review the architect's documents for quality."],
  explain: "Compare processes, policies and resources across project types and fit them to the work.", ref: "AIA Architect's Handbook, 15th ed., §12.1 (p. 811)" });

Q({ id: "q-pcm-28", div: "pcm", obj: "pcm-4.2", lesson: "pjm-quality", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "A firm is moving from 2D CAD to BIM for all new projects. Which two policies most directly support documentation quality? Check the two that apply.",
  opts: ["A BIM execution plan template defining model responsibilities and level of development", "Training and office modeling standards", "Requiring all consultants to use the same font", "Allowing each team to set its own file naming", "Stopping peer review because BIM checks errors", "Printing every sheet in color"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Minor and not a quality control.", "Inconsistency undermines coordination.", "BIM does not replace human review.", "Irrelevant to quality."],
  explain: "Technology changes need standards, training and defined responsibilities.", ref: "AIA Architect's Handbook, 15th ed., §11.1 (documentation, pp. 745–749)" });

/* ---------- PjM ---------- */
Q({ id: "q-pjm-17", div: "pjm", obj: "pjm-1.1", lesson: "pjm-quality", type: "mc", diff: 1, fmt: "Multiple choice",
  q: "Which criterion matters most when selecting the project manager for a complex hospital renovation in an occupied building?",
  opts: ["Lowest billing rate", "Experience with health-care projects and phased work in occupied buildings", "Seniority in the firm", "Availability next week"],
  ans: 1,
  why: ["Cost matters, but not above capability.", "Correct.", "Seniority without relevant experience is not enough.", "Availability is necessary but not sufficient."],
  explain: "Match the team to the project's type, complexity and client.", ref: "AIA Architect's Handbook, 15th ed., §10.2 (Project Teams, p. 603)" });

Q({ id: "q-pjm-18", div: "pjm", obj: "pjm-1.1", lesson: "pjm-quality", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "When selecting a structural consultant for a mass-timber building, which three criteria are most important? Check the three that apply.",
  opts: ["Mass-timber project experience", "Capacity to meet the schedule", "Professional liability insurance meeting the prime agreement", "Office location in the same building as the architect", "Willingness to work without a written agreement", "Lowest fee regardless of qualifications"],
  ans: [0, 1, 2],
  why: ["Correct.", "Correct.", "Correct. C401 terms must flow down.", "Convenient but not critical.", "Never acceptable.", "Qualifications come first."],
  explain: "Select consultants by qualifications, capacity and the ability to meet the prime agreement's terms.", ref: "AIA C401–2017 (sample in your folder)" });

Q({ id: "q-pjm-19", div: "pjm", obj: "pjm-1.2", lesson: "pjm-delivery-docs", type: "mc", diff: 2, fmt: "Scenario",
  q: "A resource plan shows the project architect at 150% for the next three weeks while two drafters are at 60%. What should the project manager do first?",
  opts: ["Ask the project architect to work overtime", "Reassign production tasks to the drafters with the project architect reviewing", "Delay the deadline", "Hire a temporary employee"],
  ans: 1,
  why: ["Unsustainable and raises error risk.", "Correct. Leveling uses available capacity.", "A last resort.", "Unnecessary when staff have capacity."],
  explain: "Level resources within the team before changing schedules or adding staff.", ref: "AIA Architect's Handbook, 15th ed., §10.1 (p. 589); §10.3" });

Q({ id: "q-pjm-20", div: "pjm", obj: "pjm-1.2", lesson: "pjm-schedule", type: "calc", diff: 2, fmt: "Calculation",
  q: "A DD phase needs 900 staff hours over 6 weeks. Each team member is available 36 billable hours per week. How many team members are needed?",
  ans: 5, tol: 0, unit: "people",
  explain: "900 ÷ 6 = 150 hours per week. 150 ÷ 36 = 4.2, so round up to 5 people.", ref: "AIA Architect's Handbook, 15th ed., §10.3 (work planning, p. 627)" });

Q({ id: "q-pjm-21", div: "pjm", obj: "pjm-2.3", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "During construction, the contractor emails the mechanical engineer directly asking to change a duct route. What is the correct communication path?",
  opts: ["The engineer answers the contractor directly", "The contractor submits an RFI to the architect, who coordinates the response with the engineer", "The owner decides", "The contractor makes the change and notes it on record drawings"],
  ans: 1,
  why: ["Consultants are not party to the construction contract.", "Correct.", "The owner relies on the architect for document interpretation.", "Changes need authorization."],
  explain: "Under A201 the architect is the communication link between contractor and design team.", ref: "AIA A201–2017 Article 4" });

Q({ id: "q-pjm-22", div: "pjm", obj: "pjm-3.2", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under C401–2017, if the owner fails to pay the architect, how is the consultant's payment typically affected?",
  opts: ["The consultant is still paid in full regardless", "Payment terms flow through as agreed in C401, which may make the consultant's payment conditional on the architect's receipt of payment where permitted by law", "The consultant may sue the owner directly", "The consultant must stop work immediately"],
  ans: 1,
  why: ["Depends on the agreed terms.", "Correct. C401 lets the parties set payment terms consistent with the prime agreement.", "The consultant has no contract with the owner.", "Suspension follows the agreement's notice terms."],
  explain: "Read C401's compensation article and coordinate it with B101.", ref: "AIA C401–2017 (sample in your folder)" });

Q({ id: "q-pjm-23", div: "pjm", obj: "pjm-3.4", lesson: "pjm-delivery-docs", type: "mc", diff: 2, fmt: "Scenario",
  q: "The owner's surveyor provides a site survey that later proves to have a wrong benchmark elevation, causing a redesign of the grading. Under B101–2017, which is true?",
  opts: ["The architect bears the cost because it should have checked the benchmark", "The architect was entitled to rely on the survey; the redesign may be an additional service", "The contractor pays", "The survey becomes the architect's instrument of service"],
  ans: 1,
  why: ["B101 §3.1.2 lets the architect rely on owner-furnished information.", "Correct.", "The contractor is not involved.", "Ownership does not change."],
  explain: "Notify the owner promptly when you discover the error, then document the added work.", ref: "AIA B101–2017 §3.1.2 and §5.4" });

Q({ id: "q-pjm-24", div: "pjm", obj: "pjm-3.3", lesson: "pjm-contracts", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under A101–2017 (stipulated sum), where is the contract sum stated?",
  opts: ["In A201", "In the owner–contractor agreement (A101)", "In the specifications", "In the architect's certificate for payment"],
  ans: 1,
  why: ["A201 states general conditions, not the sum.", "Correct.", "Specifications describe quality.", "Certificates report payment, not the contract sum."],
  explain: "A101 states the sum, dates, payments and enumerated contract documents; A201 governs administration.", ref: "AIA A101–2017 (sample in your folder)" });

Q({ id: "q-pjm-25", div: "pjm", obj: "pjm-4.3", lesson: "pjm-delivery-docs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Under CM at risk, the CM needs to start foundations before the design is complete. What should the architect issue?",
  opts: ["A complete bid set", "An early foundation package with clearly stated design assumptions", "Shop drawings", "Nothing until CDs are complete"],
  ans: 1,
  why: ["Not yet possible.", "Correct.", "Shop drawings are the contractor's.", "Defeats the purpose of CMAR."],
  explain: "Early packages let construction start; record the assumptions that later packages must honor.", ref: "AIA A133–2019 (sample in your folder)" });

Q({ id: "q-pjm-26", div: "pjm", obj: "pjm-4.3", lesson: "pjm-delivery-docs", type: "mc", diff: 3, fmt: "Multiple choice",
  q: "An owner hires you as criteria architect for a design-build project. What documents do you typically prepare?",
  opts: ["Full construction documents", "Bridging documents: program, performance criteria and schematic design", "Shop drawings", "The design-builder's GMP"],
  ans: 1,
  why: ["The design-builder's architect completes the design.", "Correct.", "Contractor responsibility.", "The design-builder prices its own work."],
  explain: "Bridging documents define what the owner wants without fixing every design decision.", ref: "AIA Architect's Handbook, 15th ed., §9.4 (Contractor-Led Design-Build)" });

Q({ id: "q-pjm-27", div: "pjm", obj: "pjm-4.4", lesson: "pjm-delivery-docs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "The project requires a zoning variance for height. When should the architect plan for this approval?",
  opts: ["After permit plan review", "Early in schematic design, since the hearing schedule and outcome affect the design", "During construction", "After bidding"],
  ans: 1,
  why: ["Too late; the design depends on it.", "Correct.", "Far too late.", "Far too late."],
  explain: "Zoning approvals come before building permits and often take months.", ref: "AIA Architect's Handbook, 15th ed., §13.2 (pp. 886–891)" });

Q({ id: "q-pjm-28", div: "pjm", obj: "pjm-5.1", lesson: "pjm-delivery-docs", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A private developer's 40-unit apartment building with an elevator is subject to which federal accessibility law for its dwelling units?",
  opts: ["ADA Title III only", "Fair Housing Act design and construction requirements", "No federal law applies to private housing", "Section 504 only"],
  ans: 1,
  why: ["Title III covers public accommodations such as the leasing office, not the units themselves.", "Correct. The FHA applies to covered multifamily dwellings (four or more units).", "The FHA applies.", "Section 504 applies to federally funded projects."],
  explain: "Know which law applies to which part of a building.", ref: "US HUD Fair Housing Act Design Manual (free, hud.gov)" });

Q({ id: "q-pjm-29", div: "pjm", obj: "pjm-5.1", lesson: "pjm-delivery-docs", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two are laws or regulations the architect must comply with beyond the building code? Check the two that apply.",
  opts: ["State architectural licensing law (sealing requirements)", "The owner's internal style guide", "Federal antitrust law", "The contractor's safety manual", "A competitor's office standards", "The AIA Code of Ethics for non-members"],
  ans: [0, 2],
  why: ["Correct.", "A contract requirement, not law.", "Correct.", "Contractor's responsibility.", "Not applicable.", "Binds members only."],
  explain: "Licensing and antitrust laws apply to every practicing architect.", ref: "AIA Architect's Handbook, 15th ed., §1.1 (p. 3); §3.1 (p. 52)" });

Q({ id: "q-pjm-30", div: "pjm", obj: "pjm-5.3", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Scenario",
  q: "At the 90% CD review, which check best catches constructability problems?",
  opts: ["Spell-checking the specifications", "A review by an experienced architect or contractor of sequence, access and assembly", "Checking the title block", "Reprinting the drawings"],
  ans: 1,
  why: ["Minor.", "Correct.", "Minor.", "No value."],
  explain: "Constructability reviews ask whether the work can be built as drawn.", ref: "AIA Architect's Handbook, 15th ed., §12.3 (Checklists, p. 833)" });

Q({ id: "q-pjm-31", div: "pjm", obj: "pjm-5.4", lesson: "pjm-quality", type: "mc", diff: 2, fmt: "Scenario",
  q: "During value engineering, the contractor proposes replacing the specified daylighting clerestories with skylights at lower cost. The clerestories are central to the owner's design goals. What should the architect do?",
  opts: ["Accept to save money", "Evaluate the proposal against the design objectives and advise the owner of the trade-offs", "Reject all value engineering", "Let the contractor decide"],
  ans: 1,
  why: ["Cost alone does not decide.", "Correct. Maintain design integrity by evaluating each change against stated objectives.", "VE can add value.", "The owner decides with the architect's advice."],
  explain: "Quality control includes protecting the design objectives through changes.", ref: "AIA Architect's Handbook, 15th ed., §12.2 (p. 822)" });

Q({ id: "q-pjm-32", div: "pjm", obj: "pjm-5.4", lesson: "pjm-quality", type: "ms", diff: 3, fmt: "Check all that apply", pick: 2,
  q: "Which two practices best maintain the design objectives through DD and CD? Check the two that apply.",
  opts: ["A written statement of design objectives reviewed at each phase", "Design reviews at milestones by the design lead", "Letting each consultant change finishes freely", "Removing all owner reviews to save time", "Deferring decisions to the contractor's submittals", "Delegating design to the lowest-cost team member"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Uncontrolled change erodes the design.", "Owner approval is required.", "Shifts design decisions out of the architect's control.", "Not a quality control."],
  explain: "Write the objectives down and check against them.", ref: "AIA Architect's Handbook, 15th ed., §10.5 (The design process, p. 657)" });

/* ---------- CE ---------- */
Q({ id: "q-ce-14", div: "ce", obj: "ce-1.1", lesson: "ce-observation", type: "mc", diff: 2, fmt: "Scenario",
  q: "During bidding on a design-bid-build project, a bidder phones the architect to ask whether a specified window can be substituted. What should the architect do?",
  opts: ["Approve it by phone", "Tell the bidder to submit a written substitution request per the instructions to bidders; if accepted, issue it by addendum to all bidders", "Ignore the call", "Ask the owner to decide by phone"],
  ans: 1,
  why: ["Gives one bidder an unfair advantage.", "Correct.", "Unprofessional; the process exists.", "Still a private answer."],
  explain: "All bidders must bid on the same information (A701).", ref: "AIA A701–2018 (sample in your folder)" });

Q({ id: "q-ce-15", div: "ce", obj: "ce-1.2", lesson: "ce-observation", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "A private owner wants to prequalify general contractors. Which three criteria are most relevant? Check the three that apply.",
  opts: ["Experience with similar projects", "Bonding capacity", "Safety record (e.g., experience modification rate)", "Number of employees with LinkedIn profiles", "Office décor", "Whether the contractor has worked with the architect socially"],
  ans: [0, 1, 2],
  why: ["Correct.", "Correct.", "Correct.", "Irrelevant.", "Irrelevant.", "Inappropriate basis."],
  explain: "Prequalification tests capability, financial strength and safety.", ref: "AIA A305 (Contractor's Qualification Statement); Architect's Handbook §10.2 (p. 606)" });

Q({ id: "q-ce-16", div: "ce", obj: "ce-2.2", lesson: "ce-observation", type: "mc", diff: 2, fmt: "Scenario",
  q: "The specifications require 75% of construction waste to be diverted from landfill for LEED credit. The contractor's reports show 40%. How should the architect treat this?",
  opts: ["As a recommendation the contractor may ignore", "As nonconformance with the contract documents, reported in writing", "As the owner's problem", "As acceptable because the building looks fine"],
  ans: 1,
  why: ["Specified requirements are contract requirements.", "Correct.", "The architect reports nonconformance.", "Performance requirements matter."],
  explain: "Sustainability requirements written into the documents are enforceable like any other.", ref: "AIA A201–2017 §4.2.2, §4.2.6" });

Q({ id: "q-ce-17", div: "ce", obj: "ce-2.2", lesson: "ce-observation", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "On a site visit the architect sees fire-rated wall framing above the ceiling with open gaps around pipes. Which two actions are appropriate? Check the two that apply.",
  opts: ["Note the nonconformance in the field report", "Notify the contractor and owner in writing that penetrations need listed firestopping", "Install firestopping personally", "Ignore it because the ceiling will hide it", "Tell the plumber how to fix it", "Approve the work if the contractor promises to fix it later"],
  ans: [0, 1],
  why: ["Correct.", "Correct.", "Not the architect's role.", "Life-safety deficiency.", "Means and methods.", "Approval is not appropriate."],
  explain: "Report code nonconformance; the contractor corrects it.", ref: "2021 IBC §714; AIA A201–2017 §4.2.2" });

Q({ id: "q-ce-18", div: "ce", obj: "ce-2.3", lesson: "ce-observation", type: "calc", diff: 2, fmt: "Calculation",
  q: "Schedule of values: Sitework $200,000 (100% complete); Structure $600,000 (50%); Envelope $400,000 (25%); Interiors $800,000 (0%). What percent of the $2,000,000 contract is complete?",
  ans: 30, tol: 0.1, unit: "%",
  explain: "200,000 + 300,000 + 100,000 + 0 = 600,000. 600,000 ÷ 2,000,000 = 30%.", ref: "AIA G703 Continuation Sheet (sample in your folder)" });

Q({ id: "q-ce-19", div: "ce", obj: "ce-2.3", lesson: "ce-observation", type: "mc", diff: 2, fmt: "Scenario",
  q: "The contractor's application shows roofing 80% complete, but at the site visit the architect sees about half the roof membrane installed. What should the architect certify?",
  opts: ["80%, as the contractor claims", "About 50%, based on observation, and notify the contractor and owner of the reason", "0% until roofing is finished", "Whatever the owner prefers"],
  ans: 1,
  why: ["The certificate reflects the architect's own knowledge.", "Correct.", "Withhold only what is justified.", "Certification is the architect's professional judgment."],
  explain: "Certify progress to the best of your knowledge, information and belief (A201 §9.4.2).", ref: "AIA A201–2017 §9.4.1–9.4.2" });

Q({ id: "q-ce-20", div: "ce", obj: "ce-3.2", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "A shop drawing arrives without the contractor's review stamp. What should the architect do?",
  opts: ["Review it anyway to save time", "Return it unreviewed; the contractor must review and approve submittals before sending them", "Forward it to the owner", "Approve it as noted"],
  ans: 1,
  why: ["The contractor's review is a required step.", "Correct.", "Not the owner's role.", "The architect should not review an unreviewed submittal."],
  explain: "A201 §3.12.5 requires the contractor to review, approve and submit.", ref: "AIA A201–2017 §3.12.5, §4.2.7" });

Q({ id: "q-ce-21", div: "ce", obj: "ce-3.2", lesson: "ce-admin", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "Which submittal would the architect NOT normally review for conformance with the design concept?",
  opts: ["Curtain wall shop drawings", "Paint color samples", "The contractor's crane lift plan", "Door hardware product data"],
  ans: 2,
  why: ["Reviewed.", "Reviewed.", "Correct. Means, methods and safety are the contractor's responsibility.", "Reviewed."],
  explain: "The architect does not review submittals about means, methods or safety.", ref: "AIA A201–2017 §4.2.7" });

Q({ id: "q-ce-22", div: "ce", obj: "ce-4.2", lesson: "ce-observation", type: "mc", diff: 2, fmt: "Multiple choice",
  q: "An owner wants to know how a new school compares with similar schools in energy use. Which tool is most appropriate?",
  opts: ["A punch list", "Energy benchmarking (for example, ENERGY STAR Portfolio Manager)", "The schedule of values", "A bid tabulation"],
  ans: 1,
  why: ["Lists incomplete work.", "Correct.", "Tracks payment.", "Compares bids."],
  explain: "Benchmarking compares actual energy use with peer buildings.", ref: "US EPA ENERGY STAR Portfolio Manager (free)" });

Q({ id: "q-ce-23", div: "ce", obj: "ce-4.2", lesson: "ce-observation", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "Which three are part of a post-occupancy evaluation? Check the three that apply.",
  opts: ["Occupant comfort and satisfaction surveys", "Measured energy and water use", "Observation of how spaces are actually used", "Re-bidding the project", "Reviewing the contractor's original bid", "Calculating the architect's utilization rate"],
  ans: [0, 1, 2],
  why: ["Correct.", "Correct.", "Correct.", "Not relevant.", "Not relevant.", "Not relevant."],
  explain: "POEs measure performance and user experience to improve future design.", ref: "AIA Architect's Handbook, 15th ed., §10.10 (Post-construction, p. 735)" });

Q({ id: "q-ce-24", div: "ce", obj: "ce-2.1", lesson: "ce-admin", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "Which two are part of the architect's role during construction under A201–2017? Check the two that apply.",
  opts: ["Visiting the site at intervals appropriate to the stage of construction", "Interpreting the contract documents and responding to RFIs", "Directing the contractor's crew sizes", "Supervising jobsite safety", "Purchasing materials for the owner", "Scheduling subcontractors"],
  ans: [0, 1],
  why: ["Correct (§4.2.2).", "Correct (§4.2.11).", "Means and methods.", "Contractor responsibility.", "Not the architect's role.", "Contractor responsibility."],
  explain: "Know what A201 gives the architect and what it leaves to the contractor.", ref: "AIA A201–2017 §4.2" });
