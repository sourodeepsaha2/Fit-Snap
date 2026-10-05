import React, { useState } from 'react';
import { Edit2, Trash2, Check, Scale } from 'lucide-react';
import type { MealFood } from '../../types';
import { scaleFoodNutrition } from '../../utils/nutritionCalculator';

interface FoodItemCardProps {
  food: MealFood;
  onUpdate: (updatedFood: MealFood) => void;
  onDelete: (id: string) => void;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({
  food,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(food.name);
  const [gramsInput, setGramsInput] = useState(food.quantityGrams.toString());

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGramsInput(val);
    const parsedGrams = parseFloat(val);
    if (!isNaN(parsedGrams) && parsedGrams >= 0) {
      const scaled = scaleFoodNutrition(food, parsedGrams);
      onUpdate({ ...scaled, name });
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    const parsedGrams = parseFloat(gramsInput) || food.quantityGrams;
    const scaled = scaleFoodNutrition(food, parsedGrams);
    onUpdate({ ...scaled, name });
  };

  const isHighConfidence = (food.confidence ?? 0.8) >= 0.75;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 hover:border-zinc-700 transition-all">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-sm font-bold text-white focus:outline-none focus:border-yellow-400 flex-1 mr-2"
          />
        ) : (
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">{food.name}</h4>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-zinc-400 hover:text-yellow-400 rounded transition-colors"
                title="Edit food name"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {food.confidence !== undefined && (
              <div className="flex items-center gap-1.5 text-[10px]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isHighConfidence ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="text-zinc-400 font-medium">
                  {isHighConfidence
                    ? 'AI confidence: High'
                    : 'AI confidence: Low — please verify'}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 shrink-0">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="p-1.5 bg-yellow-400 text-black rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Save
            </button>
          ) : (
            <button
              onClick={() => onDelete(food.id)}
              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete food item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-2.5">
        {/* Grams Quantity Input */}
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="text-xs text-zinc-400 font-medium">Est. Quantity:</span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min="0"
              step="5"
              value={gramsInput}
              onChange={handleQuantityChange}
              className="w-16 bg-zinc-900 border border-zinc-700 rounded-md px-2 py-0.5 text-xs font-bold text-white text-center focus:outline-none focus:border-yellow-400"
            />
            <span className="text-xs font-bold text-zinc-300">g</span>
          </div>
        </div>

        {/* Calories */}
        <div className="text-right">
          <span className="text-sm font-black text-white">{food.calories}</span>
          <span className="text-[10px] text-zinc-400 ml-1">kcal</span>
        </div>
      </div>

      {/* Macro Breakdown Pills */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-zinc-950/60 border border-zinc-800/60 p-1.5 rounded-lg">
          <span className="text-[10px] text-zinc-400 block font-medium">Protein</span>
          <span className="font-bold text-yellow-400">{food.protein}g</span>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/60 p-1.5 rounded-lg">
          <span className="text-[10px] text-zinc-400 block font-medium">Carbs</span>
          <span className="font-bold text-amber-400">{food.carbs}g</span>
        </div>
        <div className="bg-zinc-950/60 border border-zinc-800/60 p-1.5 rounded-lg">
          <span className="text-[10px] text-zinc-400 block font-medium">Fat</span>
          <span className="font-bold text-orange-400">{food.fat}g</span>
        </div>
      </div>
    </div>
  );
};
