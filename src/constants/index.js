
const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Work",
    link: "/work",
  },
  {
    name: "Journey",
    link: "/journey",
  },
  {
    name: "Skills",
    link: "/skills",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

// Site owner metadata used across the app
const owner = {
  name: "Abhay Maheshwari",
  role: "Software Engineer",
  email: "maheshwariabhay49@gmail.com",
  location: "India",
  socials: {
    linkedin: "https://www.linkedin.com/in/maheshwari-abhay",
    github: "https://github.com/abhay-maheshwari",
  },
  bio:
    "Building interactive experiences and robust products — available for collaboration and freelance.",
};



const counterItems = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Clients Served" },
  { value: 25, suffix: "+", label: "Events & Projects" },
  { value: 8.81, suffix: "", label: "VIT CGPA" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.webp",
  },
  {
    imgPath: "/images/logos/company-logo-2.webp",
  },
  {
    imgPath: "/images/logos/company-logo-3.webp",
  },
  {
    imgPath: "/images/logos/company-logo-4.webp",
  },
  {
    imgPath: "/images/logos/company-logo-5.webp",
  },
  {
    imgPath: "/images/logos/company-logo-6.webp",
  },
  {
    imgPath: "/images/logos/company-logo-7.webp",
  },
  {
    imgPath: "/images/logos/company-logo-8.webp",
  },
  {
    imgPath: "/images/logos/company-logo-11.webp",
  },
];


const educationList = [
  {
    id: 1,
    institution: "Vellore Institute of Technology, Vellore",
    date: "Sept 2022 - July 2026",
    degree: "B.Tech Computer Science and Engineering",
    grade: "CGPA: 8.81",
    desc: "Focused on core CS fundamentals, algorithms, and system design. Active in technical clubs and leadership roles.",
    icon: "/images/logos/logo-placeholder.webp",
    coursework: [
      "Data Structures and Algorithms",
      "Software Engineering",
      "Object Oriented Programming",
      "Database Management System",
      "Machine Learning",
      "Computer Networks",
      "Operating Systems",
      "IoT Programming",
      "Artificial Intelligence"
    ]
  },
];

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java 17", "SQL", "C++", "JavaScript", "TypeScript", "HTML", "CSS", "SAP ABAP"]
  },
  {
    category: "Frameworks & Technologies",
    skills: ["Angular 19", "Spring Boot", "React.js", "FastAPI", "Streamlit", "MySQL", "Redis", "Kubernetes", "Istio", "AWS S3", "Git"]
  },
  {
    category: "DevOps & Security",
    skills: ["CI/CD", "Azure Pipelines", "SonarQube", "HP Fortify", "BlackDuck", "AES-256 Encryption", "RBAC", "Docker"]
  },
  {
    category: "Data & Automation",
    skills: ["Data Visualization", "Reporting Solutions", "Web Automation", "OOP", "Data Structures", "Algorithms"]
  }
];

