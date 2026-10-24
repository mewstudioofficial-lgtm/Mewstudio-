import React from 'react';
import { Smartphone, Download, Share2, Check, ExternalLink, QrCode } from 'lucide-react';

interface PhoneSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const PhoneSimulatorModal: React.FC<PhoneSimulatorModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-cyan-500/50 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Smartphone className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg text-white">
              Install Beymax on Your Smartphone
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 text-sm font-mono cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
            <span className="font-bold font-mono text-cyan-300 block mb-1">
              ✓ YES, IT RUNS DIRECTLY ON YOUR PHONE!
            </span>
            <p className="leading-relaxed">
              Beymax is engineered as a responsive Progressive Web App (PWA). You can open this web application on your iPhone or Android browser and install it directly to your home screen with zero app store delays.
            </p>
          </div>

          {/* Step by step for iOS and Android */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="font-mono font-bold text-white uppercase text-[11px] block mb-2 text-sky-400">
                On iPhone (Safari)
              </span>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                <li>Open this URL in Safari</li>
                <li>Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-sky-400" /> Share button</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                <li>Open "Beymax" from your home screen</li>
              </ol>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="font-mono font-bold text-white uppercase text-[11px] block mb-2 text-emerald-400">
                On Android (Chrome)
              </span>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                <li>Open this URL in Chrome</li>
                <li>Tap the <strong>⋮ Menu</strong> (top right)</li>
                <li>Select <strong>"Install App"</strong> or "Add to Home Screen"</li>
                <li>Beymax icon appears in your app drawer!</li>
              </ol>
            </div>
          </div>

          {/* Current App URL display */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono">
            <div className="truncate mr-2">
              <span className="text-[10px] text-slate-400 uppercase block">Share to your phone:</span>
              <span className="text-cyan-400 text-xs truncate select-all">{appUrl || window.location.href}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(appUrl || window.location.href);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 cursor-pointer"
            >
              Copy Link
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            "Once installed on your phone, you get full microphone voice access, responsive touch controls, and continuous background support."
          </p>
        </div>
      </div>
    </div>
  );
};
