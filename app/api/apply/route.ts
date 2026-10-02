import { NextResponse } from 'next/server';
import type { SmeApplication, SmeTermKey } from '@/lib/types';
import {
  MailerNotConfiguredError,
  escapeHtml,
  sendMail,
} from '@/lib/mailer';
import { SME_PROGRAM, SME_TERMS } from '@/lib/data';

export const runtime = 'nodejs';

/** Agency inbox for program applications; override with APPLY_TO_EMAIL. */
const DEFAULT_ADMIN_EMAILS = 'info@enigmolabs.co.ke, admin@enigmolabs.co.ke';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requests = new Map<string, number[]>();

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const recent = (requests.get(key) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requests.set(key, recent);
    return true;
  }

  recent.push(now);
  requests.set(key, recent);
  return false;
};

class ApplicationValidationError extends Error {}

interface SmtpFailure {
  code?: unknown;
  command?: unknown;
  responseCode?: unknown;
  message?: unknown;
  resendName?: unknown;
  statusCode?: unknown;
}

/**
 * Provider failures carry the actionable detail (535 = bad credentials,
 * EAUTH = rejected login, restriction_reached = unverified sender) in
 * discrete fields, so surface them as one greppable line before the full
 * object.
 */
const logSendFailure = (error: unknown): void => {
  if (typeof error === 'object' && error !== null) {
    const { code, command, responseCode, message, resendName, statusCode } =
      error as SmtpFailure;
    console.error(
      `[api/apply] mail send failed | code=${String(code)} command=${String(command)} responseCode=${String(responseCode)} resendName=${String(resendName)} statusCode=${String(statusCode)} message=${String(message)}`,
    );
  }

  console.error('[api/apply] full error:', error);
};

const getClientKey = (request: Request): string =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  request.headers.get('x-real-ip') ??
  'anonymous';

const truncate = (value: unknown, max: number): string =>
  String(value ?? '')
    .trim()
    .slice(0, max);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const parsePayload = (body: unknown): SmeApplication | null => {
  if (typeof body !== 'object' || body === null) return null;

  const raw = body as Record<string, unknown>;
  const terms = (raw.terms ?? {}) as Record<string, unknown>;

  const application: SmeApplication = {
    businessName: truncate(raw.businessName, 160),
    industry: truncate(raw.industry, 120),
    contactPerson: truncate(raw.contactPerson, 120),
    whatsapp: truncate(raw.whatsapp, 32),
    socialLink: truncate(raw.socialLink, 300),
    terms: {
      setupFee: terms.setupFee === true,
      assetDelivery: terms.assetDelivery === true,
      testimonial: terms.testimonial === true,
    },
  };

  const required: [keyof Omit<SmeApplication, 'terms'>, string][] = [
    ['businessName', 'Business name is required.'],
    ['industry', 'Industry / niche is required.'],
    ['contactPerson', 'Contact person name is required.'],
    ['whatsapp', 'WhatsApp phone number is required.'],
  ];

  for (const [field, message] of required) {
    if (!isNonEmptyString(application[field])) {
      throw new ApplicationValidationError(message);
    }
  }

  const missingTerms = (Object.keys(application.terms) as SmeTermKey[]).filter(
    (key) => !application.terms[key],
  );

  if (missingTerms.length > 0) {
    throw new ApplicationValidationError(
      'All three qualification terms must be accepted.',
    );
  }

  return application;
};

const formatTimestamp = (): string =>
  new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi',
  }).format(new Date());

