// import { profileInfo } from "../api/authFetch.mjs";
import { fetchProfile } from "../api/profiles/getProfile.mjs";
import { load } from "../storage/index.mjs";




export async function profileCard() {
    const storage = load("profile");
    const url = new URL(location.href);
    const profileName = url.searchParams.get("name") || `${storage.name}`;
    const profileInfo = await fetchProfile(profileName);

    if (profileInfo.statusCode === 404) {
        return;
    }

    const following = profileInfo.following;
    const followers = profileInfo.followers;
    const banner = profileInfo.banner || "/src/media/placeholder-img.webp";
    const avatarSrc = profileInfo.avatar || "/src/media/placeholder-img.webp";
    const bio = storage.bio || "User has not written any bio yet";
    const profileCardHTML = document.querySelector(".profile-card");
    
    
    // profile container
    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-content", "profile-wrap", "wrapper");


    // banner
    const profileBanner = document.createElement("img");
    profileBanner.classList.add("profile-banner");
    profileBanner.src = banner;
    profileBanner.alt = profileInfo.name + "'s banner";


    // card
    const card = document.createElement("div");
    card.classList.add("container", "profile-card");


    // avatar
    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("profile-img");
    const avatar = document.createElement("img");
    avatar.src = avatarSrc;
    avatar.alt = profileInfo.name + "avatar";

    avatarContainer.append(avatar);

    // text container
    const profileText = document.createElement("div");
    profileText.classList.add("profile-text");


    // main info
    const profileInformation = document.createElement("div");
    profileInformation.classList.add("profile-info");


    // followers
    const followerElement = document.createElement("div");
    followerElement.classList.add("followers");
    const followCount = document.createElement("p");
    followCount.textContent = profileInfo._count.followers;
    const followTitle = document.createElement("h4");
    followTitle.textContent = "Followers";

    followerElement.append(followCount, followTitle);

    // username
    const userNameElement = document.createElement("div");
    userNameElement.classList.add("profile-user");
    const userName = document.createElement("h1");
    userName.textContent = `@${profileInfo.name}`;
    userNameElement.append(userName);

    // Following
    const followingElement = document.createElement("div");
    followingElement.classList.add("following");
    const followingCount = document.createElement("p");
    followingCount.textContent = profileInfo._count.following;
    const followingTitle = document.createElement("h4");
    followingTitle.textContent = "Following";

    followingElement.append(followingCount, followingTitle);

    // User bio
    const userBio = document.createElement("p");
    userBio.textContent = bio;


    profileInformation.append(followerElement, userNameElement, followingElement);
    profileText.append(profileInformation, userBio);
    card.append(avatarContainer, profileText);
    wrapper.append(profileBanner, card);

    profileCardHTML.append(wrapper);
    
}


const loggedIn = load("profile");

const user = loggedIn.name;

profileCard(user);