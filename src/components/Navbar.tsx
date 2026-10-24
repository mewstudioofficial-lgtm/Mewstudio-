import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MewLogo } from './MewLogo';

interface NavbarProps {
  currentPage: 'home' | 'contact';
  onNavigate: (page: 'home' | 'contact', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (sectionId === 'contact-page') {
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      onNavigate('home', sectionId);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#190B28]/10 shadow-[0_4px_20px_rgba(25,11,40,0.04)]'
            : 'bg-[#FAF7F2] border-b border-[#190B28]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 flex items-center"
          >
            <MewLogo size="md" />
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#190B28]/80">
            <a
              href="#work"
              onClick={(e) => handleLinkClick(e, 'work')}
              className="hover:text-[#E76F51] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EF476F]"
            >
              Work
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, 'services')}
              className="hover:text-[#E76F51] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EF476F]"
            >
              Services
            </a>
            <a
              href="#why-mew"
              onClick={(e) => handleLinkClick(e, 'why-mew')}
              className="hover:text-[#E76F51] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EF476F]"
            >
              Why Mew
            </a>
            <a
              href="#process"
              onClick={(e) => handleLinkClick(e, 'process')}
              className="hover:text-[#E76F51] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EF476F]"
            >
              Process
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="hover:text-[#E76F51] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EF476F]"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action button + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate('home', 'free-sample');
                } else {
                  const el = document.getElementById('free-sample');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] active:scale-[0.98] rounded-xl transition-all shadow-[0_4px_12px_rgba(239,71,111,0.25)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Get a Free Sample</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-[#190B28] hover:bg-[#190B28]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#240B36]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 z-40 bg-[#FAF7F2] border-b border-[#190B28]/10 p-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-4 text-base font-semibold text-[#190B28]">
            <a
              href="#work"
              onClick={(e) => handleLinkClick(e, 'work')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              Selected Work
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, 'services')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              Services
            </a>
            <a
              href="#why-mew"
              onClick={(e) => handleLinkClick(e, 'why-mew')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              Why Mew Studio
            </a>
            <a
              href="#process"
              onClick={(e) => handleLinkClick(e, 'process')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={(e) => handleLinkClick(e, 'faq')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="py-2 px-3 rounded-lg hover:bg-[#190B28]/5"
            >
              Contact Studio
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentPage !== 'home') {
                    onNavigate('home', 'free-sample');
                  } else {
                    const el = document.getElementById('free-sample');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 px-4 text-center font-bold text-white bg-[#240B36] rounded-xl flex items-center justify-center gap-2"
              >
                <span>Get a Free Sample</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF5A36]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
