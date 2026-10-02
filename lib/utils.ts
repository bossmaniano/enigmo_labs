import type {
  ContactFormData,
  ContactField,
  SmeApplication,
  SmeApplicationField,
  SmeTermKey,
} from './types';

export const classNames = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export const scrollToSection = (href: string): void => {
  const id = href.startsWith('#') ? href.slice(1) : href;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: Partial<Record<ContactField, string>>;
}

export const validateContactForm = (
  data: ContactFormData,
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) errors.name = 'Full name is required.';
  if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'A valid work email is required.';
  }
  if (!data.phone.trim()) errors.phone = 'Phone number is required.';
  if (!data.protocol) errors.protocol = 'Please select a protocol tier.';
  if (!data.brief.trim() || data.brief.trim().length < 10) {
    errors.brief = 'Please provide a brief of at least 10 characters.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export const sanitizeContactPayload = (
  data: ContactFormData,
): Record<string, string> =>
  Object.fromEntries(
    (Object.keys(data) as ContactField[]).map((field) => [
      field,
      String(data[field]).trim().slice(0, 2000),
    ]),
  );

export const splitIntoColumns = <T>(items: readonly T[], columns: number): T[][] =>
  items.reduce((acc: T[][], item, index) => {
    const col = index % columns;
    if (!acc[col]) acc[col] = [];
    acc[col].push(item);
    return acc;
  }, Array.from({ length: columns }, () => []));

const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const allTermsAccepted = (
  terms: SmeApplication['terms'],
): boolean => Object.values(terms).every(Boolean);

export interface SmeValidationResult {
  readonly valid: boolean;
  readonly errors: Partial<Record<SmeApplicationField, string>>;
  readonly missingTerms: readonly SmeTermKey[];
}

/**
 * Mirrors the server-side guard in `app/api/apply/route.ts` so the applicant is
 * never told an application is valid only to be rejected by the API.
 */
export const validateSmeApplication = (
  data: SmeApplication,
): SmeValidationResult => {
  const errors: Partial<Record<SmeApplicationField, string>> = {};

  if (data.businessName.trim().length < 2) {
    errors.businessName = 'Business name is required.';
  }
  if (data.industry.trim().length < 2) {
    errors.industry = 'Industry or niche is required.';
  }
  if (data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name is required.';
  }

  const digits = data.whatsapp.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) {
    errors.whatsapp = 'Enter a valid WhatsApp number (e.g. +254 768 810 657).';
  }

  const socialLink = data.socialLink.trim();
  if (socialLink && !URL_REGEX.test(socialLink)) {
    errors.socialLink = 'Enter a valid link (e.g. https://facebook.com/yourbiz).';
  }

  const missingTerms = (Object.keys(data.terms) as SmeTermKey[]).filter(
    (key) => !data.terms[key],
  );

  return {
    valid: Object.keys(errors).length === 0 && missingTerms.length === 0,
    errors,
    missingTerms,
  };
};
