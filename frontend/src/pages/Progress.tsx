import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Scale, Flame, Trophy, Dumbbell, HeartPulse, Footprints } from 'lucide-react';
import { WeeklyCalorieChart } from '../components/dashboard/WeeklyCalorieChart';
import {
  mockWeightSummary,
  mockWeeklyCalorieHistory,
  mockProgressStats,
  mockUserProfile,
} from '../data/mockData';

export const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const stats = [
    {
      label: 'Avg. Daily Calories',
      value: `${mockProgressStats.averageDailyCalories.toLocaleString()} kcal`,
      sub: 'Goal: 2,200 kcal',
      icon: <Flame className="w-4 h-4 text-yellow-400" />,
      badgeBg: 'bg-yellow-400/10 border-yellow-400/20',
    },
    {
      label: 'Avg. Daily Protein',
      value: `${mockProgressStats.averageProteinGrams} g`,
      sub: 'Goal: 150 g',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      badgeBg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Total Workouts',
      value: `${mockProgressStats.totalWorkoutsThisMonth} sessions`,
      sub: 'This month',
      icon: <Dumbbell className="w-4 h-4 text-purple-400" />,
      badgeBg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Cardio Minutes',
      value: `${mockProgressStats.totalCardioTimeMin} min`,
      sub: '7.5 hours total',
      icon: <HeartPulse className="w-4 h-4 text-orange-400" />,
      badgeBg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: 'Monthly Steps',
      value: mockProgressStats.totalStepsThisMonth.toLocaleString(),
      sub: '7,280 avg/day',
      icon: <Footprints className="w-4 h-4 text-yellow-400" />,
      badgeBg: 'bg-yellow-400/10 border-yellow-400/20',
    },
  ];

  return (
    <div className="space-y-5 px-4 pt-4 pb-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Progress</h1>
          <p className="text-xs text-zinc-400">Analytics & long-term trends</p>
        </div>

        {/* Time range selector */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-bold">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeRange === range
                  ? 'bg-yellow-400 text-black font-extrabold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Weight Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Weight Journey
              </span>
              <h2 className="text-lg font-bold text-white">Body Mass Tracking</h2>
            </div>
          </div>
          <span className="text-xs font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-full">
            {mockWeightSummary.changeThisMonthKg} kg this month
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-4">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Current Weight</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-white">
                {mockWeightSummary.currentKg}
              </span>
              <span className="text-xs text-zinc-400">kg</span>
            </div>
          </div>
          <div className="text-right border-l border-zinc-800/80 pl-4">
            <span className="text-xs text-zinc-400 block font-medium">Target Weight</span>
            <div className="flex items-baseline justify-end gap-1 mt-0.5">
              <span className="text-2xl font-black text-yellow-400">
                {mockWeightSummary.targetKg}
              </span>
              <span className="text-xs text-zinc-400">kg</span>
            </div>
          </div>
        </div>

        {/* Detailed Weight Chart */}
        <div className="mt-4">
          <span className="text-xs font-semibold text-zinc-400 block mb-2">Weight Trend Curve</span>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeightSummary.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGradProgressYellow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                <YAxis domain={[74, 77]} axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-xl text-xs font-extrabold text-yellow-400 shadow-lg">
                          {payload[0].payload.day}: {payload[0].value} kg
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#facc15"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#weightGradProgressYellow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Calorie Chart Component */}
      <WeeklyCalorieChart
        data={mockWeeklyCalorieHistory}
        targetCalories={mockUserProfile.dailyCalorieGoal}
      />

      {/* Statistic Grid Cards */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-zinc-100 tracking-tight">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl border ${stat.badgeBg}`}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-zinc-400 block">
                  {stat.label}
                </span>
                <span className="text-base font-black text-white block mt-0.5 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
