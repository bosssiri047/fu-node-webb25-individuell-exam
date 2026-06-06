import { keyExists } from '../services/keys.service.js';

export const authenticateKey = async (req, res, next) => {
	const apiKey = req.headers['x-api-key'];
	if (!apiKey) {
		return next({
			status: 401,
			message: 'No API key provided',
		});
	}

	const result = await keyExists(apiKey);

	if (!result.success) {
		return next({
			status: 401,
			message: result.message,
		});
	}
	next();
};

// Kontrollera att användaren är inloggad
export const authorizeUser = (req, res, next) => {
	const user = global.user;
	if (!user) {
		return next({
			status: 401,
			message: 'User not logged in',
		});
	}
	next();
};

//Kontrollera att användaren är admin ( extra för admin-routes )
export const authorizeAdmin = (req, res, next) => {
	const user = global.user;
	if (!user) {
		return next({
			status: 401,
			message: `User not logged in`,
		});
	}
	if (user.role !== 'admin') {
		return next({
			status: 403,
			message: `Admin acces required`,
		});
	}
};
