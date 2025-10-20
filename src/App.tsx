// import { useState } from "react";
// import FlashCard from "@/components/FlashCard";
import Timeline from "@/components/Timeline";
import films from "@/data/filmsData.json";
import "@/styles/App.css";

function App() {
  // const [score, setScore] = useState(0);

  return (
    <div className="app-container">
      <h1>Fondu au noir</h1>
      <h2>
        Un voyage interactif dans les ombres du cinéma noir... <br></br>
        pourrez-vous en sortir indemne ?
      </h2>

      <Timeline films={films} />
    </div>
  );
}

export default App;
