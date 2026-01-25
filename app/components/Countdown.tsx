import { useState, useEffect } from 'react';
import Counter from './Counter';

interface CountdownProps {
  targetDate: Date;
  fontSize?: number;
  onComplete?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export default function Countdown({ targetDate, fontSize = 64, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0, isComplete: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);

        setTimeLeft({
          hours: totalHours,
          minutes: totalMinutes % 60,
          seconds: totalSeconds % 60,
          isComplete: false
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isComplete: true });
        if (onComplete) {
          onComplete();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const noGradientStyle = { background: 'transparent' };

  // Styling untuk background box
  const boxStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '16px 24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {/* Hours */}
      <div className="flex flex-col items-center" style={boxStyle}>
        <Counter
          value={timeLeft.hours}
          places={timeLeft.hours >= 100 ? [100, 10, 1] : [10, 1]}
          fontSize={fontSize}
          padding={5}
          gap={0}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
          gradientTo="transparent"
          topGradientStyle={noGradientStyle}
          bottomGradientStyle={noGradientStyle}
        />
        <span className="text-white/60 text-sm mt-2 uppercase tracking-widest">Jam</span>
      </div>

      {/* Separator */}
      <span className="text-white text-4xl md:text-6xl font-bold mb-6">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center" style={boxStyle}>
        <Counter
          value={timeLeft.minutes}
          places={[10, 1]}
          fontSize={fontSize}
          padding={5}
          gap={0}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
          gradientTo="transparent"
          topGradientStyle={noGradientStyle}
          bottomGradientStyle={noGradientStyle}
        />
        <span className="text-white/60 text-sm mt-2 uppercase tracking-widest">Menit</span>
      </div>

      {/* Separator */}
      <span className="text-white text-4xl md:text-6xl font-bold mb-6">:</span>

      {/* Seconds */}
      <div className="flex flex-col items-center" style={boxStyle}>
        <Counter
          value={timeLeft.seconds}
          places={[10, 1]}
          fontSize={fontSize}
          padding={5}
          gap={0}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
          gradientTo="transparent"
          topGradientStyle={noGradientStyle}
          bottomGradientStyle={noGradientStyle}
        />
        <span className="text-white/60 text-sm mt-2 uppercase tracking-widest">Detik</span>
      </div>
    </div>
  );
}
