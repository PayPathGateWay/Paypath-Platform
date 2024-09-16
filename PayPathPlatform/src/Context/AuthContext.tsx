import React, { useState, useEffect } from "react";
import { isAuthenticatedAPI, loginAPI, logOutAPI, refreshTokenAPI } from "@/Services/AuthServices";
import { AuthContextType, AuthState, DecodedToken, Merchant } from "@/types/Auth/IAuth";
import { jwtDecode } from "jwt-decode"; // Updated import for jwt-decode
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });

    const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem("accessToken"));

    // Login The User
    const login = async (credentials: { email: string; password: string }) => {
        setAuthState(prevState => ({ ...prevState, loading: true, error: null }));
        try {
            const response = await loginAPI(credentials.email, credentials.password);
            const merchant: Merchant = {
                merchantId: response.data.merchantId,
                merchantName: response.data.merchantName,
                emailAddress: response.data.emailAddress,
                accessToken: response.data.accessToken,
            };

            if (response.data.accessToken) {
                sessionStorage.setItem("user", JSON.stringify(merchant));
                sessionStorage.setItem("accessToken", response.data.accessToken);
                setAccessToken(response.data.accessToken);

                setAuthState({
                    user: merchant,
                    loading: false,
                    error: null,
                });
            }
        } catch (error) {
            setAuthState({
                user: null,
                loading: false,
                error: "Login failed. Please check your credentials.",
            });
        }
    };

    // Delet the refresh token + logout the user 
    const logout = async () => {
        setAccessToken(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        await logOutAPI();
        toast.success("Logged out successfully");
        setAuthState({
            user: null,
            loading: false,
            error: null,
        });
    };

    // retrieve data from session storage
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const storedAccessToken = sessionStorage.getItem("accessToken");

        if (storedUser && storedAccessToken) {
            setAuthState({
                user: JSON.parse(storedUser),
                loading: false,
                error: null,
            });
            setAccessToken(storedAccessToken);
        } else {
            setAuthState({
                user: null,
                loading: false,
                error: null,
            });
        }
    }, []);


    // Check The User Status 
    useEffect(() => {
        if (!authState.user || !accessToken) return;

        const checkAuthStatus = async () => {
            try {
                const isAuthenticated = await isAuthenticatedAPI();
                console.log(isAuthenticated);
                if (!isAuthenticated) {
                    // TODO: FIX THIS 
                    toast.error('Access Token expired');
                    logout();
                }
            } catch (error) {
                console.error("Failed to check authentication:", error);
                logout();
            }
        };

        checkAuthStatus();
    }, [authState.user, accessToken]);


    // Send the latest access token within every request
    useEffect(() => {
        if (!accessToken) return;

        const interceptRequest = axios.interceptors.request.use(
            (config) => {
                const token = accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(interceptRequest);
        };
    }, [accessToken]);

    // Refresh the access token if it's about to expire within 5 seconds
    //TODO: make a rember me box to check 
    useEffect(() => {
        if (!accessToken) return;

        const checkTokenExpiry = async () => {
            if (!accessToken) return;

            const isTokenAboutToExpire = () => {
                try {
                    const decoded = jwtDecode<DecodedToken>(accessToken);
                    return (decoded.exp * 1000 - Date.now()) <= 5000;
                } catch (error) {
                    console.error('Failed to decode token:', error);
                    return true;
                }
            };

            if (isTokenAboutToExpire()) {
                try {
                    const newToken = await refreshTokenAPI();
                    setAccessToken(newToken);
                } catch (error) {
                    console.error('Failed to refresh access token:', error);
                    logout();
                    toast.error('Failed to refresh access token');
                }
            }
        };

        checkTokenExpiry();
        const intervalId = setInterval(checkTokenExpiry, 1000);

        return () => clearInterval(intervalId);
    }, [accessToken]);



    const value = {
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        login,
        logout,
        isAuthenticated: !!authState.user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
