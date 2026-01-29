import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import Galaxy from "../components/Galaxy";
import Countdown from "../components/Countdown";
import TextType from "../components/TextType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Birthday! 💝" },
    { name: "description", content: "A special surprise for you" },
  ];
}

export default function Home() {
  // Target: 30 Januari 2026 jam 00:00
  const targetDate = new Date(2026, 0, 30, 0, 0, 0);
  
  // State untuk mengontrol apakah countdown sudah selesai
  const [isBirthdayTime, setIsBirthdayTime] = useState(false);

  const handleCountdownComplete = () => {
    setIsBirthdayTime(true);
  };

  // Simulasi untuk testing
  const handleSimulate = () => {
    setIsBirthdayTime(true);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="fixed inset-0 w-full h-full">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent={false}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {!isBirthdayTime ? (
          <>
            {/* Countdown */}
            <Countdown 
              targetDate={targetDate} 
              fontSize={64} 
              onComplete={handleCountdownComplete}
            />

            {/* Tombol Simulasi - hanya untuk testing */}
            {/* <button
              onClick={handleSimulate}
              className="mt-12 px-6 py-3 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white rounded-lg text-sm transition-all duration-300 border border-white/20"
            >
              🎭 Simulasi Birthday (Testing Only)
            </button> */}
          </>
        ) : (
          /* Birthday Reveal Content */
          <div className="flex flex-col items-center justify-center gap-6 md:gap-8 max-w-full">
            {/* Typing Text */}
            <TextType
              text={["halooo, di klik ya sayang 💕"]}
              typingSpeed={75}
              pauseDuration={3000}
              showCursor
              cursorCharacter="|"
              deletingSpeed={60}
              loop={false}
              className="text-2xl md:text-5xl font-bold text-white text-center px-4"
              cursorClassName="text-pink-400"
            />

            {/* Pink Gradient Button */}
            <Link
              to="/celebrate"
              className="group relative mt-4 md:mt-6 px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-semibold text-base md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 touch-manipulation"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #c44eb9 25%, #ff6b9d 50%, #ff8fab 75%, #c44eb9 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                let's celebrate your day 💓
              </span>
              
              {/* Glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #c44eb9 50%, #ff8fab 100%)',
                  filter: 'blur(15px)',
                  transform: 'scale(1.2)',
                }}
              />
            </Link>
          </div>
        )}
      </div>

      {/* CSS Animation for gradient */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
