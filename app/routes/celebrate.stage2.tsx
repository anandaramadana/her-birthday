import { Link } from "react-router";
import type { Route } from "./+types/celebrate.stage2";
import Galaxy from "../components/Galaxy";
import ScrollReveal from "../components/ScrollReveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Birthday! 💝" },
    { name: "description", content: "Ucapan dan harapan untukmu" },
  ];
}

// Opening greeting - separate section
const greetingText = `selamat ulang tahun yang ke-23, Sayang.`;

// Main birthday message
const mainMessage = `semoga di usiamu yang ke-23 ini dilancarkan dan diringankan jalan buat ngejar semua cita - citanya. semoga jadi pribadi yang lebih dewasa dan selalu bijak buat mengambil keputusan yang benar. makin nambah umur pasti makin kerasa fase dewasanyaa huehehehehehe. harus kuat yachhhh, Bismillah. tentu juga nambah usia, juga makin nambah juga baktinya ke orang tua, makin rajin ibadahnyaa, makin lancar juga rezekinyaa. semoga diberi panjang umur buat ngelakuin banyak hal baik. selalu diiringi keberkahan dan selalu bahagiaa ya sayangggg. wish u all the best & god bless u babe.`;

// Closing message - separate section
const closingText = `terima kasih sudah hadir put, happy birthday 💓.`;

export default function CelebrateStage2() {
  return (
    <div className="w-full min-h-screen bg-black">
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

      {/* Stage 2 Content - Scrollable */}
      <div className="relative z-10 w-full">
        {/* Scroll Down Indicator - First thing user sees */}
        <div className="h-screen flex flex-col items-center justify-center">
          <p className="text-white text-2xl md:text-3xl font-medium mb-4 tracking-wide">
            Scroll Down
          </p>
          {/* Arrow Down Icon */}
          <div className="animate-bounce">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
        
        {/* Birthday Message with Scroll Reveal - Greeting */}
        <div className="mx-auto px-6 md:px-12">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white"
            wordAnimationEnd="center center"
            rotationEnd="center center"
          >
            {greetingText}
          </ScrollReveal>
        </div>

        {/* Spacer between greeting and main message */}
        <div className="h-[20vh]" />

        {/* Main Birthday Message */}
        <div className="mx-auto px-6 md:px-12">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white"
            wordAnimationEnd="center center"
            rotationEnd="center center"
          >
            {mainMessage}
          </ScrollReveal>
        </div>

        {/* Spacer between main message and closing */}
        <div className="h-[20vh]" />

        {/* Closing Message */}
        <div className="mx-auto px-6 md:px-12">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white"
            wordAnimationEnd="top center"
            rotationEnd="top center"
          >
            {closingText}
          </ScrollReveal>
        </div>

        {/* Spacer before button */}
        <div className="h-[40vh]" />

        {/* Button to Final Stage */}
        <div className="flex justify-center pb-32">
          <Link
            to="/celebrate/stage3"
            className="group relative px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-semibold text-base md:text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #c44eb9 25%, #ff6b9d 50%, #ff8fab 75%, #c44eb9 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease infinite',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              goes to last page 
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
