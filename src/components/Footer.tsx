import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link> |{" "}
          <Link to="/quiz">Retour au quiz</Link>
          {/* <a href="#about">À propos</a> */}
        </div>
        <p>
          © {currentYear} Fondu au noir | Eva Tharrats - Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
