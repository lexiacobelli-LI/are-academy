/* ============================================================
   SOURCES FROM THE USER'S GOOGLE DRIVE "ARE Prep" FOLDER
   - Handbook TOC: transcribed from the contents page of the user's
     AHPP 15th ed. PDF (section numbers, titles, start pages).
   - Objective crosswalk: Wiley "Navigating the ARE (5.0) with AHPP
     15th Ed." PDFs (PcM, PjM, PA, PPD, PDD, CE), re-keyed from the
     2017 objective wording to the October 2026 objectives.
   - AIA documents: sample PDFs in the folder; section references
     marked "verified" were checked against those samples.
   ============================================================ */
const DRIVE = "https://drive.google.com/file/d/";

ARE.HANDBOOK.toc = [
  { part: "Part 1 · The Profession", p: 1, ch: [
    [1, "Ethics and Professional Practice", 2, [["1.1", "The AIA Code of Ethics and Professional Conduct", 2], ["1.2", "Ethics and Architectural Practice", 13], ["1.3", "Design Beyond Ethics", 19]]],
    [2, "Diversity and Demographics", 27, [["2.1", "Diversity and Practice Management", 27], ["2.2", "Demographics of Practice: 2012 AIA Firm Survey", 36]]],
    [3, "Career Development", 52, [["3.1", "Regulation of Professional Practice", 52], ["3.2", "Intern Development", 68], ["3.3", "The Career Paths of an Architect", 82], ["3.4", "AIA Continuing Education System", 93], ["3.5", "Participating in Professional Organizations", 99], ["3.6", "Participating in Architectural Education", 113]]],
    [4, "Public Interest Design", 117, [["4.1", "Socially Responsible Design Overview", 117], ["4.2", "The Role of Architects in Disaster Response and Recovery", 131], ["4.3", "Architects in the Nonprofit Sector", 147], ["4.4", "Public Service and Community Involvement", 156]]]
  ]},
  { part: "Part 2 · Firm Management", p: 167, ch: [
    [5, "Organizational Development", 168, [["5.1", "Architects and the Law", 168], ["5.2", "Entrepreneurial Practice: Starting an Architecture Firm", 185], ["5.3", "Strategic Planning for the Design Firm", 203], ["5.4", "Firm Growth and Development: How to Build a Creative Culture", 216], ["5.5", "Leader Effectiveness", 227], ["5.6", "Ownership Transitions", 237], ["5.7", "Small-Firm Collaboration", 252], ["5.8", "Practicing in a Global Market", 262], ["5.9", "Developing and Managing Multiple-Office Firms", 275], ["5.10", "Office Administration", 291], ["5.11", "Knowledge Management", 308], ["5.12", "Information Management and Services", 321]]],
    [6, "Marketing and Business Development", 332, [["6.1", "Marketing Architectural Services", 332], ["6.2", "Developing Marketing Strategy", 342], ["6.3", "Public Relations and Communications", 355], ["6.4", "Networking and Business Development", 370], ["6.5", "Qualifications, Proposals, and Interviews", 381]]],
    [7, "Financial Management", 396, [["7.1", "Navigating Economic Cycles", 396], ["7.2", "Financial Management Overview", 409], ["7.3", "Financial Management Systems", 418], ["7.4", "Developing Annual Budgets and Profit Planning", 428]]],
    [8, "Human Resources", 444, [["8.1", "Human Resources Management Overview", 444], ["8.2", "Compensation Strategy and Philosophy", 461], ["8.3", "Recruiting and Hiring: Strategies and Methodology", 475], ["8.4", "Professional Development and Mentoring", 487]]]
  ]},
  { part: "Part 3 · Project Delivery", p: 507, ch: [
    [9, "Design Project Delivery", 508, [["9.1", "Project Delivery Methods", 508], ["9.2", "The Architect's Role in Construction Manager-Constructor Project Delivery", 520], ["9.3", "Integrated Project Delivery Overview", 530], ["9.4", "Contractor-Led Design-Build", 541], ["9.5", "Architect-Led Design-Build", 555], ["9.6", "Architect Developer", 563], ["9.7", "Emerging Issues in Project Delivery", 577]]],
    [10, "Design Project Management", 584, [["10.1", "Managing Architectural Projects", 584], ["10.2", "Project Teams", 603], ["10.3", "Project Budgets, Work Planning, and Monitoring", 621], ["10.4", "Project Management with Building Information Modeling Processes", 641], ["10.5", "Design Phases", 654], ["10.6", "Construction Drawings", 668], ["10.7", "Construction Specifications", 689], ["10.8", "Bidding and Negotiation", 701], ["10.9", "Construction Phase Services", 713], ["10.10", "Project Completion and Post-Construction", 729]]],
    [11, "Technology in Practice", 740, [["11.1", "Technology in Practice Overview", 740], ["11.2", "Technology in Project Delivery Phases", 754], ["11.3", "Small Firms, Small Projects, and Building Information Modeling", 764], ["11.4", "Collaborative Technologies", 780], ["11.5", "Technology Management", 785], ["11.6", "Emerging Technology in Practice", 798]]],
    [12, "Quality Management", 810, [["12.1", "Origins and Development of Quality Management", 810], ["12.2", "Quality Management in Schematic Design", 822], ["12.3", "Checklists", 833], ["12.4", "Quality Management in Construction Procurement, Contract Administration, and Post-Construction", 847]]],
    [13, "Building Codes, Standards, and Regulations", 857, [["13.1", "Building Codes and Standards", 857], ["13.2", "Planning, Urban Design, and the Regulatory Environment", 880]]],
    [14, "Research in Practice", 899, [["14.1", "Research in Practice Overview", 899], ["14.2", "Research Methods", 911], ["14.3", "Research and Practice", 920], ["14.4", "Evidence-Based Design", 937]]]
  ]},
  { part: "Part 4 · Contracts and Agreements", p: 951, ch: [
    [15, "Project Definition", 952, [["15.1", "Defining Project Services", 952], ["15.2", "Services and Compensation", 961], ["15.3", "Negotiating Agreement", 975]]],
    [16, "Risk Management", 989, [["16.1", "Risk Management Strategies", 989], ["16.2", "Insurance Coverage for Business and Professional Liability", 1007], ["16.3", "Risks and Emerging Practices", 1021], ["16.4", "Dispute Management and Resolution", 1030]]],
    [17, "Agreements and AIA Document Program", 1040, [["17.1", "Agreements with Owners", 1040], ["17.2", "Project Team Agreements", 1055], ["17.3", "Owner-Generated Agreements", 1070], ["17.4", "Construction Contracts", 1083], ["17.5", "The AIA Documents Program", 1093]]]
  ]}
];
ARE.HANDBOOK.glossaryPage = 1117;
ARE.HANDBOOK.fileUrl = DRIVE + "1MTrrkwbdlSTUJAQ-0bl2TdUv_fTEfZXg/view";

