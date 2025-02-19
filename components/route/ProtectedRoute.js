// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if the user is authenticated. You might check for a token or user role in localStorage or context.
    const isAuthenticated = localStorage.getItem('userToken'); // Replace with your auth logic

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
