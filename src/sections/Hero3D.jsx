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
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let fontsReady = false;
        let isFullyLoaded = false;
        let blobUrl = null;

        const checkCompletion = () => {
            if (fontsReady && isFullyLoaded) {
                // Add a small delay so user can see 100%
                setTimeout(() => setIsLoading(false), 200);
            }
        };

        // Scroll-driven video: map scroll position → video currentTime
        // Scroll range matches RadialReveal trigger zone (1× viewport height)
        let targetTime = 0;
        let currentTimeVal = 0;
        let animating = false;
        let lastFlickerTime = 0;
        let flickerIndex = 0;
        let isSeeking = false; // Guard to prevent decoder overload

        const smoothSeek = (time) => {
            // Lerp for smooth scrubbing - lowered from 0.15 to 0.06 for much softer starts/stops (more inertia)
            currentTimeVal += (targetTime - currentTimeVal) * 0.06;

            // Snap when close enough - lowered threshold to prevent abrupt halt
            if (Math.abs(targetTime - currentTimeVal) < 0.001) {
                currentTimeVal = targetTime;
            }

            if (video.readyState >= 1) {
                // NEVER hammer currentTime faster than the browser can decode
                if (!isSeeking && Math.abs(video.currentTime - currentTimeVal) > 0.01) {
                    isSeeking = true;
                    video.currentTime = currentTimeVal;
                }
            }

            let needsContinuousUpdate = false;
            const d = video.duration || 10;

            // Sync text overlays to video time dynamically based on duration
            if (abhayTextRef.current) {
                let op = 0;
                // Fade in 35%-45%, Visible 45%-55%, Fade out 55%-65%
                // Pushed much later into the video to strictly avoid the intro/outro Jack Card frames
                const fadeInStart = d * 0.35;
                const fadeInEnd = d * 0.45;
                const fadeOutStart = d * 0.55;
                const fadeOutEnd = d * 0.65;

                if (currentTimeVal > fadeInStart && currentTimeVal < fadeInEnd) {
                    op = (currentTimeVal - fadeInStart) / (fadeInEnd - fadeInStart);
                } else if (currentTimeVal >= fadeInEnd && currentTimeVal <= fadeOutStart) {
                    op = 1;
                } else if (currentTimeVal > fadeOutStart && currentTimeVal < fadeOutEnd) {
                    op = 1 - (currentTimeVal - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                }

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

            if (Math.abs(targetTime - currentTimeVal) > 0.001 || needsContinuousUpdate) {
                rafRef.current = requestAnimationFrame(smoothSeek);
            } else {
                animating = false;
            }
        };

        const updateVideoTime = () => {
            if (!video || !video.duration || !isFinite(video.duration)) return;

            // Video scrubs through first 4× viewport height of scroll (slower exploration)
            const scrollHeight = window.innerHeight * 4;
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
        
        const handleSeeked = () => {
            isSeeking = false;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        video.addEventListener('seeked', handleSeeked);

        // Font load check
        document.fonts.ready.then(() => {
            fontsReady = true;
            checkCompletion();
        }).catch(() => {
            fontsReady = true;
            checkCompletion();
        });

        // Fetch video as Blob
        const loadVideo = () => {
            const isMobile = window.innerWidth <= 768;
            const videoUrl = isMobile ? '/images/hero-kf-mob.webm' : '/images/hero-kf-desk.webm';
            
            const xhr = new XMLHttpRequest();
            xhr.open('GET', videoUrl, true);
            xhr.responseType = 'blob';

            xhr.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    blobUrl = URL.createObjectURL(xhr.response);
                    video.src = blobUrl;
                    
                    video.addEventListener('loadedmetadata', () => {
                        isFullyLoaded = true;
                        setProgress(100);
                        checkCompletion();
                        
                        // Decoder warmup trick for iOS/Safari
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                video.pause();
                                updateVideoTime();
                            }).catch(() => {
                                // Ignore autoplay errors, just setup timeline
                                updateVideoTime();
                            });
                        } else {
                            video.pause();
                            updateVideoTime();
                        }
                    }, { once: true });
                }
            };
            
            xhr.onerror = () => {
                // Fallback if XHR fails
                isFullyLoaded = true;
                setProgress(100);
                checkCompletion();
            };

            xhr.send();
        };

        loadVideo();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            video.removeEventListener('seeked', handleSeeked);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (blobUrl) URL.revokeObjectURL(blobUrl);
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
            />

            {/* Darkening overlay for readability */}
            <div className="hero-video-overlay" />

            {/* Noise Overlay */}
            <div className="grain-overlay" />

            {/* Video Text Overlays */}
            <div className="video-text-overlay" ref={abhayTextRef}>
                <div className="video-text-line">SOFTWARE</div>
                <div className="video-text-line">ENGINEER</div>
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
