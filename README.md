# Paypath-Platform

## Tech Stack 
- TypeScript
- Redux (or Recoil, Zustand)
- Jest + React Testing Library
- ESLint + Prettier
- **React.js**
- **React-router.js**
- **Tailwind CSS**
- **Shadcn**
- **TypeScript**
- **Vite**
- **SOCKET IO**




    // Refresh token function
    const refreshAccessToken = useCallback(async () => {
        if (!accessToken) return;

        try {
            const response = await refreshTokenAPI();
            const newAccessToken = response.data.accessToken;

            if (newAccessToken) {
                sessionStorage.setItem("accessToken", newAccessToken);
                setAccessToken(newAccessToken);
                setAuthState(prevState => ({
                    ...prevState,
                    user: {
                        ...prevState.user!,
                        accessToken: newAccessToken,
                    } as Merchant,
                }));
            }
        } catch (error) {
            console.error("Failed to refresh access token:", error);
            logout();
        }
    }, [accessToken]);



        // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         try {
    //             const isAuthenticated = await isAuthenticatedAPI();
    //             if (!isAuthenticated) {
    //                 logout();
    //             }
    //         } catch (error) {
    //             console.error("Failed to check authentication:", error);
    //             logout();
    //         }
    //     };

    //     checkAuthStatus();
    // }, [authState.user, accessToken, refreshAccessToken]);


        const refreshToken = async () => {
        try {
            const response = await refreshTokenAPI();
            if (response.data.accessToken) {
                sessionStorage.setItem("accessToken", response.data.accessToken);
                setAccessToken(response.data.accessToken);
                return true;
            }
        } catch (error) {
            logout(); // Logout if refresh token fails
            return false;
        }
    };

    const checkAuthentication = async () => {
        if (!accessToken || isTokenExpired(accessToken)) {
            const success = await refreshToken();
            if (!success) {
                return false;
            }
        }

        try {
            const response = await isAuthenticatedAPI();
            return response.data;
        } catch {
            return false;
        }
        
    };


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

        // Periodic authentication check
        const interval = setInterval(async () => {
            const isAuthenticated = await checkAuthentication();
            if (!isAuthenticated) {
                logout();
            }
        }, 2000); // Check every 2 seconds

        return () => clearInterval(interval);
    }, [accessToken]);