/* Handbook sections per topic (from the verified contents page) */
const HB_SECTIONS = {
  "hb-ethics": ["1.1", "1.2", "1.3", "3.1"],
  "hb-firm-org": ["5.1", "5.2", "5.4", "5.6"],
  "hb-strategy": ["5.3", "7.4"],
  "hb-finance": ["7.2", "7.3", "7.4"],
  "hb-hr": ["8.1", "8.2", "8.3", "8.4"],
  "hb-risk": ["16.1", "16.2", "16.4"],
  "hb-marketing": ["6.1", "6.2", "6.4", "6.5"],
  "hb-agreements": ["15.1", "15.2", "15.3", "17.1"],
  "hb-delivery": ["9.1", "9.2", "9.3", "9.4", "9.5"],
  "hb-pm": ["10.1", "10.3"],
  "hb-team": ["10.2", "17.2", "5.7"],
  "hb-quality": ["12.1", "12.2", "12.3", "12.4"],
  "hb-predesign": ["10.5", "12.2"],
  "hb-regulatory": ["13.1", "13.2", "4.4"],
  "hb-design": ["10.5", "16.3", "14.4"],
  "hb-cd": ["10.6", "10.7"],
  "hb-procurement": ["10.8"],
  "hb-ca": ["10.9", "17.4"],
  "hb-closeout": ["10.10", "12.4"]
};
ARE.HB_SEC = {};
ARE.HANDBOOK.toc.forEach(pt => pt.ch.forEach(([n, t, p, secs]) => secs.forEach(([sn, st, sp]) => ARE.HB_SEC[sn] = { n: sn, t: st, p: sp, ch: n, chT: t })));
ARE.HANDBOOK.topics.forEach(t => { t.sections = (HB_SECTIONS[t.id] || []).filter(s => ARE.HB_SEC[s]); });

