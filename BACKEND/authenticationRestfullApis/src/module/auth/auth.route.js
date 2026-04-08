import { Router } from 'express';
import { register } from './auth.controller';
import validate from '../../common/middlewares/validate.middlewares';
import RegisterDTO from './dto/register.dto';

const router = Router();

router.post('/register', validate(RegisterDTO) ,register)


export default router;