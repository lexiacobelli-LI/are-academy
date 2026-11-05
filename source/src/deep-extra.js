/* ---------- Deeper lesson content: sections that extend lessons without repeating them (v19) ---------- */
ARE.DEEP = ARE.DEEP || {};
ARE.DEEP_TERMS = ARE.DEEP_TERMS || [];
const deepAdd = (id, secs, tips) => { const d = ARE.DEEP[id] = ARE.DEEP[id] || { sections: [], tips: [] }; d.sections.push(...secs); if (tips) d.tips = (d.tips || []).concat(tips); };

deepAdd("pcm-delivery", [
  { h: "How the delivery method changes the architect's role", html: `
<table class="tbl"><thead><tr><th>Method</th><th>Architect's client</th><th>What changes for the architect</th></tr></thead><tbody>
<tr><td>Design-bid-build</td><td>Owner (B101)</td><td>Full documents before pricing; bidding assistance; full construction administration for the owner.</td></tr>
<tr><td>CM at risk</td><td>Owner (B101 or B133)</td><td>Works alongside the CM during design: cost and constructability reviews, early bid packages, documents that support a GMP. The GMP may rest on incomplete drawings, so clarify what the GMP assumes.</td></tr>
<tr><td>Design-build</td><td>Design-builder (B143)</td><td>The architect's duties run to the design-builder, not the owner. The owner may hire its own criteria architect to prepare bridging documents and review the design-builder's work.</td></tr>
<tr><td>IPD</td><td>Shared multi-party agreement</td><td>Shared risk and reward pool; decisions by a project management team; claims among parties are limited.</td></tr>
</tbody></table>` }
]);

deepAdd("pjm-changes", [
  { h: "Writing an Additional Services notice", html: `
<p>A good notice is short, factual and sent when the need is recognized, not at invoicing. Include:</p>
<ol>
<li>What the owner asked for, or what changed, with the date.</li>
<li>Why it is outside the agreed scope, citing the agreement (for example, B101 §4.2.1.1: a change in previous approvals).</li>
<li>The services needed and the effect on fee and schedule.</li>
<li>A request for written authorization before work starts, or, for §4.2.2 services, a statement that work is proceeding to avoid delay and that the owner may stop it in writing.</li>
</ol>
<p>File the notice and the response in the project record and update the work plan once authorized.</p>` }
]);

deepAdd("pjm-agreements", [
  { h: "Bonds in the owner–contractor contract", html: `
<table class="tbl"><thead><tr><th>Bond</th><th>Protects</th><th>When</th></tr></thead><tbody>
<tr><td>Bid bond</td><td>The owner, if the low bidder refuses to sign the contract</td><td>Submitted with the bid</td></tr>
<tr><td>Performance bond</td><td>The owner, if the contractor defaults; the surety completes the work or pays</td><td>Provided at contract signing (AIA A312)</td></tr>
<tr><td>Payment bond</td><td>Subcontractors and suppliers, if the contractor does not pay them</td><td>Provided at contract signing (AIA A312)</td></tr>
</tbody></table>
<p>A201–2017 §11.1.2 requires the contractor to provide the bonds the contract documents call for. On federal construction contracts the Miller Act requires performance and payment bonds above a set contract value, and most states have similar \"Little Miller Act\" laws for public work. Because liens generally cannot be filed against public property, the payment bond is the subcontractors' protection on public projects.</p>` }
], ["Payment bonds protect subcontractors and suppliers; performance bonds protect the owner."]);
ARE.DEEP_TERMS.push(
  ["Performance bond", "Contracts", "A surety's guarantee to the owner that the contract will be completed if the contractor defaults.", "pjm-agreements"],
  ["Payment bond", "Contracts", "A surety's guarantee that subcontractors and suppliers will be paid.", "pjm-agreements"],
  ["Bid bond", "Contracts", "Security submitted with a bid guaranteeing the bidder will sign the contract if awarded.", "pjm-agreements"]
);

