


export async function sidebarProfileLink(profile){
    const profileLink = document.querySelector("#menuProfile");
    profileLink.href = `/profile/?name=${profile}`;
}

export async function sidebarLink(){
    const user = JSON.parse(localStorage.getItem("profile"));
    const profile = user.name;

    sidebarProfileLink(profile);
}

sidebarLink();


export async function tinyProfile(profile){
    const container = document.querySelector(".mini-profile");

    const tinyImg = document.createElement("img");
    tinyImg.src = profile.avatar || "/src/media/placeholder-img.webp";
    tinyImg.alt = profile.name;

    const tinyUserName = document.createElement("p");
    tinyUserName.textContent = profile.name;

    container.append(tinyImg, tinyUserName);

}

export async function tinySideBar() {
    const user = JSON.parse(localStorage.getItem("profile"));
    tinyProfile(user);
    ppimg(user);
}

tinySideBar();

export async function ppimg(profile){
    const imgContainer = document.querySelector(".personal-post-img");
    const personalPostImg = document.createElement("img");
    personalPostImg.classList.add("posting-img");
    personalPostImg.src = profile.avatar || "/src/media/placeholder-img.webp";
    personalPostImg.alt = profile.name;

    imgContainer.append(personalPostImg);
}

