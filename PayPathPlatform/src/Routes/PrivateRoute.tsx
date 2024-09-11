import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = false; // Replace with actual auth check
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