deepAdd("pa-existing", [
  { h: "Planning the investigation", html: `
<table class="tbl"><thead><tr><th>Question</th><th>Method</th><th>Who</th></tr></thead><tbody>
<tr><td>What is actually there?</td><td>Field measurement, laser scanning, comparison with record drawings</td><td>Architect or surveyor</td></tr>
<tr><td>Can the structure carry the new use?</td><td>Visual survey, load capacity review, material testing, selective probes</td><td>Structural engineer</td></tr>
<tr><td>Are there hazardous materials?</td><td>Sampling and lab testing for asbestos, lead, PCBs, mold</td><td>Owner's environmental consultant</td></tr>
<tr><td>How much life is left in the systems?</td><td>Condition assessment of roof, envelope, MEP</td><td>Architect and engineers</td></tr>
<tr><td>Which features are historic?</td><td>Historic structure report; character-defining features</td><td>Preservation architect or consultant</td></tr>
</tbody></table>
<p>Destructive testing (opening walls, taking cores) needs the owner's approval and a plan for patching. Record findings with photos keyed to plans, and state assumptions about concealed conditions in the documents.</p>` },
  { h: "Is reuse the right choice?", html: `
<p>Compare reuse with new construction on: fit of the floor plate, structural grid and floor-to-floor height to the program; the code upgrades the change of occupancy will trigger; hazardous-material abatement cost; schedule risk from unknown conditions; and embodied carbon, where reuse usually wins because the structure and foundations are already built. Carry a larger construction contingency for renovation than for new work.</p>` }
]);

deepAdd("pdd-envelope", [
  { h: "Air barrier requirements and testing", html: `
<p>The energy code requires a continuous air barrier on the building envelope. Under the IECC, air barrier <b>materials</b> must have an air permeance no greater than 0.004 cfm/ft² at 1.57 psf (75 Pa); assemblies and whole-building testing are alternative ways to show compliance. Every transition (wall to roof, wall to window, wall to foundation) and every penetration must be sealed and shown in details.</p>
<p>Field verification is cheaper than repairs: build a <b>mock-up</b> of a typical wall with a window and test it before the work proceeds. Common tests are water penetration under pressure (ASTM E1105) and hose testing of curtain wall joints (AAMA 501.2). Whole-building air-leakage testing (ASTM E779) measures the result after enclosure.</p>` },
  { h: "Checking condensation risk", html: `
<p>A steady-state dew-point analysis plots the temperature through the wall at design conditions and checks whether any surface falls below the dew point where moist air can reach it. The related Glaser method compares vapor pressure with saturation vapor pressure layer by layer. It is a quick screening tool. For walls with unusual layers, high interior humidity (pools, hospitals) or mass masonry retrofits, use transient hygrothermal modeling (WUFI is common), which accounts for rain, solar drying and stored moisture over time.</p>` }
], ["Mock-ups are built and tested before the real work, so problems are fixed once."]);
ARE.DEEP_TERMS.push(["Mock-up", "Construction admin", "A full-size sample of an assembly built and tested to set the standard for the work.", "pdd-envelope"],
  ["Dew point", "Building science", "The temperature at which air becomes saturated and moisture condenses.", "pdd-envelope"]);

deepAdd("pdd-specs", [
  { h: "Allowances, alternates and unit prices", html: `
<table class="tbl"><thead><tr><th>Tool</th><th>What it is</th><th>Where specified</th></tr></thead><tbody>
<tr><td>Allowance</td><td>A sum carried in the contract for an item not yet selected (for example, hardware or finishes). The contract sum is adjusted to the actual cost when selected (A201 §3.8).</td><td>Division 01 (Allowances)</td></tr>
<tr><td>Alternate</td><td>A priced change to the base bid (add or deduct) the owner may accept at award.</td><td>Division 01 (Alternates) and the bid form</td></tr>
<tr><td>Unit price</td><td>A price per unit (per cubic yard of rock removal, per pile) for quantities that cannot be known at bid.</td><td>Division 01 (Unit Prices) and the bid form</td></tr>
</tbody></table>` },
  { h: "Substitutions", html: `
<p>Division 01 sets how substitutions are requested and judged. During bidding, a bidder submits a request before a deadline; approved products are added by addendum so all bidders can use them. After award, A201 §3.4.2 allows substitutions only with the owner's consent, after evaluation by the architect, through a change order or CCD. The requester must show the substitute is equal in performance, appearance and warranty, and must cover any redesign or coordination cost. \"Or equal\" language still requires the architect's approval of the equal.</p>` },
  { h: "Keeping specs and drawings coordinated", html: `
<ul>
<li>Use the same names for products and materials on drawings and in specs.</li>
<li>Keynote drawings to specification section numbers rather than writing product descriptions on sheets.</li>
<li>Edit master specifications for the project: delete products and options that do not apply, so the contractor is not left to guess.</li>
<li>Check that every material shown has a section, and every section has something to apply to.</li>
</ul>` }
], ["Allowances, alternates and unit prices all live in Division 01; alternates and unit prices also appear on the bid form.", "After award, substitutions need the owner's consent and a change order or CCD (A201 §3.4.2)."]);
ARE.DEEP_TERMS.push(
  ["Allowance", "Specifications", "A sum included in the contract for work not yet fully defined, adjusted to actual cost later.", "pdd-specs"],
  ["Substitution", "Specifications", "A proposed product or method in place of one specified; requires evaluation and approval.", "pdd-specs"],
  ["Keynote", "Documentation", "A reference tag on a drawing linking a note to a specification section.", "pdd-specs"]
);

