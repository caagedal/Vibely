import { SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

// /**
//  * Logs in a user by sending data to the API and comparing the values.
//  * 
//  * The function sends a request to the API to log in the user.
//  * If the data is correct, the access token and profile information will be stored in localstorage and the user will be logged in and redirected to the feed page. If the login fails, it will throw an error.
//  * 
//  * @param {object} profile - Profile data, consists of email and password for login.
//  * @throws {Error} - Throws an error if the request fails.
//  */


export async function login(profile){
    try{
        const loginURL = SOCIAL_URL + action;
        const body = JSON.stringify(profile);
        const response = await fetch (loginURL,{
            headers: {
                "Content-Type": "application/json",
            },
            method,
            body,
        });

        const { accessToken, ...user } = await response.json();

        if(!response.ok){
            throw new Error("Login failed");
        } else {
            storage.save("token", accessToken);
            storage.save("profile", user);
            
            window.location.href  = "/feed/";
        }
        
    }catch (error){
        console.error(error);
    }
}
