import { jwtDecode } from "jwt-decode"; // ✅ Correct for ESM/Vite

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;

    const expiryTime = decoded.exp * 1000; // JWT exp is in seconds
    return Date.now() > expiryTime;
  } catch (e) {
    return true; // treat invalid tokens as expired
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
