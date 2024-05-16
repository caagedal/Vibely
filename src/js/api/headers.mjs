import { load } from "../storage/index.mjs";

export async function headers() {
    try{
        const accessToken = load(`accessToken`);
        if(!accessToken){
            console.error("No access token found");
            throw new error("No access token found. Please log in or register to continue.");
        }else{
            console.log("access token found.");
        }
        return {
            "content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        };
    }catch(error){
        console.error("Failing to retreive headers:", error.message);
        throw new Error("Access tocen not found, unable to retrieve headers.")
    }
}