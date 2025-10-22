// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import films from "@/data/filmsData.json";
import About from "@/pages/About";
import "@/styles/App.css";

function App() {
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

// ancienne version sans router
// function App() {
//   // const [score, setScore] = useState(0);

//   return (
//     <>
//       <div className="app-container">
//         <h1>Fondu au noir</h1>
//         <h2>
//           Un voyage interactif dans les ombres du cinéma noir... <br></br>
//           pourrez-vous en sortir indemne ?
//         </h2>

//         <Timeline films={films} />
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;
