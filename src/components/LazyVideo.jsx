import { useRef, useEffect, useState } from 'react';

const LazyVideo = ({ 
  src, 
  alt, 
  className = '',
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  ...props 
}) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.load();
              if (autoPlay) {
                videoRef.current.play().catch(err => {
                  console.warn('Video autoplay failed:', err);
                });
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        poster={poster}
        autoPlay={false}
        loop={loop}
        muted={muted}
        playsInline
        onLoadedData={handleLoadedData}
        {...props}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-white text-sm">Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;


