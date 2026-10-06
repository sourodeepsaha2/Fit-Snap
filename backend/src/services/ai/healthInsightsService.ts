export interface HealthInsight {
  id: string;
  category: 'nutrition' | 'workout' | 'hydration' | 'recovery';
  title: string;
  description: string;
  impactLevel: 'high' | 'medium' | 'low';
  actionLabel?: string;
}

export class HealthInsightsService {
  public static generateInsights(): HealthInsight[] {
    return [
      {
        id: 'ins-1',
        category: 'nutrition',
        title: 'Protein Intake Threshold Reached',
        description: 'You are on track with 106g protein. Adding 30g post-workout will optimize muscle recovery.',
        impactLevel: 'high',
        actionLabel: 'Log Snack'
      },
      {
        id: 'ins-2',
        category: 'hydration',
        title: 'Hydration Pacing Optimal',
        description: 'You have consumed 1.5L before 4 PM. Maintaining this rate supports metabolic efficiency during evening training.',
        impactLevel: 'medium'
      },
      {
        id: 'ins-3',
        category: 'workout',
        title: 'Progressive Overload Spike',
        description: 'Bench press volume increased by 8% this week. Ensure adequate 8-hour sleep for full neuromuscular adaptation.',
        impactLevel: 'medium'
      }
    ];
  }
}
