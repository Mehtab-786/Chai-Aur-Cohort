import { Router } from 'express';
import { login, register } from './auth.controller';
import validate from '../../common/middlewares/validate.middlewares';
import RegisterDTO from './dto/register.dto';
import LoginDTO from './dto/login.dto';

const router = Router();

router.post('/register', validate(RegisterDTO) ,register)
router.post('/login', validate(LoginDTO) ,login)



export default router;