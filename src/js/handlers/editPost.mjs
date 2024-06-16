import { editPost } from "../api/posts/update.mjs";
import { getPost } from "../api/posts/getposts.mjs";

export async function updatePostForm() {
    const form = document.querySelector(".edit-form");

    if (form) {
        const url = new URL(location.href);
        const postID = url.searchParams.get("id");
        const post = await getPost(postID);

        const title = form.querySelector(".edit-title");
        title.value = post.title;
        const body = form.querySelector(".edit-body");
        body.value = post.body;
        const media = form.querySelector(".edit-media");
        media.value = post.media;
        const postFormID = form.querySelector(".post-id");
        postFormID.value = postID;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Construct postData from form fields
            const postData = {
                id: postID,
                title: title.value,
                body: body.value,
                media: media.value,
            };

            try {
                await editPost(postData); // Ensure await is used to handle the promise
                setTimeout(() => {
                    window.location.href = `/feed/post/?id=${postID}`;
                }, 1500);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        });
    }
}

updatePostForm();



// export async function updatePostForm(){
//     const form = document.querySelector(".edit-form");

//     if(form){
//         const url = new URL(location.href);
//         const postID = url.searchParams.get("id");
//         const post = await getPost(postID);
//         const title = form.querySelector(".edit-title");
//         title.value = post.title;
//         const body = form.querySelector(".edit-body");
//         body.value = post.body;
//         const media = form.querySelector(".edit-media");
//         media.value = post.media;
//         const postFormID = form.querySelector(".post-id");
//         postFormID.value = postID;

//         form.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             const formData = new FormData(form);
//             const postData = {};

//             post.id = postID;

//             try {
//                 editPost(postData);
//                 setTimeout(() => {
//                     window.location.href = `/feed/post/?id=${postID}`;
//                 }, 1500);
//             }catch(error){
//                 console.error("Error updating profile:", error);
//             }
//         });

//     }
// }

// updatePostForm();

// export async function updatePostForm(){
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

//         form.addEventListener("submit", (e) => {
//             e.preventDefault();
//             const formData = new FormData(form);
//             const postData = {};

//             for (const [key, value] of formData.entries()){
//                 postData[key] = value;
//             }

//             post.id = postId;

//             try {
//               editPost(postData);
//             //   setTimeout(() => {
//             //     window.location.href = `/feed/`;
//             //   }, 1500);
//             }catch (error){
//                 console.error(error);
//             }
            
//         })
//     }
// }

// updatePostForm();




// import { editPost } from "../api/posts/update.mjs";
// import { getPost } from "../api/posts/getposts.mjs";

// async function editPostFormListener() {
//     const form = document.querySelector(".edit-form");
//     if (form) {
//         const url = new URL(location.href);
//         const postId = url.searchParams.get("id");

//         if (!postId) {
//             console.error("Post ID not found in URL");
//             return;
//         }

//         try {
//             const post = await getPost(postId);

//             if (!post) {
//                 console.error("Post not found");
//                 return;
//             }

//             // Fill the form with existing post data
//             form.querySelector(".edit-title").value = post.title;
//             form.querySelector(".edit-body").value = post.body;
//             form.querySelector(".edit-media").value = post.media;
//             form.querySelector(".form-id").value = postId;
//         } catch (error) {
//             console.error("Error fetching post:", error);
//             return;
//         }

//         form.addEventListener("submit", async (event) => {
//             event.preventDefault();
//             const formData = new FormData(form);
//             const postData = Object.fromEntries(formData.entries());

//             postData.id = postId;

//             try {
//                 await editPost(postData);
//                 window.location.href = `/feed/post/?id=${postId}`;
//             } catch (error) {
//                 console.error("Error updating post:", error);
//             }
//         });
//     } else {
//         console.error("Form not found");
//     }
// }

// editPostFormListener();


// // import { editPost } from "../api/posts/update.mjs";
// // import { getPost } from "../api/posts/getposts.mjs";

// // export async function editPostFormListener() {
// //     const form = document.querySelector(".edit-form");
// //     if (form) {
// //         const url = new URL(location.href);
// //         const postId = url.searchParams.get("id");

// //         try {
// //             const post = await getPost(postId);

// //             // Fill the form with existing post data
// //             form.querySelector(".edit-title").value = post.title;
// //             form.querySelector(".edit-body").value = post.body;
// //             form.querySelector(".edit-media").value = post.media;
// //             form.querySelector(".form-id").value = postId;
// //         } catch (error) {
// //             console.error("Error fetching post:", error);
// //             return;
// //         }

// //         form.addEventListener("submit", async (event) => {
// //             event.preventDefault();
// //             const formData = new FormData(form);
// //             const postData = Object.fromEntries(formData.entries());

// //             postData.id = postId;

// //             try {
// //                 await editPost(postData);
// //                 window.location.href = `/feed/post/?id=${postId}`;
// //             } catch (error) {
// //                 console.error("Error updating post:", error);
// //             }
// //         });
// //     }
// // }

// // editPostFormListener();



// // import { editPost } from "../api/posts/update.mjs";
// // import { getPost } from "../api/posts/getposts.mjs";

// // export async function editPostFormListener(){
// //     const form = document.querySelector(".edit-form");
// //     if(form){
// //         const url = new URL(location.href);
// //         const postId = url.searchParams.get("id");
// //         const post = await getPost(postId);
// //         const title = form.querySelector(".edit-title");
// //         title.value = post.title;
// //         const body = form.querySelector(".edit-body");
// //         body.value = post.body;
// //         const media = form.querySelector(".edit-media");
// //         media.value = post.media;
// //         const formID = form.querySelector(".form-id");
// //         formID.value = postId;

// //         form.addEventListener("submit", async (event)=>{
// //             event.preventDefault();
// //             const formData = new FormData(form);
// //             const postData = {};

// //             for (const [key, value] of formData.entries()){
// //                 postData[key] = value;
// //             }
            
// //             postData.id = postId;

// //             try{
// //                 await editPost(postData);
// //                 window.location.href = `/feed/post/?id=${postId}`;
// //             }catch (error) {
// //                 console.error("Error updating post:", error);
// //             }

// //         });
// //     }
// // }


  