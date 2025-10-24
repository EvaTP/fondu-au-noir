# 🎥 Fondu au noir

Fondu au noir est une application web interactive qui combine une timeline chronologique et un quiz à cartes (flashcards) pour explorer l'histoire du cinéma noir de manière ludique.

<p align="center">
<img src="public/screenshots/screenshot-wide.png" alt="visuel du site" width="400" height="400">
</p>

## Stack

- React + Vite
- Node.js
- HTML, Typescript
- Vanilla CSS (style et animations "flip")
- Bibliothèques : Framer Motion et Canvas-confetti

### Hooks React utilisés

- `useState` : gestion de l'état des flashcards, du score, et de l'affichage des recommandations.
- `useEffect` : sauvegarde de l'historique des scores dans `localStorage` et déclenchement des confettis à l'arrivée sur la page Scoreboard.
- `useMemo` : calcul du message et de la recommandation selon le score pour éviter des recalculs inutiles.
- Hooks personnalisés :
  - `useConfetti` : déclenchement des confettis à l'arrivée sur la page Scoreboard.
  - `useScore` (contexte) : partage et gestion globale du score et des réponses correctes entre les composants.

## Fonctionnalités

- Timeline chronologique
- Flashcards :

<p align="center">
  <img src="public/screenshots/flashcard.gif" alt="Animation de la flashcard" width="300">
</p>

- chaque carte contient un film et une question avec 4 choix de réponse, et se retourne pour révéler la bonne réponse après avoir validé un choix
- modale "📖 En savoir +" sur le film
- animation des flashcards avec Framer Motion
- Compteur de bonnes réponses en temps réel, calcul du score final
- Page de fin "ScoreBoard" avec rappel du score final, pourcentage de réussite, historique des derniers scores et une recommandation personnalisée au jouer selon son pourcentage de réussite.
- Page "Á propos"
- Responsive Design

### Images & Icônes

- Canva, favicon.io

## Contact

Si tu souhaites me laisser un commentaire, un retour ou poser une question sur le projet, tu peux utiliser les **Issues** de ce dépôt GitHub :  
[💬 Ouvrir une Issue](https://github.com/EvaTP/fondu-au-noir/issues)

> Explique ton commentaire ou ta suggestion dans l’issue, et je te répondrai dès que possible.
