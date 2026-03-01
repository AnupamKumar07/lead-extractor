"use client";

export const loginMock = (token: string = "mock-jwt-token-1234") => {
    // Set in localStorage for client-side usage if needed
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);

        // Set a cookie so middleware.ts can read it securely
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
};

export const logoutMock = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("token");
    }
    return false;
};
