import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">À propos</Link>
          {/* <a href="#about">À propos</a> */}
        </div>
        <p>
          © {currentYear} Fondu au noir | Eva Tharrats - Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
