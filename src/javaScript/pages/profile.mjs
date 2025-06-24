import { renderProfile } from "../templates/profile.mjs";
import { profileCard } from "../templates/profileCard.mjs";
import { tinySideBar, sidebarLink } from "../handlers/menu.mjs";

export async function initProfile(){
    tinySideBar();
    sidebarLink();
    renderProfile();
    profileCard();
}

initProfile();