const projects = [
  {
    title: "Visitor Management System (VMS)",
    desc: "Enterprise-scale visitor management system replacing manual paper logs for Reliance Industries Petchem warehouses. Built role-based access control with OTP verification, Active Directory integration, and AES-256 encryption. Implemented K8s deployment with Istio and resolved 32+ security vulnerabilities.",
    subdesc: "Angular 19 · Spring Boot · MySQL · Redis · Kubernetes · Istio",
    href: "#",
    texture: "/images/vms.webp",
    tags: [
      { id: 1, name: "Angular 19", path: "/images/logos/react.webp" },
      { id: 2, name: "Spring Boot", path: "/images/logos/python.svg" },
      { id: 3, name: "Kubernetes", path: "/images/logos/react.webp" },
    ],
    id: "vms",
    badge: "enterprise",
    eyebrow: "ENTERPRISE · VMS",
    category: "FULL-STACK DEVELOPMENT",
    titleLines: ["VISITOR", "MANAGEMENT"],
    year: "2026",
    role: "FULL-STACK INTERN",
    videoPath: "assets/vms.webm",
    imagePath: "/images/vms.webp",
    techStack: [
      { label: "FRONTEND", quote: "ANGULAR 19" },
      { label: "BACKEND", quote: "SPRING BOOT, JAVA 17, MYSQL, REDIS" },
      { label: "DEVOPS & SEC", quote: "KUBERNETES, ISTIO, AWS, FORTIFY" },
    ],
    description: "Enterprise-scale visitor management system replacing manual paper logs for Reliance Industries Petchem warehouses. Built role-based access control with OTP verification, Active Directory integration, and AES-256 encryption. Implemented K8s deployment with Istio and resolved 32+ security vulnerabilities.",
    stats: { timeline: "6 MONTHS", platform: "WEB", github: "Private", live: "Internal", role: "FULL-STACK" },
  },
  {
    title: "R|Elan CMS Platform",
    desc: "Dynamic CMS-driven website for Reliance's R|Elan sustainable fashion brand. Enabled non-technical admins to edit content across all brand pages. Built features including section reordering, media management via AWS S3, client-side WebP compression, and browser-level lazy loading.",
    subdesc: "Angular · CMS · AWS S3 · Image Optimization",
    href: "#",
    texture: "/images/r-elan.webp",
    tags: [
      { id: 1, name: "Angular", path: "/images/logos/react.webp" },
      { id: 2, name: "AWS S3", path: "/images/logos/python.svg" },
      { id: 3, name: "CMS", path: "/images/logos/react.webp" },
    ],
    id: "relan-cms",
    badge: "cms",
    eyebrow: "WEB PLATFORM · CMS",
    category: "FULL-STACK DEVELOPMENT",
    titleLines: ["R|ELAN CMS"],
    year: "2026",
    role: "FULL-STACK INTERN",
    videoPath: "assets/r-elan.webm",
    imagePath: "/images/r-elan.webp",
    techStack: [
      { label: "FRONTEND", quote: "ANGULAR" },
      { label: "BACKEND", quote: "SPRING BOOT, MYSQL" },
      { label: "INFRASTRUCTURE", quote: "AWS S3, KUBERNETES" },
    ],
    description: "Dynamic CMS-driven website for Reliance's R|Elan sustainable fashion brand. Enabled non-technical admins to edit content across all brand pages. Built features including section reordering, media management via AWS S3, client-side WebP compression, and browser-level lazy loading.",
    stats: { timeline: "4 MONTHS", platform: "WEB", github: "Private", live: "relan.com", role: "FULL-STACK" },
  },
  {
    title: "Holdings Manager Tool",
    desc: "Professional fintech tool processing 10M+ assets with automated consolidation of 15+ investment accounts. Architected interactive pivot tables and dashboards serving 100+ users with real-time portfolio analytics. Includes customizable data views and role-based access.",
    subdesc: "React · TypeScript · Supabase · Vite",
    href: "https://github.com/Abhay-Maheshwari/HoldingManager",
    texture: "/images/holding manger.webp",
    tags: [
      { id: 1, name: "React", path: "/images/logos/react.webp" },
      { id: 2, name: "TypeScript", path: "/images/logos/react.webp" },
      { id: 3, name: "Supabase", path: "/images/logos/react.webp" },
    ],
    id: "holdings-manager",
    badge: "fintech",
    eyebrow: "FINTECH · UTILITY",
    category: "FULL-STACK DEVELOPMENT",
    titleLines: ["HOLDINGS", "MANAGER"],
    year: "2025",
    role: "FULL-STACK DEV",
    videoPath: "assets/Holding Manager.webm",
    imagePath: "/images/holding manger.webp",
    techStack: [
      { label: "FRONTEND", quote: "REACT, TYPESCRIPT, VITE" },
      { label: "BACKEND", quote: "SUPABASE" },
    ],
    description: "Professional fintech tool processing 10M+ assets with automated consolidation of 15+ investment accounts. Architected interactive pivot tables and dashboards serving 100+ users with real-time portfolio analytics. Includes customizable data views and role-based access.",
    stats: { timeline: "3 MONTHS", platform: "WEB", github: "github.com/Abhay-Maheshwari/HoldingManager", live: "https://holding-manager.vercel.app", role: "FULL-STACK" },
  },
  {
    title: "Web Game Automation Framework",
    desc: "Extensible automation framework tested across multiple web-based games. Refined DOM handling strategies to reduce redundant browser interactions by 200%, significantly improving performance and reliability. Built with modular architecture for easy expansion.",
    subdesc: "Python · Selenium · Automation",
    href: "https://github.com/Abhay-Maheshwari/Web-Game-Automation",
    texture: "/images/game automation.webp",
    tags: [
      { id: 1, name: "Python", path: "/images/logos/python.svg" },
      { id: 2, name: "Selenium", path: "/images/logos/python.svg" },
    ],
    id: "web-game-automation",
    badge: "automation",
    eyebrow: "FRAMEWORK · AUTOMATION",
    category: "QA & AUTOMATION",
    titleLines: ["GAME", "AUTOMATION"],
    year: "2025",
    role: "AUTOMATION DEV",
    videoPath: "assets/Web_Game_automation.webm",
    imagePath: "/images/game automation.webp",
    techStack: [
      { label: "LANGUAGE", quote: "PYTHON" },
      { label: "TOOLS", quote: "SELENIUM, DOM MANIPULATION" },
    ],
    description: "Extensible automation framework tested across multiple web-based games. Refined DOM handling strategies to reduce redundant browser interactions by 200%, significantly improving performance and reliability. Built with modular architecture for easy expansion.",
    stats: { timeline: "2 MONTHS", platform: "DESKTOP", github: "github.com/Abhay-Maheshwari/Web-Game-Automation", live: "N/A", role: "AUTOMATION" },
  },
  {
    title: "hackSimulator",
    desc: "Interactive hacking simulator game with realistic terminal UI and engaging gameplay mechanics. Built for creative expression while demonstrating advanced frontend skills including state management, keyboard event handling, and retro-style aesthetics.",
    subdesc: "JavaScript · HTML5 · CSS3",
    href: "https://github.com/Abhay-Maheshwari/hackSimulator",
    texture: "/images/hack simulator.webp",
    tags: [
      { id: 1, name: "JavaScript", path: "/images/logos/react.webp" },
      { id: 2, name: "HTML5", path: "/images/logos/react.webp" },
      { id: 3, name: "CSS3", path: "/images/logos/react.webp" },
    ],
    id: "hack-simulator",
    badge: "game",
    eyebrow: "BROWSER GAME · SIMULATOR",
    category: "FRONTEND & DESIGN",
    titleLines: ["HACK", "SIMULATOR"],
    year: "2024",
    role: "FRONTEND & DESIGN",
    videoPath: "assets/HackSimulator.webm",
    imagePath: "/images/hack simulator.webp",
    techStack: [
      { label: "CORE", quote: "JAVASCRIPT, HTML5, CSS3" },
      { label: "UI", quote: "CUSTOM TERMINAL COMPONENT" },
    ],
    description: "Interactive hacking simulator game with realistic terminal UI and engaging gameplay mechanics. Built for creative expression while demonstrating advanced frontend skills including state management, keyboard event handling, and retro-style aesthetics.",
    stats: { timeline: "1 MONTH", platform: "WEB", github: "github.com/Abhay-Maheshwari/hackSimulator", live: "https://hack-simulator.vercel.app", role: "FRONTEND" },
  },
  {
    title: "Procedural Maps",
    desc: "Advanced procedural terrain generation system creating realistic, diverse landscapes. Implements Simplex noise and FBM algorithms for natural elevation, combined with Whittaker diagrams for biome classification and syllable-combination naming for locations.",
    subdesc: "React · TypeScript · Algorithms",
    href: "https://github.com/Abhay-Maheshwari/Procedural-Map-Generator",
    texture: "/images/map.webp",
    tags: [
      { id: 1, name: "React", path: "/images/logos/react.webp" },
      { id: 2, name: "TypeScript", path: "/images/logos/react.webp" },
    ],
    id: "procedural-map",
    badge: "graphics",
    eyebrow: "GENERATION · ALGORITHM",
    category: "GRAPHICS PROGRAMMING",
    titleLines: ["PROCEDURAL", "MAPS"],
    year: "2024",
    role: "ALGORITHM DESIGNER",
    videoPath: "/images/map.webm",
    imagePath: "/images/map.webp",
    techStack: [
      { label: "CORE", quote: "REACT, TYPESCRIPT" },
      { label: "ALGORITHMS", quote: "SIMPLEX NOISE, FBM" },
    ],
    description: "Advanced procedural terrain generation system creating realistic, diverse landscapes. Implements Simplex noise and FBM algorithms for natural elevation, combined with Whittaker diagrams for biome classification and syllable-combination naming for locations.",
    stats: { timeline: "3 MONTHS", platform: "WEB", github: "github.com/Abhay-Maheshwari/Procedural-Map-Generator", live: "https://procedural-map-generator-psi.vercel.app", role: "ALGORITHM" },
  },
  {
    title: "Autonomous AI Curation Agent",
    desc: "AI-driven system that autonomously collects, analyzes, and publishes weekly briefings on AI technology trends. Reduces manual research effort by 80% through automated content aggregation and publishing to 'The Sunday Algorithm' LinkedIn newsletter.",
    subdesc: "Make.com · Webhooks · Google Gemini",
    href: "https://www.linkedin.com/in/the-sunday-algorithm",
    texture: "/images/ai-curator.webp",
    tags: [
      { id: 1, name: "Make.com", path: "/images/logos/react.webp" },
      { id: 2, name: "Gemini", path: "/images/logos/react.webp" },
    ],
    id: "ai-curation-agent",
    badge: "ai",
    eyebrow: "AI AGENT · AUTOMATION",
    category: "AI ENGINEERING",
    titleLines: ["CURATION", "AGENT"],
    year: "2026",
    role: "AI AUTOMATION ENG",
    videoPath: "/images/ai-curator video.webm",
    imagePath: "/images/ai-curator.webp",
    techStack: [
      { label: "CORE", quote: "MAKE.COM, WEBHOOKS" },
      { label: "AI", quote: "GOOGLE GEMINI" },
    ],
    description: "AI-driven system that autonomously collects, analyzes, and publishes weekly briefings on AI technology trends. Reduces manual research effort by 80% through automated content aggregation and publishing to 'The Sunday Algorithm' LinkedIn newsletter.",
    stats: { timeline: "1 MONTH", platform: "AUTOMATION", github: "Private", live: "LinkedIn", role: "AI ENG" },
  },
  {
    title: "Chat Index Extension",
    desc: "TypeScript-powered browser extension for efficient chat indexing and search across multiple platforms. Features include full-text search, conversation tagging, and quick navigation to historical chat messages, built with modern architecture and type safety.",
    subdesc: "TypeScript · Vite · Chrome Extension API",
    href: "https://github.com/Abhay-Maheshwari/Chat-Index-Extension",
    texture: "/images/chat - index.webp",
    tags: [
      { id: 1, name: "TypeScript", path: "/images/logos/react.webp" },
      { id: 2, name: "Vite", path: "/images/logos/react.webp" },
    ],
    id: "chat-index-extension",
    badge: "extension",
    eyebrow: "BROWSER EXT · PRODUCTIVITY",
    category: "EXTENSION DEV",
    titleLines: ["CHAT INDEX"],
    year: "2025",
    role: "EXTENSION DEV",
    videoPath: "",
    imagePath: "/images/chat - index.webp",
    techStack: [
      { label: "CORE", quote: "TYPESCRIPT, VITE" },
      { label: "APIS", quote: "CHROME EXTENSION API, STORAGE" },
    ],
    description: "TypeScript-powered browser extension for efficient chat indexing and search across multiple platforms. Features include full-text search, conversation tagging, and quick navigation to historical chat messages, built with modern architecture and type safety.",
    stats: { timeline: "2 MONTHS", platform: "CHROME", github: "github.com/Abhay-Maheshwari/Chat-Index-Extension", live: "Chrome Store", role: "FRONTEND" },
  },
  {
    title: "FocusShift Browser Extension",
    desc: "In-development browser extension designed to boost productivity with intelligent focus management and distraction blocking. Features include customizable block lists, focus mode timers, and a modern, clean UI with seamless browser integration.",
    subdesc: "JavaScript · Chrome Extension API · Productivity",
    href: "https://github.com/Abhay-Maheshwari/FocusShift",
    texture: "/images/FocusShift.webp",
    tags: [
      { id: 1, name: "JavaScript", path: "/images/logos/react.webp" },
      { id: 2, name: "Chrome Ext", path: "/images/logos/react.webp" },
    ],
    id: "focus-shift",
    badge: "productivity",
    eyebrow: "BROWSER EXT · FOCUS",
    category: "EXTENSION DEV",
    titleLines: ["FOCUS", "SHIFT"],
    year: "2026",
    role: "PRODUCTIVITY DEV",
    videoPath: "/images/focus shift.webm",
    imagePath: "/images/FocusShift.webp",
    techStack: [
      { label: "CORE", quote: "JAVASCRIPT" },
      { label: "APIS", quote: "CHROME EXTENSION API, STORAGE" },
    ],
    description: "In-development browser extension designed to boost productivity with intelligent focus management and distraction blocking. Features include customizable block lists, focus mode timers, and a modern, clean UI with seamless browser integration.",
    stats: { timeline: "IN PROGRESS", platform: "CHROME", github: "github.com/Abhay-Maheshwari/FocusShift", live: "WIP", role: "FRONTEND" },
  },
  {
    title: "Smart Task Planner",
    desc: "AI-powered task planning application using local LLMs (Ollama) to break down complex goals into actionable tasks with realistic time estimates. Features smart dependency management and iterative refinement through natural language interaction. Runs entirely locally.",
    subdesc: "TypeScript · React · Ollama · FastAPI",
    href: "https://github.com/Abhay-Maheshwari/Smart-Task-Planner",
    texture: "/images/TaskFlow.webp",
    tags: [
      { id: 1, name: "React", path: "/images/logos/react.webp" },
      { id: 2, name: "FastAPI", path: "/images/logos/python.svg" },
      { id: 3, name: "Ollama", path: "/images/logos/python.svg" },
    ],
    id: "smart-task-planner",
    badge: "ai",
    eyebrow: "AI APP · PLANNING",
    category: "AI DEVELOPMENT",
    titleLines: ["SMART TASK", "PLANNER"],
    year: "2026",
    role: "AI APP DEV",
    videoPath: "/images/TaskFlow.webm",
    imagePath: "/images/TaskFlow.webp",
    techStack: [
      { label: "FRONTEND", quote: "TYPESCRIPT, REACT" },
      { label: "AI & BACKEND", quote: "OLLAMA, LOCAL AI, FASTAPI" },
    ],
    description: "AI-powered task planning application using local LLMs (Ollama) to break down complex goals into actionable tasks with realistic time estimates. Features smart dependency management and iterative refinement through natural language interaction. Runs entirely locally.",
    stats: { timeline: "2 MONTHS", platform: "WEB", github: "github.com/Abhay-Maheshwari/Smart-Task-Planner", live: "Local", role: "AI DEV" },
  }
];

