import { fetchProfile } from "../api/profiles/getProfile.mjs";
import { load } from "../storage/index.mjs";

export async function profileCard() {

    const storage = load("profile");
    const url = new URL(location.href);
    const userName = url.searchParams.get("name") || storage.name;
    const userInfo = await fetchProfile(userName);
    const avatar = userInfo.avatar || "/src/media/placeholder-img.webp";
    const profileCardQuery = document.querySelector(".profile-card");
    const banner = userInfo.banner || "/src/media/placeholder-img.webp";

    if (!profileCardQuery) {
        console.error("profile-card element not found in the document.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-content", "profile-wrap", "wrapper");

    const profileBanner = document.createElement("img");
    profileBanner.classList.add("profile-banner");
    profileBanner.src = banner;
    profileBanner.alt = `${userInfo.name} Banner`;

    // profile container
    const card = document.createElement("div");
    card.classList.add("container", "profile-card");

    // profile img
    const profileImgContainer = document.createElement("div");
    profileImgContainer.classList.add("profile-img");
    const profileImg = document.createElement("img");
    profileImg.src = avatar;

    profileImgContainer.append(profileImg);



    // profile text
    const profileText = document.createElement("div");
    profileText.classList.add("profile-text");

    // profile information 
    const profileInformation = document.createElement("div");
    profileInformation.classList.add("profile-info");

    // followers
    const followers = document.createElement("div");
    followers.classList.add("followers");
    const followCount = document.createElement("p");
    followCount.textContent = userInfo._count.followers;
    const followTitle = document.createElement("h4");
    followTitle.textContent = "Followers";

    followers.append(followCount, followTitle);

    // username
    const userNameInfo = document.createElement("div");
    userNameInfo.classList.add("profile-user");

    const profileName = document.createElement("h1");
    profileName.textContent = userInfo.name;

    userNameInfo.append(profileName);

    // following
    const following = document.createElement("div");
    following.classList.add("following");
    const followingCount = document.createElement("p");
    followingCount.textContent = userInfo._count.following;
    const followingTitle = document.createElement("h4");
    followingTitle.textContent = "Following";

    following.append(followingCount, followingTitle);

    profileInformation.append(followers, userNameInfo, following);

    const userBio = document.createElement("p");
    userBio.textContent = "Should've used Swagger v2..";

    profileText.append(profileInformation, userBio);

    card.append(profileImgContainer, profileText);

    wrapper.append(profileBanner, card);

    profileCardQuery.append(wrapper);

    return profileCardQuery;   
}


const loggedIn = load("profile");


if (loggedIn) {
    const path = location.pathname;
    const url = new URL(location.href);
    let name = url.searchParams.get("name");
    if (name === null) {
        name = loggedIn.name;
    }


} else {
    console.error("User not logged in.");
}

profileCard();


