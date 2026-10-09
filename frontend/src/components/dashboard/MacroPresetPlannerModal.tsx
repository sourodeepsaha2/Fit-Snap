import React, { useState } from 'react';
import { Modal } from '../common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetName: string, protein: number, carbs: number, fat: number) => void;
}

export const MacroPresetPlannerModal: React.FC<Props> = ({ isOpen, onClose, onSelectPreset }) => {
  const [selectedPreset, setSelectedPreset] = useState('balanced');

  const presets = [
    { id: 'balanced', name: 'Balanced Fitness', desc: '40% Carbs, 30% Protein, 30% Fat', p: 150, c: 200, f: 67 },
    { id: 'high-protein', name: 'Muscle Building', desc: '40% Protein, 35% Carbs, 25% Fat', p: 200, c: 175, f: 55 },
    { id: 'keto', name: 'Keto / Low Carb', desc: '70% Fat, 25% Protein, 5% Carbs', p: 125, c: 25, f: 155 },
    { id: 'endurance', name: 'Endurance Athlete', desc: '55% Carbs, 25% Protein, 20% Fat', p: 125, c: 275, f: 44 },
  ];

  const handleApply = () => {
    const active = presets.find((p) => p.id === selectedPreset);
    if (active) {
      onSelectPreset(active.name, active.p, active.c, active.f);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Macro Distribution Planner">
      <div className="space-y-4 text-white">
        <p className="text-xs text-zinc-400">
          Choose a tailored macro distribution split to match your fitness target.
        </p>

        <div className="space-y-2">
          {presets.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedPreset === p.id
                  ? 'bg-yellow-400/10 border-yellow-400'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{p.name}</span>
                {selectedPreset === p.id && <span className="text-xs text-yellow-400 font-bold">✓ Active</span>}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{p.desc}</p>
              <div className="flex gap-2 text-[10px] font-mono text-zinc-300 mt-2">
                <span className="px-2 py-0.5 bg-zinc-800 rounded">Protein: {p.p}g</span>
                <span className="px-2 py-0.5 bg-zinc-800 rounded">Carbs: {p.c}g</span>
                <span className="px-2 py-0.5 bg-zinc-800 rounded">Fat: {p.f}g</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold text-sm rounded-xl hover:opacity-90 transition-all shadow-lg"
        >
          Apply Preset Split
        </button>
      </div>
    </Modal>
  );
};
