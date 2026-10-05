import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isOpen,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  };

  const borders = {
    success: 'border-yellow-400/40 bg-zinc-950/95 text-zinc-100',
    info: 'border-blue-500/40 bg-zinc-950/95 text-zinc-100',
    error: 'border-rose-500/40 bg-zinc-950/95 text-zinc-100',
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm animate-fade-in pointer-events-auto">
      <div
        className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md ${borders[type]}`}
      >
        <div className="flex items-center gap-3">
          {icons[type]}
          <span className="text-sm font-semibold">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
