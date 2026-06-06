import Key from "../models/key.model.js";

// Get random API key
export const getKey = async () => {
    try {
        const result = await Key.find();
        return {
            success : true,
            key : result[Math.floor(Math.random() * result.length)].key
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

// Is key in database?
export const keyExists = async (key) => {
    try {
        const result = await Key.exists({ key });
        if(result) {
            return { success : true }
        } else throw new Error('Invalid key');
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}