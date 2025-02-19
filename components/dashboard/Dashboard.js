// src/components/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';
import EmployeeDashboard from './employee/EmployeeDashboard';

const Dashboard = ({ isDarkMode, toggleTheme }) => {
    const userRole = localStorage.getItem('userRole'); // Should be set at login

    if (userRole === 'ADMIN') {
        return <AdminDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
    } else if (userRole === 'USER') {
        return <UserDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
    } else if (userRole === 'EMPLOYEE') {
        return <EmployeeDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
    } else {
        return (
            <Container>
                <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                    You are not authorized to access this resource. Please contact your administrator.
                </Typography>
            </Container>
        );
    }
};

export default Dashboard;
