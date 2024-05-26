import { getPosts } from "../api/posts/getposts.mjs";
import { postTemplate } from "../templates/postTemplate.mjs";

export async function renderPosts() {
    try {
        const posts = await getPosts();
        const feedPosts = document.querySelector(".feed-posts");

        if (!feedPosts) {
            throw new Error("Element with class 'feed-posts' not found");
        }

        feedPosts.innerHTML = "";
        postTemplate(posts, feedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        const feedPosts = document.querySelector(".feed-posts");
        if (feedPosts) {
            feedPosts.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
        }
    }
}

export async function renderMediaPosts() {
    const posts = await getPosts();
    const feedPosts = document.querySelector(".feed-posts");
    feedPosts.innerHTML = "";

    const postsFilter = posts.filter(
        (post) => post.media !== "" && post.media !== null
    );

    postTemplate(postsFilter, feedPosts);
}

renderPosts();

