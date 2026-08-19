/*
    login.js
    --------
    Placeholder admin login. There's no real backend yet, so this checks
    against a hardcoded demo credential and sets a sessionStorage flag.

    TODO (backend integration): replace checkCredentials() with a POST to
    something like /api/admin/login, which checks the submitted username
    and password against the password_hash column in the admins table.
    On success, the backend would normally return a session token/cookie
    instead of the sessionStorage flag used here.
*/

const ADMIN_SESSION_KEY = "nightwave_admin_session";

// demo-only credentials, purely so the login screen has something to check against
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "nightwave2026";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const errorEl = document.getElementById("loginError");

        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
            window.location.href = "admin.html";
        } else {
            errorEl.textContent = "Incorrect username or password.";
            errorEl.classList.add("visible");
        }
    });
});
