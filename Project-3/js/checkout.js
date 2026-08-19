/*
    checkout.js
    -----------
    Renders the order summary, validates the delivery details form, and on
    submit builds an order object and saves it to localStorage as a stand-in
    for a real database write.

    TODO (backend integration): replace the localStorage write in
    completeOrder() with a POST to something like /api/orders, sending the
    same shape of data (customer details + cart items). The customers,
    orders and order_items tables in the schema map directly onto this
    object's fields, so the backend mapping should be a fairly direct swap.
*/

const ORDERS_KEY = "nightwave_orders";

document.addEventListener("DOMContentLoaded", function () {
    renderOrderSummary();

    const form = document.getElementById("checkoutForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            handleCheckoutSubmit();
        });
    }
});

// builds the read-only summary list of items and the total, shown above the form
function renderOrderSummary() {
    const items = getCartWithDetails();
    const container = document.getElementById("orderSummaryItems");
    const totalEl = document.getElementById("orderSummaryTotal");

    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-note">Your cart is empty. <a href="merchandise.html">Browse merchandise</a> before checking out.</p>';
        if (totalEl) totalEl.textContent = "$0.00";
        return;
    }

    container.innerHTML = items.map(function (item) {
        return (
            '<div class="summary-row">' +
                '<span>' + item.product_title + ' <span class="qty-note">x' + item.quantity + '</span></span>' +
                '<span>$' + item.subtotal.toFixed(2) + '</span>' +
            '</div>'
        );
    }).join("");

    if (totalEl) {
        totalEl.textContent = "$" + getCartTotal().toFixed(2);
    }
}

// runs all the field checks, shows inline errors, and stops here if anything's invalid
function handleCheckoutSubmit() {
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const suburb = document.getElementById("suburb").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (!emailPattern.test(email)) {
        showFieldError("email", "Please enter a valid email address.");
        valid = false;
    } else {
        clearFieldError("email");
    }

    if (phone.length < 8) {
        showFieldError("phone", "Please enter a valid phone number.");
        valid = false;
    } else {
        clearFieldError("phone");
    }

    if (suburb === "") {
        showFieldError("suburb", "Please enter your suburb.");
        valid = false;
    } else {
        clearFieldError("suburb");
    }

    if (getCart().length === 0) {
        valid = false;
        alert("Your cart is empty - add something before checking out.");
    }

    if (!valid) return;

    completeOrder({ email: email, phone: phone, suburb: suburb });
}

function showFieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "Error");
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("visible");
    }
}

function clearFieldError(fieldId) {
    const errorEl = document.getElementById(fieldId + "Error");
    if (errorEl) errorEl.classList.remove("visible");
}

// builds the order object and writes it to localStorage, then clears the cart
function completeOrder(customer) {
    const items = getCartWithDetails();
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

    const newOrder = {
        order_id: orders.length > 0 ? Math.max.apply(null, orders.map(function (o) { return o.order_id; })) + 1 : 1,
        customer: customer,
        order_date: new Date().toISOString(),
        status: "Completed",
        total_amount: Math.round(getCartTotal() * 100) / 100,
        items: items.map(function (item) {
            return {
                product_id: item.product_id,
                product_title: item.product_title,
                quantity: item.quantity,
                cost_price: item.cost_price,
                sale_price: item.sell_price,
                subtotal: item.subtotal
            };
        })
    };

    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    clearCart();
    showOrderConfirmation(newOrder);
}

// swaps the checkout form out for a simple confirmation message
function showOrderConfirmation(order) {
    const checkoutContent = document.getElementById("checkoutContent");
    if (!checkoutContent) return;

    checkoutContent.innerHTML =
        '<div class="confirmation-box">' +
            '<h2>Order Confirmed</h2>' +
            '<p>Thanks - order #' + order.order_id + ' is complete. A confirmation would normally be emailed to <strong>' + order.customer.email + '</strong>.</p>' +
            '<p class="confirmation-total">Total paid: $' + order.total_amount.toFixed(2) + '</p>' +
            '<a href="merchandise.html" class="btn btn-primary">Continue Shopping</a>' +
        '</div>';
}
