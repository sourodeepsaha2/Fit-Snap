import React from 'react';
import { Sparkles, ArrowRight, Zap, Target } from 'lucide-react';

export interface InsightItem {
  id: string;
  category: 'nutrition' | 'workout' | 'hydration' | 'recovery';
  title: string;
  description: string;
  impactLevel: 'high' | 'medium' | 'low';
}

interface AIHealthInsightsCardProps {
  insights?: InsightItem[];
}

const DEFAULT_INSIGHTS: InsightItem[] = [
  {
    id: 'ins-1',
    category: 'nutrition',
    title: 'Protein Intake Threshold Reached',
    description: 'You are on track with 106g protein. Adding 30g post-workout will optimize muscle recovery.',
    impactLevel: 'high',
  },
  {
    id: 'ins-2',
    category: 'hydration',
    title: 'Hydration Pacing Optimal',
    description: '1.5L logged today. Maintain current drinking rate to support evening training.',
    impactLevel: 'medium',
  },
];

export const AIHealthInsightsCard: React.FC<AIHealthInsightsCardProps> = ({
  insights = DEFAULT_INSIGHTS,
}) => {
  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl text-yellow-400">
            <Sparkles className="w-4 h-4 fill-yellow-400/20" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">AI Health Insights</h3>
            <span className="text-xs text-zinc-400">Personalized daily advice</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
          <Zap className="w-3 h-3" /> Live Analysis
        </span>
      </div>

      <div className="space-y-2.5">
        {insights.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-3 flex items-start justify-between gap-3 hover:border-zinc-700/80 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="text-xs font-bold text-zinc-100">{item.title}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal pl-5">
                {item.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
};
