import { login } from "../api/auth/login.mjs";

/**
 * Adds a submit listener to the login form and triggers login.
 *
 * @returns {void}
 */
export function loginFormListener() {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const profile = Object.fromEntries(formData.entries());

        login(profile);
    });
}

loginFormListener();
