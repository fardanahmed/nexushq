'use server';

import { Resend } from 'resend';
import type { ContactFormState } from '@/types';

// Legacy FormState for backwards compatibility
export interface FormState {
  success: boolean;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string || 'General Inquiry';
  const message = formData.get('message') as string;

  // Validation
  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'CARER Contact Form <noreply@carer.edu.pk>',
      to: ['contact@carer.edu.pk'], // Replace with actual CARER email
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          Sent from CARER Institute website contact form
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { 
        success: false, 
        message: 'Failed to send message. Please try again or email us directly at contact@carer.edu.pk' 
      };
    }

    console.log('Email sent successfully:', data);
    return { 
      success: true, 
      message: 'Thank you! Your message has been sent. We\'ll get back to you soon.' 
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    };
  }
}
