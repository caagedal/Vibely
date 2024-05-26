// import { deletePost } from "./api/posts/delete.mjs";

// export const API_URL = "https://api.noroff.dev";
// export const API_BASE = "/api/v1";
// export const API_SOCIAL = "/social";
// export const API_PROFILES = "/profiles";

// export const SOCIAL_URL = `${API_URL}${API_BASE}${API_SOCIAL}`;

// export function save(key, value) {
//     try {
//         localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//         console.error(`Failed to save to localStorage: ${error}`);
//     }
// }

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

// export function remove(key) {
//     try {
//         localStorage.removeItem(key);
//     } catch (error) {
//         console.error(`Failed to remove from localStorage: ${error}`);
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
// }

// export async function authFetch(url, options = {}) {
//     return fetch(url, {
//         ...options,
//         headers: headers(),
//     });
// }

// export async function profileInfo() {
//     return load("profile");
// }

// const action = "/posts";
// const author = "?_author=true";
// const comments = "&_comments=true";
// const reactions = "&_reactions=true";

// export async function getPosts() {
//     try {
//         const getPostsURL = `${SOCIAL_URL}${action}/${author}${comments}${reactions}`;
//         console.log(`Fetching posts from: ${getPostsURL}`);
//         const response = await authFetch(getPostsURL);
//         if (!response.ok) {
//             throw new Error(`Error fetching posts: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log('Fetched posts:', data);
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch posts:', error);
//     }
// }



// export async function createPostTemplate(postData) {
//     const author = postData.author.name;
//     const avatar = postData.author.avatar;
//     const avatarURL = avatar || "/src/media/placeholder-img.webp"; 
//     const avatarAlt = author + " Profile image";

//     const newDate = new Date(postData.created).toLocaleDateString("nb-NO", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric"
//     });

//     const newDateUpdated = new Date(postData.updated).toLocaleDateString("nb-NO", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric"
//     });

//     postData.media = postData.media || "";

//     const wrapper = document.createElement("div");
//     wrapper.classList.add("feed", "profile-content", "wrapper");

//     const container = document.createElement("div");
//     container.classList.add("card", "container");
//     wrapper.appendChild(container);

//     const postContent = document.createElement("div");
//     postContent.classList.add("feed-post");

//     const postProfileLink = document.createElement("a");
//     postProfileLink.classList.add("post-profile");
//     postProfileLink.href = `/profile/?name=${postData.author.name}`;

//     const postAvatar = document.createElement("img");
//     postAvatar.src = avatarURL;
//     postAvatar.alt = avatarAlt;

//     const postAuthor = document.createElement("h3");
//     postAuthor.textContent = postData.author.name;

//     const postDate = document.createElement("p");
//     postDate.textContent = newDate;
//     if (postData.updated !== postData.created) {
//         postDate.title = "Updated: " + newDateUpdated;
//     }
//     postProfileLink.append(postAvatar, postAuthor, postDate);

//     const postContentLink = document.createElement("a");
//     postContentLink.href = `/feed/post/?id=${postData.id}`;
//     postContentLink.classList.add("post-content");

//     const title = document.createElement("h3");
//     title.textContent = postData.title;

//     const body = document.createElement("p");
//     body.textContent = postData.body;

//     const postMedia = document.createElement("img");
//     postMedia.src = postData.media;
//     postMedia.alt = postData.title;
//     if (!postData.media) {
//         postMedia.style.display = "none";
//     }

//     postContentLink.append(title, body, postMedia);

//     postContent.append(postProfileLink, postContentLink);

//     const postNav = document.createElement("div");
//     postNav.classList.add("social-icons");

//     const likeBtn = document.createElement("button");
//     likeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;

//     const postAuth = postData.author.name;
//     const user = JSON.parse(localStorage.getItem("profile")).name;
//     if (postAuth === user) {
//         const editBtn = document.createElement("button");
//         editBtn.type = "button";
//         editBtn.classList.add("edit-button");
//         editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

//         editBtn.addEventListener("click", () => {
//             window.location.href = `/feed/post/edit/?id=${postData.id}`;
//         });

//         const deleteBtn = document.createElement("button");
//         deleteBtn.type = "button";
//         deleteBtn.classList.add("delete-button");
//         deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

//         deleteBtn.addEventListener("click", async () => {
//             try {
//                 await deletePost(postData.id);
//                 window.location.reload();
//             } catch (error) {
//                 console.error("Failed to delete post:", error);
//             }
//         });

//         postNav.append(editBtn, deleteBtn);
//     }

//     postNav.append(likeBtn);

//     container.append(postContent, postNav);

//     return wrapper;
// }

// export function postTemplate(postDataList, parent) {
//     const filteredDataList = postDataList.filter(
//         (postData) =>
//             (postData.body !== null && postData.body !== "") ||
//             (postData.media !== "" && postData.media !== null)
//     );
//     const postElements = filteredDataList.map(createPostTemplate);
//     Promise.all(postElements).then((elements) => {
//         parent.append(...elements);
//     });
// }

// export async function renderFeedPosts() {
//     try {
//         const posts = await getPosts();
//         const feedPosts = document.querySelector(".feed-posts");

//         if (!feedPosts) {
//             throw new Error("Element with class 'feed-posts' not found");
//         }

//         feedPosts.innerHTML = "";
//         postTemplate(posts, feedPosts);
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         const feedPosts = document.querySelector(".feed-posts");
//         if (feedPosts) {
//             feedPosts.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
//         }
//     }
// }



// renderFeedPosts();