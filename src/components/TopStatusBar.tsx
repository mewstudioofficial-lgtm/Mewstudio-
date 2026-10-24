import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Shield, Sparkles, Terminal, Volume2, VolumeX, Flame } from 'lucide-react';
import { AssistantMode } from '../types/beymax';

interface TopStatusBarProps {
  activeTab: 'core' | 'outreach' | 'automation' | 'brain' | 'missions';
  onTabChange: (tab: 'core' | 'outreach' | 'automation' | 'brain' | 'missions') => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenPhoneInstallModal: () => void;
  mode: AssistantMode;
  unreadCount?: number;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  activeTab,
  onTabChange,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenPhoneInstallModal,
  mode,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'core', label: 'Beymax Core', icon: '🤖' },
    { id: 'outreach', label: 'Outreach Pipeline', icon: '🎯' },
    { id: 'automation', label: 'Automation Studio', icon: '⚡' },
    { id: 'brain', label: 'Second Brain', icon: '🧠' },
    { id: 'missions', label: 'Daily Agenda', icon: '📋' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060913]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand & Creator Tag */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-700 shadow-md shadow-cyan-950">
            {/* Baymax 2 dots + bar minimalist logo */}
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              <div className="w-2.5 h-0.5 bg-slate-950 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wider">
                BEYMAX
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                OS v2.4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              PERSONAL AI COMPANION // FOR SAMIR
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: Telemetry, Phone Simulator Toggle & Install Action */}
        <div className="flex items-center space-x-2">
          {/* Clock */}
          <div className="hidden lg:flex items-center space-x-1.5 font-mono text-xs text-slate-400 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{timeStr || '12:00:00'}</span>
          </div>

          {/* Phone Frame Toggle (Desktop preview) */}
          <button
            onClick={onTogglePhoneFrame}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
              isPhoneFrame
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
            title="Toggle Smartphone Frame View"
          >
            {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isPhoneFrame ? 'Desktop Cockpit' : 'Phone View'}</span>
          </button>

          {/* Install on Smartphone Button */}
          <button
            onClick={onOpenPhoneInstallModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
            title="How to install on your phone"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Use On Phone</span>
          </button>
        </div>
      </div>
    </header>
  );
};
