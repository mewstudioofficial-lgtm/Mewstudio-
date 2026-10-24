import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ArrowLeft, Clock, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#190B28] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#190B28]/70 hover:text-[#240B36] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Studio Overview</span>
          </button>
        </div>

        {/* Hero Banner for Contact Page */}
        <div className="bg-gradient-to-br from-[#E76F51] via-[#EF476F] to-[#1D3557] text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-xl border border-white/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD166]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FFB800] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Inquiries & Sample Requests</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 [text-wrap:balance]">
              Start Your Brand Inquiry.
            </h1>
            <p className="text-base sm:text-lg text-[#FAF7F2]/80 leading-relaxed font-normal">
              Whether you need a full creative campaign rollout, ad variations for paid testing, or a complimentary sample concept for your product packaging, let's connect.
            </p>
          </div>

          {/* Studio Reassurance Strip */}
          <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#FAF7F2]/75">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span>24-Hour Review Turnaround</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span>Packaging Asset Privacy Respected</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span>Direct Creative Director Access</span>
            </div>
          </div>
        </div>

        {/* The Contact Form */}
        <ContactForm isStandalonePage={true} />

        {/* Alternative Direct Channels */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-[#190B28]/10 shadow-sm">
            <h3 className="text-lg font-bold text-[#190B28] mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FF5A36]" />
              <span>Prefer Direct Email?</span>
            </h3>
            <p className="text-sm text-[#190B28]/70 mb-4 leading-relaxed">
              If you have an existing creative brief or pitch deck ready to send, feel free to drop an email directly into our inbox.
            </p>
            <a
              href="mailto:mewstudio.official@gmail.com?subject=Mew%20Studio%20Direct%20Creative%20Brief"
              className="font-bold text-sm text-[#240B36] hover:text-[#FF5A36] underline"
            >
              mewstudio.official@gmail.com
            </a>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#190B28]/10 shadow-sm">
            <h3 className="text-lg font-bold text-[#190B28] mb-2">
              What Happens Next?
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#190B28]/75">
              <li>Our creative team reviews your brand aesthetic, website, and target market.</li>
              <li>We confirm your project requirements or approve your complimentary sample concept.</li>
              <li>We deliver the first creative direction within 48 to 72 business hours.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
