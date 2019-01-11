# EUKO node-api

API REST pour EUKO

## Stack


## Branches
- Production: `production`
- Développement/Staging: `master` → automatiquement déployé sur l'environnement de staging
- Issues: une branche par issue, nommée avec le `#numéro` de l'issue. → automatiquement déployé à chaque pull request.

## Pour commencer

- Avoir installé Node.js et postgresql `brew install node postgresql`
- vérifier que postgresql est bien started `brew services list`
- (si stopped) lancer postgresql `brew services start postgresql`
- Installer les dépendences `npm i`
- Créer et remplir le fichier [`.env`](#variables-denvironnement) à la racine du projet.
- Créer la DB si pas deja existante `sequelize db:create`
- Lancer les migrations `sequelize db:migrate`
- Lancer le serveur (port 3000) en mode dev `npm run dev`

## Code style rules

ESLint configuré avec les règles suivantes :
- [eslint:recommended](https://eslint.org/docs/rules/)
- [Indentation](https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent) : 2 espaces
- [Saut de lignes](https://eslint.org/docs/rules/linebreak-style#enforce-consistent-linebreak-style-linebreak-style): unix
- [Guillemets](https://eslint.org/docs/rules/quotes#enforce-the-consistent-use-of-either-backticks-double-or-single-quotes-quotes) : simple
- [Point-virgule](https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi) : jamais

Convention de nommage :
- Models : pascal case + singulier - Ex: `User`
- Controllers : pascal case + pluriel + `Controller` - Ex `UsersController`

## Variables d’environnement

À mettre dans un fichier [`.env`](https://github.com/motdotla/dotenv) à la racine du projet.
- DB_NAME (facultatif → default: `'euko-api'`)
- DB_HOST (facultatif → default: `'localhost'`)
- DB_USER (généralement le user de la session système : `echo $USER`)
- DB_PASS (facultatif → default: `''`)
- JWT_SECRET (une chaine de caractère pour générer les JWT)

## Scripts npm

- `start`: Lance les migrations puis le serveur avec la config de production.
- `dev`: Lance le serveur avec [`nodemon`](https://github.com/remy/nodemon) (Relance automatiquement l’app quand le code a changé)
- `c` : Lance le projet en mode [`REPL`](https://nodejs.org/api/repl.html) avec les models exportés dans `models/index.js` dans le scope global.


## Documentation de l'API

https://euko-api-staging.herokuapp.com

- mettre à jour l'API (fichier HTML) `apidoc -i routes/ -o apidoc/`
