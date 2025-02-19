// src/components/pages/SupportPage.js
import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Collapse, IconButton, Grid } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import {
    LightbulbOutlined,
    GroupsOutlined,
    TrendingUpOutlined,
    SecurityOutlined
} from '@mui/icons-material';

const SupportPage = ({ isDarkMode, toggleTheme }) => {
    const [expanded, setExpanded] = useState(null); // State to track expanded FAQ

    const values = [
        {
            title: 'Innovation',
            description: 'Continuously pushing boundaries and embracing new technologies.',
            icon: <LightbulbOutlined />,
        },
        {
            title: 'Collaboration',
            description: 'Working together to achieve exceptional results.',
            icon: <GroupsOutlined />,
        },
        {
            title: 'Excellence',
            description: 'Maintaining the highest standards in everything we do.',
            icon: <TrendingUpOutlined />,
        },
        {
            title: 'Trust',
            description: 'Building lasting relationships through reliability and transparency.',
            icon: <SecurityOutlined />,
        },
    ];

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle visibility of the FAQ answer
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Reusable Header Component */}
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Main Content Area */}
            <Container maxWidth="md" sx={{ my: 4, flexGrow: 1 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" align="center" gutterBottom>
                        Support
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you are experiencing any issues or have any questions, our support team is here to help.
                        Please don't hesitate to reach out.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Email:</strong> support@futurewave.com
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Phone:</strong> +1 (800) 123-4567
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can also visit our support center for FAQs and troubleshooting guides.
                    </Typography>
                </Paper>
            </Container>

            {/* Values Section
            <Box sx={{ my: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Our Values
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {values.map((value, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Box sx={{ color: 'primary.main', mb: 2, '& .MuiSvgIcon-root': { fontSize: 40 } }}>
                                    {value.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {value.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {value.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box> */}

            {/* FAQ Section with Collapse */}
            <Box sx={{ my: 4, marginLeft: 12 }}>
                <Typography variant="h4" gutterBottom align="center" paddingBottom={5}>
                    Frequently Asked Questions<br/>
                </Typography>

                {[
                    {
                        question: "What should I do if my recharge is not done?",
                        answer: "You can wait for a few hours, and if the situation remains the same, you can get in touch with the FutureWave customer support or you can also give a call on 121."
                    },
                    {
                        question: "How can I download statement of my transaction?",
                        answer: "You can download the transaction statement by logging into your account and going to the transaction history section."
                    },
                    {
                        question: "How to check data balance status on FutureWave?",
                        answer: "On the FutureWave web app, you can view your data balance by logging into your account and going to the usage details section."
                    },
                    {
                        question: "How to reach out to Customer Care support on FutureWave?",
                        answer: "On the application, you can use the chat feature or call 121."
                    }
                ].map((faq, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                onClick={() => handleToggle(index)}
                                sx={{ cursor: 'pointer', flex: 1 }}
                            >
                                 {faq.question}
                            </Typography>
                            <IconButton onClick={() => handleToggle(index)}>
                                {expanded === index ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Box>

                        <Collapse in={expanded === index}>
                            <Typography variant="body1" paragraph>
                                {faq.answer}
                            </Typography>
                        </Collapse>
                    </Box>
                ))}
            </Box>

            {/* Reusable Footer Component */}
            <Footer />
        </Box>
    );
};

export default SupportPage;
