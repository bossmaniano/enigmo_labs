import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const toEmail = process.env.TO_EMAIL || DEFAULT_TO_EMAIL;

    // Email to Enigmo Labs
    const mailOptions = {
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'info@enigmolabs.co.ke', // Verified domain email
      to: [toEmail],
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

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