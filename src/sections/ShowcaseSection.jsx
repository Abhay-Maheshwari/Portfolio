import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LazyVideo from "../components/LazyVideo";
import { projects } from "../constants";

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

  const [project1, project2, project3, project4] = projects;

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={project1Ref} className="first-project-wrapper">
            <LazyVideo
              src="/images/project01.mp4"
              alt={project1.title}
              className="video-main"
            />
            <label htmlFor="video"><div className="text-content">
              <h2>
                {project1.title}
              </h2>
              <p className="text-white-50 md:text-xl">
                {project1.desc}
              </p>
            </div></label>

            <div className="project" ref={project2Ref}>
              <LazyVideo
                src="/images/proj2.mp4"
                alt={project2.title}
                className="video-wide"
              />

              <label htmlFor="video"><div className="text-content">
                <h2>
                  {project2.title}
                </h2>
                <p className="text-white-50 md:text-xl">
                  {project2.desc}
                </p>
              </div></label>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project3Ref}>
              <LazyVideo
                src="/images/proj2.mp4"
                alt={project3.title}
                className="rounded-2xl"
              />

              <label htmlFor="video"><div className="text-content">
                <h2>
                  {project3.title}
                </h2>
                <p className="text-white-50 md:text-xl">
                  {project3.desc}
                </p>
              </div></label>
            </div>

            <div className="project" ref={project4Ref}>
              <LazyVideo
                src="/images/project01.mp4"
                alt={project4.title}
                className="rounded-2xl"
              />
              <label htmlFor="video"><div className="text-content">
                <h2>
                  {project4.title}
                </h2>
                <p className="text-white-50 md:text-xl">
                  {project4.desc}
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
