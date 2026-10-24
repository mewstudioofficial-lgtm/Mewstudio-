export type PortfolioCategory =
  | 'All'
  | 'Beverage Advertising'
  | 'Snack & Food Advertising'
  | 'Wellness & Functional Nutrition';

export interface PortfolioItem {
  id: string;
  title: string;
  brand: string;
  category: PortfolioCategory;
  headline: string;
  shortDescription: string;
  creativeDirection: string;
  packagingDetails: string[];
  format: string;
  aspectRatio: 'vertical' | 'landscape' | 'square';
  aspectClass: string;
  market: string;
  imageUrl: string;
  themeColor: {
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    border: string;
  };
  highlightStats?: {
    value: string;
    label: string;
  };
  deliverables: string[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  bestFor: string;
  badgeText: string;
}

export interface ContactFormData {
  fullName: string;
  brandName: string;
  businessEmail: string;
  brandWebsite: string;
  serviceRequired: string;
  projectDescription: string;
  sampleInterest: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
