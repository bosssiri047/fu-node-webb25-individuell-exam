import User from '../models/user.model.js';

// Add new user
export const addNewUser = async (user) => {
    try {
        const result = await User.create(user);
        return {
            success : true,
            user : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Get user
export const getUser = async (username) => {
    try {
        const result = await User.findOne({ username });
        if(result) {
            return {
                success : true,
                user : result
            }
        } else throw new Error('User not found');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}
