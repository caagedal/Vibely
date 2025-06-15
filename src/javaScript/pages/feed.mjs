import { searchBar } from "../handlers/search.mjs";
import { sidebarLink, tinySideBar } from "../handlers/menu.mjs";
import { showAll } from "../handlers/filter.mjs";
import { createPostForm } from "../handlers/createPost.mjs";

export async function initFeedPage() {
    
    sidebarLink();
    tinySideBar();
    searchBar(); 
    showAll();
    createPostForm();
}

initFeedPage();