const renderRow = (
  label: string,
  value: string,
  isHighlighted = false,
): string => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #27272a;color:#94a3b8;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #27272a;color:${isHighlighted ? '#fbbf24' : '#fafafa'};font-size:14px;font-weight:${isHighlighted ? '700' : '400'};word-break:break-word;">${escapeHtml(value)}</td>
      </tr>`;

const buildApplicationEmail = (application: SmeApplication, timestamp: string) => ({
  subject: `[SME Program Application] - ${application.businessName}`,
  text: [
    `SME Program Application — ${SME_PROGRAM.name}`,
    '',
    `Business Name: ${application.businessName}`,
    `Industry / Niche: ${application.industry}`,
    `Contact Person: ${application.contactPerson}`,
    `WhatsApp Number: ${application.whatsapp}`,
    `Social / Web Link: ${application.socialLink || 'Not provided'}`,
    '',
    'Agreed terms:',
    ...SME_TERMS.map((term) => `- ${term.label}`),
    '',
    `Timestamp (EAT): ${timestamp}`,
  ].join('\n'),
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: ui-sans-serif, system-ui, sans-serif; background: #05070a; color: #e4e4e7; padding: 24px; margin: 0; }
    .container { max-width: 640px; margin: 0 auto; background: #0f141c; border: 1px solid #ffffff1a; border-radius: 12px; overflow: hidden; }
    .header { padding: 20px 24px; background: #0d2680; color: #ffffff; font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }
    .header span { display: block; margin-top: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-weight: 400; color: #c7d2fe; }
    .table { width: 100%; border-collapse: collapse; }
    .terms { padding: 20px 24px; border-top: 1px solid #27272a; }
    .terms h3 { margin: 0 0 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #3b6fe9; }
    .terms li { margin-bottom: 10px; font-size: 13px; color: #cbd5e1; line-height: 1.6; }
    .footer { padding: 16px 24px; border-top: 1px solid #27272a; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      &gt; NEW SME PROGRAM APPLICATION
      <span>${escapeHtml(SME_PROGRAM.name)} — ${SME_PROGRAM.sponsoredSlots} sponsored slots</span>
    </div>
    <table class="table" role="presentation">
      <tbody>
        ${renderRow('Business Name', application.businessName, true)}
        ${renderRow('Industry / Niche', application.industry)}
        ${renderRow('Contact Person', application.contactPerson)}
        ${renderRow('WhatsApp Number', application.whatsapp)}
        ${renderRow('Social / Web Link', application.socialLink || 'Not provided')}
        ${renderRow('Engineering Fee', `${SME_PROGRAM.sponsoredEngineeringFee} (waived from ${SME_PROGRAM.standardEngineeringFee})`, true)}
        ${renderRow('Setup Fee Agreed', SME_PROGRAM.setupFee)}
        ${renderRow('Received (EAT)', timestamp)}
      </tbody>
    </table>
    <div class="terms">
      <h3>Terms accepted by applicant</h3>
      <ul>
        ${SME_TERMS.map((term) => `<li>✓ ${escapeHtml(term.label)}</li>`).join('\n        ')}
      </ul>
      <p style="margin:16px 0 0;font-size:12px;color:#64748b;">Confirm the ${escapeHtml(SME_PROGRAM.setupFee)} setup fee invoice with ${escapeHtml(application.contactPerson)} via WhatsApp (${escapeHtml(application.whatsapp)}) within ${SME_PROGRAM.responseSlaHours} hours. Build SLA: ${SME_PROGRAM.buildSlaDays} days from asset delivery.</p>
    </div>
    <div class="footer">ENIGMO LABS &middot; Nairobi, Kenya &middot; ${escapeHtml(timestamp)}</div>
  </div>
</body>
</html>`,
});

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientKey(request))) {
      return NextResponse.json(
        { error: 'Too many applications from this device. Please try again later.' },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 },
      );
    }

    const application = parsePayload(body);
    if (!application) {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 },
      );
    }

    const timestamp = formatTimestamp();
    const mail = buildApplicationEmail(application, timestamp);

    await sendMail({
      to: (process.env.APPLY_TO_EMAIL || DEFAULT_ADMIN_EMAILS)
        .split(',')
        .map((address) => address.trim())
        .filter(Boolean),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof ApplicationValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof MailerNotConfiguredError) {
      console.error(`[api/apply] ${error.message}`);
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 503 },
      );
    }

    logSendFailure(error);
    return NextResponse.json(
      {
        error:
          'Failed to submit application. Please retry or contact us on WhatsApp.',
      },
      { status: 500 },
    );
  }
}
