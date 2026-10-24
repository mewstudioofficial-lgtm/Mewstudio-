import React from 'react';
import { PenTool, Sparkles } from 'lucide-react';

interface MewLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textClassName?: string;
  subtextClassName?: string;
  showSubtitle?: boolean;
  theme?: 'dark' | 'light';
}

export const MewLogo: React.FC<MewLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textClassName = '',
  subtextClassName = '',
  showSubtitle = false,
  theme = 'light',
}) => {
  // Dimensions for badge
  const sizeConfig = {
    sm: {
      box: 'w-8 h-8',
      img: 'w-7 h-7',
      penBadge: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5',
      penIcon: 'w-2 h-2',
      textSize: 'text-xl',
      subtextSize: 'text-[10px]',
    },
    md: {
      box: 'w-10 h-10',
      img: 'w-9 h-9',
      penBadge: 'w-4 h-4 -bottom-1 -right-1',
      penIcon: 'w-2.5 h-2.5',
      textSize: 'text-2xl',
      subtextSize: 'text-xs',
    },
    lg: {
      box: 'w-14 h-14',
      img: 'w-12 h-12',
      penBadge: 'w-5 h-5 -bottom-1 -right-1',
      penIcon: 'w-3 h-3',
      textSize: 'text-3xl',
      subtextSize: 'text-xs',
    },
  }[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#190B28]';
  const subtextColor = theme === 'dark' ? 'text-[#FAF7F2]/60' : 'text-[#190B28]/60';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Mew Creative Mascot Emblem */}
      <div className="relative group shrink-0">
        {/* Outer subtle glow/ring */}
        <div
          className={`relative ${sizeConfig.box} rounded-2xl p-0.5 bg-gradient-to-tr from-[#E76F51] via-[#EF476F] to-[#2C1245] shadow-[0_4px_14px_rgba(231,111,81,0.28)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-visible`}
        >
          {/* Inner background container */}
          <div className="w-full h-full rounded-[14px] bg-[#FAF7F2] flex items-center justify-center overflow-hidden border border-white/60 relative">
            {/* Soft decorative studio gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/60 via-amber-50/40 to-rose-100/40 pointer-events-none" />

            {/* Mew Character Image */}
            <img
              src="/assets/aistudio/IMG_691cd9b1-579e-47fa-833c-3ac27f0c52a6_841c6e94.jpg"
              alt="Mew - Studio Creative Mascot"
              className={`${sizeConfig.img} object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm`}
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>

          {/* Designer Tool Badge: Pen Tool / Stylus with Creative Spark */}
          <div
            className={`absolute ${sizeConfig.penBadge} rounded-full bg-[#190B28] text-[#FAF7F2] border-[1.5px] border-[#FAF7F2] flex items-center justify-center shadow-md shadow-[#190B28]/30 transition-transform duration-200 group-hover:rotate-12`}
            title="Creative Design Studio"
          >
            <PenTool className={`${sizeConfig.penIcon} text-[#EF476F]`} />
          </div>
        </div>

        {/* Tiny creative sparkle accent */}
        <div className="absolute -top-1 -right-0.5 text-amber-500 opacity-90 animate-pulse pointer-events-none">
          <Sparkles className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-display font-extrabold tracking-tight ${sizeConfig.textSize} ${textColor} ${textClassName}`}
            >
              Mew Studio
            </span>
          </div>
          {showSubtitle && (
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className={`font-sans font-medium uppercase tracking-wider ${sizeConfig.subtextSize} ${subtextColor} ${subtextClassName}`}
              >
                Creative Advertising
              </span>
              <span className="w-1 h-1 rounded-full bg-[#EF476F]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
