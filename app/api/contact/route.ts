import { NextResponse } from 'next/server';
import { getMailerConfig, getTransporter } from '@/lib/mailer';

const DEFAULT_TO_EMAIL = 'enigmolabs@gmail.com';

export async function POST(request: Request) {
  try {
    const { name, email, phone, protocol, brief } = await request.json();

    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or brief.' },
        { status: 400 },
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const config = getMailerConfig();
    const toEmail = process.env.TO_EMAIL || DEFAULT_TO_EMAIL;

    if (!smtpUser || !config) {
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 503 },
      );
    }

    const transporter = getTransporter(config);

    // Email to Enigmo Labs
    const adminMailOptions = {
      from: smtpUser,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Protocol: ${protocol || 'Not specified'}

Message:
${brief}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; background: #0a0a0a; color: #e4e4e7; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 24px; }
    .header { color: #0ea5e9; font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid #27272a; padding-bottom: 16px; }
    .field { margin-bottom: 16px; }
    .label { color: #0ea5e9; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { color: #fafafa; font-size: 14px; }
    .brief { background: #09090b; border: 1px solid #27272a; border-radius: 6px; padding: 16px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">> NEW CONTACT SUBMISSION</div>
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value">${phone || 'Not provided'}</div>
    </div>
    <div class="field">
      <div class="label">Protocol</div>
      <div class="value">${protocol || 'Not specified'}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="value brief">${brief}</div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Confirmation email to sender
    const senderMailOptions = {
      from: smtpUser,
      to: email,
      subject: 'We received your message — Enigmo Labs',
      text: `
Hi ${name},

Thank you for reaching out to Enigmo Labs. We've received your message and will get back to you within 12 business hours.

Your submission details:
- Protocol: ${protocol || 'Not specified'}
- Phone: ${phone || 'Not provided'}

Your message:
${brief}

Best regards,
Enigmo Labs Team
enigmolabs@gmail.com
+254 768 810 657
Nairobi, Kenya
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; background: #0a0a0a; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 24px; color: #38bdf8; }
    .container * { color: #38bdf8 !important; }
    .header { font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid #1e293b; padding-bottom: 16px; }
    .content { line-height: 1.8; }
    .detail { background: #0c1a2b; border: 1px solid #1e293b; border-radius: 6px; padding: 16px; margin: 16px 0; white-space: pre-wrap; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; }
    strong { font-weight: 700; }
    p { margin: 12px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">> MESSAGE RECEIVED</div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to <strong>Enigmo Labs</strong>. We have received your message and will get back to you within <strong>12 business hours</strong>.</p>
      <div class="detail">
<strong>Your submission details:</strong>
- Protocol: ${protocol || 'Not specified'}
- Phone: ${phone || 'Not provided'}

<strong>Your message:</strong>
${brief}
      </div>
      <p>Best regards,<br><strong>Enigmo Labs Team</strong></p>
    </div>
    <div class="footer">
      enigmolabs@gmail.com | +254 768 810 657 | Nairobi, Kenya
    </div>
  </div>
</body>
</html>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please retry or contact enigmolabs@gmail.com directly.' },
      { status: 500 },
    );
  }
}
