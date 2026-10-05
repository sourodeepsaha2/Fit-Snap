import React from 'react';
import type { MealCategory } from '../../types';
import { Coffee, Utensils, Moon, Cookie } from 'lucide-react';

interface MealTypeSelectorProps {
  selectedCategory: MealCategory;
  onSelectCategory: (category: MealCategory) => void;
}

export const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const options: Array<{
    id: MealCategory;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee className="w-4 h-4" /> },
    { id: 'lunch', label: 'Lunch', icon: <Utensils className="w-4 h-4" /> },
    { id: 'snack', label: 'Snack', icon: <Cookie className="w-4 h-4" /> },
    { id: 'dinner', label: 'Dinner', icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-300 block">
        Select Meal Type
      </label>
      <div className="grid grid-cols-4 gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
        {options.map((option) => {
          const isSelected = selectedCategory === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectCategory(option.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all tap-active ${
                isSelected
                  ? 'bg-yellow-400 text-black font-extrabold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span className="shrink-0">{option.icon}</span>
              <span className="text-[10px] mt-1 font-bold leading-none">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
