import { remove } from "../storage/index.mjs";

/**
 * Sets the sidebar profile link href based on the given profile name.
 *
 * @param {string} profileName - The name of the profile.
 */
export async function sidebarProfileLink(profileName) {
    const profileLink = document.querySelector("#menuProfile");
    if (profileLink) {
        profileLink.href = `/profile/?name=${profileName}`;
    }
}

/**
 * Loads the current user from localStorage and sets the sidebar profile link.
 *
 * @returns {void}
 */
export async function sidebarLink() {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user?.name) {
        sidebarProfileLink(user.name);
    }
}

/**
 * Renders a small profile preview in the sidebar.
 *
 * @param {object} profile - The user profile object.
 * @returns {void}
 */
export async function tinyProfile(profile) {
    const container = document.querySelector(".mini-profile");
    if (!container) return;

    const tinyImg = document.createElement("img");
    tinyImg.src = profile.avatar?.url || "/src/media/placeholder-img.webp";
    tinyImg.alt = profile.avatar?.alt || profile.name;

    const tinyUserName = document.createElement("p");
    tinyUserName.textContent = profile.name;

    container.append(tinyImg, tinyUserName);
}

/**
 * Renders the mini-profile and profile picture in the post form.
 *
 * @returns {void}
 */
export async function tinySideBar() {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
        tinyProfile(user);
        ppimg(user);
    }
}

/**
 * Displays a larger profile image in the post creation form.
 *
 * @param {object} profile - The user profile object.
 * @returns {void}
 */
export async function ppimg(profile) {
    const imgContainer = document.querySelector(".personal-post-img");
    if (!imgContainer) return;

    const personalPostImg = document.createElement("img");
    personalPostImg.classList.add("posting-img");
    personalPostImg.src = profile.avatar?.url || "/src/media/placeholder-img.webp";
    personalPostImg.alt = profile.avatar?.alt || profile.name;

    imgContainer.append(personalPostImg);
}

/**
 * Signs the user out by clearing localStorage and redirecting to login.
 *
 * @returns {void}
 */
function signOut() {
    remove("token");
    remove("profile");
    window.location.href = "/profile/login/";
}

/**
 * Attaches sign-out handler to the sign-out button.
 *
 * @returns {void}
 */
function setupSignOut() {
    const btn = document.getElementById("signout-btn");
    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            signOut();
        });
    }
}

setupSignOut();
