/* ============================================================
   CURRICULUM FRAMEWORK
   Source: NCARB ARE 5.0 Guidelines, October 2026 edition (effective
   Oct 1, 2026; includes the April 27, 2026 objective changes), from
   the copy in the user's Google Drive "ARE Prep" folder, plus NCARB's
   division pages for PA, PPD, PDD and CE (the PDF text extract ends
   after PjM). Objective titles below are NCARB's wording.
   Objective entries: [code, title, cognitive level, objective % range]
   where the last two are known (PcM and PjM 1–2 from the Guidelines).
   ============================================================ */
window.ARE = window.ARE || {};

ARE.META = {
  guidelines: "NCARB ARE 5.0 Guidelines, October 2026 (objectives updated April 27, 2026)",
  totals: { items: 490, scored: 445, pretest: 45, objectives: 91, sections: 27 },
  itemTypes: ["Multiple choice (3–4 options, one answer)", "Check-all-that-apply (select 2–4 of 6; no partial credit)", "Hotspot (click an area on an image)"],
  itemNote: "Every item is worth one point with no partial credit, and each is written at the Understand/Apply (U/A) or Analyze/Evaluate (A/E) level. Calculations appear as multiple choice. The matching and sequencing items in this app are study drills, not ARE item types.",
  caseNote: "Since April 27, 2026, each case study uses 1–2 resources (contracts, code excerpts, drawings, budgets, zoning) and fewer items per case."
};

