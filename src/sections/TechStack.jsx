import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import BackgroundDust from "../components/models/BackgroundDust";
import { skillsData } from "../constants";
import SpotlightCard from "../components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const deviconMap = {
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "Java 17": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "Angular 19": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
    "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "AWS S3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Azure Pipelines": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "SonarQube": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg",
    "Streamlit": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg",
};

const categoryStyles = {
  "Programming Languages": {
    spot: "rgba(244, 114, 182, 0.2)",
    bg: "bg-gradient-to-br from-pink-500/15 via-[#13151a]/80 to-[#13151a]/90",
    border: "border-pink-500/20 group-hover:border-pink-500/40",
    accent: "bg-pink-400",
    textStroke: "rgba(244, 114, 182, 0.3)"
  },
  "Frameworks & Technologies": {
    spot: "rgba(34, 211, 238, 0.2)",
    bg: "bg-gradient-to-br from-cyan-500/15 via-[#13151a]/80 to-[#13151a]/90",
    border: "border-cyan-500/20 group-hover:border-cyan-500/40",
    accent: "bg-cyan-400",
    textStroke: "rgba(34, 211, 238, 0.3)"
  },
  "DevOps & Security": {
    spot: "rgba(52, 211, 153, 0.2)",
    bg: "bg-gradient-to-br from-emerald-500/15 via-[#13151a]/80 to-[#13151a]/90",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    accent: "bg-emerald-400",
    textStroke: "rgba(52, 211, 153, 0.3)"
  },
  "Data & Automation": {
    spot: "rgba(251, 191, 36, 0.2)",
    bg: "bg-gradient-to-br from-amber-500/15 via-[#13151a]/80 to-[#13151a]/90",
    border: "border-amber-500/20 group-hover:border-amber-500/40",
    accent: "bg-amber-400",
    textStroke: "rgba(251, 191, 36, 0.3)"
  }
};

const getInitials = (skillName) => {
    const words = skillName.split(/[\s-]+/);
    if (words.length > 1) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return skillName.substring(0, 3).toUpperCase();
};

