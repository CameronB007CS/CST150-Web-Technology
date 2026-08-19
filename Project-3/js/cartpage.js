/*
    cartpage.js
    -----------
    Rendering logic specific to cart.html - builds the item list with
    quantity steppers and remove buttons, and keeps the total in sync.
    Kept separate from cart.js so cart.js only handles cart *data* and can
    be reused as-is once it's swapped over to talk to the backend.
*/

document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("cartItems")) return; // only run this on cart.html
    renderCartPage();
});

function renderCartPage() {
    const items = getCartWithDetails();
    const container = document.getElementById("cartItems");
    const emptyState = document.getElementById("cartEmptyState");
    const totalEl = document.getElementById("cartTotal");
    const checkoutLink = document.getElementById("checkoutLink");

    if (items.length === 0) {
        container.innerHTML = "";
        if (emptyState) emptyState.style.display = "block";
        if (checkoutLink) checkoutLink.classList.add("disabled");
        if (totalEl) totalEl.textContent = "$0.00";
        return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (checkoutLink) checkoutLink.classList.remove("disabled");

    container.innerHTML = items.map(function (item) {
        return (
            '<div class="cart-row">' +
                '<div class="cart-row-thumb">' + renderMiniWaveform(item.product_id) + '</div>' +
                '<div class="cart-row-info">' +
                    '<h3>' + item.product_title + '</h3>' +
                    '<p>$' + item.sell_price.toFixed(2) + ' each</p>' +
                '</div>' +
                '<div class="cart-row-qty">' +
                    '<button class="qty-btn" onclick="changeQty(' + item.product_id + ', ' + (item.quantity - 1) + ')">-</button>' +
                    '<span>' + item.quantity + '</span>' +
                    '<button class="qty-btn" onclick="changeQty(' + item.product_id + ', ' + (item.quantity + 1) + ')">+</button>' +
                '</div>' +
                '<div class="cart-row-subtotal">$' + item.subtotal.toFixed(2) + '</div>' +
                '<button class="remove-btn" onclick="removeItem(' + item.product_id + ')" aria-label="Remove item">Remove</button>' +
            '</div>'
        );
    }).join("");

    if (totalEl) totalEl.textContent = "$" + getCartTotal().toFixed(2);
}

// smaller version of the waveform used on the cart row, so items are still visually identifiable
function renderMiniWaveform(productId) {
    const product = PRODUCTS.find(function (p) { return p.product_id === productId; });
    if (!product) return "";
    return renderWaveform(product);
}

function changeQty(productId, newQuantity) {
    updateCartQuantity(productId, newQuantity);
    renderCartPage();
}

function removeItem(productId) {
    removeFromCart(productId);
    renderCartPage();
}