/* Objective-level references from the Wiley crosswalks: [section, page, topic] */
ARE.HB_OBJ = {
  "pcm-1.1": [["5.4", "220", "Firm organizational structure"], ["8.4", "498", "Appraisals and evaluations"], ["10.3", "622", "Project budgeting"]],
  "pcm-1.2": [["3.1", "52", "Basis for regulating the practice of architecture"], ["8.2", "464, 471", "Function of compensation; employee benefits"], ["9.5", "560", "Business issues: risk management and insurance"], ["16.2", "1008", "Insurance terminology"]],
  "pcm-1.3": [["1.1", "3–4", "History of the AIA Code of Ethics; the six canons"], ["5.1", "177, 180", "Claims avoidance; copyright law for architects"]],
  "pcm-1.4": [["1.2", "13", "Four ways to think about ethics"], ["1.3", "21", "Professional ethics"], ["5.1", "169", "Common claims against architects"], ["16.1", "990–992", "Negotiation and contracts; heightened standard of care"], ["16.3", "1026–1027", "BIM and the standard of care"], ["17.1", "1041–1043", "Basic terms of a contract; implied terms and the standard of care"]],
  "pcm-2.1": [["7.2", "409", "Financial management overview"], ["7.3", "422", "Financial reports"]],
  "pcm-2.2": [["16.1", "989, 995", "How the architect manages risk; making better agreements"], ["16.2", "1007, 1020", "Risks for architects; CGL case study"], ["16.4", "1033", "Mediation, arbitration and litigation"], ["17.1", "1044–1053", "Types of agreement; legal and risk considerations; modifying AIA forms"]],
  "pcm-2.3": [["5.1", "177–178", "Claims avoidance; project documentation"], ["15.1", "952", "Defining project services"], ["15.2", "961", "Services and compensation"], ["15.3", "975", "Negotiating agreement"]],
  "pcm-3.1": [["6.1", "332", "Proposal process (per crosswalk)"], ["6.5", "382", "Reading the RFP"], ["16.1", "995", "Making better agreements"], ["17.1", "1046–1049", "Nature and extent of the architect's undertaking"]],
  "pcm-3.2": [["5.1", "173", "Vicarious liability"], ["9.1", "513", "Methods of project delivery"], ["10.5", "661", "The contractual framework"], ["10.9", "726", "Changes in the work"], ["15.1", "958–960", "Managing changes in scope and services"], ["17.1", "1050", "The delivery method"]],
  "pcm-3.3": [["15.2", "961", "Basis of fees: value, effort and risk"], ["16.1", "1005", "Risk in design"]],
  "pcm-4.1": [["5.2", "187, 199", "Design firm business models; firm legal structures (Table 5.1)"], ["5.4", "220", "Firm organizational structure"], ["14.1", "903", "Evidence-based design"], ["14.4", "937", "Evidence-based design"]],
  "pcm-4.2": [["11.1", "745–749", "Technology values and documentation"], ["12.1", "811", "Quality management"]],
  "pjm-1.1": [["5.3", "212", "Developing the plan"], ["10.2", "603", "Project teams"], ["10.3", "621", "Tables 10.4–10.10: budgets and fee distributions"]],
  "pjm-1.2": [["10.1", "589", "Facilitating the project; Table 10.11 milestone chart"], ["10.3", "621", "Project budgets"], ["15.2", "964", "Types of services"]],
  "pjm-2.1": [["10.3", "621, 627", "Importance of work planning; the work planning process"]],
  "pjm-2.2": [["10.3", "632", "Scheduling"]],
  "pjm-2.3": [["5.7", "255–257", "Elements of collaboration; communication"], ["10.9", "717–719", "Preconstruction conference agenda; Table 10.15 action item report"]],
  "pjm-3.1": [["9.1", "510", "Figure 9.1 relationships of project participants"], ["17.1", "1040", "Agreements with owners"], ["17.5", "1093", "The AIA documents program"]],
  "pjm-3.2": [["17.2", "1055–1056", "Architect–consultant agreements"]],
  "pjm-3.3": [["17.4", "1085", "Parts of a construction contract; owner–contractor agreements"]],
  "pjm-3.4": [["17.2", "1059", "Owner-retained consultants"]],
  "pjm-4.1": [["10.1", "597–598", "Monitoring client objectives"], ["10.3", "634", "Monitoring"]],
  "pjm-4.2": [["5.1", "173", "Changes in scope of service"], ["10.9", "726", "Changes in the work"], ["15.1", "956–960", "Monitoring and managing changes in scope"]],
  "pjm-4.3": [["9.1", "512", "Figure 9.2 characteristics of delivery methods"], ["10.6", "673", "Methodologies in construction drawings"], ["10.10", "729", "Project completion"]],
  "pjm-4.4": [["4.4", "159", "Land use policy, zoning and building codes"], ["13.1", "868", "Code enforcement"], ["13.2", "886–891", "Government's role in planning; zoning"]],
  "pjm-5.1": [["1.1", "3", "Limits imposed by antitrust law"], ["16.3", "1021–1025", "Sustainable design; changes in regulations"]],
  "pjm-5.2": [["13.1", "858–859", "US code documents; AIA policy on codes"], ["16.1", "989", "Risk management strategies"], ["12.3", "833", "Checklists"], ["12.4", "847", "QM in procurement and CA"]],
  "pjm-5.3": [["12.2", "822", "QM in schematic design"], ["12.3", "833", "Checklists"], ["16.1", "1002", "Communication"]],
  "pjm-5.4": [["1.3", "25", "Art vs. science in architecture"], ["10.5", "657", "The design process"], ["12.2", "822", "QM in schematic design"]],
  "pa-1.3": [["16.3", "1021", "Sustainable design"]],
  "pa-2.1": [["4.4", "159", "Land use policy, zoning and building codes"], ["13.1", "858–860", "US code history; IBC and IFC fundamentals"]],
  "pa-2.2": [["13.2", "880, 895", "Planning and regulatory environment; form-based codes"]],
  "pa-4.1": [["12.2", "825–827", "Programming; net assignable area"]],
  "pa-4.3": [["9.1", "511", "Program management"], ["10.5", "664", "Programming backgrounder"], ["12.2", "825", "Programming"], ["15.2", "962", "Fees and risk"]],
  "ppd-1.3": [["9.6", "567–572", "Architect-developer case studies (neighborhood context)"]],
  "pdd-3.1": [["10.7", "690", "Organization of specifications (Figure 10.26)"]],
  "pdd-3.2": [["10.7", "690", "Organization of specifications (Figure 10.26)"]],
  "pdd-3.3": [["10.7", "696", "Coordinating drawings and specifications"]],
  "ce-1.1": [["9.2", "522", "Selecting the CMc"], ["10.8", "701", "Bidding and negotiation"], ["10.9", "714, 720", "Preparing for construction; Table 10.14 CA tasks"]],
  "ce-1.2": [["10.2", "606", "Selecting the team"], ["10.8", "710", "Construction phase preparation"], ["10.9", "714", "Preparing for the construction phase"]],
  "ce-1.3": [["9.2", "527–529", "Construction cost; CMc during construction"], ["10.8", "707", "The bidding process"]],
  "ce-2.1": [["10.9", "719", "Administration of the construction contract"]],
  "ce-2.2": [["10.9", "719", "Site visits and observations"]],
  "ce-2.3": [["9.1", "516", "Figure 9.3 sequences by delivery method"]],
  "ce-3.1": [["10.8", "709–710", "Bid-period questions; addenda"], ["10.9", "726", "Changes in the work"]],
  "ce-3.2": [["10.9", "724", "Contractor submittals"]],
  "ce-3.3": [["10.9", "722", "Contractor progress payments"]],
  "ce-3.4": [["10.9", "719", "Site visits and observations"]],
  "ce-4.1": [["10.10", "730–733", "Project completion; architect's closeout"]],
  "ce-4.2": [["10.10", "735", "Post-construction"]]
};

