// import { renderPosts } from "./renderPost.mjs";
// import { renderMediaPosts } from "./renderPost.mjs";

// const filterMediaBtn = document.querySelector("#sortPostsMedia");
// const filterAllBtn = document.querySelector("#sortPosts");
// const postFeed = document.querySelector(".feed-posts");
// const path = location.pathname;

// export async function filterPosts() {
//     filterAllBtn.addEventListener("click", () => {
//         if (filterMediaBtn.hasAttribute("checked")){
//             filterMediaBtn.removeAttribute("checked");
//         }
//         if (!filterAllBtn.hasAttribute("checked")){
//             filterAllBtn.setAttribute("checked", "");
//         }
//         postFeed.innerHTML = "";
//         if (path === "/feed/") {
//             renderPosts();
//         }
//     });

//     filterMediaBtn.addEventListener("click", () => {
//         filterMediaBtn.setAttribute("checked", "");
//         filterAllBtn.removeAttribute("checked");
//         postFeed.innerHTML = "";
//         postFeed.innerHTML = "";
//         if (path === "/feed/"){
//             renderMediaPosts();
//         }
//     });
// }

