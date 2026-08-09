# 🦆 DUCKY — Frontend Application

A modern, responsive **video streaming platform UI** built with **React (Vite)**, designed for high performance, clean UX, and scalable component architecture.

DUCKY frontend delivers a seamless user experience for content consumption, interaction, and creator engagement — inspired by platforms like YouTube, but built with a unique identity.

---

## 🚀 Overview

The DUCKY frontend is a **component-driven React application** that integrates with a backend API to provide:

- 🎥 Video browsing & playback experience
- 💬 Real-time comments & interactions
- ❤️ Like, subscribe, and engagement features
- 📂 Playlist and library management
- 🔍 Search and discovery
- 🐦 Tweet-style micro content

Built with a strong focus on **UI consistency, reusability, and performance optimization**.

---

## 🏗️ Project Structure

```bash
src/
├── assets/
│   └── icons/            # App logos & themed duck avatars
├── components/
│   ├── channel/          # Channel-related UI (Subscribe button)
│   ├── comment/          # Comment system components
│   ├── common/           # Shared reusable UI components
│   ├── library/          # User library (liked, history, playlists)
│   ├── playlist/         # Playlist UI & forms
│   ├── tweet/            # Tweet/micro-post components
│   └── video/            # Video-related components
```

---

## 🧩 Key Features

### 🎥 Video Experience

- Grid & list video layouts
- Video metadata display (views, duration, uploader)
- Optimized rendering for performance

### 💬 Comment System

- Add, edit, delete comments
- Like/unlike comments
- Nested UI with options menu

### ❤️ Engagement Features

- Like system with instant UI feedback
- Subscribe/unsubscribe to channels
- Save videos to playlists

### 📂 Library Management

- Liked videos
- Watch history
- Playlists (create/edit/delete)

### 🔍 Search & Discovery

- Search bar with dynamic suggestions
- Search result list rendering

### 🐦 Tweet Feature

- Lightweight post creation
- Feed-style UI for micro-content

---

## 🎨 UI components

Reusable UI system includes:

- Buttons, Modals, Dropdowns
- Navbar & Sidebar navigation
- Skeleton loaders (loading states)
- Empty states for better UX
- Emoji picker integration

---

## ⚙️ Tech Stack

| Layer       | Technology                |
| ----------- | ------------------------- |
| Framework   | React (Vite)              |
| Styling     | Tailwind CSS              |
| State Mgmt  | Zustand                   |
| Routing     | React Router              |
| HTTP Client | Axios                     |
| Icons/UI    | Custom + Ant Design Icons |

---

## ⚡ Performance & UX

- ⚡ Fast development with **Vite**
- 🧠 Optimized re-renders using component separation
- 🎯 Lazy loading & skeleton states
- 🔄 Smooth transitions and UI feedback
- 📱 Fully responsive design

---

## 🔐 Authentication Handling

- Cookie-based authentication (backend integrated)
- Protected routes for logged-in users
- Login prompt modal for restricted actions

---

## 🛠️ Getting Started

### 1. Clone Repository

```bash
git clone <repository-url>
cd ducky-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Run Development Server

```bash
npm run dev
```

---

## 📡 API Integration

The frontend communicates with the backend via:

```bash
http://localhost:8000/api/v1
```

- Axios instance configured with `withCredentials`
- Handles authentication, API calls, and error responses

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
```

---

## 🧠 Design Principles

- **Component Reusability** — clean, modular components
- **Separation of Concerns** — UI vs logic separation
- **Scalability** — structured folders for growth
- **User Experience First** — responsive, smooth UI

---

## 🎯 Future Improvements

- Dark/Light theme toggle
- Video player enhancements
- Infinite scrolling
- Real-time notifications
- PWA support

---

## 👨‍💻 Author

**Aditya Saxena**
MERN Stack Developer

---

## 📄 License

This project is licensed under the MIT License.
