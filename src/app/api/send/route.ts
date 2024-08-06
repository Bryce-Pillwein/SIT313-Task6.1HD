// Route ts
import { Resend } from 'resend';
import EmailTemplateWelcome from '@/components/EmailTemplateWelcome';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

/**
 * POST
 * @param request 
 * @returns response
 */
export async function POST(request: Request) {
  const { name, email } = await request.json(); // Get email from request body

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world',
      react: EmailTemplateWelcome({ name: name }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
