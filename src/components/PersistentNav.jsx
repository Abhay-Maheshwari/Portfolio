import { useState } from 'react';
import { navLinks } from '../constants';
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
                <span className="brand-text">
                    <span className="brand-symbol">&gt;</span>am<span className="brand-cursor">_</span>
                </span>
            </a>

            {/* Navigation */}
            <nav
                className={`persistent-nav ${isMenuOpen ? 'active' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {navLinks.map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        className="nav-link"
                        onClick={handleNavClick}
                    >
                        {item.name.toUpperCase()}
                    </a>
                ))}


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


