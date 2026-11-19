
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'contact-verification',
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  try {
    // Batasi permintaan berdasarkan IP sebelum memproses formulir.
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip =
      typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0].trim()
        : '';

    if (!ip) {
      return res.status(400).json({
        message: 'Could not identify request source.',
      });
    }

    const { success, limit, remaining, reset } =
      await ratelimit.limit(ip);

    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    res.setHeader('X-RateLimit-Reset', String(reset));

    if (!success) {
      return res.status(429).json({
        message:
          'Too many verification requests. Please try again in 15 minutes.',
      });
    }

    const { name, email, brief } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof brief !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !brief.trim()
    ) {
      return res.status(400).json({
        message: 'Please complete all required fields.',
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedBrief = brief.trim();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      normalizedName.length > 150 ||
      normalizedEmail.length > 250 ||
      normalizedBrief.length > 5000
    ) {
      return res.status(400).json({
        message: 'Please check your contact details and message.',
      });
    }

    const {
      BREVO_API_KEY,
      BREVO_SENDER_EMAIL,
      APP_URL,
      BACKENDLESS_APP_ID,
      BACKENDLESS_REST_KEY,
    } = process.env;

    if (
      !BREVO_API_KEY ||
      !BREVO_SENDER_EMAIL ||
      !APP_URL ||
      !BACKENDLESS_APP_ID ||
      !BACKENDLESS_REST_KEY
    ) {
      return res.status(500).json({
        message: 'Server configuration is incomplete.',
      });
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const backendlessBaseUrl =
      `https://api.backendless.com/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data`;

    // Simpan data sementara untuk verifikasi.
    const saveResponse = await fetch(
      `${backendlessBaseUrl}/contact-verifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
          brief: normalizedBrief,
          token,
          expiresAt: expiresAt.toISOString(),
          verified: false,
        }),
      },
    );

    if (!saveResponse.ok) {
      console.error(
        'Backendless verification storage failed:',
        saveResponse.status,
      );

      return res.status(500).json({
        message: 'Could not prepare email verification.',
      });
    }

    const verificationUrl =
      `${APP_URL.replace(/\/+$/, '')}/verify/${token}`;

    // Kirim email verifikasi melalui Brevo.
    const emailResponse = await fetch(
      'https://api.brevo.com/v3/smtp/email',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: 'Glenn RMB',
            email: BREVO_SENDER_EMAIL,
          },
          to: [
            {
              email: normalizedEmail,
              name: normalizedName,
            },
          ],
          subject: 'Verify your email address',
          textContent: [
            `Hi ${normalizedName},`,
            '',
            'Please verify your email address before submitting your message.',
            '',
            `Verify your email: ${verificationUrl}`,
            '',
            'This link expires in 15 minutes.',
            'If you did not request this, you can ignore this email.',
          ].join('\n'),
          htmlContent: `
            <p>Hi ${escapeHtml(normalizedName)},</p>
            <p>Please verify your email address before submitting your message.</p>
            <p><a href="${verificationUrl}">Verify my email address</a></p>
            <p>This link expires in 15 minutes.</p>
            <p>If you did not request this, you can ignore this email.</p>
          `,
        }),
      },
    );

    if (!emailResponse.ok) {
      console.error(
        'Brevo email request failed:',
        emailResponse.status,
      );

      return res.status(502).json({
        message: 'Could not send the verification email.',
      });
    }

    return res.status(200).json({
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Send verification error:', error);

    return res.status(500).json({
      message: 'An unexpected error occurred.',
    });
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}
