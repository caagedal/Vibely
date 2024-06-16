// import { getProfile } from "../api/profile/read.mjs";
// import { postContent } from "./posts.mjs";
// import { load } from "../storage/index.mjs";

// export async function profilePosts(profile){

//     const containerHTML = document.querySelector(".profile-posts");
    
//     profile.posts.forEach((post) => {

//         const newDate = new Date(post.created).toLocaleDateString("nb-NO", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//             hour: "numeric",
//             minute: "numeric"
//         });
    
//         const newDateUpdated = new Date(post.updated).toLocaleDateString("nb-NO", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//             hour: "numeric",
//             minute: "numeric"
//         });

//         const wrapper = document.createElement("div");
//         wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
//         containerHTML.append(wrapper);

//         const container = document.createElement("div");
//         container.classList.add("card", "container");
//         wrapper.appendChild(container);
    
//         const contentContainer = document.createElement("div");
//         contentContainer.classList.add("feed-post");

//         const profileLink = document.createElement("a");
//         profileLink.classList.add("post-profile");
//         profileLink.href = `/profile/?name=${profile.name}`;

//         const postAvatar = document.createElement("img");
//         postAvatar.src = profile.avatar || "/src/media/placeholder-img.webp";
//         postAvatar.alt = profile.name + "profile picture";

//         const postAuthor = document.createElement("h3");
//         postAuthor.textContent = profile.name;

//         const postDate = document.createElement("p");
//         postDate.textContent = newDate;
//         if (post.updated !== post.created) {
//             postDate.title = "Updated: " + newDateUpdated;
//         }

//         profileLink.append(postAvatar, postAuthor, postDate);

//         contentContainer.append(profileLink);
        
//         postContent(post, contentContainer);

//         container.append(contentContainer);

//     });

   
// }



// export async function renderProfilePosts() {
//     try {
//         const params = new URLSearchParams(window.location.search);
//         const name = params.get("name");

//         if (!name) {
//             console.error("Profile name not found");
//             return;
//         }

//         const profile = await getProfile(name);
//         profilePosts(profile);
//     } catch (error) {
//         console.error("Error trying to render posts:", error);
//     }
// }


// export async function renderProfile() {
//     const query = document.location.search;
//     const params = new URLSearchParams(query);
//     let profileName = params.get("name");

//     // Check if logged in user is viewing their own profile
//     const loggedInUser = load("profile");
//     if (loggedInUser && !profileName) {
//         profileName = loggedInUser.name;
//     }

//     if (!profileName) {
//         console.error("Profile name not found");
//         return;
//     }

//     try {
//         const profile = await getProfile(profileName);
//         renderProfilePosts(profile);
//     } catch (error) {
//         console.error("Error rendering profile.", error);
//     }
// }



// renderProfile();

import { getProfile } from "../api/profile/read.mjs";
import { postContent } from "./posts.mjs";
import { load } from "../storage/index.mjs";

export async function profilePosts(profile) {
    const containerHTML = document.querySelector(".profile-posts");

    if (!containerHTML) {
        console.error("Profile posts container not found");
        return;
    }

    containerHTML.innerHTML = ""; // Clear previous content

    profile.posts.forEach((post) => {
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
        containerHTML.append(wrapper);

        const container = document.createElement("div");
        container.classList.add("card", "container");
        wrapper.appendChild(container);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("feed-post");

        const profileLink = document.createElement("a");
        profileLink.classList.add("post-profile");
        profileLink.href = `/profile/?name=${profile.name}`;

        const postAvatar = document.createElement("img");
        postAvatar.src = profile.avatar || "/src/media/placeholder-img.webp";
        postAvatar.alt = profile.name + " profile picture";

        const postAuthor = document.createElement("h3");
        postAuthor.textContent = profile.name;

        const postDate = document.createElement("p");
        postDate.textContent = newDate;
        if (post.updated !== post.created) {
            postDate.title = "Updated: " + newDateUpdated;
        }

        profileLink.append(postAvatar, postAuthor, postDate);
        contentContainer.append(profileLink);
        postContent(post, contentContainer);
        container.append(contentContainer);
    });
}

export async function renderProfilePosts() {
    try {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");

        if (!name) {
            console.error("Profile name not found");
            return;
        }

        const profile = await getProfile(name);
        profilePosts(profile);
    } catch (error) {
        console.error("Error trying to render posts:", error);
    }
}

export async function renderProfile() {
    const query = document.location.search;
    const params = new URLSearchParams(query);
    let profileName = params.get("name");

    // Check if logged-in user is viewing their own profile
    const loggedInUser = load("profile");
    if (loggedInUser && !profileName) {
        profileName = loggedInUser.name;
    }

    console.log("Profile name to fetch:", profileName); // Debugging line

    if (!profileName) {
        console.error("Profile name not found");
        return;
    }

    try {
        const profile = await getProfile(profileName);
        profilePosts(profile);
    } catch (error) {
        console.error("Error rendering profile.", error);
    }
}

renderProfile();
