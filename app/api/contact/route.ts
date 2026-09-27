import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, protocol, brief } = await request.json();

    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or brief.' },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmail = process.env.FROM_EMAIL || smtpUser;
    const toEmail = process.env.TO_EMAIL || 'enigmolabs@gmail.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly at enigmolabs@gmail.com.' },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission: ${protocol || 'General Inquiry'}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Protocol: ${protocol || 'Not specified'}

Brief:
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
    .label { color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { color: #fafafa; font-size: 14px; }
    .brief { background: #09090b; border: 1px solid #27272a; border-radius: 6px; padding: 16px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">> NEW CONTACT SUBMISSION</div>
    <div class="field">
      <div class="label">Protocol</div>
      <div class="value">${protocol || 'Not specified'}</div>
    </div>
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
      <div class="label">Technical Brief</div>
      <div class="value brief">${brief}</div>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

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
