import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from '../layout/Header';
import Banner from './Banner';
import About from "./About";
import Footer from '../layout/Footer';
import ad1 from "./ad1.png";
import ad2 from "./ad2.png";
import ad3 from "./ad3.png";

const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
        },
    });

    const slides = [
        { image: ad1 },
        { image: ad2 },
        { image: ad3 }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

     // Auto-slide every 3 seconds
     useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <Banner
                    slides={slides}
                    currentSlide={currentSlide}
                    nextSlide={nextSlide}
                    prevSlide={prevSlide}
                    onClickSlide={() => navigate("/plan")}
                    imgStyle={{ maxWidth: "100%", height: "auto", objectFit: "contain", imageRendering: "crisp-edges" }}
                />
                <About />
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;
