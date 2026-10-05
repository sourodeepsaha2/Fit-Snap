import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MealAnalysis } from './MealAnalysis';
import type { Meal, MealCategory } from '../../types';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: Meal) => void;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
  isOpen,
  onClose,
  onAddMeal,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'manual'>('photo');
  const [mealName, setMealName] = useState('');
  const [details, setDetails] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [category, setCategory] = useState<MealCategory>('lunch');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName || !calories) return;

    onAddMeal({
      id: `meal-${Date.now()}`,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      details: mealName + (details ? ` (${details})` : ''),
      calories: parseInt(calories, 10) || 0,
      protein: parseInt(protein, 10) || 0,
      carbs: 30,
      fat: 10,
      category: category,
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setMealName('');
    setDetails('');
    setCalories('');
    setProtein('');
    onClose();
  };

  const handlePhotoMealSaved = (meal: Meal) => {
    onAddMeal(meal);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📸 Add New Meal" maxW="max-w-lg">
      {/* Mode Switcher */}
      <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-800 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('photo')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'photo'
              ? 'bg-yellow-400 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          📷 Photo AI Analysis
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'manual'
              ? 'bg-yellow-400 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          ✍️ Quick Manual Log
        </button>
      </div>

      {activeTab === 'photo' ? (
        <MealAnalysis
          onMealSaved={handlePhotoMealSaved}
          onCancel={onClose}
        />
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Meal Name & Details
            </label>
            <input
              type="text"
              placeholder="e.g. Chicken Avocado Bowl"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Calories (kcal)
              </label>
              <input
                type="number"
                placeholder="550"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Protein (grams)
              </label>
              <input
                type="number"
                placeholder="40"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MealCategory)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snack">Snack</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<Plus className="w-5 h-5 stroke-[3]" />}
            className="mt-2"
          >
            Log Meal
          </Button>
        </form>
      )}
    </Modal>
  );
};
