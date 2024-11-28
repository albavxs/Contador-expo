import { useState, useEffect, useCallback } from 'react';

// Constants for time calculations to avoid magic numbers
const SECONDS_IN_A_DAY = 86400; // 24 * 60 * 60
const SECONDS_IN_AN_HOUR = 3600; // 60 * 60
const SECONDS_IN_A_MINUTE = 60;

export const useCountdown = (initialTimeInSeconds: number): { timeLeft: number; formattedTime: string; showConfetti: boolean; triggerConfetti: () => void } => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false); // State for confetti trigger

  // Format time as days, hours, minutes, and seconds
  const formatTime = useCallback((time: number): string => {
    const days = Math.floor(time / SECONDS_IN_A_DAY);
    const hours = Math.floor((time % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR);
    const minutes = Math.floor((time % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
    const seconds = time % SECONDS_IN_A_MINUTE;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, []);

  // Trigger confetti manually (e.g., by clicking the emoji)
  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti duration of 3 seconds
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    setFormattedTime(formatTime(timeLeft));

    // Automatically show confetti when 60 seconds are left
    if (timeLeft <= 60 && !showConfetti) {
      setShowConfetti(true); // Show confetti when time reaches 60 seconds or less
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, formatTime, showConfetti]);

  return { timeLeft, formattedTime, showConfetti, triggerConfetti };
};

export default useCountdown;
