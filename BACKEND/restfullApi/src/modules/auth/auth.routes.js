import express from 'express'
import * as controller from './auth.controller.js'
import validate from '../../common/middlewares/validate.middlewares.js'
import {RegisterDTO } from './dto/register.dto.js'
import {LoginDTO } from './dto/login.dto.js'
import { authenticate} from './auth.middleware.js'

const router = express.Router()

router.post('/register', validate(RegisterDTO), controller.register)
router.post('/login', validate(LoginDTO), controller.login)
router.post('/logout', authenticate, controller.logout)

router.get('/profile', authenticate, controller.profile)

export default router 