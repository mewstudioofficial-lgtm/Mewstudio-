import React, { useState } from 'react';
import { SecondBrainIdea } from '../types/beymax';
import { Lightbulb, Sparkles, Tag, Plus, CheckCircle2, AlertTriangle, ArrowUpRight, Search, Compass, Rocket } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

interface SecondBrainVaultProps {
  ideas: SecondBrainIdea[];
  onAddIdea: (idea: Omit<SecondBrainIdea, 'id' | 'dateAdded'>) => void;
  onUpdateIdea: (id: string, updated: Partial<SecondBrainIdea>) => void;
}

export const SecondBrainVault: React.FC<SecondBrainVaultProps> = ({
  ideas,
  onAddIdea,
  onUpdateIdea,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  // New idea form
  const [newTitle, setNewTitle] = useState('');
  const [newRawThoughts, setNewRawThoughts] = useState('');
  const [newTags, setNewTags] = useState('AI Product, Startup, Automation');

  const allTags = Array.from(new Set(ideas.flatMap((i) => i.tags)));

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.rawThoughts.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? idea.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const tagList = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddIdea({
      title: newTitle,
      rawThoughts: newRawThoughts,
      tags: tagList.length > 0 ? tagList : ['General'],
      status: 'raw',
    });

    setNewTitle('');
    setNewRawThoughts('');
    setShowAddModal(false);
    soundEffects.playSuccessTone();
  };

  const handleAnalyzeWithBeymax = async (idea: SecondBrainIdea) => {
    setAnalyzingId(idea.id);
    soundEffects.playJarvisPulse();

    try {
      const res = await fetch('/api/beymax/idea-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaTitle: idea.title,
          rawThoughts: idea.rawThoughts,
          tags: idea.tags.join(', '),
        }),
      });

      const data = await res.json();
      onUpdateIdea(idea.id, {
        status: 'analyzed',
        analysis: data,
      });
      soundEffects.playSuccessTone();
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
              <Compass className="w-4 h-4" />
              <span>LONG-TERM VISION VAULT // UNCONVENTIONAL THINKING</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Samir's Second Brain & Ideas Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Store breakthrough startup concepts, unconventional experiments, and AI tools. Stress-tested by Beymax.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAddModal(true);
              soundEffects.playJarvisPulse();
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/40 cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Capture New Idea</span>
          </button>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts or tags..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors ${
                selectedTag === null
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIdeas.length === 0 ? (
          <div className="col-span-2 text-center py-12 glass-panel-subtle rounded-2xl border border-slate-800 font-mono text-xs text-slate-400">
            No ideas found matching query. Tap "Capture New Idea" to log your thoughts.
          </div>
        ) : (
          filteredIdeas.map((idea) => {
            const isAnalyzing = analyzingId === idea.id;
            const hasAnalysis = idea.status === 'analyzed' && idea.analysis;

            return (
              <div
                key={idea.id}
                className="glass-panel-subtle rounded-2xl p-4 sm:p-5 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-white">
                      {idea.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {idea.dateAdded}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {idea.rawThoughts}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {idea.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Beymax Analysis Box if generated */}
                  {hasAnalysis && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-300 flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1" />
                          Beymax Evaluation
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                          Feasibility: {idea.analysis?.feasibilityScore}/10
                        </span>
                      </div>

                      <p className="text-xs text-slate-200 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                        "{idea.analysis?.elevatorPitch}"
                      </p>

                      <div className="text-xs space-y-1.5">
                        <div className="text-slate-300">
                          <span className="font-mono text-cyan-400 font-semibold">Unconventional Edge: </span>
                          <span>{idea.analysis?.unconventionalAngle}</span>
                        </div>
                        <div className="text-slate-300">
                          <span className="font-mono text-amber-400 font-semibold">Monetization: </span>
                          <span>{idea.analysis?.monetizationPotential}</span>
                        </div>
                        {idea.analysis?.firstActionableStep && (
                          <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
                            <span className="font-mono font-bold">Immediate Next Move: </span>
                            <span>{idea.analysis?.firstActionableStep}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    Status: {idea.status === 'analyzed' ? 'Validated by Beymax' : 'Raw Capture'}
                  </span>

                  {!hasAnalysis ? (
                    <button
                      onClick={() => handleAnalyzeWithBeymax(idea)}
                      disabled={isAnalyzing}
                      className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-950/60 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAnalyzing ? 'Evaluating...' : 'Stress-Test with Beymax'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAnalyzeWithBeymax(idea)}
                      className="text-[10px] font-mono text-slate-400 hover:text-slate-300 cursor-pointer"
                    >
                      Re-Evaluate
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: Capture Idea */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-6 border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-bold text-base text-white">
                Log Unconventional Thought / Product Idea
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIdea} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Concept / Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Autonomous AI Outbound Caller for Local Stores"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Raw Thoughts & Vision</label>
                <textarea
                  required
                  rows={4}
                  value={newRawThoughts}
                  onChange={(e) => setNewRawThoughts(e.target.value)}
                  placeholder="Explain why this exists, why current solutions fail, and what the unconventional angle is..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="AI Product, Micro-SaaS, Automation, Freelance"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
