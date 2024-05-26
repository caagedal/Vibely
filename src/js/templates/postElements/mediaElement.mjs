export async function mediaElement(postData, parentElement){

    const media = document.createElement("img");
    media.src = postData.media;
    media.alt = postData.title;
    if(!postData.media){
        media.style.display = "none";
    }

    parentElement.append(media);
    return media;
}