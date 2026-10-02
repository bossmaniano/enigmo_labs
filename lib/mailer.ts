import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export type Transporter = ReturnType<typeof nodemailer.createTransport>;

export interface OutboundMail {
  readonly to: readonly string[];
  readonly subject: string;
  readonly text: string;
  readonly html: string;
}

export type MailProvider = 'resend' | 'smtp';

export interface MailerConfig {
  readonly provider: MailProvider;
  readonly from: string;
  readonly user?: string;
  readonly pass?: string;
}

export class MailerNotConfiguredError extends Error {
  constructor() {
    super(
      'No mail provider configured. Set RESEND_API_KEY, or SMTP_USER and SMTP_PASS.',
    );
    this.name = 'MailerNotConfiguredError';
  }
}

/**
 * Resend reports the actionable reason in `name` (validation_error,
 * restriction_reached, ...) plus a status code, so both are preserved for
 * logs instead of collapsing into a generic failure.
 */
export class ResendDeliveryError extends Error {
  readonly resendName: string;
  readonly statusCode: number;

  constructor(error: {
    message?: string | null;
    name?: string | null;
    statusCode?: number | null;
  }) {
    super(error.message ?? 'Unknown Resend error');
    this.name = 'ResendDeliveryError';
    this.resendName = error.name ?? 'unknown';
    this.statusCode = error.statusCode ?? 0;
  }
}

const DEFAULT_SMTP_HOST = 'smtp.gmail.com';
const DEFAULT_SMTP_PORT = 465;
const DEFAULT_RESEND_FROM = 'Enigmo Labs Intake <onboarding@resend.dev>';

/**
 * Resend is preferred when available: it only needs an API key and is not
 * subject to Gmail rejecting logins from datacenter IPs. SMTP (Gmail) remains
 * the fallback so the existing configuration keeps working.
 */
export const getMailerConfig = (): MailerConfig | null => {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    return {
      provider: 'resend',
      from: process.env.RESEND_FROM || DEFAULT_RESEND_FROM,
    };
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return null;
  }

  return {
    provider: 'smtp',
    from: `"Enigmo Labs Intake" <${user}>`,
    user,
    pass,
  };
};

let transporter: Transporter | null = null;
let resend: Resend | null = null;

const getTransporter = (config: MailerConfig): Transporter => {
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST || DEFAULT_SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || DEFAULT_SMTP_PORT,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : true,
    auth: { user: config.user as string, pass: config.pass as string },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return transporter;
};

export const sendMail = async (mail: OutboundMail): Promise<void> => {
  const config = getMailerConfig();
  if (!config) throw new MailerNotConfiguredError();

  if (config.provider === 'resend') {
    resend ??= new Resend(process.env.RESEND_API_KEY as string);
    const { error } = await resend.emails.send({
      from: config.from,
      to: [...mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    if (error) {
      throw new ResendDeliveryError(error);
    }

    return;
  }

  await getTransporter(config).sendMail({
    from: config.from,
    to: mail.to.join(', '),
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
};

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
