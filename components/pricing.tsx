'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { PRICING_TIERS } from '@/lib/data';
import { classNames, scrollToSection } from '@/lib/utils';
import type { PricingTier } from '@/lib/types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const cardClasses = (tier: PricingTier): string =>
  classNames(
    'relative flex flex-col rounded-xl border p-8 transition-all duration-300',
    tier.featured
      ? 'border-2 border-amber-500/50 bg-amber-500/[0.04]'
      : tier.popular
        ? 'border-2 border-egyptian-blue bg-egyptian-blue/5'
        : 'border-white/10 bg-charcoal-light',
  );

const ctaClasses = (tier: PricingTier): string =>
  classNames(
    'mt-auto w-full rounded-lg py-3 text-center text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
    tier.featured
      ? 'bg-amber-400 text-black hover:bg-amber-300 focus-visible:ring-amber-400'
      : tier.popular
        ? 'bg-egyptian-blue text-black hover:opacity-90 focus-visible:ring-egyptian-blue/50'
        : 'border border-white/20 text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue focus-visible:ring-egyptian-blue/50',
  );

const PriceBlock: FC<{ tier: PricingTier }> = ({ tier }) => (
  <div className="mb-6">
    {tier.priceWas && (
      <span className="mr-2.5 text-sm font-medium text-gray-500 line-through">
        {tier.priceWas}
      </span>
    )}
    <div
      className={classNames(
        'text-2xl font-extrabold',
        tier.featured ? 'text-amber-300' : 'text-white',
      )}
    >
      {tier.price}
    </div>
    {tier.priceNote && (
      <p className="mt-2 text-xs font-mono leading-relaxed text-gray-400">
        {tier.priceNote}
      </p>
    )}
  </div>
);

export const Pricing: FC = () => (
  <Section id="pricing" variant="dark" className="bg-charcoal">
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="text-center"
    >
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        Protocol Pricing
      </h2>
      <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
        Choose your engineering path — from foundational websites to AI-powered
        automation.
      </p>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {PRICING_TIERS.map((tier, index) => (
        <motion.div
          key={tier.id}
          variants={item}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -8 }}
          className={cardClasses(tier)}
        >
          {tier.badge && (
            <div className="mb-5">
              <span className="inline-block px-3 py-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/40 rounded-full uppercase tracking-wider">
                {tier.badge}
              </span>
            </div>
          )}

          {!tier.badge && tier.popular && (
            <div className="mb-5">
              <span className="inline-block px-3 py-1 text-[10px] font-bold text-white bg-egyptian-blue rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-5 flex items-center gap-3">
            <tier.icon
              className={classNames(
                'h-7 w-7',
                tier.featured ? 'text-amber-400' : 'text-egyptian-blue',
              )}
            />
            <div>
              <h3 className="text-xl font-bold text-white">{tier.title}</h3>
              <span className="text-xs font-medium text-gray-400">
                {tier.category}
              </span>
            </div>
          </div>

          <p className="mb-5 text-sm text-gray-300">{tier.subtitle}</p>
          <PriceBlock tier={tier} />

          <ul className="mb-8 space-y-2.5 flex-1">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-gray-300"
              >
                <span
                  className={classNames(
                    'mt-0.5',
                    tier.featured ? 'text-amber-400' : 'text-egyptian-blue',
                  )}
                >
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {tier.ctaHref ? (
            <Link href={tier.ctaHref} className={ctaClasses(tier)}>
              {tier.cta}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={ctaClasses(tier)}
            >
              {tier.cta}
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  </Section>
);
