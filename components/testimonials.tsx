'use client';

import { useState, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/data';
import { splitIntoColumns } from '@/lib/utils';

export const Testimonials: FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const columns = splitIntoColumns(TESTIMONIALS, 3);

  useEffect(() => {
    const update = () => {
      document
        .querySelectorAll<HTMLElement>('[data-marquee-column]')
        .forEach((col) => {
          const paused = hovered !== null;
          col.style.animationPlayState = paused ? 'paused' : 'running';
        });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [hovered]);

  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-midnight overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Sticky/Solid Background */}
        <div className="sticky top-16 z-20 bg-slate-950/95 backdrop-blur-md py-6 border-b border-slate-800/50 text-center max-w-4xl mx-auto mb-10">
          <span className="px-3 py-1 text-xs font-semibold tracking-widest text-sky-400 uppercase rounded-full bg-sky-500/10 border border-sky-500/20 inline-block mb-2">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Aligned <span className="text-sky-400">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-2">
            Real results from organizations transforming their operations with our engineering expertise.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="h-16" /> {/* Spacer for sticky header */}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 relative z-0">
          {columns.map((column, columnIndex) => {
            const set = [...column, ...column];
            return (
              <div
                key={columnIndex}
                data-marquee-column
                className="relative h-[700px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]"
                style={{
                  animation: 'marquee 40s linear infinite',
                }}
                onMouseEnter={() => setHovered(columnIndex)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex flex-col gap-6">
                  {set.map((t, i) => (
                    <motion.div
                      key={`${t.id}-${i}`}
className="rounded-xl border border-white/10 bg-charcoal-light p-7 flex flex-col justify-between cursor-pointer transition-colors hover:border-sky-500/40 min-h-[200px]"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 32px rgba(14, 165, 233, 0.3)',
                      }}
                    >
                      <blockquote className="text-gray-200 text-base leading-relaxed mb-5 flex-1 overflow-hidden">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="flex flex-col gap-1 mt-auto">
                        <cite className="font-bold text-white not-italic">
                          {t.author}
                        </cite>
                        <span className="text-sm text-sky-400 font-mono">
                          {t.company}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  );
};
