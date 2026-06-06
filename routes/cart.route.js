import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { getCarts, addCart, getCartByID } from '../services/cart.service.js';
import { validateCartBody } from '../middlewares/validate.middlewate.js';

const router = Router();

router.use(authenticateKey);

//GET All carts
router.get('/', async (req, res, next) => {
    const result = await getCarts();

    if (result.success) {
        res.json({
            success: true,
            carts: result.cart,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

//GET cart by ID
router.get('/:cartId', async (req, res, next) => {
    const result = await getCartByID(req.params);

    if (result.success) {
        res.json({
            success: true,
            cart: result.cart,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

// PATCH cart
router.patch('/', validateCartBody, async (req, res, next) => {
    const product = req.body;
    const user = global.user;

    if (!user) {
        const result = await addCart({
            cartId: crypto.randomUUID().substring(0, 5),
            ...product,
        });

        if (result.success) {
            res.json({
                success: true,
                carts: result.cart,
            });
        } else {
            next({
                status: 400,
                message: result.message,
            });
        }
    } else if (user) {
        const result = await addCart({
            cartId: user.userId,
            ...product,
        });

        if (result.success) {
            res.json({
                success: true,
                carts: result.cart,
            });
        } else {
            next({
                status: 400,
                message: result.message,
            });
        }
    }
});

export default router;
