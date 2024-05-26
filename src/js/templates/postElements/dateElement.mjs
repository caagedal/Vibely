export async function postDateElement(postData, parentElement){

    const newDate = new Date(postData.created).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
        
    const newDateUpdated = new Date(postData.updated).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    const postDate = document.createElement("p");
    postDate.textContent = newDate;
    if (postData.updated !== postData.created) {
        postDate.title = "Updated: " + newDateUpdated;
    }

    parentElement.append(postDate);

    return postDate;   

}