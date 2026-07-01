// Variables and Data Types
let message = "Hello, JavaScript!";
console.log(message);

// Function Declaration
function greetUser() {
    alert("Welcome to JavaScript Fundamentals and Responsive Design!");
}

// Run after the page has loaded
document.addEventListener("DOMContentLoaded", function () {
    greetUser();

    // DOM Manipulation - from Lab 3
    let button = document.getElementById("changeText");
    let text = document.getElementById("text");

    button.addEventListener("click", function () {
        text.textContent = "You clicked the button! JavaScript is working inside a responsive layout.";
        text.style.color = "blue";
        console.log("Button clicked successfully.");
    });

    // Bonus: collapsible sidebar toggle for mobile
    let sidebarToggle = document.getElementById("sidebarToggle");
    let navLinks = document.getElementById("navLinks");

    sidebarToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        // swap the button label so the user knows what clicking will do
        sidebarToggle.textContent = navLinks.classList.contains("open") ? "✕ Close" : "☰ Menu";
    });
});