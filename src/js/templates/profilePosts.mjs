import { load } from "../storage/index.mjs";
import { deletePost } from "../api/posts/delete.mjs";

export function profilePostTemplate(postData, profileName, avatar) {
    const {name} = load("profile");
    const avatarSrc = avatar || "/src/media/placeholder-img.webp" ;
    const avatarAlt = profileName + "'s profile";

    if (postData.media === null) {
        postData.media = "";
    }

    // post date
    const postDate = new Date(postData.created).toLocaleDateString("nb-NO", {
        day: "numeric",
        mont: "long",
        year: "numeric", 
        hour: "numeric",
        minute: "numeric",
    });

    const updatedDate = new Date(postData.updated).toLocaleDateString("nb-NO", {
        day: "numeric",
        mont: "long",
        year: "numeric", 
        hour: "numeric",
        minute: "numeric",
    });

    // wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("")

    // post card
    const postContainer = document.createElement("div")
    postContainer.classList.add("card", "container");
    wrapper.append(postContainer);

    // container for post elements
    const postContent = document.createElement("div");
    postContent.classList.add("feed-post");

    const userAvatar = document.
    
}