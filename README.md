# 📸 FitSnap — AI-Powered Fitness & Nutrition Tracker

FitSnap is a modern, full-stack monorepo application designed for seamless nutrition tracking, meal logging via AI vision, workout management, gamified streak rewards, personal goals tracking, smart notifications, sleep recovery metrics, and body weight trend analytics.

---

## ✨ Features

- 📸 **AI Meal Photo Scanner**: Upload or capture photos of meals for automatic food identification, portion estimation, and macro calculation via Gemini AI Vision.
- 🎯 **Interactive Calorie & Macro Rings**: Real-time daily calorie progress visualization, macro split (Protein, Carbs, Fat), and meal log summaries.
- 🔥 **Streak & Gamification Engine**: Daily check-in tracking with milestone unlock badges (3-Day, 7-Day, 14-Day, 30-Day Master).
- 🎯 **Personal Fitness Goals Manager**: Track targets across weight, workouts, water intake, and calories with live visual progress bars.
- 🔔 **Smart Nudge & Reminders System**: Automated habit reminders for hydration alerts, meal balance tips, and streak preservation.
- 🌙 **Sleep & Body Recovery Score**: Track sleep duration, deep/REM sleep metrics, and automatic body recovery score calculation.
- 🏋️ **Workout Tracker**: Track strength training sets, reps, weight, and cardio exercise burn metrics.
- 📈 **Weight & Body Metrics Analytics**: Interactive weight journey trends (7d, 30d, 90d) with goal projections.
- 💧 **Water Intake Tracker**: Quick-log water intake with daily target progress rings.
- 📊 **CSV & JSON Data Export**: Export logs anytime for medical or fitness coaching review.

---

## 🛠️ Architecture & Tech Stack

```
FitSnap Monorepo
├── frontend/               # React 19 + TypeScript + Vite + TailwindCSS
│   ├── src/components/     # Reusable design primitives, modals, & dashboard cards
│   ├── src/pages/          # Dashboard, Meals, Workouts, Progress, Settings
│   ├── src/types/          # Strongly typed domain schemas (Streak, Goals, Sleep, etc.)
│   └── src/services/       # API integration & meal scanner service
└── backend/                # Node.js + Express + TypeScript
    ├── src/controllers/    # Endpoint handlers for meals, workouts, streak, goals, sleep & notifications
    ├── src/services/       # Business logic (Gemini AI Vision, recovery calculator, streak engine)
    ├── src/routes/         # Express REST API routes
    └── src/tests/          # API integration & service unit tests
```

### Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service health status check |
| `GET / POST` | `/api/meals` | Fetch daily meals / Log meal via camera scan |
| `GET / POST` | `/api/workouts` | Fetch and record workout sessions |
| `GET / POST` | `/api/water` | Fetch and update water hydration progress |
| `GET / POST` | `/api/streak` | Check-in daily & retrieve streak badges |
| `GET / POST / PATCH` | `/api/goals` | Goal tracking & progress increment |
| `GET / PATCH` | `/api/notifications` | Smart nudge notification system |
| `GET / POST` | `/api/sleep` | Sleep log & recovery score calculator |
| `GET` | `/api/export` | Download CSV / JSON user logs |

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

## 🧪 Testing

Run backend integration tests:
```bash
npm --prefix backend test
```

---

## 📄 License
MIT License.
