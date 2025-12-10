import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LazyVideo from "../components/LazyVideo";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
      project4Ref.current,
    ].filter(Boolean);

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={project1Ref} className="first-project-wrapper">
            <LazyVideo
              src="/images/project01.mp4"
              alt="Holdings Manager App Demo"
              className="video-main"
            />
            <label htmlFor="video"><div className="text-content">
              <h2>
                Holdings Manager
              </h2>
              <p className="text-white-50 md:text-xl">
                A secure fintech tool built with Python, Streamlit, and Pandas to consolidate multi-account shareholding data, automate reconciliation, and deliver dynamic, user-centric reporting.
              </p>
            </div></label>

            <div className="project" ref={project2Ref}>
              <LazyVideo
                src="/images/proj2.mp4"
                alt="AI Training Research Demo"
                className="video-wide"
              />

              <label htmlFor="video"><div className="text-content">
                <h2>
                  Code-Enhanced AI Training Research
                </h2>
                <p className="text-white-50 md:text-xl">
                  An AI research initiative using Ollama and Python to fine-tune three Llama models on retail operations data. This project proved that augmenting training datasets with code slashes model hallucination rates by 40%, enhancing reliability for real-world business analytics.
                </p>
              </div></label>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project3Ref}>
              <LazyVideo
                src="/images/proj2.mp4"
                alt="Web Game Automation Demo"
                className="rounded-2xl"
              />

              <label htmlFor="video"><div className="text-content">
                <h2>
                  Web Game Automation Framework
                </h2>
                <p className="text-white-50 md:text-xl">
                  An extensible Python automation framework using Selenium and OOP design patterns. Optimized DOM handling and wait strategies improved runtime efficiency, reducing redundant browser interactions by 200%.
                </p>
              </div></label>
            </div>

            <div className="project" ref={project4Ref}>
              <LazyVideo
                src="/images/project01.mp4"
                alt="3D Portfolio Demo"
                className="rounded-2xl"
              />
              <label htmlFor="video"><div className="text-content">
                <h2>
                  3D Interactive Portfolio
                </h2>
                <p className="text-white-50 md:text-xl">
                  Built with React, Three.js, and WebGL featuring complex GSAP animation sequences, interactive glow cards, animated counters, and responsive 3D modeling with 99.9% uptime.
                </p>
              </div></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
