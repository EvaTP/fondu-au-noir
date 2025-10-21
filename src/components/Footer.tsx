export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#about">À propos</a>
        </div>
        <p>
          © {currentYear} Fondu au noir | Eva Tharrats - Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
