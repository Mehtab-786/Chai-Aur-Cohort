import express from 'express';
import { loginCont, profileCont, registerCont } from './auth.contoller';
import DTOValidation from '../../common/middlewares/validate.middlewares';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import {authenticate} from './auth.middleware.js'

const router = express.Router();

router.post('/register', DTOValidation(RegisterDto), registerCont)
router.post('/login', DTOValidation(LoginDto), loginCont)
router.post('/profile', authenticate , profileCont)



export default router;
