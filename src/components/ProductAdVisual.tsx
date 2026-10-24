import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

interface ProductAdVisualProps {
  type: 'beverage-tonic' | 'beverage-coldbrew' | 'snack-cacao' | 'wellness-serum' | 'pet-chews' | 'personal-care-balm' | 'reference-showcase';
  title?: string;
  className?: string;
  aspect?: '4:5' | '16:9' | '1:1' | '9:16';
  showBadge?: boolean;
  interactive?: boolean;
  imageUrl?: string;
}

export const ProductAdVisual: React.FC<ProductAdVisualProps> = ({
  type,
  title,
  className = '',
  aspect = '4:5',
  showBadge = true,
  imageUrl,
}) => {
  const aspectClass =
    aspect === '16:9'
      ? 'aspect-[16/9]'
      : aspect === '9:16'
      ? 'aspect-[9/16]'
      : aspect === '1:1'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl bg-[#FFF8EB] select-none ${className}`}
      role="img"
      aria-label={title || 'Product Advertisement Concept'}
    >
      {/* If an imageUrl or reference image is provided, display it with high-end photography framing */}
      {imageUrl ? (
        <div className="absolute inset-0 w-full h-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title || 'Advertising Creative Reference'}
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-102"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}
      {type === 'beverage-tonic' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-tonic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A0845" />
              <stop offset="50%" stopColor="#1B072B" />
              <stop offset="100%" stopColor="#0D0315" />
            </linearGradient>
            <radialGradient id="glow-tonic" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#FFC837" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#FF8008" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1B072B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="can-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#170624" />
              <stop offset="25%" stopColor="#4A186D" />
              <stop offset="50%" stopColor="#E2A6F8" />
              <stop offset="70%" stopColor="#3B1258" />
              <stop offset="100%" stopColor="#12041D" />
            </linearGradient>
            <linearGradient id="yuzu-slice" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="100%" stopColor="#FF8F00" />
            </linearGradient>
            <filter id="soft-blur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Deep ambient background */}
          <rect width="600" height="750" fill="url(#bg-tonic)" />
          <circle cx="300" cy="340" r="280" fill="url(#glow-tonic)" />

          {/* Floating bokeh particles & water splash arches */}
          <circle cx="160" cy="180" r="22" fill="#FFD000" opacity="0.18" filter="url(#soft-blur)" />
          <circle cx="440" cy="220" r="35" fill="#E2A6F8" opacity="0.12" filter="url(#soft-blur)" />
          <circle cx="120" cy="520" r="18" fill="#FF8008" opacity="0.15" filter="url(#soft-blur)" />

          {/* Atmospheric Water Splashes & Condensation Arcs */}
          <path
            d="M 140 400 Q 220 280 290 310 Q 340 330 460 270"
            stroke="#FFE8A3"
            strokeWidth="3"
            fill="none"
            opacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M 120 340 Q 200 420 300 410 Q 400 400 480 460"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />

          {/* Sleek Beverage Can */}
          <g transform="translate(210, 180)">
            {/* Can Top Rim */}
            <ellipse cx="90" cy="20" rx="72" ry="16" fill="#A881B8" />
            <ellipse cx="90" cy="18" rx="66" ry="13" fill="#D4BFE0" />
            <ellipse cx="90" cy="16" rx="58" ry="10" fill="#240B36" />
            {/* Tab */}
            <rect x="84" y="11" width="12" height="18" rx="3" fill="#FAF7F2" opacity="0.8" />

            {/* Can Body */}
            <path
              d="M 18 20 C 18 35 24 45 24 60 L 24 330 C 24 345 35 355 90 355 C 145 355 156 345 156 330 L 156 60 C 156 45 162 35 162 20 Z"
              fill="url(#can-body)"
            />

            {/* Glossy vertical reflection line */}
            <line x1="88" y1="45" x2="88" y2="330" stroke="#FFFFFF" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
            <line x1="98" y1="55" x2="98" y2="310" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

            {/* Can Graphic/Typography */}
            <text x="90" y="130" textAnchor="middle" fill="#FAF7F2" fontSize="24" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="6">
              AURA
            </text>
            <text x="90" y="152" textAnchor="middle" fill="#FFC837" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="3">
              SPARKLING YUZU
            </text>
            <text x="90" y="168" textAnchor="middle" fill="#FAF7F2" opacity="0.75" fontSize="8" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="1">
              & HINOKI BOTANICALS
            </text>

            {/* Gold foil emblem */}
            <circle cx="90" cy="220" r="28" fill="#FFB800" opacity="0.25" stroke="#FFC837" strokeWidth="1" />
            <circle cx="90" cy="220" r="22" stroke="#FFC837" strokeWidth="0.75" strokeDasharray="3 3" fill="none" />
            <text x="90" y="224" textAnchor="middle" fill="#FFEAA7" fontSize="9" fontWeight="700">0 SUGAR</text>

            <text x="90" y="295" textAnchor="middle" fill="#FAF7F2" opacity="0.6" fontSize="9" letterSpacing="2">
              12 FL OZ · 355 ML
            </text>

            {/* Condensation Beads */}
            <circle cx="48" cy="90" r="2.5" fill="#FFFFFF" opacity="0.7" />
            <circle cx="52" cy="140" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="46" cy="145" r="1.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="132" cy="110" r="2" fill="#FFFFFF" opacity="0.7" />
            <circle cx="138" cy="180" r="3.5" fill="#FFFFFF" opacity="0.85" />
            <circle cx="136" cy="260" r="2.5" fill="#FFFFFF" opacity="0.75" />
          </g>

          {/* Floating Fresh Sliced Yuzu / Citrus */}
          <g transform="translate(130, 430) rotate(-18)">
            <ellipse cx="60" cy="60" rx="55" ry="32" fill="url(#yuzu-slice)" />
            <ellipse cx="60" cy="60" rx="46" ry="25" fill="#FFFBE6" opacity="0.9" />
            {/* Segments */}
            <path d="M 60 60 L 35 48 M 60 60 L 52 38 M 60 60 L 75 40 M 60 60 L 90 52 M 60 60 L 85 72 M 60 60 L 65 82 M 60 60 L 40 76" stroke="#FFA000" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="60" cy="60" rx="6" ry="4" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* Second Floating Citrus Wheel */}
          <g transform="translate(420, 240) rotate(32)">
            <ellipse cx="40" cy="40" rx="38" ry="24" fill="url(#yuzu-slice)" opacity="0.85" />
            <ellipse cx="40" cy="40" rx="32" ry="18" fill="#FFFBE6" opacity="0.9" />
          </g>

          {/* Pedestal Surface & Soft Reflection */}
          <path d="M 120 540 Q 300 520 480 540 L 440 680 Q 300 700 160 680 Z" fill="#200B32" opacity="0.85" />
          <ellipse cx="300" cy="540" rx="170" ry="24" fill="#3D135B" opacity="0.6" />
          <ellipse cx="300" cy="538" rx="80" ry="12" fill="#FFC837" opacity="0.15" />
        </svg>
      )}

      {type === 'wellness-serum' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-serum" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E192D" />
              <stop offset="60%" stopColor="#130E20" />
              <stop offset="100%" stopColor="#0B0814" />
            </linearGradient>
            <radialGradient id="serum-glow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#065F46" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#130E20" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="glass-bottle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#6EE7B7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ECFDF5" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="dropper-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>

          <rect width="600" height="750" fill="url(#bg-serum)" />
          <circle cx="300" cy="360" r="260" fill="url(#serum-glow)" />

          {/* Travertine Pedestal Architecture */}
          <path d="M 130 520 L 470 520 L 490 680 L 110 680 Z" fill="#2A243D" stroke="#3D3559" strokeWidth="1" />
          <polygon points="130,520 470,520 490,500 150,500" fill="#3D3559" />

          {/* Botanical Aloe Leaves */}
          <path
            d="M 120 620 C 110 500 180 430 230 400 C 200 480 180 560 160 630 Z"
            fill="#065F46"
            opacity="0.65"
          />
          <path
            d="M 490 590 C 500 460 430 390 380 370 C 410 440 430 520 450 600 Z"
            fill="#047857"
            opacity="0.5"
          />

          {/* Skincare Dropper Bottle */}
          <g transform="translate(235, 170)">
            {/* Rubber bulb */}
            <path d="M 45 10 C 45 0 85 0 85 10 L 80 40 L 50 40 Z" fill="#FAF7F2" opacity="0.9" />
            {/* Metallic Collar */}
            <rect x="42" y="40" width="46" height="26" rx="2" fill="url(#dropper-gold)" />
            {/* Glass Pipette */}
            <rect x="62" y="66" width="6" height="40" fill="#E2E8F0" opacity="0.8" />
            {/* Droplet suspended */}
            <path d="M 65 110 C 62 110 59 116 59 120 A 6 6 0 0 0 71 120 C 71 116 68 110 65 110 Z" fill="#A7F3D0" opacity="0.9" />

            {/* Bottle Shoulder & Body */}
            <path
              d="M 45 90 C 45 90 20 105 18 135 L 18 335 C 18 345 30 355 65 355 C 100 355 112 345 112 335 L 112 135 C 110 105 85 90 85 90 Z"
              fill="url(#glass-bottle)"
              stroke="#A7F3D0"
              strokeWidth="1"
              strokeOpacity="0.4"
            />

            {/* Serum Fill Level */}
            <path
              d="M 23 180 L 107 180 L 107 332 C 107 342 98 350 65 350 C 32 350 23 342 23 332 Z"
              fill="#059669"
              opacity="0.4"
            />

            {/* Label */}
            <rect x="30" y="200" width="70" height="95" rx="3" fill="#FAF7F2" />
            <text x="65" y="222" textAnchor="middle" fill="#0F172A" fontSize="9" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="1.5">
              CELLULAR
            </text>
            <text x="65" y="235" textAnchor="middle" fill="#059669" fontSize="6.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="1">
              BARRIER DEW
            </text>
            <line x1="42" y1="242" x2="88" y2="242" stroke="#E2E8F0" strokeWidth="0.75" />
            <text x="65" y="254" textAnchor="middle" fill="#475569" fontSize="5.5">5% PEPTIDE COMPLEX</text>
            <text x="65" y="264" textAnchor="middle" fill="#475569" fontSize="5.5">ECTOIN + CERAMIDES</text>
            <text x="65" y="284" textAnchor="middle" fill="#64748B" fontSize="5" letterSpacing="0.5">30 ML / 1.0 FL OZ</text>

            {/* Glass Highlights */}
            <line x1="26" y1="140" x2="26" y2="330" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
            <line x1="104" y1="140" x2="104" y2="330" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
          </g>

          {/* Dew drops on stone */}
          <ellipse cx="210" cy="530" rx="8" ry="4" fill="#A7F3D0" opacity="0.6" />
          <ellipse cx="380" cy="525" rx="12" ry="5" fill="#E2E8F0" opacity="0.5" />
          <ellipse cx="420" cy="540" rx="6" ry="3" fill="#A7F3D0" opacity="0.7" />
        </svg>
      )}

      {type === 'snack-cacao' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-snack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D111A" />
              <stop offset="60%" stopColor="#1A0A10" />
              <stop offset="100%" stopColor="#0D0408" />
            </linearGradient>
            <radialGradient id="snack-sun" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#EA580C" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1A0A10" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pouch-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9A3412" />
              <stop offset="35%" stopColor="#C2410C" />
              <stop offset="65%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>
          </defs>

          <rect width="600" height="750" fill="url(#bg-snack)" />
          <circle cx="300" cy="320" r="280" fill="url(#snack-sun)" />

          {/* Architectural Podium */}
          <polygon points="120,540 480,540 520,700 80,700" fill="#381B23" stroke="#4F2633" strokeWidth="1" />
          <polygon points="120,540 480,540 460,510 140,510" fill="#4F2633" />

          {/* Snack Pouch */}
          <g transform="translate(195, 170)">
            {/* Seal Top */}
            <path d="M 20 20 L 190 20 L 180 50 L 30 50 Z" fill="#7C2D12" />
            <line x1="30" y1="35" x2="180" y2="35" stroke="#EA580C" strokeWidth="2" strokeDasharray="4 2" />

            {/* Pouch Silhouette */}
            <path
              d="M 30 50 L 180 50 C 195 90 205 240 195 350 C 190 365 170 375 105 375 C 40 375 20 365 15 350 C 5 240 15 90 30 50 Z"
              fill="url(#pouch-body)"
            />

            {/* Matte Highlights & Shadow Folds */}
            <path d="M 30 50 Q 50 200 40 360" stroke="#FED7AA" strokeWidth="3" opacity="0.3" fill="none" />
            <path d="M 180 50 Q 165 200 170 360" stroke="#7C2D12" strokeWidth="4" opacity="0.6" fill="none" />

            {/* Packaging Badge */}
            <rect x="42" y="110" width="126" height="175" rx="8" fill="#1C0A10" opacity="0.9" />
            <text x="105" y="145" textAnchor="middle" fill="#FED7AA" fontSize="20" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="4">
              NOMAD
            </text>
            <text x="105" y="165" textAnchor="middle" fill="#FB923C" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="2">
              RAW CACAO &
            </text>
            <text x="105" y="180" textAnchor="middle" fill="#FAF7F2" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="2">
              MACADAMIA CRUNCH
            </text>
            <line x1="60" y1="192" x2="150" y2="192" stroke="#FB923C" strokeWidth="1" />
            <text x="105" y="212" textAnchor="middle" fill="#FED7AA" opacity="0.8" fontSize="8">PINK HIMALAYAN SALT</text>
            <text x="105" y="226" textAnchor="middle" fill="#FED7AA" opacity="0.8" fontSize="8">KETO · PALEO · 4G NET CARB</text>

            <rect x="75" y="245" width="60" height="22" rx="4" fill="#EA580C" />
            <text x="105" y="260" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="800" letterSpacing="1">
              ORGANIC
            </text>
          </g>

          {/* Scattered Roasted Macadamia & Cacao Nibs */}
          <circle cx="150" cy="530" r="14" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          <circle cx="168" cy="545" r="10" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          <polygon points="430,535 442,525 448,540 435,548" fill="#451A03" />
          <polygon points="460,550 470,542 475,555 464,560" fill="#78350F" />
          <circle cx="410" cy="560" r="3" fill="#FFFFFF" opacity="0.8" />
          <circle cx="420" cy="565" r="2" fill="#FFFFFF" opacity="0.7" />
        </svg>
      )}

      {type === 'beverage-coldbrew' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-brew" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A0D2E" />
              <stop offset="60%" stopColor="#0F071D" />
              <stop offset="100%" stopColor="#07030E" />
            </linearGradient>
            <radialGradient id="brew-amber" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#78350F" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0F071D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="amber-glass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E110A" />
              <stop offset="30%" stopColor="#451A03" />
              <stop offset="50%" stopColor="#D97706" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#1E110A" />
            </linearGradient>
          </defs>

          <rect width="600" height="750" fill="url(#bg-brew)" />
          <circle cx="300" cy="350" r="260" fill="url(#brew-amber)" />

          {/* Heavy Glass Bottle */}
          <g transform="translate(210, 150)">
            {/* Crown Cap */}
            <path d="M 68 15 L 112 15 L 116 32 L 64 32 Z" fill="#E2B170" />
            {/* Bottle Neck */}
            <path d="M 72 32 L 108 32 L 112 90 L 68 90 Z" fill="#2E1609" />
            {/* Body */}
            <path
              d="M 68 90 C 35 120 25 150 25 200 L 25 350 C 25 365 38 375 90 375 C 142 375 155 365 155 350 L 155 200 C 155 150 145 120 112 90 Z"
              fill="url(#amber-glass)"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeOpacity="0.3"
            />

            {/* Amber liquid depth highlight */}
            <line x1="88" y1="120" x2="88" y2="350" stroke="#FDE68A" strokeWidth="4" opacity="0.4" strokeLinecap="round" />

            {/* Minimalist Editorial Label */}
            <rect x="42" y="180" width="96" height="140" rx="4" fill="#0A0612" stroke="#D97706" strokeWidth="1" />
            <text x="90" y="215" textAnchor="middle" fill="#FAF7F2" fontSize="18" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="4">
              KROMA
            </text>
            <text x="90" y="235" textAnchor="middle" fill="#E2B170" fontSize="8" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="2">
              NOOTROPIC
            </text>
            <text x="90" y="250" textAnchor="middle" fill="#FAF7F2" opacity="0.75" fontSize="7.5" letterSpacing="1">
              DOUBLE NITRO COLD BREW
            </text>
            <line x1="60" y1="262" x2="120" y2="262" stroke="#78350F" strokeWidth="0.75" />
            <text x="90" y="278" textAnchor="middle" fill="#E2B170" fontSize="7">L-THEANINE + LION'S MANE</text>
            <text x="90" y="302" textAnchor="middle" fill="#A1A1AA" fontSize="6.5" letterSpacing="1">10.5 FL OZ · SINGLE ORIGIN</text>
          </g>

          {/* Roasted Coffee Beans Scatter */}
          <ellipse cx="160" cy="530" rx="14" ry="9" fill="#3B1808" stroke="#1A0A04" strokeWidth="1.5" transform="rotate(-25 160 530)" />
          <ellipse cx="440" cy="510" rx="16" ry="10" fill="#451A03" stroke="#1A0A04" strokeWidth="1.5" transform="rotate(35 440 510)" />
          <ellipse cx="420" cy="545" rx="12" ry="8" fill="#3B1808" stroke="#1A0A04" strokeWidth="1.5" transform="rotate(-15 420 545)" />
        </svg>
      )}

      {type === 'pet-chews' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-pet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19132E" />
              <stop offset="60%" stopColor="#100C1F" />
              <stop offset="100%" stopColor="#090612" />
            </linearGradient>
            <radialGradient id="pet-teal" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#0F766E" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#100C1F" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="600" height="750" fill="url(#bg-pet)" />
          <circle cx="300" cy="340" r="260" fill="url(#pet-teal)" />

          {/* Terrazzo Pedestal */}
          <ellipse cx="300" cy="540" rx="190" ry="32" fill="#241B3B" stroke="#372B58" strokeWidth="1" />
          <circle cx="210" cy="538" r="4" fill="#6EE7B7" opacity="0.6" />
          <circle cx="380" cy="545" r="5" fill="#F472B6" opacity="0.5" />
          <circle cx="280" cy="552" r="3" fill="#FBBF24" opacity="0.7" />

          {/* Minimalist Pet Supplement Jar */}
          <g transform="translate(190, 180)">
            {/* Matte Lid */}
            <path d="M 30 20 L 190 20 C 195 20 200 28 198 38 L 194 65 C 192 70 188 74 182 74 L 38 74 C 32 74 28 70 26 65 L 22 38 C 20 28 25 20 30 20 Z" fill="#2D2149" stroke="#4C3A7A" strokeWidth="1" />

            {/* Aluminum / Matte White Body */}
            <path
              d="M 28 74 L 192 74 C 200 110 202 260 196 320 C 194 335 180 345 110 345 C 40 345 26 335 24 320 C 18 260 20 110 28 74 Z"
              fill="#FAF7F2"
            />

            {/* Brand Wrap */}
            <text x="110" y="150" textAnchor="middle" fill="#140822" fontSize="22" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="4">
              TERRA
            </text>
            <text x="110" y="172" textAnchor="middle" fill="#0D9488" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="2">
              KELP & WILD SALMON
            </text>
            <text x="110" y="188" textAnchor="middle" fill="#4B5563" fontSize="8" letterSpacing="1">
              CANINE VITALITY CHEWS
            </text>

            <rect x="60" y="210" width="100" height="50" rx="6" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1" />
            <text x="110" y="230" textAnchor="middle" fill="#0F766E" fontSize="8" fontWeight="700">60 COLD-PRESSED CHEWS</text>
            <text x="110" y="246" textAnchor="middle" fill="#115E59" fontSize="7">OMEGA-3 · JOINT · COAT</text>

            <text x="110" y="300" textAnchor="middle" fill="#6B7280" fontSize="7" letterSpacing="1.5">
              VET FORMULATED · USA MADE
            </text>
          </g>

          {/* Wild Botanicals & Dropper */}
          <path d="M 120 540 Q 150 460 200 440" stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 460 530 Q 430 440 390 420" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'personal-care-balm' && (
        <svg
          viewBox="0 0 600 750"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="bg-balm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A0B2C" />
              <stop offset="60%" stopColor="#18051A" />
              <stop offset="100%" stopColor="#0B020C" />
            </linearGradient>
            <radialGradient id="balm-pink" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#DB2777" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#18051A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="tube-glass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="35%" stopColor="#DB2777" />
              <stop offset="55%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#70072B" />
            </linearGradient>
          </defs>

          <rect width="600" height="750" fill="url(#bg-balm)" />
          <circle cx="300" cy="340" r="260" fill="url(#balm-pink)" />

          {/* Gloss Swatch in Background */}
          <path
            d="M 110 320 C 160 260 260 250 330 280 C 420 320 480 290 510 350 C 470 380 400 370 320 340 C 230 310 160 360 110 320 Z"
            fill="#F472B6"
            opacity="0.35"
          />

          {/* Sculptural Acrylic Tube */}
          <g transform="translate(230, 160) rotate(-12 70 180)">
            {/* Chrome Cap */}
            <rect x="35" y="10" width="70" height="55" rx="4" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="55" y1="10" x2="55" y2="65" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="85" y1="10" x2="85" y2="65" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Clear Tube Body */}
            <rect x="40" y="65" width="60" height="260" rx="8" fill="url(#tube-glass)" />
            {/* Lip Silk Fluid Reflection */}
            <line x1="52" y1="80" x2="52" y2="310" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

            {/* Typography */}
            <text x="70" y="160" textAnchor="middle" fill="#FAF7F2" fontSize="16" fontFamily="Outfit, sans-serif" fontWeight="800" letterSpacing="3">
              LUMI
            </text>
            <text x="70" y="180" textAnchor="middle" fill="#FCE7F3" fontSize="7" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="1.5">
              SILK PHYTO-BARRIER
            </text>
            <text x="70" y="195" textAnchor="middle" fill="#FFFFFF" opacity="0.8" fontSize="6.5">
              TINTED LIP GLAZE
            </text>
          </g>
        </svg>
      )}

      {/* Overlaid Studio Tag / Watermark-Free Badge */}
      {showBadge && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#120520]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-[#FAF7F2]/90 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
          <span className="font-medium tracking-tight">Studio Creative</span>
          <span className="text-white/40">·</span>
          <span className="text-[#FAF7F2]/70 text-[11px]">{aspect} format</span>
        </div>
      )}

      {/* Bottom Concept Tag */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[11px] text-white/80">
        <Layers className="w-3 h-3 text-[#FF5A36]" />
        <span>Concept Ad</span>
      </div>
    </div>
  );
};
