import User from '../models/user.model.js';

// Validate login body
export const validateLoginBody = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            status: 400,
            message: 'Username and password is required in request body',
        });
    }

    next();
};

// Validate register body
export const validateRegisterBody = (req, res, next) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        next({
            status: 400,
            message: 'Username, password and role are required in request body',
        });
    }

    next();
};

// Validate cart body
export const validateCartBody = (req, res, next) => {
    const { prodId, qty } = req.body;

    if (!prodId || !qty) {
        next({
            status: 400,
            message: 'prodId and qty are required in request body',
        });
    }

    next();
};

// Validate order body
export const validateOrderBody = (req, res, next) => {
    const { cartId } = req.body;

    if (!cartId) {
        next({
            status: 400,
            message: 'cartId and qty are required in request body',
        });
    }

    next();
};
