import Joi from "joi";
import BaseDTO from "../../../common/DTO/base.dto";

class LoginDTO extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(8).required().message("Password must contain minimum 8 chars"),
    })
};

export default LoginDTO;