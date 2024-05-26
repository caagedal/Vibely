import { authFetch } from "../authFetch.mjs";
import { SOCIAL_URL } from "../constants.mjs";

const action = "/profiles";
const posts = "_posts=true";
const followers = "_followers=true";
const following = "_following=true";

export async function fetchProfiles(limit = 100, offset = 0) {
    try {
        const fetchProfilesURL = `${SOCIAL_URL}${action}?limit=${limit}&offset=${offset}`;

        const response = await authFetch(fetchProfilesURL);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch profiles: ${error.message}`);
        throw error;
    }
}


export async function fetchProfile(name) {
    try {
        if (!name) {
            throw new Error("Name is required.");
        }
        const fetchProfileURL = `${SOCIAL_URL}${action}/${name}?${posts}&${followers}&${following}`;

        const response = await authFetch(fetchProfileURL);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch profile: ${error.message}`);
        throw error;
    }
}


// import { authFetch, profileInfo } from "../authFetch.mjs";
// import { SOCIAL_URL } from "../constants.mjs";

// const action = "/profiles";
// const posts = "_posts=true";
// const followers = "_followers=true";
// const following = "_following=true";

// export async function fetchProfiles(limit = 100, offset = 0){
    
//     try{
//         const fetchProfilesURL = `${SOCIAL_URL}${action}`;

//         const response = await authFetch(fetchProfilesURL);
//         return await response.json();
//     }catch(error){
//         console.error(error);
//     }
// }



// export async function fetchProfile(name){
//     try{
//         if(!name){
//             throw new Error("Name required.");
//         }
//         const fetchProfileURL = `${SOCIAL_URL}${action}/${name}?${posts}&${followers}&${following}`;

//         const response = await authFetch(fetchProfileURL);

//         return await response.json();
//     }catch(error){
//         console.error(error);
//     }
// }