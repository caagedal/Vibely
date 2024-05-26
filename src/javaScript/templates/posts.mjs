import { getPosts } from "../api/posts/read.mjs";
import { deletePost } from "../api/posts/delete.mjs";


export async function renderAllPosts(parentElement){
    try {
        
        parentElement.innerHTML = "";
        const posts = await getPosts();

        posts.forEach(post => {
            createPostsHTML(post, parentElement);
        });
    } catch(error) {
        console.error("Error rendering posts", error);
    }
}


export async function renderPostCard(post, parentElement){
    
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

// --------------------------------- profileInfo--------------------------------------

export async function profileInfo(post, parentElement){

    const newDate = new Date(post.created).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    const newDateUpdated = new Date(post.updated).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    const profileLink = document.createElement("a");
    profileLink.classList.add("post-profile");
    profileLink.href = `/profile/?name=${post.author.name}`;

    const postAvatar = document.createElement("img");
    postAvatar.src = post.author.avatar || "/src/media/placeholder-img.webp";
    postAvatar.alt = post.author.name + "profile picture";

    const postAuthor = document.createElement("h3");
    postAuthor.textContent = post.author.name;

    const postDate = document.createElement("p");
    postDate.textContent = newDate;
    if (post.updated !== post.created) {
        post.title = "Updated: " + newDateUpdated;
    }

    profileLink.append(postAvatar, postAuthor, postDate);

    parentElement.append(profileLink);

    return profileLink;

}

// --------------------------------- postContent --------------------------------------

export async function postContent(post, parentElement){

    const postContentLink = document.createElement("a");
    postContentLink.href = `/feed/post/?id=${post.id}`;
    postContentLink.classList.add("post-content");

    const title = document.createElement("h3")
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const media = document.createElement("img");
    media.src = post.media;
    media.alt = post.title;
    if(!post.media){
        media.style.display = "none";
    }

    postContentLink.append(title, body, media);

    parentElement.append(postContentLink);

    return postContentLink;
}

// --------------------------------- postNav --------------------------------------

export async function postNav(post, parentElement){

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



export async function renderPosts(post, parentElement){
    renderPostCard(post, parentElement);
}