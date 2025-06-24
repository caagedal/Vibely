import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a new post with the provided data.
 *
 * @param {object} postData - The data for the new post.
 * @returns {Promise<object>} The created post response.
 */
export async function createPost(postData) {
    const createPostURL = SOCIAL_URL + action;

    const response = await authFetch(createPostURL, {
        method,
        body: JSON.stringify(postData),
    });

    return await response.json();
}
