import { Router } from 'express';
import crypto from 'crypto';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { addNewUser, getUser } from '../services/users.service.js';

const router = Router();
router.use(authenticateKey);

// POST register user
router.post('/register', async (req, res, next) => {
	try {
		const { username, password, role } = req.body;

		// Validering
		if (!username || !password) {
			return next({
				status: 400,
				message: 'Username and password are required',
			});
		}

		// Kolla så att lösenordet är minst 6 tecken
		if (username.length < 6 || password.length < 6) {
			return next({
				status: 400,
				message: 'Username and password must be at least 6 characters',
			});
		}

		// Validera roller
		const userRole = role === 'admin' ? 'admin' : 'user';

		const result = await addNewUser({
			userId: crypto.randomUUID().substring(0, 5),
			username: username,
			password: password,
			role: userRole,
		});

		if (result.success) {
			res.status(201).json({
				success: true,
				message: 'User registered successfully',
				user: {
					userId: result.user.userId,
					username: result.user.username,
					role: result.user.role,
				},
			});
		} else {
			next({
				status: 400,
				message: result.message,
			});
		}
	} catch (error) {
		next({
			status: 500,
			message: 'Internal server error during registration',
		});
	}
});

// POST login user
router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Validering
		if (!username || !password) {
			return next({
				status: 400,
				message: `Username and password are required `,
			});
		}
		const result = await getUser(username);

		if (!result.success) {
			return next({
				status: 404,
				message: `User not found`,
			});
		}

		// 401 Unauthorized
		if (result.user.password !== password) {
			return next({
				status: 401,
				message: `Invalid Password`,
			});
		}

		// Global user
		global.user = result.user;
		res.json({
			success: true,
			message: `User logged in sucessfully`,
			user: {
				userId: result.user.userId,
				username: result.user.username,
				role: result.user.role,
			},
		});
	} catch (error) {
		next(error);
	}
});

// POST log out - extra funktion
router.post('/logout', async (req, res, next) => {
	try {
		global.user = null;
		res.json({
			success: true,
			message: `User logged out successfully`,
		});
	} catch (error) {
		next(error);
		next({
			status: 500,
			message: `Internal Server Error during logout`,
		});
	}
});

export default router;
