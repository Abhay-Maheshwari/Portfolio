import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons, skillsData } from "../constants";

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // This animation is triggered when the user scrolls to the #skills wrapper
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );

    // Animate the detailed skills categories
    gsap.fromTo(
      ".skill-category",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".skills-list-container",
          start: "top 80%",
        },
      }
    );
  });

  // Filter only tech category items
  const techSkills = techStackIcons.filter((t) => t.category === "tech");

  return (
    <div id="skills" className="section-padding min-h-dvh w-full flex flex-col items-center justify-center">
      <div className="w-full md:px-10 px-5 mb-10">
        <TitleHeader
          title="Technical Skills"
          sub="🛠️ Tools & Technologies"
        />
        <div className="tech-grid">
          {techSkills.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group rounded-3xl"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Skills List */}
      <div className="w-full md:px-10 px-5 skills-list-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={category.category}
              className="skill-category p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full inline-block" />
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-white-50 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default TechStack;
