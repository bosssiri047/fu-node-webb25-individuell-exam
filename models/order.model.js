import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    prodId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    cartId: {
        type: String,
        required: true,
    },
    items: [
        orderItemSchema
    ]
});

const Order = mongoose.model('Order', orderSchema);

export default Order;