import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'emerald' | 'blue' | 'amber' | 'purple' | 'slate' | 'rose';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    yellow: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    emerald: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    slate: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
