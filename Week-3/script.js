// Task 2: Variables and Data Types
let message = "Hello, JavaScript!";
console.log(message);

// Task 2: Function Declaration
function greetUser() {
    alert("Welcome to JavaScript Fundamentals!");
}

// Task 3: DOM Manipulation
let button = document.getElementById("changeText");
let text = document.getElementById("text");

button.addEventListener("click", function() {
    text.textContent = "You clicked the button!";
    text.style.color = "blue";
    console.log("Button clicked - text updated.");
});

// Task 2: Call greetUser on page load
document.addEventListener("DOMContentLoaded", greetUser);

// Bonus 1: Live input - updates paragraph as user types
let userInput = document.getElementById("userInput");
let liveText = document.getElementById("liveText");

userInput.addEventListener("input", function() {
    liveText.textContent = userInput.value;
});

// Bonus 2: Real-time clock using setInterval
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    document.getElementById("clock").textContent = hours + ":" + minutes + ":" + seconds;
}

setInterval(updateClock, 1000);