import { createPost } from "../api/posts/createPost.mjs";
import { renderPost } from "../handlers/renderPost.mjs";

export async function createPostFormListener(){
    const form = document.querySelector(".create-post");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const postData = {};

        for(const [key, value] of formData.entries()) {
            if (key === "tags"){
                postData[key] = value.split(",").map((tag) => tag.trim());
            }else{
                postData[key] = value;
            }
        }
        try {
            await createPost(postData);
            await postTemplate();
            form.reset();
        }catch(error){
            console.error("An error occured trying to create post: ", error);
        }
    });
}