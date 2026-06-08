import { verifyToken } from "../utils/jwt.utils.js";

//Kontrollera att användaren är admin ( extra för admin-routes )
export const authorizeAdmin = (req, res, next) => {
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

	if (verified.user.role !== 'admin') {
		return next({
			status: 403,
			message: `Admin access required`,
		});
	} else {
        next();
    }
};