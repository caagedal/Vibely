// import { load } from "../storage/index.mjs";
import { profileCard } from "../templates/profileCard.mjs";
import { profileInfo } from "../api/authFetch.mjs";




export async function renderProfile(){
    const path = document.location.search;
    const params = new URLSearchParams(path);

    let userName = params.get("name");

    try{
        const profile = await profileInfo(userName);

        profileCard(profile);
    }catch (error) {
        console.error("error trying to fetch profile information.", error);
    }
}




