import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface WeightTrendPreviewProps {
  history: Array<{ day: string; weight: number }>;
  onViewProgress: () => void;
}

export const WeightTrendPreview: React.FC<WeightTrendPreviewProps> = ({
  history,
  onViewProgress,
}) => {
  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-zinc-100 tracking-tight">Weight Trend</h3>
          <p className="text-xs text-zinc-400">Weekly Progress</p>
        </div>

        <Button
          size="sm"
          variant="ghost"
          icon={<ArrowRight className="w-4 h-4 text-yellow-400" />}
          iconPosition="right"
          onClick={onViewProgress}
        >
          View Progress
        </Button>
      </div>

      <div className="h-32 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGradYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 10 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-xl text-xs font-bold text-yellow-400 shadow-md">
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
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#weightGradYellow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
