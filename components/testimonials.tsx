'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/data';

const testimonials = [...TESTIMONIALS, ...TESTIMONIALS];

export const Testimonials: FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header: Fully Isolated Above Cards */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-20 bg-slate-950/90 py-4 backdrop-blur-sm">
          <span className="px-3 py-1 text-xs font-semibold tracking-widest text-sky-400 uppercase rounded-full bg-sky-500/10 border border-sky-500/20 inline-block mb-3">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Aligned <span className="text-sky-400">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3">
            Real results from organizations transforming their operations with our engineering expertise.
          </p>
        </div>

        {/* Mask Gradient Container - Fades out cards at subheading threshold */}
        <div className="relative z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_60px,black_calc(100%-60px),transparent_100%)]">
          {/* Infinite Loop Marquee Animation with Framer Motion */}
          <motion.div
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-white/10 bg-slate-900/80 p-7 flex flex-col justify-between cursor-pointer transition-colors hover:border-sky-500/40 min-h-[200px]"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 32px rgba(14, 165, 233, 0.3)',
                }}
              >
                <blockquote className="text-slate-300 text-base leading-relaxed mb-5 flex-1 overflow-hidden italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-slate-800/60">
                  <cite className="font-bold text-white not-italic">
                    {item.author}
                  </cite>
                  <span className="text-sm text-sky-400 font-mono">
                    {item.company}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};