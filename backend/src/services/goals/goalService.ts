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

let mockGoals: FitnessGoal[] = [
  {
    id: 'g1',
    category: 'weight',
    title: 'Reach Target Body Weight',
    targetValue: 70,
    currentValue: 73.5,
    unit: 'kg',
    deadline: '2026-11-15',
    isCompleted: false,
  },
  {
    id: 'g2',
    category: 'workout',
    title: 'Weekly Workouts Sessions',
    targetValue: 5,
    currentValue: 4,
    unit: 'sessions',
    deadline: '2026-10-12',
    isCompleted: false,
  },
  {
    id: 'g3',
    category: 'water',
    title: 'Daily Hydration Intake',
    targetValue: 2.5,
    currentValue: 1.8,
    unit: 'L',
    deadline: 'Daily',
    isCompleted: false,
  }
];

export const getGoals = async (): Promise<FitnessGoal[]> => {
  return mockGoals;
};

export const addGoal = async (goal: Omit<FitnessGoal, 'id' | 'isCompleted'>): Promise<FitnessGoal> => {
  const newGoal: FitnessGoal = {
    ...goal,
    id: `g_${Date.now()}`,
    isCompleted: goal.currentValue >= goal.targetValue,
  };
  mockGoals.push(newGoal);
  return newGoal;
};

export const updateGoalProgress = async (id: string, currentValue: number): Promise<FitnessGoal | null> => {
  const goalIndex = mockGoals.findIndex((g) => g.id === id);
  if (goalIndex === -1) return null;
  mockGoals[goalIndex].currentValue = currentValue;
  mockGoals[goalIndex].isCompleted = currentValue >= mockGoals[goalIndex].targetValue;
  return mockGoals[goalIndex];
};
