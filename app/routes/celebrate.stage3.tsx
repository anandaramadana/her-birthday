import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/celebrate.stage3";
import ElasticSlider from "../components/ElasticSlider";
import DomeGallery from "../components/DomeGallery";
import { useMobile } from "../hooks/useMobile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Birthday! 💝" },
    { name: "description", content: "Momen spesial untukmu" },
  ];
}

// All photos from public/img folder
const galleryImages = [
  "/img/photo1.jpeg",
  "/img/photo2.jpeg",
  "/img/photo3.jpeg",
  "/img/photo4.jpeg",
  "/img/photo5.jpeg",
  "/img/photo6.jpeg",
  "/img/photo7.jpeg",
  "/img/photo8.jpeg",
  "/img/photo9.jpeg",
  "/img/photo10.jpeg",
  "/img/photo11.jpeg",
  "/img/photo12.jpeg",
  "/img/photo13.jpeg",
  "/img/photo14.jpeg",
  "/img/photo15.jpeg",
  "/img/photo16.jpg",
  "/img/photo17.jpg",
  "/img/photo18.jpg",
  "/img/photo19.jpg",
  "/img/photo20.jpg",
  "/img/photo21.jpg",
];

export default function CelebrateStage3() {
  const isMobile = useMobile();
  const [showGallery, setShowGallery] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Start the volume fill animation and play audio
    const startAnimation = () => {
      setIsAnimating(true);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(console.error);
      }

      const duration = 5000; // 5 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setVolumeValue(easeOutCubic * 100);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - show gallery
          setTimeout(() => {
            setShowGallery(true);
          }, 500);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Small delay before starting
    const timeout = setTimeout(startAnimation, 500);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Background Audio - plays throughout */}
      <audio ref={audioRef} src="/sound.mp3" loop />

      {/* Volume Bar Phase */}
      {!showGallery && (
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-500 ${
            showGallery ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Volume Icon */}
          <div className="mb-8">
            <svg 
              className="w-16 h-16 text-white/80" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </div>

          {/* Text */}
          <p className="text-white/60 text-lg mb-6 tracking-wide">
            {isAnimating ? "Playing your song..." : "Preparing..."}
          </p>

          {/* Elastic Volume Slider */}
          <ElasticSlider
            leftIcon={
              <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
              </svg>
            }
            rightIcon={
              <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            }
            startingValue={0}
            defaultValue={0}
            maxValue={100}
            isStepped={false}
            stepSize={1}
            value={volumeValue}
          />

          {/* Loading dots animation */}
          <div className="mt-8 flex gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Dome Gallery Phase */}
      {showGallery && (
        <div 
          className="absolute inset-0 z-10 animate-fadeIn"
          style={{ animation: 'fadeIn 1s ease-out' }}
        >
          <DomeGallery
            images={galleryImages}
            fit={0.8}
            minRadius={isMobile ? 300 : 600}
            maxVerticalRotationDeg={0}
            segments={isMobile ? 20 : 34}
            dragDampening={2}
            openedImageWidth={isMobile ? "90vw" : "400px"}
            openedImageHeight={isMobile ? "auto" : "400px"}
            grayscale={false}
            overlayBlurColor="#000000"
          />
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}
