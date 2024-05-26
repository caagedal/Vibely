import { deletePost } from "../../api/posts/delete.mjs";

export async function interactionElements(postData, parentElement){

    const likeBtn = document.createElement("button");
    likeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;

    const postAuth = postData.name;
    const user = JSON.parse(localStorage.getItem("profile")).name;
    if (postAuth === user) {
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("edit-button");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

        editBtn.addEventListener("click", () => {
            window.location.href = `/feed/post/edit/?id=${postData.id}`;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        deleteBtn.addEventListener("click", async () => {
            try {
                await deletePost(postData.id);
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete post:", error);
            }
        });

        parentElement.append(editBtn, deleteBtn);
    }

    parentElement.append(likeBtn);
}