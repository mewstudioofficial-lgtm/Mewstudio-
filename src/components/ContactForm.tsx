import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { Mail, Send, CheckCircle2, AlertCircle, Info, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  isStandalonePage?: boolean;
}

const STUDIO_EMAIL = 'mewstudio.official@gmail.com';

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = 'Free Sample Creative',
  isStandalonePage = false,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    brandName: '',
    businessEmail: '',
    brandWebsite: '',
    serviceRequired: initialService,
    projectDescription: '',
    sampleInterest: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.brandName.trim()) {
      newErrors.brandName = 'Please enter your brand or company name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim() || !emailRegex.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid business email address.';
    }

    if (!formData.brandWebsite.trim()) {
      newErrors.brandWebsite = 'Please enter your website URL or Instagram/TikTok handle.';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please tell us briefly about your product (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const getBriefText = () => {
    return (
      `Hello Mew Studio,\n\n` +
      `Here are our brand inquiry details:\n\n` +
      `• Full Name: ${formData.fullName}\n` +
      `• Brand Name: ${formData.brandName}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• Brand Website / Social: ${formData.brandWebsite}\n` +
      `• Service Required: ${formData.serviceRequired}\n` +
      `• Sample Interest: ${formData.sampleInterest ? 'Yes, please review for a free sample' : 'Standard project inquiry'}\n\n` +
      `Project & Packaging Details:\n${formData.projectDescription}\n\n` +
      `Sent via Mew Studio Inquiry Portal`
    );
  };

  const [copied, setCopied] = useState(false);

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(getBriefText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(
      `[Mew Studio Inquiry] ${formData.brandName || 'New Brand'} – ${formData.serviceRequired}`
    );
    const body = encodeURIComponent(getBriefText());
    return `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
  };

  const getGmailWebLink = () => {
    const subject = encodeURIComponent(
      `[Mew Studio Inquiry] ${formData.brandName || 'New Brand'} – ${formData.serviceRequired}`
    );
    const body = encodeURIComponent(getBriefText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${STUDIO_EMAIL}&su=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`py-20 md:py-32 ${isStandalonePage ? 'bg-[#FAF7F2]' : 'bg-[#FAF7F2] border-t border-[#190B28]/10'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest text-[#69218F] uppercase mb-2">
            Initiate A Dialogue
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#190B28] tracking-tight mb-4 [text-wrap:balance]">
            Have a Product in Mind?
          </h2>
          <p className="text-base sm:text-lg text-[#190B28]/75 font-normal [text-wrap:balance]">
            Tell us about your brand and what you want to create.
          </p>
        </div>

        {/* Prototype & Transparency Banner (Per User Instructions) */}
        <div className="mb-10 p-4 bg-[#FAF7F2] border border-[#190B28]/15 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#190B28]/80">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#69218F] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#190B28]">
                Frontend Inquiry Prototype & Direct Studio Channel
              </p>
              <p className="text-[#190B28]/70">
                This form validates client-side and pre-fills your email. Prospective clients never need an account or payment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${STUDIO_EMAIL}?subject=Mew%20Studio%20Direct%20Inquiry`}
              className="py-2 px-3.5 bg-white border border-[#190B28]/20 hover:border-[#190B28]/40 rounded-xl font-bold text-[#190B28] flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Email Studio Directly</span>
            </a>
            <button
              type="button"
              onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
              className="text-[#69218F] underline hover:text-[#240B36] font-semibold"
            >
              {showIntegrationGuide ? 'Hide Setup' : 'Form Setup Guide'}
            </button>
          </div>
        </div>

        {/* Optional Form Setup Guide for Developer/Owner */}
        {showIntegrationGuide && (
          <div className="mb-10 p-6 bg-[#240B36] text-[#FAF7F2] rounded-2xl text-xs space-y-3 animate-in fade-in duration-200">
            <h4 className="text-sm font-bold text-[#FFB800] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>How to Connect a Free Live Form Endpoint (2 Minutes)</span>
            </h4>
            <p className="text-[#FAF7F2]/80 leading-relaxed">
              To route submissions directly into your inbox without setting up custom server backends or databases, choose one of these free services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#FAF7F2]/90">
              <li>
                <strong>Formspree (formspree.io):</strong> Replace the form submit handler with <code className="bg-black/30 px-1 py-0.5 rounded">action="https://formspree.io/f/YOUR_ID" method="POST"</code>.
              </li>
              <li>
                <strong>Web3Forms (web3forms.com):</strong> Free unlimited email delivery using a client-side public access key.
              </li>
              <li>
                <strong>Direct Mailto:</strong> By default, this application creates a complete pre-formatted mailto draft sent directly to <code className="bg-black/30 px-1 py-0.5 rounded">{STUDIO_EMAIL}</code>.
              </li>
            </ul>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#190B28]/10 shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#059669] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#190B28] mb-2">
                  Sample Request Brief Ready!
                </h3>
                <p className="text-sm text-[#190B28]/80 mb-6">
                  Thank you, <strong>{formData.fullName}</strong>! We've prepared your request for <strong>{formData.brandName}</strong>. Send it to us via one of the options below so our creative team can begin reviewing your product:
                </p>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl text-left text-xs space-y-2 mb-6 border border-[#190B28]/10">
                  <div className="flex justify-between items-center pb-2 border-b border-[#190B28]/10">
                    <span className="font-bold text-[#E76F51] uppercase tracking-wider text-[11px]">Compiled Brief</span>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="text-[11px] font-bold text-[#190B28] hover:text-[#E76F51] flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <div><span className="font-bold text-[#190B28]">Brand:</span> {formData.brandName}</div>
                  <div><span className="font-bold text-[#190B28]">Service:</span> {formData.serviceRequired}</div>
                  <div><span className="font-bold text-[#190B28]">Your Email:</span> {formData.businessEmail}</div>
                  <div><span className="font-bold text-[#190B28]">Website / Social:</span> {formData.brandWebsite}</div>
                  <div className="pt-2 border-t border-[#190B28]/10"><span className="font-bold text-[#190B28]">Product Details:</span> {formData.projectDescription}</div>
                </div>

                {/* Direct Action Options */}
                <div className="space-y-3 mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={getGmailWebLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 px-5 font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#EF476F] hover:from-[#D65F41] hover:to-[#DE375F] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-xs sm:text-sm"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>Send via Gmail (in browser)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                    </a>

                    <a
                      href={getMailtoLink()}
                      className="flex-1 py-3.5 px-5 font-bold text-[#190B28] bg-white hover:bg-[#FAF7F2] border-2 border-[#190B28]/15 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-xs sm:text-sm"
                    >
                      <Mail className="w-4 h-4 text-[#EF476F]" />
                      <span>Send via Mail App</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE2] text-xs font-semibold text-[#190B28]/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#190B28]/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied brief to clipboard! You can paste it into any email' : 'Copy Brief to Clipboard (to email manually)'}</span>
                  </button>
                </div>

                <div className="p-3 bg-[#E0F5F1] rounded-xl text-xs text-[#122620] mb-4 text-left border border-[#06D6A0]/40 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06D6A0] shrink-0 mt-0.5" />
                  <p>
                    <strong>What happens next:</strong> Your message goes directly to <strong>mewstudio.official@gmail.com</strong>. Our creative director will review your packaging and reply back to <strong>{formData.businessEmail}</strong> within 24 business hours with your complimentary concept preview.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#190B28]/60 hover:text-[#190B28] underline cursor-pointer"
                >
                  Edit inquiry details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                    Full Name <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#190B28] placeholder-[#190B28]/40 focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                        : 'border-[#190B28]/20 focus:border-[#240B36]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Brand Name */}
                <div>
                  <label htmlFor="brandName" className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                    Brand Name <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    value={formData.brandName}
                    onChange={(e) => {
                      setFormData({ ...formData, brandName: e.target.value });
                      if (errors.brandName) setErrors({ ...errors, brandName: undefined });
                    }}
                    placeholder="e.g. Aura Botanicals"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#190B28] placeholder-[#190B28]/40 focus:outline-none transition-colors ${
                      errors.brandName
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                        : 'border-[#190B28]/20 focus:border-[#240B36]'
                    }`}
                  />
                  {errors.brandName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.brandName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Business Email */}
                <div>
                  <label htmlFor="businessEmail" className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                    Business Email <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    value={formData.businessEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, businessEmail: e.target.value });
                      if (errors.businessEmail) setErrors({ ...errors, businessEmail: undefined });
                    }}
                    placeholder="alex@drinkaurabotanicals.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#190B28] placeholder-[#190B28]/40 focus:outline-none transition-colors ${
                      errors.businessEmail
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                        : 'border-[#190B28]/20 focus:border-[#240B36]'
                    }`}
                  />
                  {errors.businessEmail && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.businessEmail}</span>
                    </p>
                  )}
                </div>

                {/* Brand Website / Social */}
                <div>
                  <label htmlFor="brandWebsite" className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                    Brand Website or Social Handle <span className="text-[#FF5A36]">*</span>
                  </label>
                  <input
                    type="text"
                    id="brandWebsite"
                    value={formData.brandWebsite}
                    onChange={(e) => {
                      setFormData({ ...formData, brandWebsite: e.target.value });
                      if (errors.brandWebsite) setErrors({ ...errors, brandWebsite: undefined });
                    }}
                    placeholder="drinkaurabotanicals.com or @aurabotanicals"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#190B28] placeholder-[#190B28]/40 focus:outline-none transition-colors ${
                      errors.brandWebsite
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                        : 'border-[#190B28]/20 focus:border-[#240B36]'
                    }`}
                  />
                  {errors.brandWebsite && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.brandWebsite}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Service Required Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                  Service Required <span className="text-[#FF5A36]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Free Sample Creative',
                    'Product Ad Creatives',
                    'Short-Form Video Ads',
                    'Creative Variations',
                  ].map((service) => (
                    <label
                      key={service}
                      className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold flex items-center gap-2 transition-all ${
                        formData.serviceRequired === service
                          ? 'border-[#240B36] bg-[#240B36] text-[#FAF7F2]'
                          : 'border-[#190B28]/15 bg-[#FAF7F2] text-[#190B28] hover:border-[#190B28]/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceRequired"
                        value={service}
                        checked={formData.serviceRequired === service}
                        onChange={() => setFormData({ ...formData, serviceRequired: service })}
                        className="sr-only"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="block text-xs font-bold uppercase tracking-wider text-[#190B28] mb-2">
                  Project Description & Product Details <span className="text-[#FF5A36]">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) => {
                    setFormData({ ...formData, projectDescription: e.target.value });
                    if (errors.projectDescription) setErrors({ ...errors, projectDescription: undefined });
                  }}
                  placeholder="Describe your product (e.g. 12oz canned sparkling prebiotic tea), your target market, and the aesthetic or visual theme you want to explore..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#190B28] placeholder-[#190B28]/40 focus:outline-none transition-colors ${
                    errors.projectDescription
                      ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                      : 'border-[#190B28]/20 focus:border-[#240B36]'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.projectDescription}</span>
                  </p>
                )}
              </div>

              {/* Checkbox for Free Sample Interest */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sampleInterest"
                  checked={formData.sampleInterest}
                  onChange={(e) => setFormData({ ...formData, sampleInterest: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#240B36] border-[#190B28]/20 focus:ring-[#240B36]"
                />
                <label htmlFor="sampleInterest" className="text-xs text-[#190B28]/80 leading-normal">
                  Check to evaluate our brand for a <strong>complimentary sample ad creative</strong> (1 per verified brand).
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto py-4 px-10 text-sm font-bold text-[#FAF7F2] bg-[#240B36] hover:bg-[#381254] active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Brand Inquiry</span>
                  <Send className="w-4 h-4 text-[#FF5A36]" />
                </button>

                <p className="text-xs text-[#190B28]/60">
                  Response within 24 business hours. No spam, ever.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
