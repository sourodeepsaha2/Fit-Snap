import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../common/Button';
import type { MealFood } from '../../types';

interface AddFoodFormProps {
  onAddFood: (food: MealFood) => void;
}

export const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [quantityGrams, setQuantityGrams] = useState('150');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !calories) return;

    const grams = parseFloat(quantityGrams) || 100;
    const cals = parseInt(calories, 10) || 0;
    const p = parseFloat(protein) || 0;
    const c = parseFloat(carbs) || 0;
    const f = parseFloat(fat) || 0;

    const newFood: MealFood = {
      id: `food-${Date.now()}`,
      name,
      quantityGrams: grams,
      calories: cals,
      protein: p,
      carbs: c,
      fat: f,
      baseQuantityGrams: grams,
      baseCalories: cals,
      baseProtein: p,
      baseCarbs: c,
      baseFat: f,
    };

    onAddFood(newFood);
    setName('');
    setQuantityGrams('150');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        size="md"
        fullWidth
        icon={<Plus className="w-4 h-4 text-yellow-400" />}
        onClick={() => setIsOpen(true)}
      >
        + Add Food Item
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 animate-fade-in"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider">
          Add Custom Food
        </h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 text-zinc-400 hover:text-white rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-300 block mb-1">
          Food Name
        </label>
        <input
          type="text"
          placeholder="e.g. Boiled Egg / Salad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Quantity (grams)
          </label>
          <input
            type="number"
            placeholder="150"
            value={quantityGrams}
            onChange={(e) => setQuantityGrams(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Calories (kcal)
          </label>
          <input
            type="number"
            placeholder="220"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
            Protein (g)
          </label>
          <input
            type="number"
            placeholder="12"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
            Carbs (g)
          </label>
          <input
            type="number"
            placeholder="25"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
            Fat (g)
          </label>
          <input
            type="number"
            placeholder="5"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          fullWidth
          icon={<Plus className="w-4 h-4 stroke-[3]" />}
        >
          Add Item
        </Button>
      </div>
    </form>
  );
};
