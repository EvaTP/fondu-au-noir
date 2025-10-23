// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import films from "@/data/filmsData.json";
import About from "@/pages/About";
import Scoreboard from "@/pages/Scoreboard";
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Fondu au noir</h1>
                <h2>
                  Un voyage interactif dans les ombres du cinéma noir... <br />
                  pourrez-vous en sortir indemne ?
                </h2>
                <Timeline films={films} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
