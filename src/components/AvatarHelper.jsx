import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AvatarHelper.css';

const AvatarHelper = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Check scroll position to show message
    useEffect(() => {
        const handleScroll = () => {
            if (hasDismissed) return;
            
            // "once the user scrolls to the start of the last section of any page"
            // We approximate this by checking if they've scrolled near the bottom (e.g. within the last 600px).
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            // threshold: when user is within 600px of bottom, or if page is short.
            const distanceToBottom = scrollHeight - clientHeight - scrollY;
            
            if (distanceToBottom < Math.max(600, clientHeight * 0.5)) {
                setShowMessage(true);
            } else {
                setShowMessage(false);
            }
        };

        // We can listen to native scroll. Lenis syncs it.
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasDismissed]); // removed location.pathname

    // Reset dismissal on route change


    return (
        <div className="avatar-helper-container">
            <motion.div 
                className="avatar-image-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    // Open the main navbar
                    window.dispatchEvent(new CustomEvent('toggle-nav'));
                    
                    // Keep the current logic for dismiss if any
                    if (hasDismissed) {
                        setHasDismissed(false);
                        setShowMessage(true);
                    } else {
                        setHasDismissed(true);
                    }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <img 
                    src={(isHovered || (showMessage && !hasDismissed)) ? "/images/Abhay-Logo-2.svg" : "/images/Abhay-Logo.svg"} 
                    alt="Abhay Pixel Art" 
                    className="avatar-image"
                />
            </motion.div>
        </div>
    );
};

export default AvatarHelper;
