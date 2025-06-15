import { getPost } from "../api/posts/read.mjs";
import { createPostTemplate } from "../templates/postTemplate.mjs";

const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get("id");

/**
 * Fetches and displays a single post based on the ID from the URL.
 *
 * @returns {Promise<void>}
 */
export async function displayPostByID() {
    const container = document.querySelector(".post-specific");
    if (!container) {
        console.error("Container .post-specific not found");
        return;
    }

    container.innerHTML = "";

    if (!postID) {
        container.innerHTML = "<p>Mangler post-ID i URL.</p>";
        return;
    }

    try {
        const post = await getPost(postID);
        if (!post || !post.title) {
            container.innerHTML = "<p>Fant ikke posten.</p>";
            return;
        }
        const postElement = await createPostTemplate(post);
        container.append(postElement);
    } catch (error) {
        container.innerHTML = `<p>Noe gikk galt ved lasting av post.<br>${error.message || error}</p>`;
        console.error("Error i displayPostByID:", error);
    }
}
