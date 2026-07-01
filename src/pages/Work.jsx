import { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSmoothScroll } from "../components/SmoothScroll";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

const CinemaReel = lazy(() => import("../sections/CinemaReel"));

const Work = () => {
    const navigate = useNavigate();
    const lenis = useSmoothScroll();

    useEffect(() => {
        if (lenis) {
            lenis.stop();
        }
        return () => {
            if (lenis) {
                lenis.start();
            }
        };
    }, [lenis]);

    return (
        <AnimatedPage>
            <SEO 
                title="Selected Work | Abhay Maheshwari"
                description="Explore my portfolio of full-stack, AI, and generative software projects."
                url="https://abhay-maheshwari.site/work"
            />
            <Suspense fallback={<div className="h-screen bg-black" />}>
                <CinemaReel isOpen={true} onClose={() => navigate('/')} />
            </Suspense>
        </AnimatedPage>
    );
};

export default Work;
