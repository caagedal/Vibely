import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const QUERY_PARAMS = "?_author=true&_reactions=true&_comments=true";

/**
 * Fetches a paginated list of posts with author, reactions, and comments included.
 *
 * @param {number} [limit=100] - Number of posts to retrieve.
 * @param {number} [page=1] - Page number to retrieve.
 * @returns {Promise<object>} The posts data.
 * @throws Will throw an error if the fetch fails.
 */
export async function getPosts(limit = 100, page = 1) {
    try {
        const url = `${SOCIAL_URL}/posts${QUERY_PARAMS}&limit=${limit}&page=${page}`;
        const response = await authFetch(url);
        return await response.json();
    } catch (error) {
        throw new Error("Error fetching posts: " + error.message);
    }
}

/**
 * Fetches a single post by ID with author, reactions, and comments included.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<object>} The post data.
 * @throws Will throw an error if the ID is missing or the fetch fails.
 */
export async function getPost(id) {
    if (!id) {
        throw new Error("Post ID is required");
    }

    try {
        const url = `${SOCIAL_URL}/posts/${id}${QUERY_PARAMS}`;
        const response = await authFetch(url);
        const result = await response.json();
        return result.data;
    } catch (error) {
        throw new Error("Error fetching post: " + error.message);
    }
}
