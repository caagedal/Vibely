
// export async function search(){
//     const searchBar = document.querySelector("search-container");
//     const searchForm = document.querySelector("#search-form");
//     const searchInput = document.querySelector("#searchbar");
//     const postContainer = document.querySelector(".feed-posts");
//     const noFound = document.createElement("p");
//     noFound.textContent = "No match found!";

//     searchForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const searchTerm = searchInput.ariaValueMax.trim().toLowerCase();
//         if (searchTerm === "") {
//             searchInput.placeholder = "search";
//             return;
//         }

//         const 
//     })
// }

export async function searchPosts() {
    const searchForm = document.querySelector("#search-form");
    const searchInput = document.querySelector("#searchbar");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputValue = searchInput.value.toLowerCase();
            const containers = document.querySelectorAll(".post-card");

            containers.forEach(function(container) {
                const text = container.textContent.toLowerCase();
                container.style.display = text.includes(inputValue) ? "" : "none";
            });
        });
    }
}