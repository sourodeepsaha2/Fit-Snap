export interface CloudSyncStatus {
  lastSyncedAt: string;
  autoBackupEnabled: boolean;
  syncIntervalMinutes: number;
  pendingSyncItemsCount: number;
  cloudStorageUsedMb: number;
  status: 'synced' | 'syncing' | 'offline';
}

let mockSyncStatus: CloudSyncStatus = {
  lastSyncedAt: new Date().toISOString(),
  autoBackupEnabled: true,
  syncIntervalMinutes: 15,
  pendingSyncItemsCount: 0,
  cloudStorageUsedMb: 4.2,
  status: 'synced',
};

export const getCloudSyncStatus = async (): Promise<CloudSyncStatus> => {
  return mockSyncStatus;
};

export const triggerCloudSync = async (): Promise<CloudSyncStatus> => {
  mockSyncStatus.lastSyncedAt = new Date().toISOString();
  mockSyncStatus.pendingSyncItemsCount = 0;
  mockSyncStatus.status = 'synced';
  return mockSyncStatus;
};

export const updateSyncPreferences = async (
  autoBackup: boolean,
  interval: number
): Promise<CloudSyncStatus> => {
  mockSyncStatus.autoBackupEnabled = autoBackup;
  mockSyncStatus.syncIntervalMinutes = interval;
  return mockSyncStatus;
};
