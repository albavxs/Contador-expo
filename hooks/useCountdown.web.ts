import { useState, useEffect, useCallback } from 'react';

// Constantes para cálculos de tempo para evitar números mágicos
const SECONDS_IN_A_DAY = 86400; // 24 * 60 * 60
const SECONDS_IN_AN_HOUR = 3600; // 60 * 60
const SECONDS_IN_A_MINUTE = 60;

export const useCountdown = (initialTimeInSeconds: number): { timeLeft: number; formattedTime: string; showConfetti: boolean; triggerConfetti: () => void } => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false); // Estado para disparar o confete

  // Formata o tempo em dias, horas, minutos e segundos
  const formatTime = useCallback((time: number): string => {
    const days = Math.floor(time / SECONDS_IN_A_DAY);
    const hours = Math.floor((time % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR);
    const minutes = Math.floor((time % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
    const seconds = time % SECONDS_IN_A_MINUTE;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, []);

  // Dispara o confete manualmente (ex.: ao clicar no emoji)
  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Duração do confete: 3 segundos
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    setFormattedTime(formatTime(timeLeft));

    // Mostra automaticamente o confete quando faltam 60 segundos
    if (timeLeft <= 60 && !showConfetti) {
      setShowConfetti(true); // Exibe o confete quando o tempo atinge 60 segundos ou menos
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, formatTime, showConfetti]);

  return { timeLeft, formattedTime, showConfetti, triggerConfetti };
};

export default useCountdown;
