import { authFetch } from "../authFetch.mjs";
import { SOCIAL_URL } from "../constants.mjs";

const params = "_followers=true&_following=true&_posts=true";


export async function getProfilePosts(username){
    try{
        if(!username){
            throw new Error("Name required.");
        }
        const profilePostsURL = `${SOCIAL_URL}/profiles/${username}?${params}`;

        const response = await authFetch(profilePostsURL);
        return await response.json();
    }catch(error){
        throw new Error(`Unable to retreive posts`)
    }
}