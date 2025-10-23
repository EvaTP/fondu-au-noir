import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ScoreContextType {
  correctCount: number;
  totalQuestions: number;
  incrementScore: () => void;
  resetScore: () => void;
  setTotalQuestions: (total: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [correctCount, setCorrectCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // useEffect : Sauvegarde dans localStorage
  useEffect(() => {
    const scoreData = {
      correctCount,
      totalQuestions,
      date: new Date().toISOString(),
    };
    localStorage.setItem("lastScore", JSON.stringify(scoreData));
  }, [correctCount, totalQuestions]);

  const incrementScore = () => {
    setCorrectCount((prev) => prev + 1);
  };

  const resetScore = () => {
    setCorrectCount(0);
  };

  return (
    <ScoreContext.Provider
      value={{
        correctCount,
        totalQuestions,
        incrementScore,
        resetScore,
        setTotalQuestions,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

// Custom hook pour utiliser le context facilement
export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore doit être utilisé dans un ScoreProvider");
  }
  return context;
}
