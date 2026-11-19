
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

  async requestOtp(data: ContactData) {
    const { name, email, message } = data;

    // Limit OTP requests to once every 60 seconds per email
    const recentRequest = await prisma.contactVerification.findFirst({
      where: {
        email,
        createdAt: {
          gt: new Date(Date.now() - 60 * 1000),
        },
      },
    });

    if (recentRequest) {
      throw new AppError(
        'Please wait 60 seconds before requesting another OTP',
        429,
      );
    }

    // Generate a secure 6-digit OTP
    const otp = randomInt(100000, 1000000).toString();

    // OTP expires after 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Create new OTP without invalidating the previous OTP yet
    const verification = await prisma.contactVerification.create({
      data: {
        name,
        email,
        message,
        otpHash: this.hashOtp(otp),
        expiresAt,
      },
    });

    try {
      // Send the new OTP to the visitor
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Verify Your Email - Glenn Portfolio',
        text: `Your verification code is ${otp}. This code expires in 5 minutes.`,
      });
    } catch (error) {
      // Delete new OTP if email delivery fails
      await prisma.contactVerification.delete({
        where: {
          id: verification.id,
        },
      });

      throw error;
    }

    // Invalidate previous OTPs after email is sent successfully
    await prisma.contactVerification.updateMany({
      where: {
        email,
        id: {
          not: verification.id,
        },
        verifiedAt: null,
      },
      data: {
        expiresAt: new Date(),
      },
    });

    return {
      verificationId: verification.id,
      message: 'Verification code sent successfully',
    };
  }

  async verifyOtp(data: VerifyOtpData) {
    const { verificationId, otp } = data;

    const verification = await prisma.contactVerification.findUnique({
      where: {
        id: verificationId,
      },
    });

    if (!verification) {
      throw new AppError('Verification not found', 404);
    }

    if (verification.verifiedAt) {
      throw new AppError('OTP has already been used', 400);
    }

    if (verification.expiresAt <= new Date()) {
      throw new AppError('OTP has expired', 400);
    }

    if (verification.attempts >= 5) {
      throw new AppError(
        'Maximum verification attempts exceeded',
        429,
      );
    }

    const submittedHash = Buffer.from(this.hashOtp(otp), 'hex');
    const storedHash = Buffer.from(verification.otpHash, 'hex');

    const isValid =
      submittedHash.length === storedHash.length &&
      timingSafeEqual(submittedHash, storedHash);

    if (!isValid) {
      await prisma.contactVerification.updateMany({
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
          attempts: {
            increment: 1,
          },
        },
      });

      throw new AppError('Invalid OTP', 400);
    }

    // Save message and consume OTP atomically
    const contact = await prisma.$transaction(async (tx) => {
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
        throw new AppError('OTP is no longer valid', 400);
      }

      return tx.contactMessage.create({
        data: {
          name: verification.name,
          email: verification.email,
          message: verification.message,
          isVerified: true,
        },
      });
    });

    // Notify portfolio owner without failing the saved message
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
