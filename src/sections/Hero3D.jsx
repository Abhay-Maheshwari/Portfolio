import { useEffect, useRef, useState } from 'react';
import { SceneManager } from '../three/SceneManager.js';
import './Hero3D.css';

const Hero3D = () => {
    const canvasRef = useRef(null);
    const sceneManagerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize the scene
        const sceneManager = new SceneManager(canvasRef.current);
        sceneManager.init();
        sceneManagerRef.current = sceneManager;

        // Hide loader after scene is ready
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            if (sceneManagerRef.current) {
                sceneManagerRef.current.dispose();
            }
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleExploreClick = () => {
        // Scroll to next section
        const nextSection = document.querySelector('.showcase-section, .projects-section, [class*="showcase"], [class*="projects"]');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    return (
        <div className="hero3d-container">
            {/* 3D Canvas */}
            <canvas ref={canvasRef} id="three-canvas" className="hero3d-canvas" role="img" aria-label="3D animated laptop scene" />

            {/* Noise Overlay */}
            <div className="grain-overlay" />

            {/* Loading Screen */}
            {isLoading && (
                <div className="hero3d-loader">
                    <div className="loader-ring" />
                    <span className="loader-text">Loading Experience</span>
                </div>
            )}

            {/* Background Name */}
            <div className="bg-name" aria-hidden="true">
                <span>ABHAY</span>
                <span>MAHESHWARI</span>
            </div>

            {/* UI Overlay */}
            <div className="ui-overlay">
                {/* Header */}
                <header className="hero3d-header">
                    {/* Brand / Logo */}
                    <div className="brand">
                        <span className="brand-text">AM</span>
                    </div>

                    {/* Navigation */}
                    <nav className={`hero3d-nav ${isMenuOpen ? 'active' : ''}`} id="nav" role="navigation" aria-label="Main navigation">
                        <a href="#work" className="nav-link" onClick={() => setIsMenuOpen(false)}>WORK</a>
                        <a href="#experience" className="nav-link" onClick={() => setIsMenuOpen(false)}>EXPERIENCE</a>
                        <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>SKILLS</a>
                        <a href="#testimonials" className="nav-link" onClick={() => setIsMenuOpen(false)}>CERTIFICATIONS</a>
                        <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        id="menuToggle"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Status / Right Element */}
                    <div className="header-right">
                        <div className="status-indicator">
                            <div className="status-dot" />
                            <span className="status-text">SYSTEM ONLINE</span>
                        </div>
                    </div>
                </header>

                {/* Hero Content */}
                <div className="hero-content">
                    <h1 className="hero-name">
                        <span className="reveal-wrapper">
                            <span className="reveal-text">ABHAY MAHESHWARI</span>
                        </span>
                    </h1>
                    <p className="hero-title">
                        <span className="reveal-wrapper">
                            <span className="reveal-text">Software Engineer</span>
                        </span>
                    </p>
                    <p className="hero-specialization">
                        <span className="reveal-wrapper">
                            <span className="reveal-text">Full-Stack · AI/ML · Cloud</span>
                        </span>
                    </p>
                </div>

                {/* Bottom Section */}
                <footer className="bottom-section">
                    {/* Left Info Panel */}
                    <div className="info-panel info-panel-left">
                        <div className="info-line">
                            <span className="info-label">STATUS:</span>
                            <span className="info-value status-active">AVAILABLE FOR WORK</span>
                        </div>
                        <div className="info-line">
                            <span className="info-label">LOCATION:</span>
                            <span className="info-value">INDIA</span>
                        </div>
                        <div className="info-line">
                            <span className="info-label">FOCUS:</span>
                            <span className="info-value">FULL-STACK & AI APPLICATIONS</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="cta-container">
                        <button className="cta-btn" id="exploreBtn" onClick={handleExploreClick}>
                            <span className="cta-text">EXPLORE NOW</span>
                        </button>
                        <a href="/Abhay Maheshwari Resume 2025.pdf" download className="cta-btn resume-btn" style={{ marginLeft: '1rem' }}>
                            <span className="cta-text">DOWNLOAD RESUME</span>
                        </a>
                    </div>

                    {/* Right Info Panel */}
                    <div className="info-panel info-panel-right">
                        <div className="info-line">
                            <span className="info-label">MODE:</span>
                            <span className="info-value">ONLINE</span>
                        </div>
                        <div className="info-line">
                            <span className="info-label">PORTFOLIO:</span>
                            <span className="info-value status-active">ACTIVE</span>
                        </div>
                        <div className="info-line">
                            <span className="info-label">STATUS:</span>
                            <span className="info-value">CONNECTED</span>
                        </div>
                        <div className="info-line">
                            <span className="info-label">EXPLORATION:</span>
                            <span className="info-value">NOW MONITORING</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Hero3D;
