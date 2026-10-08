export interface FitnessNotification {
  id: string;
  type: 'water' | 'meal' | 'workout' | 'streak';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

let mockNotifications: FitnessNotification[] = [
  {
    id: 'n1',
    type: 'water',
    title: 'Hydration Alert 💧',
    message: 'Time for a glass of water! You are 1,000ml away from your daily target.',
    timestamp: new Date().toISOString(),
    isRead: false,
    priority: 'medium',
  },
  {
    id: 'n2',
    type: 'streak',
    title: 'Streak Multiplier Active 🔥',
    message: 'You have a 7-day streak going! Log a workout today to earn your next badge.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    priority: 'high',
  },
  {
    id: 'n3',
    type: 'meal',
    title: 'Protein Intake Boost 🥗',
    message: 'Consider adding 25g of protein to your evening meal to hit your macro goal.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: true,
    priority: 'low',
  }
];

export const getNotifications = async (): Promise<FitnessNotification[]> => {
  return mockNotifications;
};

export const markNotificationAsRead = async (id: string): Promise<FitnessNotification | null> => {
  const notif = mockNotifications.find((n) => n.id === id);
  if (!notif) return null;
  notif.isRead = true;
  return notif;
};
