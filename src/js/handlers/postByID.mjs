import { getPost } from "../api/posts/getposts.mjs";
import { createPostTemplate } from "../templates/postTemplate.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postID = urlParams.get("id");

export async function displayPostByID() {
    const container = document.querySelector(".post-specific");
    container.innerHTML = "";

    try {
        const singlePost = await getPost(postID);
        const postElement = await createPostTemplate(singlePost); 
        container.append(postElement);
    } catch (error) {
        console.error(error);
    }
}

displayPostByID();
