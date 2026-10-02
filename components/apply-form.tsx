'use client';

import {
  useId,
  useState,
  type FC,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Link2,
  Loader2,
  MessageCircle,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Section } from '@/components/ui/section';
import {
  CONTACT_INFO,
  SME_INTAKE_STEPS,
  SME_PROGRAM,
  SME_TERMS,
} from '@/lib/data';
import {
  allTermsAccepted,
  classNames,
  validateSmeApplication,
} from '@/lib/utils';
import type {
  SmeApplication,
  SmeApplicationField,
  SmeApplicationStatus,
} from '@/lib/types';

const EMPTY_FORM: SmeApplication = {
  businessName: '',
  industry: '',
  contactPerson: '',
  whatsapp: '',
  socialLink: '',
  terms: {
    setupFee: false,
    assetDelivery: false,
    testimonial: false,
  },
};

const INPUT_CLASSES =
  'w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 transition-all duration-300 hover:border-white/20 focus:border-egyptian-blue focus:outline-none focus:ring-2 focus:ring-egyptian-blue/40 focus:shadow-[0_0_20px_rgba(16,52,166,0.25)]';

interface TextFieldConfig {
  readonly name: SmeApplicationField;
  readonly label: string;
  readonly type: 'text' | 'tel' | 'url';
  readonly placeholder: string;
  readonly required: boolean;
  readonly icon: typeof Building2;
  readonly autoComplete: string;
  readonly inputMode?: 'text' | 'tel' | 'url';
}

const TEXT_FIELDS: readonly TextFieldConfig[] = [
  {
    name: 'businessName',
    label: 'Business Name',
    type: 'text',
    placeholder: 'e.g. Safari Styles Ltd',
    required: true,
    icon: Building2,
    autoComplete: 'organization',
  },
  {
    name: 'industry',
    label: 'Industry / Niche',
    type: 'text',
    placeholder: 'e.g. Fashion Retail',
    required: true,
    icon: Briefcase,
    autoComplete: 'organization-title',
  },
  {
    name: 'contactPerson',
    label: 'Contact Person Name',
    type: 'text',
    placeholder: 'e.g. Amina Wanjiru',
    required: true,
    icon: User,
    autoComplete: 'name',
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp Phone Number',
    type: 'tel',
    placeholder: '+254 7xx xxx xxx',
    required: true,
    icon: MessageCircle,
    autoComplete: 'tel',
    inputMode: 'tel',
  },
  {
    name: 'socialLink',
    label: 'Current Social Media / Web Link',
    type: 'url',
    placeholder: 'https://facebook.com/yourbusiness (optional)',
    required: false,
    icon: Link2,
    autoComplete: 'url',
    inputMode: 'url',
  },
];

const BriefRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/5 py-3 last:border-b-0">
    <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
      {label}
    </span>
    <span className="text-right text-sm font-semibold text-white">{value}</span>
  </div>
);

