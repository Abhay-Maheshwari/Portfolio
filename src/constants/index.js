
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
    name: "Certifications",
    link: "#testimonials",
  },
];

// Site owner metadata used across the app
const owner = {
  name: "Abhay Maheshwari",
  role: "Software Engineer",
  email: "maheshwariabhay49@gmail.com",
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

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Innovation-Driven",
    desc: "Always exploring new technologies, AI tools, and creative approaches to deliver solutions that are not just functional but forward-thinking.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Clear & Impactful Communication",
    desc: "Skilled at breaking down complex technical ideas into simple, actionable insights and ensuring teams, clients, and juniors stay aligned.",
  },
  {
    imgPath: "/images/time.png",
    title: "End-to-End Ownership",
    desc: "From ideation to execution, I take complete responsibility — balancing engineering precision, product thinking, and creative direction to deliver with consistency.",
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
  {
    id: 2,
    institution: "Gyan Ganga International Academy, Bhopal",
    date: "June 2021 - April 2022",
    degree: "CBSE - Class 12th",
    grade: "88.2%",
    desc: "Specialized in Science with Mathematics.",
    icon: "/images/logos/logo-placeholder.png"
  },
  {
    id: 3,
    institution: "Billabong High International School, Bhopal",
    date: "June 2019 - April 2020",
    degree: "ICSE - Class 10th",
    grade: "92.8%",
    desc: "Strong foundation in mathematics and computer applications.",
    icon: "/images/logos/logo-placeholder.png"
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
    href: "https://github.com/abhay-maheshwari",
    texture: "/images/project1.png", // placeholder
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
        path: "/images/logos/react.png", // placeholder
      },
    ],
  },
  {
    title: "Autonomous AI Curation Agent",
    desc: "Developed an AI-driven system that autonomously collects, analyzes, and publishes weekly briefings on AI tech trends. 80% reduction in manual research effort.",
    subdesc: "Built using Make.com, Gemini, Webhooks",
    href: "https://github.com/abhay-maheshwari",
    texture: "/images/project2.png", // placeholder
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "Make.com",
        path: "/images/logos/react.png", // placeholder
      },
      {
        id: 2,
        name: "Gemini",
        path: "/images/logos/react.png", // placeholder
      },
    ],
  },
  {
    title: "Holdings Manager Tool",
    desc: "Engineered fintech tool processing 10M+ assets, automating consolidation of 15+ accounts. Architected interactive dashboards serving 100+ users.",
    subdesc: "Built with Python, Streamlit, Pandas, SQL",
    href: "https://github.com/abhay-maheshwari",
    texture: "/images/project3.png", // placeholder
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/images/logos/python.svg",
      },
      {
        id: 2,
        name: "Pandas",
        path: "/images/logos/react.png", // placeholder
      },
    ],
  },
  {
    title: "Web Game Automation Framework",
    desc: "Constructed an extensible automation framework tested across multiple web-based games. Refined DOM handling to reduce redundant browser interactions by 200%.",
    subdesc: "Built with Python, Selenium, OOP",
    href: "https://github.com/abhay-maheshwari",
    texture: "/images/project4.png", // placeholder
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
        path: "/images/logos/react.png", // placeholder
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
    scale: 0.8,
    rotation: [0, 0, 0],
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
    responsibilities: [
      "Designed and developed multi-table SAP reports using ABAP programming.",
      "Created custom database tables and maintenance generators.",
      "Executed data migration ensuring data integrity.",
      "Presented RICEFW framework and best practices for transport management.",
    ],
  },
  {
    review: "Directed technical strategy for cloud-based hosting platform, deploying 20+ client servers. Managed end-to-end client communications and service delivery. Spearheaded quality assurance processes including plugin testing, vulnerability analysis, and performance optimization.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Technical Lead & CoFounder",
    company: "iCave Enterprises",
    date: "Jan 2021 - May 2024",
    responsibilities: [
      "Directed technical strategy and infrastructure for cloud-based hosting platform.",
      "Deployed 20+ client servers and managed client communications.",
      "Spearheaded quality assurance, plugin testing, and vulnerability analysis.",
      "Optimized multiplayer systems and performance.",
    ],
  },
  {
    review: "Guiding a 30-member team and mentoring juniors through large-scale events pushed me to think like a strategist, balancing technical depth with accessibility. The role showed me that real impact comes from empowering people and building a culture where ideas can thrive.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Chairperson",
    company: "Student Chapter",
    date: "April 2024 - April 2025",
    responsibilities: [
      "Led a 30-member team and coordinated 25+ technical events.",
      "Mentored junior members for future leadership roles.",
      "Managed event content — workshops, speaker sessions, and awareness programs.",
      "Oversaw budgeting, logistics, and stakeholder communication.",
    ],
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
  },
  {
    name: "Oracle Data Platform",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Certified in Oracle Data Platform fundamentals including data management, analytics, and database services.",
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    name: "Oracle Fusion AI",
    mentions: "2025 Certified Foundations Associate",
    review:
      "Foundational certification in Oracle AI/ML capabilities and Fusion applications architecture.",
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    name: "NVIDIA Deep Learning Institute",
    mentions: "DLI Certificate in Deep Learning",
    review:
      "Completed hands-on training in deep learning fundamentals, neural networks, and GPU-accelerated computing.",
    imgPath: "/images/logos/company-logo-5.png",
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
  abilities,
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
