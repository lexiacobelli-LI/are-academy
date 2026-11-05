/* Round 5 dedicated lessons (v13). AIA sections checked against the user's 2017 copies. */

ARE.LESSONS.push({
  id: "ce-payapps", div: "ce", obj: ["ce-3.3", "ce-2.3", "ce-4.1"], title: "Applications for Payment, Retainage & Final Payment",
  minutes: 30, level: "Core",
  summary: "The payment cycle under A201–2017, step by step: schedule of values, application, the architect's certificate, withholding, retainage, failure of payment and final payment.",
  objectives: [
    "Follow the payment timeline and who does what at each step.",
    "Calculate the amount due on a G702/G703 application.",
    "Decide when the architect may withhold certification.",
    "Explain what final payment requires and what it waives."
  ],
  why: "Payment is where the architect's judgment has direct financial effect on both owner and contractor. CE tests it with both calculations and process questions.",
  exam: "Expect a G702-style calculation, timeline questions (7 days, 10 days) and scenarios about stored materials, withholding and final payment.",
  body: `
<h3>The cycle</h3>
<ol>
<li>Before the first application, the contractor submits a <strong>schedule of values</strong> allocating the contract sum to parts of the work (§9.2).</li>
<li>At least <strong>10 days</strong> before each payment date, the contractor submits an itemized <strong>application for payment</strong> (§9.3.1), usually AIA G702 with G703 continuation sheets.</li>
<li>Within <strong>7 days</strong> of receipt, the architect issues a <strong>certificate for payment</strong> for the full amount, or for the amount it determines is due and notifies the owner and contractor why, or withholds and gives reasons (§9.4.1).</li>
<li>The owner pays within the time in the contract documents (§9.6.1). The contractor pays subcontractors within <strong>7 days</strong> of receiving payment (§9.6.2).</li>
</ol>

<h3>What the certificate means</h3>
<p>The architect's certification represents that, to the best of its knowledge from site observations and the application, the work has progressed as indicated and its quality conforms to the documents (§9.4.2). It does not mean the architect inspected everything, checked means and methods, or confirmed how the contractor used earlier payments.</p>

<h3>Withholding (§9.5.1)</h3>
<p>Grounds include defective work not remedied, third-party claims, failure to pay subcontractors or suppliers, evidence the work cannot be completed for the unpaid balance, damage to the owner or a separate contractor, evidence the work will not be finished on time, and repeated failure to follow the documents. A party that disputes the decision may file a claim (§9.5.2).</p>

<h3>Stored materials</h3>
<p>Payment normally covers materials delivered and suitably stored at the site. Materials stored off site need the owner's advance approval, plus evidence of title, insurance and protection (§9.3.2).</p>

<h3>Failure of payment (§9.7)</h3>
<p>If the architect does not certify within 7 days through no fault of the contractor, or the owner does not pay within 7 days after the payment date, the contractor may stop work after <strong>7 more days' notice</strong>.</p>

<h3>Final payment (§9.10)</h3>
<p>Before final payment the contractor submits affidavits that bills are paid, a certificate that insurance stays in force, a statement about warranties, consent of surety, and other required data such as lien releases (§9.10.2). Making final payment waives the owner's claims except unsettled liens and claims, failure of the work to comply with the documents, special warranty terms, and permitted post-payment audits (§9.10.4). Accepting final payment waives the contractor's claims except those already made in writing and unsettled (§9.10.5).</p>
`,
  diagram: "",
  formulas: [
    { name: "Earned to date", f: "Completed work + stored materials" },
    { name: "Amount due", f: "Due = earned to date − retainage − previous certificates" }
  ],
  example: { title: "Applying it", html: `<p>Application No. 6: completed work $2,910,000 (G703 total). The contractor also lists $85,000 of overhead doors stored 15 miles away, with no prior approval, insurance certificate or bill of sale. The architect excludes them under §9.3.2. Earned = $2,910,000; 10% retainage = $291,000; less previous certificates of $2,250,000 = <strong>$369,000</strong> due. The architect certifies that amount within seven days and notifies both parties in writing why the stored materials were excluded.</p>` },
  mistakes: [
    "Certifying off-site stored materials without the owner's approval and proof of title and insurance.",
    "Forgetting to subtract previous certificates.",
    "Thinking the architect's certificate confirms every item was inspected.",
    "Assuming the owner keeps all claims after final payment."
  ],
  scenario: { prompt: "A roofing subcontractor writes that it has not been paid for the last two applications. What can the architect do on the next application?",
    answer: "Withhold certification in an amount needed to protect the owner, because failure to pay subcontractors is a ground under §9.5.1.3. The architect notifies the contractor and owner of the reasons. The owner may then issue joint checks to the contractor and the unpaid subcontractor (§9.5.4)." },
  refs: [
    { t: "AIA A201–2017, Article 9 (§9.2, §9.3.1, §9.3.2, §9.4.1, §9.4.2, §9.5.1–§9.5.4, §9.6, §9.7, §9.10)", a: "Your copy" },
    { t: "AIA G702 and G703", a: "Purchase (aiacontracts.com)" }
  ],
  check: ["q-ce-v01", "q-ce-v02", "q-ce-v03"]
});

