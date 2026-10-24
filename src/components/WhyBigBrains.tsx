import React from 'react';
import { Target, Compass, Eye, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyBigBrains: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Product-Focused Creative Direction',
      description:
        'Every composition is anchored around your physical product. We ensure your bottle, pouch, or can is the undisputed hero of the frame, bathed in flattering lighting that commands attention in fast-scrolling feeds.',
    },
    {
      icon: Compass,
      title: 'Brand-Aware Visual Concepts',
      description:
        'We do not paste products into arbitrary generic backdrops. We study your brand typography, core color palettes, customer personas, and retail positioning before rendering a single visual pixel.',
    },
    {
      icon: Eye,
      title: 'Carefully Designed Compositions',
      description:
        'Our art directors apply foundational principles of visual hierarchy, negative space, color temperature, and textural contrast so every image carries high editorial weight.',
    },
    {
      icon: Sparkles,
      title: 'Attention to Packaging & Product Details',
      description:
        'From micro-beads of condensation on cold beverages to label readability, metallic foil textures, and embossing clarity, we treat your packaging with surgical fidelity.',
    },
    {
      icon: ShieldCheck,
      title: 'Meticulous Creative Direction & Review',
      description:
        'Every visual is led by experienced creative directors. Each asset is rigorously inspected, retouched, and quality-controlled before final delivery to ensure impeccable commercial standards.',
    },
  ];

  return (
    <section id="why-mew" className="py-20 md:py-32 bg-[#122620] text-[#FAF7F2] border-t border-[#1C3A32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Philosophical Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="text-xs font-bold tracking-widest text-[#06D6A0] uppercase mb-3">
              The Studio Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight [text-wrap:balance]">
              More Than Just an Image.
            </h2>
            <p className="text-base sm:text-lg text-[#FAF7F2]/80 leading-relaxed mb-8 font-normal">
              Anyone can produce generic packshots. Mew Studio creates deliberate, product-centric advertising narratives that respect brand identity, packaging reality, and consumer psychology.
            </p>

            <div className="p-6 rounded-2xl bg-[#0D1C17] border border-[#1E3B33] space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#FFD166]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#06D6A0]" />
                <span>Honest Craft, Zero Empty Promises</span>
              </div>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                We focus on creative excellence, packaging fidelity, and rapid iteration. We leave out marketing hype, fake client numbers, and unscientific conversion guarantees.
              </p>
            </div>
          </div>

          {/* Right Column: 5 Approach Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#1A332C] border border-[#274D42] hover:border-[#06D6A0]/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F211B] border border-[#274D42] flex items-center justify-center text-[#FFD166] shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#06D6A0]">0{idx + 1}</span>
                        <h3 className="text-xl font-bold text-[#FAF7F2]">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
