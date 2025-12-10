const navLinks = [
  {
    name: "Work",
    link: "#work",
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
    name: "Testimonials",
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

  //SAP, Oracle, IEEE, GitHub, AWS, Streamlit, Canva, VIT, Figma
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
  // {
  //   imgPath: "/images/logos/company-logo-9.png",
  // },
  // {
  //   imgPath: "/images/logos/company-logo-10.png",
  // },
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

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
  {
    name: "Product Manager",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Content Creator",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "UI/UX Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Cloud Computing",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "GitHub",
    imgPath: "/images/logos/git.svg",
  },



];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, -Math.PI, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, -Math.PI, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "SAP ABAP Developer",
    modelPath: "/models/base.glb",
    scale: 3,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
  {
    name: "Product Manager",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Content Creator",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, -Math.PI, 0],
  },
  {
    name: "UI/UX Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Cloud Computing",
    modelPath: "/models/base.glb",
    scale: 3,
    rotation: [0, 0, 0],
  },
  {
    name: "GitHub",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Gained hands-on exposure to SAP ABAP development, learning how multi-table reports, database structures, and the RICEFW framework shape enterprise systems. The experience gave me practical skills in transport management, data migration, and professional consulting practices.",
    imgPath: "/images/protiviti.png",
    logoPath: "/images/logo1.png",
    title: "SAP ABAP Developer",
    date: "May 2025 - June 2025",
    responsibilities: [
      "Built and tested ABAP reports integrating MARA and MAKT data.",
      "Created custom tables and maintenance generators for user data handling.",
      "Learned to apply RICEFW framework and transport requests for system rollouts.",
      "Completed corporate training on data security, POSH, and knowledge management.",
    ],
  },
  {
    review: "Learned the end-to-end process of running a tech venture, from deploying servers and managing clients to overseeing content creation, and product management. This experience taught me how technical delivery, creative strategy, and business decision-making come together to scale real-world solutions.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Co-Founder & CTO",
    date: "Jan 2020 – May 2025",
    responsibilities: [
      " Deployed 20+ client servers across multiple hosting platforms.",
      "Handled client communications, delivery, and troubleshooting.",
      "Tested plugins, fixed vulnerabilities, and optimized multiplayer systems.",
      "Gained experience in marketing through AI-driven content creation.",
    ],
  },
  {
    review: "Being Chairperson taught me that leadership is more than coordination .. it’s about setting direction and creating space for others to grow. Guiding a 30-member team and mentoring juniors through large-scale events pushed me to think like a strategist, balancing technical depth with accessibility and short-term execution with long-term vision. More than anything, the role showed me that real impact comes from empowering people and building a culture where ideas can thrive.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Chairperson",
    date: "April 2024 - April 2025",
    responsibilities: [
      "Led a 30-member team and coordinated 25+ technical events.",

      "Mentored junior members, preparing them for future leadership roles.",

      "Managed event content — workshops, speaker sessions, and awareness programs.",

      "Oversaw budgeting, logistics, and stakeholder communication",
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
  techStackImgs,
  navLinks,
  owner,
};
