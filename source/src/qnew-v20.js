/* ---------- v20 new questions: visual problem-solving and multiple-response application items ----------
   Original questions and original diagrams. Code values cite the 2021 IBC and 2010 ADA Standards. */
(function () {
const Q = (o) => ARE.Q.push(o);
const fig = (svg) => `<div class="figure qfig">${svg}</div>`;

/* ---------- Visual problem-solving ---------- */
Q({ id: "q-ppd-n01", div: "ppd", obj: "ppd-2.2", lesson: "ppd-egress", type: "mc", diff: 3, fmt: "Diagram interpretation",
  q: "The plan shows one floor of a Group B office building that is <b>not</b> sprinklered. Two exits are required. Does the exit arrangement meet the 2021 IBC remoteness rule?" + fig(`<svg viewBox="0 0 520 300" role="img" aria-label="Floor plan 160 by 90 feet with a 184 foot diagonal and two exits 70 feet apart along the south wall"><g class="dg-text" font-size="13">
<rect x="40" y="40" width="440" height="220" class="dg-soft"/><line x1="40" y1="40" x2="480" y2="260" class="dg-leader" stroke-dasharray="6 4"/>
<text x="250" y="138" text-anchor="middle" transform="rotate(26 250 138)">diagonal 184 ft</text>
<rect x="150" y="252" width="26" height="16" class="dg-accent"/><rect x="342" y="252" width="26" height="16" class="dg-accent"/>
<text x="163" y="290" text-anchor="middle">Exit 1</text><text x="355" y="290" text-anchor="middle">Exit 2</text>
<line x1="163" y1="236" x2="355" y2="236" class="dg-line"/><text x="259" y="230" text-anchor="middle">70 ft between exits</text>
<text x="260" y="30" text-anchor="middle">160 ft</text><text x="20" y="155" text-anchor="middle" transform="rotate(-90 20 155)">90 ft</text></g></svg>`),
  opts: ["Yes. Exits must be at least one-third of the diagonal apart, which is about 61 ft", "No. Without sprinklers, exits must be at least one-half of the diagonal apart, which is 92 ft", "Yes. Any two exits on different sides of the corridor comply", "No. Exits must be at least the full diagonal apart, which is 184 ft"],
  ans: 1, why: ["One-third applies only when the building is sprinklered throughout.", "Correct. §1007.1.1: half the overall diagonal without sprinklers; 70 ft is less than 92 ft.", "Remoteness is measured, not judged by side.", "No rule requires the full diagonal."],
  explain: "Measure the separation in a straight line between exits and compare it with half the diagonal of the area served (one-third if sprinklered throughout). Here 184 ÷ 2 = 92 ft is needed; move an exit or sprinkler the building.", ref: "2021 IBC §1007.1.1" });

Q({ id: "q-pdd-n01", div: "pdd", obj: "pdd-1.3", lesson: "pdd-sizing", type: "mc", diff: 3, fmt: "Diagram interpretation",
  q: "The framing plan shows beam B1 supporting joists that span 24 ft on each side. Dead load is 60 psf and live load is 40 psf. What is the uniform load on B1?" + fig(`<svg viewBox="0 0 520 260" role="img" aria-label="Framing plan: beam B1 down the middle with joists spanning 24 feet to each side; tributary width shaded"><g class="dg-text" font-size="13">
<rect x="40" y="40" width="440" height="180" class="dg-soft"/>
<rect x="150" y="40" width="220" height="180" class="dg-accent2"/>
<line x1="260" y1="40" x2="260" y2="220" class="dg-line" stroke-width="4"/><text x="268" y="34">B1</text>
${[60, 80, 100, 120, 140, 160, 180, 200].map(y => `<line x1="40" y1="${y}" x2="480" y2="${y}" class="dg-leader"/>`).join("")}
<line x1="40" y1="236" x2="260" y2="236" class="dg-line"/><text x="150" y="252" text-anchor="middle">joist span 24 ft</text>
<line x1="260" y1="236" x2="480" y2="236" class="dg-line"/><text x="370" y="252" text-anchor="middle">joist span 24 ft</text>
<text x="260" y="132" text-anchor="middle" class="dg-ontint" font-size="12">tributary</text></g></svg>`),
  opts: ["1,200 plf", "4,800 plf", "2,400 plf", "2,880 plf"],
  ans: 2, why: ["Uses half of one joist span (12 ft) only.", "Uses the full 48 ft of both spans.", "Correct. Tributary width = 24/2 + 24/2 = 24 ft; (60 + 40) × 24 = 2,400 plf.", "Adds an extra 20% that the stem does not call for."],
  explain: "A beam carries half the span of the joists on each side. Tributary width × total load (psf) gives the uniform load in pounds per linear foot.", ref: "Onouye & Kane, Statics and Strength of Materials for Architecture and Building Construction" });

Q({ id: "q-pa-n01", div: "pa", obj: "pa-3.3", lesson: "pa-site", type: "hot", diff: 3, fmt: "Hotspot",
  q: "The plan shows spot elevations around a new building with a finished floor of 100.00. Grade next to the wall and grade 10 ft away are given on each side. Under 2021 IBC §1804.4, which side does <b>not</b> slope away adequately? Click it.",
  svg: `<svg viewBox="0 0 520 320" role="img" aria-label="Building plan with spot elevations on four sides"><g class="dg-text" font-size="13">
<rect x="170" y="100" width="180" height="120" class="dg-accent2"/><text x="260" y="165" text-anchor="middle">FF 100.00</text>
<text x="260" y="92" text-anchor="middle">99.50</text><text x="260" y="40" text-anchor="middle">99.00</text>
<text x="260" y="238" text-anchor="middle">99.50</text><text x="260" y="290" text-anchor="middle">98.90</text>
<text x="160" y="164" text-anchor="end">99.50</text><text x="70" y="164" text-anchor="middle">99.30</text>
<text x="360" y="164">99.50</text><text x="450" y="164" text-anchor="middle">98.95</text>
<g class="hs" data-hs="N" tabindex="0" role="button" aria-label="North side"><circle cx="300" cy="60" r="16" class="hs-dot"/><text x="300" y="65" text-anchor="middle">N</text></g>
<g class="hs" data-hs="S" tabindex="0" role="button" aria-label="South side"><circle cx="300" cy="266" r="16" class="hs-dot"/><text x="300" y="271" text-anchor="middle">S</text></g>
<g class="hs" data-hs="W" tabindex="0" role="button" aria-label="West side"><circle cx="110" cy="210" r="16" class="hs-dot"/><text x="110" y="215" text-anchor="middle">W</text></g>
<g class="hs" data-hs="E" tabindex="0" role="button" aria-label="East side"><circle cx="410" cy="210" r="16" class="hs-dot"/><text x="410" y="215" text-anchor="middle">E</text></g>
<text x="20" y="312" font-size="12">Each side: grade at wall (inner) and 10 ft away (outer)</text></g></svg>`,
  ans: "W",
  explain: "The code requires a 5% fall (6 in in 10 ft) away from the foundation. North falls 0.50 ft, south 0.60 ft, east 0.55 ft; west falls only 0.20 ft (2.4 in), so water can pond against the wall. Impervious surfaces may slope at 2% under the code's exception; this grade is not paved.", ref: "2021 IBC §1804.4" });

Q({ id: "q-ppd-n02", div: "ppd", obj: "ppd-2.3", lesson: "ppd-access", type: "hot", diff: 3, fmt: "Hotspot",
  q: "This single-user toilet room is drawn to the dimensions shown. Which labeled condition does <b>not</b> comply with the 2010 ADA Standards? Click it.",
  svg: `<svg viewBox="0 0 520 330" role="img" aria-label="Toilet room plan with four labeled conditions A to D"><g class="dg-text" font-size="13">
<rect x="60" y="30" width="300" height="270" class="dg-soft"/>
<rect x="72" y="50" width="34" height="56" class="dg-accent2"/><text x="122" y="70">WC</text>
<line x1="60" y1="78" x2="89" y2="78" class="dg-line"/><text x="74" y="126" font-size="12">20 in to centerline</text>
<rect x="64" y="130" width="6" height="110" class="dg-accent"/><text x="78" y="190" font-size="12">grab bar 42 in long</text>
<rect x="260" y="40" width="80" height="44" class="dg-accent2"/><text x="300" y="104" text-anchor="middle" font-size="12">lavatory rim 34 in</text>
<path d="M360 300 L360 236 A64 64 0 0 0 296 300" class="dg-line"/><text x="380" y="280" font-size="12">door 34 in clear</text>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="A: water closet centerline 20 inches from side wall"><circle cx="40" cy="78" r="15" class="hs-dot"/><text x="40" y="83" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="B: side grab bar 42 inches long"><circle cx="40" cy="185" r="15" class="hs-dot"/><text x="40" y="190" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="C: lavatory rim 34 inches"><circle cx="390" cy="62" r="15" class="hs-dot"/><text x="390" y="67" text-anchor="middle">C</text></g>
<g class="hs" data-hs="D" tabindex="0" role="button" aria-label="D: door 34 inches clear"><circle cx="470" cy="276" r="15" class="hs-dot"/><text x="470" y="281" text-anchor="middle">D</text></g></g></svg>`,
  ans: "A",
  explain: "The water closet centerline must be 16–18 in from the side wall (§604.2); 20 in puts the side grab bar out of reach. A 42 in side grab bar (§604.5.1), a 34 in lavatory rim (§606.3) and a 34 in clear door (32 in minimum, §404.2.3) all comply.", ref: "2010 ADA Standards §§604.2, 604.5.1, 606.3, 404.2.3" });

Q({ id: "q-pdd-n02", div: "pdd", obj: "pdd-1.5", lesson: "pdd-envelope", type: "mc", diff: 3, fmt: "Detail diagnosis",
  q: "The window head detail below is from a rainscreen wall. What is wrong with it?" + fig(`<svg viewBox="0 0 520 280" role="img" aria-label="Window head section: water-resistive barrier tucked behind the head flashing"><g class="dg-text" font-size="13">
<rect x="150" y="20" width="18" height="240" class="dg-hatch"/><text x="140" y="36" text-anchor="end">sheathing</text>
<path d="M170 20 L170 150" class="dg-accentline" stroke-width="3"/><text x="180" y="60">WRB (from above)</text>
<path d="M164 128 L164 152 L250 152 L258 160" class="dg-line" stroke-width="3"/><text x="262" y="150">head flashing</text>
<path d="M170 128 L170 150" stroke="var(--bad)" stroke-width="3" fill="none"/><text x="180" y="118" fill="var(--bad)">WRB ends behind flashing</text>
<rect x="160" y="170" width="70" height="40" class="dg-soft"/><text x="240" y="196">window frame</text>
<path d="M300 40 L300 140" class="dg-leader" stroke-dasharray="4 3"/><text x="306" y="96">water running down the WRB</text></g></svg>`),
  opts: ["The flashing should be set in sealant only, with no WRB involvement", "The window frame should project beyond the flashing", "Nothing; the flashing is above the window", "The WRB stops behind the flashing's vertical leg, so water on the WRB is directed behind the flashing; the WRB must lap over the flashing"],
  ans: 3, why: ["Sealant alone is not a reliable water barrier.", "Frame projection does not fix the lap.", "Position alone is not enough; the laps decide where water goes.", "Correct. Upper layers lap over lower ones so water drains out at every joint."],
  explain: "Trace a drop of water down the face of each layer: it must never meet an upturned edge or be directed behind a lower layer. At a head, the WRB above laps over the head flashing.", ref: "ASTM E2112; Straube & Burnett, Building Science for Building Enclosures" });

Q({ id: "q-pa-n02", div: "pa", obj: "pa-2.2", lesson: "pa-zoning", type: "hot", diff: 2, fmt: "Hotspot",
  q: "The site plan shows a 100 ft × 150 ft lot. Zoning requires a 25 ft front setback, 10 ft side setbacks and a 20 ft rear setback. Which labeled edge of the building violates a setback? Click it.",
  svg: `<svg viewBox="0 0 520 330" role="img" aria-label="Site plan of lot with building; labeled building edges A to D"><g class="dg-text" font-size="13">
<rect x="130" y="20" width="200" height="300" class="dg-soft"/><text x="230" y="14" text-anchor="middle">REAR</text><text x="230" y="335" text-anchor="middle" font-size="12">FRONT (street)</text>
<rect x="164" y="64" width="150" height="196" class="dg-accent2"/>
<line x1="314" y1="160" x2="330" y2="160" class="dg-line"/><text x="336" y="164" font-size="12">8 ft</text>
<line x1="130" y1="160" x2="164" y2="160" class="dg-line"/><text x="100" y="164" font-size="12" text-anchor="middle">17 ft</text>
<line x1="230" y1="20" x2="230" y2="64" class="dg-line"/><text x="236" y="46" font-size="12">22 ft</text>
<line x1="230" y1="260" x2="230" y2="320" class="dg-line"/><text x="236" y="296" font-size="12">30 ft</text>
<g class="hs" data-hs="A" tabindex="0" role="button" aria-label="A: rear wall"><circle cx="290" cy="80" r="14" class="hs-dot"/><text x="290" y="85" text-anchor="middle">A</text></g>
<g class="hs" data-hs="B" tabindex="0" role="button" aria-label="B: east side wall"><circle cx="296" cy="200" r="14" class="hs-dot"/><text x="296" y="205" text-anchor="middle">B</text></g>
<g class="hs" data-hs="C" tabindex="0" role="button" aria-label="C: front wall"><circle cx="190" cy="244" r="14" class="hs-dot"/><text x="190" y="249" text-anchor="middle">C</text></g>
<g class="hs" data-hs="D" tabindex="0" role="button" aria-label="D: west side wall"><circle cx="182" cy="120" r="14" class="hs-dot"/><text x="182" y="125" text-anchor="middle">D</text></g></g></svg>`,
  ans: "B",
  explain: "The east wall is 8 ft from the side lot line where 10 ft is required. The rear (22 ft ≥ 20), front (30 ft ≥ 25) and west side (17 ft ≥ 10) comply. Fix by narrowing the building or seeking a variance.", ref: "Local zoning ordinance (setbacks)" });

Q({ id: "q-pjm-n01", div: "pjm", obj: "pjm-2.2", lesson: "pjm-schedule", type: "mc", diff: 3, fmt: "Diagram interpretation",
  q: "In the schedule network below (durations in days), how much total float does activity B have?" + fig(`<svg viewBox="0 0 520 220" role="img" aria-label="Network: Start to A 5 days; A to B 3 days and A to C 6 days; B and C to D 4 days"><g class="dg-text" font-size="14">
<rect x="20" y="90" width="80" height="44" rx="6" class="dg-soft"/><text x="60" y="117" text-anchor="middle">A · 5</text>
<rect x="200" y="30" width="80" height="44" rx="6" class="dg-soft"/><text x="240" y="57" text-anchor="middle">B · 3</text>
<rect x="200" y="150" width="80" height="44" rx="6" class="dg-soft"/><text x="240" y="177" text-anchor="middle">C · 6</text>
<rect x="400" y="90" width="80" height="44" rx="6" class="dg-soft"/><text x="440" y="117" text-anchor="middle">D · 4</text>
<path d="M100 104 L200 56" class="dg-line"/><path d="M100 120 L200 170" class="dg-line"/><path d="M280 56 L400 104" class="dg-line"/><path d="M280 170 L400 120" class="dg-line"/></g></svg>`),
  opts: ["0 days", "3 days", "6 days", "9 days"],
  ans: 1, why: ["B is not on the critical path.", "Correct. Path A–C–D is 15 days; A–B–D is 12 days; B can slip 15 − 12 = 3 days.", "That is C's duration, not B's float.", "That adds durations rather than comparing paths."],
  explain: "Find the longest path (the critical path): A–C–D = 5 + 6 + 4 = 15 days. An activity's total float is how long it can slip without delaying completion: here 15 − 12 = 3 days for B.", ref: "PMI, PMBOK Guide — schedule management" });

/* ---------- Multiple-response application ---------- */
Q({ id: "q-ce-n01", div: "ce", obj: "ce-3.3", lesson: "ce-payapps", type: "ms", diff: 3, fmt: "Check all that apply", pick: 3,
  q: "Under A201–2017 §9.5.1, which three are grounds on which the architect may withhold certification for payment, to the extent needed to protect the owner? Check the three that apply.",
  opts: ["The contractor has not paid its subcontractors for work included in earlier payments", "The owner's own financing for the project is late", "Defective work has not been remedied", "The contractor declined a substitution the architect suggested", "There is reasonable evidence the work cannot be completed for the unpaid balance of the contract sum", "The superintendent missed one OAC meeting"],
  ans: [0, 2, 4], why: ["Correct. §9.5.1.3.", "The owner's financing is not a ground to withhold the contractor's payment.", "Correct. §9.5.1.1.", "Substitutions are the contractor's to propose, not a payment issue.", "Correct. §9.5.1.4.", "Not a listed ground."],
  explain: "Withholding is limited to the reasons in §9.5.1 and only to the extent needed to protect the owner. The architect notifies the contractor and owner in writing of the reasons (§9.4.1).", ref: "AIA A201–2017, §9.5.1 and §9.4.1" });

Q({ id: "q-pjm-n02", div: "pjm", obj: "pjm-3.1", lesson: "pjm-changes", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "After approving design development, the owner asks the architect to add a second floor of offices. Under B101–2017, which two steps should the architect take? Check the two that apply.",
  opts: ["Proceed with the redesign and bill it at the end of the phase", "Notify the owner promptly that this is an Additional Service, with its effect on fee and schedule", "Absorb the change because the owner approved the fee", "Wait for the owner's written authorization before proceeding with the redesign", "Ask the contractor to price the change first", "Treat it as a minor change under A201 §7.4"],
  ans: [1, 3], why: ["Billing without notice and authorization invites a fee dispute.", "Correct. §4.2.1: notify with reasonable promptness and explain the facts and circumstances.", "A change to previous approvals is an Additional Service, not part of the base fee.", "Correct. §4.2.1: do not proceed until written authorization.", "There may be no contractor yet, and pricing does not authorize design work.", "A201 governs construction changes, not the architect's services."],
  explain: "A change to work the owner already approved is an Additional Service under B101 §4.2.1.1. The architect notifies the owner promptly and does not proceed until it receives written authorization.", ref: "AIA B101–2017, §4.2.1" });

Q({ id: "q-ppd-n03", div: "ppd", obj: "ppd-4.1", lesson: "ppd-envelope", type: "ms", diff: 2, fmt: "Check all that apply", pick: 3,
  q: "An office in a hot, sunny climate has large west-facing windows that overheat the space every afternoon. Which three changes would most reduce the cooling load? Check the three that apply.",
  opts: ["Exterior vertical fins or exterior operable shades", "Glass with a higher solar heat gain coefficient (SHGC)", "Glass with a lower SHGC", "Reduce the west glazing area", "A dark-colored façade around the windows", "Enlarge the windows to improve daylight"],
  ans: [0, 2, 3], why: ["Correct. Low western sun is blocked best by vertical or exterior adjustable shading.", "Higher SHGC lets in more solar heat.", "Correct.", "Correct. Less west glass means less low-angle solar gain.", "Dark surfaces absorb more heat.", "More glass adds solar gain."],
  explain: "West sun is low in the afternoon, so horizontal overhangs do little. Block it outside the glass, choose low-SHGC glazing, and limit west glass area.", ref: "Brown & DeKay, Sun, Wind & Light" });

Q({ id: "q-pdd-n03", div: "pdd", obj: "pdd-4.1", lesson: "pdd-firerated", type: "ms", diff: 3, fmt: "Check all that apply", pick: 2,
  q: "A 2-hour shaft enclosure in a four-story building has a door opening and a supply duct penetration. Under the 2021 IBC, which two are generally required? Check the two that apply.",
  opts: ["A 20-minute door assembly", "A 1½-hour fire door assembly", "A 3-hour fire door assembly", "Fire and smoke dampers where the duct penetrates the shaft, unless an exception applies", "No damper, because the duct is galvanized steel", "A smoke partition instead of a fire barrier"],
  ans: [1, 3], why: ["20-minute doors are for corridors and smoke barriers.", "Correct. Table 716.1(2): 2-hour shaft enclosures need 1½-hour doors.", "3-hour doors protect 4-hour walls such as some fire walls.", "Correct. §717.5.3 generally requires fire and smoke dampers at shaft penetrations.", "Duct material does not remove the damper requirement.", "Shafts connecting four or more stories need a 2-hour fire barrier."],
  explain: "Shafts connecting four or more stories need 2-hour enclosures (§713.4). Openings get 1½-hour doors, and duct penetrations generally need fire and smoke dampers unless an exception in §717.5.3 applies.", ref: "2021 IBC §713.4, Table 716.1(2) and §717.5.3" });

Q({ id: "q-pcm-n01", div: "pcm", obj: "pcm-1.4", lesson: "pcm-ethics", type: "ms", diff: 3, fmt: "Check all that apply", pick: 2,
  q: "The owner insists on deleting the required second exit from a mezzanine to save space, against your advice. Which two responses are appropriate? Check the two that apply.",
  opts: ["Advise the owner in writing that the change would violate the building code and endanger occupants", "Make the change, since the owner makes the final design decisions", "Refuse to incorporate the code violation in your documents, even if it means ending the engagement", "Seal the drawings with a note disclaiming responsibility for the exit", "Let the building official catch it at plan review", "Ask the contractor to add the exit during construction"],
  ans: [0, 2], why: ["Correct. Document your advice clearly.", "Owners decide many things, but not to violate life-safety requirements.", "Correct. Licensing rules and the AIA Code put public safety ahead of the client's wishes.", "A disclaimer does not make sealing non-compliant work acceptable.", "Knowingly submitting a violation is a professional conduct issue.", "Shifting a known violation to construction does not fix it."],
  explain: "When a client's decision would endanger public safety, the architect advises against it in writing and does not incorporate it; boards' rules of conduct may also require notifying the building official.", ref: "NCARB Model Rules of Conduct; AIA Code of Ethics and Professional Conduct" });

Q({ id: "q-ce-n02", div: "ce", obj: "ce-4.1", lesson: "ce-payment", type: "ms", diff: 2, fmt: "Check all that apply", pick: 2,
  q: "The contractor tells you the work is substantially complete and asks for an inspection. Under A201–2017 §9.8, which two statements are correct? Check the two that apply.",
  opts: ["The contractor prepares and submits a comprehensive list of items to be completed or corrected", "The architect prepares the punch list from scratch before the contractor does anything", "If the inspection shows the work is not substantially complete, the contractor completes more work and asks for another inspection", "Final payment is due when the Certificate of Substantial Completion is issued", "Consent of surety for final payment must be received first", "Warranties begin at final completion in all cases"],
  ans: [0, 2], why: ["Correct. §9.8.2.", "The contractor's list comes first; the architect inspects and may add items.", "Correct. §9.8.3.", "Final payment follows final completion (§9.10).", "Consent of surety is a final-payment requirement.", "Warranties generally start at substantial completion unless the documents say otherwise (§9.8.4)."],
  explain: "Substantial completion: the contractor submits its list, the architect inspects, more work if needed, then the Certificate of Substantial Completion sets responsibilities and starts warranties.", ref: "AIA A201–2017, §9.8.2–§9.8.4" });
})();
