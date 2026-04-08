class APIError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = 'Bad Request') {
        return new APIError(400, message)
    }
    static unAuthorized(message = 'unAuthorized') {
        return new APIError(401, message)
    }
    static conflict(message = 'Conflict!') {
        return new APIError(409, message)
    }
}

export default APIError;