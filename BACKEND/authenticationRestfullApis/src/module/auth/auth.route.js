import { Router } from 'express';
import { login, register, profile, logout, verifyingEmail  } from './auth.controller.js';
import validate from '../../common/middlewares/validate.middlewares.js';
import RegisterDTO from './dto/register.dto.js';
import LoginDTO from './dto/login.dto.js';
import { authenticateUser } from './auth.middleware.js';

const router = Router();

router.post('/register', validate(RegisterDTO) ,register);
router.post('/login', validate(LoginDTO) ,login);
router.post('/logout',authenticateUser, logout );

router.get('/profile',authenticateUser, profile );
router.get('/verify-email/:token', verifyingEmail );


export default router;
