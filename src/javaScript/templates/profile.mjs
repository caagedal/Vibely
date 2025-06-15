import { getProfile } from "../api/profile/read.mjs";
import { renderProfilePosts } from "./profilePosts.mjs";
import { load } from "../storage/index.mjs";

/**
 * Renders the profile card with banner, avatar, name, followers, and following count.
 *
 * @param {object} profile - The profile data.
 * @returns {void}
 */
export async function profileCard(profile) {
    const wrapperContainer = document.querySelector(".profile-card");
    if (!wrapperContainer) {
        console.error("Profile card container not found");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-content", "profile-wrap", "wrapper");

    const profileBanner = document.createElement("img");
    profileBanner.classList.add("profile-banner");
    profileBanner.src = profile.banner || "/src/media/placeholder-img.webp";
    profileBanner.alt = `${profile.name}'s banner`;

    const card = document.createElement("div");
    card.classList.add("container", "profile-card");

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("profile-img");
    const avatar = document.createElement("img");
    avatar.src = profile.avatar || "/src/media/placeholder-img.webp";
    avatar.alt = `${profile.name}'s profile image.`;
    avatarContainer.append(avatar);

    const profileText = document.createElement("div");
    profileText.classList.add("profile-text");

    const profileInformation = document.createElement("div");
    profileInformation.classList.add("profile-info");

    const followers = document.createElement("div");
    followers.classList.add("followers");
    const followCount = document.createElement("p");
    followCount.textContent = profile._count.followers;
    const followTitle = document.createElement("h4");
    followTitle.textContent = "Followers";
    followers.append(followCount, followTitle);

    const userNameInfo = document.createElement("div");
    userNameInfo.classList.add("profile-user");
    const profileName = document.createElement("h1");
    profileName.textContent = profile.name;
    userNameInfo.append(profileName);

    const following = document.createElement("div");
    following.classList.add("following");
    const followingCount = document.createElement("p");
    followingCount.textContent = profile._count.following;
    const followingTitle = document.createElement("h4");
    followingTitle.textContent = "Following";
    following.append(followingCount, followingTitle);

    profileInformation.append(followers, userNameInfo, following);

    const userBio = document.createElement("p");
    userBio.textContent = "Should've used Swagger v2..";

    profileText.append(profileInformation, userBio);
    card.append(avatarContainer, profileText);
    wrapper.append(profileBanner, card);
    wrapperContainer.append(wrapper);
}

/**
 * Fetches and renders a user profile based on URL query or logged-in user.
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
        const profile = await getProfile(profileName);
        renderProfilePosts(profile);
    } catch (error) {
        console.error("Error rendering profile.", error);
    }
}
