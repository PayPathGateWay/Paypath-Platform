import React, { useState, useEffect, useCallback, useMemo, useReducer } from "react";
import {
    loginAPI,
    logOutAPI,
    registerAPI,
    refreshTokenAPI,
} from "@/Services/AuthServices";
import { AuthContextType, Merchant } from "@/types/Auth/IAuth";
import { toast } from "react-toastify";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { throttle } from 'lodash';

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Define the reducer function for managing auth state
const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, loading: false, error: null };
        case 'LOGOUT':
            return { ...state, user: null, loading: false, error: null };
        case 'SET_LOADING':
            return { ...state, loading: true, error: null };
        case 'SET_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        user: null,
        loading: true,
        error: null,
    });
    const [accessToken, setAccessToken] = useState<string | null>(() => sessionStorage.getItem("accessToken"));

    const isTokenExpired = useCallback((token: string): boolean => {
        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Token decode error:", error);
            return true;  // Consider token expired if there's an error
        }
    }, []);

    const refreshAccessToken = useCallback(async (): Promise<string> => {
        try {
            const response = await refreshTokenAPI();
            return response.data.AccessToken;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            throw new Error("Failed to refresh access token");
        }
    }, []);

    const register = useCallback(async (values: any, platformLogoFile: File) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await registerAPI(values, platformLogoFile);
            const merchant: Merchant = {
                merchantId: response.data.MerchantId,
                merchantName: response.data.MerchantName,
                emailAddress: response.data.EmailAddress,
                accessToken: response.data.AccessToken,
            };
            if (response.data.AccessToken) {
                sessionStorage.setItem("user", JSON.stringify(merchant));
                sessionStorage.setItem("accessToken", response.data.AccessToken);
                setAccessToken(response.data.AccessToken);
                dispatch({ type: 'LOGIN_SUCCESS', payload: merchant });
            }
        } catch (error) {
            console.error("Registration error:", error);
            dispatch({ type: 'SET_ERROR', payload: "Registration failed. Please check your details." });
            toast.error("Failed to register.");
        }
    }, []);

    const login = useCallback(throttle(async (credentials: any) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await loginAPI(credentials.email, credentials.password);
            const merchant: Merchant = {
                merchantId: response.data.MerchantId,
                merchantName: response.data.MerchantName,
                emailAddress: response.data.EmailAddress,
                accessToken: response.data.AccessToken,
            };
            if (response.data.AccessToken) {
                sessionStorage.setItem("user", JSON.stringify(merchant));
                sessionStorage.setItem("accessToken", response.data.AccessToken);
                setAccessToken(response.data.AccessToken);
                dispatch({ type: 'LOGIN_SUCCESS', payload: merchant });
            }
            toast.success("Logged in successfully.");
        } catch (error) {
            console.error("Login error:", error);
            dispatch({ type: 'SET_ERROR', payload: "Login failed. Please check your credentials." });
            toast.error("Failed to log in.");
        }
    }, 3000), []); // Throttle login by 3 seconds

    const logout = useCallback(async () => {
        try {
            await logOutAPI();
            toast.success("Logged out successfully.");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out.");
        } finally {
            setAccessToken(null);
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("accessToken");
            dispatch({ type: 'LOGOUT' });
            setTimeout(() => window.location.reload(), 500);
        }
    }, []);

    // Attach latest access token to axios requests
    useEffect(() => {
        const axiosInterceptor = axios.interceptors.request.use(async (config) => {
            let token = sessionStorage.getItem("accessToken");

            if (token && isTokenExpired(token)) {
                try {
                    const newAccessToken = await refreshAccessToken();
                    token = newAccessToken;
                    sessionStorage.setItem("accessToken", newAccessToken);
                    setAccessToken(newAccessToken);
                } catch (error) {
                    logout();
                    return Promise.reject(error);
                }
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, (error) => Promise.reject(error));

        return () => axios.interceptors.request.eject(axiosInterceptor);
    }, [isTokenExpired, refreshAccessToken, logout]);

    // Periodic token refresh (refresh if less than 60 seconds to expiry)
    useEffect(() => {
        const tokenRefreshInterval = setInterval(async () => {
            if (accessToken && !isTokenExpired(accessToken)) {
                const decodedToken = jwtDecode(accessToken) as { exp: number };
                const timeToExpiry = decodedToken.exp * 1000 - Date.now();

                if (timeToExpiry < 60 * 1000) { // Refresh if less than 60 seconds to expiry
                    try {
                        const newAccessToken = await refreshAccessToken();
                        setAccessToken(newAccessToken);
                        sessionStorage.setItem("accessToken", newAccessToken);
                    } catch (error) {
                        logout();
                    }
                }
            }
        }, 1 * 60 * 1000); // Check every minute

        return () => clearInterval(tokenRefreshInterval);
    }, [accessToken, isTokenExpired, refreshAccessToken, logout]);

    // Manage state on mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const storedAccessToken = sessionStorage.getItem("accessToken");
        if (storedUser && storedAccessToken) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(storedUser) });
            setAccessToken(storedAccessToken);
        } else {
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    const value = useMemo(() => ({
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        login,
        register,
        logout,
        isAuthenticated: !!authState.user,
    }), [authState.user, authState.loading, authState.error, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
