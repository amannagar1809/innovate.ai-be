import { Router } from 'express';
import { validateLogin, validateSignUp } from '../../middleware/validation.middleware';
import { login, signUp, signOut } from '../../controller/auth.controller/auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/signup', validateSignUp, signUp);
router.post('/login', validateLogin, login);
router.post('/signout', authenticate, signOut);

export default router;
