# 📸 FitSnap — AI-Powered Fitness & Nutrition Tracker

FitSnap is a modern, full-stack monorepo application designed for seamless nutrition tracking, meal logging via AI vision, workout management, and body weight trend analytics.

---

## ✨ Features

- 📸 **AI Meal Photo Scanner**: Upload or capture photos of meals for automatic food identification, portion estimation, and macro calculation via Gemini AI Vision.
- 🎯 **Interactive Calorie & Macro Rings**: Real-time daily calorie progress visualization, macro split (Protein, Carbs, Fat), and meal log summaries.
- 🏋️ **Workout Tracker**: Track strength training sets, reps, weight, and cardio exercise burn metrics.
- 📈 **Weight & Body Metrics Analytics**: Interactive weight journey trends (7d, 30d, 90d) with goal projections.
- 🌙 **Dark Mode & Responsive Mobile Shell**: Native app-like aesthetic optimized for desktop and mobile viewports.

---

## 🛠️ Architecture & Tech Stack

```
FitSnap Monorepo
├── frontend/               # React 19 + TypeScript + Vite + TailwindCSS
│   ├── src/components/     # Reusable design primitives, modals, & feature cards
│   ├── src/pages/          # Dashboard, Meals, Workouts, Progress, Settings
│   └── src/services/       # API integration & meal scanner service
└── backend/                # Node.js + Express + TypeScript
    ├── src/controllers/    # Meal analysis endpoints
    ├── src/services/ai/    # Gemini AI Vision service with fallbacks
    └── src/routes/         # Express API routes
```

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, Recharts, Lucide Icons
- **Backend**: Express, Node.js, TypeScript, Multer, `@google/genai`
- **Monorepo Management**: npm Workspaces

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` in `backend/`:
```bash
cp backend/.env.example backend/.env
```

### 3. Run Development Servers
```bash
npm run dev:frontend    # Starts Vite dev server (http://localhost:5173)
npm run dev:backend     # Starts Express backend (http://localhost:5001)
```

---

## 📦 Production Build

```bash
npm run build
```
Generates production dist bundles for both `frontend` and `backend`.

---

## 📄 License
MIT License.

