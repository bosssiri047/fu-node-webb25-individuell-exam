import Product from "../models/product.model.js";

// Get all menu items
export const getMenuItems = async () => {
    try {
        const result = await Product.find();
        return {
            success: true,
            menu: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
