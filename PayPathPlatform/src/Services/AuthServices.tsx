import { Merchant } from "@/types/Auth/IAuth";
import axios from "axios";

// Set withCredentials globally for all Axios requests
axios.defaults.withCredentials = true;

const api = "http://localhost:5122/"; // API Base URL

// Login API
export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post<Merchant>(`${api}auth/merchant/login`, {
            EmailAddress: email,
            password: password,
        });
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

// Refresh Token API
export const refreshTokenAPI = async () => {
    try {
        const response = await axios.post(`${api}auth/merchant/refresh-token`,
             {}, { withCredentials: true });
        return response.data.accessToken;
    } catch (error) {
        console.error("Error during token refresh:");
        throw error;
    }
};

export const logOutAPI = async () => {
    try {
        const response = await axios.post(`${api}auth/merchant/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error during token refresh:");
        throw error;
    }
};


export const isAuthenticatedAPI = async () => {
    try {
        const response = await axios.post(`${api}auth/merchant/isAuthenticated`, 
            {}, { withCredentials: true });
        return response.data.isAuthenticated;
    } catch (error) {
        console.error("Error during authentication check:");
        return false;
    }
};
