import { keyExists } from '../services/keys.service.js';
import { verifyToken } from "../utils/jwt.utils.js";

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
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZjYxNiIsInVzZXJuYW1lIjoiU29saWQgU25ha2UiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc3OTcxMDAyOSwiZXhwIjoxNzc5NzEzNjI5fQ.LsQeJsGP8RWLFe_w91BkBfexAQz5gTAmAJDLu4_rMJ4
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        next({
            status : 401,
            message : 'No token provided'
        })
    }
    const verified = verifyToken(token);

    if(!verified.success) {
        next({
            status : 401,
            message : verified.message
        });
    }

    req.user = verified.user;
    console.log(req.user);
    next();
};