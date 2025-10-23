// custom hook pour la page Scoreboard

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti(trigger: boolean) {
  // ✨ useCallback : Mémorise la fonction pour éviter les re-créations
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ffd700", "#646cff", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // ✨ useEffect : Lance les confettis quand trigger devient true
  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return { fireConfetti };
}
