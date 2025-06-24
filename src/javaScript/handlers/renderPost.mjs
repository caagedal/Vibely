import { getPosts } from "../api/posts/read.mjs";
import { postTemplate } from "../templates/postTemplate.mjs";

/**
 * Renders all posts into the .feed-posts container.
 *
 * @returns {Promise<void>}
 */
export async function renderPosts() {
    try {
        const result = await getPosts();
        const posts = result.data;
        const feedPosts = document.querySelector(".feed-posts");

        if (!feedPosts) {
            throw new Error("Element with class 'feed-posts' not found");
        }

        feedPosts.innerHTML = "";

        if (!posts || posts.length === 0) {
            feedPosts.innerHTML = "<p>Ingen poster funnet.</p>";
            return;
        }

        postTemplate(posts, feedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const feedPosts = document.querySelector(".feed-posts");
        if (feedPosts) {
            feedPosts.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
        }
    }
}

/**
 * Renders only posts with media into the .feed-posts container.
 *
 * @returns {Promise<void>}
 */
export async function renderMediaPosts() {
    try {
        const result = await getPosts();
        const posts = result.data;
        const feedPosts = document.querySelector(".feed-posts");

        if (!feedPosts) {
            throw new Error("Element with class 'feed-posts' not found");
        }

        feedPosts.innerHTML = "";

        const postsFilter = posts.filter(post => post.media && post.media.url);

        if (postsFilter.length === 0) {
            feedPosts.innerHTML = "<p>Ingen poster med media.</p>";
            return;
        }

        postTemplate(postsFilter, feedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const feedPosts = document.querySelector(".feed-posts");
        if (feedPosts) {
            feedPosts.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
        }
    }
}
