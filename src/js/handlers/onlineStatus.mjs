import { load } from "../storage/index.mjs";

const isLoggedIn = load("profile");

export function loggedOutStatus() {
    if (!isLoggedIn) {
      location.href = "/profile/login/";
    }
}