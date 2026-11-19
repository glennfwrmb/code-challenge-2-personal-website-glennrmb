import { Router } from 'express';
import { ContactsController } from './contacts.controller';

const router = Router();
const contactsController = new ContactsController();

router.post('/request-otp', contactsController.requestOtp);
router.post('/verify-otp', contactsController.verifyOtp);

export const ContactsRoute = router;
