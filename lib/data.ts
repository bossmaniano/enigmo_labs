import {
  Brain,
  Globe,
  Database,
  Zap,
  Search,
  BarChart3,
  ShoppingCart,
  FileText,
  Bot,
  Package,
} from 'lucide-react';
import type {
  Capability,
  ProtocolStep,
  PricingTier,
  SmeProgramTerm,
  Testimonial,
  PortfolioItem,
  NavItem,
} from './types';

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_TERMS: readonly string[] = [
  'Web Engineering',
  'AI Agents',
  'Intelligent Memory',
  'Automation',
  'Systems',
];

export const CORE_CAPABILITIES: readonly Capability[] = [
  {
    id: 'web-engineering',
    title: 'Web Engineering & Custom Software',
    description:
      'High-conversion storefronts, admin panels, and bespoke SaaS platforms built on modern, type-safe stacks.',
    icon: Globe,
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Automation',
    description:
      'Specialized RAG-powered cognitive agents and autonomous workflows that run your organisation 24/7.',
    icon: Bot,
  },
  {
    id: 'memory-systems',
    title: 'Intelligent Memory Systems',
    description:
      'Private knowledge bases and Retrieval-Augmented Generation infrastructure grounded in your company data.',
    icon: Database,
  },
];

export const PROTOCOL_STEPS: readonly ProtocolStep[] = [
  {
    id: 'analyze',
    title: 'Analyze',
    description: 'We decipher organisational bottlenecks and data enigmas.',
    icon: Search,
  },
  {
    id: 'architect',
    title: 'Architect',
    description:
      'We design a custom "Memory + Logic" stack tailored to your vertical.',
    icon: Database,
  },
  {
    id: 'automate',
    title: 'Automate',
    description: 'We deploy systems and AI agents for 24/7 autonomous execution.',
    icon: Zap,
  },
];

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    category: 'Web',
    subtitle: 'High-Performance Web Engineering.',
    price: 'KSh 0 Engineering Labor',
    priceWas: 'KSh 35,000',
    priceNote: '+ KSh 6,000 mandatory 1-Yr Infrastructure Setup Fee',
    badge: '🔥 12 SPONSORED SLOTS OPEN',
    featured: true,
    icon: Globe,
    features: [
      'Custom UI/UX Design',
      'SEO & Global Edge Hosting',
      '1-Yr .co.ke Domain, SSL & DNS Setup',
      '7-Day Build SLA After Asset Delivery',
    ],
    cta: 'Apply for Sponsored Slot',
    ctaHref: '/apply',
  },
  {
    id: 'intelligence',
    title: 'Intelligence',
    category: 'Systems',
    subtitle: 'Custom Management Systems.',
    price: 'KSh 100,000',
    icon: Database,
    features: [
      'Everything in Foundations',
      'Full Supabase/PostgreSQL Backend',
      'Multi-role Admin & Staff Portals',
      'WhatsApp & M-Pesa API Integrations',
    ],
    cta: 'Deploy Ecosystem',
    popular: true,
  },
  {
    id: 'enigma',
    title: 'Enigma',
    category: 'AI',
    subtitle: 'AI Agent Orchestration.',
    price: 'KSh 500,000',
    icon: Brain,
    features: [
      'Everything in Intelligence',
      'RAG-powered Private AI Agents',
      'Autonomous Workflow Orchestration',
      'Private Model Hosting',
    ],
    cta: 'Orchestrate Agents',
  },
  {
    id: 'bespoke',
    title: 'Bespoke',
    category: 'Custom',
    subtitle: 'Specialized Engineering Solutions.',
    price: 'CUSTOM PROTOCOL',
    icon: Package,
    features: [
      'Bespoke Systems Architecture',
      'Legacy Data Modernization',
      'Dedicated Engineering Consultation',
      'Unlimited Scaling',
    ],
    cta: 'Initialize Consultation',
  },
];

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: 'sisitna',
    title: 'Sisitna Schools — Exam Management',
    description:
      'End-to-end digitisation of a multi-campus examination system, replacing paper-based workflows with real-time results processing.',
    category: 'Management Systems',
    tags: ['Next.js', 'Supabase', 'PostgreSQL'],
    result: 'Processing time cut from weeks to minutes; 99.9% uptime.',
    icon: FileText,
  },
  {
    id: 'logistics-hub',
    title: 'Logistics Hub — Automation',
    description:
      'Autonomous order-processing pipeline integrating M-Pesa payments, KEBS manifests, and real-time driver dispatch.',
    category: 'Automation',
    tags: ['Python', 'AI Agents', 'Webhooks'],
    result: 'Order throughput up 70%; manual effort reduced to zero.',
    icon: BarChart3,
  },
  {
    id: 'osma-ai',
    title: 'Osma AI — RAG Knowledge Base',
    description:
      'Private, retrieval-augmented research assistant grounded in proprietary datasets and hosted on private model endpoints.',
    category: 'AI Agents',
    tags: ['RAG', 'LLM', 'Docker'],
    result: 'Research analysis accelerated by 300% with 99% accuracy.',
    icon: Bot,
  },
  {
    id: 'fintech-dashboard',
    title: 'Fintech Dashboard',
    description:
      'Type-safe transaction dashboard with role-based access, real-time balances, and audit trails.',
    category: 'Web Engineering',
    tags: ['TypeScript', 'Tailwind', 'Realtime'],
    result: 'Handles Black Friday traffic at 50k concurrent users.',
    icon: ShoppingCart,
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't-1',
    quote: 'The Enigmo Labs team digitized our entire examination process. What used to take weeks now happens in real-time.',
    author: 'Registrar',
    company: 'Academic Institution',
  },
  {
    id: 't-2',
    quote: 'Enigmo Labs transformed our messy student data into a precision-engineered management system that just works.',
    author: 'Principal',
    company: 'Tassia Schools',
  },
  {
    id: 't-3',
    quote: 'Their logistics automation cut our order processing time by 70%. Absolutely game-changing for our operations.',
    author: 'Operations Manager',
    company: 'Logistics Hub',
  },
  {
    id: 't-4',
    quote: 'The financial reporting system they built gives us instant insights across all our branches.',
    author: 'Finance Director',
    company: 'Retail Chain',
  },
  {
    id: 't-5',
    quote: 'Our inventory management is now fully automated with real-time dashboards for decision making.',
    author: 'CEO',
    company: 'Retail Chain',
  },
  {
    id: 't-6',
    quote: 'The RAG-powered research assistant accelerated our data analysis by 300%.',
    author: 'Research Lead',
    company: 'Tech Startup',
  },
  {
    id: 't-7',
    quote: 'Customer support tickets reduced by 60% after deploying their AI agent orchestration.',
    author: 'Customer Success Head',
    company: 'SaaS Platform',
  },
  {
    id: 't-8',
    quote: 'Private AI agents handling our document processing with 99% accuracy.',
    author: 'Data Scientist',
    company: 'AI Labs',
  },
  {
    id: 't-9',
    quote: "Enigmo's RAG architecture powers our entire knowledge base with unprecedented accuracy.",
    author: 'CTO',
    company: 'Osma AI',
  },
  {
    id: 't-10',
    quote: 'The autonomous workflow system saved us 40 hours per week in manual tasks.',
    author: 'Managing Director',
    company: 'Consulting Firm',
  },
  {
    id: 't-11',
    quote: 'Our new website converts 3x better than the old one. Clean, fast, and effective.',
    author: 'Marketing Head',
    company: 'E-commerce',
  },
  {
    id: 't-12',
    quote: 'The fintech dashboard they designed processes transactions seamlessly with beautiful UX.',
    author: 'Founder',
    company: 'Fintech Startup',
  },
  {
    id: 't-13',
    quote: 'Creative direction and execution perfectly captured our brand essence.',
    author: 'Creative Director',
    company: 'Design Studio',
  },
  {
    id: 't-14',
    quote: 'Our e-commerce platform now handles Black Friday traffic without breaking a sweat.',
    author: 'E-commerce Owner',
    company: 'Online Store',
  },
  {
    id: 't-15',
    quote: 'Migration to their modern stack was seamless with zero downtime.',
    author: 'ICT Consultant',
    company: 'Government Agency',
  },
  {
    id: 't-16',
    quote: 'Product cycles are 50% faster with their automation layer in place.',
    author: 'Product Manager',
    company: 'Tech Company',
  },
  {
    id: 't-17',
    quote: 'Sales lead qualification is now fully automated with instant notifications.',
    author: 'Sales Lead',
    company: 'B2B Services',
  },
  {
    id: 't-18',
    quote: 'Our startup scaled from 0 to 10k users with their infrastructure.',
    author: 'Startup Founder',
    company: 'EdTech',
  },
  {
    id: 't-19',
    quote: 'Branch operations synchronized automatically across all locations.',
    author: 'Operations Lead',
    company: 'Banking',
  },
  {
    id: 't-20',
    quote: 'Report generation that took days now completes in minutes.',
    author: 'Branch Manager',
    company: 'Microfinance',
  },
];

