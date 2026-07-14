import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AvatarHelper.css';
import { owner } from '../constants';

const AvatarHelper = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Check scroll position to show message
    useEffect(() => {
        const handleScroll = () => {
            if (hasDismissed) return;
            
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            const distanceToBottom = scrollHeight - clientHeight - scrollY;
            
            if (distanceToBottom < Math.max(600, clientHeight * 0.5)) {
                setShowMessage(true);
            } else {
                setShowMessage(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasDismissed]);

    // Keep track of if PersistentNav is open
    useEffect(() => {
        const handleNavToggle = () => setIsMenuOpen(true);
        const handleNavClose = () => setIsMenuOpen(false);
        // We'll just assume toggling it opens it for the animation state
        window.addEventListener('toggle-nav', handleNavToggle);
        
        // This is a naive way to reset the avatar scale when nav closes.
        // For simplicity, we just shrink it when nav is toggled.
        return () => {
            window.removeEventListener('toggle-nav', handleNavToggle);
        };
    }, []);

    return (
        <div className="avatar-helper-container">
            <motion.div
                drag
                dragConstraints={{ top: -2000, left: -2000, right: 50, bottom: 50 }}
                dragElastic={0.1}
                dragMomentum={false}
                style={{ touchAction: 'none', pointerEvents: 'auto' }}
                onTap={(e, info) => {
                    // Open the PersistentNav instead of deprecated StaggeredMenu
                    window.dispatchEvent(new Event('toggle-nav'));
                    
                    if (hasDismissed) {
                        setHasDismissed(false);
                        setShowMessage(true);
                    } else {
                        setHasDismissed(true);
                    }
                }}
            >
                <motion.div 
                    className="avatar-image-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95, cursor: "grabbing" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? 50 : 0, scale: isMenuOpen ? 0.8 : 1 }}
                style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <img 
                    src={(isHovered || (showMessage && !hasDismissed)) ? "/images/Abhay-Logo-2.svg" : "/images/Abhay-Logo.svg"} 
                    alt="Abhay Pixel Art" 
                    className="avatar-image"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                />
            </motion.div>
            </motion.div>
        </div>
    );
};

export default AvatarHelper;
