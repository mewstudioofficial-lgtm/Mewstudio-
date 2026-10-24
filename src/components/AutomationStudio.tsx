import React, { useState } from 'react';
import { AutomationWorkflow } from '../types/beymax';
import { Zap, Clock, Code, CheckCircle, ArrowRight, Sparkles, Terminal, Copy, Check, Play, ShieldAlert } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

interface AutomationStudioProps {
  automations: AutomationWorkflow[];
  onAddAutomation: (auto: AutomationWorkflow) => void;
}

export const AutomationStudio: React.FC<AutomationStudioProps> = ({
  automations,
  onAddAutomation,
}) => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [manualTask, setManualTask] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [toolsPreference, setToolsPreference] = useState('n8n / Python / Gemini API');
  const [isBuilding, setIsBuilding] = useState(false);
  const [builtResult, setBuiltResult] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(automations[0]?.id || '');

  const totalHoursSaved = automations.reduce((acc, curr) => acc + curr.estimatedTimeSavedHoursPerWeek, 0);

  const handleBuildAutomation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTask) return;
    setIsBuilding(true);
    soundEffects.playJarvisPulse();

    try {
      const res = await fetch('/api/beymax/automation-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manualTask,
          desiredOutcome,
          toolsPreference,
        }),
      });
      const data = await res.json();
      setBuiltResult(data);
      soundEffects.playSuccessTone();
    } catch (err) {
      console.error(err);
    } finally {
      setIsBuilding(false);
    }
  };

  const handleSaveToActive = () => {
    if (!builtResult) return;
    const newWorkflow: AutomationWorkflow = {
      id: `auto-${Date.now()}`,
      systemName: builtResult.systemName || 'Autonomous Workflow',
      estimatedTimeSavedHoursPerWeek: builtResult.estimatedTimeSavedHoursPerWeek || 4,
      isDeployed: true,
      architectureSteps: builtResult.architectureSteps || [],
      promptOrScriptTemplate: builtResult.promptOrScriptTemplate || '',
      implementationChecklist: builtResult.implementationChecklist || [],
      longTermScaleStrategy: builtResult.longTermScaleStrategy || '',
    };
    onAddAutomation(newWorkflow);
    setSelectedWorkflowId(newWorkflow.id);
    setShowBuilder(false);
    setBuiltResult(null);
    setManualTask('');
    setDesiredOutcome('');
    soundEffects.playSuccessTone();
  };

  const selectedWorkflow = automations.find((a) => a.id === selectedWorkflowId) || automations[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Philosophy */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
              <Zap className="w-4 h-4" />
              <span>SYSTEMS ARCHITECT // PHILOSOPHY: SYSTEMS &gt; MANUAL WORK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Automation & Systems Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              "Build systems once; let code, APIs, and AI run the repetitive tasks forever."
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-amber-500/30 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Weekly Time Saved</span>
                <span className="text-lg font-bold font-mono text-amber-300">~{totalHoursSaved} hrs/week</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowBuilder(true);
                soundEffects.playJarvisPulse();
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Architect New System</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Workflows List & Selected System Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Workflows List */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block px-1">
            Active Automated Systems ({automations.length})
          </span>

          <div className="space-y-2.5">
            {automations.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => {
                  setSelectedWorkflowId(workflow.id);
                  soundEffects.playJarvisPulse();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedWorkflow?.id === workflow.id
                    ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-semibold text-white line-clamp-1">
                    {workflow.systemName}
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 flex items-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1.5"></span>
                    ACTIVE
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{workflow.architectureSteps.length} Pipeline Nodes</span>
                  <span className="text-amber-400">+{workflow.estimatedTimeSavedHoursPerWeek}h / wk saved</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setShowBuilder(true);
              soundEffects.playJarvisPulse();
            }}
            className="w-full py-3 rounded-xl border border-dashed border-slate-700 hover:border-amber-400 text-slate-400 hover:text-amber-300 text-xs font-mono transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Architect System from Repetitive Chore</span>
          </button>
        </div>

        {/* Right: Selected System Inspector */}
        {selectedWorkflow && (
          <div className="lg:col-span-2 glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  SYSTEM BLUEPRINT // INSPECTION
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-0.5">
                  {selectedWorkflow.systemName}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 w-fit">
                Saves ~{selectedWorkflow.estimatedTimeSavedHoursPerWeek} hrs/week
              </span>
            </div>

            {/* Architecture Steps Flow */}
            <div>
              <h5 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
                Pipeline Architecture:
              </h5>
              <div className="space-y-3">
                {selectedWorkflow.architectureSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.step || idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-100">{step.name}</span>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                          {step.tool}
                        </span>
                      </div>
                      <p className="text-xs text-amber-300/90 font-mono mt-0.5">{step.triggerOrAction}</p>
                      <p className="text-xs text-slate-300 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Script / Prompt Template */}
            {selectedWorkflow.promptOrScriptTemplate && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                    Automation Script / Prompt Template:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedWorkflow.promptOrScriptTemplate || '');
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                  {selectedWorkflow.promptOrScriptTemplate}
                </pre>
              </div>
            )}

            {/* Monetization / Scale Strategy */}
            {selectedWorkflow.longTermScaleStrategy && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30 text-xs">
                <span className="font-mono font-bold text-amber-400 uppercase block mb-1">
                  💡 Long-Term Monetization / Offer Potential for Samir:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedWorkflow.longTermScaleStrategy}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: Architect New Automation */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-5 sm:p-6 border border-amber-500/50 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400">
                <Zap className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-white">
                  Beymax Autonomous Systems Architect
                </h3>
              </div>
              <button
                onClick={() => setShowBuilder(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleBuildAutomation} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  What repetitive manual chore do you want to eliminate, Samir?
                </label>
                <textarea
                  required
                  rows={2}
                  value={manualTask}
                  onChange={(e) => setManualTask(e.target.value)}
                  placeholder="e.g. Every time I get a new client lead, I have to research their website, write a custom loom outline, and format a follow-up email..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Desired End State / Output</label>
                <input
                  type="text"
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  placeholder="e.g. 100% automated draft generated in my Notion queue with an alert on my phone"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Preferred Tool Stack</label>
                <input
                  type="text"
                  value={toolsPreference}
                  onChange={(e) => setToolsPreference(e.target.value)}
                  placeholder="n8n / Python / Make / Gemini 3.8 Flash / Webhooks"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isBuilding}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isBuilding ? 'Designing Architecture...' : 'Design Automation Pipeline'}</span>
                </button>
              </div>
            </form>

            {/* Generated Architecture Preview */}
            {builtResult && (
              <div className="mt-5 pt-4 border-t border-slate-800 space-y-4 max-h-[350px] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-display text-white">
                    {builtResult.systemName}
                  </h4>
                  <span className="text-xs font-mono text-amber-400">
                    Saves ~{builtResult.estimatedTimeSavedHoursPerWeek} hrs/week
                  </span>
                </div>

                <div className="space-y-2">
                  {builtResult.architectureSteps?.map((s: any, idx: number) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-amber-300 font-semibold font-mono">
                        <span>Step {s.step}: {s.name}</span>
                        <span className="text-cyan-400 text-[10px]">{s.tool}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{s.details}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveToActive}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    Save & Deploy to Systems
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
