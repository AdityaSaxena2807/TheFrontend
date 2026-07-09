# TheFrontend

TheFrontend is a modern React + Vite frontend for a video-sharing-style application. It provides a polished user experience for browsing videos, watching content, managing playlists, interacting with comments, and handling authentication.

## Features

- User authentication flow with login and registration
- Home feed for browsing videos
- Video watching experience with player and video details
- Comments, likes, and engagement interactions
- Playlists and saved videos
- Channel, subscription, and dashboard views
- Responsive UI with reusable components and toast notifications

## Tech Stack

- React 19
- Vite
- React Router
- Zustand for state management
- Axios for API requests
- Tailwind CSS
- Ant Design components
- React Hot Toast

## Project Structure

- src/pages - application pages such as Home, Login, Watch, Dashboard, and Settings
- src/components - reusable UI pieces for common, video, playlist, comment, and tweet features
- src/services - API integration layer
- src/store - global state stores for auth and UI
- src/router - route definitions
- src/Utils - helper utilities and toast helpers

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or later
- npm or pnpm

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a environment file named `.env` in the project root and add your backend API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at the local Vite URL shown in the terminal.

## Build

To create a production build:

```bash
npm run build
```

## Linting

To run the linter:

```bash
npm run lint
```

## Notes

This project is the frontend layer of a larger application and expects a backend API to be available at the URL configured in `VITE_API_BASE_URL`.
