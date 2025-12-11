import { useState } from 'react';
import './PersistentNav.css';

/**
 * PersistentNav Component
 * 
 * The hero-style navbar that persists throughout the entire site.
 * Positioned above the RadialReveal system so it's never masked.
 */
const PersistentNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="persistent-header">
            {/* Brand / Logo */}
            <a href="#" className="brand" onClick={handleLogoClick}>
                <span className="brand-text">AM</span>
            </a>

            {/* Navigation */}
            <nav
                className={`persistent-nav ${isMenuOpen ? 'active' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                <a href="#work" className="nav-link" onClick={handleNavClick}>WORK</a>
                <a href="#experience" className="nav-link" onClick={handleNavClick}>EXPERIENCE</a>
                <a href="#skills" className="nav-link" onClick={handleNavClick}>SKILLS</a>

                <a href="#contact" className="nav-link" onClick={handleNavClick}>CONTACT</a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
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
    );
};

export default PersistentNav;

