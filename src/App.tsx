// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import films from "@/data/filmsData.json";
import About from "@/pages/About";
import Scoreboard from "@/pages/Scoreboard";
import IntroScreen from "@/pages/IntroScreen";
import { useScore } from "@/context/ScoreContext";
import "@/styles/App.css";

function App() {
  const { setTotalQuestions } = useScore();

  // useEffect : Définit le nombre total de questions au chargement
  useEffect(() => {
    setTotalQuestions(films.length);
  }, [setTotalQuestions]);

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            {/* Route PAGE ACCUEIL */}
            <Route path="/" element={<IntroScreen />} />
            {/* Route QUIZ */}
            <Route
              path="/quiz"
              element={
                <>
                  <h1>Fondu au noir</h1>
                  <h2>
                    Un voyage interactif dans les ombres du cinéma noir...{" "}
                    <br />
                    pourrez-vous en sortir indemne ?
                  </h2>
                  <Timeline films={films} />
                </>
              }
            />
            {/* Routes SCOREBOARD & A PROPOS */}
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
