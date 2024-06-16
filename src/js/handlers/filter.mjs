import { renderMediaPosts } from "./renderPost.mjs";
import { renderPosts } from "./renderPost.mjs";
import { getPosts } from "../api/posts/getposts.mjs";

const feedPosts = document.querySelector(".feed-posts");


document.getElementById("filter").addEventListener("change", function(e) {
    const selectedValue = e.target.value;

    if (selectedValue === "all") {
        showAll();
    } else if (selectedValue === "media") {
        showMediaOnly();
    }
});

async function showAll() {
    const posts = await getPosts();
    feedPosts.innerHTML = ""; // Clear previous posts
    renderPosts(posts, feedPosts);
}

async function showMediaOnly() {
    const posts = await getPosts();
    const mediaPosts = posts.filter(post => post.media && post.media !== "");
    feedPosts.innerHTML = ""; // Clear previous posts
    renderMediaPosts(mediaPosts, feedPosts);
}

