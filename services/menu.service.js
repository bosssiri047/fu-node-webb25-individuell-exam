import Product from "../models/product.model.js";
import { getProductById } from "./products.service.js";

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

// Add new menu item
export const addMenuItem = async (title, desc, price) => {
	try {
		// Skapa random prodId
		const prodId = crypto.randomUUID().substring(0, 5);

		// Skapa ordern
		const item = await Product.create({
			prodId,
			title: title,
			desc: desc,
            price: price
		});

		// Returnera item
		return {
			item
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

// Delete menu item
export const deleteMenuItemById = async (prodId) => {
    try {
		const itemExist = await getProductById(prodId);
		if(itemExist.success) {
			const result = await Product.findOneAndDelete({prodId : prodId});
        	return {
        	    success : true, 
        	    item : result
        	}
		} else throw new Error("Product does not exist");
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Update menu item
export const updateItem = async (prodId, item) => {
    try {
		const itemExist = await getProductById(prodId);
		if(itemExist.success){
			const result = await Product.findOneAndUpdate({prodId}, item);
 			return {
        	    success : true, 
        	    item : result
        	}
		} else throw new Error("Product does not exist");
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}