import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData } from '@/lib/types';
import {
  validateContactForm,
  sanitizeContactPayload,
} from '@/lib/utils';

const toFormData = (payload: Record<string, string>): FormData => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) =>
    form.append(key, value ?? ''),
  );
  return form;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const raw: Partial<ContactFormData> = await request.json();

    const data: ContactFormData = {
      name: raw.name ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      protocol: raw.protocol ?? '',
      brief: raw.brief ?? '',
    };

    const { valid, errors } = validateContactForm(data);
    if (!valid) {
      return NextResponse.json(
        { status: 'error', errors },
        { status: 400 },
      );
    }

    const payload = sanitizeContactPayload(data);
    const formspreeId = process.env.FORMSPREE_FORM_ID?.trim();

    if (!formspreeId) {
      return NextResponse.json(
        {
          status: 'success',
          message:
            'Form received. Configure FORMSPREE_FORM_ID to enable live email notifications.',
          payload,
        },
        { status: 200 },
      );
    }

    const form = toFormData(payload);
    form.append(
      '_subject',
      `NEW ENIGMO PROTOCOL: ${payload.name} — ${payload.protocol}`,
    );

    const upstream = await fetch(
      `https://formspree.io/f/${formspreeId}`,
      {
        method: 'POST',
        body: form,
        headers: { Accept: 'application/json' },
      },
    );

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      return NextResponse.json(
        {
          status: 'error',
          message: `Submission failed (${upstream.status}). Please retry or contact enigmolabs@gmail.com.`,
          detail: detail.slice(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { status: 'success', message: 'Packet dispatched.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Connection timeout. Please retry or contact enigmolabs@gmail.com.',
      },
      { status: 500 },
    );
  }
}
