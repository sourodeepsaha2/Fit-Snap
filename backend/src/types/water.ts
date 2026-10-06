export interface WaterLogEntry {
  id: string;
  amountMl: number;
  timestamp: string; // ISO format or formatted time e.g. "10:15 AM"
}

export interface WaterProgress {
  targetMl: number;
  currentMl: number;
  percentage: number;
  logs: WaterLogEntry[];
}
