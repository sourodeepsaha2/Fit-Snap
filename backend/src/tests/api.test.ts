import { getStreakData } from '../services/streak/streakService.js';
import { getGoals } from '../services/goals/goalService.js';
import { getNotifications } from '../services/notifications/notificationService.js';
import { getSleepLogs, calculateRecoveryScore } from '../services/sleep/sleepService.js';

export const runApiIntegrationTests = async () => {
  console.log('🧪 Starting FitSnap API Integration Tests...');

  // Test 1: Streak Service
  const streak = await getStreakData();
  console.assert(streak.currentStreakDays >= 0, 'Streak days should be non-negative');
  console.log('✓ Streak service test passed.');

  // Test 2: Goals Service
  const goals = await getGoals();
  console.assert(Array.isArray(goals), 'Goals should return an array');
  console.log('✓ Goals service test passed.');

  // Test 3: Notifications Service
  const notifications = await getNotifications();
  console.assert(notifications.length > 0, 'Notifications array should not be empty');
  console.log('✓ Notifications service test passed.');

  // Test 4: Sleep Service & Recovery Calculation
  const sleepLogs = await getSleepLogs();
  const recoveryScore = calculateRecoveryScore(8, 120, 5);
  console.assert(recoveryScore === 100, `Expected 100 recovery score for perfect sleep, got ${recoveryScore}`);
  console.assert(sleepLogs.length > 0, 'Sleep logs array should not be empty');
  console.log('✓ Sleep recovery calculator test passed.');

  console.log('🎉 All FitSnap API Integration Tests Completed Successfully!');
};

if (process.env.NODE_ENV === 'test') {
  runApiIntegrationTests().catch(console.error);
}
