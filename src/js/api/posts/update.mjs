import { authFetch } from "../authFetch.mjs";
import { SOCIAL_URL } from "../constants.mjs";

const action = "/posts";
const method = "put";

export async function editPost(postData) {
    if (!postData.id) {
        throw new Error("No post ID found.");
    }

    const editPostURL = `${SOCIAL_URL}${action}/${postData.id}`;

    try {
        const response = await authFetch(editPostURL, {
            method,
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to edit post: ${error.message}`);
    }
}









// import { authFetch } from "../authFetch.mjs";
// import { SOCIAL_URL } from "../constants.mjs";

// const action = "/posts";
// const method = "put";

// export async function editPost(postData) {
//     if (!postData.id) {
//         throw new Error("No post ID found.");
//     }

//     const editPostURL = `${SOCIAL_URL}${action}/${postData.id}`;

//     try {
//         const response = await authFetch(editPostURL, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Error ${response.status}: ${errorText}`);
//         }

//         const result = await response.json();
//         return result;
//     } catch (error) {
//         throw new Error(`Failed to edit post: ${error.message}`);
//     }
// }


// import { authFetch } from "../authFetch.mjs";
// import { SOCIAL_URL } from "../constants.mjs";

// const action = "/posts";
// const method = "put";

// export async function editPost(postData){
//     if(!postData.id){
//         throw new Error(`No post ID found.`);
//     }

//     const editPostURL = `${SOCIAL_URL}${action}/${postData.id}`

//     const response = await authFetch(editPostURL, {
//         method,
//         body: JSON.stringify(postData)
//     });
    
//     return await response.json();
// }