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
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header: Fully Isolated Above Cards */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4 relative z-20">
          <span className="px-3 py-1 text-xs font-semibold tracking-widest text-sky-400 uppercase rounded-full bg-sky-500/10 border border-sky-500/20 inline-block">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Aligned <span className="text-sky-400">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto pt-1">
            Real results from organizations transforming their operations with our engineering expertise.
          </p>
        </div>

        {/* Testimonial Marquee Grid: Positioned Below with Relative Index */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 relative z-10 pt-4">
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
                      className="rounded-xl border border-white/10 bg-slate-900/80 p-7 flex flex-col justify-between cursor-pointer transition-colors hover:border-sky-500/40 min-h-[200px]"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 32px rgba(14, 165, 233, 0.3)',
                      }}
                    >
                      <blockquote className="text-slate-300 text-base leading-relaxed mb-5 flex-1 overflow-hidden italic">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-slate-800/60">
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
