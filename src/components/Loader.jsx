import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
    "Brewing coffee...",
    "Compiling awesomeness...",
    "Waking up servers...",
    "Ready."
];

const Loader = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1 < phrases.length ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
            <div className="flex flex-col items-center w-64">
                <div className="h-6 mb-4 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-white/90 font-mono text-sm"
                        >
                            {phrases[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "easeInOut" }}
                        className="h-full bg-white"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
