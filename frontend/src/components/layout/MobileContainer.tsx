import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between items-center selection:bg-yellow-400/30 selection:text-yellow-300">
      {/* Container wrapper: Centered on desktop, full width on mobile */}
      <div className="w-full max-w-md min-h-screen bg-zinc-950 sm:border-x sm:border-zinc-800/80 sm:shadow-2xl flex flex-col relative pb-20">
        {children}
      </div>
    </div>
  );
};
