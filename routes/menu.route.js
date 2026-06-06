import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { getMenu } from '../services/menu.service.js';

const router = Router();

// GET menu
router.get('/', authenticateKey, async (req, res, next) => {
    const result = await getMenu();

    if (result.success) {
        res.json({
            success: true,
            menu: result.menu,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

export default router;
