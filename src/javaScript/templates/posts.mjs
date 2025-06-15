import { getPosts } from "../api/posts/read.mjs";
import { deletePost } from "../api/posts/delete.mjs";

/**
 * Renders all posts into the provided parent element.
 *
 * @param {HTMLElement} parentElement - The container where posts will be rendered.
 * @returns {Promise<void>}
 */
export async function renderAllPosts(parentElement) {
    try {
        parentElement.innerHTML = "";
        const { posts } = await getPosts();

        if (!posts || posts.length === 0) {
            parentElement.innerHTML = "<p>Ingen poster funnet.</p>";
            return;
        }

        posts.forEach(post => {
            createPostsHTML(post, parentElement);
        });
    } catch (error) {
        console.error("Error rendering posts", error);
        parentElement.innerHTML = "<p>Feil ved henting av poster.</p>";
    }
}

/**
 * Renders a single post card into the provided parent element.
 *
 * @param {object} post - The post data.
 * @param {HTMLElement} parentElement - The container to render into.
 * @returns {Promise<HTMLElement>}
 */
export async function renderPostCard(post, parentElement) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
    parentElement.append(wrapper);

    const container = document.createElement("div");
    container.classList.add("card", "container");
    wrapper.appendChild(container);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("feed-post");

    profileInfo(post, contentContainer);
    postContent(post, contentContainer);

    container.append(contentContainer);
    postNav(post, container);

    return wrapper;
}

/**
 * Renders profile info (avatar, name, date) into the given parent element.
 *
 * @param {object} post - The post data.
 * @param {HTMLElement} parentElement - The container to append profile info to.
 * @returns {HTMLElement}
 */
export function profileInfo(post, parentElement) {
    const newDate = new Date(post.created).toLocaleDateString("nb-NO", {
        day: "numeric", month: "long", year: "numeric",
        hour: "numeric", minute: "numeric"
    });

    const newDateUpdated = new Date(post.updated).toLocaleDateString("nb-NO", {
        day: "numeric", month: "long", year: "numeric",
        hour: "numeric", minute: "numeric"
    });

    const profileLink = document.createElement("a");
    profileLink.classList.add("post-profile");
    profileLink.href = `/profile/?name=${post.author.name}`;

    const postAvatar = document.createElement("img");
    postAvatar.src = post.author.avatar?.url || "/src/media/placeholder-img.webp";
    postAvatar.alt = post.author.avatar?.alt || `${post.author.name} profile picture`;

    const postAuthor = document.createElement("h3");
    postAuthor.textContent = post.author.name;

    const postDate = document.createElement("p");
    postDate.textContent = newDate;
    if (post.updated !== post.created) {
        postDate.title = "Updated: " + newDateUpdated;
    }

    profileLink.append(postAvatar, postAuthor, postDate);
    parentElement.append(profileLink);

    return profileLink;
}

/**
 * Renders post content (title, body, media) into the given parent element.
 *
 * @param {object} post - The post data.
 * @param {HTMLElement} parentElement - The container to append post content to.
 * @returns {HTMLElement}
 */
export function postContent(post, parentElement) {
    const postContentLink = document.createElement("a");
    postContentLink.href = `/feed/post/?id=${post.id}`;
    postContentLink.classList.add("post-content");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const media = document.createElement("img");
    media.src = post.media?.url || "/src/media/placeholder-img.webp";
    media.alt = post.media?.alt || post.title;
    if (!post.media?.url) {
        media.style.display = "none";
    }

    postContentLink.append(title, body, media);
    parentElement.append(postContentLink);

    return postContentLink;
}

/**
 * Renders post navigation (edit/delete/like) buttons into the given parent element.
 *
 * @param {object} post - The post data.
 * @param {HTMLElement} parentElement - The container to append buttons to.
 * @returns {Promise<HTMLElement>}
 */
export async function postNav(post, parentElement) {
    const postNavContainer = document.createElement("div");
    postNavContainer.classList.add("social-icons");

    const likeBtn = document.createElement("button");
    likeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;

    const postAuth = post.author.name;
    const user = JSON.parse(localStorage.getItem("profile")).name;

    if (postAuth === user) {
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("edit-button");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.addEventListener("click", () => {
            window.location.href = `/feed/post/edit/?id=${post.id}`;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.addEventListener("click", async () => {
            try {
                await deletePost(post.id);
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete post:", error);
            }
        });

        postNavContainer.append(editBtn, deleteBtn);
    }

    postNavContainer.append(likeBtn);
    parentElement.append(postNavContainer);

    return postNavContainer;
}

/**
 * Renders a single post card.
 *
 * @param {object} post - The post data.
 * @param {HTMLElement} parentElement - The container to render into.
 */
export async function renderPosts(post, parentElement) {
    renderPostCard(post, parentElement);
}
