import { updatePost } from "../api/posts/update.mjs";
import { getPost } from "../api/posts/read.mjs";

/**
 * Initializes the update post form, populates it with existing data, and handles submission.
 *
 * @returns {Promise<void>}
 */
export async function updatePostForm() {
    const form = document.querySelector(".edit-form");
    if (!form) return;

    const url = new URL(location.href);
    const postID = url.searchParams.get("id");
    if (!postID) {
        alert("Mangler post-ID i URL.");
        return;
    }

    let post;
    try {
        post = await getPost(postID);
    } catch (error) {
        alert("Klarte ikke å hente posten.");
        return;
    }

    form.querySelector(".edit-title").value = post.title || "";
    form.querySelector(".edit-body").value = post.body || "";
    form.querySelector(".edit-media").value = post.media?.url || "";
    form.querySelector(".post-id").value = postID;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const postData = {
            id: postID,
            title: form.querySelector(".edit-title").value,
            body: form.querySelector(".edit-body").value,
        };

        const mediaUrl = form.querySelector(".edit-media").value.trim();
        if (mediaUrl) {
            postData.media = { url: mediaUrl };
        }

        try {
            await updatePost(postData);
            setTimeout(() => {
                window.location.href = `/feed/post/?id=${postID}`;
            }, 1200);
        } catch (error) {
            alert(error.message || "Noe gikk galt ved oppdatering.");
            console.error("Error updating post:", error);
        }
    });
}
