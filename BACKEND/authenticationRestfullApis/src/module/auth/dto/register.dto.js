import Joi from "joi";
import BaseDTO from "../../../common/DTO/base.dto.js";

class RegisterDTO extends BaseDTO {
    static schema = Joi.object({
        username: Joi.string().min(3).max(250).trim().lowercase().required(),
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(8).message("Password must contain minimum 8 chars").required(),
        role: Joi.string().valid("user", "admin").default('user')
    })
};

export default RegisterDTO;