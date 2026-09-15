'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { CORE_CAPABILITIES } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Services: FC = () => (
  <Section id="solutions" variant="dark" className="bg-charcoal">
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="text-center"
    >
      <motion.h2
        variants={item}
        className="text-3xl font-extrabold text-white sm:text-4xl"
      >
        Core Solutions
      </motion.h2>
      <motion.p
        variants={item}
        className="mx-auto mt-4 max-w-2xl text-gray-400"
      >
        The engineering paths we walk to transform complexity into clarity.
      </motion.p>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {CORE_CAPABILITIES.map((cap) => (
        <motion.div key={cap.id} variants={item}>
          <Card className="flex h-full flex-col text-center">
            <div className="mb-6 flex justify-center">
              <cap.icon className="h-10 w-10 text-egyptian-blue" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{cap.title}</h3>
            <p className="mb-6 flex-1 text-sm text-gray-300 leading-relaxed">
              {cap.description}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-auto"
              onClick={() => scrollToSection('contact')}
            >
              Initialize Consultation
            </Button>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);
