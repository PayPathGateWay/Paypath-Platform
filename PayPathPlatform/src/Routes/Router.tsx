import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from '@/Components/Dashboard/Dashboard';
import Authentication from '@/Components/Auth/Authentication';
import { AuthRoute, ProtectedRoute } from './ProtectedRoute';



const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/login" element={<AuthRoute element={<Authentication />} />} />
        <Route path="/auth/register" element={<AuthRoute element={<Authentication />} />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

        {/* Redirect unauthenticated users */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </>
  );
};

const MainApp: React.FC = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default MainApp;
