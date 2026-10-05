import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MobileContainer } from './components/layout/MobileContainer';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { Meals } from './pages/Meals';
import { Workouts } from './pages/Workouts';
import { Progress } from './pages/Progress';
import { Settings } from './pages/Settings';
import { AddMealModal } from './components/meals/AddMealModal';
import { Toast } from './components/common/Toast';
import type { Meal } from './types';

export function App() {
  const [isHeaderAddMealOpen, setIsHeaderAddMealOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGlobalAddMeal = (meal: Meal) => {
    setToastMessage(`Logged ${meal.details} (${meal.calories} kcal)`);
  };

  return (
    <Router>
      <MobileContainer>
        {/* Header */}
        <Header onQuickAddMeal={() => setIsHeaderAddMealOpen(true)} />

        {/* Main Route Content */}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Fixed Mobile Navigation Bar */}
        <BottomNav />

        {/* Header Quick Camera Add Meal Modal */}
        <AddMealModal
          isOpen={isHeaderAddMealOpen}
          onClose={() => setIsHeaderAddMealOpen(false)}
          onAddMeal={handleGlobalAddMeal}
        />

        {/* Global Toast Notification */}
        <Toast
          isOpen={!!toastMessage}
          message={toastMessage || ''}
          onClose={() => setToastMessage(null)}
        />
      </MobileContainer>
    </Router>
  );
}

export default App;
