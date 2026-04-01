class APIError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = 'Bad request') {
        return new APIError(400, message)
    }
    static unAuthorized(message = 'UnAuthorized') {
        return new APIError(401, message)
    }

}

export default APIError;
