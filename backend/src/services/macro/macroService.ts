export interface MacroDistributionPreset {
  id: string;
  name: string;
  description: string;
  proteinRatio: number; // percentage
  carbsRatio: number;
  fatRatio: number;
}

export const MACRO_PRESETS: MacroDistributionPreset[] = [
  {
    id: 'balanced',
    name: 'Balanced Fitness',
    description: '40% Carbs, 30% Protein, 30% Fat - Ideal for general fitness',
    proteinRatio: 30,
    carbsRatio: 40,
    fatRatio: 30,
  },
  {
    id: 'high-protein',
    name: 'Muscle Building',
    description: '40% Protein, 35% Carbs, 25% Fat - Maximize muscle hypertrophy',
    proteinRatio: 40,
    carbsRatio: 35,
    fatRatio: 25,
  },
  {
    id: 'keto',
    name: 'Keto / Low Carb',
    description: '70% Fat, 25% Protein, 5% Carbs - Fat adaptation state',
    proteinRatio: 25,
    carbsRatio: 5,
    fatRatio: 70,
  },
  {
    id: 'endurance',
    name: 'Endurance Athlete',
    description: '55% Carbs, 25% Protein, 20% Fat - Sustained aerobic energy',
    proteinRatio: 25,
    carbsRatio: 55,
    fatRatio: 20,
  },
];

export const calculateMacroGrams = (
  totalCalories: number,
  presetId: string
): { proteinGrams: number; carbsGrams: number; fatGrams: number } => {
  const preset = MACRO_PRESETS.find((p) => p.id === presetId) || MACRO_PRESETS[0];
  const proteinGrams = Math.round((totalCalories * (preset.proteinRatio / 100)) / 4);
  const carbsGrams = Math.round((totalCalories * (preset.carbsRatio / 100)) / 4);
  const fatGrams = Math.round((totalCalories * (preset.fatRatio / 100)) / 9);

  return { proteinGrams, carbsGrams, fatGrams };
};
