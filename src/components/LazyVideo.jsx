import { useRef, useEffect, useState } from 'react';

const LazyVideo = ({
  src,
  className = '',
  poster,
  thumbnail,
  autoPlay = true,
  loop = true,
  muted = true,
  alt = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Detect if source is an image or video
  const isImage = src && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(src);

  // Detect mobile/touch devices for performance optimization
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Get thumbnail from explicit props only
  const getThumbnail = () => {
    if (thumbnail) return thumbnail;
    if (poster) return poster;
    return null;
  };

  // Setup IntersectionObservers
  useEffect(() => {
    if (isImage) return;

    const container = containerRef.current;
    if (!container) return;

    // Load the video when it gets close to the viewport (e.g. 400px margin)
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          loadObserver.unobserve(container);
        }
      },
      { rootMargin: '400px' }
    );

    // Play/Pause when entering/leaving viewport
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    loadObserver.observe(container);
    playObserver.observe(container);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, [isImage]);

  // Set up video load/play/pause listeners
  useEffect(() => {
    if (isImage || !isNearViewport) return;

    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setHasLoaded(true);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isImage, isNearViewport, src]);

  // Play/pause the video element based on viewport intersection
  useEffect(() => {
    if (isImage || !isNearViewport) return;

    const video = videoRef.current;
    if (!video) return;

    if (isInViewport && hasLoaded) {
      if (autoPlay && muted) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.warn('Video playback failed:', err);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isImage, isInViewport, isNearViewport, hasLoaded, autoPlay, muted]);

  const handleImageLoad = () => {
    setHasLoaded(true);
  };

  const thumbnailSrc = getThumbnail();

  // Render image directly if source is an image file
  if (isImage) {
    return (
      <div ref={containerRef} className="relative w-full h-full">
        <img
          src={src}
          alt={alt}
          className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          onLoad={handleImageLoad}
          {...props}
        />
        {!hasLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Render video for video files
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

      {/* Video element - only load src once it's near the viewport */}
      <video
        ref={videoRef}
        src={isNearViewport ? src : undefined}
        className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        poster={thumbnailSrc}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload={isTouchDevice ? "metadata" : "auto"}
        {...props}
      />
    </div>
  );
};

export default LazyVideo;

