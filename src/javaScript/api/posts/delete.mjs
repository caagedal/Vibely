import { authFetch } from "../authFetch.mjs";
import { SOCIAL_URL } from "../constants.mjs";

const action = "/posts";
const method = "delete";

export async function deletePost(id) {
    if(!id){
        throw new Error("post ID is required.", error);
    }

    const deletePostURL = `${SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(deletePostURL, {
        method,
    });

    return await response.json();
}