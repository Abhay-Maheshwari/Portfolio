import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import RadialReveal from "../components/RadialReveal";
import Hero3D from "../sections/Hero3D";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

const WorkIntro = lazy(() => import("../sections/WorkIntro"));

const SectionFallback = () => (
    <div style={{ minHeight: '40vh' }} />
);

const Home = () => {
    const navigate = useNavigate();

    const handleEnterReel = () => {
        navigate('/work');
    };

    // Preload Work bundle on hover
    const preloadWork = () => {
        import("../sections/CinemaReel");
    };

    return (
        <AnimatedPage>
            <SEO
                title="Abhay Maheshwari | Software Engineer & AI Enthusiast"
                url="https://abhay-maheshwari.site/"
            />
            <RadialReveal heroContent={<Hero3D />}>
                <Suspense fallback={<SectionFallback />}>
                    <WorkIntro onEnterReel={handleEnterReel} onPreloadReel={preloadWork} />
                </Suspense>
            </RadialReveal>
        </AnimatedPage>
    );
};

export default Home;
