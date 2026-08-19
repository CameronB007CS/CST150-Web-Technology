/*
    cart.js
    -------
    Handles all cart state. Cart is stored in localStorage as a simple
    array of { product_id, quantity } so it survives page navigation
    without a backend.

    TODO (backend integration): once the Flask API is live, swap
    localStorage.getItem/setItem below for fetch() calls to the cart
    endpoints, and swap PRODUCTS (from data.js) for a fetch() to
    GET /api/products. The function signatures below can stay the same
    so merchandise.html, cart.html and checkout.html don't need to change.
*/

const CART_KEY = "nightwave_cart";

// reads the raw cart array out of localStorage, returns [] if nothing is stored yet
function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}

// saves the cart array back to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// adds a product to the cart, or increases its quantity if it's already in there
function addToCart(productId, quantity) {
    quantity = quantity || 1;
    const cart = getCart();
    const existing = cart.find(function (item) { return item.product_id === productId; });

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product_id: productId, quantity: quantity });
    }

    saveCart(cart);
    updateCartBadge();
}

// sets a specific item's quantity directly (used by the stepper on cart.html)
function updateCartQuantity(productId, quantity) {
    let cart = getCart();

    if (quantity <= 0) {
        cart = cart.filter(function (item) { return item.product_id !== productId; });
    } else {
        const item = cart.find(function (item) { return item.product_id === productId; });
        if (item) item.quantity = quantity;
    }

    saveCart(cart);
    updateCartBadge();
}

// removes an item from the cart entirely
function removeFromCart(productId) {
    const cart = getCart().filter(function (item) { return item.product_id !== productId; });
    saveCart(cart);
    updateCartBadge();
}

// empties the whole cart - called after a successful checkout
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
}

// joins the cart's { product_id, quantity } entries with full product details from PRODUCTS
function getCartWithDetails() {
    return getCart().map(function (item) {
        const product = PRODUCTS.find(function (p) { return p.product_id === item.product_id; });
        return {
            product_id: item.product_id,
            quantity: item.quantity,
            product_title: product ? product.product_title : "Unknown product",
            sell_price: product ? product.sell_price : 0,
            cost_price: product ? product.cost_price : 0,
            product_image: product ? product.product_image : "",
            subtotal: product ? Math.round(product.sell_price * item.quantity * 100) / 100 : 0
        };
    });
}

// total quantity across the whole cart, used for the nav badge
function getCartCount() {
    return getCart().reduce(function (sum, item) { return sum + item.quantity; }, 0);
}

// total cost of everything in the cart
function getCartTotal() {
    return getCartWithDetails().reduce(function (sum, item) { return sum + item.subtotal; }, 0);
}

// updates the little number badge next to the cart icon in the nav, on every page
function updateCartBadge() {
    const badge = document.getElementById("cartCount");
    if (badge) {
        badge.textContent = getCartCount();
    }
}
