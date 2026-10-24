import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { WhyBigBrains } from './components/WhyBigBrains';
import { HowItWorks } from './components/HowItWorks';
import { FreeSampleBanner } from './components/FreeSampleBanner';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactPage } from './components/ContactPage';
import { ContactForm } from './components/ContactForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  const handleNavigate = (page: 'home' | 'contact', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRequestSample = () => {
    handleNavigate('contact');
  };

  const handleExploreWork = () => {
    if (currentPage !== 'home') {
      handleNavigate('home', 'work');
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPortfolioItem = (itemId: string) => {
    setSelectedPortfolioId(itemId);
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#190B28] flex flex-col font-sans selection:bg-[#E76F51] selection:text-white">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'contact' ? (
        <main className="flex-grow">
          <ContactPage onBackToHome={() => handleNavigate('home')} />
        </main>
      ) : (
        <main className="flex-grow">
          <Hero
            onRequestSample={handleRequestSample}
            onExploreWork={handleExploreWork}
            onSelectPortfolioItem={handleSelectPortfolioItem}
          />

          <Portfolio
            onRequestSample={handleRequestSample}
            selectedItemId={selectedPortfolioId}
          />

          <Services
            onRequestSample={handleRequestSample}
            onDiscussProject={() => handleNavigate('contact')}
          />

          <WhyBigBrains />

          <HowItWorks />

          <FreeSampleBanner onRequestSample={handleRequestSample} />

          {/* Direct Studio Inquiry & Contact Form */}
          <section id="contact" className="py-20 md:py-32 bg-[#FAF7F2] border-t border-[#190B28]/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm initialService="Product Ad Creatives" isStandalonePage={false} />
            </div>
          </section>

          <FAQ />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
