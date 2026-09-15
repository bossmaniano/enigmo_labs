import type { ContactFormData, ContactField } from './types';

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
