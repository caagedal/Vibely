export async function usernameElement(postData, parentElement){

    const postAuthor = document.createElement("h3");
    postAuthor.textContent = postData.name;

    parentElement.append(postAuthor);
    return postAuthor;
}