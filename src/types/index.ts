// Content Types
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface MentorshipContent {
  title: string;
  description: string;
  benefits: string[];
}

export interface AboutContent {
  mission: string;
  vision: string;
  preamble: string;
  values?: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SiteData {
  name: string;
  abbreviation: string;
  tagline: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  message: string;
  status: 'idle' | 'success' | 'error';
}

// Backend Content Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// Icon Map Type
export type IconName =
  | 'Zap'
  | 'Activity'
  | 'Sprout'
  | 'Cpu'
  | 'Shield'
  | 'Lightbulb'
  | 'Target'
  | 'Scale'
  | 'Calendar'
  | 'Users'
  | 'Video'
  | 'CreditCard';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  specialization: string;
  education: string;
  email: string;
  display_order: number;
}