/* AIA documents in the folder */
ARE.AIADOCS = [
  { doc: "A101–2017", title: "Owner–Contractor Agreement, Stipulated Sum", use: "Contract sum, payments, retainage percentages, enumeration of contract documents", objs: ["pjm-3.3", "ce-3.3"], id: "1T-I0Xx0mGSphQIx96mbI8-Jc0DOFg2Gb" },
  { doc: "A133–2019", title: "Owner–Construction Manager as Constructor Agreement (Cost of Work plus fee with GMP)", use: "CM at risk: preconstruction services, GMP", objs: ["pcm-3.2", "ce-1.1"], id: "1ovMCFPQve41tvpOpaFaNqr8iC22OhQ5A" },
  { doc: "A141–2014", title: "Owner–Design-Builder Agreement", use: "Design-build delivery", objs: ["pcm-3.2", "pjm-4.3"], id: "14UVbPI9QiThtdAKuLZV9lxGGt-0VvGpG" },
  { doc: "A195–2008", title: "Owner–Contractor Agreement for Integrated Project Delivery", use: "IPD (transitional form)", objs: ["pcm-3.2"], id: "12igPUWTOfQ7RuryOR0cPEBOInyv9-nvP" },
  { doc: "B195–2008", title: "Owner–Architect Agreement for Integrated Project Delivery (file named untitled.pdf)", use: "IPD architect services; GMP-based compensation", objs: ["pcm-3.2"], id: "1hKtTlEu9uZKYaiFct5VEasvfK8rh_-rU" },
  { doc: "A295–2008", title: "General Conditions of the Contract for Integrated Project Delivery", use: "IPD general conditions", objs: ["pcm-3.2"], id: "1LFOv9GQ35eDb6UZ7V7mA6LH3Quam1h3q" },
  { doc: "A201–2017", title: "General Conditions of the Contract for Construction", use: "The architect's construction-phase role, submittals, changes, payment, completion, claims", objs: ["pjm-3.3", "ce-2.1", "ce-3.1", "ce-3.2", "ce-3.3", "ce-3.4", "ce-4.1"], id: "1dIAqvqktyV679SzjGm5wNFQB0B0MxkgS",
    verified: [["§1.1.2", "No contractual relationship between architect and contractor"], ["§1.2.1", "Contract documents are complementary"], ["§2.4", "Owner's right to stop the Work"], ["§3.8.2", "Allowances cover delivered cost of materials; installation and markup in contract sum"], ["§3.12.8", "Deviations in submittals must be specifically identified"], ["§3.12.10", "Delegated design professional services"], ["§4.2.2", "Site visits at intervals appropriate to the stage of construction"], ["§4.2.6", "Architect may reject nonconforming work and require testing"], ["§4.2.7", "Submittal review for limited purpose"], ["§7.2.1", "Change Order signed by owner, contractor and architect"], ["§7.3.1", "Construction Change Directive signed by owner and architect"], ["§7.4", "Minor changes in the work (ASI)"], ["§9.3.1", "Application for payment at least 10 days before payment date"], ["§9.3.2", "Stored materials on or off site"], ["§9.4.1", "Certificate for payment within 7 days"], ["§9.5.1", "Grounds for withholding certification"], ["§9.8.2", "Contractor prepares list of items to complete or correct"], ["§9.8.4", "Certificate of Substantial Completion contents"], ["§9.10.2", "Documents required before final payment"], ["§12.2.2.1", "One-year correction period"], ["§13.4", "Tests and inspections"], ["§15.1.3.1", "Claims initiated within 21 days"], ["§15.2.1", "Architect is Initial Decision Maker unless otherwise indicated"]] },
  { doc: "A701–2018", title: "Instructions to Bidders", use: "Bidding procedures, addenda, bid security, substitutions", objs: ["ce-1.1", "ce-1.2"], id: "1T_zfi8U_Us4oP-DsCHMcSZYhWqFe3-Oa" },
  { doc: "B101–2017", title: "Owner–Architect Agreement", use: "Standard of care, basic and additional services, cost of the work, disputes", objs: ["pcm-1.4", "pcm-3.1", "pjm-3.1", "pjm-3.4", "pjm-4.1", "pjm-4.2"], id: "1iSqu2oNK-Bu0Ml_M4Je5X1eGkc8tOi80",
    verified: [["§2.2", "Standard of care"], ["§3.1.2", "Architect may rely on services and information furnished by the owner and owner's consultants"], ["§3.2.1–3.2.2", "Schematic design: review program and laws; preliminary evaluation"], ["§3.3.1", "Design development fixes and describes size and character"], ["§3.4.1", "Construction documents"], ["§4.2.1", "Additional services require owner's written authorization"], ["§5.4", "Owner furnishes surveys"], ["§6.3", "Estimates may include contingencies and alternates"], ["§6.6–6.7", "Owner's options when the estimate exceeds the budget"], ["§8.2.1", "Mediation is a condition precedent to binding dispute resolution"], ["§8.2.4", "Binding method selection; litigation if none selected"]] },
  { doc: "B143–2014", title: "Architect–Design-Builder Agreement", use: "Architect working for a design-builder", objs: ["pcm-3.2"], id: "1kdVkuyJpN2o_6anUj1tPtNJ7caY4Uxa8" },
  { doc: "C401–2017", title: "Architect–Consultant Agreement", use: "Flow-down of owner–architect terms to consultants", objs: ["pjm-3.2"], id: "1jUo-LtrEG48AzfRqFeAGsIVZs7hqMY2G" },
  { doc: "G701–2017", title: "Change Order", use: "Recording agreed changes in work, sum and time", objs: ["ce-3.1"], id: "1KD9MuFcxNnOG0I554syRdGRb7S7O_eWd" },
  { doc: "G702–1992", title: "Application and Certificate for Payment", use: "Payment summary, retainage, current payment due", objs: ["ce-3.3"], id: "1x2qu5BGpxi1hLL5q_V7yINAgJ8A_rGeN" },
  { doc: "G703–1992", title: "Continuation Sheet", use: "Schedule-of-values line items for G702", objs: ["ce-3.3"], id: "1JKEtWN8CK1TJD6X5L3FyJMJie0iI2T9H" },
  { doc: "G704–2017", title: "Certificate of Substantial Completion", use: "Date of substantial completion; responsibilities; punch list time", objs: ["ce-4.1"], id: "1AnJhxnNpngOVZQxcd7X-kJ0-13Z3okXi" },
  { doc: "G709–2018", title: "Work Changes Proposal Request", use: "Requesting contractor pricing before a change", objs: ["ce-3.1"], id: "1zmknop7AZ-_PP6uDf3llWzPAu-C7RguY" }
];
ARE.AIADOCS.forEach(d => d.url = DRIVE + d.id + "/view");

