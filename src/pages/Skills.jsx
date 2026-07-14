import { lazy, Suspense } from "react";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

const TechStackSection = lazy(() => import("../sections/TechStack"));

const SectionFallback = () => (
    <div style={{ minHeight: '100vh' }} className="w-full bg-[#0b0c10]" />
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
