import { Router } from 'express';
import { ContactsController } from './contacts.controller';
import {
  requestOtpLimiter,
  verifyOtpLimiter,
} from '../../middleware/contact-rate-limit.middleware';

const router = Router();
const contactsController = new ContactsController();

router.post(
  '/request-otp',
  requestOtpLimiter,
  contactsController.requestOtp,
);

router.post(
  '/verify-otp',
  verifyOtpLimiter,
  contactsController.verifyOtp,
);

export const ContactsRoute = router;