ARE.DRIVE = {
  folder: "https://drive.google.com/drive/folders/1Rn31SJL65dSv0u9y5pzMDFDDUmgMUmWh",
  guidelines: DRIVE + "1-kgOQ2kYnMGALpop0rGvutKhLwcMKb_E/view",
  crosswalks: [["PcM", "1WjlwFhxHcpmbbnAtOaoS_5isxbgf1Sxz"], ["PjM", "1_eQdADL07I9XSRtqtK_7fISA8_-v7siN"], ["PA", "1hUHzAw4u67IDoueQiHdae1P-WsnUSY_Q"], ["PPD", "1RQjEvuLriAdrOaiL_e2ZIGVDNfq9Y2S7"], ["PDD", "1eocmzwvP2V2ku7XkRUaMHegfbcHp9PRy"], ["CE", "1qFek5XbCBsz8InQs_sQer2AhkJf2CNHt"]].map(([d, id]) => ({ d, url: DRIVE + id + "/view" }))
};

/* ============================================================
   2021 INTERNATIONAL BUILDING CODE — ICC Digital Codes (free read-only)
   Chapter and section URLs taken from codes.iccsafe.org search results;
   "confirmed" sections were matched to ICC's 2021 section pages.
   ============================================================ */
const ICC = "https://codes.iccsafe.org/content/IBC2021P1";
const ICCS = "https://codes.iccsafe.org/s/IBC2021P1/";
ARE.IBC = {
  title: "2021 International Building Code (IBC)",
  home: ICC,
  note: "Model code published by the International Code Council. The ARE tests the IBC family; jurisdictions adopt specific editions with local amendments. Free read-only access on ICC Digital Codes; printing and premium tools require a subscription.",
  chapters: [
    [2, "Definitions", ICC + "/chapter-2-definitions"],
    [3, "Occupancy Classification and Use", ICC + "/chapter-3-occupancy-classification-and-use"],
    [5, "General Building Heights and Areas", ICC + "/chapter-5-general-building-heights-and-areas"],
    [6, "Types of Construction", ICC + "/chapter-6-types-of-construction"],
    [7, "Fire and Smoke Protection Features", ICC + "/chapter-7-fire-and-smoke-protection-features"],
    [10, "Means of Egress", ICC + "/chapter-10-means-of-egress"],
    [14, "Exterior Walls", ICC + "/chapter-14-exterior-walls"],
    [35, "Referenced Standards", ICC + "/chapter-35-referenced-standards"]
  ],
  sections: [
    ["303.1.1", "Small buildings and tenant spaces (assembly under 50 as Group B)", 3, null, ["q-pa-10"]],
    ["506", "Building area (tabular, frontage and sprinkler increases)", 5, null, ["q-ppd-13"]],
    ["714", "Penetrations (through-penetration firestop systems)", 7, null, ["q-pdd-10"]],
    ["1004.5", "Areas without fixed seating (Table 1004.5 occupant load factors)", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1004.5", ["q-ppd-01", "q-ppd-02", "cs-lib-4"], true],
    ["1005.3.1", "Stairways (egress capacity per occupant)", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1005.3.1", ["q-ppd-03"], true],
    ["1006.3.3", "Egress based on occupant load (exits per story)", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1006.3.3", ["q-ppd-12"], true],
    ["1007.1.1", "Two exits or exit access doorways (remoteness)", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1007.1.1", ["q-ppd-07"], true],
    ["1017.2", "Exit access travel distance limitations", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1017.2", [], true],
    ["1020.3", "Corridor width and capacity", 10, ICCS + "chapter-10-means-of-egress/IBC2021P1-Ch10-Sec1020.3", [], true],
    ["1020.5", "Dead ends", 10, null, ["q-ppd-10"], true],
    ["1403.2", "Water-resistive barrier", 14, null, ["q-pdd-01"]],
    ["1404.3", "Vapor retarders", 14, ICCS + "chapter-14-exterior-walls/IBC2021P1-Ch14-Sec1404.3", ["q-pdd-02", "q-pdd-03"], true]
  ]
};
ARE.IBC.chapterUrl = (n) => { const c = ARE.IBC.chapters.find(x => x[0] === n); return c ? c[2] : ICC; };
ARE.IBC.urlFor = (text) => {
  if (!/IBC/.test(text)) return null;
  const sec = ARE.IBC.sections.find(s => s[3] && text.includes("§" + s[0]));
  if (sec) return sec[3];
  const ch = text.match(/Chapter (\d+)/); if (ch) return ARE.IBC.chapterUrl(+ch[1]);
  const m = text.match(/§\s?(\d{3,4})/); if (!m) return ICC;
  const n = m[1].length === 4 ? +m[1].slice(0, 2) : +m[1][0];
  return ARE.IBC.chapterUrl(n);
};

/* NCARB official practice exams (user's Drive). Linked only: NCARB's license
   prohibits modifying, excerpting or creating derivative works from them. */
ARE.NCARB_PE = {
  note: "Official NCARB practice exams in your ARE Prep folder. NCARB licenses them for personal study only and prohibits copying, excerpting or creating derivative works, so this app links to them instead of reproducing them. Take each one as a full, timed rehearsal, then log your result here.",
  exams: {
    pcm: { id: "1qJEjeKI5QIfa-IoF8xF1ueOwmZxcje0B", n: 65 },
    pjm: { id: "1I2B2NrjNvN3-Wrpd9PH6BYrPqoX9Wh8g", n: 75 },
    pa: { id: "1qRhuZtbxKXCzWmSk2QOZZzDSg5US0sRi", n: 75 },
    ppd: { id: "1vPVkCqKAaykOeP9fP1C5-vyTd9SYUx1z", n: 100 },
    pdd: { id: "1IJIgN3x7oMgdHQ4NPi5JMeuX4MEuaw2U", n: 100 },
    ce: { id: "10i0tnmahIm8weSd1YEAY23rJRYQNNiTF", n: 75 }
  }
};
Object.values(ARE.NCARB_PE.exams).forEach(x => x.url = DRIVE + x.id + "/view");
