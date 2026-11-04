/* ============================================================
   LESSONS F: tap-to-explain hotspots for the ten original lesson
   diagrams (also drive animated callouts in video lessons).
   Each entry wraps exact SVG fragments in <g class="tip">.
   ============================================================ */
(function () {
const T = {
  "pcm-finance": [
    ['<rect x="20" y="30" width="120" height="190" class="dg-soft"/><text x="80" y="22" text-anchor="middle">Gross revenue</text>', "Gross revenue|Everything the firm bills, including consultants' fees and reimbursable expenses passed through to the client."],
    ['<rect x="20" y="30" width="120" height="40" class="dg-hatch"/><text x="80" y="54" text-anchor="middle">Consultants</text>', "Consultants|Fees paid to engineers and other consultants. Subtract them from gross revenue: they're not the firm's own earnings."],
    ['<rect x="20" y="70" width="120" height="20" class="dg-hatch"/><text x="80" y="84" text-anchor="middle" font-size="11">Reimbursables</text>', "Reimbursable expenses|Costs billed back to the client at cost (or with a small markup), such as printing and travel. Also subtracted to get net operating revenue."],
    ['<rect x="220" y="90" width="120" height="130" class="dg-soft"/><text x="280" y="82" text-anchor="middle">Net operating revenue</text>', "Net operating revenue (NOR)|Gross revenue minus consultants and reimbursables: the money the firm's own staff actually earned. Net multiplier = NOR ÷ direct labor."],
    ['<rect x="400" y="174" width="120" height="46" class="dg-accent"/><text x="460" y="201" text-anchor="middle" class="dg-ontint">Direct labor</text>', "Direct labor|Salary cost of time charged to projects (the base, × 1.00). Overhead rate and multipliers are all expressed relative to it."],
    ['<rect x="400" y="112" width="120" height="62" class="dg-soft"/><text x="460" y="147" text-anchor="middle">Overhead</text>', "Overhead (indirect expenses)|Rent, benefits, non-billable time and other indirect costs. Overhead rate = indirect expenses ÷ direct labor. Break-even rate = 1 + overhead rate."],
    ['<rect x="400" y="90" width="120" height="22" class="dg-accent2"/><text x="460" y="105" text-anchor="middle">Profit</text>', "Profit|What remains when the net multiplier exceeds the break-even rate. A net multiplier below break-even means the firm loses money on labor."]
  ],
  "pcm-risk": [
    ['<g><line x1="80" y1="80" x2="80" y2="100" class="dg-line"/><text x="80" y="118" text-anchor="middle">2020</text><text x="80" y="70" text-anchor="middle">Design work</text></g>', "The work is done|Design services are performed while a claims-made policy is in force. That alone doesn't secure coverage."],
    ['<rect x="80" y="130" width="220" height="14" class="dg-accent"/><text x="190" y="160" text-anchor="middle">Policy in force</text>', "Claims-made policy|Covers claims made (and reported) while the policy is in force, regardless of when the work was done, subject to the retroactive date."],
    ['<g><line x1="300" y1="80" x2="300" y2="100" class="dg-line"/><text x="300" y="118" text-anchor="middle">2024</text><text x="300" y="70" text-anchor="middle">Firm closes, policy ends</text></g>', "The policy lapses|When the firm closes or retires and the policy ends, future claims on past work are uninsured unless a tail is bought."],
    ['<rect x="300" y="130" width="250" height="14" class="dg-hatch"/><text x="425" y="160" text-anchor="middle">Covered only if a tail (ERP) was purchased</text>', "Extended reporting period (tail)|Purchased when a policy ends; lets claims made later on earlier work still be reported and covered."],
    ['<g><line x1="520" y1="80" x2="520" y2="100" class="dg-line"/><text x="520" y="118" text-anchor="middle">2026</text><text x="520" y="70" text-anchor="middle">Claim made</text></g>', "The claim arrives|Claims often surface years after the work, within the statute of limitations or repose. Without a tail this claim has no coverage."]
  ],
  "pcm-delivery": [
    ['<rect x="100" y="34" width="100" height="32" class="dg-accent"/><text x="150" y="55" text-anchor="middle" class="dg-ontint">Owner</text>', "Owner in design-bid-build|Holds two separate contracts: one with the architect and one with the contractor. The owner carries the risk of gaps between design and construction."],
    ['<line x1="130" y1="146" x2="170" y2="146" class="dg-line" stroke-dasharray="4 3"/>', "No contract between architect and contractor|They communicate through the documents and construction administration, but neither can sue the other on contract."],
    ['<rect x="170" y="130" width="110" height="32" class="dg-soft"/><text x="225" y="151" text-anchor="middle">Contractor</text>', "Contractor (DBB)|Selected by competitive bid on complete documents, then builds to them. Price certainty comes late, after design is finished."],
    ['<rect x="415" y="92" width="130" height="32" class="dg-soft"/><text x="480" y="113" text-anchor="middle">Design-builder</text>', "Design-builder|One contract with the owner for both design and construction: single-point responsibility, faster delivery, less owner control over design."],
    ['<rect x="360" y="152" width="110" height="32" class="dg-soft"/><text x="415" y="173" text-anchor="middle">Architect</text>', "Architect in design-build|Often a subconsultant to the design-builder, so the architect's client is the builder, not the owner. Loyalty and standard of care questions follow."]
  ],
  "pjm-schedule": [
    ['<rect x="20" y="90" width="100" height="44" class="dg-accent"/><text x="70" y="108" text-anchor="middle" class="dg-ontint">A  Survey</text><text x="70" y="124" text-anchor="middle" class="dg-ontint">4 d</text>', "Activity A|Must finish before B and C can start (finish-to-start dependency)."],
    ['<rect x="200" y="30" width="110" height="44" class="dg-accent"/><text x="255" y="48" text-anchor="middle" class="dg-ontint">B  Program</text><text x="255" y="64" text-anchor="middle" class="dg-ontint">6 d · float 0</text>', "Activity B (critical)|Zero float: any delay to B delays the whole project."],
    ['<rect x="200" y="150" width="110" height="44" class="dg-soft"/><text x="255" y="168" text-anchor="middle">C  Code review</text><text x="255" y="184" text-anchor="middle">3 d · float 3</text>', "Activity C (float 3)|Path A–C–D is 11 days, 3 days shorter than the critical path, so C can slip 3 days without delaying completion."],
    ['<text x="530" y="108">Critical path</text><text x="530" y="124">A–B–D = 14 d</text>', "Critical path|The longest path through the network sets the shortest possible duration: 4 + 6 + 4 = 14 days."]
  ],
  "pa-zoning": [
    ['<rect x="160" y="50" width="320" height="120" class="dg-accent" opacity=".85"/>', "Buildable area|What's left inside the setbacks, minus any easement. The footprint must fit here before floor area ratio (FAR) or height are even considered."],
    ['<line x1="300" y1="170" x2="300" y2="220" class="dg-line" stroke-dasharray="3 3"/><text x="306" y="200">Front 50′</text>', "Front setback|Measured from the front lot line along the street. Usually the deepest yard."],
    ['<line x1="120" y1="110" x2="160" y2="110" class="dg-line" stroke-dasharray="3 3"/><text x="20" y="114">Side 40′</text>', "Side setbacks|Required on both sides. Subtract both from the lot width."],
    ['<rect x="440" y="50" width="40" height="120" class="dg-hatch"/>', "Easement|A right for others (here, a utility) to use part of the lot. You generally can't build over it, even inside the setbacks."]
  ],
  "pa-program": [
    ['<path d="M120 20 L300 92" class="dg-sun" stroke-dasharray="6 4"/><text x="110" y="16">Summer sun (high)</text>', "High summer sun|At a high altitude angle, a properly sized south overhang shades the glass and cuts cooling load."],
    ['<path d="M60 150 L300 175" class="dg-sun"/><text x="40" y="142">Winter sun (low)</text>', "Low winter sun|Passes under the same overhang and reaches deep into the room for passive solar heat gain."],
    ['<line x1="300" y1="80" x2="250" y2="80" class="dg-line" stroke-width="4"/>', "South overhang|Fixed horizontal shading works on south façades (northern hemisphere). East and west sun is low, so those need vertical fins or other shading."],
    ['<text x="230" y="220">South</text>', "Orientation|Elongating the building east–west with main glazing facing south makes this simple shading strategy effective."]
  ],
  "ppd-egress": [
    ['<line x1="80" y1="220" x2="500" y2="30" class="dg-line" stroke-dasharray="6 4"/>', "Overall diagonal (D)|The maximum diagonal dimension of the room or area served. Exit separation is measured as a fraction of it."],
    ['<rect x="104" y="214" width="36" height="12" class="dg-accent"/><text x="122" y="244" text-anchor="middle">Exit 1</text>', "Exit or exit access doorway|Where two are required, they must be placed far enough apart that one fire is unlikely to block both."],
    ['<line x1="140" y1="214" x2="400" y2="36" class="dg-accentline" stroke-width="2"/>', "Separation distance|Measured in a straight line between the nearest edges of the two exits."],
    ['<text x="520" y="120">Sprinklered:</text><text x="520" y="136">≥ D/3 ≈ 153 ft</text>', "Sprinklered building|At least one-third of the overall diagonal (IBC §1007.1.1 exception)."],
    ['<text x="520" y="160">Unsprinklered:</text><text x="520" y="176">≥ D/2 = 230 ft</text>', "Unsprinklered building|At least one-half of the overall diagonal (IBC §1007.1.1)."]
  ],
  "ppd-envelope": [
    ['<rect x="80" y="30" width="110" height="150" class="dg-hatch"/>', "Cavity batt (R-19)|Its clear-field value is reduced by the studs (thermal bridging), so the whole-wall R is lower than the sum shown."],
    ['<rect x="202" y="30" width="60" height="150" class="dg-accent2"/>', "Continuous insulation (R-10)|Unbroken by framing, so it keeps its full value and reduces thermal bridging through the studs."],
    ['<text x="360" y="60">R films ≈ 0.68 + 0.17</text>', "Air films|The still air layers at the inside and outside surfaces add small R-values. Include them in the total."],
    ['<text x="360" y="140" font-weight="600">R_T ≈ 31.5  →  U ≈ 0.032</text>', "Layers in series|Add R-values (R_T = ΣR) and take the inverse for U (U = 1/R_T). Never add U-factors."]
  ],
  "pdd-envelope": [
    ['<line x1="157" y1="128" x2="300" y2="130" class="dg-leader"/><text x="306" y="134">Air + water-resistive barrier (continuous)</text>', "Air and water-resistive barrier|The control layers: continuous across joints, openings and transitions, lapped shingle-fashion so water drains outward."],
    ['<line x1="184" y1="160" x2="300" y2="160" class="dg-leader"/><text x="306" y="164">Continuous exterior insulation</text>', "Continuous exterior insulation|Keeps the sheathing and barrier warm, reducing condensation risk inside the wall."],
    ['<line x1="220" y1="186" x2="300" y2="190" class="dg-leader"/><text x="306" y="194">Drained, ventilated cavity</text>', "Drained cavity (rainscreen)|An air gap behind the cladding lets water that gets past the cladding drain down and the wall dry out."],
    ['<line x1="250" y1="230" x2="300" y2="244" class="dg-leader"/><text x="306" y="248">Base flashing with drip and weeps</text>', "Base flashing and weeps|Collects cavity water and directs it out at the bottom of the wall. The WRB laps over the flashing, never behind it."],
    ['<line x1="47" y1="20" x2="300" y2="40" class="dg-leader"/><text x="306" y="44">Gypsum board (interior; Class III with latex paint)</text>', "Interior vapor control|In most US climates, latex-painted gypsum is a Class III vapor retarder. Avoid impermeable layers on both faces of the wall."]
  ],
  "ce-admin": [
    ['<rect x="20" y="100" width="120" height="44" class="dg-soft"/><text x="80" y="118" text-anchor="middle">Contractor</text><text x="80" y="134" text-anchor="middle">question</text>', "Request for information (RFI)|The contractor asks the architect to clarify the documents. An answer clarifies; it doesn't change the contract."],
    ['<rect x="350" y="20" width="130" height="40" class="dg-accent"/><text x="415" y="44" text-anchor="middle" class="dg-ontint">RFI answer / ASI</text>', "ASI (minor change)|The architect's supplemental instructions: minor changes with no change to contract sum or time (A201 §7.4)."],
    ['<rect x="520" y="70" width="104" height="40" class="dg-accent"/><text x="572" y="94" text-anchor="middle" class="dg-ontint">Change Order</text>', "Change order|Signed by owner, contractor and architect, it agrees the change in work, contract sum and time (A201 §7.2)."],
    ['<rect x="520" y="150" width="104" height="40" class="dg-accent2"/><text x="572" y="174" text-anchor="middle">CCD → CO</text>', "Construction change directive|Signed by owner and architect so the work proceeds while price or time is disputed. It's later converted into a change order (A201 §7.3)."]
  ]
};
const esc = (s) => s.replace(/"/g, "&quot;");
Object.entries(T).forEach(([id, list]) => {
  const l = ARE.LESSONS.find(x => x.id === id); if (!l || !l.diagram) return;
  let d = l.diagram, n = 0;
  list.forEach(([frag, tip]) => { const i = d.indexOf(frag); if (i < 0) return; d = d.slice(0, i) + `<g class="tip" data-tip="${esc(tip)}">` + frag + "</g>" + d.slice(i + frag.length); n++; });
  if (n) { l.diagram = d.replace('role="img"', 'role="group"'); ARE._tipCount = (ARE._tipCount || 0) + n; }
});
})();
