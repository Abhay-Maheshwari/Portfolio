import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expCards } from "../constants";
import Beams from '../components/ReactBits/Beams';
import Lanyard from '../components/ReactBits/Lanyard';
import ErrorBoundary from '../components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCards = () => {
    const sectionRef = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const [activeExp, setActiveExp] = useState(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Modal Close Handler
    const closeModal = () => {
        if (!overlayRef.current || !modalRef.current) {
            setActiveExp(null);
            return;
        }

        gsap.to(modalRef.current, { scale: 0.95, y: 20, opacity: 0, duration: 0.25, ease: "power2.in" });

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => setActiveExp(null)
        });
    };

    // Keyboard support for Modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        if (activeExp) {
            document.body.style.overflow = "hidden";
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeExp]);

    useGSAP(() => {
        // Section title entrance
        gsap.fromTo(
            ".exp-section-title",
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
            }
        );

        // Cards stagger entrance
        gsap.fromTo(
            ".exp-timeline-card",
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: ".exp-timeline-grid", start: "top 85%" }
            }
        );
    }, { scope: sectionRef });

    // Modal Enter Animation
    useEffect(() => {
        if (activeExp && modalRef.current && overlayRef.current) {
            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });

            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
            );
        }
    }, [activeExp]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#0b0c10] overflow-hidden h-screen flex flex-col pt-16 lg:pt-24 pb-4 lg:pb-6"
        >
            {/* Background Beams Component */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <Beams
                    beamWidth={2}
                    beamHeight={15}
                    beamNumber={12}
                    lightColor="#ffffff"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={0}
                />
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]">
                <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 flex-1 flex flex-col justify-start min-h-0">
                {/* Section Header */}
                <div className="exp-section-title mb-3 lg:mb-4 shrink-0">
                    <span className="text-white/30 text-[0.65rem] font-medium tracking-[0.3em] uppercase mb-1.5 block">
                        Career Timeline
                    </span>
                    <h2
                        className="text-[1.8rem] lg:text-[2.2rem] xl:text-[2.6rem] font-bold text-white leading-[1.1] tracking-tight"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        Where I've<br />worked.
                    </h2>
                    <p className="text-white/40 text-[0.8rem] lg:text-[0.85rem] tracking-wide font-medium max-w-xl mt-2 line-clamp-2">
                        From enterprise internships to founding startups — a timeline of hands-on
                        experience building real products. Click any role for details.
                    </p>
                </div>

                {/* Cards Grid */}
                <div
                    className="exp-timeline-grid grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 lg:gap-4 flex-1 overflow-y-auto min-h-0 pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {expCards.map((exp, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveExp(exp)}
                            className="cursor-pointer flex flex-col h-full overflow-hidden exp-timeline-card group relative rounded-[1rem] bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.07] backdrop-blur-xl p-3.5 lg:p-4 transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                            style={{
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* Top highlight line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Header Row */}
                            <div className="flex items-start gap-3 mb-2.5">
                                {/* Company Logo */}
                                <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:border-white/[0.15] transition-colors duration-300">
                                    <img
                                        src={exp.imgPath}
                                        alt={exp.company}
                                        className="w-5 h-5 object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Title & Company */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white/95 text-[0.85rem] font-semibold leading-snug tracking-tight truncate">
                                        {exp.title}
                                    </h3>
                                    <p className="text-white/40 text-[0.7rem] mt-0.5 font-medium truncate">
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Date Badge */}
                                <span className="text-white/25 text-[0.55rem] font-mono font-medium tracking-wide whitespace-nowrap mt-1">
                                    {exp.date}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="flex-1 min-h-0 overflow-y-auto mb-2.5 pr-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <p className="text-white/45 text-[0.7rem] lg:text-[0.75rem] leading-[1.5] font-normal">
                                    {exp.review}
                                </p>
                            </div>

                            {/* Tech Tags - pushed to bottom */}
                            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                                {exp.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[0.6rem] font-mono font-medium text-white/40 bg-white/[0.05] border border-white/[0.06] rounded-md px-2.5 py-1 tracking-wide group-hover:text-white/60 group-hover:bg-white/[0.08] group-hover:border-white/[0.1] transition-all duration-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GSAP Modal Overlay */}
            {activeExp && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
                >
                    {/* Background click listener */}
                    <div className="absolute inset-0" onClick={closeModal} />

                    <div
                        ref={modalRef}
                        className="relative w-full max-w-5xl h-[80vh] flex flex-col md:flex-row bg-[#0b0c10]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Left Side: 3D Lanyard */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative bg-gradient-to-br from-white/5 to-transparent border-b md:border-b-0 md:border-r border-white/5 overflow-hidden">
                            <div className="absolute inset-0 w-full h-full md:h-[130%] md:-top-[15%]">
                                <ErrorBoundary>
                                    <Lanyard position={isMobile ? [0, -1, 23] : [0, 0, 17]} gravity={[0, -40, 0]} frontImage={activeExp.lanyardImage || "/images/id-card.jpg"} />
                                </ErrorBoundary>
                            </div>
                            <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                                <span className="text-white/20 text-[10px] uppercase tracking-widest font-mono z-10 relative">Interactive ID • Drag to spin</span>
                            </div>
                        </div>

                        {/* Right Side: Content Details */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-full overflow-y-auto p-6 lg:p-10 hide-scrollbar flex flex-col justify-center">

                            <div className="flex items-center gap-4 mb-6">
                                <img src={activeExp.imgPath} alt={activeExp.company} className="w-12 h-12 object-contain bg-white/5 p-2 rounded-xl" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">{activeExp.title}</h2>
                                    <p className="text-white/50 text-sm font-medium">{activeExp.company}</p>
                                </div>
                            </div>

                            <div className="mb-6 inline-block bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit">
                                <span className="text-white/40 text-xs font-mono tracking-wider">{activeExp.date}</span>
                            </div>

                            <div className="text-white/60 text-sm leading-relaxed space-y-4 mb-8">
                                <p>{activeExp.review}</p>
                            </div>

                            <div>
                                <h4 className="text-white/30 text-[10px] uppercase tracking-widest mb-3">Technologies Leveraged</h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeExp.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono text-white/50 bg-white/5 border border-white/10 rounded px-3 py-1.5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ExperienceCards;
