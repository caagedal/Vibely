import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "posts";

const params = "_author=true&_reactions=true&_comments=true";

export async function getPosts(limit = 100, offset = 0) {

    try{
        const getPostsURL = `${SOCIAL_URL}${action}?${params}&limit=${limit}&offset=${offset}`;
        const response = await authFetch(getPostsURL);
        if(!response.ok){
            console.error(error);
        }
        return await response.json();

    }catch (error){
        console.error("Error fetching posts", error);
        throw error;
    }
}


export async function getPost(id){
    if(!id){
        throw new Error("postID is required");
    }

    const getPostURL = `${SOCIAL_URL}${action}/${id}?${params}`;
    const response = await authFetch(getPostURL);
    return await response.json();
}