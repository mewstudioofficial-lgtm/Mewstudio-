import React from 'react';
import { ArrowUpRight, Gift, ShieldAlert, Sparkles } from 'lucide-react';

interface FreeSampleBannerProps {
  onRequestSample: () => void;
}

export const FreeSampleBanner: React.FC<FreeSampleBannerProps> = ({ onRequestSample }) => {
  return (
    <section id="free-sample" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#190B28]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E76F51] via-[#EF476F] to-[#FF8C66] text-white p-8 sm:p-12 md:p-16 border border-white/20 shadow-2xl">
          {/* Subtle Ambient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30 mb-6 shadow-sm">
              <Gift className="w-3.5 h-3.5 text-[#FFD166]" />
              <span>Complimentary Studio Exploration</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight [text-wrap:balance]">
              Let's Create Something for Your Brand.
            </h2>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 font-normal [text-wrap:balance]">
              Want to see how your product could look in a fresh advertising direction? Tell us about your brand and request a sample creative.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <button
                onClick={onRequestSample}
                className="py-4 px-8 text-base font-extrabold text-[#190B28] bg-white hover:bg-[#FFF9F2] active:scale-[0.98] rounded-2xl transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Request Your Free Sample</span>
                <ArrowUpRight className="w-5 h-5 text-[#EF476F]" />
              </button>
            </div>

            {/* Honest Scoping Policy (No unlimited work promised) */}
            <div className="flex items-start gap-2.5 pt-6 border-t border-white/15 text-xs text-[#FAF7F2]/70 max-w-xl">
              <ShieldAlert className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
              <p>
                <strong>Studio Policy:</strong> To maintain boutique craft standards, we offer one custom advertising concept per qualified consumer brand or registered business entity. No automated mass requests or unlimited revisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
