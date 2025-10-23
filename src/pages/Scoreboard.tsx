// page pages/Scoreboard.tsx

import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScore } from "@/context/ScoreContext";
import { useConfetti } from "@/hooks/useConfetti";
import "@/styles/Scoreboard.css";

export default function Scoreboard() {
  const { correctCount, totalQuestions, resetScore } = useScore();
  const navigate = useNavigate();
  const scoreHistory = JSON.parse(
    localStorage.getItem("scoreHistory") || "[]"
  ).reverse();

  // ✨ Trigger les confettis dès l'arrivée sur la page
  useConfetti(true);

  // ✨ useMemo :
  // 1) Calcule le pourcentage de bonnes réponses
  // 2) Affiche un message personnalisé selon le score (ne recalcule que si le score change)
  // 2) Affiche un quote selon le score obtenu (avec le bouton voir citation)

  const scoreMessage = useMemo(() => {
    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage === 100) {
      return {
        title: "🏆 Parfait !",
        message: "Tu es un véritable expert du film noir !",
        quote:
          "« The stuff that dreams are made of. » — *Le Faucon maltais* (1941)",
      };
    } else if (percentage >= 80) {
      return {
        title: "🌟 Excellent !",
        message: "Tu connais très bien le cinéma noir.",
        quote: "« Forget it, Jake. It’s Chinatown. » — *Chinatown* (1974)",
      };
    } else if (percentage >= 60) {
      return {
        title: "👍 Bien joué !",
        message:
          "Bonne culture cinéma ! Quelques révisions et ce sera parfait.",
        quote:
          "« I was born when she kissed me... » — *In a Lonely Place* (1950)",
      };
    } else if (percentage >= 40) {
      return {
        title: "🎯 Pas mal !",
        message: "Tu as des bonnes bases, continue à découvrir ces films !",
        quote:
          "« You know how to whistle, don’t you? » — *Le Port de l’angoisse* (1944)",
      };
    } else {
      return {
        title: "🎬 À découvrir !",
        message: "Peut-etre préfères-tu les comédies romantiques...",
        quote:
          "« All right, Mr. DeMille, I’m ready for my close-up. » — *Sunset Boulevard* (1950)",
      };
    }
  }, [correctCount, totalQuestions]);

  const [showQuote, setShowQuote] = useState(false);

  const handleRestart = () => {
    resetScore();
    navigate("/");
  };

  // useEffect : Sauvegarde l'historique des scores
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("scoreHistory") || "[]");
    const newScore = {
      score: correctCount,
      total: totalQuestions,
      date: new Date().toISOString(),
    };
    history.push(newScore);
    // Garde seulement les 5 derniers scores
    if (history.length > 5) history.shift();
    localStorage.setItem("scoreHistory", JSON.stringify(history));
  }, [correctCount, totalQuestions]);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-card">
        <h1 className="scoreboard-title">{scoreMessage.title}</h1>
        <p className="scoreboard-message">{scoreMessage.message}</p>

        <div className="scoreboard-stats">
          <div className="stat-item">
            <span className="stat-label">Score</span>
            <span className="stat-value">
              {correctCount} / {totalQuestions}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Pourcentage</span>
            <span className="stat-value">
              {Math.round((correctCount / totalQuestions) * 100)}%
            </span>
          </div>
        </div>

        {/* citation */}
        <div className="scoreboard-quote-section">
          {!showQuote ? (
            <button
              className="btn-secondary"
              onClick={() => setShowQuote(true)}
            >
              🎬 Ma citation
            </button>
          ) : (
            <blockquote className="scoreboard-quote">
              {scoreMessage.quote}
            </blockquote>
          )}
        </div>

        <div className="scoreboard-history">
          <h4>Historique de tes derniers scores</h4>
          <ul>
            {scoreHistory.map((entry: any, index: number) => (
              <li key={index}>
                {new Date(entry.date).toLocaleDateString("fr-FR")} —{" "}
                {entry.score}/{entry.total} (
                {Math.round((entry.score / entry.total) * 100)}%)
              </li>
            ))}
          </ul>
        </div>

        {/* Bouton RETOUR AU QUIZ  */}
        <div className="scoreboard-actions">
          <button className="btn-primary" onClick={handleRestart}>
            Retour au quiz
          </button>

          {/* <button className="btn-tertiary" onClick={() => navigate("/")}>
            Retour au quiz
          </button> */}
        </div>
      </div>
    </div>
  );
}
