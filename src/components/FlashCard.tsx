import { useState } from "react";
import type { Film } from "@/types/Film";
import "@/styles/FlashCard.css";

interface FlashCardProps {
  film: Film;
  onCorrect: () => void;
  onAnswer: () => void;
  position: "left" | "right";
}

export default function FlashCard({
  film,
  onCorrect,
  onAnswer,
  position,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0); // Compteur de tentatives
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  const handleClick = (option: string) => {
    setSelectedOption(option);
    setFlipped(true);
    setAttempts((prev) => prev + 1);
    onAnswer(); // informe la Timeline que le joueur a commencé

    if (option === film.answer) {
      setHasAnsweredCorrectly(true);
      onCorrect();
    }
  };

  const isCorrect = selectedOption === film.answer;

  // On peut rejouer si c'est la première tentative (attempts === 1) et qu'on n'a pas trouvé
  const canRetry = attempts === 1 && !hasAnsweredCorrectly;

  // C'est la dernière tentative (2ème essai) qui a échoué
  const isLastAttemptFailed = attempts === 2 && !hasAnsweredCorrectly;

  const handleRetry = () => {
    setFlipped(false);
    setSelectedOption(null);
    // IMPORTANT : on ne reset PAS attempts, on garde le compteur
  };

  return (
    <div className={`flashcard ${position} ${flipped ? "flipped" : ""}`}>
      <div className="flashcard-inner">
        {/* FRONT */}
        <div className="flashcard-front">
          <div className="image-frame">
            <img src={film.image} alt={film.title} />
          </div>
          <h3>
            {film.title} ({film.year})
          </h3>
          <h3>de {film.director}</h3>
          <p className="question">{film.question}</p>

          <div className="options">
            {film.options.map((option, idx) => (
              <button key={idx} onClick={() => handleClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* BACK */}
        <div className="flashcard-back">
          <h4>{isCorrect ? "🎉 Bonne réponse !" : "❌ Mauvaise réponse"}</h4>

          {/* Affiche la réponse UNIQUEMENT si bonne réponse du 1er coup */}
          {isCorrect && (
            <p className="answer">
              <strong>{film.answer}</strong>
            </p>
          )}

          {/* Première tentative échouée - affiche le bouton rejouer */}
          {canRetry && (
            <>
              <p className="retry-info">
                Il te reste <strong>1 tentative</strong>
              </p>
              <button className="retry-button" onClick={handleRetry}>
                Rejouer
              </button>
            </>
          )}

          {/* Deuxième tentative échouée - affiche la bonne réponse */}
          {isLastAttemptFailed && (
            <p className="answer">
              <strong>La bonne réponse était : {film.answer}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
