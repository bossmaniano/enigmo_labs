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
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              <motion.div
                className="flex-shrink-0"
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
                <step.icon className="h-12 w-12 text-egyptian-blue" />
              </motion.div>
              {index < PROTOCOL_STEPS.length - 1 && <hr className="border-white/10" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
