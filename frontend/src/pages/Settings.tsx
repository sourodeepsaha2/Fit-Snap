import React, { useState } from 'react';
import { User, Moon, ShieldCheck, Zap, Save } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { mockUserProfile, mockUserPreferences } from '../data/mockData';
import type { UserProfile, UserPreferences } from '../types';

export const Settings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(mockUserPreferences);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleProfileChange = (field: keyof UserProfile, value: number) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleTogglePref = (field: keyof UserPreferences) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Settings & profile goals saved!');
  };

  return (
    <div className="space-y-5 px-4 pt-4 pb-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-xs text-zinc-400">Personalize targets & app preferences</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5">
        {/* Profile Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
            <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Profile & Goals</h3>
              <p className="text-xs text-zinc-400">Configure daily target metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={profile.heightCm}
                onChange={(e) => handleProfileChange('heightCm', Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={profile.weightKg}
                onChange={(e) => handleProfileChange('weightKg', Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Target Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={profile.targetWeightKg}
              onChange={(e) => handleProfileChange('targetWeightKg', Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Daily Calorie Goal
              </label>
              <input
                type="number"
                value={profile.dailyCalorieGoal}
                onChange={(e) => handleProfileChange('dailyCalorieGoal', Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Daily Protein Goal (g)
              </label>
              <input
                type="number"
                value={profile.dailyProteinGoal}
                onChange={(e) => handleProfileChange('dailyProteinGoal', Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
            <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Preferences</h3>
              <p className="text-xs text-zinc-400">App interface & alerts</p>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-zinc-200 block">Dark Mode</span>
                <span className="text-xs text-zinc-400">OLED pure black & yellow accents</span>
              </div>
              <button
                type="button"
                onClick={() => handleTogglePref('darkMode')}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  preferences.darkMode ? 'bg-yellow-400' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transform transition-transform ${
                    preferences.darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3">
              <div>
                <span className="text-sm font-semibold text-zinc-200 block">Notifications</span>
                <span className="text-xs text-zinc-400">Meal & workout reminders</span>
              </div>
              <button
                type="button"
                onClick={() => handleTogglePref('notifications')}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  preferences.notifications ? 'bg-yellow-400' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transform transition-transform ${
                    preferences.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          icon={<Save className="w-5 h-5" />}
        >
          Save Preferences
        </Button>
      </form>

      {/* About Section */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 text-center space-y-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-amber-500 text-black font-extrabold rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Zap className="w-5 h-5 fill-black" />
        </div>
        <h4 className="text-base font-black text-white">FitSnap</h4>
        <p className="text-xs text-zinc-400">Mobile-first Nutrition & Fitness Tracker</p>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-0.5 rounded-full mt-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Version 1.0 (Black & Yellow OLED)</span>
        </div>
      </div>

      <Toast
        isOpen={!!toastMessage}
        message={toastMessage || ''}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
