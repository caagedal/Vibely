export async function titleElement(postData, parentElement){
    
    const title = document.createElement("h3");
    title.textContent = postData.title;
    
    parentElement.append(title);
    return title;
}