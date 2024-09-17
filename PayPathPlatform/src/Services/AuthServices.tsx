import axios from "axios";


axios.defaults.withCredentials = true;


const api = "http://localhost:5122/"; // API Base URL

const axiosInstance = axios.create({
    baseURL: `${api}`,
    timeout: 5000, 
    withCredentials: true
});

export const registerAPI = async (
    values: {
        merchantName: string;
        phoneNumber: string;
        platformName: string;
        email: string;
        password: string;
    },
    platformLogoFile: File 
) => {
    try {

        const phoneNumber = values.phoneNumber;
        if (phoneNumber === undefined) {
            throw new Error("Phone number is required");
        }
        if (values.platformName === undefined)
        {
            throw new Error("Platform name is required");
        }
        if (values.email === undefined){
            throw new Error("Email address is required");
        }
        const formData = new FormData();
        formData.append('merchantName', values.merchantName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('platformName', values.platformName);
        formData.append('platformLogoFile', platformLogoFile);
        formData.append('emailAddress', values.email);
        formData.append('password', values.password);

        // Send the request using FormData
        const response = await 
        axios.post(`${api}auth/merchant/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error("Error during registration:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios error message:", error.message);
            console.error("Axios error details:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};


export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${api}auth/merchant/login`, {
            EmailAddress: email,
            password: password,
        });
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const refreshTokenAPI = async () => {
    try {
        const response = await axios.post(
            `${api}auth/merchant/refresh-token`,
            {},  // Empty body for token refresh
            {
                withCredentials: true,  // Include credentials (e.g., cookies) in requests
                timeout: 10000,         // 10 seconds timeout for token refresh
            }
        );
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle specific Axios errors (timeout, 401, etc.)
            if (error.code === "ECONNABORTED") {
                console.error("Token refresh request timed out");
                throw new Error("Token refresh timed out");
            }
            if (error.response?.status === 401) {
                console.error("Unauthorized error during token refresh");
                throw new Error("Unauthorized");
            }
        }
        console.error("Error during token refresh:", error);
        throw new Error("Token refresh failed");
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

export const testRoute = async () => {
    try {
        // Start timing the request for debugging purposes.
        console.time("Auth Test Request");
        
        // Only return the necessary data from the response to reduce the payload size.
        const { data } = await axios.get(`${api}auth/merchant/test`, { withCredentials: true });
        
        console.timeEnd("Auth Test Request");
        return data;
    } catch (error) {
        console.error("Error during authentication check:", error);
        return false;
    }
};


