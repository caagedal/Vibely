
export async function avatarElement(postData, parentElement){

    const postAvatar = document.createElement("img");
    postAvatar.src = postData.avatar || "/src/media/placeholder-img.webp"
    postAvatar.alt = postData.name + "'s profile image"; 

    parentElement.append(postAvatar);

    return postAvatar;
}






