import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2, Droplets, Eye, Award } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';

interface HeroProps {
  onRequestSample: () => void;
  onExploreWork: () => void;
  onSelectPortfolioItem?: (itemId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestSample, onExploreWork, onSelectPortfolioItem }) => {
  // Real creative showcase items for Hero
  const heroShowcaseItems = [
    {
      id: 'oom-nootropics',
      label: 'OOM Nootropics',
      tag: 'Sparkling Cans Trio',
      badgeColor: 'bg-[#E76F51]',
      btnActive: 'bg-[#E76F51] text-white',
      item: PORTFOLIO_ITEMS.find((p) => p.id === 'oom-nootropics')!,
    },
    {
      id: 'dose-wellness-shot',
      label: 'DÖSE Wellness Shot',
      tag: 'Organic Ginger & Turmeric',
      badgeColor: 'bg-[#B45309]',
      btnActive: 'bg-[#F59E0B] text-white',
      item: PORTFOLIO_ITEMS.find((p) => p.id === 'dose-wellness-shot')!,
    },
    {
      id: 'snackish-potato-crisps',
      label: 'Snackish Crisps',
      tag: 'Avocado Oil Dual-Pack',
      badgeColor: 'bg-[#0284C7]',
      btnActive: 'bg-[#0284C7] text-white',
      item: PORTFOLIO_ITEMS.find((p) => p.id === 'snackish-potato-crisps')!,
    },
    {
      id: 'poptastic-kettle-popcorn',
      label: 'Poptastic Popcorn',
      tag: 'Full Spectrum Multi-Pack',
      badgeColor: 'bg-[#0D9488]',
      btnActive: 'bg-[#0D9488] text-white',
      item: PORTFOLIO_ITEMS.find((p) => p.id === 'poptastic-kettle-popcorn')!,
    },
  ];

  const [activeId, setActiveId] = useState(heroShowcaseItems[0].id);
  const currentShowcase = heroShowcaseItems.find((s) => s.id === activeId) || heroShowcaseItems[0];
  const currentItem = currentShowcase.item;

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF9E6] via-[#FFF3E0] to-[#FAF7F2]">
      {/* Playful Ambient Citrus & Mint Orbs (Inspired by Reference Colors) */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#FFD166]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-[#06D6A0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#EF476F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Proposition & Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Studio Tag with Mew Creative Mascot Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-[#E29578]/30 shadow-sm text-xs font-bold tracking-wider text-[#1D3557] mb-6 w-fit backdrop-blur-sm">
              <img
                src="/assets/aistudio/IMG_691cd9b1-579e-47fa-833c-3ac27f0c52a6_841c6e94.jpg"
                alt="Mew Mascot"
                className="w-5 h-5 rounded-full object-contain bg-pink-100/70 p-0.5 border border-pink-200"
                referrerPolicy="no-referrer"
              />
              <span className="text-[#E76F51] font-black uppercase">Mew Studio</span>
              <span className="text-[#1D3557]/30" aria-hidden="true">·</span>
              <span className="text-[#3A2E39] font-medium">Boutique Creative Advertising Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#190B28] leading-[1.05] tracking-tight mb-6 [text-wrap:balance]">
              Your Product Deserves to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E76F51] via-[#EF476F] to-[#F4A261]">Stand Out.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#3A2E39] leading-relaxed max-w-2xl mb-8 font-normal [text-wrap:balance]">
              We create bold, scroll-stopping product ad creatives and short-form video ads for ambitious consumer brands.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onRequestSample}
                className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] active:scale-[0.98] rounded-2xl shadow-[0_8px_20px_rgba(239,71,111,0.3)] transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
              >
                <span>Get a Free Sample</span>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={onExploreWork}
                className="px-7 py-4 text-base font-bold text-[#190B28] bg-white hover:bg-[#FFF9F2] border-2 border-[#190B28]/10 hover:border-[#190B28]/25 active:scale-[0.98] rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap shadow-sm cursor-pointer"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Studio Key Attributes */}
            <div className="pt-6 border-t border-[#190B28]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#190B28]/80 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
                <span>Beverage, Snack & Wellness Packaging</span>
              </div>
              <span className="hidden sm:inline text-[#190B28]/20">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
                <span>USA, UK, Canada & Global D2C</span>
              </div>
              <span className="hidden sm:inline text-[#190B28]/20">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
                <span>Human Art Direction & Packaging Fidelity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Carrying Actual Creative Assets */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Showcase Card */}
              <div className="p-3 sm:p-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(231,111,81,0.18)] border border-[#E76F51]/20">
                {/* Visual Preview Container */}
                <div
                  onClick={() => onSelectPortfolioItem?.(currentItem.id)}
                  className="relative group cursor-pointer w-full overflow-hidden rounded-2xl bg-[#1C1C24] flex items-center justify-center"
                  style={{ minHeight: '440px', maxHeight: '560px' }}
                >
                  <img
                    key={currentItem.id}
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-contain max-h-[540px] transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Top Badge: Actual Brand & Category */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#190B28] shadow-md flex items-center gap-2 border border-black/5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
                    <span>{currentItem.brand}</span>
                    <span className="text-[#190B28]/30">·</span>
                    <span className="text-[#E76F51] font-semibold">{currentItem.category}</span>
                  </div>

                  {/* Bottom Hover Pill */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-[#06D6A0]" />
                    <span>Click to Inspect Packaging</span>
                  </div>
                </div>

                {/* Creative Details Strip */}
                <div className="px-1 pt-3 pb-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-[#190B28]">{currentItem.title}</span>
                    {currentItem.highlightStats && (
                      <span className="px-2 py-0.5 rounded-md bg-[#FFF3E0] text-[#E76F51] font-bold text-[11px]">
                        {currentItem.highlightStats.value}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#190B28]/70 line-clamp-1">
                    {currentItem.headline}
                  </p>
                </div>

                {/* Interactive Direction Switcher */}
                <div className="mt-3 p-1.5 bg-[#FAF7F2] rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs">
                  {heroShowcaseItems.map((showcase) => (
                    <button
                      key={showcase.id}
                      onClick={() => setActiveId(showcase.id)}
                      className={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer truncate ${
                        activeId === showcase.id
                          ? `${showcase.btnActive} shadow-sm`
                          : 'text-[#190B28]/70 hover:text-[#190B28] hover:bg-white/60'
                      }`}
                      title={showcase.label}
                    >
                      {showcase.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Quality Callout Card */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border-2 border-[#06D6A0]/30 p-3.5 rounded-2xl shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E0F5F1] flex items-center justify-center text-[#06D6A0]">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#190B28]">100% Original Studio Creatives</p>
                  <p className="text-[11px] text-[#190B28]/70">Zero generic placeholders. Real CPG assets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Category Strip (Styled with sunny, mint & coral accents) */}
        <div className="mt-16 pt-8 border-t border-[#190B28]/10">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E76F51]">
              Creative Specializations Built For Consumer Shelves & Social Feeds
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              {
                title: 'Beverage Ads',
                sub: 'Cans, bottles & wellness shots',
                bg: 'bg-[#E0F5F1]',
                text: 'text-[#06D6A0]',
                border: 'border-[#06D6A0]/40',
                emoji: '🥤',
              },
              {
                title: 'Snack & Food',
                sub: 'Crisps, popcorn & puff bags',
                bg: 'bg-[#FFF3CD]',
                text: 'text-[#E5A800]',
                border: 'border-[#FFD166]/60',
                emoji: '🍿',
              },
              {
                title: 'Functional Nutrition',
                sub: 'Protein bars & blondies',
                bg: 'bg-[#E0F2FE]',
                text: 'text-[#0284C7]',
                border: 'border-[#38BDF8]/40',
                emoji: '🍫',
              },
              {
                title: 'Video Ads',
                sub: '9:16 TikTok & Reels concepts',
                bg: 'bg-[#FFE4E6]',
                text: 'text-[#E11D48]',
                border: 'border-[#FDA4AF]/60',
                emoji: '🎬',
              },
              {
                title: 'Ad Variations',
                sub: 'Multi-flavor & seasonal hooks',
                bg: 'bg-[#EDE9FE]',
                text: 'text-[#7C3AED]',
                border: 'border-[#C4B5FD]/50',
                emoji: '🎨',
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-3.5 bg-white/80 rounded-2xl border border-[#190B28]/8 shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-full ${cat.bg} ${cat.border} border-2 flex items-center justify-center text-2xl shadow-inner mb-2.5 transition-transform group-hover:scale-110`}
                >
                  <span>{cat.emoji}</span>
                </div>
                <h4 className="text-xs font-bold text-[#190B28]">{cat.title}</h4>
                <p className="text-[10px] text-[#190B28]/60 mt-0.5">{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organic Wave Divider Transition */}
      <div className="w-full overflow-hidden leading-none mt-12 -mb-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-[#F3ECE2] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
