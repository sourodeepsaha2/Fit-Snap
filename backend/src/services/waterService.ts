import { WaterLogEntry, WaterProgress } from '../types/water.js';

let dailyTargetMl = 2500; // Default 2.5L target
const waterLogs: WaterLogEntry[] = [
  { id: 'w-1', amountMl: 500, timestamp: '08:30 AM' },
  { id: 'w-2', amountMl: 250, timestamp: '11:00 AM' },
  { id: 'w-3', amountMl: 500, timestamp: '01:45 PM' }
];

export class WaterService {
  public static getWaterProgress(): WaterProgress {
    const currentMl = waterLogs.reduce((acc, item) => acc + item.amountMl, 0);
    const percentage = Math.min(100, Math.round((currentMl / dailyTargetMl) * 100));

    return {
      targetMl: dailyTargetMl,
      currentMl,
      percentage,
      logs: [...waterLogs]
    };
  }

  public static addWaterLog(amountMl: number): WaterProgress {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry: WaterLogEntry = {
      id: `wlog-${Date.now()}`,
      amountMl,
      timestamp: timeStr
    };
    waterLogs.unshift(newEntry);
    return this.getWaterProgress();
  }

  public static updateTarget(newTargetMl: number): WaterProgress {
    if (newTargetMl > 0) {
      dailyTargetMl = newTargetMl;
    }
    return this.getWaterProgress();
  }
}
