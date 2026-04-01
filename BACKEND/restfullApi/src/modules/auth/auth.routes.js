import express from 'express'
import {register} from './auth.controller.js'
import validate from '../../common/middlewares/validate.middlewares.js'
import { RegisterDTO } from './dto/register.dto.js'

const router = express.Router()

router.post('/register', validate(RegisterDTO), register)


export default router 