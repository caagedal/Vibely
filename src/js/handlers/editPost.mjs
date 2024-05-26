import { editPost } from "../api/posts/update.mjs";
import { getPost } from "../api/posts/getposts.mjs";

export async function editPostFormListener() {
    const form = document.querySelector(".edit-form");
    if (form) {
        const url = new URL(location.href);
        const postId = url.searchParams.get("id");

        try {
            const post = await getPost(postId);

            // Fill the form with existing post data
            form.querySelector(".edit-title").value = post.title;
            form.querySelector(".edit-body").value = post.body;
            form.querySelector(".edit-media").value = post.media;
            form.querySelector(".form-id").value = postId;
        } catch (error) {
            console.error("Error fetching post:", error);
            return;
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const postData = Object.fromEntries(formData.entries());

            postData.id = postId;

            try {
                await editPost(postData);
                window.location.href = `/feed/post/?id=${postId}`;
            } catch (error) {
                console.error("Error updating post:", error);
            }
        });
    }
}





// import { editPost } from "../api/posts/update.mjs";
// import { getPost } from "../api/posts/getposts.mjs";

// export async function editPostFormListener(){
//     const form = document.querySelector(".edit-form");
//     if(form){
//         const url = new URL(location.href);
//         const postId = url.searchParams.get("id");
//         const post = await getPost(postId);
//         const title = form.querySelector(".edit-title");
//         title.value = post.title;
//         const body = form.querySelector(".edit-body");
//         body.value = post.body;
//         const media = form.querySelector(".edit-media");
//         media.value = post.media;
//         const formID = form.querySelector(".form-id");
//         formID.value = postId;

//         form.addEventListener("submit", async (event)=>{
//             event.preventDefault();
//             const formData = new FormData(form);
//             const postData = {};

//             for (const [key, value] of formData.entries()){
//                 postData[key] = value;
//             }
            
//             postData.id = postId;

//             try{
//                 await editPost(postData);
//                 window.location.href = `/feed/post/?id=${postId}`;
//             }catch (error) {
//                 console.error("Error updating post:", error);
//             }

//         });
//     }
// }


  