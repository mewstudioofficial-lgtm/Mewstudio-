import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Shield, Heart, Zap, Sparkles } from 'lucide-react';
import { soundEffects, speakText, stopSpeaking } from '../utils/audioEffects';
import { AssistantMode } from '../types/beymax';

interface HolographicCoreProps {
  mode: AssistantMode;
  onModeChange: (mode: AssistantMode) => void;
  isListening: boolean;
  onToggleListening: () => void;
  isProcessing: boolean;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  energyLevel: number;
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({
  mode,
  onModeChange,
  isListening,
  onToggleListening,
  isProcessing,
  isSpeaking,
  onStopSpeaking,
  energyLevel,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.setSoundEnabled(next);
    if (!next) {
      stopSpeaking();
      onStopSpeaking();
    } else {
      soundEffects.playJarvisPulse();
    }
  };

  const getStatusText = () => {
    if (isListening) return 'LISTENING TO SAMIR...';
    if (isProcessing) return 'BEYMAX PROCESSING NEURAL DIRECTIVE...';
    if (isSpeaking) return 'BEYMAX VOCALIZING RESPONSE...';
    if (mode === 'care_baymax') return 'BAYMAX CARE PROTOCOL ACTIVE // VITALS MONITORED';
    if (mode === 'automation_architect') return 'SYSTEMS ARCHITECT READY // ZERO MANUAL WORK';
    return 'JARVIS TACTICAL OS ONLINE // STANDING BY';
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl glass-panel glass-glow-cyan overflow-hidden transition-all duration-500">
      {/* Background ambient HUD grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Top micro status bar */}
      <div className="w-full flex items-center justify-between mb-4 z-10 text-xs font-mono">
        <div className="flex items-center space-x-2 text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-wider uppercase font-semibold">
            {mode === 'care_baymax' ? 'Baymax Health' : mode === 'automation_architect' ? 'Auto-Sys' : 'Jarvis-Core'}
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-700/60">
          <button
            onClick={() => {
              onModeChange('tactical_jarvis');
              soundEffects.playJarvisPulse();
            }}
            title="Tactical Jarvis Mode (High-velocity execution)"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all text-xs font-medium ${
              mode === 'tactical_jarvis'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tactical</span>
          </button>
          
          <button
            onClick={() => {
              onModeChange('care_baymax');
              soundEffects.playBaymaxChime();
            }}
            title="Baymax Care Mode (Health & burnout prevention)"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all text-xs font-medium ${
              mode === 'care_baymax'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Care</span>
          </button>

          <button
            onClick={() => {
              onModeChange('automation_architect');
              soundEffects.playJarvisPulse();
            }}
            title="Automation Architect Mode (Eliminate repetitive work)"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all text-xs font-medium ${
              mode === 'automation_architect'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Automate</span>
          </button>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 transition-colors"
          title={soundEnabled ? 'Mute Speech & Audio' : 'Enable Audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      {/* Holographic Arc / Baymax Orb Centerpiece */}
      <div className="relative my-3 flex items-center justify-center">
        {/* Outer Tech Ring 1 (Rotating Clockwise) */}
        <div
          className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dashed transition-all duration-700 ${
            mode === 'care_baymax'
              ? 'border-rose-400/40 animate-spin-slow'
              : mode === 'automation_architect'
              ? 'border-amber-400/40 animate-spin-slow'
              : 'border-cyan-400/40 animate-spin-slow'
          } ${isSpeaking || isListening ? 'scale-110 opacity-100' : 'opacity-60'}`}
        />

        {/* Outer Tech Ring 2 (Rotating Counter-Clockwise) */}
        <div
          className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dotted transition-all duration-700 ${
            mode === 'care_baymax'
              ? 'border-rose-300/30 animate-spin-reverse-slow'
              : 'border-cyan-300/30 animate-spin-reverse-slow'
          }`}
        />

        {/* Pulse Aura */}
        <div
          className={`absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-xl transition-all duration-500 ${
            isSpeaking || isListening
              ? mode === 'care_baymax'
                ? 'bg-rose-500/40 scale-125'
                : 'bg-cyan-400/50 scale-125'
              : mode === 'care_baymax'
              ? 'bg-rose-500/20'
              : mode === 'automation_architect'
              ? 'bg-amber-500/20'
              : 'bg-cyan-500/20'
          }`}
        />

        {/* Interactive Center Orb */}
        <button
          onClick={onToggleListening}
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${
            mode === 'care_baymax'
              ? 'bg-gradient-to-br from-slate-900 via-rose-950/60 to-slate-900 border-2 border-rose-400/70 shadow-[0_0_25px_rgba(244,63,94,0.4)]'
              : mode === 'automation_architect'
              ? 'bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-900 border-2 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
              : 'bg-gradient-to-br from-slate-900 via-cyan-950/60 to-slate-900 border-2 border-cyan-400/70 shadow-[0_0_30px_rgba(14,165,233,0.5)]'
          } ${isListening ? 'ring-4 ring-cyan-400 animate-pulse' : 'hover:scale-105'}`}
          title={isListening ? 'Tap to stop listening' : 'Tap to speak to Beymax'}
        >
          {/* Baymax Iconic Minimalist Face inside Arc Reactor */}
          <div className="flex flex-col items-center justify-center pointer-events-none">
            {mode === 'care_baymax' ? (
              // Baymax Eyes with soft connecting line
              <div className="flex items-center space-x-4 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-200 shadow-[0_0_8px_rgba(254,205,211,0.8)]" />
                <div className="w-6 h-0.5 bg-rose-200/80 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-rose-200 shadow-[0_0_8px_rgba(254,205,211,0.8)]" />
              </div>
            ) : (
              // Jarvis Arc Reactor Core Triangle & Center Pulse
              <div className="flex items-center justify-center mb-1">
                <div className="relative flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border border-cyan-300 flex items-center justify-center ${isSpeaking ? 'animate-ping' : ''}`}>
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)]" />
                  </div>
                </div>
              </div>
            )}

            <div className="text-[10px] font-mono tracking-widest uppercase text-slate-300 font-bold mt-1">
              {isListening ? (
                <span className="text-cyan-400 flex items-center space-x-1">
                  <Mic className="w-3 h-3 animate-bounce" />
                  <span>MIC ON</span>
                </span>
              ) : isSpeaking ? (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>VOICE</span>
                </span>
              ) : (
                <span>BEYMAX</span>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Dynamic Status Readout & Voice Controls */}
      <div className="mt-2 text-center z-10">
        <p className="text-xs font-mono font-medium tracking-wider text-slate-300">
          {getStatusText()}
        </p>

        {/* Stop Voice button if speaking */}
        {isSpeaking && (
          <button
            onClick={() => {
              stopSpeaking();
              onStopSpeaking();
            }}
            className="mt-2 inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors"
          >
            <MicOff className="w-3 h-3" />
            <span>Interrupt Voice</span>
          </button>
        )}
      </div>

      {/* Bottom telemetry indicators */}
      <div className="w-full mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500">USER:</span>
          <span className="text-cyan-400 font-semibold">SAMIR (CREATOR)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-500">ENERGY:</span>
          <span className={`font-semibold ${energyLevel >= 7 ? 'text-emerald-400' : energyLevel >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
            {energyLevel}/10
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5">
          <span className="text-slate-500">AI MODEL:</span>
          <span className="text-cyan-400">GEMINI 3.8 FLASH</span>
        </div>
      </div>
    </div>
  );
};
