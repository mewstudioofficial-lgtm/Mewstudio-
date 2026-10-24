import React, { useState, useEffect } from 'react';
import { DailyTask, DailyBriefingData } from '../types/beymax';
import { CheckCircle2, Circle, Plus, Heart, Sparkles, Volume2, Play, Pause, RotateCcw, ShieldCheck, Flame } from 'lucide-react';
import { soundEffects, speakText } from '../utils/audioEffects';

interface DailyMissionMatrixProps {
  tasks: DailyTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<DailyTask, 'id' | 'completed'>) => void;
  energyLevel: number;
  onEnergyLevelChange: (level: number) => void;
}

export const DailyMissionMatrix: React.FC<DailyMissionMatrixProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  energyLevel,
  onEnergyLevelChange,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<DailyTask['category']>('freelance');
  const [newTaskPriority, setNewTaskPriority] = useState<DailyTask['priority']>('high');
  const [briefing, setBriefing] = useState<DailyBriefingData | null>(null);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);

  // Focus Timer state
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && focusTimeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (focusTimeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      soundEffects.playSuccessTone();
      speakText('Focus interval complete, Samir. Baymax recommends standing up, hydrating, and resting your eyes.', 'care_baymax');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTimeLeft]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask({
      title: newTaskTitle,
      priority: newTaskPriority,
      category: newTaskCategory,
      timeEstimate: '30m',
    });
    setNewTaskTitle('');
    soundEffects.playJarvisPulse();
  };

  const handleGenerateBriefing = async () => {
    setIsBriefingLoading(true);
    soundEffects.playJarvisPulse();
    try {
      const res = await fetch('/api/beymax/daily-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          energyLevel,
          activeGoals: tasks.filter((t) => !t.completed).map((t) => t.title),
        }),
      });
      const data = await res.json();
      setBriefing(data);
      soundEffects.playBaymaxChime();
      // Auto vocalize opening
      if (data.greeting && data.topFocusRecommendation) {
        speakText(`${data.greeting}. ${data.topFocusRecommendation}`, 'tactical_jarvis');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Baymax Vitals Scan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Baymax Care & Energy Scan */}
        <div className="glass-panel rounded-2xl p-5 border border-rose-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono">
                <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400" />
                <span>BAYMAX HEALTHCARE SCAN // SAMIR</span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-300">
                {energyLevel}/10
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2 font-medium">
              "On a scale of 1 to 10, how would you rate your energy and focus today, Samir?"
            </p>

            {/* Slider */}
            <div className="mt-4">
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onEnergyLevelChange(val);
                  soundEffects.playBaymaxChime();
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>1 (Drained)</span>
                <span>5 (Steady)</span>
                <span>10 (Peak Drive)</span>
              </div>
            </div>

            {/* Baymax Advice based on level */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              {energyLevel >= 8 ? (
                <span className="text-emerald-300">
                  ⚡ <strong>Peak Flow State:</strong> Your vitals are primed for aggressive outreach and deep coding. Tackle the #1 hardest goal right now.
                </span>
              ) : energyLevel >= 5 ? (
                <span className="text-amber-300">
                  ⚖️ <strong>Balanced Rhythm:</strong> Solid baseline. Work in 25-minute sprints with periodic water breaks.
                </span>
              ) : (
                <span className="text-rose-300">
                  🩺 <strong>Recharge Required:</strong> High ambition requires physical stamina. Take a 20-minute walk, hydrate, and do not burn out.
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleGenerateBriefing}
            disabled={isBriefingLoading}
            className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-rose-950/40 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBriefingLoading ? 'Synthesizing...' : 'Request Daily Voice Briefing'}</span>
          </button>
        </div>

        {/* Center: Mission Progress & Briefing Output */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                  JARVIS MISSION MATRIX
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-0.5">
                  Daily Execution Agenda
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Completion</span>
                <p className="text-base font-bold font-mono text-cyan-400">{progressPercent}%</p>
              </div>
            </div>

            {/* Briefing Card if generated */}
            {briefing ? (
              <div className="mt-3.5 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-2 text-xs">
                <div className="flex items-center justify-between text-cyan-300 font-mono font-bold">
                  <span>{briefing.greeting}</span>
                  <button
                    onClick={() => speakText(`${briefing.greeting}. ${briefing.topFocusRecommendation}`, 'tactical_jarvis')}
                    className="flex items-center space-x-1 text-slate-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Re-play Voice</span>
                  </button>
                </div>
                <p className="text-slate-200">
                  <span className="font-semibold text-cyan-400">Priority Directive: </span>
                  {briefing.topFocusRecommendation}
                </p>
                <p className="text-slate-300 italic border-l-2 border-amber-400 pl-2">
                  "{briefing.quote}"
                </p>
              </div>
            ) : (
              <div className="mt-3.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Tap "Request Daily Voice Briefing" to activate Jarvis morning briefing.</span>
              </div>
            )}
          </div>

          {/* Focus Timer Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-slate-300">DEEP FOCUS SPRINT:</span>
              <span className="text-base font-bold font-mono text-white tracking-wider">
                {formatTimer(focusTimeLeft)}
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  setIsTimerRunning(!isTimerRunning);
                  soundEffects.playJarvisPulse();
                }}
                className={`p-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1 cursor-pointer ${
                  isTimerRunning
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start 25m'}</span>
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setFocusTimeLeft(25 * 60);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task List and Inline Creator */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        {/* Quick Add Form */}
        <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a high-leverage mission task for Samir..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />

          <select
            value={newTaskCategory}
            onChange={(e: any) => setNewTaskCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="freelance">Freelance</option>
            <option value="automation">Automation</option>
            <option value="learning">AI / Learning</option>
            <option value="health">Baymax Care</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e: any) => setNewTaskPriority(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="critical">Critical (Eat the Frog)</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
          >
            + Add Task
          </button>
        </form>

        {/* Task Items */}
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                onToggleTask(task.id);
                soundEffects.playSuccessTone();
              }}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                task.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="text-cyan-400 focus:outline-none"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                  )}
                </button>

                <div>
                  <p className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {task.category}
                    </span>
                    {task.timeEstimate && (
                      <span className="text-[10px] font-mono text-slate-400">
                        est: {task.timeEstimate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  task.priority === 'critical'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                    : task.priority === 'high'
                    ? 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
