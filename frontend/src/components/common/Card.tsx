import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  action,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-4 sm:p-5',
    lg: 'p-6',
  };

  const isClickable = !!onClick || hoverable;

  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-sm
        backdrop-blur-sm transition-all duration-200 overflow-hidden
        ${isClickable ? 'cursor-pointer hover:border-slate-700 hover:bg-slate-900 tap-active' : ''}
        ${className}
      `}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-slate-800/40">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
};
