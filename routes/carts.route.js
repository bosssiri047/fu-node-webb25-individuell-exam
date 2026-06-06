import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { getCart, getAllCarts, updateCart } from '../services/cart.service.js';
import crypto from 'crypto';

const router = Router();
router.use(authenticateKey);

// GET all carts
router.get('/', async (req, res, next) => {
	try {
		const result = await getAllCarts();
		if (result.success) {
			res.json({
				success: true,
				carts: result.carts,
			});
		} else {
			next({ status: 404, message: result.message });
		}
	} catch (error) {
		next({ status: 500, message: error.message });
	}
});

// GET cart by cartId
router.get('/:cartId', async (req, res, next) => {
	try {
		const { cartId } = req.params;

		const result = await getCart(cartId);

		if (result.success) {
			res.json({
				success: true,
				cart: result.cart,
			});
		} else {
			next({ status: 404, message: result.message });
		}
	} catch (error) {
		next({ status: 500, message: error.message });
	}
});

// PATCH cart items
router.patch('/', async (req, res, next) => {
	try {
		const { prodId, qty, cartId: guestCartId } = req.body;

		if (!prodId) {
			return next({ status: 400, message: `prodId is required` });
		}
		if (qty === undefined || qty === null) {
			return next({ status: 400, message: `qty is required` });
		}
		// Koll vem det är (bestäm cart)
		let cartId;
		let userId = null; //userID deklareras
		if (global.user) {
			// Inloggad användare - använd userId som cartId
			cartId = global.user.userId;
			userId = global.user.userId; // om inloggad läggs userId till
		} else if (guestCartId) {
			// Gäst cartId benfintligt
			cartId = guestCartId;
		} else {
			// Ny gäst - Skapar nytt cartId
			cartId = crypto.randomUUID().substring(0, 5);
		}

		const result = await updateCart(cartId, prodId, qty, userId);
		if (result.success) {
			res.json({
				success: true,
				cartId: cartId,
				cart: result.cart,
			});
		} else {
			next({ status: 400, message: result.message });
		}
	} catch (error) {
		next(error);
	}
});

export default router;
