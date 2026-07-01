import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from './SmoothScroll';

// Premium custom ease curve for a cinematic feel
const transitionEase = [0.76, 0, 0.24, 1];

// Option 2: Cinema Scale & Fade (Final Choice)
// The content scales down slightly and fades out when exiting,
// and scales up smoothly while fading in when entering.
const cinemaVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: transitionEase } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.6, ease: transitionEase } 
  }
};

const AnimatedPage = ({ children }) => {
  const lenis = useSmoothScroll();
  const ref = useRef(null);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={cinemaVariants}
      style={{ width: "100%", minHeight: "100vh", position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
