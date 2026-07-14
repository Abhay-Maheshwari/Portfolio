import { lazy, Suspense } from "react";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

const TechStackSection = lazy(() => import("../sections/TechStack"));

const SectionFallback = () => (
    <div className="w-full h-screen bg-[#0b0c10] flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-white/10 border-t-white/80 rounded-full animate-spin" />
        <span className="text-white/30 text-[0.65rem] font-mono tracking-[0.3em] uppercase animate-pulse">
            Loading Stack...
        </span>
    </div>
);

const Skills = () => {
    return (
        <AnimatedPage>
            <SEO 
                title="Tech Stack & Skills | Abhay Maheshwari"
                description="Technical skills, languages, and tools I use to build scalable software."
                url="https://abhay-maheshwari.site/skills"
            />
            <main className="w-full min-h-screen bg-[#0b0c10]">
                <Suspense fallback={<SectionFallback />}>
                    <TechStackSection />
                </Suspense>
            </main>
        </AnimatedPage>
    );
};

export default Skills;
