import { AppError } from '../../errors/app.error';
import { createHmac, randomInt, timingSafeEqual } from 'crypto';
import { prisma } from '../../lib/prisma';
import transporter from '../../lib/transporter.lib';
import type {
  RequestOtpInput,
  VerifyOtpInput,
} from '../../validators/contacts.validator';

type ContactData = RequestOtpInput['body'];
type VerifyOtpData = VerifyOtpInput['body'];

export class ContactsService {
  private hashOtp(otp: string) {
    const secret = process.env.OTP_SECRET;

    if (!secret) {
      throw new Error('OTP_SECRET is not configured');
    }

    return createHmac('sha256', secret).update(otp).digest('hex');
  }

  private compareOtp(otp: string, storedHash: string) {
    const submitted = Buffer.from(this.hashOtp(otp), 'hex');
    const stored = Buffer.from(storedHash, 'hex');

    return (
      submitted.length === stored.length && timingSafeEqual(submitted, stored)
    );
  }

  async requestOtp(data: ContactData) {
    const { name, message } = data;
    const email = data.email.trim().toLowerCase();

    const otp = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Serialize OTP requests for the same email
    const verification = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        SELECT pg_advisory_xact_lock(
          hashtextextended(${`contact:email:${email}`}, 0)
        ) IS NULL AS locked
      `;

      // Check the 60-second cooldown
      const recentRequest = await tx.contactVerification.findFirst({
        where: {
          email,
          createdAt: {
            gt: new Date(Date.now() - 60 * 1000),
          },
        },
      });

      if (recentRequest) {
        throw new AppError(
          429,
          'Please wait 60 seconds before requesting another OTP',
        );
      }

      // Invalidate previous unused OTPs
      await tx.contactVerification.updateMany({
        where: {
          email,
          verifiedAt: null,
        },
        data: {
          expiresAt: new Date(),
        },
      });

      // Create new verification
      return tx.contactVerification.create({
        data: {
          name,
          email,
          message,
          otpHash: this.hashOtp(otp),
          expiresAt,
        },
      });
    });

    try {
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Verify Your Email - Glenn Portfolio',
        text: `Your verification code is ${otp}. This code expires in 5 minutes.`,
      });
    } catch (error) {
      try {
        await prisma.contactVerification.deleteMany({
          where: {
            id: verification.id,
            verifiedAt: null,
          },
        });
      } catch (cleanupError) {
        console.error('Failed to clean up OTP:', cleanupError);
      }

      console.error('Failed to send verification email:', error);

      throw new AppError(
        503,
        'Unable to send verification email. Please try again later.',
      );
    }

    return {
      verificationId: verification.id,
      message: 'Verification code sent successfully',
    };
  }

  async verifyOtp(data: VerifyOtpData) {
    const { verificationId, otp } = data;

    // Read email before acquiring the shared lock
    const initialVerification = await prisma.contactVerification.findUnique({
      where: {
        id: verificationId,
      },
      select: {
        email: true,
      },
    });

    if (!initialVerification) {
      throw new AppError(404, 'Verification not found');
    }

    // Use the same email lock as requestOtp()
    const result = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`
        SELECT pg_advisory_xact_lock(
          hashtextextended(
            ${`contact:email:${initialVerification.email}`},
            0
          )
        ) IS NULL AS locked
      `;

      // Read current verification after acquiring the lock
      const verification = await tx.contactVerification.findUnique({
        where: {
          id: verificationId,
        },
      });

      if (!verification) {
        return {
          success: false as const,
          status: 404,
          message: 'Verification not found',
        };
      }

      if (verification.verifiedAt) {
        return {
          success: false as const,
          status: 400,
          message: 'OTP has already been used',
        };
      }

      if (verification.expiresAt <= new Date()) {
        return {
          success: false as const,
          status: 400,
          message: 'OTP has expired',
        };
      }

      if (verification.attempts >= 5) {
        return {
          success: false as const,
          status: 429,
          message: 'Maximum verification attempts exceeded',
        };
      }

      // Compare OTP securely
      const isValid = this.compareOtp(otp, verification.otpHash);

      if (!isValid) {
        await tx.contactVerification.update({
          where: {
            id: verificationId,
          },
          data: {
            attempts: {
              increment: 1,
            },
          },
        });

        return {
          success: false as const,
          status: 400,
          message: 'Invalid OTP',
        };
      }

      // Consume OTP only if still valid
      const updated = await tx.contactVerification.updateMany({
        where: {
          id: verificationId,
          verifiedAt: null,
          expiresAt: {
            gt: new Date(),
          },
          attempts: {
            lt: 5,
          },
        },
        data: {
          verifiedAt: new Date(),
        },
      });

      if (updated.count !== 1) {
        return {
          success: false as const,
          status: 400,
          message: 'OTP is no longer valid',
        };
      }

      // Save contact message in the same transaction
      const contact = await tx.contactMessage.create({
        data: {
          name: verification.name,
          email: verification.email,
          message: verification.message,
          isVerified: true,
        },
      });

      return {
        success: true as const,
        contact,
        verification,
      };
    });

    // Throw outside transaction to preserve failed attempts
    if (!result.success) {
      throw new AppError(result.status, result.message);
    }

    const { contact, verification } = result;

    // Notify portfolio owner
    try {
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        replyTo: verification.email,
        subject: `Portfolio Contact: ${verification.name}`,
        text: `Name: ${verification.name}
Email: ${verification.email}

Message:
${verification.message}`,
      });
    } catch (error) {
      console.error('Failed to send portfolio notification:', error);
    }

    return {
      message: 'Email verified and contact message submitted',
      contactId: contact.id,
    };
  }
}
