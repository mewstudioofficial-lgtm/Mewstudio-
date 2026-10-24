import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ArrowUpRight, Check, Image as ImageIcon, Video, Sparkles } from 'lucide-react';

interface ServicesProps {
  onRequestSample: () => void;
  onDiscussProject: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onRequestSample, onDiscussProject }) => {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#FAF7F2] border-t border-[#190B28]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold tracking-widest text-[#69218F] uppercase mb-2">
            Studio Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#190B28] tracking-tight mb-6 [text-wrap:balance]">
            Crafted for Consumer Brands That Want to Win the Feed.
          </h2>
          <p className="text-base sm:text-lg text-[#190B28]/75 leading-relaxed font-normal">
            We blend visual advertising strategy with high-end digital studio production to give modern D2C packaging the editorial treatment it deserves.
          </p>
        </div>

        {/* 3 Premium Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent =
              index === 0 ? ImageIcon : index === 1 ? Video : Sparkles;
            const accentColor =
              index === 0 ? 'text-[#06D6A0]' : index === 1 ? 'text-[#EF476F]' : 'text-[#E5A800]';
            const iconBg =
              index === 0 ? 'bg-[#E0F5F1]' : index === 1 ? 'bg-[#FFE4E6]' : 'bg-[#FFF3CD]';
            const btnColor =
              index === 0 ? 'bg-[#06D6A0] hover:bg-[#05B588] text-[#122620]' : index === 1 ? 'bg-[#EF476F] hover:bg-[#D63E63] text-white' : 'bg-[#E76F51] hover:bg-[#D65F41] text-white';

            return (
              <div
                key={service.number}
                className="relative flex flex-col justify-between bg-white rounded-3xl p-8 border border-[#190B28]/10 hover:border-[#E76F51]/30 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Card Header with Editorial Number & Icon */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#190B28]/10">
                    <span className={`text-2xl font-black font-display ${accentColor}`}>
                      {service.number}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl ${iconBg} ${accentColor} flex items-center justify-center shadow-sm`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-extrabold text-[#190B28] mb-3 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#190B28]/80 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#190B28]/60 mb-3">
                      What's Included
                    </div>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#190B28]/85 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#06D6A0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Best For Callout & Action */}
                <div>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl mb-6 text-[11px] text-[#190B28]/70 border border-[#190B28]/5">
                    <span className="font-semibold text-[#190B28]">Best for:</span> {service.bestFor}
                  </div>

                  <button
                    onClick={onRequestSample}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${btnColor}`}
                  >
                    <span>Request Sample For Service {service.number}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom Banner for Service Discussions */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#19323C] via-[#1F404D] to-[#122620] text-[#FAF7F2] rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2">
              Need a full multi-channel creative campaign?
            </h4>
            <p className="text-sm text-[#FAF7F2]/80 max-w-xl">
              We collaborate with brand founders, marketing directors, and agency leads on product drops, seasonal rebrands, and continuous creative testing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onDiscussProject}
              className="py-3 px-6 text-sm font-bold text-[#190B28] bg-white hover:bg-[#FAF7F2] rounded-xl transition-all cursor-pointer shadow-md"
            >
              Discuss a Project
            </button>
            <button
              onClick={onRequestSample}
              className="py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] rounded-xl transition-all cursor-pointer shadow-md"
            >
              Get Free Sample
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