const TextField: FC<{
  readonly field: TextFieldConfig;
  readonly value: string;
  readonly error?: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ field, value, error, onChange }) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const Icon = field.icon;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gray-400"
      >
        <Icon className="h-3.5 w-3.5 text-egyptian-blue" aria-hidden="true" />
        <span>
          &gt; {field.label}
          {field.required ? (
            <span className="ml-1 text-amber-400" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="ml-1 text-gray-600">(optional)</span>
          )}
        </span>
      </label>
      <input
        id={inputId}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        inputMode={field.inputMode}
        required={field.required}
        aria-required={field.required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={classNames(
          INPUT_CLASSES,
          error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/40',
        )}
      />
      {error && (
        <p id={errorId} className="mt-1.5 font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export const ApplyForm: FC = () => {
  const [formData, setFormData] = useState<SmeApplication>(EMPTY_FORM);
  const [status, setStatus] = useState<SmeApplicationStatus>('idle');
  const [errors, setErrors] = useState<
    Partial<Record<SmeApplicationField, string>>
  >({});
  const [showTermsError, setShowTermsError] = useState(false);
  const [serverError, setServerError] = useState('');
  const termsGroupId = useId();

  const termsReady = allTermsAccepted(formData.terms);
  const isSubmitting = status === 'submitting';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      const term = name as keyof SmeApplication['terms'];
      setFormData((prev) => ({
        ...prev,
        terms: { ...prev.terms, [term]: checked },
      }));
      if (showTermsError) setShowTermsError(false);
      return;
    }

    const field = name as SmeApplicationField;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');

    const result = validateSmeApplication(formData);
    setErrors(result.errors);
    setShowTermsError(result.missingTerms.length > 0);

    if (!result.valid) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: { success?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ??
            'Transmission failed. Please retry or WhatsApp us directly.',
        );
      }

      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Connection timeout. Please retry or WhatsApp us directly.',
      );
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrors({});
    setShowTermsError(false);
    setServerError('');
  };

  const renderSuccess = (): ReactNode => (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-8 text-center sm:p-12"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
      </motion.div>

      <h2 className="text-2xl font-bold text-white sm:text-3xl">
        Application Received!
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-gray-300">
        {SME_PROGRAM.successMessage}
      </p>

      <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
        {SME_INTAKE_STEPS.map((step, index) => (
          <div key={step} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 font-mono text-[11px] font-bold text-emerald-400">
              {index + 1}
            </span>
            <p className="text-sm text-gray-400">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-white/20 px-6 py-3 font-mono text-sm font-bold tracking-widest text-white transition-colors hover:border-emerald-400/50 hover:bg-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          [ SUBMIT ANOTHER ]
        </button>
        <Link
          href="/#pricing"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-bold tracking-widest text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue"
        >
          VIEW FULL PRICING <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <Section id="intake" variant="dark" className="bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
          {SME_PROGRAM.sponsoredSlots} Sponsored Slots Open
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
          {SME_PROGRAM.name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          <span className="text-gray-500 line-through">
            {SME_PROGRAM.standardEngineeringFee}
          </span>{' '}
          engineering fee waived for {SME_PROGRAM.sponsoredSlots} selected Kenyan
          businesses. Only the mandatory {SME_PROGRAM.setupFee} infrastructure
          setup fee applies.
        </p>
      </motion.div>

      {status === 'success' ? (
        <div className="mx-auto mt-14 max-w-2xl">{renderSuccess()}</div>
      ) : (
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-charcoal-light p-7">
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
                Offer Structure
              </h2>
              <div className="mt-4">
                <BriefRow
                  label="Standard Fee"
                  value={SME_PROGRAM.standardEngineeringFee}
                />
                <BriefRow
                  label="Your Labor"
                  value={SME_PROGRAM.sponsoredEngineeringFee}
                />
                <BriefRow
                  label="Setup Fee"
                  value={SME_PROGRAM.setupFee}
                />
                <BriefRow label="Build SLA" value={`${SME_PROGRAM.buildSlaDays} days`} />
                <BriefRow
                  label="Response"
                  value={`Within ${SME_PROGRAM.responseSlaHours}h via WhatsApp`}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-charcoal-light p-7">
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
                Selection Path
              </h2>
              <ol className="mt-5 space-y-4">
                {SME_INTAKE_STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-egyptian-blue/40 bg-egyptian-blue/10 font-mono text-[11px] font-bold text-egyptian-blue-light">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-400">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-egyptian-blue/30 bg-egyptian-blue/5 p-6">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-egyptian-blue-light"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-300">
                {SME_PROGRAM.setupFee} covers your .co.ke domain, 1-year hosting,
                SSL certificate, and DNS setup. Engineering labor is fully
                sponsored.
              </p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-charcoal-light p-7 sm:p-9"
          >
            <h2 className="font-mono text-lg font-bold uppercase tracking-[0.2em] text-white">
              Intake Application
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Fields marked <span className="text-amber-400">*</span> are
              required.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <div aria-live="polite">
                {serverError && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 font-mono text-sm text-red-400">
                    ⚠ {serverError}
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {TEXT_FIELDS.map((field) => (
                  <TextField
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    error={errors[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>

              <fieldset
                className="space-y-3 border-t border-white/5 pt-6"
                aria-describedby={showTermsError ? `${termsGroupId}-error` : undefined}
              >
                <legend className="font-mono text-xs uppercase tracking-wider text-gray-400">
                  &gt; Mandatory Qualification Terms
                </legend>

                {SME_TERMS.map((term) => (
                  <label
                    key={term.id}
                    className={classNames(
                      'flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-egyptian-blue/40 focus-within:ring-2 focus-within:ring-egyptian-blue/40',
                      formData.terms[term.id] &&
                        'border-egyptian-blue/60 bg-egyptian-blue/5',
                    )}
                  >
                    <input
                      type="checkbox"
                      name={term.id}
                      checked={formData.terms[term.id]}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-egyptian-blue"
                    />
                    <span className="text-sm text-gray-300">{term.label}</span>
                  </label>
                ))}

                {showTermsError && (
                  <p
                    id={`${termsGroupId}-error`}
                    className="font-mono text-xs text-red-400"
                    role="alert"
                  >
                    All three terms must be accepted before submitting.
                  </p>
                )}
              </fieldset>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={!termsReady || isSubmitting}
                  aria-describedby="submit-hint"
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-egyptian-blue to-egyptian-blue-dark py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue-light/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      TRANSMITTING APPLICATION...
                    </>
                  ) : (
                    <>
                      CLAIM SPONSORED SLOT <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p
                  id="submit-hint"
                  className="flex items-center justify-center gap-2 text-center font-mono text-xs text-gray-500"
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {termsReady
                    ? 'No payment is taken now.'
                    : 'Accept all three terms to enable submission.'}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <p className="mx-auto mt-14 max-w-3xl text-center text-xs text-gray-500">
        Questions before applying? WhatsApp{' '}
        <a
          href={`https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-egyptian-blue hover:underline"
        >
          {CONTACT_INFO.phone}
        </a>{' '}
        or email{' '}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-egyptian-blue hover:underline"
        >
          {CONTACT_INFO.email}
        </a>
        .
      </p>
    </Section>
  );
};
