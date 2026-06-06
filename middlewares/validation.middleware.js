export const validateNewOrder = (req, res, next) => {
    const { cartId } = req.body;
    if (!cartId || typeof cartId !== "string" || cartId.trim() === "") {
        return next({
            status: 400,
            message: "cartId is required",
        });
    }
    next();
};
