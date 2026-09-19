import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or message.' },
        { status: 400 },
      );
    }

    // TODO: Connect HostAFRICA SMTP / Email Provider (e.g., info@enigmolabs.co.ke)
    console.log('Contact form submission received:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 },
    );
  }
}
