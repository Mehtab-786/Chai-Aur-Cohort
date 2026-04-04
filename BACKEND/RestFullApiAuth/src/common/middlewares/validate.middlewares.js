import APIError from "../utils/ApiError";

const DTOValidation = async (DTOClass) => {
    return (req, res, next) => {
        const { error, value } = DTOClass.validate(req.body);
        if (error) throw APIError.badRequest(error.join(','))
        req.body = value
        next()
    }
}

export default DTOValidation