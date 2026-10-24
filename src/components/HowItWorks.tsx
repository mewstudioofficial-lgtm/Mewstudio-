import React from 'react';
import { UploadCloud, Wand2, RefreshCw } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'SHARE YOUR PRODUCT',
      description: 'The client shares their product image, brand details, and creative requirements.',
      icon: UploadCloud,
      note: 'Upload your packaging photo, label vector, or packshot, and let us know your aesthetic goals.',
    },
    {
      step: '02',
      title: 'DEVELOP THE CREATIVE',
      description: 'We create an advertising concept suited to the product and brand direction.',
      icon: Wand2,
      note: 'Our creative directors orchestrate custom lighting, physical environment physics, and composition.',
    },
    {
      step: '03',
      title: 'REVIEW & REFINE',
      description: 'The client reviews the creative and discusses any agreed revisions or next steps.',
      icon: RefreshCw,
      note: 'Receive high-resolution exports and discuss campaign variations or expanded video cutdowns.',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-[#FAF7F2] border-t border-[#190B28]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest text-[#69218F] uppercase mb-2">
            Straightforward Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#190B28] tracking-tight mb-4 [text-wrap:balance]">
            How It Works
          </h2>
          <p className="text-base text-[#190B28]/70 font-normal">
            No complex platform onboarding or tedious production contracts. A direct, human creative workflow designed for speed and clarity.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const iconBg =
              index === 0 ? 'bg-[#E0F5F1] text-[#06D6A0]' : index === 1 ? 'bg-[#FFF3CD] text-[#E5A800]' : 'bg-[#FFE4E6] text-[#EF476F]';
            const numColor =
              index === 0 ? 'text-[#06D6A0]' : index === 1 ? 'text-[#E5A800]' : 'text-[#EF476F]';

            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-8 border border-[#190B28]/10 hover:border-[#EF476F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`text-4xl font-black font-display ${numColor}`}>
                      {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center border border-black/5 shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-extrabold text-[#190B28] tracking-wider mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#190B28]/85 font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#190B28]/10 text-xs text-[#190B28]/60 leading-normal">
                  {item.note}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
