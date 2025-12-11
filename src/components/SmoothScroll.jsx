import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create context for Lenis instance
const SmoothScrollContext = createContext(null);

/**
 * Hook to access Lenis instance
 * @returns {Lenis | null} Lenis instance
 */
export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * SmoothScroll Provider Component
 * 
 * Provides premium buttery-smooth scrolling using Lenis
 * Synced with GSAP ScrollTrigger for animations
 */
const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Don't initialize smooth scroll for users who prefer reduced motion
            return;
        }

        // Initialize Lenis with premium settings
        const lenisInstance = new Lenis({
            duration: 1.2,           // Animation duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical', // Scroll direction
            gestureOrientation: 'vertical',
            smoothWheel: true,       // Smooth mouse wheel
            wheelMultiplier: 0.8,    // Slower for elegance
            touchMultiplier: 1.5,    // Touch responsiveness
            infinite: false,         // No infinite scroll
            autoResize: true,        // Auto handle resize
        });

        lenisRef.current = lenisInstance;
        setLenis(lenisInstance);

        // Sync Lenis with GSAP ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        // Add Lenis to GSAP ticker for smooth animation loop
        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        // Configure ScrollTrigger to ignore mobile resize (prevents jump on keyboard show/hide)
        ScrollTrigger.config({
            ignoreMobileResize: true,
        });

        // Debounced resize handler to prevent scroll jumps during resize
        let resizeTimeout = null;
        const handleResize = () => {
            // Clear any pending refresh
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            // Immediately update Lenis dimensions
            lenisInstance.resize();

            // Debounce ScrollTrigger refresh to only run after resize ends
            // This prevents the jarring mid-resize jumps
            resizeTimeout = setTimeout(() => {
                // Save current scroll position
                const scrollY = window.scrollY;

                // Refresh ScrollTrigger
                ScrollTrigger.refresh();

                // Restore scroll position after refresh
                // Use requestAnimationFrame to ensure DOM has updated
                requestAnimationFrame(() => {
                    window.scrollTo(0, scrollY);
                    lenisInstance.scrollTo(scrollY, { immediate: true });
                });
            }, 250); // Wait 250ms after resize ends
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            gsap.ticker.remove(lenisInstance.raf);
            lenisInstance.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export default SmoothScroll;


