// Mock Auth Service
export const isAuthenticated = () => {
    // Replace this with real authentication logic (e.g., check token)
    return !!localStorage.getItem("authToken");
  };
  