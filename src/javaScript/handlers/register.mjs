import { register } from "../api/auth/register.mjs";

/**
 * Attaches a submit listener to the registration form and handles user registration.
 *
 * @returns {void}
 */
export function registerFormListener() {
    const form = document.querySelector(".register-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const profile = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        if (formData.get("avatar")) {
            profile.avatar = { url: formData.get("avatar") };
        }

        if (formData.get("banner")) {
            profile.banner = { url: formData.get("banner") };
        }

        await register(profile);
    });
}

registerFormListener();
