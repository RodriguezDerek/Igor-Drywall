import { jwtDecode } from "jwt-decode"; 

export function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return true;

        const expiryTime = decoded.exp * 1000; 
        return Date.now() > expiryTime;

    } catch (e) {
        return true;
    }
}

export function isLoggedIn() {
    const token = localStorage.getItem("token");
    return token && !isTokenExpired(token);
}

export function getUserRole() {
    return localStorage.getItem("role");
}

export function getUserId() {
    return localStorage.getItem("userId");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
}

export async function authFetch(url, options) {
    try {
        const fetchOptions = {
            method: options.method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: options.body
        };

        // Only stringify body if it's a plain object (not FormData)
        if (options.body && !(options.body instanceof FormData)) {
            fetchOptions.headers["Content-Type"] = "application/json";
            fetchOptions.body = JSON.stringify(options.body);
        }

        // Remove body for GET requests
        if(fetchOptions.method.toUpperCase() === "GET") {
            delete fetchOptions.body;
        }

        const response = await fetch(url, fetchOptions);

        if(response.status === 401){
            localStorage.clear();
            window.location.href = "/home";
            throw new Error("Unauthorized");
        }

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Request failed");
        }

        return data;

    } catch (error) {
        if(error instanceof TypeError || error.name === "TypeError" || error.name === "NetworkError"){
            throw new Error("Network error: please check your connection.");
        } else {
            throw error;
        }
    }
}

export function calculatePercentageChange(oldValue, newValue){
    if(oldValue === 0){
        if(newValue === 0) return 0;
        return 100;
    } 

    return Math.round(((newValue - oldValue) / Math.abs(oldValue)) * 100)
}