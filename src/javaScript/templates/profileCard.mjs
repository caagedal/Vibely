import { load } from "../storage/index.mjs";
import { getProfile } from "../api/profile/read.mjs";

/**
 * Renders a profile card using data from the API or local storage.
 *
 * @returns {Promise<void>}
 */
export async function profileCard() {
    const storage = load("profile");
    const url = new URL(location.href);
    const profileName = url.searchParams.get("name") || (storage && storage.name);

    if (!profileName) {
        window.location.href = "/profile/login";
        return;
    }

    let profileInfo;
    try {
        profileInfo = await getProfile(profileName);
        if (!profileInfo) return;
    } catch {
        return;
    }

    const bannerUrl = profileInfo.banner?.url || "/src/media/placeholder-img.webp";
    const avatarUrl = profileInfo.avatar?.url || "/src/media/placeholder-img.webp";
    const avatarAlt = profileInfo.avatar?.alt || `${profileInfo.name} avatar`;
    const bio = profileInfo.bio || "User has not written any bio yet";
    const profileCardHTML = document.querySelector(".profile-card");
    if (!profileCardHTML) return;

    profileCardHTML.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-content", "profile-wrap", "wrapper");

    const profileBanner = document.createElement("img");
    profileBanner.classList.add("profile-banner");
    profileBanner.src = bannerUrl;
    profileBanner.alt = `${profileInfo.name}'s banner`;

    const card = document.createElement("div");
    card.classList.add("container", "profile-card");

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("profile-img");
    const avatar = document.createElement("img");
    avatar.src = avatarUrl;
    avatar.alt = avatarAlt;
    avatarContainer.append(avatar);

    const profileText = document.createElement("div");
    profileText.classList.add("profile-text");

    const profileInformation = document.createElement("div");
    profileInformation.classList.add("profile-info");

    const followerElement = document.createElement("div");
    followerElement.classList.add("followers");
    const followCount = document.createElement("p");
    followCount.textContent = profileInfo._count?.followers || 0;
    const followTitle = document.createElement("h4");
    followTitle.textContent = "Followers";
    followerElement.append(followCount, followTitle);

    const userNameElement = document.createElement("div");
    userNameElement.classList.add("profile-user");
    const userName = document.createElement("h1");
    userName.textContent = `@${profileInfo.name}`;
    userNameElement.append(userName);

    const followingElement = document.createElement("div");
    followingElement.classList.add("following");
    const followingCount = document.createElement("p");
    followingCount.textContent = profileInfo._count?.following || 0;
    const followingTitle = document.createElement("h4");
    followingTitle.textContent = "Following";
    followingElement.append(followingCount, followingTitle);

    const userBio = document.createElement("p");
    userBio.textContent = bio;

    profileInformation.append(followerElement, userNameElement, followingElement);
    profileText.append(profileInformation, userBio);
    card.append(avatarContainer, profileText);
    wrapper.append(profileBanner, card);
    profileCardHTML.append(wrapper);
}
