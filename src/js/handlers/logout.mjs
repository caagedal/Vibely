export function logoutListener(){
    const logout = document.querySelector(".sign-out");

    if(logout){
        logout.addEventListener("click", ()=> {
            localStorage.removeItem("profile");
            localStorage.removeItem("token");
            localStorage.clear();
            window.location.href = "/"
        });
    }
}