import Joi from "joi";
import BaseDTO from "../../../common/DTO/baseDto";

class LoginDTO extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required()
    })
}

export { LoginDTO };