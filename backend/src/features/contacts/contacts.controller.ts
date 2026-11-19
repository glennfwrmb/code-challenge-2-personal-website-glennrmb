
import { NextFunction, Request, Response } from 'express';
import { ContactsService } from './contacts.service';
import { validate } from '../../validators/validate';
import {
  requestOtpSchema,
  verifyOtpSchema,
} from '../../validators/contacts.validator';

export class ContactsController {
  private contactsService = new ContactsService();

  // STEP 1: Request OTP
  requestOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const validated = validate(requestOtpSchema, {
        body: req.body,
      });

      const result = await this.contactsService.requestOtp(validated.body);

      res.status(200).json({
        success: true,
        message: result.message,
        data: {
          verificationId: result.verificationId,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // STEP 2: Verify OTP
  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const validated = validate(verifyOtpSchema, {
        body: req.body,
      });

      const result = await this.contactsService.verifyOtp(validated.body);

      res.status(200).json({
        success: true,
        message: result.message,
        data: {
          contactId: result.contactId,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
