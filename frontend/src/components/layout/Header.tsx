import React from 'react';
import { Camera, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onQuickAddMeal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuickAddMeal }) => {
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center shadow-md shadow-yellow-400/20 group-active:scale-95 transition-transform">
          <Zap className="w-5 h-5 text-black fill-black" />
        </div>
        <div>
          <span className="text-base font-black tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            FitSnap
          </span>
          <span className="text-[10px] text-yellow-400 font-extrabold ml-1 px-1.5 py-0.2 bg-yellow-400/10 rounded-full border border-yellow-400/20">
            PRO
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
          {todayDate}
        </span>
        {onQuickAddMeal && (
          <button
            onClick={onQuickAddMeal}
            className="p-2 text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 rounded-xl transition-all active:scale-95"
            title="Log Meal Photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
