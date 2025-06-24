import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates an existing post with the provided data.
 *
 * @param {{ id: string, [key: string]: any }} postData - The post data to update, must include `id`.
 * @returns {Promise<object>} The updated post data.
 * @throws Will throw an error if `id` is missing or the request fails.
 */
export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("PostID required.");
    }

    const updatePostURL = `${SOCIAL_URL}${action}/${postData.id}`;

    try {
        const response = await authFetch(updatePostURL, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Could not update post");
        }

        return result;
    } catch (error) {
        console.error("Failed to update post:", error);
        throw error;
    }
}
