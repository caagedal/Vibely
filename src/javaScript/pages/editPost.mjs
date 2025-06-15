import { updatePostForm } from "../handlers/updatePost.mjs";
import { tinySideBar, sidebarLink } from "../handlers/menu.mjs";

export async function initEditPost(){

    updatePostForm();
    tinySideBar();
    sidebarLink();

}

initEditPost();