// src/components/admin/AdminDashboard.js
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import CreatePlan from './CreatePlan';
import CurrentPlans from './CurrentPlans';
import TicketManagement from './TicketManagement';

const AdminDashboard = ({ isDarkMode, toggleTheme }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Dashboard
                </Typography>
                <CreatePlan onPlanCreated={() => {}} />
                <CurrentPlans />
                <TicketManagement />
            </Container>
            <Footer />
        </Box>
    );
};

export default AdminDashboard;
