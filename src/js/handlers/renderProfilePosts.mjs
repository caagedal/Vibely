import { avatarElement } from "../templates/postElements/avatarElement.mjs";
import { bodyElement } from "../templates/postElements/bodyElement.mjs";
import { postDateElement } from "../templates/postElements/dateElement.mjs";
import { interactionElements } from "../templates/postElements/interactionElements.mjs";
import { mediaElement } from "../templates/postElements/mediaElement.mjs";
import { postProfileLinkElement } from "../templates/postElements/postProfileLink.mjs";
import { titleElement } from "../templates/postElements/titleElement.mjs";
import { usernameElement } from "../templates/postElements/usernameElement.mjs";

export const API_URL = "https://api.noroff.dev";
export const API_BASE = "/api/v1";
export const API_SOCIAL = "/social";
export const SOCIAL_URL = `${API_URL}${API_BASE}${API_SOCIAL}`;

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        console.log(`Loaded ${key} from localStorage:`, value);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Failed to load from localStorage: ${error}`);
        return null;
    }
}

export function headers() {
    const token = load("token");
    if (!token) {
        console.error('No token found in localStorage');
        return {};
    }
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers(),
    });
}

export async function profileInfo() {
    return load("profile");
}

const params = "_followers=true&_following=true&_posts=true";

export async function getProfilePosts(username) {
    try {
        if (!username) {
            throw new Error("Username is required.");
        }
        const profilePostsURL = `${SOCIAL_URL}/profiles/${username}?${params}`;
        const response = await authFetch(profilePostsURL);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Unable to retrieve posts: ${error.message}`);
        throw error;
    }
}

/**
 * Renders the posts of a given profile.
 * @param {Object} profile - The profile object containing posts.
 */
export async function profilePosts(profile) {
    const feed = document.querySelector(".profile-posts");

    if (!profile || !Array.isArray(profile.posts)) {
        console.error("Invalid profile or profile posts are not an array", profile);
        return;
    }

    // Clear any existing content in the feed
    feed.innerHTML = "";

    profile.posts.forEach((post) => {
        // if (!post || !post.author || !post.author.name) {
        //     console.error("Invalid post, post author, or author name", post);
        //     return; // Skip this post if any required data is missing
        // }

        // Create wrapper for each post
        const wrapper = document.createElement("div");
        wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
        feed.append(wrapper);

        // Create container for the post card
        const container = document.createElement("div");
        container.classList.add("card", "container");
        wrapper.appendChild(container);

        // Create post content div
        const postContent = document.createElement("div");
        postContent.classList.add("feed-post");

        // Create profile link element
        postProfileLinkElement(post, postContent);

        // Append profile-related elements
        avatarElement(post, postProfileLink);
        usernameElement(post, postProfileLink);
        postDateElement(post, postProfileLink);

        // Create post content link
        const postContentLink = document.createElement("a");
        postContentLink.href = `/feed/post/?id=${post.id}`;
        postContentLink.classList.add("post-content");

        // Append content-related elements
        titleElement(post, postContentLink);
        bodyElement(post, postContentLink);
        mediaElement(post, postContentLink);

        // Append profile link and content link to post content div
        postContent.append(postContentLink);

        // Create navigation for social interactions
        const postNav = document.createElement("div");
        postNav.classList.add("social-icons");

        // Append interaction elements
        interactionElements(post, postNav);

        // Append post content and navigation to container
        container.append(postContent, postNav);
    });
}

/**
 * Fetches and renders the profile posts based on the query parameter.
 */
export async function renderProfilePosts() {
    const query = document.location.search;
    const params = new URLSearchParams(query);

    const profileName = params.get("name");

    if (!profileName) {
        console.error("Name not found in query parameters.");
        return;
    }

    try {
        const profile = await getProfilePosts(profileName);
        await profilePosts(profile);
    } catch (error) {
        console.error("Error rendering profile.", error);
    }
}

// Initial call to render profile posts on page load
renderProfilePosts();



// // import { fetchProfile } from "../api/profiles/getProfile.mjs";


// import { avatarElement } from "../templates/postElements/avatarElement.mjs";
// import { bodyElement } from "../templates/postElements/bodyElement.mjs";
// import { postDateElement } from "../templates/postElements/dateElement.mjs";
// import { interactionElements } from "../templates/postElements/interactionElements.mjs";
// import { mediaElement } from "../templates/postElements/mediaElement.mjs";
// import { titleElement } from "../templates/postElements/titleElement.mjs";
// import { usernameElement } from "../templates/postElements/usernameElement.mjs";

// export const API_URL = "https://api.noroff.dev";
// export const API_BASE = "/api/v1";
// export const API_SOCIAL = "/social";
// export const API_PROFILES = "/profiles";
// export const SOCIAL_URL = `${API_URL}${API_BASE}${API_SOCIAL}`;


// export function load(key) {
//     try {
//         const value = localStorage.getItem(key);
//         console.log(`Loaded ${key} from localStorage:`, value);
//         return value ? JSON.parse(value) : null;
//     } catch (error) {
//         console.error(`Failed to load from localStorage: ${error}`);
//         return null;
//     }
// }


// export function headers() {
//     const token = load("token");
//     if (!token) {
//         console.error('No token found in localStorage');
//         return {};
//     }
//     return {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//     };
//   }
  
