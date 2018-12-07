# EUKO node-api

API REST pour EUKO

## Branches
- Production: `production`
- Développement/Staging: `master`
- Issues: une branche par issue, nommée avec le `#numéro` de l'issue.

## Pour commencer

- Avoir installé Node.js et postgresql `brew install node postgresql`
- Installer les dépendences `npm i`
- Créer et remplir le fichier [`.env`](#)
- Lancer le serveur en mode dev `npm run dev`


## Code style rules

ESLint configuré avec les règles suivantes :
- [eslint:recommended](https://eslint.org/docs/rules/)
- [Indentation](https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent) : 2 espaces
- [Saut de lignes](https://eslint.org/docs/rules/linebreak-style#enforce-consistent-linebreak-style-linebreak-style): unix
- [Guillemets](https://eslint.org/docs/rules/quotes#enforce-the-consistent-use-of-either-backticks-double-or-single-quotes-quotes) : simple
- [Point-virgule](https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi) : jamais

Convention de nommage :
- Models : pascal case + singulier - Ex: `User`
- Controllers : camel case + pluriel + `Controller` - Ex `usersController`

## Variables d’environnement

À mettre dans un fichier [`.env`](https://github.com/motdotla/dotenv) à la racine du projet.
- DB_NAME
- DB_HOST
- DB_USER
- DB_PASS

## Scripts npm

- `start`: Lance le serveur avec la config de production.
- `dev`: Lance le serveur avec [`nodemon`](https://github.com/remy/nodemon) (Relance automatiquement l’app quand le code a changé)
- `c` : Lance le projet en mode [`REPL`](https://nodejs.org/api/repl.html) avec les models exportés dans `models/index.js` dans le scope global.

## Routes

- `/` : Page statique, pour la future landing ?
- `/users` : Liste de tous les utilisateurs
