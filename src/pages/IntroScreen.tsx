// src/pages/IntroScreen.tsx
import { useNavigate } from "react-router-dom";

export default function IntroScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz"); // redirige vers la page du quiz
  };

  return (
    <div className="intro-container">
      <div className="intro-overlay">
        <h1>Fondu au noir</h1>
        <h2>
          Un voyage interactif dans les ombres du cinéma noir... <br />
          Parviendras-tu à en sortir indemne ?
        </h2>
        <br />
        <p>
          <strong>Instructions :</strong>
          <br />
          Prépare-toi à plonger dans l'univers du cinéma noir.
          <br />
          Réponds aux questions avec attention, chaque indice compte.
          <br />
          Tu as le droit à une deuxième chance pour chaque question, mais
          méfie-toi, les apparences sont souvent trompeuses...
          <br />
          ... et à la fin, <em>tu connaitras la vérité !</em>
        </p>

        <button className="intro-button" onClick={handleStart}>
          🎬 Commencer
        </button>
      </div>
    </div>
  );
}
