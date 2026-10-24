import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { MewLogo } from './MewLogo';

interface FooterProps {
  onNavigate: (page: 'home' | 'contact', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (sectionId: string) => {
    onNavigate('home', sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#170624] text-[#FAF7F2] border-t border-[#2F1146] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2D1244]">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <MewLogo size="md" theme="dark" showSubtitle={true} />
            </div>
            <p className="text-sm text-[#FAF7F2]/70 max-w-sm mb-6 leading-relaxed">
              Boutique advertising creative studio producing product visual advertisements, short-form video concepts, and creative variations for modern consumer brands.
            </p>
            <div className="text-xs text-[#FAF7F2]/50">
              Serving modern D2C & CPG brands in USA, UK, Canada, Australia, and worldwide.
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <button
                  onClick={() => handleNav('work')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('why-mew')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Mew Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Page
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Product Ad Creatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Short-Form Video Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creative Variations & Concepts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('free-sample')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Free Sample Offer</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FF5A36]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact Placeholder / Direct Channel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] mb-4">
              Studio Inquiry
            </h4>
            <p className="text-xs text-[#FAF7F2]/70 mb-4 leading-relaxed">
              Have a product drop or campaign in mind? Reach out directly to discuss creative briefs.
            </p>
            <a
              href="mailto:mewstudio.official@gmail.com?subject=Mew%20Studio%20Inquiry"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold transition-colors border border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span className="truncate">mewstudio.official@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/50">
          <p>© {currentYear} Mew Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Independent Advertising Creative Studio</span>
            <span aria-hidden="true">·</span>
            <span>Consumer Brand Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
