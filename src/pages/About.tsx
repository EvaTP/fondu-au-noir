// import React from "react";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h2>À propos de "Fondu au Noir"</h2>

      {/* Première section : texte à gauche, image à droite */}
      <div className="about-section section-left">
        <div className="about-text-block">
          <p className="about-paragraph">
            <strong>Bienvenue sur Fondu au Noir !</strong>
          </p>
          <br></br>

          <p className="about-paragraph">
            Ce projet de quiz est né d'une volonté de pratiquer React et ses
            hooks.
          </p>
          <p className="about-paragraph">
            Le quiz est dédié au cinéma noir et à ses figures : réalisateurs,
            acteurs, scénaristes, chefs opérateurs... Il explore les thématiques
            du <em>film noir</em> et de son héritier, le <em>néo-noir</em> —
            deux genres fascinants mêlant mystère, corruption et fatalité.
          </p>
        </div>

        <figure className="about-figure">
          <img
            src="/maltese-falcon.jpg"
            alt="film-maltese-falcon"
            className="about-image"
          />
          <figcaption className="about-caption">
            Le Faucon maltais (1941) — John Huston
          </figcaption>
        </figure>
      </div>

      {/* Deuxième section : image à gauche, texte à droite */}
      <div className="about-section section-right">
        <figure className="about-figure">
          <img
            src="/gaslight.png"
            title="Hantise (1944) - George Cuckor"
            alt="film-gaslight"
            className="about-image"
          />
          <figcaption className="about-caption">
            Hantise (1944) — George Cukor
          </figcaption>
        </figure>

        <div className="about-text-block">
          <p className="about-paragraph">
            Le choix de cette sélection de vingt films est forcément subjectif :
            d’autres titres tout aussi méritants auraient pu y figurer.<br></br>
            Les films retenus partagent une grammaire commune : détectives
            privés désabusés, intrigues criminelles alambiquées, ambiances
            troubles et personnages moralement ambigus.
          </p>
          <p className="about-paragraph">
            Mais d’autres films, parfois moins connus, sont tout aussi
            pertinents et mériteraient d’être explorés — le cinéma noir et le
            néo-noir forment un territoire riche et vaste.
          </p>
          <p className="about-paragraph">
            Pour aller plus loin, voici quelques ressources recommandées :
            <ul>
              <li>
                <a
                  href="https://www.kdbuzz.com/?le-film-noir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KDBuzz — Dossier sur le film noir
                </a>
              </li>
              <li>
                <a
                  href="https://www.britannica.com/art/film-noir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Encyclopædia Britannica — Film noir (présentation historique)
                </a>
              </li>
            </ul>
          </p>
          <p className="about-paragraph">
            Ces sources offrent des perspectives historiques, analytiques et des
            suggestions de visionnage si tu souhaites approfondir le sujet.
          </p>
        </div>
      </div>

      {/* Troisième section */}
      <div className="about-section">
        <p className="about-paragraph-final">
          Le titre <strong>“Fondu au Noir”</strong> fait référence à une
          technique cinématographique où l’image disparaît progressivement dans
          l’obscurité — un symbole parfait pour évoquer la fin d’une scène… ou
          d’une illusion.
          <br />
          <br />
          Retrouvez le projet complet sur{" "}
          <a
            href="https://github.com/EvaTP/fondu-au-noir.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
