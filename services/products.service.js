import Product from "../models/product.model.js";

// GET menu items by prodId
export const getProductById = async (prodId) => {
    try {
        const result = await Product.findOne({ prodId });
        if (result) {
            return {
                success: true,
                product: result,
            };
        } else throw new Error("Product not found");
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
