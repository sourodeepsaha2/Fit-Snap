export interface FitnessNotification {
  id: string;
  type: 'water' | 'meal' | 'workout' | 'streak';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}
