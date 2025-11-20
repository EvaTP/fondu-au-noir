// src/components/Timeline.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashCard from "@/components/FlashCard";
import { useScore } from "@/context/ScoreContext";
import "@/styles/Timeline.css";
import type { Film } from "@/types/Film";

type TimelineProps = {
  films: Film[];
};

const Timeline: React.FC<TimelineProps> = ({ films }) => {
  const navigate = useNavigate();
  const { correctCount, incrementScore, resetScore } = useScore(); // destructure le context
  const [resetKey, setResetKey] = useState(0); // key pour forcer le re-render
  const [hasStarted, setHasStarted] = useState(false); // vérifie si le quiz a commencé (le bouton "Rejouer" n'apparaît que si le quiz a commencé)

  const handleCorrect = () => {
    incrementScore(); // utilise la fonction du context
  };

  // Marque que le quiz a commencé (appelé dès qu'on clique sur une réponse)
  const handleAnswer = () => {
    setHasStarted(true); // indique que le quiz a commencé
  };

  // Fonction pour tout réinitialiser
  const handleReset = () => {
    resetScore(); // utilise la fonction du context
    setResetKey((prev) => prev + 1); // change la key pour recréer tous les composants
    setHasStarted(false); // reset l'état hasStarted
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll en haut de page
  };

  // Naviguer vers le Scoreboard
  const handleFinish = () => {
    navigate("/scoreboard");
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line" />

      {films.map((film, index) => {
        const position = index % 2 === 0 ? "left" : "right"; // alterne gauche/droite
        return (
          <div key={film.id} className="timeline-item">
            <div className="timeline-year">{film.year}</div>
            <div className="timeline-dot"></div>
            {/* FLASHCARD */}
            <FlashCard
              key={`${film.id}-${resetKey}`}
              film={film}
              onCorrect={handleCorrect}
              onAnswer={handleAnswer}
              position={position}
              index={index} // passe l'index pour le délai
            />
          </div>
        );
      })}

      <div className="score">
        Bonnes réponses : <br /> ✅ {correctCount} / {films.length}
      </div>

      {/* Boutons Reset ET Voir résultats, reset-container toujours visible et boutons visibles seulement si le quiz a commencé */}
      <div className="reset-container">
        {hasStarted && (
          <>
            <button
              className="reset-button finish-button"
              onClick={handleFinish}
            >
              🏆 Voir mes résultats
            </button>

            <button className="reset-button" onClick={handleReset}>
              🎬 Rejouer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timeline;
