import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts/";
const method = "post";


export async function createPost(postData) {
    if (!postData){
        throw new Error(`Post object is required,`);
    }
    try{
        const createPostURL = SOCIAL_URL + action;
        const response = await authFetch(createPostURL, {
            method,
            body: JSON.stringify(postData)
        });

        const result = await response.json();

        return result;
    }catch (error){
        throw new Error(`${response.statusText}`);
    }
}
