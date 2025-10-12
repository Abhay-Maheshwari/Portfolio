import { lazy, Suspense, useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

const Footer = lazy(() => import("./sections/Footer"));
const Contact = lazy(() => import("./sections/Contact"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Experience = lazy(() => import("./sections/Experience"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-xl">Loading...</p>
    </div>
  </div>
);

const SectionLoader = () => (
  <div className="w-full h-64 bg-gray-800/50 animate-pulse rounded-lg my-8"></div>
);

const LazySpline = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-2xl">Loading 3D Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <iframe 
      src='https://my.spline.design/abhaymaheshwari-i3z89EhNEiIjfHvHeNyoACBE/' 
      width='100%' 
      height='1100dvh'
      loading="lazy"
      title="3D Portfolio Scene"
    />
  );
};

const App = () => (
  <Suspense fallback={<LoadingFallback />}>
    <LazySpline />
    <a href="/images/project2 (2).mp4" target="_blank" className="download-btn">
      📄 Download CV
    </a>
    
    <Suspense fallback={<SectionLoader />}>
      <ShowcaseSection />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <LogoShowcase />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <FeatureCards />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Experience />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <TechStack />
    </Suspense>
    
    
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>
    
    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
    
    <Analytics />
  </Suspense>
);

export default App;
