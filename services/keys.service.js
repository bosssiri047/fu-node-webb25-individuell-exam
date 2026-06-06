import Key from "../models/key.model.js";

export const getKey = async () => {
    try {
        const keys = await Key.aggregate([{ $sample: { size: 1 } }]);
        if (!keys.length)
            return {
                success: false,
                message:
                    "Ingen API Nyckel hittades i databasen - lägg till nyckel i MongoDB Compass",
            };
        return {
            success: true,
            key: keys[0].key,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const keyExists = async (apiKey) => {
    try {
        const key = await Key.findOne({
            key: apiKey,
        });
        if (!key) {
            return {
                success: false,
                message: "Ogiltig API Nyckel",
            };
        }
        return {
            success: true,
            key: key,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
