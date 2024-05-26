import { SOCIAL_URL} from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const author = "?_author=true";
const comments = "&_comments=true";
const reactions = "&_reactions=true";

export async function getPosts() {
    try {
        const getPostsURL = `${SOCIAL_URL}${action}/${author}${comments}${reactions}`;
        console.log(`Fetching posts from: ${getPostsURL}`);
        const response = await authFetch(getPostsURL);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched posts:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}


// Fetches single post from API based on ID

export async function getPost(id){
    if(!id){
        throw new Error("Requires a postID.");
    }try{
        const getPostURL = `${SOCIAL_URL}${action}/${id}${author}`; 

        const response = await authFetch(getPostURL);
        return await response.json();
    }catch(error){
        console.error(error);
    }
}


// Fetches posts by specific tags

export async function getPostByTag(tag){
    try{
        const getPostByTagURL = `${SOCIAL_URL}${action}?tags=${tag}&${author}`;

        const response = await authFetch(getPostByTagURL);

        return await response.json();
    }catch(error){
        console.error(error);
    }
}
