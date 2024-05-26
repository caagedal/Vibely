# Vibely

My entry to javascript 2 project. A social media platform.

// import { deletePost } from "../api/posts/delete.mjs";
// import { load } from "../storage/index.mjs";

// export async function createProfilePostTemplate(postData, user) {
// const author = postData.author.name;
// const avatar = postData.author.avatar;
// const avatarURL = avatar || "/src/media/placeholder-img.webp";
// const avatarAlt = author + " Profile image";

// const newDate = new Date(postData.created).toLocaleDateString("nb-NO", {
// day: "numeric",
// month: "long",
// year: "numeric",
// hour: "numeric",
// minute: "numeric"
// });

// const newDateUpdated = new Date(postData.updated).toLocaleDateString("nb-NO", {
// day: "numeric",
// month: "long",
// year: "numeric",
// hour: "numeric",
// minute: "numeric"
// });

// postData.media = postData.media || "";

// const wrapper = document.createElement("div");
// wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");

// const container = document.createElement("div");
// container.classList.add("card", "container");
// wrapper.appendChild(container);

// const postContent = document.createElement("div");
// postContent.classList.add("feed-post");

// const postProfileLink = document.createElement("a");
// postProfileLink.classList.add("post-profile");
// postProfileLink.href = `/profile/?name=${postData.author.name}`;

// const postAvatar = document.createElement("img");
// postAvatar.src = avatarURL;
// postAvatar.alt = avatarAlt;

// const postAuthor = document.createElement("h3");
// postAuthor.textContent = postData.author.name;

// const postDate = document.createElement("p");
// postDate.textContent = newDate;
// if (postData.updated !== postData.created) {
// postDate.title = "Updated: " + newDateUpdated;
// }
// postProfileLink.append(postAvatar, postAuthor, postDate);

// const postContentLink = document.createElement("a");
// postContentLink.href = `/feed/post/?id=${postData.id}`;
// postContentLink.classList.add("post-content");

// const title = document.createElement("h3");
// title.textContent = postData.title;

// const body = document.createElement("p");
// body.textContent = postData.body;

// const postMedia = document.createElement("img");
// postMedia.src = postData.media;
// postMedia.alt = postData.title;
// if (!postData.media) {
// postMedia.style.display = "none";
// }

// postContentLink.append(title, body, postMedia);

// postContent.append(postProfileLink, postContentLink);

// const postNav = document.createElement("div");
// postNav.classList.add("social-icons");

// const likeBtn = document.createElement("button");
// likeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;

// const postAuth = postData.author.name;
// const user = JSON.parse(localStorage.getItem("profile")).name;
// if (postAuth === user) {
// const editBtn = document.createElement("button");
// editBtn.type = "button";
// editBtn.classList.add("edit-button");
// editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

// editBtn.addEventListener("click", () => {
// window.location.href = `/feed/post/edit/?id=${postData.id}`;
// });

// const deleteBtn = document.createElement("button");
// deleteBtn.type = "button";
// deleteBtn.classList.add("delete-button");
// deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

// deleteBtn.addEventListener("click", async () => {
// try {
// await deletePost(postData.id);
// window.location.reload();
// } catch (error) {
// console.error("Failed to delete post:", error);
// }
// });

// postNav.append(editBtn, deleteBtn);
// }

// postNav.append(likeBtn);

// container.append(postContent, postNav);

// return wrapper;
// }

// export function renderProfilePosts(user, profileData, parent) {
// const sortedPosts = profileData.sort(
// (a, b) => new Date(b.created) - new Date(a.created)
// );
// const filteredPosts = sortedPosts.filter(
// (postData) =>
// (postData.body !== null && postData.body !== "") ||
// (postData.media !== "" && postData.media !== null)
// );

// parent.innerHTML = "";
// parent.append(
// ...filteredPosts.map((postData) => createProfilePostTemplate(postData, user))
// );
// }

// import { fetchProfile } from "../api/profiles/getProfile.mjs";
// import { avatarElement } from "../templates/postElements/avatarElement.mjs";
// import { bodyElement } from "../templates/postElements/bodyElement.mjs";
// import { postDateElement } from "../templates/postElements/dateElement.mjs";
// import { interactionElements } from "../templates/postElements/interactionElements.mjs";
// import { mediaElement } from "../templates/postElements/mediaElement.mjs";
// import { titleElement } from "../templates/postElements/titleElement.mjs";
// import { usernameElement } from "../templates/postElements/usernameElement.mjs";

// export async function profilePosts(profile){

// const feed = document.querySelector(".profile-posts");

// feed.innerHTML = "";

// profile.posts.forEach((post) => {
// const wrapper = document.createElement("div");
// wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
// feed.append(wrapper);

// const container = document.createElement("div");
// container.classList.add("card", "container");
// wrapper.appendChild(container);

