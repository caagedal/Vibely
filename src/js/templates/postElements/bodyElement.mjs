export async function bodyElement(postData, parentElement){
    const body = document.createElement("p");
    body.textContent = postData.body;

    parentElement.append(body);
    return body;
}