export interface FitnessGoal {
  id: string;
  category: 'weight' | 'workout' | 'water' | 'calories';
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  isCompleted: boolean;
}
