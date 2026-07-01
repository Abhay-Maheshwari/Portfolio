import { useEffect, useRef, useState } from 'react';
import './Hero3D.css';

const FLICKER_ITEMS = [
    { l1: "SOFTWARE", l2: "ENGINEER" },
    { l1: "FULL-STACK", l2: "DEVELOPER" },
    { l1: "PROBLEM", l2: "SOLVER" },
    { l1: "CREATIVE", l2: "THINKER" },
    { l1: "AVID", l2: "READER" },
    { l1: "TECH", l2: "ENTHUSIAST" },
    { l1: "PHOTOGRAPHY", l2: "LOVER" },
    { l1: "JACK OF", l2: "ALL TRADES" }
];

const Hero3D = () => {
    const videoRef = useRef(null);
    const rafRef = useRef(null);
    const abhayTextRef = useRef(null);
    const jackTextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let isVideoReady = false;
        let fontsReady = false;
        let isFullyLoaded = false;

        const checkCompletion = () => {
            if (isVideoReady && fontsReady) {
                isFullyLoaded = true;
            }
        };

        // Scroll-driven video: map scroll position → video currentTime
        // Scroll range matches RadialReveal trigger zone (1× viewport height)
        let targetTime = 0;
        let currentTimeVal = 0;
        let animating = false;
        let lastFlickerTime = 0;
        let flickerIndex = 0;

        const smoothSeek = (time) => {
            // Lerp for smooth scrubbing
            currentTimeVal += (targetTime - currentTimeVal) * 0.15;

            // Snap when close enough
            if (Math.abs(targetTime - currentTimeVal) < 0.01) {
                currentTimeVal = targetTime;
            }

            if (video.readyState >= 2 && !video.seeking) {
                if (Math.abs(video.currentTime - currentTimeVal) > 0.02) {
                    video.currentTime = currentTimeVal;
                }
            }

            let needsContinuousUpdate = false;

            // Sync text overlays to video time
            if (abhayTextRef.current) {
                let op = 0;
                if (currentTimeVal > 2.0 && currentTimeVal < 3.0) op = (currentTimeVal - 2.0);
                else if (currentTimeVal >= 3.0 && currentTimeVal <= 5.8) op = 1;
                else if (currentTimeVal > 5.8 && currentTimeVal < 6.8) op = 1 - (currentTimeVal - 5.8);

                abhayTextRef.current.style.opacity = op;
                abhayTextRef.current.style.transform = `translate(-50%, -50%) scale(${0.95 + op * 0.05}) translateY(${20 - op * 20}px)`;
                abhayTextRef.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';

                if (op > 0.1) {
                    needsContinuousUpdate = true; // Keep looping to flicker
                    if (time - lastFlickerTime > 100) { // Update every 100ms
                        flickerIndex = (flickerIndex + 1) % FLICKER_ITEMS.length;
                        const children = abhayTextRef.current.children;
                        if (children.length >= 2) {
                            children[0].innerText = FLICKER_ITEMS[flickerIndex].l1;
                            children[1].innerText = FLICKER_ITEMS[flickerIndex].l2;
                        }
                        lastFlickerTime = time;
                    }
                }
            }

            if (jackTextRef.current) {
                let op = 0;
                if (currentTimeVal > 7.0 && currentTimeVal < 8.0) op = (currentTimeVal - 7.0);
                else if (currentTimeVal >= 8.0) op = 1;

                jackTextRef.current.style.opacity = op;
                jackTextRef.current.style.transform = `translate(-50%, -50%) scale(${0.95 + op * 0.05})`;
                jackTextRef.current.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
            }

            if (Math.abs(targetTime - currentTimeVal) > 0.001 || needsContinuousUpdate) {
                rafRef.current = requestAnimationFrame(smoothSeek);
            } else {
                animating = false;
            }
        };

        const updateVideoTime = () => {
            if (!video || !video.duration || !isFinite(video.duration)) return;

            // Video scrubs through first 2× viewport height of scroll
            const scrollHeight = window.innerHeight * 2;
            const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
            targetTime = scrollProgress * video.duration;

            if (!animating) {
                animating = true;
                rafRef.current = requestAnimationFrame(smoothSeek);
            }
        };

        const handleScroll = () => {
            updateVideoTime();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Font load check
        document.fonts.ready.then(() => {
            fontsReady = true;
            checkCompletion();
        }).catch(() => {
            fontsReady = true;
            checkCompletion();
        });

        // Video ready check
        const handleCanPlay = () => {
            isVideoReady = true;
            checkCompletion();
            // Pause immediately — scroll controls playback
            video.pause();
            // Set initial frame based on current scroll
            updateVideoTime();
        };

        if (video.readyState >= 3) {
            handleCanPlay();
        } else {
            video.addEventListener('canplaythrough', handleCanPlay, { once: true });
        }

        // Progress bar simulation loop
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
            if (!isFullyLoaded) {
                if (currentProgress < 90) {
                    currentProgress += Math.random() * 3 + 1;
                    if (currentProgress > 90) currentProgress = 90;
                    setProgress(currentProgress);
                }
            } else {
                if (currentProgress < 100) {
                    currentProgress += Math.random() * 8 + 4;
                    if (currentProgress >= 100) {
                        currentProgress = 100;
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 200);
                    }
                    setProgress(currentProgress);
                }
            }
        }, 30);

        return () => {
            clearInterval(progressInterval);
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            video.removeEventListener('canplaythrough', handleCanPlay);
        };
    }, []);

    return (
        <div className="hero3d-container">
            {/* Video Background — scroll-driven playback */}
            <video
                ref={videoRef}
                className="hero-video-bg"
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            >
                <source src="/images/i_wish_to_make_this_in_a_portr_smooth.webm" media="(max-width: 768px)" type="video/webm" />
                <source src="/images/hero-video-smooth-v4.webm" type="video/webm" />
            </video>

            {/* Darkening overlay for readability */}
            <div className="hero-video-overlay" />

            {/* Noise Overlay */}
            <div className="grain-overlay" />

            {/* Video Text Overlays */}
            <div className="video-text-overlay" ref={abhayTextRef}>
                <div className="video-text-line">SOFTWARE</div>
                <div className="video-text-line">ENGINEER</div>
            </div>

            <div className="video-text-overlay" ref={jackTextRef}>
                <div className="video-text-line"></div>
                <div className="video-text-line"></div>
            </div>

            {/* Loading Screen */}
            <div className={`hero3d-loader ${isLoading ? '' : 'loaded'}`} aria-live="polite" aria-busy={isLoading}>
                <div className="loader-content">
                    <h2 className="loader-title">ABHAY MAHESHWARI</h2>
                    <div className="loader-progress-track">
                        <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="loader-status">
                        <span className="loader-text">Initializing Experience</span>
                        <span className="loader-percentage">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero3D;
