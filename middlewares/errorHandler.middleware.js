export const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        success : false,
        message : error.message
    });
}