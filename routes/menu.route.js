import { Router } from "express";
import { getMenuItems } from "../services/menu.service.js";
import { authenticateKey } from "../middlewares/auth.middleware.js";

const router = Router();

// GET all menu items
router.get("/", authenticateKey, async (req, res, next) => {
    const result = await getMenuItems();
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
