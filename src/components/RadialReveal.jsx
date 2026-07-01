import { useEffect, useRef, useCallback } from 'react';
import './RadialReveal.css';

/**
 * Glowing Circle Reveal — Optimized for 60fps
 * 
 * Uses refs + direct DOM manipulation instead of React state
 * to avoid costly re-renders on every scroll frame.
 */

const RadialReveal = ({ heroContent, children }) => {
    const heroRef = useRef(null);
    const ringRef = useRef(null);
    const mainRef = useRef(null);
    const rafRef = useRef(null);
    const maxRadiusRef = useRef(0);
    const currentRadiusRef = useRef(0);

    // Calculate max radius to cover viewport
    const calculateMaxRadius = useCallback(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return Math.ceil(Math.sqrt(vw * vw + vh * vh) / 2) + 100;
    }, []);

    // Directly update DOM elements without React re-renders
    const applyRadius = useCallback((radius) => {
        const maxRadius = maxRadiusRef.current;
        const revealStarted = radius > 0;
        const revealComplete = radius >= maxRadius * 0.98;
        const heroInteractive = radius < maxRadius * 0.5;

        // Update hero overlay mask
        if (heroRef.current) {
            const feather = 40;
            const innerR = Math.max(0, radius - feather);
            const maskGradient = revealStarted
                ? `radial-gradient(circle at 50% 50%, transparent ${innerR}px, black ${radius + feather}px)`
                : 'none';

            heroRef.current.style.maskImage = maskGradient;
            heroRef.current.style.webkitMaskImage = maskGradient;
            heroRef.current.style.pointerEvents = heroInteractive ? 'auto' : 'none';

            if (revealComplete) {
                heroRef.current.classList.add('fully-revealed');
            } else {
                heroRef.current.classList.remove('fully-revealed');
            }
            heroRef.current.setAttribute('aria-hidden', revealComplete);
        }

        // Update border ring
        if (ringRef.current) {
            if (revealStarted && !revealComplete) {
                const borderSize = radius * 2;
                ringRef.current.style.display = '';
                ringRef.current.style.width = `${borderSize}px`;
                ringRef.current.style.height = `${borderSize}px`;
            } else {
                ringRef.current.style.display = 'none';
            }
        }

        // Update main content
        if (mainRef.current) {
            if (revealComplete) {
                mainRef.current.classList.add('active');
            } else {
                mainRef.current.classList.remove('active');
            }
        }
    }, []);

    // Scroll handler
    useEffect(() => {
        maxRadiusRef.current = calculateMaxRadius();

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const triggerHeight = window.innerHeight;

                // Reveal starts after 2× viewport height (video phase finishes first)
                const revealStart = triggerHeight * 2;
                const revealRange = triggerHeight; // 1× viewport height for the reveal
                const rawProgress = Math.min(Math.max((scrollY - revealStart) / revealRange, 0), 1);
                // Smooth ease-in-out
                const easedProgress = -(Math.cos(Math.PI * rawProgress) - 1) / 2;

                const newRadius = easedProgress * maxRadiusRef.current;
                currentRadiusRef.current = newRadius;
                applyRadius(newRadius);
            });
        };

        const handleResize = () => {
            maxRadiusRef.current = calculateMaxRadius();
            handleScroll(); // Force update mask on resize
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [calculateMaxRadius, applyRadius]);

    return (
        <div className="radial-reveal-root">
            {/* Hero with CSS radial-gradient mask */}
            <div
                ref={heroRef}
                className="hero-overlay-layer"
                aria-hidden="false"
            >
                {heroContent}
            </div>

            {/* Glowing border ring — pure CSS */}
            <div
                ref={ringRef}
                className="circle-border-ring"
                style={{ display: 'none' }}
            />

            {/* Scroll trigger zone */}
            <div className="scroll-trigger-zone" aria-hidden="true" />

            {/* Main content */}
            <main ref={mainRef} className="main-content-layer">
                {children}
            </main>
        </div>
    );
};

export default RadialReveal;
