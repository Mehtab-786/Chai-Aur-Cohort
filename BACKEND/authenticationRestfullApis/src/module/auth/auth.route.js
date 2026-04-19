import { Router } from 'express';
import { login, register, profile, logout  } from './auth.controller';
import validate from '../../common/middlewares/validate.middlewares';
import RegisterDTO from './dto/register.dto';
import LoginDTO from './dto/login.dto';
import { authenticateUser } from './auth.middleware';

const router = Router();

router.post('/register', validate(RegisterDTO) ,register);
router.post('/login', validate(LoginDTO) ,login);
router.post('/logout',authenticateUser, logout );

router.get('/profile',authenticateUser, profile );

export default router;
