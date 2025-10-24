# 🎥 Fondu au noir

Fondu au noir est une application web interactive qui combine une timeline chronologique et un quiz à cartes (flashcards) pour explorer l'histoire du cinéma noir de manière ludique.

<p align="center">
<img src="public/screenshots/screenshot-wide.png" alt="visuel du site" width="400" height="400">
</p>

## Stack

- React : utilisation des hooks
- Vite
- Node.js
- HTML, Typescript
- Vanilla CSS (style et animations "flip")
- Bibliothèques : Framer Motion et Canvas-confetti

## Fonctionnalités

- Timeline chronologique
- Flashcards :
  ▪︎ chaque carte contient un film et une question avec 4 choix de réponse, et se retourne pour révéler la bonne réponse après avoir validé un choix
  ▪︎ modale "📖 En savoir +" sur le film
  ▪︎ animation des flashcards avec Framer Motion
- Compteur de bonnes réponses en temps réel, calcul du score final
- Page de fin "ScoreBoard" avec rappel du score final, pourcentage de réussite, historique des derniers scores et une recommandation personnalisée au jouer selon son pourcentage de réussite.
- Page "Á propos"
- Responsive Design

### Images & Icônes

- Canva, favicon.io