ARE.DIVISIONS = [
  {
    id: "pcm", code: "PcM", n: 1, name: "Practice Management", sheet: "A-101",
    items: 65, scored: 59, pretest: 6, time: "2 h 40 min", brk: "30 min", appt: "3 h 20 min", cases: "Up to 6 case studies, up to 14 items",
    blurb: "Running the firm: business structure, ethics, finances, risk, contracts and how the practice delivers services.",
    sections: [
      { n: 1, name: "Business Operations", w: [20, 26], obj: [
        ["1.1", "Assess resources within the practice", "A/E", [8, 12]],
        ["1.2", "Apply the regulations and requirements governing the work environment", "U/A", [4, 8]],
        ["1.3", "Apply ethical standards to comply with accepted principles within a given situation", "U/A", [2, 6]],
        ["1.4", "Apply appropriate Standard of Care within a given situation", "U/A", [1, 5]]
      ]},
      { n: 2, name: "Finances, Risk & Development of Practice", w: [29, 35], obj: [
        ["2.1", "Evaluate the financial well-being of the practice", "A/E", [11, 15]],
        ["2.2", "Identify practice policies and methodologies for risk, legal exposures, and resolutions", "U/A", [10, 14]],
        ["2.3", "Select and apply practice strategies for a given business situation and policy", "U/A", [5, 9]]
      ]},
      { n: 3, name: "Practice-Wide Delivery of Services", w: [22, 28], obj: [
        ["3.1", "Analyze and determine response for client services requests", "A/E", [3, 7]],
        ["3.2", "Analyze applicability of contract types and delivery methods", "A/E", [10, 14]],
        ["3.3", "Understand potential project risks and how a practice can mitigate those risks", "A/E", [6, 10]]
      ]},
      { n: 4, name: "Practice Methodologies", w: [17, 23], obj: [
        ["4.1", "Identify and compare practice and business structures relevant to an architectural practice", "A/E", [8, 12]],
        ["4.2", "Identify and compare processes, policies, and resources used in the design, coordination, and documentation of different project types", "A/E", [8, 12]]
      ]}
    ]
  },
  {
    id: "pjm", code: "PjM", n: 2, name: "Project Management", sheet: "A-201",
    items: 75, scored: 68, pretest: 7, time: "3 h 00 min", brk: "30 min", appt: "3 h 40 min", cases: "Up to 7 case studies, up to 16 items",
    blurb: "Running one commission: team, resources, work plans, schedules, contracts, execution and quality control.",
    sections: [
      { n: 1, name: "Resource Management", w: [7, 13], obj: [
        ["1.1", "Determine criteria required to assemble team", "U/A", [3, 7]],
        ["1.2", "Assess criteria required to allocate and manage project resources", "A/E", [3, 7]]
      ]},
      { n: 2, name: "Project Work Planning", w: [17, 23], obj: [
        ["2.1", "Develop and maintain project work plan", "U/A", [5, 9]],
        ["2.2", "Determine criteria required to develop and maintain project schedule", "A/E", [5, 9]],
        ["2.3", "Determine appropriate communication to project team – owner, contractor, consultants and internal staff", "U/A", [4, 8]]
      ]},
      { n: 3, name: "Contracts", w: [25, 31], obj: [
        ["3.1", "Evaluate and verify adherence to owner/architect agreement", "A/E"],
        ["3.2", "Interpret key elements of, and verify adherence to architect/consultant agreement", "U/A"],
        ["3.3", "Interpret key elements of the owner/contractor agreement", "U/A"],
        ["3.4", "Interpret key elements of the owner/architect agreement to integrate an owner's consultant's work into the project", "U/A"]
      ]},
      { n: 4, name: "Project Execution", w: [17, 23], obj: [
        ["4.1", "Monitor the project throughout its design and documentation for compliance with the construction budget", "A/E"],
        ["4.2", "Evaluate and address changes in scope of work and scope creep", "A/E"],
        ["4.3", "Implement appropriate policies and procedures to document a project for a specified delivery method", "A/E"],
        ["4.4", "Identify and conform with the requirements set forth by authorities having jurisdiction in order to obtain approvals for the project", "U/A"]
      ]},
      { n: 5, name: "Project Quality Control", w: [19, 25], obj: [
        ["5.1", "Apply procedures required for adherence to laws and regulations relating to the project", "U/A"],
        ["5.2", "Identify processes, policies, and resources for quality control and risk reduction in the project", "A/E"],
        ["5.3", "Implement quality control processes to ensure project coordination and constructability", "A/E"],
        ["5.4", "Implement quality control processes to maintain integrity of design objectives", "A/E"]
      ]}
    ]
  },
  {
    id: "pa", code: "PA", n: 3, name: "Programming & Analysis", sheet: "A-301",
    items: 75, scored: 68, pretest: 7, time: "3 h 00 min", brk: "30 min", appt: "3 h 40 min",
    blurb: "Pre-design: site and climate, zoning and codes, existing buildings, the program, and feasibility of budget and schedule.",
    sections: [
      { n: 1, name: "Environmental & Contextual Conditions", w: [14, 21], obj: [
        ["1.1", "Evaluate site-specific environmental and socio-cultural opportunities"],
        ["1.2", "Evaluate site-specific environmental constraints"],
        ["1.3", "Determine optimal use of onsite resources by incorporating sustainability principles"]
      ]},
      { n: 2, name: "Codes & Regulations", w: [16, 22], obj: [
        ["2.1", "Identify relevant code requirements for building and site types"],
        ["2.2", "Identify relevant zoning and land use requirements"],
        ["2.3", "Identify relevant local and site-specific requirements"]
      ]},
      { n: 3, name: "Site Analysis & Programming", w: [21, 27], obj: [
        ["3.1", "Evaluate relevant qualitative and quantitative attributes of a site as they relate to a program"],
        ["3.2", "Synthesize site reports with other documentation and analysis"],
        ["3.3", "Analyze graphical representations regarding site analysis and site programming"]
      ]},
      { n: 4, name: "Building Analysis & Programming", w: [37, 43], obj: [
        ["4.1", "Evaluate relevant qualitative and quantitative attributes of a new or existing building as they relate to the program"],
        ["4.2", "Evaluate documentation, reports, assessments, and analyses to inform the building program"],
        ["4.3", "Identify and prioritize components of the building program"],
        ["4.4", "Assess spatial and functional relationships for the building program"],
        ["4.5", "Review and assess the feasibility of the project budget and schedule to meet the project scope"],
        ["4.6", "Identify alternatives for building and structural systems for given programmatic requirements, preliminary budget, and schedule"],
        ["4.7", "Analyze graphical representations regarding building analysis and building programming"]
      ]}
    ]
  },
  {
    id: "ppd", code: "PPD", n: 4, name: "Project Planning & Design", sheet: "A-401",
    items: 100, scored: 91, pretest: 9, time: "4 h 05 min", brk: "45 min", appt: "5 h 00 min",
    blurb: "Schematic synthesis: siting, codes, structural and MEP systems, materials, integration of program and systems, and cost.",
    sections: [
      { n: 1, name: "Environmental Conditions & Context", w: [10, 16], obj: [
        ["1.1", "Determine location of building and site improvements based on site analysis"],
        ["1.2", "Determine sustainable principles to apply to design"],
        ["1.3", "Determine impact of neighborhood context on the project design"]
      ]},
      { n: 2, name: "Codes & Regulations", w: [16, 22], obj: [
        ["2.1", "Apply zoning and environmental regulations to site and building design"],
        ["2.2", "Apply building codes to building design"],
        ["2.3", "Integrate multiple codes to a project design"]
      ]},
      { n: 3, name: "Building Systems, Materials & Assemblies", w: [19, 25], obj: [
        ["3.1", "Determine mechanical, electrical, and plumbing systems"],
        ["3.2", "Determine structural systems"],
        ["3.3", "Determine special systems such as acoustics, communications, lighting, security, conveying, and fire suppression"],
        ["3.4", "Determine materials and assemblies to meet programmatic, budgetary, and regulatory requirements"]
      ]},
      { n: 4, name: "Project Integration of Program & Systems", w: [32, 38], obj: [
        ["4.1", "Determine building configuration"],
        ["4.2", "Integrate building systems in the project design"],
        ["4.3", "Integrate program requirements into a project design"],
        ["4.4", "Integrate environmental and contextual conditions in the project design"]
      ]},
      { n: 5, name: "Project Costs & Budgeting", w: [8, 14], obj: [
        ["5.1", "Evaluate design alternatives based on the program"],
        ["5.2", "Evaluate cost estimates based on the project design"],
        ["5.3", "Evaluate the project design based on cost considerations"]
      ]}
    ]
  },
  {
    id: "pdd", code: "PDD", n: 5, name: "Project Development & Documentation", sheet: "A-501",
    items: 100, scored: 91, pretest: 9, time: "4 h 05 min", brk: "45 min", appt: "5 h 00 min",
    blurb: "Technical resolution: system sizing and integration, detailing, construction documentation, the project manual, code compliance at detail level and estimates.",
    sections: [
      { n: 1, name: "Integration of Building Materials & Systems", w: [31, 37], obj: [
        ["1.1", "Analyze the integration of architectural systems and technologies to meet project goals"],
        ["1.2", "Determine the size of mechanical, electrical, and plumbing systems and components to meet project goals"],
        ["1.3", "Determine the size of structural systems to meet project goals"],
        ["1.4", "Integrate specialty systems such as acoustics, lighting, fire suppression, conveying, security, and communications to meet project goals"],
        ["1.5", "Determine how to detail the integration of multiple building systems and technologies"],
        ["1.6", "Coordinate mechanical, electrical, plumbing, structural, and specialty systems and technologies"]
      ]},
      { n: 2, name: "Construction Documentation", w: [32, 38], obj: [
        ["2.1", "Determine appropriate documentation of building design"],
        ["2.2", "Determine appropriate documentation of site features"],
        ["2.3", "Determine appropriate documentation of detailed building drawings within individual architectural systems"],
        ["2.4", "Apply standards required to assemble a set of clear and coordinated construction documentation"],
        ["2.5", "Determine impact of project changes on documentation requirements and methods to communicate those changes to owner and design team"]
      ]},
      { n: 3, name: "Project Manual & Specifications", w: [12, 18], obj: [
        ["3.1", "Identify and prioritize components required to write, maintain, and refine project manual"],
        ["3.2", "Identify and prioritize components required to write, maintain, and refine project specifications"],
        ["3.3", "Coordinate specifications with construction documentation"]
      ]},
      { n: 4, name: "Codes & Regulations", w: [8, 14], obj: [
        ["4.1", "Determine adherence to building regulatory requirements (IBC) at detail level"],
        ["4.2", "Determine adherence with specialty regulatory requirements at the detail level"]
      ]},
      { n: 5, name: "Construction Cost Estimates", w: [2, 8], obj: [
        ["5.1", "Analyze construction cost estimates to confirm alignment with project design"]
      ]}
    ]
  },
  {
    id: "ce", code: "CE", n: 6, name: "Construction & Evaluation", sheet: "A-601",
    items: 75, scored: 68, pretest: 7, time: "3 h 00 min", brk: "30 min", appt: "3 h 40 min",
    blurb: "The construction phase: bidding, preconstruction, observation, submittals, RFIs, changes, payment, closeout and evaluation.",
    sections: [
      { n: 1, name: "Preconstruction Activities", w: [17, 23], obj: [
        ["1.1", "Understand the architect's role and responsibilities in advising the client during the bidding process based on project delivery method"],
        ["1.2", "Analyze criteria for selecting contractors"],
        ["1.3", "Analyze aspects of the contract or design to adjust project costs"]
      ]},
      { n: 2, name: "Construction Observation", w: [32, 38], obj: [
        ["2.1", "Evaluate the architect's role during construction activities"],
        ["2.2", "Evaluate construction conformance with contract documents, codes, regulations, and sustainability requirements"],
        ["2.3", "Determine construction progress"]
      ]},
      { n: 3, name: "Administrative Procedures & Protocols", w: [32, 38], obj: [
        ["3.1", "Determine appropriate additional information to supplement contract documents"],
        ["3.2", "Evaluate submittals including shop drawings, samples, mock-ups, product data, and test results"],
        ["3.3", "Evaluate the contractor's application for payment"],
        ["3.4", "Evaluate responses to non-conformance with contract documents"]
      ]},
      { n: 4, name: "Project Closeout & Evaluation", w: [7, 13], obj: [
        ["4.1", "Apply procedural concepts to complete close-out activities"],
        ["4.2", "Evaluate building design and performance"]
      ]}
    ]
  }
];

/* Build lookups */
ARE.OBJ = {};      // "pcm-2.1" -> {div, sec, code, title, key}
ARE.DIV = {};
ARE.DIVISIONS.forEach(d => {
  ARE.DIV[d.id] = d;
  d.objectives = [];
  d.sections.forEach(s => {
    s.mid = (s.w[0] + s.w[1]) / 2;
    s.obj.forEach(([code, title, lvl, pct]) => {
      const key = d.id + "-" + code;
      const o = { key, div: d.id, sec: s.n, secName: s.name, code, title, lvl: lvl || null, pct: pct || null, w: pct ? (pct[0] + pct[1]) / 2 : s.mid / s.obj.length };
      ARE.OBJ[key] = o; d.objectives.push(o);
    });
  });
});
