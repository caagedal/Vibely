import { SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const params = "_followers=true&_following=true&_posts=true";


export async function getProfiles(limit = 100, offset = 0){
    
    const getProfilesURL = `${SOCIAL_URL}${action}?${params}&limit=${limit}&offset=${offset}`;
    const response = await authFetch(getProfilesURL);
    const result = await response.json();

    return result;
}


// In read.mjs
export async function getProfile(name) {
    if (!name) {
        throw new Error("Profile requires a name");
    }

    const getProfileURL = `${SOCIAL_URL}${action}/${name}?${params}`;
    const response = await authFetch(getProfileURL);

    if (!response.ok) {
        throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    return await response.json();
}


// export async function getProfile(name) {
//     if(!name) {
//         throw new Error("Profile requires a name");
//     }

//     const getProfileURL = `${SOCIAL_URL}${action}/${name}?${params}`;
//     const response = await authFetch(getProfileURL);

//     return await response.json();
// }