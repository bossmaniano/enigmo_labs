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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-egyptian-blue/30 bg-egyptian-blue/10 px-4 py-2 mb-6">
            <span className="text-xs font-mono text-egyptian-blue uppercase tracking-wider">
              Social Proof
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Aligned <span className="text-egyptian-blue">Testimonials</span>
          </h2>
          <p className="mt-4 text-gray-300 text-lg max-w-3xl mx-auto">
            Real results from organizations transforming their operations with
            our engineering expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((column, columnIndex) => {
            const set = [...column, ...column];
            return (
              <div
                key={columnIndex}
                data-marquee-column
                className="relative h-[700px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
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
                      className="rounded-xl border border-white/10 bg-charcoal-light p-7 flex flex-col justify-between cursor-pointer transition-colors hover:border-egyptian-blue/40"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 32px rgba(16,52,166,0.3)',
                      }}
                    >
                      <blockquote className="text-gray-200 text-lg leading-relaxed mb-5 flex-1">
                        “{t.quote}”
                      </blockquote>
                      <div className="flex flex-col gap-1">
                        <cite className="font-bold text-white not-italic">
                          {t.author}
                        </cite>
                        <span className="text-sm text-egyptian-blue font-mono">
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
