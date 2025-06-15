import { API_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

/**
 * Registers a new user with the provided profile information.
 *
 * @param {{ email: string, password: string }} profile - The user's registration data.
 * @returns {Promise<object|undefined>} The registration result if successful.
 */
export async function register(profile) {
    const registerURL = API_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    const result = await response.json();

    if (!response.ok) {
        alert(result.errors?.[0]?.message || "Registration failed");
        return;
    }

    alert("You are now registered");
    window.location.href = "/profile/login/";

    return result;
}
