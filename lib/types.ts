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
