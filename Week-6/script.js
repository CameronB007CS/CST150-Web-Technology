// just a variable to test console output from Week 3
let message = "Hello, JavaScript!";
console.log(message);

// greet function - pops up when the page loads
function greetUser() {
    alert("Welcome to JavaScript Fundamentals and Responsive Design!");
}

// wait for the page to fully load before running anything
document.addEventListener("DOMContentLoaded", function () {
    greetUser();

    // Week 3 - click the button, change the text and turn it blue
    let button = document.getElementById("changeText");
    let text = document.getElementById("text");

    button.addEventListener("click", function () {
        text.textContent = "You clicked the button! JavaScript is working inside a responsive layout.";
        text.style.color = "blue";
        console.log("Button clicked successfully.");
    });

    // bonus: character counter for the name field
    let nameInput = document.getElementById("name");
    let nameCounter = document.getElementById("nameCounter");

    nameInput.addEventListener("input", function () {
        let count = nameInput.value.length;
        nameCounter.textContent = count + " / 50";
        // turns orange when you're getting close to the limit
        nameCounter.classList.toggle("near-limit", count > 40);
    });

    /*
        Week 6 form handler
        - preventDefault stops the page from refreshing on submit
        - checks both fields aren't empty before doing anything
        - saves the user data to localStorage
        - shows a success message inline instead of just an alert
        - updates the auth status to green/complete

        note: this is all frontend only, real auth needs a backend
    */
    document.getElementById("userForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let authStatus = document.getElementById("authStatus");
        let successMessage = document.getElementById("successMessage");
        let successText = document.getElementById("successText");

        // stop here if either field is empty
        if (name.trim() === "" || email.trim() === "") {
            alert("Please fill in all fields");
            return;
        }

        // bundle the user data into an object and save it
        let userData = {
            name: name,
            email: email,
            registered: true,
            authenticated: true
        };

        localStorage.setItem("registeredUser", JSON.stringify(userData));

        // show the inline success message
        successText.textContent = `Welcome, ${name}! Your information has been saved and authentication is complete.`;
        successMessage.style.display = "block";

        // update the auth status box to green
        authStatus.textContent = `Registration complete. Welcome, ${name}. Your information is saved and authentication is complete.`;
        authStatus.classList.add("complete");

        console.log("Saved user data:", userData);
    });
});