import { Router } from "express";
import { getProductById } from "../services/products.service.js";

const router = Router();

// GET menu items by prodId
router.get("/:cartid", async (req, res, next) => {
    const { cartid } = req.params;

    const productResult = await getProductById(cartid);
    if (!productResult.success) {
        next({
            status: 404,
            message: productResult.message,
        });
    } else {
        res.json({
            success: true,
            product: productResult.product,
        });
    }
});

export default router;
