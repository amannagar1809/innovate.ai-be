import { Router } from 'express';
import { validateSignUp } from '../../middleware/validation.middleware';
import { signUp } from '../../controller/auth.controller/auth.controller';

const router = Router();

// Sign up route
router.post('/signup',
  validateSignUp,
  signUp
);

export default router;
