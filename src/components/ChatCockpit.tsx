import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Copy, Check, Volume2, Sparkles, Terminal, ChevronRight, BookmarkPlus } from 'lucide-react';
import { ChatMessage, AssistantMode } from '../types/beymax';
import { soundEffects, speakText, stopSpeaking } from '../utils/audioEffects';

interface ChatCockpitProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  mode: AssistantMode;
  onSaveToBrain?: (title: string, content: string) => void;
  onAddTask?: (task: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
  onVocalize: (text: string) => void;
}

const QUICK_PROMPTS = [
  { label: '🌅 Morning Briefing', prompt: 'Good morning Beymax. Give me my tactical briefing for today, focus priorities, and energy alignment.' },
  { label: '🎯 High-Ticket Pitch', prompt: 'Help me draft a punchy, value-first cold email to a D2C brand offering creative automation services.' },
  { label: '⚡ Automate Busywork', prompt: 'I want to eliminate manual work in client prospecting. Design an automated n8n/Python pipeline for me.' },
  { label: '🧠 Stress-Test Idea', prompt: 'I have an unconventional startup idea: an AI voice copilot that prepares freelancers for live sales calls. Evaluate it.' },
  { label: '🩺 Baymax Check-in', prompt: 'Baymax, run a focus & health scan. On a scale of 1 to 10, how should I balance high ambition without burning out?' },
];

export const ChatCockpit: React.FC<ChatCockpitProps> = ({
  messages,
  onSendMessage,
  isProcessing,
  mode,
  onSaveToBrain,
  onAddTask,
  isListening,
  onToggleListening,
  onVocalize,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    const text = inputText;
    setInputText('');
    soundEffects.playJarvisPulse();
    onSendMessage(text);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[600px] rounded-2xl glass-panel border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Cockpit Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            NEURAL DIRECTIVE LINK // SAMIR × BEYMAX
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LATENCY: 180ms</span>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto flex items-center space-x-2 scrollbar-none">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold shrink-0 flex items-center">
          <Sparkles className="w-3 h-3 text-cyan-400 mr-1" /> QUICK:
        </span>
        {QUICK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            onClick={() => {
              soundEffects.playJarvisPulse();
              onSendMessage(qp.prompt);
            }}
            disabled={isProcessing}
            className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/50 transition-all cursor-pointer font-medium"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-1.5 mb-1 px-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  {isUser ? 'SAMIR (CREATOR)' : 'BEYMAX OS'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-tr-none shadow-md'
                    : 'glass-panel-subtle text-slate-200 rounded-tl-none border border-slate-700/60 shadow-lg'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap selection:bg-cyan-500/30 font-sans">
                  {msg.text}
                </div>

                {/* Model response action footer */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center space-x-1 hover:text-cyan-400 transition-colors p-1"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onVocalize(msg.text)}
                        className="flex items-center space-x-1 hover:text-cyan-400 transition-colors p-1"
                        title="Vocalize response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Vocalize</span>
                      </button>

                      {onSaveToBrain && (
                        <button
                          onClick={() => {
                            const firstLine = msg.text.split('\n')[0].replace(/[#*]/g, '').slice(0, 40);
                            onSaveToBrain(firstLine || 'Beymax Tactical Note', msg.text);
                            soundEffects.playSuccessTone();
                          }}
                          className="flex items-center space-x-1 hover:text-cyan-400 transition-colors p-1"
                          title="Save note to Second Brain"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          <span className="text-[11px] hidden sm:inline">Save to Brain</span>
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {mode === 'care_baymax' ? 'Care Protocol' : 'Tactical Jarvis'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold mb-1 px-1">
              BEYMAX SYNTHESIZING...
            </span>
            <div className="glass-panel-subtle rounded-2xl rounded-tl-none p-3.5 border border-cyan-500/30 flex items-center space-x-2 text-cyan-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[11px] text-slate-400 ml-2">Calculating strategic solution for Samir...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box with Voice & Send */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center space-x-2"
      >
        <button
          type="button"
          onClick={onToggleListening}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
              : 'bg-slate-900 text-slate-400 hover:text-cyan-400 border-slate-800 hover:border-cyan-500/50'
          }`}
          title={isListening ? 'Stop voice recognition' : 'Activate microphone for voice prompt'}
        >
          {isListening ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? 'Listening to your voice, Samir...' : 'Direct Beymax: "Draft a client pitch", "Automate my workflow"...'}
          disabled={isProcessing}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-sans"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-cyan-900/40"
          title="Send directive"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
