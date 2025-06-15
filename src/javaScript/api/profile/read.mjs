import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const params = "_followers=true&_following=true&_posts=true";

/**
 * Fetches a paginated list of user profiles with followers, following, and posts included.
 *
 * @param {{ limit?: number, page?: number }} [options] - Pagination options.
 * @returns {Promise<object>} The response containing profile data and metadata.
 * @throws Will throw an error if the request fails.
 */
export async function getProfiles({ limit = 100, page = 1 } = {}) {
    const getProfilesURL = `${SOCIAL_URL}${action}?${params}&limit=${limit}&page=${page}`;
    const response = await authFetch(getProfilesURL);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || "Error fetching profiles");
    }

    return await response.json();
}

/**
 * Fetches a single user profile by name with followers, following, and posts included.
 *
 * @param {string} name - The profile name to fetch.
 * @returns {Promise<object>} The profile data.
 * @throws Will throw an error if name is missing or the request fails.
 */
export async function getProfile(name) {
    if (!name) {
        throw new Error("Profile requires a name");
    }

    const getProfileURL = `${SOCIAL_URL}${action}/${name}?${params}`;
    const response = await authFetch(getProfileURL);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || response.statusText || "Error fetching profile");
    }

    const result = await response.json();
    return result.data;
}
