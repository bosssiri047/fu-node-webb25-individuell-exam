import mongoose from 'mongoose';

const keySchema = new mongoose.Schema({
	key: {
		type: String,
		required: true,
		unique: true,
	},
});

const Key = mongoose.model('Key', keySchema);

export default Key;
