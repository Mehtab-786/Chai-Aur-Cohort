class APIResponse {
    static ok(res, message, data = null) {
        return res.status(200).json({
            success: true,
            message,
            data
        })
    }
    static created(res, message, data = null) {
        return res.status(201).json({
            success: true,
            message,
            data
        })
    }
    static noContent(res, status) {
        return res.status(status).json({ success: true })
    }
}

export default APIResponse;