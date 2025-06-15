import { getProfile } from "../api/profile/read.mjs";
import { postContent } from "./posts.mjs";
import { load } from "../storage/index.mjs";

/**
 * Renders all posts belonging to the given profile.
 *
 * @param {object} profileData - The profile data including posts.
 * @returns {void}
 */
export async function profilePosts(profileData) {
    const containerHTML = document.querySelector(".profile-posts");
    if (!containerHTML) {
        console.error("Profile posts container not found");
        return;
    }

    containerHTML.innerHTML = "";

    if (!profileData.posts || profileData.posts.length === 0) {
        containerHTML.innerHTML = "<p>Ingen poster funnet.</p>";
        return;
    }

    profileData.posts.forEach((post) => {
        const newDate = new Date(post.created).toLocaleDateString("nb-NO", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        const newDateUpdated = new Date(post.updated).toLocaleDateString("nb-NO", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        const wrapper = document.createElement("div");
        wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");

        const container = document.createElement("div");
        container.classList.add("card", "container");
        wrapper.appendChild(container);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("feed-post");

        const profileLink = document.createElement("a");
        profileLink.classList.add("post-profile");
        profileLink.href = `/profile/?name=${profileData.name}`;

        const postAvatar = document.createElement("img");
        postAvatar.src = profileData.avatar?.url || "/src/media/placeholder-img.webp";
        postAvatar.alt = profileData.avatar?.alt || `${profileData.name} profile picture`;

        const postAuthor = document.createElement("h3");
        postAuthor.textContent = profileData.name;

        const postDate = document.createElement("p");
        postDate.textContent = newDate;
        if (post.updated !== post.created) {
            postDate.title = "Updated: " + newDateUpdated;
        }

        profileLink.append(postAvatar, postAuthor, postDate);
        contentContainer.append(profileLink);

        postContent(post, contentContainer);
        container.append(contentContainer);
        wrapper.appendChild(container);

        containerHTML.append(wrapper);
    });
}

/**
 * Fetches a profile by name from the URL and renders its posts.
 *
 * @returns {Promise<void>}
 */
export async function renderProfilePosts() {
    try {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");

        if (!name) {
            console.error("Profile name not found");
            return;
        }

        const profileData = await getProfile(name);
        profilePosts(profileData);
    } catch (error) {
        console.error("Error trying to render posts:", error);
    }
}

/**
 * Renders the profile and its posts based on URL or logged-in user.
 *
 * @returns {Promise<void>}
 */
export async function renderProfile() {
    const query = document.location.search;
    const params = new URLSearchParams(query);
    let profileName = params.get("name");

    const loggedInUser = load("profile");
    if (loggedInUser && !profileName) {
        profileName = loggedInUser.name;
    }

    if (!profileName) {
        console.error("Profile name not found");
        return;
    }

    try {
        const profileData = await getProfile(profileName);
        profilePosts(profileData);
    } catch (error) {
        console.error("Error rendering profile.", error);
    }
}
