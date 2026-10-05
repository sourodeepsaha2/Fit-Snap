import React, { useState } from 'react';
import { Dumbbell, HeartPulse, Plus, CheckCircle, Flame, Timer, Flame as FlameIcon } from 'lucide-react';
import { WorkoutActionModal } from '../components/workouts/WorkoutActionModal';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { mockTodayWorkout } from '../data/mockData';
import type { StrengthExercise, CardioExercise } from '../types';

export const Workouts: React.FC = () => {
  const [strengthList, setStrengthList] = useState<StrengthExercise[]>(mockTodayWorkout.strength);
  const [cardioList, setCardioList] = useState<CardioExercise[]>(mockTodayWorkout.cardio);
  const [modalMode, setModalMode] = useState<'exercise' | 'cardio' | 'finish' | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({
    'ex-1': true,
    'ex-2': true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddExercise = (ex: StrengthExercise) => {
    setStrengthList((prev) => [...prev, ex]);
    setToastMessage(`Added exercise: ${ex.name}`);
  };

  const handleAddCardio = (cardio: CardioExercise) => {
    setCardioList((prev) => [...prev, cardio]);
    setToastMessage(`Added cardio: ${cardio.name}`);
  };

  const handleFinishWorkout = () => {
    setToastMessage('🎉 Workout finished & logged successfully!');
  };

  const toggleSetCompleted = (id: string) => {
    setCompletedSets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalStrengthMin = 75;
  const totalCardioMin = cardioList.reduce((acc, c) => acc + c.durationMin, 0);
  const totalCaloriesBurned = 430;

  return (
    <div className="space-y-5 px-4 pt-4 pb-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Workouts</h1>
          <p className="text-xs text-zinc-400">{mockTodayWorkout.date}</p>
        </div>
        <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
          <FlameIcon className="w-3.5 h-3.5" />
          <span>Active Session</span>
        </div>
      </div>

      {/* Workout Session Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-lg">
        <h2 className="text-lg font-bold text-white tracking-tight">{mockTodayWorkout.title}</h2>
        <div className="flex items-center gap-4 mt-2 text-xs text-zinc-300 font-medium">
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-yellow-400" />
            {totalStrengthMin + totalCardioMin} min total
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {totalCaloriesBurned} kcal burned
          </span>
        </div>
      </div>

      {/* Strength Training Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl border border-yellow-400/20">
              <Dumbbell className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-100 tracking-tight">
              Strength Training
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-medium">{strengthList.length} exercises</span>
        </div>

        <div className="space-y-2.5">
          {strengthList.map((ex) => {
            const isDone = !!completedSets[ex.id];
            return (
              <div
                key={ex.id}
                className={`bg-zinc-900/90 border rounded-2xl p-4 flex items-center justify-between transition-all ${
                  isDone ? 'border-yellow-400/40 bg-zinc-900/50' : 'border-zinc-800'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-zinc-300 font-semibold">
                    <span className="bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800">
                      {ex.weightKg} kg
                    </span>
                    <span>×</span>
                    <span>{ex.reps} reps</span>
                    <span>×</span>
                    <span>{ex.sets} sets</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSetCompleted(ex.id)}
                  className={`p-2.5 rounded-xl border transition-all tap-active ${
                    isDone
                      ? 'bg-yellow-400 text-black border-yellow-300'
                      : 'bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                  title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                >
                  <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cardio Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-100 tracking-tight">Cardio</h3>
          </div>
          <span className="text-xs text-zinc-400 font-medium">{cardioList.length} session</span>
        </div>

        <div className="space-y-2.5">
          {cardioList.map((cardio) => (
            <div
              key={cardio.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-white">{cardio.name}</h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-zinc-300 font-medium">
                  <span>⏱ {cardio.durationMin} min</span>
                  {cardio.incline && <span>📐 {cardio.incline} incline</span>}
                  {cardio.speedKmh && <span>⚡ {cardio.speedKmh} km/h</span>}
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-orange-400">
                  {cardio.caloriesBurned} kcal
                </span>
                <span className="text-[10px] text-zinc-400 block">burned</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="lg"
            icon={<Plus className="w-4 h-4 text-yellow-400" />}
            onClick={() => setModalMode('exercise')}
            fullWidth
          >
            Add Exercise
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<Plus className="w-4 h-4 text-orange-400" />}
            onClick={() => setModalMode('cardio')}
            fullWidth
          >
            Add Cardio
          </Button>
        </div>

        <Button
          variant="primary"
          size="xl"
          fullWidth
          onClick={() => setModalMode('finish')}
          className="shadow-xl"
        >
          Finish Workout
        </Button>
      </div>

      {/* Workout Action Modal & Toast */}
      <WorkoutActionModal
        isOpen={!!modalMode}
        mode={modalMode}
        onClose={() => setModalMode(null)}
        onAddExercise={handleAddExercise}
        onAddCardio={handleAddCardio}
        onFinishWorkout={handleFinishWorkout}
      />

      <Toast
        isOpen={!!toastMessage}
        message={toastMessage || ''}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
