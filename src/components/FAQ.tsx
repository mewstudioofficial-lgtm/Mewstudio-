import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['products', 'ai-creative']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#F3ECE2] border-t border-[#190B28]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-widest text-[#69218F] uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#190B28] tracking-tight mb-4 [text-wrap:balance]">
            Everything You Need to Know
          </h2>
          <p className="text-base text-[#190B28]/70 font-normal">
            Direct, transparent answers regarding our creative services, sample requests, and production timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#190B28]/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#240B36]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#190B28] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#240B36] text-white' : 'text-[#190B28]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#190B28]/80 leading-relaxed border-t border-[#190B28]/5 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
