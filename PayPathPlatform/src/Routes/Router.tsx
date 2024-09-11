import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Authantcation from '@/Components/Auth/Authantcation';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/auth/login" element={<Authantcation/>} />
            <Route path="/auth/register" element={<Authantcation/>}/>

            {/* Redirect unauthenticated users from home to login */}
            <Route
                path="/"
                element={<Navigate to="/auth/login" replace />}
            />

            {/* Private routes (require authentication) */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <h1>Dashboard (Private)</h1>
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <h1>Profile (Private)</h1>
                    </PrivateRoute>
                }
            />

            {/* Catch-all route for 404 not found */}
            <Route path="*" element={<div>NOT FOUND</div>} />
        </Routes>
    );
};

const MainApp: React.FC = () => (
    <Router>
        <AppRouter />
    </Router>
);

export default MainApp;
