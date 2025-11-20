// page pages/Scoreboard.tsx

import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScore } from "@/context/ScoreContext";
import { useConfetti } from "@/hooks/useConfetti";
import "@/styles/Scoreboard.css";

export default function Scoreboard() {
  const { correctCount, totalQuestions, resetScore } = useScore();
  const navigate = useNavigate();
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  const [showQuote, setShowQuote] = useState(false);

  // déclencher les confettis dès l'arrivée sur la page
  useConfetti(true);

  // useMemo :
  // 1) Calcule le pourcentage de bonnes réponses
  // 2) Affiche un message personnalisé selon le score (ne recalcule que si le score change)
  // 2) Affiche une recommandation selon le score obtenu (avec le bouton "Notre recommandation pour toi")

  const scoreMessage = useMemo(() => {
    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage === 100) {
      return {
        title: "🏆 Parfait !",
        message: "Tu es un véritable expert du film noir !",
        quote:
          "🏆 Score 100% : “Inspecteur légendaire”\n\nChapeau bas. Tu es entré dans la légende des limiers du septième art. Tes connaissances frôlent la perfection. Tu peux désormais t’attaquer aux frontières du genre : Mulholland Drive, Nightcrawler, ou The Batman.\n\n🎬 “Quand tout devient clair, le projecteur s’éteint.”",
      };
    } else if (percentage >= 80) {
      return {
        title: "🌟 Excellent !",
        message: "Tu connais très bien le cinéma noir.",
        quote:
          "🌟 Score 80-99% : “Détective chevronné”\n\nTu pourrais presque donner des cours à Sam Spade. Tu saisis la complexité morale, la tension et les faux-semblants. Revisite Sunset Boulevard pour son cynisme hollywoodien\n\n🎬 “Ce n’est pas la vérité qu’on cherche, c’est la façon dont elle s’éclaire.”",
      };
    } else if (percentage >= 60) {
      return {
        title: "👍 Bien joué !",
        message:
          "Bonne culture cinéma ! Quelques révisions et ce sera parfait.",
        quote:
          "👍 Score 60-79% : “Agent prometteur”\n\nPas mal, détective. Tu connais les visages, les codes et les pièges du genre. Pour aller plus loin, explore le néo-noir : Chinatown, L.A. Confidential, Zodiac.\n\n🎬 “Les temps changent, mais les ombres restent.”",
      };
    } else if (percentage >= 40) {
      return {
        title: "🔎 Pas mal !",
        message: "Tu as des bonnes bases, continue à découvrir ces films !",
        quote:
          "🔎 Score 40-59% : “Apprenti enquêteur”\n\nTu as flairé quelques indices, mais l’affaire reste trouble. Approfondis ton enquête avec Le Grand Sommeil et Le Troisième Homme. Observe comment la narration et la lumière racontent autant que les dialogues.\n\n🎬 “Chaque enquête commence par un détail… et finit par un miroir brisé.”",
      };
    } else {
      return {
        title: "🔦 À découvrir !",
        message: "Peut-etre préfères-tu les comédies romantiques...",
        quote:
          "🔦 Score <40% : “Touriste dans les ténèbres”\n\nTu sembles encore marcher dans la brume des ruelles de L.A. Commence par les classiques : Le Faucon maltais, Assurance sur la mort... Ils poseront les bases du film noir et ses archétypes.\n\n🎬 “La vérité est une ombre, et toi tu n’as qu’une lampe de poche.”",
      };
    }
  }, [correctCount, totalQuestions]);

  const handleRestart = () => {
    resetScore();
    navigate("/");
  };

  // useEffect : Scroll en haut de page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect : Sauvegarde l'historique des scores
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("scoreHistory") || "[]");
    const newScore = {
      score: correctCount,
      total: totalQuestions,
      date: new Date().toISOString(),
    };
    history.push(newScore);

    // Garde seulement les 4 derniers scores
    const last4 = history.slice(-4); // tronque le tableau pour afficher uniquement les 4 derniers
    localStorage.setItem("scoreHistory", JSON.stringify(last4));
    setScoreHistory([...last4].reverse()); // pour afficher du plus récent au plus ancien
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

        {/* Recommandation ("quote") */}
        <div className="scoreboard-quote-section">
          {!showQuote ? (
            <button
              className="btn-secondary"
              onClick={() => setShowQuote(true)}
            >
              🎬 Notre recommandation pour toi
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
            {scoreHistory.map((entry, index) => (
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
        </div>
      </div>
    </div>
  );
}
