import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from 'react-helmet-async';
import SmoothScroll from "./components/SmoothScroll";
import PersistentNav from "./components/PersistentNav";
import Cursor from "./components/Cursor";
import AvatarHelper from "./components/AvatarHelper";

// Lazy-load page wrappers
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));

import Loader from "./components/Loader";

// Page loading fallback for route changes (now instant)
const PageFallback = () => null;

const AppContent = () => {
    const location = useLocation();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isInitialLoad && <Loader key="initial-loader" />}
            </AnimatePresence>

            {/* Persistent navbar */}
            <PersistentNav />
            <Cursor />
            {!isInitialLoad && <AvatarHelper />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
                    <Route path="/work" element={<Suspense fallback={<PageFallback />}><Work /></Suspense>} />
                    <Route path="/experience" element={<Suspense fallback={<PageFallback />}><Experience /></Suspense>} />
                    <Route path="/skills" element={<Suspense fallback={<PageFallback />}><Skills /></Suspense>} />
                    <Route path="/contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
                    {/* Fallback to Home */}
                    <Route path="*" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
                </Routes>
            </AnimatePresence>

            <Analytics />
            <SpeedInsights />
        </>
    );
};

const App = () => (
    <HelmetProvider>
        <Router>
            <SmoothScroll>
                <AppContent />
            </SmoothScroll>
        </Router>
    </HelmetProvider>
);

export default App;
