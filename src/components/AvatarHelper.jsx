import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './AvatarHelper.css';
import StaggeredMenu from './ReactBits/StaggeredMenu';
import { owner } from '../constants';

const flowingItems = [
  { link: '/', text: 'Home', image: '/images/home_menu.png' },
  { link: '/work', text: 'Work', image: '/images/work_menu.png' },
  { link: '/experience', text: 'Experience', image: '/images/experience_menu.png' },
  { link: '/skills', text: 'Skills', image: '/images/skills_menu.png' },
  { link: '/contact', text: 'Contact', image: '/images/contact_menu.png' }
];

const socialItems = [
  { label: 'LinkedIn', link: owner.socials.linkedin },
  { label: 'GitHub', link: owner.socials.github }
];

const AvatarHelper = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const staggeredMenuRef = useRef(null);

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

    return (
        <>
            <div className="avatar-helper-container">
                <motion.div
                    drag
                    dragConstraints={{ top: -2000, left: -2000, right: 50, bottom: 50 }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    style={{ touchAction: 'none', pointerEvents: 'auto' }}
                >
                    <motion.div 
                        className="avatar-image-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95, cursor: "grabbing" }}
                        onClick={(e) => {
                        // Open the StaggeredMenu popup instead of main navbar
                        staggeredMenuRef.current?.openMenu();
                        
                        // Keep the current logic for dismiss if any
                        if (hasDismissed) {
                            setHasDismissed(false);
                            setShowMessage(true);
                        } else {
                            setHasDismissed(true);
                        }
                    }}
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
            
            <StaggeredMenu 
                ref={staggeredMenuRef}
                items={flowingItems}
                socialItems={socialItems}
                position="right"
                accentColor="#ffffff"
                showHeader={true}
                isFixed={true}
                logoUrl={null}
                onMenuOpen={() => setIsMenuOpen(true)}
                onMenuClose={() => setIsMenuOpen(false)}
            />
        </>
    );
};

export default AvatarHelper;
