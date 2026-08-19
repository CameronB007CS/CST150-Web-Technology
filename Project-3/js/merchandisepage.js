/*
    merchandisepage.js
    -------------------
    Renders the full product grid on merchandise.html, plus the category
    filter chips above it.
*/

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("merchandiseGrid");
    if (!grid) return; // only run this on merchandise.html

    renderCategoryFilters();
    renderMerchandiseGrid("All");
});

function renderCategoryFilters() {
    const categories = ["All"].concat(
        Array.from(new Set(PRODUCTS.map(function (p) { return p.category; })))
    );
    const container = document.getElementById("categoryFilters");
    if (!container) return;

    container.innerHTML = categories.map(function (cat, index) {
        return '<button class="filter-chip' + (index === 0 ? ' active' : '') + '" data-category="' + cat + '">' + cat + '</button>';
    }).join("");

    container.querySelectorAll(".filter-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
            container.querySelectorAll(".filter-chip").forEach(function (c) { c.classList.remove("active"); });
            chip.classList.add("active");
            renderMerchandiseGrid(chip.dataset.category);
        });
    });
}

function renderMerchandiseGrid(category) {
    const grid = document.getElementById("merchandiseGrid");
    const filtered = category === "All" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === category; });
    grid.innerHTML = filtered.map(renderProductCard).join("");
}
