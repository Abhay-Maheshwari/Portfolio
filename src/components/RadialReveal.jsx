import { useEffect, useRef, useState, useCallback } from 'react';
import './RadialReveal.css';

/**
 * Glowing Circle Reveal - Optimized for 60fps
 * 
 * Uses CSS radial-gradient (GPU accelerated) instead of SVG
 */

const RadialReveal = ({ heroContent, children }) => {
    const [currentRadius, setCurrentRadius] = useState(0);
    const rafRef = useRef(null);
    const maxRadiusRef = useRef(0);

    // Calculate max radius to cover viewport
    const calculateMaxRadius = useCallback(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return Math.ceil(Math.sqrt(vw * vw + vh * vh) / 2) + 100;
    }, []);

    // Scroll handler
    useEffect(() => {
        maxRadiusRef.current = calculateMaxRadius();

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const triggerHeight = window.innerHeight;
                
                const rawProgress = Math.min(Math.max(scrollY / triggerHeight, 0), 1);
                // Smooth ease-in-out
                const easedProgress = -(Math.cos(Math.PI * rawProgress) - 1) / 2;
                
                setCurrentRadius(easedProgress * maxRadiusRef.current);
            });
        };

        const handleResize = () => {
            maxRadiusRef.current = calculateMaxRadius();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [calculateMaxRadius]);

    const revealStarted = currentRadius > 0;
    const revealComplete = currentRadius >= maxRadiusRef.current * 0.98;
    const heroInteractive = currentRadius < maxRadiusRef.current * 0.5;

    // Soft feathered edge using radial gradient (GPU accelerated)
    const feather = 40;
    const innerR = Math.max(0, currentRadius - feather);
    const maskGradient = revealStarted
        ? `radial-gradient(circle at 50% 50%, transparent ${innerR}px, black ${currentRadius + feather}px)`
        : 'none';

    // Border size for the glowing ring
    const borderSize = currentRadius > 0 ? currentRadius * 2 : 0;

    return (
        <div className="radial-reveal-root">
            {/* Hero with CSS radial-gradient mask */}
            <div 
                className={`hero-overlay-layer ${revealComplete ? 'fully-revealed' : ''}`}
                style={{
                    maskImage: maskGradient,
                    WebkitMaskImage: maskGradient,
                    pointerEvents: heroInteractive ? 'auto' : 'none',
                }}
                aria-hidden={revealComplete}
            >
                {heroContent}
            </div>

            {/* Glowing border ring - pure CSS */}
            {revealStarted && !revealComplete && (
                <div 
                    className="circle-border-ring"
                    style={{
                        width: borderSize,
                        height: borderSize,
                    }}
                />
            )}

            {/* Scroll trigger zone */}
            <div className="scroll-trigger-zone" aria-hidden="true" />

            {/* Main content */}
            <main className={`main-content-layer ${revealComplete ? 'active' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default RadialReveal;
