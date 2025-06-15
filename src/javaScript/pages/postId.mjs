import { displayPostByID } from "../handlers/postById.mjs";
import { tinySideBar, sidebarLink } from "../handlers/menu.mjs";

export async function initPostID(){

    displayPostByID();
    tinySideBar();
    sidebarLink();

}

initPostID();