import { createPost } from "../api/posts/create.mjs";

export async function createPostForm(){
    const form = document.querySelector(".create-post");

    if (form){
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);

            const post = {
                title: formData.get("title"),
                body: formData.get("body"),
                media: formData.get("media")
            };

            await createPost(post);

            window.location.href = "/feed";
        });
    }
}

createPostForm();