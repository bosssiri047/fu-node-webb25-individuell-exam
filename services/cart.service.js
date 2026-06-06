import Cart from '../models/cart.model.js';
import Product from '../models/menu.model.js';

// GET carts
export const getCarts = async () => {
    try {
        const result = await Cart.find();
        return {
            success: true,
            cart: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// GET cart by ID
export const getCartByID = async (cartId) => {
    try {
        const result = await Cart.findOne(cartId);
        if (!result) throw new Error('Could not find cart');
        return {
            success: true,
            cart: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// PATCH cart
export const addCart = async (product) => {
    try {
        console.log(product);
        const cart = await Cart.findOne({ cartId: product.cartId });
        const item = await Product.findOne({ prodId: product.prodId });
        console.log(item);

        if (cart) {
            const cartItem = cart.items.find(
                (i) => i.prodId === product.prodId,
            );
            if (cartItem) {
                cartItem.qty = product.qty;

                if (cartItem.qty < 1) {
                    cart.items = cart.items.filter(
                        (i) => i.prodId !== cartItem.prodId,
                    );

                    if (cart.items.length === 0) {
                        removeCart(cart.cartId);
                    }
                }
            } else {
                if (product.qty < 1) throw new Error('Invalid qty');
                cart.items.push({
                    price: item.price,
                    title: item.title,
                    prodId: item.prodId,
                    qty: product.qty,
                });
            }
            const updatedCart = await cart.save();

            return {
                success: true,
                cart: updatedCart,
            };
        } else if (!cart) {
            console.log('Creating cart...');
            if (product.qty < 1) throw new Error('Invalid qty');

            const result = await Cart.create({
                cartId: product.cartId,
                items: [
                    {
                        ...item,
                        qty: product.qty,
                    },
                ],
            });

            return {
                success: true,
                cart: result,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

//DELETE cart by ID
export const removeCart = async (cartId) => {
    try {
        const result = await Cart.findOneAndDelete({ cartId });
        return {
            success: true,
            todo: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
