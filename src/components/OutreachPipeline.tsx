import React, { useState } from 'react';
import { FreelanceLead, OutreachGenerationResult } from '../types/beymax';
import { Sparkles, Plus, Copy, Check, ExternalLink, Mail, MessageSquare, DollarSign, Calendar, ArrowRight, UserPlus, FileText } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

interface OutreachPipelineProps {
  leads: FreelanceLead[];
  onAddLead: (lead: Omit<FreelanceLead, 'id'>) => void;
  onUpdateLeadStatus: (id: string, status: FreelanceLead['status']) => void;
  onDeleteLead: (id: string) => void;
}

export const OutreachPipeline: React.FC<OutreachPipelineProps> = ({
  leads,
  onAddLead,
  onUpdateLeadStatus,
  onDeleteLead,
}) => {
  const [showPitchGenerator, setShowPitchGenerator] = useState(false);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // Pitch generator form state
  const [clientName, setClientName] = useState('Apex Apparel');
  const [niche, setNiche] = useState('D2C Fashion & Fitness');
  const [platform, setPlatform] = useState<'Email' | 'LinkedIn' | 'Twitter/X'>('Email');
  const [serviceOffered, setServiceOffered] = useState('AI Advertising Creatives & Automated Customer Segmentation');
  const [painPoint, setPainPoint] = useState('High ad fatigue and manual customer follow-ups');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<OutreachGenerationResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadNiche, setNewLeadNiche] = useState('D2C / E-commerce');
  const [newLeadPlatform, setNewLeadPlatform] = useState<FreelanceLead['platform']>('LinkedIn');
  const [newLeadValue, setNewLeadValue] = useState('$1,500');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  const handleGeneratePitch = async () => {
    setIsGenerating(true);
    soundEffects.playJarvisPulse();
    try {
      const res = await fetch('/api/beymax/outreach-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          platform,
          niche,
          serviceOffered,
          painPoint,
        }),
      });
      const data = await res.json();
      setGeneratedResult(data);
      soundEffects.playSuccessTone();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany) return;
    onAddLead({
      name: newLeadName,
      company: newLeadCompany,
      niche: newLeadNiche,
      platform: newLeadPlatform,
      status: 'prospect',
      estimatedValue: newLeadValue,
      lastContactDate: new Date().toISOString().split('T')[0],
      notes: newLeadNotes,
    });
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadNotes('');
    setShowNewLeadModal(false);
    soundEffects.playSuccessTone();
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const stages: { label: string; status: FreelanceLead['status']; color: string; badgeBg: string }[] = [
    { label: 'Prospects', status: 'prospect', color: 'border-slate-700', badgeBg: 'bg-slate-800 text-slate-300' },
    { label: 'Contacted', status: 'contacted', color: 'border-sky-500/50', badgeBg: 'bg-sky-950 text-sky-400' },
    { label: 'Negotiation', status: 'negotiation', color: 'border-amber-500/50', badgeBg: 'bg-amber-950 text-amber-400' },
    { label: 'Deals Closed', status: 'closed', color: 'border-emerald-500/50', badgeBg: 'bg-emerald-950 text-emerald-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Income Engine Stats */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
              <DollarSign className="w-4 h-4" />
              <span>FREELANCE INCOME ACCELERATOR // SAMIR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Client Outreach & Revenue Pipeline
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Direct high-ticket outreach powered by Beymax AI. Turn conversations into recurring income.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setShowPitchGenerator(true);
                soundEffects.playJarvisPulse();
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Pitch Generator</span>
            </button>

            <button
              onClick={() => {
                setShowNewLeadModal(true);
                soundEffects.playJarvisPulse();
              }}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Pipeline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total Pipeline Leads</span>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{leads.length}</p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Active Conversations</span>
            <p className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
              {leads.filter((l) => l.status === 'contacted' || l.status === 'negotiation').length}
            </p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Closed Deals</span>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              {leads.filter((l) => l.status === 'closed').length}
            </p>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly Income Target</span>
            <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">$5,000 / mo</p>
          </div>
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.status);
          return (
            <div key={stage.status} className="glass-panel-subtle rounded-2xl p-3.5 border border-slate-800/80 flex flex-col min-h-[360px]">
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${stage.status === 'closed' ? 'bg-emerald-400' : stage.status === 'negotiation' ? 'bg-amber-400' : stage.status === 'contacted' ? 'bg-sky-400' : 'bg-slate-400'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-200">
                    {stage.label}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${stage.badgeBg}`}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards list */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 font-mono">
                    No leads in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-md group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {lead.company}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{lead.name}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {lead.estimatedValue}
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {lead.platform}
                        </span>
                        <span className="text-slate-400 truncate max-w-[120px]">{lead.niche}</span>
                      </div>

                      {lead.notes && (
                        <p className="mt-2 text-xs text-slate-400 line-clamp-2 italic bg-slate-950/40 p-1.5 rounded border border-slate-800/60">
                          "{lead.notes}"
                        </p>
                      )}

                      {/* Card Actions & Stage Mover */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          {stage.status !== 'prospect' && (
                            <button
                              onClick={() => {
                                const prev = stage.status === 'closed' ? 'negotiation' : stage.status === 'negotiation' ? 'contacted' : 'prospect';
                                onUpdateLeadStatus(lead.id, prev);
                              }}
                              className="text-[10px] font-mono text-slate-400 hover:text-slate-200 px-1 py-0.5"
                              title="Move back"
                            >
                              ← Back
                            </button>
                          )}
                        </div>

                        {stage.status !== 'closed' ? (
                          <button
                            onClick={() => {
                              const next = stage.status === 'prospect' ? 'contacted' : stage.status === 'contacted' ? 'negotiation' : 'closed';
                              onUpdateLeadStatus(lead.id, next);
                              soundEffects.playJarvisPulse();
                            }}
                            className="flex items-center space-x-1 text-[11px] font-mono font-medium text-cyan-400 hover:text-cyan-300"
                          >
                            <span>Move Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            ✓ WON
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: AI Pitch Generator */}
      {showPitchGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-5 sm:p-6 border border-cyan-500/40 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-white">
                  Beymax Outreach Engine // Tactical Pitch Generator
                </h3>
              </div>
              <button
                onClick={() => setShowPitchGenerator(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Generator Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-sans">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Target Client / Brand</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. Apex Athletics"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Niche / Industry</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. D2C Activewear / SaaS"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e: any) => setPlatform(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Email">Cold Email</option>
                  <option value="LinkedIn">LinkedIn InMail / DM</option>
                  <option value="Twitter/X">Twitter / X DM</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Client Pain Point to Solve</label>
                <input
                  type="text"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. Low conversion on current creative ads"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-mono mb-1">Service Samir is Offering</label>
                <input
                  type="text"
                  value={serviceOffered}
                  onChange={(e) => setServiceOffered(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. AI-powered ad variations & automated lead follow-up"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGeneratePitch}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing Pitch...' : 'Generate 3 Variations'}</span>
              </button>
            </div>

            {/* Generated Results Display */}
            {generatedResult && (
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-4 max-h-[380px] overflow-y-auto">
                {/* Subject Lines */}
                {generatedResult.subjectLines && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block mb-1">
                      High Open-Rate Subject Lines:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-200">
                      {generatedResult.subjectLines.map((subj, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <span>• {subj}</span>
                          <button
                            onClick={() => copyToClipboard(subj, 100 + idx)}
                            className="text-[10px] text-cyan-400 hover:underline cursor-pointer ml-2"
                          >
                            {copiedIndex === 100 + idx ? 'Copied' : 'Copy'}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pitch Variants */}
                {generatedResult.variants?.map((v, i) => (
                  <div key={i} className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {v.type}
                      </span>
                      <button
                        onClick={() => copyToClipboard(`${v.hook}\n\n${v.body}\n\n${v.cta}`, i)}
                        className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:text-cyan-300 cursor-pointer"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Pitch</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-slate-200 mb-2">{v.hook}</p>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-2">{v.body}</p>
                    <p className="text-xs font-medium text-cyan-400">{v.cta}</p>
                  </div>
                ))}

                {/* Jarvis Tip */}
                {generatedResult.jarvisTip && (
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold font-mono">Jarvis Strategic Angle: </span>
                      <span>{generatedResult.jarvisTip}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Add New Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-5 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-bold text-base text-white">Add New Client Prospect</h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Contact / Founder Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. David King"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Company / Brand Name</label>
                <input
                  type="text"
                  required
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  placeholder="e.g. Lumina Labs"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">Niche</label>
                  <input
                    type="text"
                    value={newLeadNiche}
                    onChange={(e) => setNewLeadNiche(e.target.value)}
                    placeholder="e.g. D2C, B2B SaaS"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">Est. Deal Value</label>
                  <input
                    type="text"
                    value={newLeadValue}
                    onChange={(e) => setNewLeadValue(e.target.value)}
                    placeholder="e.g. $2,000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Platform</label>
                <select
                  value={newLeadPlatform}
                  onChange={(e: any) => setNewLeadPlatform(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Email">Email</option>
                  <option value="Twitter/X">Twitter / X</option>
                  <option value="Upwork">Upwork</option>
                  <option value="Direct">Direct Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Notes / Pain Point</label>
                <textarea
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Why they need Samir's creative automation..."
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
