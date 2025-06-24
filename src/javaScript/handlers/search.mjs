import { getPosts } from "../api/posts/read.mjs";
import { postTemplate } from "../templates/postTemplate.mjs";

/**
 * Attaches search functionality to the search form and renders matching posts.
 *
 * @returns {void}
 */
export function searchBar() {
    const searchForm = document.querySelector("#search-form");
    const searchInput = document.querySelector("#searchbar");
    const feedContainer = document.querySelector(".feed-posts");
    const notFound = document.createElement("p");
    notFound.textContent = "No match found.";
    notFound.classList.add("no-match-message");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === "") {
                searchInput.placeholder = "Search";
                return;
            }

            const { data: posts } = await getPosts();

            const filtered = posts.filter(post =>
                (post.title && post.title.toLowerCase().includes(searchTerm)) ||
                (post.body && post.body.toLowerCase().includes(searchTerm))
            );

            feedContainer.innerHTML = "";

            if (filtered.length === 0) {
                feedContainer.append(notFound);
            } else {
                postTemplate(filtered, feedContainer);
            }

            searchForm.reset();
        });
    }
}