export const CONTACT_INFO = {
  email: 'enigmolabs@gmail.com',
  phone: '+254 768 810 657',
  location: 'Nairobi, Kenya',
} as const;

export const SME_PROGRAM = {
  name: 'Q4 2026 SME Digital Acceleration Program',
  sponsoredSlots: 12,
  standardEngineeringFee: 'KSh 35,000',
  sponsoredEngineeringFee: 'KSh 0 Engineering Labor',
  setupFee: 'KSh 6,000',
  buildSlaDays: 7,
  responseSlaHours: 24,
  intakeHref: '/apply',
  successMessage:
    'Application Received! Our founding team will review your application and reach out via WhatsApp within 24 hours.',
} as const;

export const ANNOUNCEMENT_TEXT = `⚡ ${SME_PROGRAM.name}: ${SME_PROGRAM.standardEngineeringFee} Engineering Fee Waived for ${SME_PROGRAM.sponsoredSlots} Selected Kenyan Businesses.` as const;

/** Every entry must be accepted before an application can be transmitted. */
export const SME_TERMS: readonly SmeProgramTerm[] = [
  {
    id: 'setupFee',
    label: `I agree to pay the mandatory ${SME_PROGRAM.setupFee} setup fee (.co.ke domain, 1-year hosting, SSL, and DNS setup) upon selection.`,
  },
  {
    id: 'assetDelivery',
    label: 'I commit to providing high-resolution logos, text copy, and product/service images within 7 business days.',
  },
  {
    id: 'testimonial',
    label: 'I agree to provide a short video or written testimonial after site launch to support Enigmo Labs research.',
  },
];

export const SME_INTAKE_STEPS: readonly string[] = [
  'Submit the intake form — no payment is taken now.',
  `We review qualification and reply via WhatsApp within ${SME_PROGRAM.responseSlaHours} hours.`,
  `On selection, the ${SME_PROGRAM.setupFee} setup fee is invoiced and the build clock starts once your assets arrive.`,
] as const;

export const TERMINAL_LINES: readonly string[] = [
  '[SYSTEM]: PACKET ENCRYPTED AND DISPATCHED.',
  '[SYSTEM]: ARCHITECT NOTIFIED (enigmolabs@gmail.com).',
  '[SYSTEM]: CONFIRMATION SENT TO CLIENT.',
  '[SYSTEM]: STATUS: STANDBY FOR CONTACT WITHIN 12H.',
] as const;