ARE.LESSONS.push({
  id: "pdd-mepsizing", div: "pdd", obj: ["pdd-1.2", "pdd-1.4", "pdd-1.6"], title: "Sizing MEP Systems: Rules of Thumb & Calculations",
  minutes: 35, level: "Core",
  summary: "The calculations the architect uses to reserve space and check consultants' work: cooling tons, airflow, duct size, plumbing fixtures, lighting and electrical rooms.",
  objectives: [
    "Estimate cooling capacity and airflow from area and air changes.",
    "Size a duct from airflow and velocity.",
    "Count plumbing fixtures from occupant load and given ratios.",
    "Use the lumen method and space rules of thumb for electrical rooms."
  ],
  why: "Architects don't engineer MEP systems, but they must reserve shafts, plenums and rooms early and spot numbers that don't make sense.",
  exam: "PDD calculation items give the formula or ratios in the item or case. Know how to set up the arithmetic and units.",
  body: `
<h3>Cooling and airflow</h3>
<ul>
<li>Rule of thumb for offices: roughly <strong>1 ton of cooling per 300–400 sf</strong>, depending on climate, glazing and loads. 1 ton = 12,000 Btu/h.</li>
<li>Airflow from air changes: <strong>cfm = volume (cf) × ACH ÷ 60</strong>.</li>
<li>Supply air is roughly 400 cfm per ton for typical systems.</li>
</ul>

<h3>Duct size</h3>
<p>Area (sf) = airflow (cfm) ÷ velocity (fpm). At 1,000 cfm and 800 fpm, the duct needs 1.25 sf of cross-section, about 12 in × 15 in. Lower velocities are quieter but need larger ducts.</p>

<h3>Plumbing fixtures</h3>
<p>Fixture counts come from the plumbing code table for the occupancy (IPC Table 403.1 in many U.S. jurisdictions). Divide the occupant load by sex as the code directs, apply the ratios in steps (for example 1 per 25 for the first 50, then 1 per 50), and <strong>round up</strong>. Accessible fixtures are part of the total, not in addition.</p>

<h3>Lighting</h3>
<p>Lumen method: <strong>N = (E × A) ÷ (lumens per fixture × CU × LLF)</strong>, where E is target foot-candles and A is area in sf. Round up. Typical targets: offices around 30–50 fc, corridors lower.</p>

<h3>Electrical and support spaces</h3>
<p>Reserve the main electrical room near the utility entrance with working clearances in front of equipment (NEC §110.26) and space to replace equipment. Provide electrical and data closets stacked on each floor, sized and placed so branch circuits and data cable stay within practical lengths.</p>
`,
  diagram: "",
  formulas: [
    { name: "Air changes", f: "cfm = volume × ACH ÷ 60" },
    { name: "Duct area", f: "Area (sf) = cfm ÷ velocity (fpm)" },
    { name: "Cooling", f: "Tons = Btu/h ÷ 12,000" },
    { name: "Lumen method", f: "N = (E × A) ÷ (lumens × CU × LLF)" }
  ],
  example: { title: "Applying it", html: `<p>A 12,000 sf office floor at about 1 ton per 350 sf needs roughly 34 tons, so about 13,700 cfm of supply air at 400 cfm/ton. With a main duct at 1,200 fpm, the trunk needs about 11.4 sf of cross-section, for example two 36 in × 24 in ducts. The architect uses this to reserve a 30 in plenum and a shaft before the mechanical engineer's design is complete, then checks the engineer's final sizes against it.</p>` },
  mistakes: [
    "Forgetting to divide by 60 when converting air changes per hour to cfm.",
    "Rounding fixture counts down.",
    "Adding accessible fixtures on top of the required count.",
    "Mixing up velocity (fpm) and airflow (cfm)."
  ],
  scenario: { prompt: "The mechanical engineer shows a 10 in round duct carrying 2,000 cfm. Does that seem reasonable?",
    answer: "No. A 10 in round duct has about 0.55 sf of area, so 2,000 cfm would move at about 3,600 fpm, far above typical velocities for occupied buildings and very noisy. Ask the engineer to confirm. Around 16–18 in round would be more typical." },
  refs: [
    { t: "International Plumbing Code, Table 403.1 (as adopted)", a: "Free to read (codes.iccsafe.org)" },
    { t: "NFPA 70 (National Electrical Code), §110.26", a: "Free to read (nfpa.org)" },
    { t: "ASHRAE Fundamentals Handbook; IES Lighting Handbook", a: "Purchase" }
  ],
  check: ["q-pdd-v01", "q-pdd-v02", "q-pdd-v03"]
});

Object.assign(ARE.TAKEAWAYS || (ARE.TAKEAWAYS = {}), {
  "ce-payapps": ["Application 10 days before the payment date.", "Architect certifies within 7 days.", "Due = earned − retainage − previous.", "Off-site storage needs approval, title and insurance.", "Contractor may stop work after 7 more days' notice of nonpayment.", "Final payment waives most claims."],
  "pdd-mepsizing": ["cfm = volume × ACH ÷ 60.", "Duct area = cfm ÷ fpm.", "About 1 ton per 300–400 sf (offices).", "Round fixture counts up.", "N = E × A ÷ (lumens × CU × LLF).", "Reserve shafts and plenums early."]
});
