import { updatePost } from "../api/posts/update.mjs";
import { getPost } from "../api/posts/read.mjs";

export async function updatePostForm(){
    const form = document.querySelector(".edit-form");

    
    if(form){
        const url = new URL(location.href);
        const id = url.searchParams.get("id");
        const post = await getPost(id);

        form.title.value = post.title;
        form.body.value = post.body;
        form.media.value = post.media;

        form.addEventListener("submi", async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);

            const updatedPost = {
                title: formData.get("title"),
                body: formData.get("body"),
                media: formData.get("media"),
                id: id,
            };

            const user = JSON.parse(localStorage.getItem("profile"));

            if (updatePost.author !== user.id){

                const errorMessage = document.createElement("p");
                errorMessage.classList.add("warning");
                form.append(errorMessage);
                return;
            }

            await updatePost(updatedPost);

            setTimeout(()=>{
                window.location.href = "/feed/";
            }, 3000);
        });
    }
    
}

updatePostForm();