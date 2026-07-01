// Variables and Data Types
let message = "Hello, JavaScript!";
console.log(message);

// Function Declaration
function greetUser() {
    alert("Welcome to Lab 5 - Frontend Aesthetics!");
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
        sidebarToggle.textContent = navLinks.classList.contains("open") ? "✕ Close" : "☰ Menu";
    });

    // Bonus: dark mode toggle using CSS variables
    let darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        // swap the button label to reflect current mode
        darkModeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
        console.log("Dark mode toggled.");
    });
});