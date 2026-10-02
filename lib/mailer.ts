import nodemailer from 'nodemailer';

export type Transporter = ReturnType<typeof nodemailer.createTransport>;

export interface MailerConfig {
  readonly user: string;
  readonly pass: string;
}

/**
 * SMTP credentials are shared by every transactional route, so a missing
 * configuration is reported once here instead of per route.
 */
export const getMailerConfig = (): MailerConfig | null => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.error(
      'Gmail SMTP credentials not configured. Set SMTP_USER and SMTP_PASS.',
    );
    return null;
  }

  return { user, pass };
};

let transporter: Transporter | null = null;

const DEFAULT_HOST = 'smtp.gmail.com';
const DEFAULT_PORT = 465;

/**
 * Cached per runtime so we reuse one SMTP pool instead of handshaking per
 * request. Explicit timeouts guarantee a stalled relay surfaces as an error
 * response instead of holding the request open indefinitely.
 */
export const getTransporter = (config: MailerConfig): Transporter => {
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST || DEFAULT_HOST,
    port: Number(process.env.SMTP_PORT) || DEFAULT_PORT,
    secure: true,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return transporter;
};

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
