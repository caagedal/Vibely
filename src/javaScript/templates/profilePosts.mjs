import { getProfile } from "../api/profile/read.mjs";
import { profileInfo } from "./posts.mjs";
import { postContent } from "./posts.mjs";
import { postNav } from "./posts.mjs";

export async function renderProfilePosts(profile){

    const containerHTML = document.querySelector("profile-posts");

    containerHTML.innerHTML = "";

    profile.posts.forEach((post) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("feed", "profile-content", "wrapper", "post-card");
        containerHTML.append(wrapper);

        const container = document.createElement("div");
        container.classList.add("card", "container");
        wrapper.appendChild(container);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("feed-post");
        
        profileInfo(post, contentContainer);
        postContent(post, contentContainer);
        
        container.append(contentContainer);

        postNav(post, container);
        
    });
}



export async function renderProfilePosts(){

    try {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");

        if (!name) {
            console.error("ID not found");
            return;
        }

        const profile = await getProfile(name);
        renderProfilePosts(profile);
    }catch(error){
        console.error("Error trying to render posts:", error);
    }
}