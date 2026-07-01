import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navLinks } from '../constants';
import './PersistentNav.css';

/**
 * PersistentNav Component
 * 
 * Collapsible circle that expands into a horizontal pill-shaped nav bar.
 */
const PersistentNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNav = () => {
        setIsOpen(prev => !prev);
    };

    const handleNavClick = () => {
        setIsOpen(false);
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    return (
        <div ref={navRef} className={`circle-nav ${isOpen ? 'open' : ''}`}>
            {/* Toggle Button — the circle */}
            <button
                className="circle-nav-toggle"
                onClick={toggleNav}
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isOpen}
            >
                <span className="circle-nav-brand-icon" role="img" aria-hidden="true">
                    <span className="brand-symbol">&gt;</span>am<span className="brand-cursor">_</span>
                </span>
            </button>

            {/* Expanded Horizontal Bar */}
            <nav className="circle-nav-bar" role="navigation" aria-label="Main navigation">
                {navLinks.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.link}
                        className={({ isActive }) => isActive ? "circle-nav-link active" : "circle-nav-link"}
                        onClick={handleNavClick}
                    >
                        {item.name.toUpperCase()}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default PersistentNav;
