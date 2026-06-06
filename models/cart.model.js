import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
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

const cartSchema = new Schema({
    cartId: {
        type: String,
        unique: true,
        required: true,
    },
    items: [
        cartItemSchema
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;