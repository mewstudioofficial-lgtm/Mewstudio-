import React, { useState, useEffect, useRef } from 'react';
import { HolographicCore } from './components/HolographicCore';
import { ChatCockpit } from './components/ChatCockpit';
import { OutreachPipeline } from './components/OutreachPipeline';
import { AutomationStudio } from './components/AutomationStudio';
import { SecondBrainVault } from './components/SecondBrainVault';
import { DailyMissionMatrix } from './components/DailyMissionMatrix';
import { TopStatusBar } from './components/TopStatusBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PhoneSimulatorModal } from './components/PhoneSimulatorModal';
import {
  ChatMessage,
  AssistantMode,
  FreelanceLead,
  AutomationWorkflow,
  SecondBrainIdea,
  DailyTask,
} from './types/beymax';
import {
  INITIAL_LEADS,
  INITIAL_AUTOMATIONS,
  INITIAL_IDEAS,
  INITIAL_TASKS,
} from './data/initialSamirData';
import { soundEffects, speakText, stopSpeaking } from './utils/audioEffects';
import { Smartphone, Sparkles, Terminal, Shield, Zap, Heart, Bot } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'core' | 'outreach' | 'automation' | 'brain' | 'missions'>('core');
  const [mode, setMode] = useState<AssistantMode>('tactical_jarvis');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Core state with LocalStorage fallbacks
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('beymax_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'msg-welcome',
        role: 'model',
        text: `Good day, Samir. Beymax online.\n\nSystems calibrated for high-velocity execution and sustainable focus. Whether you need to draft client outreach pitches, automate a repetitive workflow, or review your unconventional startup ideas, I am at your command.\n\nOn a scale of 1 to 10, how is your energy level today, sir?`,
        timestamp: new Date().toISOString(),
        mode: 'tactical_jarvis',
      },
    ];
  });

  const [leads, setLeads] = useState<FreelanceLead[]>(() => {
    const saved = localStorage.getItem('beymax_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_LEADS;
  });

  const [automations, setAutomations] = useState<AutomationWorkflow[]>(() => {
    const saved = localStorage.getItem('beymax_automations');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_AUTOMATIONS;
  });

  const [ideas, setIdeas] = useState<SecondBrainIdea[]>(() => {
    const saved = localStorage.getItem('beymax_ideas');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_IDEAS;
  });

  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    const saved = localStorage.getItem('beymax_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_TASKS;
  });

  const [energyLevel, setEnergyLevel] = useState<number>(() => {
    const saved = localStorage.getItem('beymax_energy');
    return saved ? Number(saved) : 8;
  });

  // Voice & Interaction states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('beymax_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('beymax_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('beymax_automations', JSON.stringify(automations));
  }, [automations]);

  useEffect(() => {
    localStorage.setItem('beymax_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('beymax_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('beymax_energy', String(energyLevel));
  }, [energyLevel]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleSendMessage(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type directly in the cockpit.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      setIsSpeaking(false);
      try {
        recognitionRef.current.start();
        setIsListening(true);
        soundEffects.playJarvisPulse();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleVocalize = (text: string) => {
    setIsSpeaking(true);
    speakText(text, mode, () => {
      setIsSpeaking(false);
    });
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/beymax/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          mode,
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Beymax online. Directive acknowledged, Samir.';

      const modelMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        text: reply,
        timestamp: new Date().toISOString(),
        mode,
      };

      setMessages((prev) => [...prev, modelMsg]);

      // Vocalize response if speech is enabled
      if (soundEffects.isEnabled()) {
        handleVocalize(reply);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'model',
          text: `Neural link disrupted. I could not connect to Gemini AI core. Please check your network connection, Samir.`,
          timestamp: new Date().toISOString(),
          mode,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Lead handlers
  const handleAddLead = (lead: Omit<FreelanceLead, 'id'>) => {
    const newLead: FreelanceLead = {
      id: `lead-${Date.now()}`,
      ...lead,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: FreelanceLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Automation handlers
  const handleAddAutomation = (auto: AutomationWorkflow) => {
    setAutomations((prev) => [auto, ...prev]);
  };

  // Second brain handlers
  const handleAddIdea = (idea: Omit<SecondBrainIdea, 'id' | 'dateAdded'>) => {
    const newIdea: SecondBrainIdea = {
      id: `idea-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      ...idea,
    };
    setIdeas((prev) => [newIdea, ...prev]);
  };

  const handleUpdateIdea = (id: string, updated: Partial<SecondBrainIdea>) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
    );
  };

  // Task handlers
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (task: Omit<DailyTask, 'id' | 'completed'>) => {
    const newTask: DailyTask = {
      id: `task-${Date.now()}`,
      completed: false,
      ...task,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top HUD Status & Navigation Bar */}
      <TopStatusBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        onOpenPhoneInstallModal={() => setShowInstallModal(true)}
        mode={mode}
      />

      {/* Main Content Area: Phone Mockup Frame or Wide Cockpit */}
      <main className={`flex-1 w-full transition-all duration-300 ${isPhoneFrame ? 'py-4 sm:py-8 flex justify-center items-start bg-slate-950/80' : 'p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto'}`}>
        {isPhoneFrame ? (
          /* Realistic Smartphone Bezel Mockup Container for Desktop */
          <div className="w-full max-w-[420px] rounded-[48px] border-[10px] border-slate-800 bg-[#060913] shadow-[0_0_60px_rgba(14,165,233,0.3)] overflow-hidden flex flex-col min-h-[820px] max-h-[880px] relative">
            {/* Dynamic Island / Notch */}
            <div className="w-full pt-3 pb-2 flex items-center justify-center bg-[#060913] z-30">
              <div className="w-28 h-4 bg-slate-900 rounded-full flex items-center justify-between px-3 border border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
              </div>
            </div>

            {/* Scrollable phone screen contents */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
              {renderActiveTabContent()}
            </div>

            {/* Internal Phone Bottom Bar */}
            <div className="p-2 bg-[#060913]/90 border-t border-slate-800/80">
              <div className="w-32 h-1 bg-slate-700 mx-auto rounded-full" />
            </div>
          </div>
        ) : (
          /* Wide Native Desktop / Mobile Cockpit */
          <div className="w-full pb-20 md:pb-6">
            {renderActiveTabContent()}
          </div>
        )}
      </main>

      {/* Bottom Floating Navigation for Mobile screens */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Phone Installation Modal */}
      <PhoneSimulatorModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        appUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  );

  function renderActiveTabContent() {
    switch (activeTab) {
      case 'core':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Top: Holographic Companion Orb */}
            <div className="lg:col-span-5 space-y-4">
              <HolographicCore
                mode={mode}
                onModeChange={setMode}
                isListening={isListening}
                onToggleListening={toggleListening}
                isProcessing={isProcessing}
                isSpeaking={isSpeaking}
                onStopSpeaking={() => setIsSpeaking(false)}
                energyLevel={energyLevel}
              />

              {/* Quick Assistant Highlights & Creator Bio */}
              <div className="glass-panel-subtle rounded-2xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2.5">
                <div className="flex items-center justify-between text-cyan-400 font-mono font-semibold">
                  <span className="flex items-center">
                    <Shield className="w-3.5 h-3.5 mr-1" /> CREATOR PROTOCOL
                  </span>
                  <span>SAMIR // 100% PERSONALIZED</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  Beymax combines the tactical intelligence of <strong>Jarvis</strong> with the compassionate care of <strong>Baymax</strong>.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase">Goal 1</span>
                    <span className="text-white font-medium">Freelance Outreach</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase">Goal 2</span>
                    <span className="text-white font-medium">Systems &gt; Manual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Neural Directives Chat Cockpit */}
            <div className="lg:col-span-7">
              <ChatCockpit
                messages={messages}
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
                mode={mode}
                onSaveToBrain={(title, text) => {
                  handleAddIdea({
                    title,
                    rawThoughts: text,
                    tags: ['Beymax Note', 'Tactical'],
                    status: 'raw',
                  });
                }}
                isListening={isListening}
                onToggleListening={toggleListening}
                onVocalize={handleVocalize}
              />
            </div>
          </div>
        );

      case 'outreach':
        return (
          <OutreachPipeline
            leads={leads}
            onAddLead={handleAddLead}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onDeleteLead={handleDeleteLead}
          />
        );

      case 'automation':
        return (
          <AutomationStudio
            automations={automations}
            onAddAutomation={handleAddAutomation}
          />
        );

      case 'brain':
        return (
          <SecondBrainVault
            ideas={ideas}
            onAddIdea={handleAddIdea}
            onUpdateIdea={handleUpdateIdea}
          />
        );

      case 'missions':
        return (
          <DailyMissionMatrix
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            energyLevel={energyLevel}
            onEnergyLevelChange={setEnergyLevel}
          />
        );

      default:
        return null;
    }
  }
}
