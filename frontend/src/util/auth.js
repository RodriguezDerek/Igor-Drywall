
export function isLoggedIn(){
    return !!localStorage.getItem("token");
}

export function getUserRole(){
    return localStorage.getItem("role");
}

export function getUserId(){
    return localStorage.getItem("userId");
}

export function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}