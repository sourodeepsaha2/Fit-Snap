import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from 'recharts';
import type { CalorieLog } from '../../types';

interface WeeklyCalorieChartProps {
  data: CalorieLog[];
  targetCalories: number;
}

export const WeeklyCalorieChart: React.FC<WeeklyCalorieChartProps> = ({
  data,
  targetCalories,
}) => {
  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-zinc-100 tracking-tight">
            Weekly Calorie Intake
          </h3>
          <p className="text-xs text-zinc-400">7-Day Overview vs Goal</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-zinc-300 font-semibold">Intake</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-yellow-500/60 border border-dashed border-yellow-400" />
            <span className="text-zinc-400">Target</span>
          </div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 10 }}
              domain={[1000, 2500]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as CalorieLog;
                  return (
                    <div className="bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl shadow-2xl text-xs">
                      <span className="font-bold text-zinc-200">{item.day} ({item.dateStr})</span>
                      <div className="text-yellow-400 font-extrabold mt-1">
                        {item.calories} kcal
                      </div>
                      <div className="text-zinc-400 text-[10px]">
                        Target: {item.target} kcal
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={targetCalories}
              stroke="#facc15"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => {
                const isOver = entry.calories > targetCalories;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isOver ? '#f43f5e' : '#facc15'}
                    fillOpacity={0.9}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