deepAdd("pdd-roofing", [
  { h: "Roof assembly from the deck up", html: `
<table class="tbl"><thead><tr><th>Layer</th><th>Purpose</th></tr></thead><tbody>
<tr><td>Deck</td><td>Structure: steel, concrete or wood</td></tr>
<tr><td>Vapor retarder (where needed)</td><td>Cold climates or humid interiors such as pools; placed on the warm side of the insulation</td></tr>
<tr><td>Insulation</td><td>Usually polyiso in two staggered layers; tapered to create slope</td></tr>
<tr><td>Cover board</td><td>Protects insulation and gives a firm base for the membrane</td></tr>
<tr><td>Membrane</td><td>The waterproofing layer</td></tr>
</tbody></table>
<p>A <b>protected membrane roof</b> reverses the order: the membrane sits on the deck, and moisture-resistant insulation (XPS) and ballast go on top, protecting the membrane from UV and traffic.</p>` },
  { h: "Green roofs and rooftop solar", html: `
<ul>
<li><b>Structure</b>: saturated weight of soil and plants, or PV racking and ballast, must be carried. Extensive green roofs are lighter than intensive ones.</li>
<li><b>Waterproofing</b>: add a root barrier and protection layer; consider electronic leak detection before covering the membrane.</li>
<li><b>Drainage</b>: a drainage layer and access to drains for maintenance.</li>
<li><b>Wind and fire</b>: ballast and attachment designed for wind uplift; fire-classification and setback rules apply to PV.</li>
<li><b>Coordination</b>: PV conduit routes and roof penetrations should be planned with the membrane flashing details.</li>
</ul>` }
], ["Base flashing usually rises at least 8 in above the roof surface, with counterflashing over it."]);
ARE.DEEP_TERMS.push(["Protected membrane roof", "Roofing", "A roof with insulation and ballast placed above the membrane, protecting it.", "pdd-roofing"],
  ["Cover board", "Roofing", "A rigid board installed over insulation to support and protect the roof membrane.", "pdd-roofing"]);

deepAdd("ce-admin", [
  { h: "Delegated design and informational submittals", html: `
<p>When the documents require the contractor to provide professional design (a curtain wall, fire sprinkler system, precast connections), the architect must state the performance and design criteria. The resulting submittals must bear the contractor's design professional's seal. The architect reviews them only for conformance with the criteria and the design concept, and may rely on that professional's work (B101 §3.6.4.3). Submittals the documents list as \"for information only\" need no action, but log them.</p>` },
  { h: "Running the RFI process", html: `
<ul>
<li>Set the RFI format and response times in Division 01, as B101 §3.6.4.4 expects.</li>
<li>Log every RFI with dates received and answered; track trends, since many RFIs in one area point to a documentation problem.</li>
<li>Answer in writing and with drawings where needed. If the answer changes cost or time, it is not an RFI response; use a proposal request, change order or CCD.</li>
<li>RFIs the contractor could have answered from the documents are an Additional Service under B101 §4.2.2.2; tell the owner.</li>
</ul>` }
]);

deepAdd("ce-payment", [
  { h: "Partial occupancy", html: `
<p>The owner may occupy or use a completed or partly completed portion before substantial completion if it is agreed with the contractor, the insurer consents and the authorities having jurisdiction allow it (A201 §9.9.1). Before occupancy, the owner and contractor agree in writing on responsibility for security, maintenance, utilities, damage and insurance, and the architect inspects with them to record the condition of that portion. Partial occupancy does not by itself mean acceptance of work that does not conform.</p>` }
]);

deepAdd("ppd-heightarea", [
  { h: "Worked allowable-area check (illustrative values)", html: `
<p>Suppose Table 506.2 gives a tabular area A<sub>t</sub> of 36,000 sf (SM) and a nonsprinklered value NS of 12,000 sf for a three-story, sprinklered building. The building has 160 ft of its 400 ft perimeter on a public way 30 ft wide. <i>(These numbers are for practice; take real values from the code table for the actual occupancy and construction type.)</i></p>
<table class="tbl"><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody>
<tr><td>Frontage factor</td><td>I<sub>f</sub> = [160/400 − 0.25] × 30/30</td><td>0.15</td></tr>
<tr><td>Area per story</td><td>A<sub>t</sub> + NS × I<sub>f</sub> = 36,000 + 12,000 × 0.15</td><td>37,800 sf</td></tr>
<tr><td>Total building area</td><td>37,800 × S<sub>a</sub> (3 stories)</td><td>113,400 sf</td></tr>
</tbody></table>
<p>Also check any per-story limit the adopted code applies. If the design exceeds either limit, raise the construction type, add frontage or divide the building with fire walls.</p>` }
]);

