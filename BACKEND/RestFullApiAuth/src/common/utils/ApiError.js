class APIError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad request') {
        return APIError(400, message)
    }
    static unAuthorized(message = 'UnAuthorized') {
        return APIError(400, message)
    }
    static conflict(message = "Conflict") {
        return new APIError(409, message);
    }
    static forbidden(message = "forbidden") {
        return new APIError(412, message);
    }
    static notfound(message = "notfound") {
        return new APIError(412, message);
    }
}
export default APIError