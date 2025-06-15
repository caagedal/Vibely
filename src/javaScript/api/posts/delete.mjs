import { authFetch } from "../authFetch.mjs";
import { SOCIAL_URL } from "../constants.mjs";

/**
 * Deletes a post by ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<void>}
 * @throws Will throw an error if the ID is missing or the request fails.
 */
export async function deletePost(id) {
    if (!id) {
        throw new Error("post ID is required.");
    }

    const deletePostURL = `${SOCIAL_URL}/posts/${id}`;
    const response = await authFetch(deletePostURL, {
        method: "delete",
    });

    if (!response.ok) {
        throw new Error("Could not delete post");
    }
}
