// src/components/Timeline.tsx
import React from "react";
import { useState, useRef } from "react";
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
  // const [currentIndex, setCurrentIndex] = useState(0); // état pour suivre l'index actuel
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // refs pour chaque item de la timeline
  // const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null); // Carte dont la modale est ouverte

  // Incrémente le score quand la réponse est correcte
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

  // Naviguer vers la page Scoreboard
  const handleFinish = () => {
    navigate("/scoreboard");
  };

  // scroller automatiquement vers la carte suivante
  const scrollToNextCard = (index: number) => {
    const next = itemRefs.current[index + 1];
    if (next) {
      setTimeout(() => {
        next.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300); // délai pour laisser le temps de voir la réponse
    }
  };

  /**
   * Fonction appelée quand une question est répondue (correctement ou pas)
   * - Attend 3s si la réponse est correcte
   * - OU quand la modale est fermée (ne passe pas à la carte suivante si la modale est ouverte)
   */
  const handleQuestionAnswered = (
    index: number,
    _isCorrect: boolean, // _ pour indiquer que la variable n'est pas utilisée mais est nécessaire
    modalIsOpen: boolean
  ) => {
    // Si la modale est ouverte, on attend qu'elle se ferme
    if (modalIsOpen) {
      return;
    }
    // Sinon, on passe à la carte suivante
    scrollToNextCard(index);
  };

  /**
   * Appelé quand la modale se ferme
   */
  const handleModalClose = (index: number) => {
    // Après fermeture de la modale, scroll vers la carte suivante
    scrollToNextCard(index);
  };
  // Délai pour laisser le joueur voir la bonne réponse

  //   setTimeout(() => {
  //     const nextIndex = index + 1;
  //     setCurrentIndex(nextIndex);
  //     scrollToNextCard(index);
  //   }, delay);
  // };

  /**
   * Callback quand la modale se ferme
   * - Si la modale correspond à la carte actuelle, on continue le scroll
   */
  // const handleModalClose = (index: number, isCorrect: boolean) => {
  //   setModalOpenIndex(null);
  //   // Après fermeture de la modale, continue vers la carte suivante
  //   handleQuestionAnswered(index, isCorrect, false);
  // };

  // const handleQuestionAnswered = () => {
  //   const nextIndex = currentIndex + 1;
  //   setCurrentIndex(nextIndex); // met à jour le state
  //   const nextCard = itemRefs.current[nextIndex];
  //   if (nextCard) {
  //     nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // };

  // const handleQuestionAnswered = (index: number) => {
  //   setCurrentIndex(index + 1); // met à jour l'index actuel
  //   scrollToNextCard(index);
  // };

  return (
    <div className="timeline-container">
      <div className="timeline-line" />

      {films.map((film, index) => {
        const position = index % 2 === 0 ? "left" : "right"; // alterne gauche/droite
        return (
          <div
            key={film.id}
            className="timeline-item"
            ref={(el) => {
              // stocke chaque div dans itemRefs pour le scroll automatique
              itemRefs.current[index] = el;
            }}
          >
            <div className="timeline-year">{film.year}</div>
            <div className="timeline-dot"></div>
            {/* FLASHCARD */}
            <FlashCard
              key={`${film.id}-${resetKey}`} // ajoute resetKey pour forcer le re-render
              film={film}
              onCorrect={handleCorrect}
              onAnswer={handleAnswer}
              // Passe l'index, si la réponse est correcte et si la modale est ouverte
              onQuestionAnswered={(isCorrect: boolean, modalIsOpen: boolean) =>
                handleQuestionAnswered(index, isCorrect, modalIsOpen)
              }
              onModalClose={() => handleModalClose(index)}
              position={position}
              index={index}
            />
          </div>
        );
      })}

      {/* Affichage du score */}
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
