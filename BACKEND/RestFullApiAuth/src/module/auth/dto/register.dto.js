import Joi from 'joi'
import BaseDTO from '../../../common/DTO/base.dto.js'

class RegisterDto extends BaseDTO {
    static schemaObj = Joi.object({
        username: Joi.string().required().min(3).max(55).trim(),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().trim().min(5).max(255),
        role: Joi.string().valid('admin', 'customer').default('customer'),
    })
}

export default RegisterDto