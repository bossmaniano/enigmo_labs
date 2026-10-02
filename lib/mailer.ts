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
 * Every provider present in the environment, in preference order: Resend
 * first (no datacenter-IP login blocks), then Gmail SMTP.
 *
 * Both are returned rather than picking a single winner, because a stale or
 * placeholder RESEND_API_KEY would otherwise shadow a working SMTP setup and
 * silently route around it.
 */
export const getMailerConfigs = (): readonly MailerConfig[] => {
  const configs: MailerConfig[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    configs.push({
      provider: 'resend',
      from: process.env.RESEND_FROM || DEFAULT_RESEND_FROM,
    });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (user && pass) {
    configs.push({
      provider: 'smtp',
      from: `"Enigmo Labs Intake" <${user}>`,
      user,
      pass,
    });
  }

  return configs;
};

export const getMailerConfig = (): MailerConfig | null =>
  getMailerConfigs()[0] ?? null;

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

const deliver = async (
  config: MailerConfig,
  mail: OutboundMail,
): Promise<void> => {
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

/**
 * Tries each configured provider in order so one bad credential cannot
 * disable an otherwise working mail setup. The last failure is rethrown to
 * keep the diagnostic detail for the caller.
 */
export const sendMail = async (mail: OutboundMail): Promise<void> => {
  const configs = getMailerConfigs();
  if (configs.length === 0) throw new MailerNotConfiguredError();

  let lastError: unknown;

  for (const config of configs) {
    try {
      await deliver(config, mail);
      return;
    } catch (error) {
      lastError = error;
      console.error(
        `[mailer] provider=${config.provider} failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  throw lastError;
};

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
