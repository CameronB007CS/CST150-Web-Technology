/*
    main.js
    -------
    Shared behaviour used across every page: mobile nav toggle, footer year,
    cart badge refresh, and the product card / waveform rendering helpers
    used by index.html and merchandise.html.
*/

document.addEventListener("DOMContentLoaded", function () {
    // keep the cart badge accurate no matter which page just loaded
    updateCartBadge();

    // footer year, so it never needs manually updating
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // mobile nav toggle
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");
    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            siteNav.classList.toggle("open");
        });
    }

    // highlights the current page's nav link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

/*
    renderWaveform()
    -----------------
    Builds a small animated "waveform" placeholder used in place of a real
    product_image. Each product gets a gradient assigned based on its
    category so the grid still reads as organised. Once real product images
    exist in the DB this can be swapped for a plain <img src="product_image">.
*/
function renderWaveform(product) {
    const gradients = {
        Mixes: "grad-pink",
        Samples: "grad-blue",
        Visuals: "grad-purple",
        Passes: "grad-cyan"
    };
    const gradientClass = gradients[product.category] || "grad-pink";

    // bar heights are randomised per product (but consistent per id) so
    // every waveform looks a little different instead of all identical
    let bars = "";
    for (let i = 0; i < 24; i++) {
        const seed = (product.product_id * 7 + i * 13) % 100;
        const height = 20 + (seed % 60);
        bars += '<span style="height:' + height + '%"></span>';
    }

    return (
        '<div class="waveform ' + gradientClass + '">' +
            '<div class="waveform-bars">' + bars + '</div>' +
        '</div>'
    );
}

/*
    renderProductCard()
    --------------------
    Builds the HTML for a single product card. Used on both index.html
    (featured products) and merchandise.html (full catalogue).
*/
function renderProductCard(product) {
    return (
        '<article class="product-card">' +
            '<div class="product-thumb">' +
                renderWaveform(product) +
                '<span class="price-tag">$' + product.sell_price.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="product-body">' +
                '<span class="product-category">' + product.category + '</span>' +
                '<h3>' + product.product_title + '</h3>' +
                '<p>' + product.product_description + '</p>' +
                '<button class="btn btn-primary btn-full" onclick="addToCart(' + product.product_id + '); showAddedToast(\'' + product.product_title.replace(/'/g, "\\'") + '\')">Add to Cart</button>' +
            '</div>' +
        '</article>'
    );
}

/*
    showAddedToast()
    -----------------
    Small confirmation message that appears briefly after adding an item,
    so the shopper gets feedback without leaving the page.
*/
function showAddedToast(productTitle) {
    let toast = document.getElementById("cartToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cartToast";
        toast.className = "cart-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = productTitle + " added to cart";
    toast.classList.add("visible");

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(function () {
        toast.classList.remove("visible");
    }, 2200);
}
