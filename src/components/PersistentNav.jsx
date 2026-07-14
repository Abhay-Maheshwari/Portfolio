import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import GooeyNav from './ReactBits/GooeyNav';
import TargetCursor from './ReactBits/TargetCursor';
import './PersistentNav.css';

/**
 * PersistentNav Component
 * 
 * Collapsible circle that expands into a horizontal pill-shaped nav bar.
 */
const PersistentNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate();

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

    // Open from avatar helper
    useEffect(() => {
        const handleToggleNav = () => {
            setIsOpen(true);
        };
        window.addEventListener('toggle-nav', handleToggleNav);
        return () => window.removeEventListener('toggle-nav', handleToggleNav);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    return (
        <>
            <TargetCursor 
                spinDuration={2}
                hideDefaultCursor={false}
                parallaxOn={true}
                containerRef={navRef}
            />
            <div ref={navRef} className={`circle-nav ${isOpen ? 'open' : ''}`}>
                {/* Toggle Button — the circle */}
                <button
                    className="circle-nav-toggle cursor-target"
                    onClick={toggleNav}
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isOpen}
            >
                <span className="circle-nav-brand-icon" role="img" aria-hidden="true">
                    <span className="brand-symbol">&gt;</span>am<span className="brand-cursor">_</span>
                </span>
            </button>

            {/* Expanded Horizontal Bar */}
            <nav className="circle-nav-bar" role="navigation" aria-label="Main navigation" style={{ padding: '0 1rem' }}>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <GooeyNav 
                        items={navLinks.map(link => ({ label: link.name.toUpperCase(), href: link.link }))}
                        onItemClick={(item) => {
                            navigate(item.href);
                            handleNavClick();
                        }}
                    />
                </div>
            </nav>
        </div>
        </>
    );
};

export default PersistentNav;
