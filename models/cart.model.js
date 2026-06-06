import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartItemsSchema = new mongoose.Schema({
	prodId: String,
	title: String,
	price: Number,
	qty: { type: Number, default: 1 },
});

// Vad innehåller cart
const cartSchema = new mongoose.Schema({
	cartId: {
		type: String,
		unique: true,
		required: true,
	},
	userId: {
		type: String,
		default: null,
	},
	items: [cartItemsSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
