import React, { useState, useEffect, useCallback } from 'react';
import { Timer as TimerIcon, Pause, Play, RotateCcw } from 'lucide-react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  isBreak?: boolean;
}

export function Timer({ duration, onComplete, isBreak }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(false);
  }, [duration]);

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className={`text-6xl font-bold ${isBreak ? 'text-green-500' : 'text-blue-600'}`}>
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`p-3 rounded-full ${
            isActive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          } hover:opacity-80 transition-opacity`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={reset}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:opacity-80 transition-opacity"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}