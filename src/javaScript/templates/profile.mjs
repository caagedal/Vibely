import { getProfile } from "../api/profile/read.mjs";
import { renderProfilePosts } from "./profilePosts.mjs";

export async function profileCard(profile){
    const wrapperContainer = document.querySelector("profile-card"); 
    wrapperContainer.innerHTML = "";

    
}