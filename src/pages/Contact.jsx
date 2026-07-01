import { lazy, Suspense } from "react";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";

const ContactSection = lazy(() => import("../sections/Contact"));

const SectionFallback = () => (
    <div style={{ minHeight: '40vh' }} />
);

const Contact = () => {
    return (
        <AnimatedPage>
            <SEO 
                title="Contact | Abhay Maheshwari"
                description="Get in touch for opportunities, collaboration, or just to say hi."
                url="https://abhay-maheshwari.site/contact"
            />
            <main className="w-full h-screen bg-[#020202]">
                <Suspense fallback={<SectionFallback />}>
                    <ContactSection />
                </Suspense>
            </main>
        </AnimatedPage>
    );
};

export default Contact;
