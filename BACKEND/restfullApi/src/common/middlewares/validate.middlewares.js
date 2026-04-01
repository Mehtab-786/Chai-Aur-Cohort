import ApiError from '../utils/Api-Error.js';

function validate(DTOclass) {
    return (req, res, next) => {
        const { errors, value } = DTOclass.validate(req.body)

        if (errors) {
            throw ApiError.badRequest(errors.join('; '));
        }

        req.body = value;

        next()
    }
}

export default validate;