//   export async function authFetch(url, options = {}) {
//     return fetch(url, {
//         ...options,
//         headers: headers(),
//     });
//   }
  
//   export async function profileInfo() {
//     return load("profile");
//   }


//   const params = "_followers=true&_following=true&_posts=true";


//   export async function getProfilePosts(username){
//       try{
//           if(!username){
//               throw new Error("Name required.");
//           }
//           const profilePostsURL = `${SOCIAL_URL}/profiles/${username}?${params}`;
  
//           const response = await authFetch(profilePostsURL);
//           return await response.json();
//       }catch(error){
//           throw new Error(`Unable to retreive posts`)
//       }
//   }

// /**
//  * Renders the posts of a given profile.
//  * @param {Object} profile - The profile object containing posts.
//  */
// export async function profilePosts(profile) {
//     const feed = document.querySelector(".profile-posts");

//     // Clear any existing content in the feed
//     feed.innerHTML = "";

//     profile.posts.forEach((post) => {
//         // Create wrapper for each post
//         const wrapper = document.createElement("div");
//         wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
//         feed.append(wrapper);

//         // Create container for the post card
//         const container = document.createElement("div");
//         container.classList.add("card", "container");
//         wrapper.appendChild(container);

//         // Create post content div
//         const postContent = document.createElement("div");
//         postContent.classList.add("feed-post");

//         // Create profile link element
//         const postProfileLink = document.createElement("a");
//         postProfileLink.classList.add("post-profile");
//         postProfileLink.href = `/profile/?name=${post.author.name}`;


//         // Append profile-related elements
//         avatarElement(post, postProfileLink);
//         usernameElement(post, postProfileLink);
//         postDateElement(post, postProfileLink);

//         // Create post content link
//         const postContentLink = document.createElement("a");
//         postContentLink.href = `/feed/post/?id=${post.id}`;
//         postContentLink.classList.add("post-content");

//         // Append content-related elements
//         titleElement(post, postContentLink);
//         bodyElement(post, postContentLink);
//         mediaElement(post, postContentLink);

//         // Append profile link and content link to post content div
//         postContent.append(postProfileLink, postContentLink);

//         // Create navigation for social interactions
//         const postNav = document.createElement("div");
//         postNav.classList.add("social-icons");

//         // Append interaction elements
//         interactionElements(post, postNav);

//         // Append post content and navigation to container
//         container.append(postContent, postNav);
//     });
// }

// /**
//  * Fetches and renders the profile posts based on the query parameter.
//  */
// export async function renderProfilePosts() {
//     const query = document.location.search;
//     const params = new URLSearchParams(query);

//     const profileName = params.get("name");

//     if (!profileName) {
//         console.error("Name not found in query parameters.");
//         return;
//     }

//     try {
//         const profile = await getProfilePosts(profileName);
//         await profilePosts(profile);
//     } catch (error) {
//         console.error("Error rendering profile.", error);
//     }
// }

// // Initial call to render profile posts on page load
// renderProfilePosts();






// // import { fetchProfile } from "../api/profiles/getProfile.mjs";
// // import { avatarElement } from "../templates/postElements/avatarElement.mjs";
// // import { bodyElement } from "../templates/postElements/bodyElement.mjs";
// // import { postDateElement } from "../templates/postElements/dateElement.mjs";
// // import { interactionElements } from "../templates/postElements/interactionElements.mjs";
// // import { mediaElement } from "../templates/postElements/mediaElement.mjs";
// // import { titleElement } from "../templates/postElements/titleElement.mjs";
// // import { usernameElement } from "../templates/postElements/usernameElement.mjs";

// // export async function profilePosts(profile) {
// //     const feed = document.querySelector(".profile-posts");

// //     feed.innerHTML = "";

// //     profile.posts.forEach((post) => {
// //         const wrapper = document.createElement("div");
// //         wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
// //         feed.append(wrapper);

// //         const container = document.createElement("div");
// //         container.classList.add("card", "container");
// //         wrapper.appendChild(container);

// //         const postContent = document.createElement("div");
// //         postContent.classList.add("feed-post");

// //         const postProfileLink = document.createElement("a");
// //         postProfileLink.classList.add("post-profile");
// //         postProfileLink.href = `/profile/?name=${post.author.name}`;

// //         avatarElement(post, postProfileLink);
// //         usernameElement(post, postProfileLink);
// //         postDateElement(post, postProfileLink);

// //         const postContentLink = document.createElement("a");
// //         postContentLink.href = `/feed/post/?id=${post.id}`;
// //         postContentLink.classList.add("post-content");

// //         titleElement(post, postContentLink);
// //         bodyElement(post, postContentLink);
// //         mediaElement(post, postContentLink);

// //         postContent.append(postProfileLink, postContentLink);

// //         const postNav = document.createElement("div");
// //         postNav.classList.add("social-icons");

// //         interactionElements(post, postNav);

// //         container.append(postContent, postNav);
// //     });
// // }

// // export async function renderProfilePosts() {
// //     const query = document.location.search;
// //     const params = new URLSearchParams(query);

// //     const name = params.get("name");

// //     if (!name) {
// //         console.error("Name not found");
// //         return;
// //     }

// //     try {
// //         const profile = await fetchProfile(name);
// //         profilePosts(profile);
// //     } catch (error) {
// //         console.error("Error rendering profile.", error);
// //     }
// // }

// // renderProfilePosts();


