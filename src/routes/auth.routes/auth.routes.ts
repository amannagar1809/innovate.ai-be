import { Router } from 'express';
import { validateLogin, validateSignUp } from '../../middleware/validation.middleware';
import { login, signUp } from '../../controller/auth.controller/auth.controller';

const router = Router();

router.post('/signup', validateSignUp, signUp);
router.post('/login', validateLogin, login);

export default router;
