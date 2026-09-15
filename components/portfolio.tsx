'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { PORTFOLIO_ITEMS } from '@/lib/data';
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

export const Portfolio: FC = () => (
  <Section id="portfolio" variant="dark" className="bg-midnight">
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={item} className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Portfolio
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Selected systems we engineered — from AI agents to enterprise
          management platforms.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PORTFOLIO_ITEMS.map((project) => (
          <motion.div key={project.id} variants={item}>
            <Card className="flex h-full flex-col group">
              <div className="flex items-center justify-center mb-5">
                <project.icon className="h-9 w-9 text-egyptian-blue" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-egyptian-blue/70 uppercase tracking-wider mb-3">
                {project.category}
              </p>
              <p className="mb-4 flex-1 text-sm text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-white/5 pt-3">
                <p className="text-xs text-gray-400">
                  <span className="text-egyptian-blue">Result:</span>{' '}
                  {project.result}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="mt-12 text-center">
        <Button
          variant="outline"
          size="md"
          onClick={() => scrollToSection('contact')}
        >
          View All Work
        </Button>
      </motion.div>
    </motion.div>
  </Section>
);
