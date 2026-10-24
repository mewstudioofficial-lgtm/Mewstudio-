import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioCategory, PortfolioItem } from '../types';
import { Maximize2, X, ArrowUpRight, Check, Sparkles, ZoomIn, Eye, ShieldCheck, Flame } from 'lucide-react';

interface PortfolioProps {
  onRequestSample: () => void;
  selectedItemId?: string | null;
}

const CATEGORIES: PortfolioCategory[] = [
  'All',
  'Beverage Advertising',
  'Snack & Food Advertising',
  'Wellness & Functional Nutrition',
];

export const Portfolio: React.FC<PortfolioProps> = ({ onRequestSample, selectedItemId }) => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(() => {
    if (selectedItemId) {
      return PORTFOLIO_ITEMS.find((item) => item.id === selectedItemId) || null;
    }
    return null;
  });
  const [isZoomed, setIsZoomed] = useState(false);

  // If parent passes selectedItemId, keep it in sync
  React.useEffect(() => {
    if (selectedItemId) {
      const found = PORTFOLIO_ITEMS.find((item) => item.id === selectedItemId);
      if (found) {
        setActiveModalItem(found);
      }
    }
  }, [selectedItemId]);

  const filteredItems =
    selectedCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => {
          if (selectedCategory === 'Beverage Advertising') {
            return item.category === 'Beverage Advertising';
          }
          if (selectedCategory === 'Snack & Food Advertising') {
            return item.category === 'Snack & Food Advertising';
          }
          if (selectedCategory === 'Wellness & Functional Nutrition') {
            return (
              item.category === 'Wellness & Functional Nutrition' ||
              item.id === 'dose-wellness-shot' ||
              item.id === 'misfits-cookie-dough'
            );
          }
          return item.category === selectedCategory;
        });

  // Featured Master Piece: OOM Nootropics
  const oomItem = PORTFOLIO_ITEMS.find((i) => i.id === 'oom-nootropics')!;
  // Showcase Pair: DÖSE & Snackish
  const doseItem = PORTFOLIO_ITEMS.find((i) => i.id === 'dose-wellness-shot')!;
  const snackishItem = PORTFOLIO_ITEMS.find((i) => i.id === 'snackish-potato-crisps')!;
  // Wide Spectrum Banner: Poptastic
  const poptasticItem = PORTFOLIO_ITEMS.find((i) => i.id === 'poptastic-kettle-popcorn')!;
  // Trio: Misfits, Caulipuffs, Prime Bites
  const trioItems = [
    PORTFOLIO_ITEMS.find((i) => i.id === 'misfits-cookie-dough')!,
    PORTFOLIO_ITEMS.find((i) => i.id === 'caulipuffs-clean-snack')!,
    PORTFOLIO_ITEMS.find((i) => i.id === 'prime-bites-brownie')!,
  ].filter(Boolean);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#F3ECE2] border-t border-[#190B28]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E76F51]/30 text-xs font-bold tracking-wider text-[#E76F51] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>Original Creative Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#190B28] tracking-tight [text-wrap:balance]">
              Creative That Makes Products Pop.
            </h2>
          </div>
          <p className="text-base text-[#190B28]/75 max-w-md font-normal leading-relaxed">
            Every piece below is an original advertising creative built around real packaging assets—showcasing lighting, physics, and scroll-stopping art direction.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === category
                  ? 'bg-[#190B28] text-[#FAF7F2] shadow-md scale-[1.02]'
                  : 'bg-white/80 hover:bg-white text-[#190B28]/75 hover:text-[#190B28] border border-[#190B28]/10'
              }`}
            >
              {category}
              <span className="ml-2 text-[11px] opacity-70">
                (
                {category === 'All'
                  ? PORTFOLIO_ITEMS.length
                  : category === 'Beverage Advertising'
                  ? 2
                  : category === 'Snack & Food Advertising'
                  ? 4
                  : 3}
                )
              </span>
            </button>
          ))}
        </div>

        {/* VIEW 1: Rich Editorial Layout (Active when 'All' is selected) */}
        {selectedCategory === 'All' && (
          <div className="space-y-12">
            {/* 1. MASTER FEATURED SHOWCASE: OOM Sparkling Nootropics */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#190B28]/10 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Column */}
                <div className="lg:col-span-6 relative">
                  <div
                    onClick={() => setActiveModalItem(oomItem)}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#FFFDF9] border border-[#190B28]/10 shadow-inner flex items-center justify-center"
                    style={{ minHeight: '480px' }}
                  >
                    <img
                      src={oomItem.imageUrl}
                      alt={oomItem.title}
                      className="w-full h-full object-contain max-h-[580px] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[#190B28]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="bg-white text-[#190B28] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-4 h-4 text-[#E76F51]" />
                        <span>Inspect Full Can Details</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Information Column */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-2">
                      <span>Featured Studio Masterpiece</span>
                      <span className="text-[#190B28]/25">·</span>
                      <span className="text-[#190B28]/60 font-semibold">{oomItem.category}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#190B28] mb-3 leading-tight">
                      {oomItem.title}
                    </h3>

                    <p className="text-base text-[#E76F51] font-semibold mb-4 leading-snug">
                      "{oomItem.headline}"
                    </p>

                    <p className="text-sm text-[#190B28]/80 leading-relaxed mb-6">
                      {oomItem.shortDescription}
                    </p>

                    {/* Packaging Details List */}
                    <div className="mb-6 p-4 rounded-2xl bg-[#FFFDF9] border border-[#F4D3C6]">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#190B28] mb-2.5">
                        Formulation & Packaging Callouts
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#190B28]/85">
                        {oomItem.packagingDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] mt-1.5 shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Showcase Actions */}
                  <div className="pt-6 border-t border-[#190B28]/10 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onRequestSample}
                      className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] rounded-xl shadow-md cursor-pointer flex items-center gap-2 transition-all"
                    >
                      <span>Request Free Sample For Your Can</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveModalItem(oomItem)}
                      className="px-5 py-3 text-sm font-bold text-[#190B28] bg-white hover:bg-[#FAF7F2] border border-[#190B28]/15 rounded-xl cursor-pointer flex items-center gap-2 transition-all"
                    >
                      <Eye className="w-4 h-4 text-[#06D6A0]" />
                      <span>Inspect High-Res View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TWO-COLUMN EDITORIAL PAIR: DÖSE Wellness Shot & Snackish Potato Crisps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DÖSE Organic Energy Shot */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#190B28]/10 shadow-lg flex flex-col justify-between group">
                <div>
                  <div
                    onClick={() => setActiveModalItem(doseItem)}
                    className="relative cursor-pointer overflow-hidden rounded-2xl bg-[#FFFBF0] border border-[#FDE68A] flex items-center justify-center mb-6 group/img"
                    style={{ minHeight: '400px' }}
                  >
                    <img
                      src={doseItem.imageUrl}
                      alt={doseItem.title}
                      className="w-full h-full object-contain max-h-[460px] transition-transform duration-500 group-hover/img:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[#190B28]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="bg-white text-[#190B28] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-4 h-4 text-[#F59E0B]" />
                        <span>Inspect DÖSE Packaging</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2">
                    <span>{doseItem.category}</span>
                    <span className="text-[#190B28]/25">·</span>
                    <span className="text-[#190B28]/60 font-semibold">{doseItem.format}</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#190B28] mb-2 leading-snug">
                    {doseItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#190B28]/80 leading-relaxed mb-4">
                    {doseItem.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#190B28]/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveModalItem(doseItem)}
                    className="font-bold text-[#B45309] hover:text-[#92400E] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Direction & Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-[11px]">
                    100% Organic & Non-GMO
                  </span>
                </div>
              </div>

              {/* Snackish Potato Crisps */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#190B28]/10 shadow-lg flex flex-col justify-between group">
                <div>
                  <div
                    onClick={() => setActiveModalItem(snackishItem)}
                    className="relative cursor-pointer overflow-hidden rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center mb-6 group/img"
                    style={{ minHeight: '400px' }}
                  >
                    <img
                      src={snackishItem.imageUrl}
                      alt={snackishItem.title}
                      className="w-full h-full object-contain max-h-[460px] transition-transform duration-500 group-hover/img:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[#190B28]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="bg-white text-[#190B28] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-4 h-4 text-[#0284C7]" />
                        <span>Inspect Snackish Dual-Bag</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-2">
                    <span>{snackishItem.category}</span>
                    <span className="text-[#190B28]/25">·</span>
                    <span className="text-[#190B28]/60 font-semibold">{snackishItem.format}</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#190B28] mb-2 leading-snug">
                    {snackishItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#190B28]/80 leading-relaxed mb-4">
                    {snackishItem.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#190B28]/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveModalItem(snackishItem)}
                    className="font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Direction & Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-[11px]">
                    8g Protein · Avocado Oil
                  </span>
                </div>
              </div>
            </div>

            {/* 3. WIDE MULTI-PACK SPECTRUM BANNER: Poptastic Kettle Popcorn */}
            <div className="bg-gradient-to-r from-[#0F2B38] to-[#143B4D] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#0D9488]/30 shadow-2xl text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setActiveModalItem(poptasticItem)}
                    className="relative cursor-pointer overflow-hidden rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center group/pop"
                  >
                    <img
                      src={poptasticItem.imageUrl}
                      alt={poptasticItem.title}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover/pop:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/pop:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="bg-white text-[#190B28] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-4 h-4 text-[#0D9488]" />
                        <span>Inspect Full Flavor Spectrum</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2DD4BF] uppercase tracking-wider mb-2">
                      <span>Multi-Pack Campaign System</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/70 font-semibold">{poptasticItem.format}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-snug">
                      {poptasticItem.title}
                    </h3>

                    <p className="text-sm text-[#2DD4BF] font-semibold mb-4 leading-snug">
                      "{poptasticItem.headline}"
                    </p>

                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                      {poptasticItem.shortDescription}
                    </p>

                    <div className="space-y-2 mb-6 text-xs text-white/90">
                      {poptasticItem.packagingDetails.slice(1).map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActiveModalItem(poptasticItem)}
                      className="py-2.5 px-5 bg-white text-[#0F2B38] hover:bg-[#FAF7F2] font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#0D9488]" />
                      <span>Inspect High-Res Visual</span>
                    </button>
                    <button
                      onClick={onRequestSample}
                      className="py-2.5 px-5 bg-[#0D9488] hover:bg-[#0B7A70] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                    >
                      <span>Request Sample For Your Snack Line</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. DYNAMIC TRIO GRID: Misfits, Caulipuffs, Prime Bites */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trioItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#190B28]/10 shadow-lg flex flex-col justify-between group hover:shadow-xl transition-all"
                >
                  <div>
                    <div
                      onClick={() => setActiveModalItem(item)}
                      className="relative cursor-pointer overflow-hidden rounded-2xl bg-[#F8F9FA] border border-[#190B28]/10 flex items-center justify-center mb-5 group/card"
                      style={{ minHeight: '340px' }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-contain max-h-[380px] transition-transform duration-500 group-hover/card:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-[#190B28]/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="bg-white text-[#190B28] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Inspect Packaging</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-2">
                      <span>{item.brand}</span>
                      <span className="text-[#190B28]/25">·</span>
                      <span className="text-[#190B28]/60 font-medium">{item.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#190B28] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#190B28]/75 leading-relaxed mb-4">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#190B28]/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="font-bold text-[#190B28] hover:text-[#E76F51] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Explore Direction</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    {item.highlightStats && (
                      <span className="px-2 py-0.5 rounded-md bg-[#FFF3E0] text-[#E76F51] font-bold text-[11px]">
                        {item.highlightStats.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: Category Filtered Layout */}
        {selectedCategory !== 'All' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#190B28]/10 shadow-lg flex flex-col justify-between group hover:shadow-xl transition-all"
              >
                <div>
                  <div
                    onClick={() => setActiveModalItem(item)}
                    className="relative cursor-pointer overflow-hidden rounded-2xl bg-[#F8F9FA] border border-[#190B28]/10 flex items-center justify-center mb-5 group/card"
                    style={{ minHeight: '380px' }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-contain max-h-[440px] transition-transform duration-500 group-hover/card:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[#190B28]/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="bg-white text-[#190B28] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Packaging</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-2">
                    <span>{item.brand}</span>
                    <span className="text-[#190B28]/25">·</span>
                    <span className="text-[#190B28]/60 font-medium">{item.format}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#190B28] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#190B28]/75 leading-relaxed mb-4">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#190B28]/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="font-bold text-[#190B28] hover:text-[#E76F51] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {item.highlightStats && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#E76F51] font-bold text-[11px]">
                      {item.highlightStats.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Studio Ethical Creative Transparency */}
        <div className="mt-14 p-5 bg-[#FAF7F2] border border-[#190B28]/10 rounded-2xl flex items-start sm:items-center gap-3 text-xs text-[#190B28]/80 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-[#06D6A0] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-[#190B28] font-bold">Original Creative Fidelity:</strong> All portfolio advertisements shown above are original studio visual productions developed by Mew Studio for real CPG packaging. We preserve original packaging typography, labels, and color science without artificial distortion.
          </p>
        </div>
      </div>

      {/* High-Resolution Inspection Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-[#120520]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => {
            setActiveModalItem(null);
            setIsZoomed(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setActiveModalItem(null);
                setIsZoomed(false);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-[#190B28]/10 hover:bg-[#190B28]/20 text-[#190B28] transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Preview Column with Zoom Capability */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div
                  className={`relative w-full rounded-2xl overflow-hidden bg-[#1E1E24] shadow-xl flex items-center justify-center transition-all duration-300 ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  style={{ minHeight: '440px', maxHeight: '680px' }}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                  />
                  {/* Zoom indicator button */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5 text-[#06D6A0]" />
                    <span>{isZoomed ? 'Click to reset view' : 'Click to zoom in & inspect packaging'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#190B28]/60 mt-2 text-center">
                  Original high-resolution file directly from studio renders.
                </p>
              </div>

              {/* Specification Details Column */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-2">
                    <span>{activeModalItem.brand}</span>
                    <span className="text-[#190B28]/20">·</span>
                    <span className="text-[#190B28]/60 font-semibold">{activeModalItem.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#190B28] mb-2 leading-tight">
                    {activeModalItem.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#E76F51] mb-5">
                    "{activeModalItem.headline}"
                  </p>

                  <div className="space-y-4 mb-6">
                    {/* Creative Direction */}
                    <div>
                      <h4 className="text-xs font-extrabold text-[#190B28] uppercase tracking-wider mb-1">
                        Creative Direction & Atmospheric Physics
                      </h4>
                      <p className="text-xs sm:text-sm text-[#190B28]/80 leading-relaxed">
                        {activeModalItem.creativeDirection}
                      </p>
                    </div>

                    {/* Packaging Details */}
                    <div>
                      <h4 className="text-xs font-extrabold text-[#190B28] uppercase tracking-wider mb-1.5">
                        Packaging & Formulation Elements
                      </h4>
                      <ul className="space-y-1.5">
                        {activeModalItem.packagingDetails.map((det, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#190B28]/85">
                            <Check className="w-3.5 h-3.5 text-[#06D6A0] shrink-0 mt-0.5" />
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-xs font-extrabold text-[#190B28] uppercase tracking-wider mb-1.5">
                        Included Campaign Deliverables
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {activeModalItem.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-[#190B28]/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] mt-1.5 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Market Context */}
                    <div className="p-3 rounded-xl bg-white border border-[#190B28]/10 text-xs">
                      <span className="font-bold text-[#190B28]">Primary Market Context:</span>{' '}
                      <span className="text-[#190B28]/80">{activeModalItem.market}</span>
                    </div>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-5 border-t border-[#190B28]/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      setIsZoomed(false);
                      onRequestSample();
                    }}
                    className="flex-1 py-3 px-5 text-sm font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <span>Request Free Sample For Your Brand</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
