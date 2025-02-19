// src/components/UserDashboard.js
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import UserDashboardTabs from './UserDashboardTabs';

const UserDashboard = ({ isDarkMode, toggleTheme }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Container sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
                <UserDashboardTabs />
            </Container>
            <Footer />
        </Box>
    );
};

export default UserDashboard;
