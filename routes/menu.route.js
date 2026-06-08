import { Router } from "express";
import { addMenuItem, deleteMenuItemById, getMenuItems, updateItem } from "../services/menu.service.js";
import { authenticateKey, authorizeUser } from "../middlewares/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";

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

// POST add menu iitem
router.post("/", authenticateKey, authorizeAdmin, authorizeUser, async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;
        if (!title || !desc || !price) {
			return next({
				status: 400,
				message: 'All fields are required'
			});
		} else {
            const result = await addMenuItem(title, desc, price);
            res.json({
                success: true,
                product: result
            });
        }

    } catch (error) {
        next({
			status: 500,
			message: 'Internal server error during adding item',
		});
    }
});

// DELETE menu item by ID
router.delete("/:prodId", authenticateKey, authorizeAdmin, authorizeUser, async (req, res, next) => {
    const { prodId } = req.params;

    const result = await deleteMenuItemById(prodId);

    if(result.success) {
        res.json({
            success : true,
            item : result.item
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

// PATCH menu item by ID
router.patch('/:prodId', authorizeUser, authorizeAdmin, authorizeUser, async (req, res, next) => {
    const { prodId } = req.params;
    const item = req.body;
    if(!item) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await updateItem(prodId, item);
    console.log(result);
    
    if(result.success) {
        res.json({
            success : true,
            message : 'Item updated successfully',
            item : result.item
        });
    } else {
        next({
            status : 400,
            message : result.message
        });
    }
});

export default router;
