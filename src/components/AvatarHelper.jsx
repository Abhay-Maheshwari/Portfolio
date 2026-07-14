import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AvatarHelper.css';
import { owner, navLinks } from '../constants';
import StaggeredMenu from './ReactBits/StaggeredMenu';

const AvatarHelper = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const staggeredMenuRef = React.useRef(null);

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

    // We don't track the PersistentNav anymore, we track the StaggeredMenu
    // The StaggeredMenu handles its own open state internally, but we can listen to it if needed.
    // For now, we will just pass callbacks.

    return (
        <div className="avatar-helper-container">
            <motion.div
                drag
                dragConstraints={{ top: -2000, left: -2000, right: 50, bottom: 50 }}
                dragElastic={0.1}
                dragMomentum={false}
                style={{ touchAction: 'none', pointerEvents: 'auto' }}
                onTap={(e, info) => {
                    // Open the StaggeredMenu
                    if (staggeredMenuRef.current) {
                        staggeredMenuRef.current.toggleMenu();
                    }
                    
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
            
            {/* Restored Staggered Menu */}
            <StaggeredMenu 
                ref={staggeredMenuRef}
                items={navLinks.map(link => ({ 
                    text: link.name.toUpperCase(), 
                    link: link.link,
                    image: `/images/${link.name.toLowerCase()}_menu.png`
                }))}
                socialItems={[]}
                position="left"
                showHeader={false}
                onMenuOpen={() => setIsMenuOpen(true)}
                onMenuClose={() => setIsMenuOpen(false)}
            />
        </div>
    );
};

export default AvatarHelper;
