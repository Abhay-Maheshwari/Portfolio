import React, { lazy, Suspense } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';

const ExperienceCards = lazy(() => import('../sections/ExperienceCards'));

const SectionFallback = () => (
    <div className="w-full h-screen bg-[#0b0c10] flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-white/10 border-t-white/80 rounded-full animate-spin" />
        <span className="text-white/30 text-[0.65rem] font-mono tracking-[0.3em] uppercase animate-pulse">
            Initializing Timeline...
        </span>
    </div>
);

const Experience = () => {
  return (
    <AnimatedPage>
      <SEO
        title="Experience | Abhay Maheshwari"
        description="Professional experience and career timeline."
        url="https://abhay-maheshwari.site/experience"
      />
      <main className="w-full min-h-screen bg-[#0b0c10]">
        <Suspense fallback={<SectionFallback />}>
            <ExperienceCards />
        </Suspense>
      </main>
    </AnimatedPage>
  );
};

export default Experience;
