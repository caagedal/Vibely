import { createPost } from "../api/posts/create.mjs";

/**
 * Handles form submission for creating a new post.
 *
 * @returns {void}
 */
export async function createPostForm() {
    const form = document.querySelector(".create-post");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const title = formData.get("title");
            const body = formData.get("body");
            const mediaUrl = formData.get("media");
            const mediaAlt = formData.get("mediaAlt");

            const post = {
                title,
                body,
            };

            if (mediaUrl) {
                post.media = { url: mediaUrl };
                if (mediaAlt) post.media.alt = mediaAlt;
            }

            try {
                await createPost(post);
                window.location.href = "/feed";
            } catch (error) {
                alert(error.message || "Noe gikk galt ved publisering!");
            }
        });
    }
}
