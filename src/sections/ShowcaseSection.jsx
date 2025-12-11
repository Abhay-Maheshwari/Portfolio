import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LazyVideo from "../components/LazyVideo";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;

    // Card dimensions (must match CSS)
    const cardWidth = window.innerWidth >= 768 ? 800 : window.innerWidth * 0.85;
    const gap = window.innerWidth >= 768 ? 80 : 40;
    const titleWidth = window.innerWidth >= 768 ? 600 : window.innerWidth * 0.8;

    // The 9 spacer cards offset the INITIAL scroll position when clicking #work
    // The ACTUAL content we need to scroll through is: title + 8 projects
    // We want to stop when project 08's left edge is at the screen's left edge

    // Calculate the scroll distance for the ACTUAL content only:
    // = titleWidth + gap + (7 projects * (cardWidth + gap)) + buffer
    // (7 projects because the 8th one should be at left edge, not scrolled past)
    const actualScrollDistance =
      titleWidth + gap +  // title block and its gap
      (7 * (cardWidth + gap)) + // 7 projects with their gaps (before the last one)
      260; // buffer to reach ~7500px total

    const getScrollAmount = () => {
      return -actualScrollDistance;
    };

    const getScrollDistance = () => {
      return actualScrollDistance;
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        invalidateOnRefresh: true,
      }
    });

  }, []);

  return (
    <>
      {/* Anchor for navigation - this creates a scroll target at the start of the section */}
      <div id="work" style={{ position: 'relative', top: '-100px' }} aria-hidden="true" />

      <div ref={sectionRef} className="app-showcase relative overflow-x-hidden overflow-y-hidden h-screen bg-black !mt-0 !py-0 !px-0 flex items-center">

        {/* Background ambient glow/gradients could go here for extra premium feel */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px]" />
        </div>

        {/* Main Track */}
        <div
          ref={trackRef}
          className="flex gap-10 md:gap-20 px-5 md:px-20 h-full items-center w-max"
        >
          {/* 9 Blank spacer cards to offset the scroll position */}
          {[...Array(9)].map((_, i) => (
            <div
              key={`spacer-${i}`}
              className="w-[85vw] md:w-[800px] h-[60vh] md:h-[70vh] shrink-0"
              aria-hidden="true"
            />
          ))}

          {/* Intro/Title Block */}
          <div className="w-[80vw] md:w-[600px] shrink-0 flex flex-col justify-center items-start">
            <h2 className="text-4xl md:text-8xl font-bold font-serif leading-tight text-white mb-6">
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Works</span>
            </h2>
            <p className="text-white-50 text-lg md:text-xl max-w-md leading-relaxed">
              A collection of digital products, experiences, and tools built with precision and passion.
            </p>
            <div className="flex gap-4 mt-8">
              <span className="px-4 py-2 border border-white/20 rounded-full text-sm text-white-50">8 Projects</span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-sm text-white-50">2024-2025</span>
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative w-[85vw] md:w-[800px] h-[60vh] md:h-[70vh] shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-black-200 transition-all duration-500 hover:border-white/30"
            >
              {/* Image/Video Container */}
              <div className="absolute inset-0 w-full h-full">
                <LazyVideo
                  src={index % 2 === 0 ? "/images/project01.mp4" : "/images/proj2.mp4"}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start z-10">

                {/* Index Number */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-6xl md:text-8xl font-bold text-white/5 font-serif select-none">
                  0{index + 1}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {project.tags.map((tag) => (
                    <span key={tag.id} className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full text-white">
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h3>

                {/* Desc */}
                <p className="text-white-50 text-base md:text-lg max-w-xl mb-8 line-clamp-2 md:line-clamp-none">
                  {project.desc}
                </p>

                {/* Links */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wide hover:bg-blue-400 hover:text-white transition-all duration-300"
                >
                  VIEW PROJECT
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}

          {/* End Spacer */}

        </div>
      </div>
    </>
  );
};

export default AppShowcase;
