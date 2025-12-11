
const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Education",
    link: "#education",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Contact",
    link: "#contact",
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

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Clients Served" },
  { value: 25, suffix: "+", label: "Events & Projects" },
  { value: 8.81, suffix: "", label: "VIT CGPA" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
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
    icon: "/images/logos/logo-placeholder.png",
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
    skills: ["Python", "Java", "SQL", "C++", "JavaScript", "HTML", "CSS", "SAP ABAP"]
  },
  {
    category: "Frameworks & Technologies",
    skills: ["ASP.NET", "React.js", "FastAPI", "Streamlit", "Pandas", "Selenium", "MySQL", "Git", "AWS"]
  },
  {
    category: "Data & Automation",
    skills: ["Data Visualization", "Reporting Solutions", "Web Automation", "OOP", "Data Structures", "Algorithms"]
  }
];

const projects = [
  {
    title: "Scalable LLM Fine-Tuning Platform",
    desc: "Built full-stack platform for local LLM fine-tuning with automated evaluation (10+ metrics), cutting testing time by 70%. Developed FastAPI backend with 45+ REST endpoints.",
    subdesc: "Built with Python, FastAPI, Streamlit, Ollama, REST API",
    href: "https://github.com/Abhay-Maheshwari/FineTuning-Project",
    texture: "/images/project1.png",
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/images/logos/python.svg",
      },
      {
        id: 2,
        name: "FastAPI",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "Smart Task Planner",
    desc: "AI-powered task planning app using Ollama to break down complex goals into actionable tasks with realistic time estimates and smart dependency management.",
    subdesc: "Built with TypeScript, React, Ollama, Local AI",
    href: "https://github.com/Abhay-Maheshwari/Smart-Task-Planner",
    texture: "/images/project2.png",
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "TypeScript",
        path: "/images/logos/react.png",
      },
      {
        id: 2,
        name: "React",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "Holdings Manager Tool",
    desc: "Engineered fintech tool processing 10M+ assets, automating consolidation of 15+ accounts. Architected interactive dashboards serving 100+ users with pivot generation.",
    subdesc: "Built with TypeScript, Python, Streamlit, Pandas, SQL",
    href: "https://github.com/Abhay-Maheshwari/HoldingManager",
    texture: "/images/project3.png",
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "TypeScript",
        path: "/images/logos/python.svg",
      },
      {
        id: 2,
        name: "Streamlit",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "Web Game Automation Framework",
    desc: "Constructed an extensible automation framework tested across multiple web-based games. Refined DOM handling to reduce redundant browser interactions by 200%.",
    subdesc: "Built with Python, Selenium, OOP",
    href: "https://github.com/Abhay-Maheshwari/Web-Game-Automation",
    texture: "/images/project4.png",
    spotlight: "/assets/spotlight4.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/images/logos/python.svg",
      },
      {
        id: 2,
        name: "Selenium",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "FocusShift Browser Extension",
    desc: "In-development browser extension designed to boost productivity with intelligent focus management and distraction blocking. Modern UI with seamless browser integration.",
    subdesc: "Built with JavaScript, Browser APIs, Chrome Extension",
    href: "https://github.com/Abhay-Maheshwari/FocusShift",
    texture: "/images/project1.png",
    spotlight: "/assets/spotlight5.png",
    tags: [
      {
        id: 1,
        name: "JavaScript",
        path: "/images/logos/react.png",
      },
      {
        id: 2,
        name: "Extension",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "hackSimulator",
    desc: "Interactive hacking simulator game with realistic terminal UI and engaging gameplay. Built for fun while demonstrating frontend skills and creative problem-solving.",
    subdesc: "Built with JavaScript, HTML, CSS",
    href: "https://github.com/Abhay-Maheshwari/hackSimulator",
    texture: "/images/project2.png",
    spotlight: "/assets/spotlight6.png",
    tags: [
      {
        id: 1,
        name: "JavaScript",
        path: "/images/logos/react.png",
      },
      {
        id: 2,
        name: "Game Dev",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "Chat Index Extension",
    desc: "TypeScript-powered browser extension for efficient chat indexing and search. Demonstrates proficiency in TypeScript and browser extension development.",
    subdesc: "Built with TypeScript, Browser APIs",
    href: "https://github.com/Abhay-Maheshwari/Chat-Index-Extension",
    texture: "/images/project3.png",
    spotlight: "/assets/spotlight7.png",
    tags: [
      {
        id: 1,
        name: "TypeScript",
        path: "/images/logos/react.png",
      },
      {
        id: 2,
        name: "Extension",
        path: "/images/logos/react.png",
      },
    ],
  },
  {
    title: "Autonomous AI Curation Agent",
    desc: "Developed an AI-driven system that autonomously collects, analyzes, and publishes weekly briefings on AI tech trends. 80% reduction in manual research effort.",
    subdesc: "Built using Make.com, Gemini, Webhooks",
    href: "https://github.com/Abhay-Maheshwari",
    texture: "/images/project4.png",
    spotlight: "/assets/spotlight8.png",
    tags: [
      {
        id: 1,
        name: "Make.com",
        path: "/images/logos/react.png",
      },
      {
        id: 2,
        name: "Gemini",
        path: "/images/logos/react.png",
      },
    ],
  },
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
    review: "Designed and developed multi-table SAP reports using ABAP programming for seamless data integration. Created custom database tables and maintenance generators. Executed data migration ensuring data integrity and presented RICEFW framework best practices for transport management.",
    imgPath: "/images/protiviti.png",
    logoPath: "/images/logo1.png",
    title: "SAP ABAP Project Intern",
    company: "Protiviti India Member Firm",
    date: "May 2025 - June 2025",
    technologies: ["SAP ABAP", "SQL", "Data Migration", "RICEFW"],
  },
  {
    review: "Directed technical strategy for cloud-based hosting platform, deploying 20+ client servers. Managed end-to-end client communications and service delivery. Spearheaded quality assurance processes including plugin testing, vulnerability analysis, and performance optimization.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Technical Lead & CoFounder",
    company: "iCave Enterprises",
    date: "Jan 2021 - May 2024",
    technologies: ["Server Management", "Ionos", "Pterodactyl", "Bukkit"],
  },
  {
    review: "Guiding a 40+ member team and mentoring juniors through large-scale events pushed me to think like a strategist, balancing technical depth with accessibility. The role showed me that real impact comes from empowering people and building a culture where ideas can thrive.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Chairperson",
    company: "Student Chapter",
    date: "April 2024 - April 2025",
    technologies: ["Event Management", "Leadership", "Public Speaking", "Team Building"],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Oracle Cloud Infrastructure",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Demonstrated foundational knowledge of Oracle Cloud Infrastructure services, core concepts, and cloud computing principles.",
    imgPath: "/images/logos/company-logo-2.png",
    verifyUrl: "#", // TODO: Add Oracle verification URL
  },
  {
    name: "Oracle Data Platform",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Certified in Oracle Data Platform fundamentals including data management, analytics, and database services.",
    imgPath: "/images/logos/company-logo-2.png",
    verifyUrl: "#", // TODO: Add Oracle verification URL
  },
  {
    name: "Oracle Fusion AI",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Foundational certification in Oracle AI/ML capabilities and Fusion applications architecture.",
    imgPath: "/images/logos/company-logo-2.png",
    verifyUrl: "#", // TODO: Add Oracle verification URL
  },
  {
    name: "NVIDIA Deep Learning Institute",
    mentions: "DLI Certificate in Deep Learning",
    review:
      "Completed hands-on training in deep learning fundamentals, neural networks, and GPU-accelerated computing.",
    imgPath: "/images/logos/company-logo-5.png",
    verifyUrl: "#", // TODO: Add NVIDIA DLI verification URL
  },
];

const socialImgs = [
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
  {
    name: "github",
    imgPath: "/images/git.svg",
  },
];

export {
  words,

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
