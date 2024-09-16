import { Navigate } from "react-router-dom";

// Protected route component for authenticated users
const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const token = sessionStorage.getItem("accessToken");

  // If the token is valid, render the component
  return token ? element : <Navigate to="/auth/login" replace />;
};

// Auth route component for unauthenticated users
const AuthRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const token = sessionStorage.getItem("accessToken");

  // If the token is valid, redirect to dashboard
  return !token ? element : <Navigate to="/dashboard" replace />;
};

export { AuthRoute, ProtectedRoute };``