// const postContent = document.createElement("div");
// postContent.classList.add("feed-post");

// const postProfileLink = document.createElement("a");
// postProfileLink.classList.add("post-profile");
// postProfileLink.href = `/profile/?name=${profile.author.name}`;

// avatarElement(post, postProfileLink);
// usernameElement(post, postProfileLink);
// postDateElement(post, postProfileLink);

// const postContentLink = document.createElement("a");
// postContentLink.href = `/feed/post/?id=${postData.id}`;
// postContentLink.classList.add("post-content");

// titleElement(post, postContentLink);
// bodyElement(post, postContentLink);
// mediaElement(post, postContentLink);

// postContent.append(postProfileLink, postContentLink);

// const postNav = document.createElement("div");
// postNav.classList.add("social-icons");

// interactionElements(post, postNav);

// container.append(postContent, postNav);

// });
// }

// async function displayProfilePosts(){
// try{
// const params = new URLSearchParams(window.location.search);
// const name = params.get("name");

// if (!name){
// console.error("ID not found");
// return;
// }

// const profile = await fetchProfile(name);

// profilePosts(profile);
// }catch (error){
// console.error("Error trying to fetch posts", error);
// }
// }

// export async function renderProfilePosts(){
// const query = document.location.search;
// const params = new URLSearchParams(query);

// const name = params.get("name");

// try{
// const profile = await fetchProfile(name);

// displayProfilePosts(name);
// }catch(error){
// console.error("Error rendering profile.", error)
// }
// }

// renderProfilePosts();

---

// import { deletePost } from "../api/posts/delete.mjs";

// export async function postTemplate(postData) {
// // Ensure media is always defined
// postData.media = postData.media || "";

// // Create wrapper
// const wrapper = document.createElement("div");
// wrapper.classList.add("feed", "profile-content", "wrapper");

// // Create container
// const container = document.createElement("div");
// container.classList.add("card", "container");
// wrapper.appendChild(container);

// // Create postBox and postProfile
// const postBox = document.createElement("div");
// postBox.classList.add("feed-post");
// const postProfile = document.createElement("div");
// postProfile.classList.add("post-profile");

// const image = document.createElement("img");
// image.src = postData.author.avatar.url;
// image.alt = `${postData.author.name} Profile image`;

// const userNameLink = document.createElement("a");
// userNameLink.href = `/profile/?name=${postData.author.name}`;
// const userName = document.createElement("h3");
// userName.textContent = postData.author.name;
// userNameLink.appendChild(userName);

// const postDate = document.createElement("p");
// postDate.textContent = postData.created;

// postProfile.append(image, userNameLink, postDate);

// // Create postLink
// const postLink = document.createElement("a");
// postLink.href = `/feed/post/?id=${postData.id}`;
// postLink.classList.add("post-content");

// const title = document.createElement("h3");
// title.textContent = postData.title;

// const postBody = document.createElement("p");
// postBody.textContent = postData.body;

// const postMedia = document.createElement("img");
// postMedia.src = postData.media;
// postMedia.alt = postData.title;

// postLink.append(title, postBody, postMedia);
// postBox.append(postProfile, postLink);
// container.appendChild(postBox);

// // Create postNav
// const postNav = document.createElement("div");
// postNav.classList.add("social-icons");

// const likeButton = document.createElement("button");
// likeButton.type = "button";
// const likeButtonText = document.createElement("i");
// likeButtonText.classList.add("fa-regular", "fa-heart");
// likeButton.appendChild(likeButtonText);
// postNav.appendChild(likeButton);

// const postAuth = postData.author.name;
// const user = JSON.parse(localStorage.getItem("profile")).name;

// if (postAuth === user) {
// const editButton = document.createElement("button");
// editButton.type = "button";
// editButton.classList.add("edit-button");
// const editButtonText = document.createElement("i");
// editButtonText.classList.add("fa-solid", "fa-pen-to-square");
// editButton.appendChild(editButtonText);

// const deleteButton = document.createElement("button");
// deleteButton.type = "button";
// deleteButton.classList.add("delete-button");
// const deleteButtonText = document.createElement("i");
// deleteButtonText.classList.add("fa-solid", "fa-trash");
// deleteButton.appendChild(deleteButtonText);

// editButton.addEventListener("click", () => {
// window.location.href = `/feed/post/edit/?id=${postData.id}`;
// });

// deleteButton.addEventListener("click", async () => {
// try {
// await deletePost(postData.id);
// window.location.reload();
// } catch (error) {
// console.error("Failed to delete post:", error);
// }
// });

// postNav.append(editButton, deleteButton);
// }

// container.appendChild(postNav);

// return wrapper;
// }

// export function renderPostTemplate(postData, parent){
// parent.append(postTemplate(postData));
// }
