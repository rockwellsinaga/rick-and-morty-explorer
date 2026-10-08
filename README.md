# Rick and Morty Explorer

Rick and Morty Explorer is a cross-platform mobile and web application for browsing characters and episodes from the Rick and Morty universe. It uses the public [Rick and Morty API](https://rickandmortyapi.com/) and presents the data through searchable, paginated, and accessible screens.

The project began as my 2023 final assignment for a mobile-programming course. Version 2 keeps the original character, episode, detail, about, and developer-profile features while rebuilding the experience for a modern Expo stack.

## Features

- Browse characters with status, species, and last-known location.
- Search characters by name.
- Open a detailed character profile with origin and episode count.
- Browse and search episodes.
- Load additional API pages without losing existing results.
- Clear loading, empty, and network-error states.
- Developer profile loaded from the GitHub API.
- Android, iOS, and web support through Expo.

## Tech stack

- Expo SDK 57
- React 19
- React Native 0.86
- React Navigation 7
- Jest and `jest-expo`
- Rick and Morty API

## Run locally

### Requirements

- Node.js 22.13 or newer
- npm
- Expo Go or an Android/iOS simulator for native testing

### Setup

```bash
git clone https://github.com/rockwellsinaga/TA-PPB-Rick-and-Morty-App.git
cd TA-PPB-Rick-and-Morty-App
npm install
npm start
```

From the Expo development server, open the project on Android, iOS, or web.

## Quality checks

```bash
npm run doctor
npm test
npm run export:web
```

GitHub Actions runs the same checks for pushes and pull requests targeting `main`.

## Project structure

```text
.
├── App.js
├── src/
│   ├── api/
│   │   ├── __tests__/
│   │   └── rickAndMortyApi.js
│   ├── components/
│   │   ├── CharacterCard.js
│   │   ├── ScreenState.js
│   │   └── SearchBar.js
│   ├── pages/
│   │   ├── AboutScreen.js
│   │   ├── DetailScreen.js
│   │   ├── EpisodeScreen.js
│   │   ├── HomeScreen.js
│   │   └── ProfileScreen.js
│   └── theme.js
├── app.json
└── package.json
```

## Upgrade notes

The original project used Expo SDK 49, React Native 0.72, and React Navigation 6. Version 2 upgrades those foundations and replaces class-based fetching with focused API helpers and functional screens. It also adds pagination, reusable state components, automated tests, and continuous integration.

## Data and attribution

This project uses the community-built [Rick and Morty API](https://rickandmortyapi.com/documentation) for character and episode data. Rick and Morty and all related characters are the property of their respective rights holders. This is an unofficial learning and portfolio project and is not affiliated with Adult Swim.