const techStackIcons = [
  // Technical Skills
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, -Math.PI, 0],
    category: "tech"
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, -Math.PI, 0],
    category: "tech"
  },
  {
    name: "Node.js",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
    category: "tech"
  },
  {
    name: "Three.js",
    modelPath: "/models/three.js-transformed.glb",
    scale: 1.3,
    rotation: [0, -Math.PI / 4, 0],
    category: "tech"
  },


  // Roles
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
    category: "role"
  },
  {
    name: "Product Manager",
    modelPath: "/models/react_logo-transformed.glb", // Reusing React model
    scale: 1,
    rotation: [0, 0, 0],
    category: "role"
  },
  {
    name: "Content Creator",
    modelPath: "/models/python-transformed.glb", // Reusing Python model
    scale: 0.8,
    rotation: [0, -Math.PI, 0],
    category: "role"
  },
];

const expCards = [
  {
    review: "Led development of two enterprise applications: Visitor Management System (VMS) and R|Elan CMS. Delivered 160+ tasks for VMS including full-stack features, security hardening (AES-256 encryption, HP Fortify remediation), Kubernetes deployment, and CI/CD pipelines. Built 55+ CMS features for dynamic content management with AWS S3 media storage. Resolved 32+ vulnerabilities, achieved SonarQube & BlackDuck compliance, and established multi-environment infrastructure.",
    title: "Software Development Intern",
    company: "Reliance Industries Limited",
    roleType: "MNC",
    date: "Jan–May 2025",
    technologies: [
      { name: "Angular 18", featured: true },
      { name: "Spring Boot", featured: true },
      { name: "Kubernetes", featured: false },
      { name: "AWS S3", featured: false },
      { name: "MySQL", featured: false },
      { name: "Redis", featured: false },
      { name: "Java 17", featured: false }
    ],
  },
  {
    review: "Designed and developed multi-table SAP reports using ABAP programming for seamless data integration. Created custom database tables and maintenance generators. Executed data migration ensuring data integrity and presented RICEFW framework best practices for transport management.",
    title: "SAP ABAP Project Intern",
    company: "Protiviti India Member Firm",
    roleType: "Consulting",
    date: "May–Jun 2025",
    technologies: [
      { name: "SAP ABAP", featured: true },
      { name: "SQL", featured: false },
      { name: "Data Migration", featured: false },
      { name: "RICFW", featured: false }
    ],
  },
  {
    review: "Directed technical strategy for cloud-based hosting platform, deploying 20+ client servers. Managed end-to-end client communications and service delivery. Spearheaded quality assurance processes including plugin testing, vulnerability analysis, and performance optimization.",
    title: "Technical Lead & Co-Founder",
    company: "iCave Enterprises",
    roleType: "Startup",
    date: "Jan–May 2024",
    technologies: [
      { name: "Server Management", featured: true },
      { name: "Ionos", featured: false },
      { name: "Plesk", featured: false },
      { name: "RabbitMQ", featured: false }
    ],
  },
  {
    review: "Guiding a 40+ member team and mentoring juniors through large-scale events pushed me to think like a strategist, balancing technical depth with accessibility. The role showed me that real impact comes from empowering people and building a culture where ideas can thrive.",
    title: "Chairperson",
    company: "IEEE PCS Student Chapter",
    roleType: "Academic",
    date: "Apr 2024–Apr 2025",
    technologies: [
      { name: "Event Management", featured: false },
      { name: "Leadership", featured: true },
      { name: "Public Speaking", featured: false },
      { name: "Team Building", featured: false }
    ],
  },
];

