'use client';

import {
  useState,
  useEffect,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { PRICING_TIERS, TERMINAL_LINES, CONTACT_INFO } from '@/lib/data';
import { validateContactForm } from '@/lib/utils';
import { type ContactFormData, type ContactStatus } from '@/lib/types';

type FieldName = keyof ContactFormData;

interface FieldConfig {
  readonly name: FieldName;
  readonly label: string;
  readonly type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  readonly placeholder?: string;
  readonly options?: readonly string[];
}

const FIELDS: readonly FieldConfig[] = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name...' },
  { name: 'email', label: 'Official Email', type: 'email', placeholder: 'you@company.com' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+254...' },
  { name: 'protocol', label: 'Protocol Tier', type: 'select', options: PRICING_TIERS.map((t) => t.title) },
  { name: 'brief', label: 'Technical Brief', type: 'textarea', placeholder: 'Describe your project requirements...' },
];

const INPUT_CLASSES =
  'w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue';

export const ContactForm: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    protocol: '',
    brief: '',
  });
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [serverError, setServerError] = useState('');
  const [displayedLines, setDisplayedLines] = useState(0);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FieldName]) {
      setErrors((prev) => ({ ...prev, [name as FieldName]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');

    const result = validateContactForm(formData);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: { status: ContactStatus; message?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Submission failed.');
      }

      setStatus('success');
      setDisplayedLines(0);
      setFormData({ name: '', email: '', phone: '', protocol: '', brief: '' });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Connection timeout. Please retry or contact enigmolabs@gmail.com directly.',
      );
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success' && displayedLines < TERMINAL_LINES.length) {
      const timer = setTimeout(() => setDisplayedLines((p) => p + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [status, displayedLines]);

  const reset = () => {
    setStatus('idle');
    setDisplayedLines(0);
    setServerError('');
  };

  const renderField = (field: FieldConfig) => {
    const common = {
      name: field.name,
      value: formData[field.name],
      onChange: handleChange,
      className: INPUT_CLASSES,
      'aria-invalid': Boolean(errors[field.name]),
      'aria-describedby': errors[field.name] ? `${field.name}-error` : undefined,
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...common} rows={5} placeholder={field.placeholder} required />;
      case 'select':
        return (
          <select {...common} required>
            <option value="" className="bg-black text-white">
              Select Protocol Type
            </option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt} className="bg-black text-white">
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return <input type={field.type} {...common} placeholder={field.placeholder} required />;
    }
  };

  if (status === 'success') {
    return (
      <Section id="contact" variant="dark" className="bg-black">
        <div className="flex flex-col items-center justify-center min-h-[320px] space-y-6">
          <div className="space-y-3 text-center max-w-md">
            {TERMINAL_LINES.slice(0, displayedLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-green-400 font-mono text-sm"
              >
                {line}
              </motion.div>
            ))}
            {displayedLines < TERMINAL_LINES.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-400 font-mono text-sm"
              >
                ▊
              </motion.span>
            )}
          </div>
          <Button variant="terminal" size="sm" onClick={reset}>
            [ RESET TERMINAL ]
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contact" variant="dark" className="bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white font-mono mb-3">
          Contact Terminal
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto font-mono">
          Initialize your project protocol through our secure engineering
          interface.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {serverError && (
          <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg font-mono">
            ⚠ {serverError}
          </div>
        )}

        <div className="space-y-5">
          {FIELDS.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider"
              >
                &gt; {field.label}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p
                  id={`${field.name}-error`}
                  className="mt-1.5 text-xs text-red-400 font-mono"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Button type="submit" variant="terminal" loading={status === 'sending'} disabled={status === 'sending'}>
            [ INITIALIZE PROTOCOL ]
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500">
          We will contact you at{' '}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-egyptian-blue hover:underline"
          >
            {CONTACT_INFO.email}
          </a>{' '}
          within 12 business hours.
        </p>
      </form>
    </Section>
  );
};
