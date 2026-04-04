import Joi from 'joi'
import BaseDTO from '../../../common/DTO/base.dto.js'

class LoginDto extends BaseDTO {
    static schemaObj = Joi.object({
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().trim().min(5).max(255),
    })
}

export default LoginDto