import Joi from "joi";

class BaseDTO {
    static schema = Joi.object({})

    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            console.log(error)
            const errors = error.details.map(d => d.message)
            return { errors, value: null }
        }

        return { value, errors: null }

    }
}

export default BaseDTO