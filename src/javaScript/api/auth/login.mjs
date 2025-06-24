import { API_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

/**
 * Logs in a user using the provided credentials and stores the access token and user profile.
 *
 * @param {{ email: string, password: string }} profile - The user's login credentials.
 * @returns {Promise<void>}
 */
export async function login(profile) {
    try {
        const loginURL = API_URL + action;
        const response = await fetch(loginURL, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        });

        const result = await response.json();

        if (!response.ok) {
            const message = result.errors?.[0]?.message || "Login failed";
            throw new Error(message);
        }

        const { accessToken, ...user } = result.data;
        storage.save("token", accessToken);
        storage.save("profile", user);

        window.location.href = "/feed/";
    } catch (error) {
        console.error("Login error:", error);
    }
}
