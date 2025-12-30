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
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SiteData {
  name: string;
  abbreviation: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
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

// Database Types
export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  duration: string;
  created_at?: string;
}

// Icon Map Type
export type IconName = 'Zap' | 'Activity' | 'Sprout' | 'Cpu' | 'Shield' | 'Lightbulb' | 'Target' | 'Scale';
