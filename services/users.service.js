import User from '../models/user.model.js';

// POST register user
export const addNewUser = async (user) => {
	try {
		const result = await User.create(user);
		return {
			success: true,
			user: result,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

// POST login
export const getUser = async (username) => {
	try {
		const user = await User.findOne({ username });
		if (!user)
			return {
				success: false,
				message: `user not found`,
			};
		return { success: true, user };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

// GET user by ID - extrafunktion
export const getUserById = async (userId) => {
	try {
		const user = await User.findOne({ userId });
		if (!user) {
			return { success: false, message: `User not found` };
		}
		return { success: true, user };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
