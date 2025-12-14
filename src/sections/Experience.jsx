import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { expCards } from "../constants";
import MaskRevealTitle from "../components/MaskRevealTitle";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".experience-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          rotateX: -10
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Timeline line animation
    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] opacity-30" />

      <div className="container mx-auto px-5">
        <MaskRevealTitle
          title="Work Experience"
          className="mb-20"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line - Adjusted for mobile */}
          <div className="absolute left-[30px] md:left-[40px] top-0 bottom-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent timeline-line" />

          <div className="space-y-24">
            {expCards.map((card, index) => (
              <div
                key={index}
                className="experience-card relative flex gap-8 md:gap-12"
              >
                {/* Timeline Node - Better mobile positioning */}
                <div className="absolute left-[30px] md:left-[40px] w-4 h-4 rounded-full bg-white border-4 border-black-200 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20 transform -translate-x-1/2 mt-10 transition-transform duration-300 hover:scale-150" />

                {/* Content Side - Improved mobile spacing */}
                <div className="w-full pl-16 md:pl-24">
                  <div className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-300">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top: Responsive Logo Section */}
                    <div className="h-40 w-full bg-black/40 border-b border-white/5 flex items-center justify-start relative overflow-hidden group-hover:bg-black/50 transition-colors duration-500">
                      {/* Subtle background glow behind logo */}
                      <div className="absolute left-10 bg-blue-500/20 w-56 h-56 blur-[100px] rounded-full" />

                      <div className="relative z-10 p-4 h-full flex items-center justify-start pl-8">
                        <img
                          src={card.imgPath}
                          alt={card.company}
                          className="max-h-full w-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* Bottom: Details Section - Better mobile padding */}
                    <div className="p-5 md:p-8 relative z-10">

                      <h3 className="text-2xl font-bold text-white leading-tight mb-1">{card.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                        <p className="text-base text-blue-300 font-medium">{card.company}</p>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-sm font-light text-white/60">
                          {card.date}
                        </span>
                      </div>

                      {/* Content */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4 py-1 italic">
                        "{card.review}"
                      </p>

                      {/* Technology Tags */}
                      {card.technologies && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {card.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
