import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Hämta specifik kundvagn
export const getCart = async (cartId) => {
	try {
		const cart = await Cart.findOne({ cartId });

		if (!cart) {
			return {
				success: false,
				message: 'Cart not found',
			};
		}
		return { success: true, cart };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

// Hämta alla carts
export const getAllCarts = async () => {
	try {
		const carts = await Cart.find();
		return { success: true, carts };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

// Uppdatera cart (OBS detta är PATCH) - skapa, lägg till, ta bort, uppdatera qty
export const updateCart = async (cartId, prodId, qty, userId) => {
	try {
		// 1. VALIDERING: Kolla att produkten finns i menyn
		const product = await Product.findOne({ prodId });
		if (!product) {
			return { success: false, message: 'Product not found in menu' };
		}

		// 2. Hitta eller skapa kundvagn
		let cart = await Cart.findOne({ cartId });

		if (!cart) {
			// Skapa ny kundvagn
			cart = new Cart({
				cartId,
				items: [],
			});
		}
		// OM inloggad: userId sparas i cart
		if (userId) {
			cart.userId = userId;
		}

		// Kolla om produkten redan finns i kundvagnen
		const existingItem = cart.items.find((item) => item.prodId === prodId);

		if (existingItem) {
			// Uppdatera antal (eller ta bort)
			existingItem.qty = qty;

			// Ta bort om antal blir 0 eller mindre
			if (existingItem.qty <= 0) {
				cart.items = cart.items.filter((item) => item.prodId !== prodId);
			}
		} else if (qty > 0) {
			// lägg till ny produkt (enbart om det ökas)
			cart.items.push({
				prodId: product.prodId,
				title: product.title,
				price: product.price,
				qty: qty,
			});
		}

		// Spara kundvagnen
		await cart.save();
		return { success: true, cart };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
