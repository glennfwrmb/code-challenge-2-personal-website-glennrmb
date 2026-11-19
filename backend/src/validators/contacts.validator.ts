import * as z from 'zod';

// CONTACT - REQUEST OTP
export const requestOtpSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(100, 'Name must not exceed 100 characters'),

    email: z
      .email('Please enter a valid email address')
      .trim()
      .toLowerCase()
      .max(254, 'Email must not exceed 254 characters'),

    message: z
      .string()
      .trim()
      .min(1, 'Message is required')
      .max(5000, 'Message must not exceed 5000 characters'),
  }),
});

// CONTACT - VERIFY OTP
export const verifyOtpSchema = z.object({
  body: z.object({
    verificationId: z.uuid('Invalid verification ID'),

    otp: z
      .string()
      .regex(/^\d{6}$/, 'OTP must contain exactly 6 digits'),
  }),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
