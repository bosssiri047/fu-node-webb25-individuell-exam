import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		orderId: {
			type: String,
			required: true,
			unique: true,
		},
		userId: {
			type: String,
			required: false, // false för att tillåta guest
			default: null,
		},
		items: [
			{
				prodId: String,
				title: String,
				price: Number,
				qty: Number,
			},
		],
		sum: {
			type: Number,
			required: true,
		},
	},

	{ timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
