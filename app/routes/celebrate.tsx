import { Link } from "react-router";
import type { Route } from "./+types/celebrate";
import Galaxy from "../components/Galaxy";
import BounceCards from "../components/BounceCards";
import CountUp from "../components/CountUp";
import { useMobile } from "../hooks/useMobile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Birthday! 💝" },
    { name: "description", content: "Celebrate your special day" },
  ];
}

// Random selection of 5 photos from the available collection
const images = [
  "/img/photo2.jpeg",
  "/img/photo8.jpeg",
  "/img/photo19.jpg",
  "/img/photo15.jpeg",
  "/img/photo1.jpeg",
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

const transformStylesMobile = [
  "rotate(10deg) translate(0px, -60px)",
  "rotate(5deg) translate(0px, -30px)",
  "rotate(0deg)",
  "rotate(-5deg) translate(0px, 30px)",
  "rotate(-10deg) translate(0px, 60px)"
];

export default function Celebrate() {
  const isMobile = useMobile();
  return (
    <div className="w-full min-h-screen overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="fixed inset-0 w-full h-full">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={300}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent={false}
        />
      </div>

      {/* Stage 1 Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-12 px-4">
        
        {/* Photo Gallery with BounceCards */}
        <div className="mb-12">
          <BounceCards
            className="custom-bounceCards"
            images={images}
            containerWidth={isMobile ? 300 : 500}
            containerHeight={isMobile ? 300 : 250}
            animationDelay={0.5}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={isMobile ? transformStylesMobile : transformStyles}
            enableHover
          />
        </div>

        {/* Birthday Text with CountUp Animation */}
        <div className="text-center mb-12 px-2">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Selamat Ulang Tahun yang ke </span>
            <span 
              className="inline-block font-extrabold"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #c44eb9 25%, #ff6b9d 50%, #ff8fab 75%, #c44eb9 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              <CountUp
                from={0}
                to={23}
                direction="up"
                duration={2}
                delay={1}
                className=""
              />
            </span>
            <span className="ml-2">💕</span>
          </h1>
        </div>

        {/* Button to Next Stage */}
        <Link
          to="/celebrate/stage2"
          className="group relative px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-semibold text-base md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 touch-manipulation"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c44eb9 25%, #ff6b9d 50%, #ff8fab 75%, #c44eb9 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            next page
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
