import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

export async function deletePost(id){
    if(!id){
        throw new Error(`Post ID not found.`);
    }
    try{
        const deletePostURL = `${SOCIAL_URL}${action}/${id}`;

        const response = await authFetch(deletePostURL, {
            method
        });

        return await response.json();
    }catch (error){
        console.error(error);
    }
}




