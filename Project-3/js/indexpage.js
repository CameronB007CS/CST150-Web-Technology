/*
    indexpage.js
    ------------
    Renders the "Fresh Off the Decks" featured product row on index.html.
    Just shows the first four products - the full catalogue lives on
    merchandise.html.
*/

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("featuredGrid");
    if (!grid) return; // only run this on index.html

    const featured = PRODUCTS.slice(0, 4);
    grid.innerHTML = featured.map(renderProductCard).join("");
});
