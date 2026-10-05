import React from 'react';
import { Button } from '../common/Button';
import { Check } from 'lucide-react';

interface SaveMealButtonProps {
  onSave: () => void;
  totalCalories: number;
  disabled?: boolean;
}

export const SaveMealButton: React.FC<SaveMealButtonProps> = ({
  onSave,
  totalCalories,
  disabled = false,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md pt-3 pb-2 border-t border-zinc-800/80 -mx-5 px-5 z-20">
      <Button
        variant="primary"
        size="xl"
        fullWidth
        onClick={onSave}
        disabled={disabled}
        icon={<Check className="w-6 h-6 stroke-[3]" />}
        className="shadow-2xl glow-yellow"
      >
        Save Meal ({totalCalories.toLocaleString()} kcal)
      </Button>
    </div>
  );
};
