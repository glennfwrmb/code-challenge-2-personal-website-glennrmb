import * as z from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name')
    .max(100, 'Name must be 100 characters or less'),
  email: z
    .email()
    .min(1, 'Please enter your email')
    .max(100, 'Email must be 100 characters or less'),
  brief: z
    .string()
    .min(1, 'Please enter a message')
    .max(2000, 'Message must be 2000 characters or less'),
});

export type contactRequest = z.infer<typeof contactSchema>;
