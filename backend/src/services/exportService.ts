import { WorkoutService } from './workoutService.js';
import { WaterService } from './waterService.js';

export class ExportService {
  public static generateExportPackage() {
    return {
      exportedAt: new Date().toISOString(),
      appVersion: '1.0.0',
      user: {
        name: 'Alex Vance',
        dailyCalorieGoal: 2400,
        dailyProteinGoal: 180
      },
      meals: [
        { id: 'm-1', name: 'Avocado Toast & Eggs', category: 'breakfast', calories: 480, protein: 24, loggedAt: '08:30 AM' },
        { id: 'm-2', name: 'Grilled Chicken Salad', category: 'lunch', calories: 620, protein: 52, loggedAt: '01:15 PM' },
        { id: 'm-3', name: 'Whey Protein Shake', category: 'snack', calories: 210, protein: 30, loggedAt: '05:00 PM' }
      ],
      workouts: WorkoutService.getWorkoutLogs(),
      hydration: WaterService.getWaterProgress(),
      weightHistory: [
        { day: 'Sep 1', weight: 78.5 },
        { day: 'Sep 8', weight: 77.9 },
        { day: 'Sep 15', weight: 77.4 },
        { day: 'Sep 22', weight: 76.8 },
        { day: 'Sep 25', weight: 76.5 }
      ]
    };
  }
}
