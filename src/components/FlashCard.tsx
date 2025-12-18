// src/components/FlashCard.tsx
import { useState, useRef } from "react";
import { motion, easeOut } from "framer-motion";
import type { Film } from "@/types/Film";
import "@/styles/FlashCard.css";
import Modal from "@/components/Modal";

interface FlashCardProps {
  film: Film;
  onCorrect: () => void;
  onAnswer: () => void;
  onQuestionAnswered: (isCorrect: boolean, modalIsOpen: boolean) => void;
  onModalClose: (isCorrect: boolean) => void;
  position: "left" | "right";
  index: number; // pour gérer le délai d'apparition de la première carte
}

export default function FlashCard({
  film,
  onCorrect,
  onAnswer,
  onQuestionAnswered,
  onModalClose,
  position,
  index,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0); // Compteur de tentatives
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  // Modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  // référence pour stocker le timer
  const scrollTimerRef = useRef<number | null>(null);

  const isCorrect = selectedOption === film.answer;
  const canRetry = attempts === 1 && !hasAnsweredCorrectly;
  const isLastAttemptFailed = attempts === 2 && !hasAnsweredCorrectly;

  // useEffect pour signaler à la Timeline la fin de la question si dernière tentative échouée
  // useEffect(() => {
  //   if (isLastAttemptFailed) {
  //     onQuestionAnswered();
  //   }
  // }, [isLastAttemptFailed, onQuestionAnswered]);

  const handleClick = (option: string) => {
    setSelectedOption(option);
    setFlipped(true);
    setAttempts((prev) => prev + 1);
    onAnswer(); // informe la Timeline que le joueur a commencé

    const correct = option === film.answer;

    if (correct) {
      setHasAnsweredCorrectly(true);
      onCorrect();
    }
    // Signale à Timeline qu'une réponse a été donnée
    // - Si bonne réponse : délai de 3 secondes (temps pour voir + cliquer "En savoir +")
    // - Si 1ère tentative ratée : pas de scroll (on attend le 2e essai)
    // - Si 2e tentative ratée : délai de 3 secondes
    if (correct || attempts === 1) {
      //stocker le timer dans la ref
      scrollTimerRef.current = window.setTimeout(() => {
        onQuestionAnswered(correct, false);
      }, 4000); // 4 secondes pour lire et cliquer
    }

    // if (option === film.answer) {
    //   setHasAnsweredCorrectly(true);
    //   onCorrect();
    //   onQuestionAnswered(); // informe la Timeline que la question a été répondue
    // }
  };

  const handleRetry = () => {
    setFlipped(false);
    setSelectedOption(null);
    // IMPORTANT : on ne reset PAS attempts, on garde le compteur
  };

  const handleOpenModal = () => {
    if (scrollTimerRef.current !== null) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Informe Timeline que la modale est fermée
    onModalClose(isCorrect);
  };
  // useEffect(() => {
  //   if (isLastAttemptFailed) {
  //     onQuestionAnswered();
  //   }
  // }, [isLastAttemptFailed, onQuestionAnswered]);

  // Configuration de l'animation d'entrée
  const slideVariants = {
    hidden: {
      opacity: 0,
      x: position === "left" ? -100 : 100, // vient de gauche ou droite selon position
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: index === 0 ? 1.5 : 0, // la première card attend 1.5s
      },
    },
  };

  return (
    <motion.div
      className={`flashcard ${position} ${flipped ? "flipped" : ""}`}
      variants={slideVariants}
      initial="hidden"
      whileInView="visible" // animation au scroll (viewport detection)
      viewport={{ once: true, margin: "-100px" }} // once: true = animation une seule fois
    >
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
                Il te reste <br />
                <br />
                <strong>1 tentative</strong>
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

          {/* Bouton "En savoir +" pour ouvrir la modale */}
          {(isCorrect || isLastAttemptFailed) && (
            <button className="details-button" onClick={handleOpenModal}>
              📖 En savoir +
            </button>
          )}
        </div>
      </div>

      {/* MODALE avec détails du film */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${film.title} (${film.year})`}
      >
        <p>
          <strong>Réalisateur :</strong> {film.director}
        </p>
        {film.details?.synopsis && (
          <p>
            <strong>Synopsis :</strong> {film.details.synopsis}
          </p>
        )}
        {film.details?.trivia && (
          <p>
            <strong>Le saviez-vous ?</strong> {film.details.trivia}
          </p>
        )}
        {film.details?.link && (
          <p>
            <a
              href={film.details.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              🎬 Voir sur IMDb
            </a>
          </p>
        )}
      </Modal>
    </motion.div>
  );
}
