import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Reusable scroll-reveal entrance container for page sections
interface ScrollRevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

function ScrollRevealSection({
  children,
  delay = 0,
  className = '',
  id,
}: ScrollRevealSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

      <AnimatePresence mode="wait">
        {currentPage === 'contact' ? (
          <motion.main
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex-grow"
          >
            <ContactPage onBackToHome={() => handleNavigate('home')} />
          </motion.main>
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex-grow"
          >
            {/* Hero Section: Smooth initial entrance on page load */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero
                onRequestSample={handleRequestSample}
                onExploreWork={handleExploreWork}
                onSelectPortfolioItem={handleSelectPortfolioItem}
              />
            </motion.div>

            {/* Portfolio Section */}
            <ScrollRevealSection>
              <Portfolio
                onRequestSample={handleRequestSample}
                selectedItemId={selectedPortfolioId}
              />
            </ScrollRevealSection>

            {/* Services Section */}
            <ScrollRevealSection>
              <Services
                onRequestSample={handleRequestSample}
                onDiscussProject={() => handleNavigate('contact')}
              />
            </ScrollRevealSection>

            {/* Why BigBrains / Studio Philosophy Section */}
            <ScrollRevealSection>
              <WhyBigBrains />
            </ScrollRevealSection>

            {/* How It Works Section */}
            <ScrollRevealSection>
              <HowItWorks />
            </ScrollRevealSection>

            {/* Free Sample Banner Section */}
            <ScrollRevealSection>
              <FreeSampleBanner onRequestSample={handleRequestSample} />
            </ScrollRevealSection>

            {/* Direct Studio Inquiry & Contact Form Section */}
            <ScrollRevealSection>
              <section id="contact" className="py-20 md:py-32 bg-[#FAF7F2] border-t border-[#190B28]/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ContactForm initialService="Product Ad Creatives" isStandalonePage={false} />
                </div>
              </section>
            </ScrollRevealSection>

            {/* FAQ Section */}
            <ScrollRevealSection>
              <FAQ />
            </ScrollRevealSection>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
