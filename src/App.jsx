import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";

const App = () => (
  <>
    {/* <Navbar /> */}
    <iframe src='https://my.spline.design/abhaymaheshwari-i3z89EhNEiIjfHvHeNyoACBE/' width='100%' height='1100dvh'></iframe>
    {/* <Hero /> */}
    {/* <Landing /> */}
    <a href="/images/project2 (2).png" target="_blank" class="download-btn">
  📄 Download CV
  </a>
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <TechStack />
    {/* <Testimonials /> */}
    <Contact />
    <Footer />
  </>
);

export default App;
