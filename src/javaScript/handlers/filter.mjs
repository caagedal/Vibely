import { renderPosts } from "./renderPost.mjs";
import { renderMediaPosts } from "./renderPost.mjs";
import { getPosts } from "../api/posts/read.mjs";

const feedPosts = document.querySelector(".feed-posts");

if (!feedPosts) {
    throw new Error(".feed-posts not found!");
}

const filterElement = document.getElementById("filter");

if (filterElement) {
    filterElement.addEventListener("change", async function (e) {
        const selectedValue = e.target.value;
        if (selectedValue === "all") {
            await showAll();
        } else if (selectedValue === "media") {
            await showMediaOnly();
        }
    });
}

/**
 * Fetches and renders all posts.
 *
 * @returns {Promise<void>}
 */
export async function showAll() {
    const result = await getPosts();
    const posts = result.data;
    feedPosts.innerHTML = "";
    renderPosts(posts, feedPosts);
}

/**
 * Fetches and renders only posts that include media.
 *
 * @returns {Promise<void>}
 */
export async function showMediaOnly() {
    const result = await getPosts();
    const posts = result.data;
    const mediaPosts = posts.filter(post => post.media && post.media.url);
    feedPosts.innerHTML = "";
    renderMediaPosts(mediaPosts, feedPosts);
}
