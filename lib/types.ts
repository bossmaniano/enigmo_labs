import type { ComponentType, SVGProps } from 'react';

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface Capability {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
}

export interface ProtocolStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
}

export interface PricingTier {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly subtitle: string;
  readonly price: string;
  readonly icon: Icon;
  readonly features: readonly string[];
  readonly cta: string;
  readonly popular?: boolean;
  readonly featured?: boolean;
  readonly badge?: string;
  readonly priceWas?: string;
  readonly priceNote?: string;
  readonly ctaHref?: string;
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly company: string;
}

export interface PortfolioItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly icon: Icon;
  readonly result: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export type ContactField = 'name' | 'email' | 'phone' | 'protocol' | 'brief';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  protocol: string;
  brief: string;
}

export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';

export type SmeApplicationField =
  | 'businessName'
  | 'industry'
  | 'contactPerson'
  | 'whatsapp'
  | 'socialLink';

export type SmeTermKey = 'setupFee' | 'assetDelivery' | 'testimonial';

export interface SmeProgramTerm {
  readonly id: SmeTermKey;
  readonly label: string;
}

export interface SmeApplicationTerms {
  setupFee: boolean;
  assetDelivery: boolean;
  testimonial: boolean;
}

export interface SmeApplication {
  businessName: string;
  industry: string;
  contactPerson: string;
  whatsapp: string;
  socialLink: string;
  terms: SmeApplicationTerms;
}

export type SmeApplicationStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';
