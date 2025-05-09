function sendError(res, statusCode, message, details = {}) {
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message,
            ...details && { details }
        }
    });
}