import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScoreProvider } from "@/context/ScoreContext";
import "@/styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </StrictMode>
);
