import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl my-2">
      <div className="p-4 bg-slate-800/60 rounded-full text-emerald-400 mb-3">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
