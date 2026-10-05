import React, { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { StrengthExercise, CardioExercise } from '../../types';

interface WorkoutActionModalProps {
  isOpen: boolean;
  mode: 'exercise' | 'cardio' | 'finish' | null;
  onClose: () => void;
  onAddExercise: (ex: StrengthExercise) => void;
  onAddCardio: (cardio: CardioExercise) => void;
  onFinishWorkout: () => void;
}

export const WorkoutActionModal: React.FC<WorkoutActionModalProps> = ({
  isOpen,
  mode,
  onClose,
  onAddExercise,
  onAddCardio,
  onFinishWorkout,
}) => {
  // Exercise Form State
  const [exName, setExName] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('3');

  // Cardio Form State
  const [cardioName, setCardioName] = useState('');
  const [durationMin, setDurationMin] = useState('');
  const [incline, setIncline] = useState('');
  const [speedKmh, setSpeedKmh] = useState('');

  if (!mode) return null;

  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exName || !weightKg || !reps) return;
    onAddExercise({
      id: `ex-${Date.now()}`,
      name: exName,
      weightKg: parseFloat(weightKg),
      reps: parseInt(reps, 10),
      sets: parseInt(sets, 10) || 3,
    });
    setExName('');
    setWeightKg('');
    setReps('');
    onClose();
  };

  const handleCardioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardioName || !durationMin) return;
    onAddCardio({
      id: `cardio-${Date.now()}`,
      name: cardioName,
      durationMin: parseInt(durationMin, 10),
      incline: incline ? parseFloat(incline) : undefined,
      speedKmh: speedKmh ? parseFloat(speedKmh) : undefined,
      caloriesBurned: Math.round(parseInt(durationMin, 10) * 8.5),
    });
    setCardioName('');
    setDurationMin('');
    setIncline('');
    setSpeedKmh('');
    onClose();
  };

  const handleFinish = () => {
    onFinishWorkout();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'exercise'
          ? '💪 Add Strength Exercise'
          : mode === 'cardio'
          ? '🏃 Log Cardio Session'
          : '🎉 Finish Workout'
      }
    >
      {mode === 'exercise' && (
        <form onSubmit={handleExerciseSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Exercise Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dumbbell Shoulder Press"
              value={exName}
              onChange={(e) => setExName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.5"
                placeholder="20"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Reps
              </label>
              <input
                type="number"
                placeholder="10"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Sets
              </label>
              <input
                type="number"
                placeholder="3"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<Plus className="w-5 h-5 stroke-[3]" />}
            className="mt-2"
          >
            Add Exercise
          </Button>
        </form>
      )}

      {mode === 'cardio' && (
        <form onSubmit={handleCardioSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Cardio Activity
            </label>
            <input
              type="text"
              placeholder="e.g. Stairmaster / Rowing Machine"
              value={cardioName}
              onChange={(e) => setCardioName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Duration (min)
              </label>
              <input
                type="number"
                placeholder="20"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Incline
              </label>
              <input
                type="number"
                placeholder="10"
                value={incline}
                onChange={(e) => setIncline(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Speed (km/h)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="4.5"
                value={speedKmh}
                onChange={(e) => setSpeedKmh(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<Plus className="w-5 h-5 stroke-[3]" />}
            className="mt-2"
          >
            Add Cardio
          </Button>
        </form>
      )}

      {mode === 'finish' && (
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto border border-yellow-400/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Awesome Workout!</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              You crushed your strength & cardio targets for today. Ready to log and wrap up?
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <Button variant="ghost" size="lg" onClick={onClose} fullWidth>
              Keep Editing
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinish}
              fullWidth
            >
              Log & Complete
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
