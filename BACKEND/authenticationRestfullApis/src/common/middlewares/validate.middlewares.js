import APIError from "../utils/APIError";

function validate(DTOclass) {
    return (req, res, next) => {
        const { errors, value } = DTOclass.validate(req.body);
        if (errors) {
            throw APIError.badRequest(errors.join('; '));
        }
        req.body = value;
        next();
    }
}
export default validate;