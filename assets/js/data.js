/**
 * MAG Portfolio — THE MODEL (data.js)
 * Mohamed Adam Ghorbel — all content decoupled from HTML.
 */

const MAG_DATA = {

  profile: {
    name: "Mohamed Adam Ghorbel", initials: "MAG",
    role: "Data Engineering Student & Graphic Designer",
    location: "Sfax, Tunisia", availability: "Open to internships & remote work",
    email: "mohamedadamghorbel@gmail.com",
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-adam-ghorbel-768808326/", icon: "↗" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61583802896687", icon: "↗" },
      { label: "Github", url: "https://github.com/ademghorbel/", icon: "↗" },
    ],
    headline_line1: "Mohamed", headline_line2: "Adam", headline_accent: "Ghorbel.",
    eyebrow: "Data Eng. Student · Graphic Designer · Sfax, TN",
    profileImage: "assets/images/profile/MohamedAdamGhorbel.webp",
  },

  education: [
    {
      school: "ENET'Com Sfax", degree: "Data Engineering & Decision-making Systems (IDSD)",
      period: "Sep 2024 — Present", color: "blue",
      logo: "assets/images/logos/enetcom.webp",
      detail: "National School of Electronics and Telecommunications of Sfax."
    },
    {
      school: "IPEIS Sfax", degree: "Preparatory Cycle — Mathematics & Physics",
      period: "Sep 2022 — 2024", color: "orange",
      logo: "assets/images/logos/ipeis.webp",
      detail: "Sfax Preparatory Engineering Institute."
    },
  ],

  experience: [
    {
      company: "OlivSoft", role: "Automation & Integration Intern", type: "Internship", statusColor: "blue",
      date: "Jun 2026 – Aug 2026",
      logo: "assets/images/logos/OliveSoft.webp",
      description: "Automating the daily monitoring process for Boomi and Make integration flows using n8n. Retrieves execution logs via APIs, cross-references them with SFTP server files, and detects anomalies — failures, delays, and missing files. Includes automated daily report generation sent via Outlook and full solution documentation.",
      stack: ["n8n", "Boomi", "Make", "REST APIs", "SFTP", "Outlook", "Workflow Automation", "Integration Monitoring"]
    },
    {
      company: "TALAN Tunisia", role: "AI Engineering Intern", type: "Internship", statusColor: "blue",
      date: "Jul 2025 – Aug 2025",
      logo: "assets/images/logos/TALAN.webp",
      description: "Designed and built a legacy system modernisation solution applying reverse engineering to deconstruct and analyse obsolete software. Developed a multi-agent AI pipeline with LangChain and LangGraph.",
      stack: ["Python", "LangChain", "LangGraph", "Multi-Agent AI", "Selenium", "BeautifulSoup"]
    },
    {
      company: "Dksoft — Itech University / ForsaTaw", role: "UI/UX Design Intern", type: "Internship", statusColor: "orange",
      date: "Jun 2025 – Jul 2025",
      logo: "assets/images/logos/DKSoft.webp",
      description: "Executed a full visual identity redesign for the ForsaTaw mobile application and the Itech University web portal. Delivered Figma UI kits and complete brand guidelines.",
      stack: ["Figma", "Adobe Photoshop", "Illustrator", "UI/UX Design", "Branding"]
    },
    {
      company: "Starwaves", role: "Part-time Graphic Designer", type: "Commercial", statusColor: "blue",
      date: "Ongoing",
      logo: "assets/images/logos/STARWAVES.webp",
      description: "Poster and visual design work as part of an ongoing commercial engagement. Responsible for brand-consistent social media assets and promotional graphics.",
      stack: ["Adobe Photoshop", "Illustrator", "After Effects"]
    },
    {
      company: "IEEE ENETCOM SB", role: "Graphic Designer — Media & Communication", type: "Volunteering", statusColor: "orange",
      date: "Jan 2026 — Present",
      logo: "assets/images/logos/Logo ENET_Com SB Color@4x.webp",
      description: "Spearheaded visual communication and brand identity for major events and congresses. Designed comprehensive digital campaigns, print materials, and social media assets to elevate the student branch's professional image and engagement.",
      stack: ["Photoshop", "Illustrator", "Figma", "Event Design"]
    },
    {
      company: "IEEE IES-PES ENET'Com SB Joint Chapter", role: "Webmaster", type: "Volunteering", statusColor: "orange",
      date: "Ongoing",
      logo: "assets/images/logos/Logo IES-PES ENET_Com SBJC.webp",
      description: "Managing the web presence of the IES-PES ENET'Com Student Branch Joint Chapter.",
      stack: ["Web", "Content Management"]
    },
  ],

  designSkills: ["Adobe Photoshop", "Adobe Illustrator", "Premiere Pro", "After Effects", "Figma",
    "Visual Identity & Branding", "Event Design & Collateral", "Social Media Graphics",
    "Motion Graphics & Video", "Print Design", "UI/UX Design"],

  techSkills: ["Python", "LangChain / LangGraph", "Multi-Agent AI", "Data Vault 2.0", "ETL Pipelines",
    "Medallion Architecture", "XGBoost / ML", "SQL", "Streamlit", "Selenium / BeautifulSoup", "API Integration"],

  designWork: [
    {
      id: "forsataw", title: "ForsaTaw", client: "Dksoft · UI/UX Internship",
      logo: "assets/images/logos/forsataw.webp",
      description: "Full visual identity redesign for the ForsaTaw mobile application — Figma UI kits, brand guidelines, and component systems.",
      tags: ["Branding", "UI/UX", "Figma", "Mobile App"], link: "https://forsataw.tn/",
      images: [
        "assets/images/work/forsataw/Visual Identity_updated.webp",
        "assets/images/work/forsataw/pdc forsa taw final.webp",
        "assets/images/work/forsataw/first post.webp"
      ]
    },
    {
      id: "itech-university", title: "Itech University", client: "Dksoft · UI/UX Internship",
      logo: "assets/images/logos/ItechUni.webp",
      description: "Complete visual identity and web portal redesign for Itech University — responsive design, component library, and brand systems.",
      tags: ["Web Design", "UI/UX", "Figma", "Branding"], link: "https://www.itech-university.tn/",
      images: []
    },
    {
      id: "ska-food", title: "Ska Food Restaurant", client: "Ska · Branding Project",
      logo: "assets/images/logos/SkaFood.webp",
      description: "Complete visual identity system including logo design, menu design, and brand guidelines for Ska Food Restaurant.",
      tags: ["Logo Design", "Menu Design", "Branding", "Print"], link: "#",
      images: [
        "assets/images/work/ska-food/1780400965842.webp",
        "assets/images/work/ska-food/1780401004401.webp",
        "assets/images/work/ska-food/1780401029773.webp",
        "assets/images/work/ska-food/Black Logo.webp",
        "assets/images/work/ska-food/White Logo.webp"
      ]
    },
  ],

  techProjects: [
    {
      id: "smart-manager", title: "Smart Manager", subtitle: "Industrial Data Lakehouse Platform",
      client: "MOMSoft · End of Year Project (PFA)", period: "Nov 2025 – Apr 2026", category: "Data Engineering", color: "blue",
      logo: "assets/images/logos/Momsoft.webp",
      description: "Designed a Medallion Data Lakehouse (Bronze/Silver/Gold) integrating heterogeneous industrial sources — IoT, PLCs, ERP, HR. Implemented Data Vault 2.0 (Hubs, Links, Satellites) for full temporal traceability and auditability.",
      tags: ["Data Vault 2.0", "ETL", "Data Lakehouse", "SQL", "Python", "Figma"]
    },
    {
      id: "voltwise", title: "Voltwise", subtitle: "Photovoltaic Energy Prediction",
      client: "IEEE TSYP 13 · PES & YP & Spectra Challenge", period: "Oct 2025 – Dec 2025", category: "Machine Learning", color: "orange",
      logo: "assets/images/logos/voltwise.webp",
      description: "Built a supervised XGBoost model forecasting solar energy output. Integrated a live weather API and benchmarked expected vs real energy production with a Streamlit dashboard.",
      tags: ["Python", "Machine Learning", "XGBoost", "Streamlit", "API Integration"],
      github: "https://github.com/ademghorbel/ForcastingPVProduction"
    },
    {
      id: "talan-ai", title: "Legacy System Modernisation", subtitle: "Multi-Agent AI Pipeline",
      client: "TALAN Tunisia · AI Internship", period: "Jul 2025 – Aug 2025", category: "AI Engineering", color: "blue",
      logo: "assets/images/logos/TALAN.webp",
      description: "Designed and built a legacy system modernisation tool applying reverse engineering to analyse obsolete software. Developed a multi-agent AI pipeline with LangChain and LangGraph.",
      tags: ["LangChain", "LangGraph", "Multi-Agent AI", "Python", "Selenium"],
      github: "https://github.com/JlassiRAed/TalanProject"
    },
    {
      id: "enetcomdocs", title: "ENETCOMDocs", subtitle: "UX/UI Designer",
      client: "ENETCOM Community", period: "Sep 2025", category: "UI/UX Design", color: "blue",
      logo: "assets/images/logos/enetdocs.webp",
      description: "UX/UI design for the ENETCOMDocs document management platform for the ENETCOM community — wireframes and final UI delivery.",
      tags: ["Figma", "UI/UX Design"],
      link: "https://enetcom-docs.vercel.app/"
    },
  ],

  events: [
    {
      id: "aesh", title: "AESH 2026", subtext: "AESS Sustainability Hackathon 2026",
      role: "Media Posts Design", date: "2026", category: "International Hackathon",
      logo: "assets/images/events/aesh/logo.webp",
      banner: "assets/images/events/aesh/website.webp",
      link: "aesh.html", index: "01",
      about: [
        "AESS Sustainability Hackathon (AESH) 2026 serves as a dynamic hub connecting electrical engineering students with industry professionals.",
        "I led the visual identity for their social media campaigns, designing high-impact posts that maintained brand consistency while driving engagement.",
        "This involved translating complex technical concepts into accessible, visually appealing graphics for community updates and event announcements.",
      ],
      details: {
        event: "AESH 2026", edition: "AESS Sustainability Hackathon 2026",
        role: "Media Posts Designer", organisation: "IEEE AESS Tunisia Section Chapter", type: "Volunteering · Social Media Design"
      }
    },
    {
      id: "cstam-3", title: "IEEE CSTAM 3.0", subtext: "Computer Society Tunisian Annual Meeting · 3rd Edition",
      role: "Media & Communication Design", date: "2026", category: "International Congress",
      logo: "assets/images/events/cstam-3/logo.webp",
      banner: "assets/images/events/cstam-3/you will be impressed.webp",
      link: "cstam-3.html", index: "02",
      about: [
        "CSTAM 3.0 — the Computer Society Tunisian Annual Meeting (3rd Edition) — is a premier technical conference bridging the gap between academia and industry for engineering students.",
        "I spearheaded the comprehensive media and visual communication strategy, crafting an identity that resonated with both students and corporate sponsors.",
        "My contributions spanned promotional graphics, social media asset packages, and physical event branding materials.",
      ],
      details: {
        event: "IEEE Computer Society Tunisian Annual Meeting · CSTAM 3.0", edition: "3rd Edition",
        role: "Media & Communication Design", organisation: "IEEE CS ENET'Com SBC", type: "Volunteering · Media Design"
      }
    },
    {
      id: "trsyp-2", title: "IEEE TRSYP 2.0", subtext: "IEEE Tunisian RAS Student and Young Professional Congress · 2nd Edition",
      role: "Media Leader", date: "2025", category: "Internation Competition x Congress",
      logo: "assets/images/events/trsyp-2/logo.webp",
      banner: "assets/images/events/trsyp-2/Main.webp",
      link: "trsyp-2.html", index: "03",
      about: [
        "TRSYP 2.0 — the IEEE Tunisian RAS Student and Young Professional Congress (2nd Edition) — is a cornerstone event uniting student professionals across the IEEE Tunisia Section, marking a significant leap in regional collaboration.",
        "As Media Leader, I directed the full visual communication output. I managed a design pipeline from initial briefing to final delivery, ensuring every digital and print asset aligned with the congress's ambitious vision.",
        "This leadership role demanded strict adherence to brand guidelines while innovating across digital campaigns and onsite print collateral.",
      ],
      details: {
        event: "IEEE TRSYP 2.0", edition: "IEEE Tunisian RAS Student and Young Professional Congress · 2nd Edition",
        role: "Media Leader", organisation: "IEEE ENETCOM SB", type: "Volunteering · Media Lead", period: "Mar 2025 – Nov 2025"
      }
    },
    {
      id: "ies-syp-2", title: "IEEE IES SYP Congress 2.0", subtext: "IEEE Industrial Electronics Society Students and Young Professionals Congress · 2nd Edition",
      role: "Media & Communication Team member", date: "2025", category: "International Congress",
      logo: "assets/images/events/ies-syp-2/logo.webp",
      banner: "assets/images/events/ies-syp-2/Thumbnail.webp",
      link: "ies-syp-2.html", index: "04",
      about: [
        "IES SYP Congress 2.0 — the IEEE Industrial Electronics Society Students and Young Professionals Congress (2nd Edition) — provides an international platform for industrial electronics students and young professionals to network and share innovations.",
        "As a core member of the Media & Communication Team member, I designed dynamic promotional materials tailored to a highly technical audience.",
        "I developed reusable social media templates, event graphics, and digital collateral that reinforced the congress's prestige and professional character.",
      ],
      details: {
        event: "IEEE IES SYP Congress 2.0", edition: "IEEE Industrial Electronics Society Students and Young Professionals Congress · 2nd Edition",
        role: "Media & Communication Team member Member", organisation: "IEEE ENETCOM SB / IEEE IES Tunisia Section Chapter",
        type: "Volunteering · Media Design", period: "Apr 2025 – Aug 2025"
      }
    },
    {
      id: "sdc-3", title: "SDC 3.0 : IEEE Sight Day Congress", subtext: "Sight Day Congress · 3rd Edition",
      role: "Official Ambassador & Designer", date: "2025", category: "Local Congress",
      logo: "assets/images/events/sdc-3/logo.webp",
      link: "sdc-3.html", index: "05",
      about: [
        "Dive into a world of discovery at the SIGHT Day Congress 3rd Edition! Explore the wonders of marine life.",
        "I served a role as an ambassador, driving awareness campaigns and outreach initiatives.",
        "My videos directly supported the event's promotion through social media posts, active community representation and promoting the event .",
      ],
      details: {
        event: "SDC 3.0 : IEEE Sight Day Congress", edition: "Sight Day Congress · 3rd Edition",
        role: "IEEE ENET'Com SB Ambassador", organisation: "IEEE SIGHT Group - ISIMM Student Branch", type: "Volunteering · Ambassador"
      }
    },
    {
      id: "xtreme-19", title: "IEEE Xtreme 19.0", subtext: "Global 24h Programming Competition",
      role: "Media & Branding Lead", date: "2025", category: "International CP Competition",
      logo: "assets/images/events/xtreme-19/logo.webp",
      banner: "assets/images/events/xtreme-19/reg1.webp",
      link: "xtreme-19.html", index: "06",
      about: [
        "IEEEXtreme is a prestigious global 24-hour hackathon that challenges the best coding minds across hundreds of universities worldwide.",
        "I owned the complete media and branding lifecycle for the ENETCOM SB chapter, architecting the visual identity from the ground up.",
        "This comprehensive project spanned from the initial teaser campaigns to live event coverage and final recap materials, demanding stamina and creative consistency.",
      ],
      details: {
        event: "IEEE Xtreme 19.0", edition: "Global 24h Programming · 19th Edition",
        role: "Media & Branding Lead", organisation: "IEEE ENETCOM SB", type: "Volunteering · Full Media Design"
      }
    },
    {
      id: "eduvision", title: "EduVision", subtext: "IEEE Educational & Capacity Building Initiative",
      role: "Media & Communication Design Lead", date: "2026", category: "Local Initiative",
      logo: "assets/images/events/eduvision/logo.webp",
      banner: "assets/images/events/eduvision/TEASER.webp",
      link: "eduvision.html", index: "08",
      about: [
        "EduVision is an IEEE initiative focused on educational excellence and capacity building across emerging markets.",
        "As Media & Communication Design Lead, I crafted the complete visual strategy — establishing brand identity, designing promotional materials, and creating a cohesive multimedia presence.",
        "The initiative showcased keynote speakers from industry leaders, interactive workshops, and skill-building sessions.",
        "My design work spanned digital platforms (teaser videos, social content, gateway materials) and printed collateral, ensuring consistent messaging across all touchpoints.",
      ],
      details: {
        event: "EduVision", edition: "IEEE Educational Initiative",
        role: "Media & Communication Design Lead", organisation: "IEEE", type: "Volunteering · Design Leadership", period: "Jan 2025 – Present"
      }
    },
    {
      id: "cshize", title: "IEEE CS SYP HIZE", subtext: "Computer Society Students and Young Professionals High Impact Zonal Events",
      role: "Media Designer & Community Organizer", date: "2026", category: "Hacktahon and Chess Competition",
      logo: "assets/images/events/cshize/logo.webp",
      banner: "assets/images/events/cshize/hachathonnnn.webp",
      link: "cshize.html", index: "09",
      about: [
        "IEEE CS SYP HIZE — the Computer Society Students and Young Professionals High Impact Zonal Events — is a grassroots initiative designed to inspire youth in tech. The event features hackathons, technical workshops, and community engagement booths.",
        "I contributed as Media Designer & Community Organizer — creating all visual communication assets, managing booth presence, and coordinating event social media.",
        "The event attracted participants from local schools and universities, promoting awareness in cybersecurity careers and hands-on technical learning.",
        "My design work included competition posters, booth materials, social media content packs, and post-event documentation.",
      ],
      details: {
        event: "IEEE CS SYP HIZE", edition: "Computer Society Students and Young Professionals High Impact Zonal Events",
        role: "Media Designer & Community Organizer", organisation: "IEEE Computer Society", type: "Volunteering · Design & Community", period: "Feb 2025 – Mar 2025"
      }
    },
  ],

  overviewCards: [
    {
      label: "Currently Studying", title: "ENET'Com Sfax", sub: "Data Engineering & AI Systems",
      badge: "2nd Year", badgeColor: "blue"
    },
    { label: "Part-time Role", title: "Starwaves", sub: "Graphic Designer", badge: "Active", badgeColor: "blue" },
    {
      label: "Volunteering", title: "IEEE ENETCOM SB", sub: "Graphic Designer · Media & Comm.",
      badge: "Volunteer", badgeColor: "orange"
    }
  ],

  artworks: [
    { image: "assets/images/artworks/1st Session Benefits.webp", title: "1st Session Benefits", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/2nd Session Benefits.webp", title: "2nd Session Benefits", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/1st post IES DAY.webp", title: "IES DAY 1st Post", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/Achievement IES.webp", title: "IES Achievement", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/Achievement PES.webp", title: "PES Achievement", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/Happy IES DAY.webp", title: "Happy IES Day", year: "IEEE IES Tunisia Section Chapter-PES" },
    { image: "assets/images/artworks/Crescent Celebration.webp", title: "Crescent Celebration", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/Discount Membership.webp", title: "Discount Membership", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/EID fitr.webp", title: "Eid al Fitr", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/Eid al Adhha.webp", title: "Eid al Adhha", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/HAPPY NEW YEAR.webp", title: "Happy New Year", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/Independence Day.webp", title: "Independence Day", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/Labour Day.webp", title: "Labour Day", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/Martyrs'Day.webp", title: "Martyrs' Day", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/ramadhan.webp", title: "Ramadan Celebration", year: "IEEE ENETCOM SB" },
    { image: "assets/images/artworks/HAPPY IEEE DAY 2025.webp", title: "HAPPY IEEE DAY 2025", year: "Design Work" },
    { image: "assets/images/artworks/IES DAY Industrial Visit.webp", title: "IES DAY Industrial Visit", year: "Design Work" }
  ],

  videos: [
    { url: "https://drive.google.com/file/d/1nVDewHvj6ix3MvxV9Jm38t9e90S4qd2u/preview", thumb: "https://drive.google.com/thumbnail?id=1nVDewHvj6ix3MvxV9Jm38t9e90S4qd2u&sz=w640", title: "IEEE IES DAY 2025", client: "Event Highlights", tags: ["Video Editing", "Motion Graphics"] },
    { url: "https://drive.google.com/file/d/1_oW45LDKr6ibnwyZWZ6V5LeGJ75KdBug/preview", thumb: "https://drive.google.com/thumbnail?id=1_oW45LDKr6ibnwyZWZ6V5LeGJ75KdBug&sz=w640", title: "IEEE IES-PES ENET'Com SB Joint Chapter Activities 2025", client: "Yearly Review", tags: ["Video Editing", "After Effects"] },
    { url: "https://drive.google.com/file/d/1D54u9l6M8chlNnSves7sFiaZx7yWZEKl/preview", thumb: "https://drive.google.com/thumbnail?id=1D54u9l6M8chlNnSves7sFiaZx7yWZEKl&sz=w640", title: "IEEE PES TGM 7.0", client: "Event Proposal", tags: ["Proposal", "Motion Design"] },
    { url: "https://drive.google.com/file/d/1DbpbMpsLc5QstJJUE_GY6wdYxJztsj3v/preview", thumb: "https://drive.google.com/thumbnail?id=1DbpbMpsLc5QstJJUE_GY6wdYxJztsj3v&sz=w640", title: "IEEE PES TGM 6.0", client: "Promotional Video", tags: ["Promo", "Premiere Pro"] },
    { url: "https://drive.google.com/file/d/11XdGChTeCN8Z0Skh67q0n2MHWM8WEJza/preview", thumb: "https://drive.google.com/thumbnail?id=11XdGChTeCN8Z0Skh67q0n2MHWM8WEJza&sz=w640", title: "IEEE PES TGM 6.0 Promotion", client: "Promotional Video 2", tags: ["Promo", "Premiere Pro"] },
    { url: "https://drive.google.com/file/d/1694ga9MwP5-eY9wfwhjLsPHsdaTKot1v/preview", thumb: "https://drive.google.com/thumbnail?id=1694ga9MwP5-eY9wfwhjLsPHsdaTKot1v&sz=w640", title: "IEEE IASTAM 6.0 Proposal", client: "Event Proposal", tags: ["Proposal", "Motion Design"] },
    { url: "https://drive.google.com/file/d/1UsV17svisxxL0-hJ1t-5NeFo8Ce6_mgh/preview", thumb: "https://drive.google.com/thumbnail?id=1UsV17svisxxL0-hJ1t-5NeFo8Ce6_mgh&sz=w640", title: "AI Bootcamp", client: "Event Promotion", tags: ["Video", "Promotion"] },
    { url: "https://drive.google.com/file/d/1ZZ2nkuSa535vvKDpBxhgFDn6yqL_uj6C/preview", thumb: "https://drive.google.com/thumbnail?id=1ZZ2nkuSa535vvKDpBxhgFDn6yqL_uj6C&sz=w640", title: "Palestine Support", client: "Awareness Campaign", tags: ["Awareness", "Motion Graphics"] }
  ]

};
