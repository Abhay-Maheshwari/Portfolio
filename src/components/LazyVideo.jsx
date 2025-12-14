import { useRef, useEffect, useState } from 'react';

const LazyVideo = ({
  src,
  className = '',
  poster,
  thumbnail,
  autoPlay = true,
  loop = true,
  muted = true,
  ...props
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get thumbnail from explicit props only (don't auto-generate to avoid 404s)
  const getThumbnail = () => {
    if (thumbnail) return thumbnail;
    if (poster) return poster;
    // Don't auto-generate thumbnail paths - they don't exist and cause 404 errors
    // The component will use a gradient placeholder instead
    return null;
  };

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    // Intersection Observer for visibility-based play/pause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInView = entry.isIntersecting;
          setIsVisible(isInView);

          if (video && hasLoaded) {
            if (isInView && autoPlay) {
              video.play().catch(err => {
                console.warn('Video autoplay failed:', err);
              });
              setIsPlaying(true);
            } else {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.3, // Video must be 30% visible to play
      }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [autoPlay, hasLoaded]);

  // Load video when first becomes visible
  useEffect(() => {
    const video = videoRef.current;

    if (isVisible && video && !hasLoaded) {
      video.load();
    }
  }, [isVisible, hasLoaded]);

  const handleLoadedData = () => {
    setHasLoaded(true);
    // Auto-play if already visible when loaded
    if (isVisible && autoPlay && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Video autoplay failed:', err);
      });
      setIsPlaying(true);
    }
  };

  const thumbnailSrc = getThumbnail();

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Thumbnail - shown until video loads and starts playing */}
      {thumbnailSrc && !isPlaying && (
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${hasLoaded && isPlaying ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `url(${thumbnailSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Loading placeholder - shown if no thumbnail */}
      {!thumbnailSrc && !hasLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        poster={thumbnailSrc}
        autoPlay={false}
        loop={loop}
        muted={muted}
        playsInline
        preload="none"
        onLoadedData={handleLoadedData}
        {...props}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
};

export default LazyVideo;


