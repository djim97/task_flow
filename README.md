# TaskFlow Teams

Kanban d'équipe en React 19 + TypeScript.
Projet fil rouge du module React, M1 Génie Logiciel, ISI (2026-2027).

Trois colonnes : À faire (TODO), En cours (DOING), Terminé (DONE).

## Stack technique

| Outil | Version | Rôle |
| --- | --- | --- |
| Node.js | 24.12.0 | Exécution des outils (React Router 8 exige >= 22.22) |
| npm | 11.6.2 | Gestionnaire de paquets |
| Vite | 8 (template react-ts) | Serveur de dev, build de production |
| React / React DOM | 19 | Bibliothèque de vue |
| TypeScript | 6 (strict) | Typage statique |
| Tailwind CSS | 4 (@tailwindcss/vite) | Style |
| ESLint | flat config | Linting, dont react-hooks |

Outils ajoutés plus tard : React Router 8 (J4), json-server 0.17.4 et
json-server-auth 2.1.0 (J3 et J5), TanStack Query 5 (J6),
react-error-boundary 6 (J7), Vitest + Testing Library + MSW (J8).

### Justification des choix

- **React 19** : imposé par l'énoncé. Nécessaire pour les Actions,
  `useActionState`, `useOptimistic` et `use(Context)` attendus au jalon 7.
- **TypeScript 6 strict** : aucun `any` ni `@ts-ignore` autorisé.
  `verbatimModuleSyntax` impose `import type` pour les imports de types,
  `erasableSyntaxOnly` interdit les `enum`, remplacées par des unions de chaînes.
- **Tailwind 4** : configuration en CSS via `@import "tailwindcss"` et le plugin
  Vite officiel. Plus de `tailwind.config.js` ni de `npx tailwindcss init`.
- **ESLint plutôt qu'Oxlint** : `eslint-plugin-react-hooks` reste la référence
  pour les règles des Hooks et les dépendances manquantes. Le React Compiler
  du jalon 7 s'active également via ESLint.

## Installation

```bash
npm install
npm run dev
```

L'application est servie sur http://localhost:5173.

## Scripts

| Script | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Vérification TypeScript puis build de production |
| `npm run preview` | Prévisualisation du build |

Scripts à ajouter à partir du jalon 3 : `api`, `api:auth`, `dev:all`, `test`,
`test:run`.

## Structure du projet

```
src/
  api/
    types.ts        # types partagés (Task, TaskStatus, Priority...)
  data/
    mockTasks.ts    # données de démonstration (jalons 1 et 2)
  components/
    Header.tsx
    Board.tsx
    Column.tsx
    TaskCard.tsx
    PriorityBadge.tsx
```

## Jalons

| Tag | Objet | État |
| --- | --- | --- |
| j1 | Maquette statique typée | en cours |
| j2 | Board interactif local | à venir |
| j3 | Branchement sur l'API | à venir |
| j4 | Navigation multi-pages | à venir |
| j5 | Authentification et état global | à venir |
| j6 | Architecture par features et TanStack Query | à venir |
| j7 | React 19 et performance | à venir |
| j8 | Tests et livraison | à venir |

Chaque jalon est livré par un tag Git :

```bash
git tag j1
git push --tags
```

### J1 : maquette statique typée

Objectif : poser les composants de base, sans aucun état ni interaction.

- [ ] Projet Vite react-ts et Tailwind 4, premier commit poussé
- [ ] `src/api/types.ts`
- [ ] `src/data/mockTasks.ts` (8 tâches réparties sur les 3 statuts)
- [ ] Composants Header, Board, Column (avec `children`), TaskCard, PriorityBadge
- [ ] Chaque colonne filtre par statut, affiche son compteur et « Aucune tâche » si vide
- [ ] Badge « En retard » si `dueDate` est dépassée et la tâche non terminée

Critères de validation :

- [ ] `npm run build` sans erreur, aucun `any`
- [ ] Props typées par interface, `key = id`
- [ ] Capture d'écran dans ce README

## Captures d'écran

À ajouter.

## Modèle de données

Les types partagés vivent dans `src/api/types.ts`. Les dates sont des chaînes
ISO, un champ absent vaut `null`.

| Ressource | Champs principaux |
| --- | --- |
| users | id, name, email, password |
| projects | id, name, description, ownerId |
| memberships | id, projectId, userId, role (OWNER / MEMBER) |
| tasks | id, projectId, title, description, status, priority, assigneeId, dueDate, createdAt |
| comments | id, taskId, userId, body, createdAt |

## Comptes de test

À compléter au jalon 5, quand l'authentification sera en place.

## Notes et décisions

Journal des décisions d'architecture, à remplir au fil des séances.

- J1 : données mockées dans `src/data`, aucun état. L'état sera remonté dans
  `Board` au jalon 2.
