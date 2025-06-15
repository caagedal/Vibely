import { remove } from "../storage/index.mjs";

/**
 * Signs the user out by clearing local storage and redirecting to the login page.
 *
 * @returns {void}
 */
export function signOut() {
    remove("token");
    remove("profile");
    window.location.href = "/profile/login/";
}

const btn = document.getElementById("signout-btn");
if (btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        signOut();
    });
}
