import Joi from 'joi';

class BaseDTO {
    static schemaObj = Joi.object({})

    static validate(data) {
        const { error, value } = this.schemaObj.validate(data, {
            abortEarly: false,
            stripUnknown: false
        })
        console.log(error)
        if (error) {
            let errData = error.details.map(er => { er.type, er.message })
            return { error: errData, value: null }
        }
        return { error: null, value }
    }
}

export default BaseDTO;