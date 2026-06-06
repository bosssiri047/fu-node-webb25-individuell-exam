import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { addNewUser, getUser } from '../services/users.service.js';
import {
    validateLoginBody,
    validateRegisterBody,
} from '../middlewares/validate.middlewate.js';

const router = Router();

router.use(authenticateKey);

// POST register user
router.post('/register', validateRegisterBody, async (req, res, next) => {
    const user = req.body;
    // if(!user) {
    //     next({
    //         status : 400,
    //         message : 'No request body provided'
    //     });
    // }

    const result = await addNewUser({
        userId: crypto.randomUUID().substring(0, 5),
        ...user,
    });

    if (result.success) {
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: result.user,
        });
    } else {
        next({
            status: 400,
            message: result.message,
        });
    }
});

// POST login user
router.post('/login', validateLoginBody, async (req, res, next) => {
    const user = req.body;
    // if(!user) {
    //     next({
    //         status : 400,
    //         message : 'No request body provided'
    //     });
    // }

    const result = await getUser(user.username);
    if (result.success) {
        if (result.user.password === user.password) {
            global.user = result.user;

            res.json({
                success: true,
                message: 'User logged in successfully',
                user: result.user,
            });
        } else {
            next({
                statsu: 401,
                message: 'Invalid password',
            });
        }
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

export default router;
