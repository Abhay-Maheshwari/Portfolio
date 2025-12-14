import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * RevealTitle - Cohesive "Slide Up" Reveal
 * 
 * Matches the project's premium Hero3D aesthetic.
 * Text slides up from an invisible bounding box.
 * 
 * @param {string} title - The text to display
 * @param {string} className - Additional classes (optional)
 * @param {string} sub - Optional subtitle/badge text
 */
const RevealTitle = ({ title, sub, className = "" }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const lineRef = useRef(null);

    useGSAP(() => {
        const text = textRef.current;

        // Initial state: Pushed down 100% (hidden by overflow:hidden wrapper)
        gsap.set(text, { y: "100%", opacity: 0 });

        // Animation: Slide up to 0%
        gsap.to(text, {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Start when slightly in view
                toggleActions: "play none none reverse"
            }
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`flex flex-col items-center gap-5 my-10 ${className}`}
        >
            {/* Optional Badge/Subtitle similar to original TitleHeader */}
            {sub && (
                <div className="hero-badge mb-2">
                    <p>{sub}</p>
                </div>
            )}

            {/* Overflow Hidden Wrapper for the Slide Effect */}
            <div className="overflow-hidden relative">
                <h2
                    ref={textRef}
                    className="font-semibold md:text-5xl text-3xl text-center text-white leading-tight"
                >
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default RevealTitle;
