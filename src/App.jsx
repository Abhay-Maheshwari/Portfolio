import { Analytics } from "@vercel/analytics/react";
import Hero3D from "./sections/Hero3D";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Testimonials from "./sections/Testimonials";

const App = () => (
  <>
    <Hero3D />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <TechStack />
    <Testimonials />
    <Contact />
    <Footer />
    <Analytics />
  </>
);

export default App;
