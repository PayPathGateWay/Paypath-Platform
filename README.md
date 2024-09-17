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

    const checkTokenExpiry = (token: string): boolean => {
        try {
          const decoded = jwtDecode<{ exp: number }>(token);
          if (!decoded.exp) {
            throw new Error("Token does not contain an expiration time.");
          }
          const timeUntilExpiry = decoded.exp * 1000 - Date.now(); // Convert 'exp' to ms
          return timeUntilExpiry <= 5000; // True if less than 5 seconds to expire
        } catch (error) {
          console.error('Failed to decode or validate token:', error);
          return true; // Force refresh on decoding errors
        }
      };
      
      useEffect(() => {
        // Request interceptor to attach access token to headers
        const interceptRequest = axios.interceptors.request.use(
          (config) => {
            const token = accessToken;
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            config.withCredentials = true; // Ensure cookies are sent with requests
            return config;
          },
          (error) => Promise.reject(error)
        );
      
        // Response interceptor to refresh token on 401 error
        const interceptResponse = axios.interceptors.response.use(
          (response) => response,
          async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              try {
                const response = await refreshTokenAPI();
                const newAccessToken = response.data.accessToken; // Access token should come from the response
                setAccessToken(newAccessToken); // Update state with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest); // Retry the original request with the new access token
              } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
                toast.error('Session expired, please log in again.');
                logout(); // Logout the user if refresh token fails
              }
            }
            return Promise.reject(error);
          }
        );
      
        // Cleanup interceptors on unmount
        return () => {
          axios.interceptors.request.eject(interceptRequest);
          axios.interceptors.response.eject(interceptResponse);
        };
      }, [accessToken, setAccessToken, logout, refreshTokenAPI]);
      
      useEffect(() => {
        if (!accessToken) return;
      
        // Function to handle token refresh if needed
        const handleTokenRefresh = async () => {
          if (checkTokenExpiry(accessToken)) {
            try {
              const response = await refreshTokenAPI();
              const newAccessToken = response.data.accessToken;
              setAccessToken(newAccessToken); // Update the state with the new token
            } catch (error) {
              console.error('Failed to refresh access token:', error);
              toast.error('Failed to refresh access token');
              logout();
            }
          }
        };
      
        // Check token on component mount and set interval for future checks
        handleTokenRefresh();
        const intervalId = setInterval(handleTokenRefresh, 40000); // Refresh every 40 seconds
      
        return () => clearInterval(intervalId); // Clean up interval on unmount
      }, [accessToken, refreshTokenAPI, setAccessToken, logout]);b


    // // Check The User Status 
    // useEffect(() => {
    //     if (!authState.user || !accessToken) return;

    //     const checkAuthStatus = async () => {
    //         try {
    //             const isAuthenticated = await isAuthenticatedAPI();
    //             console.log(isAuthenticated);
    //             if (!isAuthenticated) {
    //                 // TODO: FIX THIS 
    //                 toast.error('Access Token expired');
    //                 logout();
    //             }
    //         } catch (error) {
    //             console.error("Failed to check authentication:", error);
    //             logout();
    //         }
    //     };

    //     checkAuthStatus();
    // }, [authState.user, accessToken]);