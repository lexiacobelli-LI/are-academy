/* Interactive additions for the original 15 lessons:
   new tap-to-explain diagrams, inline quick checks and slider calculators. */
(function () {
const L = (id) => ARE.LESSONS.find(l => l.id === id);
const add = (id, o) => { const l = L(id); if (l) Object.assign(l, o); };

add("pcm-finance", { tryit: ["firm", "util"], quick: [
  { q: "Consultant fees are $400k of $2M gross revenue, with $50k of reimbursables. What is NOR?", opts: ["$2,000,000", "$1,600,000", "$1,550,000", "$1,950,000"], a: 2, why: "2,000k − 400k − 50k = 1,550k." },
  { q: "Overhead rate 1.5. What is the break-even rate?", opts: ["1.5", "2.0", "2.5", "3.0"], a: 2, why: "1 + 1.5 = 2.5." }] });
add("pcm-risk", { quick: [
  { q: "A visitor slips in your office lobby. Which policy responds?", opts: ["Professional liability", "Commercial general liability", "Workers' compensation", "Valuable papers"], a: 1, why: "Bodily injury from business premises falls under CGL." },
  { q: "Which entity shields an architect from personal liability for their own negligent design?", opts: ["LLC", "LLP", "Professional corporation", "None of these"], a: 3, why: "No entity protects you from your own negligence." }] });
add("pcm-delivery", { quick: [
  { q: "Owner wants a single point of responsibility for design and construction.", opts: ["Design-bid-build", "CM as adviser", "Design-build", "Multiple prime"], a: 2, why: "One contract covers both." },
  { q: "Fast-track is best described as:", opts: ["A delivery method", "A scheduling technique", "A contract form", "A bonding requirement"], a: 1, why: "It overlaps design and construction within a delivery method." }] });
add("pcm-firm", {
  diagram: `<svg viewBox="0 0 640 230" role="img" aria-label="Federal employment law thresholds by firm size. Tap each to learn more.">
<g class="dg-text" font-size="11">
<line x1="40" y1="150" x2="600" y2="150" class="dg-line"/>
<g class="tip" data-tip="1+ employees|FLSA (minimum wage, overtime for non-exempt staff) and OSHA apply to nearly every employer."><circle cx="60" cy="150" r="9" class="dg-accent"/><text x="60" y="180" text-anchor="middle">1</text><text x="60" y="120" text-anchor="middle">FLSA · OSHA</text></g>
<g class="tip" data-tip="15+ employees|Title VII (discrimination) and ADA Title I (disability, reasonable accommodation) apply."><circle cx="220" cy="150" r="9" class="dg-accent"/><text x="220" y="180" text-anchor="middle">15</text><text x="220" y="120" text-anchor="middle">Title VII · ADA I</text></g>
<g class="tip" data-tip="20+ employees|The Age Discrimination in Employment Act protects workers aged 40 and over."><circle cx="330" cy="150" r="9" class="dg-accent"/><text x="330" y="180" text-anchor="middle">20</text><text x="330" y="120" text-anchor="middle">ADEA</text></g>
<g class="tip" data-tip="50+ employees|FMLA: up to 12 weeks of unpaid, job-protected leave."><circle cx="540" cy="150" r="9" class="dg-accent"/><text x="540" y="180" text-anchor="middle">50</text><text x="540" y="120" text-anchor="middle">FMLA</text></g>
<text x="320" y="214" text-anchor="middle">Number of employees →</text>
</g></svg>`,
  quick: [
    { q: "A 30-person firm must comply with which leave law?", opts: ["FMLA", "None of the federal leave laws listed", "ADEA leave", "Title VII leave"], a: 1, why: "FMLA starts at 50 employees; ADEA and Title VII are anti-discrimination laws, not leave laws." },
    { q: "What decides whether a worker is an independent contractor?", opts: ["The contract label", "Who controls how, when and where the work is done", "Pay frequency", "Job title"], a: 1, why: "Control, not the label." }] });
add("pjm-schedule", { tryit: ["ev"], quick: [
  { q: "Paths: A–B–D = 12 days, A–C–D = 9 days. Float on C?", opts: ["0", "3 days", "9 days", "12 days"], a: 1, why: "12 − 9 = 3." },
  { q: "CPI = 0.9 means:", opts: ["Ahead of schedule", "Spending more than the value of work done", "Under budget", "Behind schedule"], a: 1, why: "EV is less than AC." }] });
add("pjm-contracts", {
  diagram: `<svg viewBox="0 0 640 260" role="img" aria-label="AIA contract family relationships. Tap each document to learn more.">
<g class="dg-text" font-size="11">
<rect x="270" y="20" width="100" height="36" class="dg-accent"/><text x="320" y="43" text-anchor="middle" class="dg-ontint">Owner</text>
<rect x="60" y="130" width="120" height="36" class="dg-soft"/><text x="120" y="153" text-anchor="middle">Architect</text>
<rect x="460" y="130" width="120" height="36" class="dg-soft"/><text x="520" y="153" text-anchor="middle">Contractor</text>
<rect x="60" y="210" width="120" height="36" class="dg-soft"/><text x="120" y="233" text-anchor="middle">Consultants</text>
<g class="tip" data-tip="B101–2017|Owner–Architect agreement: services by phase, standard of care (§2.2), additional services (Art. 4), cost of the work (Art. 6), disputes (Art. 8)."><line x1="290" y1="56" x2="140" y2="130" class="dg-line" stroke-width="3"/><text x="185" y="85">B101</text></g>
<g class="tip" data-tip="A101–2017 with A201–2017|Owner–Contractor agreement (sum, payments) plus General Conditions (architect's construction-phase role). The architect is not a party."><line x1="350" y1="56" x2="500" y2="130" class="dg-line" stroke-width="3"/><text x="440" y="85">A101 + A201</text></g>
<g class="tip" data-tip="C401–2017|Architect–Consultant agreement; should flow down the B101 terms for that discipline."><line x1="120" y1="166" x2="120" y2="210" class="dg-line" stroke-width="3"/><text x="130" y="194">C401</text></g>
<g class="tip" data-tip="No contract|Architect and contractor communicate through the roles defined in A201 (§1.1.2): RFIs, submittals, certificates."><line x1="180" y1="148" x2="460" y2="148" class="dg-line" stroke-dasharray="5 4"/><text x="320" y="140" text-anchor="middle">No contract (A201 roles only)</text></g>
</g></svg>`,
  quick: [
    { q: "Which document defines the architect's construction-phase duties?", opts: ["A101", "A201 (with B101)", "C401", "G702"], a: 1, why: "A201 describes the role; B101 obligates the architect to perform it." },
    { q: "An owner verbally asks for extra design work. Under B101 §4.2.1, before proceeding the architect needs:", opts: ["Nothing", "The owner's written authorization", "The contractor's approval", "A change order"], a: 1, why: "Notify and get written authorization first." }] });
add("pjm-quality", {
  diagram: `<svg viewBox="0 0 640 200" role="img" aria-label="QA and QC across project phases. Tap each to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Quality assurance|Before work: standards, templates, checklists, staffing, a project quality plan. Prevents errors."><rect x="30" y="40" width="170" height="60" class="dg-accent"/><text x="115" y="75" text-anchor="middle" class="dg-ontint">QA: prevent</text></g>
<g class="tip" data-tip="50% CD review|Interdisciplinary coordination check: overlay structure, MEP and architecture."><rect x="240" y="40" width="120" height="60" class="dg-soft"/><text x="300" y="75" text-anchor="middle">50% review</text></g>
<g class="tip" data-tip="90% CD review|Peer review by someone outside the team, code check and constructability review. Leave time to fix."><rect x="390" y="40" width="120" height="60" class="dg-soft"/><text x="450" y="75" text-anchor="middle">90% review</text></g>
<g class="tip" data-tip="Issue|Only after review comments are resolved and recorded."><rect x="540" y="40" width="80" height="60" class="dg-accent2"/><text x="580" y="75" text-anchor="middle">Issue</text></g>
<line x1="30" y1="140" x2="620" y2="140" class="dg-line"/><text x="320" y="170" text-anchor="middle">QC: detect, at scheduled milestones</text>
</g></svg>`,
  quick: [
    { q: "Writing an office detail library before projects start is:", opts: ["QC", "QA", "Value engineering", "Commissioning"], a: 1, why: "It prevents errors." },
    { q: "Who should perform a peer review?", opts: ["The person who drew the set", "Someone outside the project team", "The contractor", "The owner"], a: 1, why: "Fresh eyes catch what the team misses." }] });
add("pa-zoning", { tryit: ["far"], quick: [
  { q: "Lot 10,000 sf, FAR 1.2, coverage 50%, 2-story limit. Max GFA?", opts: ["12,000 sf", "10,000 sf", "5,000 sf", "20,000 sf"], a: 1, why: "FAR → 12,000; coverage × stories → 5,000 × 2 = 10,000. Smaller governs." },
  { q: "Relief from a setback because of an unusual lot shape is a:", opts: ["Use variance", "Area variance", "Rezoning", "Conditional use"], a: 1, why: "Dimensional hardship." }] });
add("pa-program", { tryit: ["gross", "slope"], quick: [
  { q: "Net 15,000 sf at 0.75 efficiency. Gross?", opts: ["11,250", "18,750", "20,000", "15,750"], a: 2, why: "15,000 ÷ 0.75 = 20,000." },
  { q: "Best shading for east and west glass:", opts: ["Horizontal overhang", "Vertical fins", "Light shelf", "None"], a: 1, why: "Low sun angles." }] });
add("ppd-egress", { tryit: ["ol", "width"], quick: [
  { q: "4,500 sf gross business floor. Occupant load at 150 gross?", opts: ["30", "45", "150", "300"], a: 0, why: "4,500 ÷ 150 = 30." },
  { q: "Unsprinklered room, diagonal 90 ft. Minimum exit separation?", opts: ["30 ft", "45 ft", "60 ft", "90 ft"], a: 1, why: "Half the diagonal." }] });
add("ppd-envelope", { tryit: ["heat"], quick: [
  { q: "Layers R-0.68, R-15, R-0.17. U-factor?", opts: ["0.063", "0.15", "15.85", "0.68"], a: 0, why: "1 ÷ 15.85 = 0.063." },
  { q: "Best glass for west facades in a cooling climate:", opts: ["High SHGC", "Low SHGC, high VT", "Low VT", "Clear single pane"], a: 1, why: "Block heat, keep light." }] });
add("pdd-envelope", { quick: [
  { q: "Correct priority of control layers:", opts: ["Thermal, vapor, air, water", "Water, air, vapor, thermal", "Air, water, thermal, vapor", "Vapor, thermal, water, air"], a: 1, why: "Water first; air carries most moisture." },
  { q: "Latex paint on drywall is a Class ___ vapor retarder.", opts: ["I", "II", "III", "Not a retarder"], a: 2, why: "Over 1 and up to 10 perms." }] });
add("pdd-specs", {
  diagram: `<svg viewBox="0 0 640 220" role="img" aria-label="Drawings versus specifications and the three-part section format. Tap parts to learn more.">
<g class="dg-text" font-size="11">
<g class="tip" data-tip="Drawings|Quantity, location, size and relationships. Dimension once, in one place."><rect x="30" y="30" width="250" height="70" class="dg-accent"/><text x="155" y="70" text-anchor="middle" class="dg-ontint">Drawings: where, how much</text></g>
<g class="tip" data-tip="Specifications|Quality, materials, workmanship and standards. Never dimension in the specs."><rect x="360" y="30" width="250" height="70" class="dg-accent2"/><text x="485" y="70" text-anchor="middle">Specs: what quality</text></g>
<g class="tip" data-tip="Part 1 General|Summary, references, submittals, quality assurance, delivery, warranty."><rect x="360" y="120" width="250" height="26" class="dg-soft"/><text x="370" y="138">Part 1 General</text></g>
<g class="tip" data-tip="Part 2 Products|Manufacturers, materials, performance, fabrication."><rect x="360" y="148" width="250" height="26" class="dg-soft"/><text x="370" y="166">Part 2 Products</text></g>
<g class="tip" data-tip="Part 3 Execution|Examination, preparation, installation, field quality control, cleaning, protection."><rect x="360" y="176" width="250" height="26" class="dg-soft"/><text x="370" y="194">Part 3 Execution</text></g>
<g class="tip" data-tip="Complementary documents|A201 §1.2.1: what one requires is binding as if required by all. Set any order of precedence in the agreement."><line x1="280" y1="65" x2="360" y2="65" class="dg-line" stroke-dasharray="5 4"/><text x="320" y="56" text-anchor="middle">§1.2.1</text></g>
</g></svg>`,
  quick: [
    { q: "Installation tolerances belong in:", opts: ["Part 1", "Part 2", "Part 3", "Division 00"], a: 2, why: "Execution." },
    { q: "Toilet partitions are in MasterFormat Division:", opts: ["08", "09", "10", "06"], a: 2, why: "Specialties." }] });
add("ce-admin", { quick: [
  { q: "A minor change with no cost or time effect is issued as:", opts: ["Change order", "CCD", "ASI (A201 §7.4)", "Addendum"], a: 2, why: "The architect may order minor changes." },
  { q: "Who has the right to stop the work under A201?", opts: ["Architect", "Owner (§2.4)", "Building official only", "Any subcontractor"], a: 1, why: "The architect may reject work, not stop it." }] });
add("ce-payment", { tryit: ["pay"],
  diagram: `<svg viewBox="0 0 640 210" role="img" aria-label="Payment and completion timeline under A201. Tap each step to learn more.">
<g class="dg-text" font-size="11">
<line x1="30" y1="100" x2="610" y2="100" class="dg-line"/>
<g class="tip" data-tip="Application for payment|Contractor submits at least 10 days before the payment date (§9.3.1), on G702/G703."><circle cx="70" cy="100" r="10" class="dg-accent"/><text x="70" y="80" text-anchor="middle">Application</text></g>
<g class="tip" data-tip="Certificate for payment|Architect certifies or notifies of withholding within 7 days (§9.4.1)."><circle cx="200" cy="100" r="10" class="dg-accent"/><text x="200" y="80" text-anchor="middle">Certify ≤ 7 days</text></g>
<g class="tip" data-tip="Substantial completion|Contractor's list (§9.8.2), architect inspects, G704 issued (§9.8.4). Warranties and the one-year correction period start."><circle cx="360" cy="100" r="10" class="dg-accent2"/><text x="360" y="80" text-anchor="middle">Substantial completion</text></g>
<g class="tip" data-tip="Final completion|Final inspection; closeout documents G706, G706A, G707 (§9.10.2); final certificate."><circle cx="500" cy="100" r="10" class="dg-accent2"/><text x="500" y="80" text-anchor="middle">Final payment</text></g>
<g class="tip" data-tip="Correction period|One year after substantial completion (§12.2.2.1). Walk the building at about 11 months."><rect x="360" y="130" width="240" height="18" class="dg-air"/><text x="480" y="170" text-anchor="middle">1-year correction period</text></g>
</g></svg>`,
  quick: [
    { q: "Who prepares the punch list?", opts: ["Architect", "Contractor (§9.8.2)", "Owner", "Surety"], a: 1, why: "The architect inspects and may add items." },
    { q: "Completed $500k, stored $20k, retainage 10%, previous $300k. Due?", opts: ["$168,000", "$188,000", "$220,000", "$200,000"], a: 0, why: "520k × 0.9 = 468k − 300k = 168k." }] });
})();
