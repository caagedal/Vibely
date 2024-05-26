export async function postProfileLinkElement(post, parentElement){
    const postProfileLink = document.createElement("a");
    postProfileLink.classList.add("post-profile");
    postProfileLink.href = `/profile/?name=${post.author.name}`;

    parentElement.append(postProfileLink);
    return postProfileLink;
}