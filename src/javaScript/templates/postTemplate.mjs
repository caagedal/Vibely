import { deletePost } from "../../javaScript/api/posts/delete.mjs";

/**
 * Creates a DOM element representing a single post.
 *
 * @param {object} postData - The post data object.
 * @returns {Promise<HTMLElement>} The DOM element for the post.
 */
export async function createPostTemplate(postData) {
    const author = postData.author?.name || "Ukjent";
    const avatarURL = postData.author?.avatar?.url || "/src/media/placeholder-img.webp";
    const avatarAlt = postData.author?.avatar?.alt || `${author} Profile image`;

    const newDate = new Date(postData.created).toLocaleDateString("nb-NO", {
        day: "numeric", month: "long", year: "numeric",
        hour: "numeric", minute: "numeric"
    });

    const newDateUpdated = new Date(postData.updated).toLocaleDateString("nb-NO", {
        day: "numeric", month: "long", year: "numeric",
        hour: "numeric", minute: "numeric"
    });

    const wrapper = document.createElement("div");
    wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");

    const container = document.createElement("div");
    container.classList.add("card", "container");
    wrapper.appendChild(container);

    const postContent = document.createElement("div");
    postContent.classList.add("feed-post");

    const postProfileLink = document.createElement("a");
    postProfileLink.classList.add("post-profile");
    postProfileLink.href = `/profile/?name=${author}`;

    const postAvatar = document.createElement("img");
    postAvatar.src = avatarURL;
    postAvatar.alt = avatarAlt;
    postAvatar.onerror = () => postAvatar.src = "/src/media/placeholder-img.webp";

    const postAuthor = document.createElement("h3");
    postAuthor.textContent = author;

    const postDate = document.createElement("p");
    postDate.textContent = newDate;
    if (postData.updated !== postData.created) {
        postDate.title = "Updated: " + newDateUpdated;
    }

    postProfileLink.append(postAvatar, postAuthor, postDate);

    const postContentLink = document.createElement("a");
    postContentLink.href = `/feed/post/?id=${postData.id}`;
    postContentLink.classList.add("post-content");

    const title = document.createElement("h3");
    title.textContent = postData.title || "";

    const body = document.createElement("p");
    body.classList.add("body-search");
    body.textContent = postData.body || "";

    const postMedia = document.createElement("img");
    if (postData.media?.url) {
        postMedia.src = postData.media.url;
        postMedia.alt = postData.media.alt || postData.title || "";
        postMedia.onerror = () => postMedia.src = "/src/media/placeholder-img.webp";
    } else {
        postMedia.style.display = "none";
    }

    postContentLink.append(title, body, postMedia);
    postContent.append(postProfileLink, postContentLink);

    const postNav = document.createElement("div");
    postNav.classList.add("social-icons");

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("profile")).name;
    } catch {
        user = null;
    }

    if (author === user) {
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("edit-button");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.addEventListener("click", () => {
            window.location.href = `/feed/post/edit/?id=${postData.id}`;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.addEventListener("click", async () => {
            try {
                await deletePost(postData.id);
                window.location.reload();
            } catch (error) {
                alert("Failed to delete post!");
            }
        });

        postNav.append(editBtn, deleteBtn);
    }

    container.append(postContent, postNav);
    return wrapper;
}

/**
 * Renders multiple posts by appending them to the given parent element.
 *
 * @param {Array<object>} postDataList - An array of post data objects.
 * @param {HTMLElement} parent - The DOM element to append posts to.
 */
export function postTemplate(postDataList, parent) {
    const filteredDataList = postDataList.filter(
        (postData) =>
            (postData.body && postData.body.trim() !== "") ||
            (postData.media?.url)
    );

    Promise.all(filteredDataList.map(createPostTemplate)).then((elements) => {
        parent.append(...elements);
    });
}
