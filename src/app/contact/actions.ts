'use server';

import { supabase } from '@/lib/data/client';
import type { ContactFormState } from '@/types';

// Legacy FormState for backwards compatibility
export interface FormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  // 1. Log to console for now (since we don't have email service setup yet)
  console.log('Contact Form Submission:', { name, email, subject, message });

  // 2. Optionally save to Supabase "contact_inquiries" table if it existed
  /*
  const { error } = await supabase
    .from('contact_inquiries')
    .insert([{ name, email, subject, message }]);
  
  if (error) {
    console.error('Submission error:', error);
    return { success: false, message: 'Failed to submit form. Please try again.' };
  }
  */

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Thank you! Your message has been received.' };
}
