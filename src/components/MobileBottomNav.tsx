import React from 'react';
import { Bot, DollarSign, Zap, Lightbulb, CheckSquare } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

interface MobileBottomNavProps {
  activeTab: 'core' | 'outreach' | 'automation' | 'brain' | 'missions';
  onTabChange: (tab: 'core' | 'outreach' | 'automation' | 'brain' | 'missions') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'core', label: 'Beymax', icon: Bot },
    { id: 'outreach', label: 'Outreach', icon: DollarSign },
    { id: 'automation', label: 'Automate', icon: Zap },
    { id: 'brain', label: 'Brain', icon: Lightbulb },
    { id: 'missions', label: 'Tasks', icon: CheckSquare },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060913]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                soundEffects.playJarvisPulse();
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-cyan-400 bg-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className={`text-[10px] font-mono mt-0.5 ${isActive ? 'font-bold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