const expLogos = [
  {
    name: "Reliance",
    imgPath: "/images/reliance.webp",
  },
  {
    name: "Protiviti",
    imgPath: "/images/protiviti.webp",
  },
  {
    name: "iCave",
    imgPath: "/images/logo2.webp",
  },
  {
    name: "IEEE",
    imgPath: "/images/logo3.webp",
  },
];

const testimonials = [
  {
    name: "Oracle Cloud Infrastructure",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Demonstrated foundational knowledge of Oracle Cloud Infrastructure services, core concepts, and cloud computing principles.",
    imgPath: "/images/logos/oracle.svg",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0CCEAAE647C2189A33A8663AB15C0824B8E8CFFE7266A3FDED8DA0FCB93CFD70",
  },
  {
    name: "Oracle Data Platform",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Certified in Oracle Data Platform fundamentals including data management, analytics, and database services.",
    imgPath: "/images/logos/oracle.svg",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C6F5C9E1C822240A2C71F1F16E5E4104932493D545B7BD8F8965BA54E542443C",
  },
  {
    name: "Oracle Fusion AI Agent Studio",
    mentions: "Foundations Associate - Rel 1",
    review:
      "Foundational certification in Oracle AI/ML capabilities and Fusion applications architecture.",
    imgPath: "/images/logos/oracle.svg",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=44368F567B96BE67522E8359DD32A2538AFACB55A2DAB94D5107415DCD53CACF",
  },
  {
    name: "NVIDIA Deep Learning Institute",
    mentions: "DLI Certificate in Deep Learning",
    review:
      "Completed hands-on training in deep learning fundamentals, neural networks, and GPU-accelerated computing.",
    imgPath: "/images/logos/nvidia.webp",
    verifyUrl: "https://drive.google.com/file/d/1D2orgW9GhdT8-MWHu8bKQSKmbQ_6gTU4/view?usp=sharing",
  },
];

const socialImgs = [
  {
    name: "linkedin",
    imgPath: "/images/linkedin.webp",
  },
  {
    name: "github",
    imgPath: "/images/git.svg",
  },
];

export {


  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  navLinks,
  owner,
  educationList,
  projects,
  skillsData
};
