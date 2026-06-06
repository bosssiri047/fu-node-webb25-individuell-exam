import crypto from 'crypto';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';

// GET all orders
export const getAllOrders = async () => {
	try {
		const result = await Order.find();
		return {
			success: true,
			orders: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

// GET order by user ID
export const getOrderByUserId = async (userId) => {
	try {
		const result = await Order.find({ userId });
		return {
			success: true,
			orders: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

// POST new order
export const newOrder = async (cartId) => {
	try {
		// Leta upp cart med cartId
		const cart = await Cart.findOne({ cartId });

		// Om carten inte finns
		if (!cart) {
			return {
				success: false,
				message: 'No cart found',
			};
		}

		// Om cart inte innehåller något
		if (cart.items.length === 0) {
			return {
				success: false,
				message: 'Cart is empty',
			};
		}

		// Räkna ut totales
		const sum = cart.items.reduce((total, item) => {
			return total + item.price * item.qty;
		}, 0);

		// Sätt vilket userId som ska sparas i ordern
		let userId;

		if (cart.userId) {
			// Om man är inloggad
			userId = cart.userId;
		} else if (global.user) {
			userId = global.user.userId;
		} else {
			userId = null;
		}

		// Skapa random orderId om inte inloggad
		const orderId = crypto.randomUUID().substring(0, 5);

		// Skapa ordern
		const order = await Order.create({
			orderId,
			userId,
			items: cart.items,
			sum,
		});

		// Ta bort carten med cartId
		await Cart.deleteOne({ cartId });

		// Returnera ordern
		return {
			success: true,
			order,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};