deepAdd("ppd-envelope", [
  { h: "Glazing area and daylight", html: `
<p>The 2021 IECC prescriptive path limits vertical fenestration to 30% of the gross above-grade wall area, or 40% in Climate Zones 0–7 where enough floor area is in daylight zones, daylight-responsive controls are installed and the glazing VT is at least 1.1 × SHGC (C402.4.1.1). Skylights are limited to 3% of the roof area, or 6% where daylight-responsive controls serve the toplit zones (C402.4.1.2). Exceeding these requires the performance path or trade-offs.</p>
<p>Daylight from side windows reaches roughly 1.5 to 2.5 times the window head height into a room; a light shelf or high-reflectance ceiling pushes it toward the upper end. Higher heads, light-colored surfaces and narrow floor plates spread daylight further; glare control (shades, louvers) keeps it usable.</p>` }
], ["Prescriptive window-to-wall limits push large glazing designs to the performance path."]);
ARE.DEEP_TERMS.push(["Window-to-wall ratio", "Energy", "Glazed area divided by gross exterior wall area; limited in the energy code's prescriptive path.", "ppd-envelope"],
  ["Light shelf", "Daylighting", "A horizontal surface above eye level that reflects daylight deeper into a room and shades the lower window.", "ppd-envelope"]);

deepAdd("ppd-access", [
  { h: "Toilet room and door details (2010 ADA Standards)", html: `
<table class="tbl"><thead><tr><th>Element</th><th>Requirement</th><th>Section</th></tr></thead><tbody>
<tr><td>Clearance around water closet</td><td>60 in wide (measured from the side wall) × 56 in deep (measured from the rear wall)</td><td>604.3.1</td></tr>
<tr><td>Lavatory</td><td>Rim or counter 34 in maximum; knee clearance 27 in high minimum</td><td>606.3, 306.3</td></tr>
<tr><td>Mirror over lavatory</td><td>Bottom of reflecting surface 40 in maximum</td><td>603.3</td></tr>
<tr><td>Door swing</td><td>May not swing into a fixture's clear floor space (single-user exception if clear space is provided beyond the swing)</td><td>603.2.3</td></tr>
<tr><td>Door maneuvering clearance</td><td>18 in minimum beside the latch on the pull side (front approach)</td><td>404.2.4</td></tr>
<tr><td>Protruding objects</td><td>No more than 4 in into a route between 27 in and 80 in above the floor</td><td>307.2</td></tr>
<tr><td>Headroom</td><td>80 in minimum along routes</td><td>307.4</td></tr>
</tbody></table>` }
], ["A door that swings into a fixture's clear floor space is a common error in toilet room plans."]);

deepAdd("pdd-firerated", [
  { h: "Reading a listed assembly", html: `
<p>A listing (for example, a UL design number) describes exactly what was tested: framing size and spacing, number and type of gypsum layers, fastener spacing, insulation, joint treatment and any restrictions (load-bearing or not, maximum height). To use it:</p>
<ol>
<li>Confirm the rating and whether it is restrained or load-bearing as your project needs.</li>
<li>Match every component; a different stud gauge or board type may void the rating.</li>
<li>Put the design number on the wall-type schedule and in the specification.</li>
<li>Coordinate penetrations and joints with listed systems that match the assembly.</li>
<li>Have substitutions evaluated against an equivalent listing, not judged by appearance.</li>
</ol>` }
]);

deepAdd("pcm-firm", [
  { h: "How firms organize their staff", html: `
<table class="tbl"><thead><tr><th>Structure</th><th>How it works</th><th>Strengths</th><th>Weaknesses</th></tr></thead><tbody>
<tr><td>Departmental</td><td>Staff grouped by function (design, production, CA); projects pass between departments</td><td>Specialized skill and efficiency</td><td>Hand-offs lose knowledge; weaker client continuity</td></tr>
<tr><td>Studio</td><td>Small teams own projects from start to finish, often by market (health care, education)</td><td>Continuity, client focus, market expertise</td><td>Uneven workload between studios</td></tr>
<tr><td>Matrix</td><td>Staff report to a discipline leader and to project managers at the same time</td><td>Flexible use of staff across projects</td><td>Two bosses; needs clear priorities</td></tr>
</tbody></table>
<p>Small firms often rely on generalists who carry a project through every phase. As firms grow, they add layers (principals, project managers, project architects) and formal policies for quality, staffing and financial reporting.</p>` }
]);
