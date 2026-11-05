/* Round 2 dedicated lessons (v10). Original explanations; AIA sections checked against the user's 2017 copies.
   Code references are to the 2021 International Building Code unless stated. */

ARE.LESSONS.push({
  id: "pcm-ethics", div: "pcm", obj: ["pcm-1.2", "pcm-1.3", "pcm-1.4"], title: "Ethics, Licensure & Professional Conduct",
  minutes: 30, level: "Core",
  summary: "Who regulates architects, what the AIA Code of Ethics and NCARB's model rules require, and how to resolve the ethical situations the exam likes to test.",
  objectives: [
    "Distinguish licensing law (state boards) from professional ethics (AIA Code) and model rules (NCARB).",
    "Apply the main obligations of the AIA Code of Ethics to practice situations.",
    "Explain sealing, responsible control and practice across jurisdictions.",
    "Choose the ethical course when duties to the public, client and firm conflict."
  ],
  why: "Licensure exists to protect the public's health, safety and welfare. Ethics items test whether you put that duty first when a client, employer or schedule pushes the other way.",
  exam: "Scenario items: a client asks for something improper, an employee leaves with drawings, a conflict of interest appears, or an architect is asked to seal work. Choose the response that protects the public and stays honest.",
  body: `
<h3>Three layers of rules</h3>
<table class="tbl"><thead><tr><th>Source</th><th>Who it binds</th><th>Enforced by</th></tr></thead><tbody>
<tr><td>State registration law and board rules</td><td>Every licensed architect in that jurisdiction</td><td>The state licensing board: discipline, fines, revocation</td></tr>
<tr><td>NCARB Model Rules of Conduct</td><td>Adopted in whole or part by many boards</td><td>The boards that adopt them</td></tr>
<tr><td>AIA Code of Ethics and Professional Conduct</td><td>AIA members only</td><td>AIA National Ethics Council</td></tr>
</tbody></table>
<p>Licensing law is the legal minimum. The AIA Code is voluntary for non-members but sets the professional benchmark the exam uses.</p>

<h3>The AIA Code's obligations</h3>
<p>The Code is organized as Canons, each with Ethical Standards (goals) and enforceable Rules: general obligations (knowledge, skill, respect for law), obligations to the public, to the client, to the profession, to colleagues, and to the environment. Themes the exam returns to:</p>
<ul>
<li><strong>Public first.</strong> If a client insists on a decision that violates the code and endangers occupants, the architect refuses, and if overruled, reports to the building official.</li>
<li><strong>Honesty.</strong> Do not misrepresent qualifications, credit for work, or what a certificate says. Sign only what you know to be true.</li>
<li><strong>Conflicts of interest.</strong> Disclose them in writing; do not accept compensation from contractors or suppliers on the same project without full disclosure and consent.</li>
<li><strong>Colleagues.</strong> Credit others' work, respect intellectual property, and do not attempt to supplant another architect who is under contract.</li>
</ul>

<h3>Sealing and responsible control</h3>
<p>An architect may seal only documents prepared under their <strong>responsible control</strong>: the level of control and personal supervision that the jurisdiction requires. Sealing work prepared by others without that control ("plan stamping") is a violation. Licensure is by jurisdiction: an architect licensed elsewhere must obtain a license where the project is located before practicing or sealing there. The NCARB Certificate eases reciprocal licensing but is not itself a license.</p>

<h3>Standard of care in ethical terms</h3>
<p>The legal duty is ordinary professional skill and care, not perfection (AIA B101–2017 §2.2). Ethically, the architect also practices only within their competence: take on unfamiliar project types only with the right consultants or experience on the team.</p>
`,
  diagram: "",
  formulas: [],
  example: { title: "Applying it", html: `<p>During CDs, the owner asks the architect to remove the second exit stair to save money, saying the building official "won't notice." The architect explains the code requirement and the life-safety risk in writing. If the owner still directs the change, the architect refuses to issue noncompliant documents. Withdrawing from the project and informing the building official are the next steps if the owner proceeds anyway. Protecting the public outranks the client relationship.</p>` },
  mistakes: [
    "Treating the AIA Code as law. It binds members; state law binds licensees.",
    "Thinking an NCARB Certificate lets you practice in any state.",
    "Sealing a consultant's or a former employee's drawings you did not control.",
    "Keeping a conflict of interest quiet because it seems small. Disclose in writing."
  ],
  scenario: { prompt: "A product rep offers the project architect a free trip if their cladding is specified as the sole source. What should the architect do?",
    answer: "Decline. Accepting a gift tied to a specification decision is an undisclosed conflict of interest that compromises the duty to the client. Specify on merit, and if the firm has a relationship with the manufacturer, disclose it to the owner in writing." },
  canada: "In Ontario, practice is regulated by the Ontario Association of Architects under the Architects Act and Regulation 27. Canadian licensing follows the Canadian Experience Record Book and the ExAC exam. NCARB and the Canadian licensing authorities have a mutual recognition agreement for experienced architects.",
  refs: [
    { t: "AIA Code of Ethics and Professional Conduct", a: "Free (aia.org)" },
    { t: "NCARB Model Rules of Conduct and Legislative Guidelines", a: "Free (ncarb.org)" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — ethics and professional conduct", a: "Purchase" }
  ],
  check: ["q-pcm-y01", "q-pcm-y02", "q-pcm-y03"]
});

ARE.LESSONS.push({
  id: "pjm-changes", div: "pjm", obj: ["pjm-3.1", "pjm-4.2", "pjm-4.4"], title: "Scope Changes, Additional Services & Approvals",
  minutes: 30, level: "Core",
  summary: "How B101–2017 handles services beyond the basic scope, how to manage scope creep before it eats the fee, and the architect's duties with authorities having jurisdiction.",
  objectives: [
    "Distinguish Basic, Supplemental and Additional Services under B101–2017.",
    "Apply the notice-and-authorization steps in B101 §4.2.1 and §4.2.2.",
    "Track and communicate cumulative scope changes.",
    "Describe the architect's duties with governmental authorities and utilities."
  ],
  why: "Scope creep is the most common reason projects lose money. The contract gives the architect a process; the exam tests whether you follow it.",
  exam: "Expect scenarios where the owner asks for a change, an agency adds a requirement, or the project runs long. Pick the response that gives notice, explains the impact and gets authorization before work proceeds.",
  body: `
<h3>Three kinds of services</h3>
<ul>
<li><strong>Basic Services</strong> (B101 Article 3): the phases from schematic design through construction, including the usual structural, mechanical and electrical engineering.</li>
<li><strong>Supplemental Services</strong> (§4.1): extra services chosen when the agreement is signed, such as programming, LEED certification or a detailed cost estimate, listed with who provides them.</li>
<li><strong>Additional Services</strong> (§4.2): services that arise during the project because circumstances change.</li>
</ul>

<h3>The Additional Services process</h3>
<p>Under <strong>§4.2.1</strong>, when the architect recognizes the need for certain Additional Services, it notifies the owner promptly and explains the facts. It does <strong>not proceed</strong> until the owner gives written authorization. Triggers include changes to the owner's information, instructions or approvals, or a material change in size, quality, complexity, schedule, budget or delivery method; new or revised codes and laws; certain changed official code interpretations; late owner decisions or other failures by the owner or its consultants; owner-requested alternate bids; public hearings; and assisting an IDM other than the architect.</p>
<p>Under <strong>§4.2.2</strong>, some construction-phase services are provided immediately to avoid delay: out-of-sequence submittals, RFIs the contractor could have answered from the documents, change orders and CCDs that need evaluation or revised drawings, an extensive number of claims, and substitutions. The architect notifies the owner, who can stop further work in writing, and pays for services already provided.</p>
<p><strong>§4.2.3</strong> sets limits on construction-phase effort (the number of submittal reviews, site visits and inspections). Effort beyond those limits is an Additional Service. <strong>§4.2.5</strong> compensates services that run past the agreed duration through no fault of the architect.</p>

<h3>Managing scope creep</h3>
<p>Keep a change log from day one. Record each request, who made it, the effect on hours, fee and schedule, and the owner's decision. Report the cumulative effect at each phase review. Small requests are rarely the problem alone; their sum is.</p>

<h3>Authorities having jurisdiction</h3>
<p>B101 <strong>§3.1.5</strong> requires the architect to contact the governmental authorities that must approve the construction documents and the utility providers, and to respond to their design requirements. Under <strong>§3.1.6</strong>, the architect assists the owner with the filings the owner is responsible for. Meet early with the building official, fire marshal and planning staff; record their interpretations in writing.</p>
`,
  diagram: "",
  formulas: [
    { name: "Fee consumed", f: "% consumed = Hours spent × rate ÷ phase fee" },
    { name: "Change impact", f: "Added fee = Added hours × blended rate" }
  ],
  example: { title: "Applying it", html: `<p>After DD approval, the owner adds a second-floor training room. The architect sends a short notice: the change, why it is outside the approved design, an estimate of 60 added hours ($7,800 at $130/h), a two-week schedule effect, and a request for written authorization. Work on the change starts once the owner signs. The change log shows the owner the running total of approved changes at each meeting.</p>` },
  mistakes: [
    "Starting a §4.2.1 Additional Service before the owner authorizes it in writing.",
    "Calling a Supplemental Service an Additional Service. Supplemental services are chosen at signing.",
    "Absorbing many small changes, then surprising the owner with one large bill.",
    "Relying on a verbal code interpretation from a plans examiner."
  ],
  scenario: { prompt: "The city adopts a new energy code after the architect finishes DD. The owner wants the building permitted under the new code. Is the redesign an Additional Service?",
    answer: "Yes. B101 §4.2.1 includes services needed because of changes in laws or codes after the design is prepared. The architect notifies the owner, explains the effect on fee and schedule, and proceeds once the owner authorizes it in writing." },
  refs: [
    { t: "AIA B101–2017, §3.1.5, §3.1.6, §4.1, §4.2.1–§4.2.5", a: "Your copy" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — project management and owner-architect agreements", a: "Purchase" }
  ],
  check: ["q-pjm-y01", "q-pjm-y02", "q-pjm-y03"]
});

ARE.LESSONS.push({
  id: "ce-claims", div: "ce", obj: ["ce-2.1", "ce-3.4"], title: "Claims, Disputes & the Initial Decision Maker",
  minutes: 30, level: "Core",
  summary: "How A201–2017 Article 15 handles claims: notice deadlines, the Initial Decision Maker, mediation and binding dispute resolution.",
  objectives: [
    "Define a Claim and apply the 21-day notice requirement.",
    "Describe the Initial Decision Maker's role and timeline.",
    "Sequence initial decision, mediation and binding dispute resolution.",
    "Explain continuing performance and the waiver of consequential damages."
  ],
  why: "Construction disputes are expensive. A201 sets a strict process so they are raised early and decided by a neutral first reviewer. The architect is usually that reviewer.",
  exam: "Expect sequencing items (what happens next?), deadline items (21 days, 10 days) and role items (who decides? must the contractor keep working?).",
  body: `
<h3>What a Claim is</h3>
<p>A Claim is a demand by the owner or contractor seeking, as a matter of right, payment, an extension of time or other relief under the contract. Claims are between owner and contractor; the architect is not a party to their agreement.</p>

<h3>Notice and deadlines</h3>
<ul>
<li>Claims are initiated by written notice to the other party and to the Initial Decision Maker <strong>within 21 days</strong> after the event, or after the claimant first recognizes the condition (§15.1.3.1).</li>
<li>All claims must be commenced within the period set by law, and <strong>in any case not more than 10 years</strong> after substantial completion (§15.1.2).</li>
<li>Weather-delay claims need data showing conditions were abnormal for the period and could not have been anticipated (§15.1.6.2).</li>
</ul>

<h3>The Initial Decision Maker (IDM)</h3>
<p>The IDM is named in the owner–contractor agreement; <strong>the architect serves as IDM unless another person is named</strong> (§15.2.1). The IDM must not show partiality (§1.1.8). <strong>Within 10 days</strong> of receiving a Claim, the IDM requests more data, rejects, approves, suggests a compromise, or advises that it cannot resolve the claim (§15.2.2). The initial decision is in writing, states reasons, and is final and binding unless a party pursues mediation and binding dispute resolution (§15.2.5).</p>

<h3>After the initial decision</h3>
<ol>
<li><strong>Mediation</strong> is a condition precedent to binding dispute resolution (§15.3.1).</li>
<li><strong>Binding dispute resolution</strong> is arbitration if the agreement selects it (§15.4.1); otherwise, litigation.</li>
</ol>
<p>While a claim is pending, the contractor keeps working and the owner keeps paying amounts not in dispute (§15.1.4). The owner and contractor waive consequential damages against each other, such as lost profits and loss of use (§15.1.7).</p>
`,
  diagram: `<svg viewBox="0 0 560 140" role="img" aria-label="Claim sequence: event, notice within 21 days, initial decision maker acts within 10 days, initial decision, mediation, then arbitration or litigation"><g class="dg-text" font-size="11">
<rect x="8" y="40" width="84" height="56" class="dg-soft"/><text x="50" y="64" text-anchor="middle">Event</text><text x="50" y="80" text-anchor="middle">occurs</text>
<rect x="116" y="40" width="96" height="56" class="dg-soft"/><text x="164" y="64" text-anchor="middle">Notice</text><text x="164" y="80" text-anchor="middle">≤ 21 days</text>
<rect x="236" y="40" width="96" height="56" class="dg-accent2"/><text x="284" y="64" text-anchor="middle">IDM acts</text><text x="284" y="80" text-anchor="middle">≤ 10 days</text>
<rect x="356" y="40" width="84" height="56" class="dg-soft"/><text x="398" y="64" text-anchor="middle">Mediation</text><text x="398" y="80" text-anchor="middle">required</text>
<rect x="464" y="40" width="88" height="56" class="dg-soft"/><text x="508" y="60" text-anchor="middle">Arbitration</text><text x="508" y="76" text-anchor="middle">or</text><text x="508" y="90" text-anchor="middle">litigation</text>
<path d="M92 68h22M212 68h22M332 68h22M440 68h22" class="dg-line"/>
<text x="280" y="124" text-anchor="middle">Work continues and undisputed payments continue throughout (§15.1.4)</text></g></svg>`,
  formulas: [],
  example: { title: "Applying it", html: `<p>On day 1 the contractor hits unexpected rock. On day 15 it sends written notice to the owner and the architect (the IDM) with a claim for $48,000 and 8 days. On day 22 the architect, acting within 10 days of receipt, requests the rock-removal logs. After review, the architect issues a written decision approving $41,000 and 6 days, with reasons. The owner disagrees and files for mediation. The contractor keeps working and is paid for undisputed work in the meantime.</p>` },
  mistakes: [
    "Letting the contractor stop work while a claim is pending.",
    "Skipping mediation and going straight to arbitration.",
    "Assuming the owner decides claims. The IDM does, and it is the architect unless another is named.",
    "Missing the 21-day notice window."
  ],
  scenario: { prompt: "The owner asks the architect, as IDM, to reject a contractor's valid delay claim to protect the budget. What should the architect do?",
    answer: "Decide the claim impartially on its merits. A201 §1.1.8 requires the IDM not to show partiality to either party. Explain to the owner that a biased decision would breach that duty and is likely to be overturned in mediation or arbitration anyway." },
  refs: [
    { t: "AIA A201–2017, §1.1.8 and Article 15 (§15.1.2, §15.1.3.1, §15.1.4, §15.1.6.2, §15.1.7, §15.2, §15.3.1, §15.4.1)", a: "Your copy" },
    { t: "AIA, The Architect's Handbook of Professional Practice, 15th ed. — construction contract administration and dispute resolution", a: "Purchase" }
  ],
  check: ["q-ce-y01", "q-ce-y02", "q-ce-y03"]
});

Object.assign(ARE.TAKEAWAYS || (ARE.TAKEAWAYS = {}), {
  "pcm-ethics": ["State boards license; the AIA Code binds members.", "Public safety outranks the client.", "Seal only work under your responsible control.", "License where the project is; NCARB certification helps but is not a license.", "Disclose conflicts in writing."],
  "pjm-changes": ["Basic = Article 3; Supplemental = chosen at signing; Additional = arise later.", "§4.2.1: notify, explain, wait for written authorization.", "§4.2.2: provide to avoid delay, notify the owner.", "Code changes after design are Additional Services.", "Keep a change log and report the running total."],
  "ce-claims": ["Notice within 21 days.", "IDM = architect unless named otherwise; acts within 10 days.", "Mediation before arbitration or litigation.", "Work and undisputed payments continue.", "Consequential damages are mutually waived.", "Claims close 10 years after substantial completion at most."]
});
