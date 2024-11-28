// src/hooks/useConfetti.ts
import { useState, useCallback } from 'react';

const CONFETTI_DURATION = 3000; // 3 segundos

export const useConfetti = () => {
  const [isConfettiVisible, setIsConfettiVisible] = useState<boolean>(false);

  const triggerConfetti = useCallback(() => {
    setIsConfettiVisible(true);
    setTimeout(() => setIsConfettiVisible(false), CONFETTI_DURATION);
  }, []);

  return { isConfettiVisible, triggerConfetti };
};

export default useConfetti;
