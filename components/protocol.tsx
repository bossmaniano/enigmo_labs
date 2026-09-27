'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { PROTOCOL_STEPS } from '@/lib/data';

export const Protocol: FC = () => (
  <section
    id="protocol"
    className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal"
    aria-labelledby="protocol-title"
  >
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          id="protocol-title"
          className="text-3xl font-extrabold text-white sm:text-4xl"
        >
          The Enigmo Protocol
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Our systematic approach to transforming complexity into clarity.
        </p>
      </motion.div>

      <div className="space-y-6">
        {PROTOCOL_STEPS.map((step, index) => {
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.18 }}
              viewport={{ once: true }}
              className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 gap-4 transition-all hover:border-sky-500/40"
            >
              {/* Text Container */}
              <div className="flex-1 space-y-1 text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>

              {/* Icon Container (Flex-shrink-0 prevents icon collapsing/distorting) */}
              <motion.div
                className="flex-shrink-0 flex items-center justify-start sm:justify-center w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20"
                animate={
                  step.title === 'Analyze'
                    ? { rotate: 360 }
                    : step.title === 'Architect'
                      ? { scale: [1, 1.12, 1] }
                      : { opacity: [1, 0.45, 1] }
                }
                transition={
                  step.title === 'Analyze'
                    ? {
                        rotate: {
                          duration: 8,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                      }
                    : step.title === 'Architect'
                      ? {
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <step.icon className="w-6 h-6" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
