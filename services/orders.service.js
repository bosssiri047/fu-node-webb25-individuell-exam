import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import { removeCart } from './cart.service.js';

// GET orders
export const getOrders = async () => {
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

// GET orders by ID
export const getOrderByID = async (userId) => {
    try {
        const result = await Order.find({ cartId: userId.userId });
        if (result.length === 0) throw new Error('Could not find order');
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

// POST order
export const addOrder = async (order) => {
    try {
        console.log(order);
        const cart = await Cart.findOne({ cartId: order.cartId });
        console.log(cart);
        console.log('Creating order...');
        const result = await Order.create({
            orderId: order.orderId,
            cartId: cart.cartId,
            items: cart.items,
        });
        removeCart(order.cartId);
        return {
            success: true,
            order: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
