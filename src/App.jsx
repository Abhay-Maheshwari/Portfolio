import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "./components/SmoothScroll";
import RadialReveal from "./components/RadialReveal";
import PersistentNav from "./components/PersistentNav";
import Hero3D from "./sections/Hero3D";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";

/**
 * App Component with Radial Reveal System
 * 
 * Layer Hierarchy:
 * - Topmost: PersistentNav (always visible, z-index: 9999)
 * - Middle: Hero3D as fixed overlay (masked during scroll)
 * - Bottom: Main website content
 * 
 * Wrapped in SmoothScroll for premium buttery-smooth scrolling
 */
const App = () => (
    <SmoothScroll>
        {/* Persistent navbar - OUTSIDE RadialReveal so it's never masked */}
        <PersistentNav />

        <RadialReveal heroContent={<Hero3D />}>
            {/* Main website content - rendered underneath hero overlay */}
            <ShowcaseSection />
            <LogoShowcase />
            <Education />
            <Experience />
            <TechStack />
            <Contact />
            <Footer />
        </RadialReveal>

        <Analytics />
    </SmoothScroll>
);

export default App;
