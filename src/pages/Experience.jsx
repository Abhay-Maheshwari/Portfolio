import React, { lazy, Suspense } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import SEO from '../components/SEO';

const ExperienceCards = lazy(() => import('../sections/ExperienceCards'));

const SectionFallback = () => (
    <div style={{ minHeight: '100vh' }} className="w-full bg-[#0b0c10]" />
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
