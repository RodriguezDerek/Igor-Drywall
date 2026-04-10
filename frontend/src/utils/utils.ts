export function formatPhoneNumber(phoneNumber: string): string {
    let digits = phoneNumber.replace(/\D/g, ""); 

    if (digits.length > 10) digits = digits.slice(0, 10);

    if (digits.length > 6) {
        digits = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6);
    } else if (digits.length > 3) {
        digits = digits.slice(0, 3) + '-' + digits.slice(3);
    }

    return digits;
}

export async function authFetch(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
    }

    return response;
}