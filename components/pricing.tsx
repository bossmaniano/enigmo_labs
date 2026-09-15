'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { PRICING_TIERS } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

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
          className={`relative flex flex-col rounded-xl border p-8 transition-all duration-300 ${
            tier.popular
              ? 'border-2 border-egyptian-blue bg-egyptian-blue/5'
              : 'border-white/10 bg-charcoal-light'
          }`}
        >
          {tier.popular && (
            <div className="mb-5">
              <span className="inline-block px-3 py-1 text-[10px] font-bold text-white bg-egyptian-blue rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-5 flex items-center gap-3">
            <tier.icon className="h-7 w-7 text-egyptian-blue" />
            <div>
              <h3 className="text-xl font-bold text-white">{tier.title}</h3>
              <span className="text-xs font-medium text-gray-400">
                {tier.category}
              </span>
            </div>
          </div>

          <p className="mb-5 text-sm text-gray-300">{tier.subtitle}</p>
          <div className="mb-6 text-2xl font-extrabold text-white">
            {tier.price}
          </div>

          <ul className="mb-8 space-y-2.5 flex-1">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-gray-300"
              >
                <span className="mt-0.5 text-egyptian-blue">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={`mt-auto w-full rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
              tier.popular
                ? 'bg-egyptian-blue text-black hover:opacity-90'
                : 'border border-white/20 text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue'
            }`}
          >
            {tier.cta}
          </button>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);
