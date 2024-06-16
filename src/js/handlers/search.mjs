
// export function searchBar(){
//     const searchContainer = document.querySelector(".search-container");
//     const searchForm = document.querySelector("#search-form");
//     const searchInput = document.querySelector("#searchbar");
//     const feedContainer = document.querySelector(".feed-posts");
//     const notFound = document.createElement("p");
//     notFound.textContent = "No match found.";

//     searchForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const searchTerm = searchInput.value.trim().toLowerCase();
//         if (searchTerm === "") {
//             searchInput.placeholder = "Search"
//             return;
//         }

//         const searchPosts = feedContainer.querySelectorAll(".post-card");
//         let matchFound = false;

//         searchPosts.forEach((searchPost) => {
//             const postTitle = searchPost.querySelector("h3").textContent.toLowerCase();
//             const postBody = searchPost.querySelector("p").textContent.toLowerCase();

//             if (postTitle.includes(searchTerm) || postBody.includes(searchTerm)) {
//                 searchPost.style.display = "block";
//                 matchFound = true;
//                 searchForm.reset();
//             }else {
//                 searchPost.style.display = "none";
//             }

//         });

//         if (!matchFound) {
//             searchContainer.append(notFound);
//             searchForm.reset();
//         }else{
//             if (searchContainer.contains(notFound)) {
//                 searchContainer.removeChild(notFound);
//             }
//         }
//     });
// }

// searchBar();

export function searchBar(){
    const searchContainer = document.querySelector(".search-container");
    const searchForm = document.querySelector("#search-form");
    const searchInput = document.querySelector("#searchbar");
    const feedContainer = document.querySelector(".feed-posts");
    const notFound = document.createElement("p");
    notFound.textContent = "No match found.";
    notFound.classList.add("no-match-message");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === "") {
                searchInput.placeholder = "Search";
                return;
            }

            const searchPosts = feedContainer.querySelectorAll(".post-card");
            let matchFound = false;

            searchPosts.forEach((searchPost) => {
                const postTitle = searchPost.querySelector("h3").textContent.toLowerCase();
                const postBody = searchPost.querySelector(".body-search").textContent.toLowerCase();

                if (postTitle.includes(searchTerm) || postBody.includes(searchTerm)) {
                    searchPost.style.display = "block";
                    matchFound = true;
                } else {
                    searchPost.style.display = "none";
                }
            });

            if (!matchFound) {
                if (!searchContainer.contains(notFound)) {
                    searchContainer.appendChild(notFound);
                }
            } else {
                if (searchContainer.contains(notFound)) {
                    searchContainer.removeChild(notFound);
                }
            }

            searchForm.reset();
        });
    }
}

searchBar();


