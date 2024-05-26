import { avatarElement } from "./avatarElement.mjs";
import { postDateElement } from "./dateElement.mjs";


export async function profileInfoElement(postData, parentElement){
    
    const profileInfoContainer = document.createElement("a");
    profileInfoContainer.classList.add("post-profile");
    profileInfoContainer.href = `/profile/?name=${postData.name}`;

    const postAuthor = document.createElement("h3");
    postAuthor.textContent = postData.name;

    avatarElement(postData, profileInfoContainer);

    profileInfoContainer.append(postAuthor);

    postDateElement(postData, profileInfoContainer);

    parentElement.append(profileInfoContainer);

    return profileInfoContainer;
}

