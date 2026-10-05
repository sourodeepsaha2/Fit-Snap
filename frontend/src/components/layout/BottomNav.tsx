import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Dumbbell, BarChart3, Settings } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/meals', label: 'Meals', icon: UtensilsCrossed },
  { path: '/workouts', label: 'Workouts', icon: Dumbbell },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-850 border-zinc-800/90 px-2 py-2 max-w-md mx-auto sm:rounded-b-3xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 tap-active min-w-[58px]
                ${
                  isActive
                    ? 'text-yellow-400 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`relative p-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-yellow-400/10 scale-110' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
