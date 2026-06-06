import { Router } from 'express';
import { getAllOrders, getOrderByUserId, newOrder } from '../services/order.service.js';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { validateNewOrder } from '../middlewares/validation.middleware.js';

const router = Router();

// GET all orders
router.get('/', authenticateKey, async (req, res, next) => {
	const result = await getAllOrders();
	if (result.success) {
		res.json({
			success: true,
			orders: result.orders,
		});
	} else {
		next({
			status: 404,
			message: result.message,
		});
	}
});

// GET order by user ID
router.get('/:userId', authenticateKey, async (req, res, next) => {
	const { userId } = req.params;
	const result = await getOrderByUserId(userId);

	if (result.success) {
		res.json({
			success: true,
			orders: result.orders,
		});
	} else {
		next({
			status: 404,
			message: result.message,
		});
	}
});

// POST new order
router.post('/', authenticateKey, validateNewOrder, async (req, res) => {
	const { cartId } = req.body;

	const result = await newOrder(cartId);

	if (!result.success) {
		return res.status(400).json(result);
	}

	res.status(201).json(result);
});

export default router;