const TechStack = () => {
    const sectionRef = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState(null);
    
    // Centralized closing function with GSAP exit animation
    const closeModal = () => {
        if (!overlayRef.current || !modalRef.current) {
            setActiveCategory(null);
            return;
        }

        // Fast icon exit
        gsap.to(".modal-app-icon", {
            scale: 0, opacity: 0, rotationY: -45,
            duration: 0.2,
            stagger: 0.01,
            ease: "power2.in"
        });

        // Box scale down
        gsap.to(modalRef.current, { scale: 0.95, y: 10, duration: 0.25, ease: "power2.in" });
        
        // Full overlay fade out (triggers state clear on complete)
        gsap.to(overlayRef.current, { 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.inOut",
            onComplete: () => setActiveCategory(null)
        });
    };

    // Prevent body scrolling and add Escape key listener when modal is open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (activeCategory) {
            document.body.style.overflow = "hidden";
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeCategory]);

    useGSAP(() => {
        // Title entrance
        gsap.fromTo(
            ".tech-title-anim",
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
            }
        );
        
        // Bento Cover Boxes entrance
        gsap.fromTo(
            ".bento-box",
            { scale: 0.9, opacity: 0, y: 30 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: ".bento-container", start: "top 80%" }
            }
        );
    }, { scope: sectionRef });

    // GSAP Animation for Modal Entrance
    useEffect(() => {
        if (activeCategory && modalRef.current && overlayRef.current) {
            // Ensure overlay starts hidden before animating in
            gsap.set(overlayRef.current, { opacity: 0 });
            
            // Fade in overall backdrop
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });

            // Bounce in modal box
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
            );
            
            // Stagger modal icons
            gsap.fromTo(
                ".modal-app-icon",
                { scale: 0, opacity: 0, rotationY: 45 },
                {
                    scale: 1, opacity: 1, rotationY: 0,
                    duration: 0.5,
                    stagger: { amount: 0.5, from: "random" },
                    ease: "back.out(1.5)",
                    delay: 0.2
                }
            );
        }
    }, [activeCategory]);

    return (
        <section ref={sectionRef} id="skills" className="relative w-full bg-[#0b0c10] overflow-hidden flex items-center h-screen">
            
            {/* 3D Immersive Background Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                    <ambientLight intensity={0.2} />
                    <BackgroundDust />
                </Canvas>
            </div>

            {/* Glowing Ambient Dust */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[180px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 pointer-events-auto flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-16 h-full">
                
                {/* Left Side: Title */}
                <div className="tech-title-anim w-full xl:w-4/12 flex-shrink-0 text-center xl:text-left mt-8 xl:mt-0">
                    <h2 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Tools of<br/>the trade.
                    </h2>
                    <p className="text-white/40 text-base lg:text-lg tracking-wide font-medium max-w-lg mx-auto xl:mx-0">
                        A curated selection of the technologies, frameworks, and infrastructure I leverage to build production-grade software. Click to explore.
                    </p>
                </div>

                {/* Right Side: Categorized 2x2 Bento Covers */}
                <div className="w-full xl:w-8/12 flex justify-center xl:justify-end">
                    <div className="bento-container grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-4xl aspect-[4/3] xl:aspect-auto xl:h-[60vh]">
                        
                        {skillsData.map((category, boxIdx) => {
                            const style = categoryStyles[category.category] || categoryStyles["Programming Languages"];
                            const coverNumber = `0${boxIdx + 1}`;

                            return (
                                <div 
                                    key={category.category} 
                                    className="cursor-pointer group h-full"
                                    onClick={() => setActiveCategory(category)}
                                >
                                    <SpotlightCard 
                                        spotlightColor={style.spot}
                                        className={`bento-box flex flex-col justify-between p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] ${style.bg} backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border ${style.border} relative overflow-hidden h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_80px_rgba(0,0,0,0.8)]`}
                                    >
                                        {/* Large Abstract Cover Graphic (Outlined Number) */}
                                        <div className="absolute -right-4 -bottom-6 lg:-right-8 lg:-bottom-10 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
                                            <span className="text-[8rem] lg:text-[12rem] font-bold leading-none font-sans transition-all duration-500" style={{ WebkitTextStroke: `2px ${style.textStroke}`, color: 'transparent' }}>
                                                {coverNumber}
                                            </span>
                                        </div>

                                        {/* Top: Category Title */}
                                        <h3 className="text-lg lg:text-2xl font-bold text-white tracking-tight flex items-center gap-2 lg:gap-3 z-10">
                                            <span className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${style.accent} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                            {category.category}
                                        </h3>
                                        
                                        {/* Bottom: Item Count */}
                                        <div className="z-10 mt-auto">
                                            <span className="text-white/40 text-sm font-medium tracking-widest uppercase flex items-center gap-2 group-hover:text-white/70 transition-colors">
                                                Explore {category.skills.length} skills
                                                <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            );
                        })}
                        
                    </div>
                </div>

            </div>

            {/* Glassmorphic Modal Overlay */}
            {activeCategory && (
                <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                        onClick={closeModal}
                    />
                    
                    {/* Modal Content Container */}
                    <div 
                        ref={modalRef}
                        className="relative z-10 w-full max-w-4xl p-8 lg:p-12 rounded-[2.5rem] bg-[#13151a]/95 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        style={{
                            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all z-20"
                            onClick={closeModal}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-8">
                            {activeCategory.category}
                        </h3>

                        {/* Full Dense Grid Inside Modal */}
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 lg:gap-4 relative perspective-1000">
                            {activeCategory.skills.map((skillName, idx) => {
                                const svgUrl = deviconMap[skillName];
                                
                                return (
                                    <div key={idx} className="modal-app-icon relative w-full aspect-square">
                                        <div 
                                            className="peer absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-[#1c1f26] border border-[#2a2d36] transition-all duration-300 hover:scale-110 hover:bg-[#22252e] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] cursor-default hover:z-20"
                                            style={{
                                                boxShadow: "inset 1px 1px 2px rgba(255, 255, 255, 0.08), inset -1px -1px 2px rgba(0, 0, 0, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.5)"
                                            }}
                                        >
                                            {/* Icon Render */}
                                            {svgUrl ? (
                                                <img 
                                                    src={svgUrl} 
                                                    alt={skillName} 
                                                    loading="lazy"
                                                    className="w-8 h-8 lg:w-10 lg:h-10 object-contain filter drop-shadow-md transition-transform duration-300 peer-hover:scale-110" 
                                                />
                                            ) : (
                                                <span className="text-white/60 font-bold text-sm lg:text-base tracking-wider select-none">
                                                    {getInitials(skillName)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Tooltip on hover */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 peer-hover:opacity-100 transition-opacity duration-200 text-xs font-semibold text-white bg-[#2a2d36] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none shadow-xl border border-white/10 z-30">
                                            {skillName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            
        </section>
    );
};

export default TechStack;
