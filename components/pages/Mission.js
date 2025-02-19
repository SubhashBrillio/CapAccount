// src/components/pages/Mission.js
import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Mission = ({ isDarkMode, toggleTheme }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            {/* Reusable Header Component */}
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Main content area */}
            {/* <Container maxWidth="md" sx={{ my: 8, flexGrow: 1 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        gutterBottom
                    >
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At FutureWave, our mission is to revolutionize the technology landscape by delivering innovative, user-centric solutions that empower businesses and individuals alike.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We believe in creating products that not only push the boundaries of what’s possible but also drive positive change in the world. Our dedicated team works tirelessly to transform complex challenges into intuitive, accessible experiences.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Through continuous innovation, collaboration, and a relentless focus on quality, we aim to build a future where technology and humanity grow together in harmony.
                    </Typography>
                </Paper>
            </Container> */}

            <Box sx={{ my: 8, p: 8 }}>
                    <Paper elevation={2} sx={{ p: 8, bgcolor: 'background.default' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        gutterBottom
                    >
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At FutureWave, our mission is to revolutionize the technology landscape by delivering innovative,
                         user-centric solutions that empower businesses and individuals alike. <br/>
                         We believe in creating products that not only push the boundaries of what’s possible but 
                         also drive positive change in the world. Our dedicated team works tirelessly to transform complex challenges into intuitive, accessible experiences.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We believe in creating products that not only push the boundaries of what’s possible but also drive positive change in the world. Our dedicated team works tirelessly to transform complex challenges into intuitive, accessible experiences.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Through continuous innovation, collaboration, and a relentless focus on quality, we aim to build a future where technology and humanity grow together in harmony.
                    </Typography>
                    </Paper>
                </Box>

                

            {/* Reusable Footer Component */}
            <Footer />
        </Box>
    );
};

export default Mission;
