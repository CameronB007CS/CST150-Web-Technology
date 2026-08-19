/*
    admin.js
    --------
    Reads completed orders out of localStorage and renders the sales summary
    table - one row per line item, showing who bought what, at what cost
    price and sale price, so profit per sale is visible at a glance.

    TODO (backend integration): replace loadOrders() with a fetch() to
    something like GET /api/admin/sales, which would join orders,
    order_items, customers and products server-side. The rendering logic
    below can stay as-is since it already expects that flattened shape.
*/

const ORDERS_KEY = "nightwave_orders";
const ADMIN_SESSION_KEY = "nightwave_admin_session";

document.addEventListener("DOMContentLoaded", function () {
    // simple client-side gate - a real deployment would check this server-side
    if (sessionStorage.getItem(ADMIN_SESSION_KEY) !== "true") {
        window.location.href = "login.html";
        return;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem(ADMIN_SESSION_KEY);
            window.location.href = "login.html";
        });
    }

    renderSalesSummary();
});

function loadOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
}

function renderSalesSummary() {
    const orders = loadOrders();
    const tableBody = document.getElementById("salesTableBody");
    const emptyState = document.getElementById("salesEmptyState");

    if (orders.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
    }
    if (emptyState) emptyState.style.display = "none";

    let totalRevenue = 0;
    let totalCost = 0;
    let rowsHtml = "";

    orders.forEach(function (order) {
        order.items.forEach(function (item) {
            const lineRevenue = item.sale_price * item.quantity;
            const lineCost = item.cost_price * item.quantity;
            const lineProfit = lineRevenue - lineCost;

            totalRevenue += lineRevenue;
            totalCost += lineCost;

            rowsHtml +=
                '<tr>' +
                    '<td>#' + order.order_id + '</td>' +
                    '<td>' + order.customer.email + '</td>' +
                    '<td>' + item.product_title + '</td>' +
                    '<td>' + item.quantity + '</td>' +
                    '<td>$' + item.cost_price.toFixed(2) + '</td>' +
                    '<td>$' + item.sale_price.toFixed(2) + '</td>' +
                    '<td class="profit-cell">$' + lineProfit.toFixed(2) + '</td>' +
                    '<td>' + formatDate(order.order_date) + '</td>' +
                '</tr>';
        });
    });

    tableBody.innerHTML = rowsHtml;

    // summary stat cards at the top of the page
    setStatValue("statOrders", orders.length);
    setStatValue("statRevenue", "$" + totalRevenue.toFixed(2));
    setStatValue("statProfit", "$" + (totalRevenue - totalCost).toFixed(2));
}

function setStatValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}
