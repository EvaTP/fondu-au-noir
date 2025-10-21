// src/components/Timeline.tsx
import React from "react";
import { useState } from "react";
import FlashCard from "@/components/FlashCard";
import "@/styles/Timeline.css";
import type { Film } from "@/types/Film";

type TimelineProps = {
  films: Film[];
};

const Timeline: React.FC<TimelineProps> = ({ films }) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [resetKey, setResetKey] = useState(0); // key pour forcer le re-render
  const [hasStarted, setHasStarted] = useState(false); // vérifie si le quiz a commencé (le bouton "Rejouer" n'apparaît que si le quiz a commencé)

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
  };

  // Marque que le quiz a commencé (appelé dès qu'on clique sur une réponse)
  const handleAnswer = () => {
    setHasStarted(true); // indique que le quiz a commencé
  };

  // Fonction pour tout réinitialiser
  const handleReset = () => {
    setCorrectCount(0);
    setResetKey((prev) => prev + 1); // Change la key pour recréer tous les composants
    setHasStarted(false); // Reset l'état hasStarted
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll en haut de page
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

      {/* Bouton Reset en bas de page, visible seulement si le quiz a commencé */}
      {hasStarted && (
        <div className="reset-container">
          <button className="reset-button" onClick={handleReset}>
            🎬 Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
