'use client';

import { useEffect, useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HERO_TERMS } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

export const Hero: FC = () => {
  const [termIndex, setTermIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTermIndex((prev) => (prev + 1) % HERO_TERMS.length),
      3200,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,#1a2340_0%,#0a0f1a_50%,#050914_100%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute -top-[20%] -right-[10%] -z-10 h-[70vw] w-[70vw] max-h-[700px] max-w-[700px] rounded-full blur-[120px] bg-gradient-to-br from-egyptian-blue/30 to-purple-600/20 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.6 }}
        className="absolute -bottom-[30%] -left-[10%] -z-10 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] rounded-full blur-[100px] bg-gradient-to-tr from-egyptian-blue/20 to-indigo-600/15 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/60 tracking-[0.2em] uppercase"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-egyptian-blue" />
          Based in Nairobi, Kenya
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-4xl text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
        >
          <span className="block text-white/95">Deciphering Complexity.</span>
          <span className="block mt-2 text-white/95">
            Engineering{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={HERO_TERMS[termIndex]}
                initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -20, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="bg-gradient-to-r from-egyptian-blue to-egyptian-blue-light bg-clip-text text-transparent"
              >
                {HERO_TERMS[termIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mb-12 max-w-xl text-base text-white/45 sm:text-lg leading-relaxed"
        >
          We transform fragmented data into elegant, high-performance systems
          through Web Engineering, Management Systems, AI Agents, and Automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <Button
            variant="primary"
            size="lg"
            icon={
              <motion.span
                animate={{ x: 3 }}
                transition={{
                  x: { repeat: Infinity, repeatType: 'reverse', duration: 1.4 },
                }}
              >
                →
              </motion.span>
            }
            onClick={() => scrollToSection('contact')}
          >
            Initialize Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
