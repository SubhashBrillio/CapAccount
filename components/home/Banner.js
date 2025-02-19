import React from 'react';
import {
    Box,
    Button,
    Typography,
    IconButton,
    CardMedia,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Banner = ({ slides, currentSlide, nextSlide, prevSlide }) => {
    return (
        <Box sx={{ position: 'relative', mt: 8 }}>
            <Box sx={{ height: 300, overflow: 'hidden', position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    sx={{ objectFit: 'auto' }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        {/* <Typography variant="h3" component="h2" gutterBottom>
                            {slides[currentSlide].title}
                        </Typography> */}
                        {/* <Typography variant="h6" gutterBottom>
                            {slides[currentSlide].description}
                        </Typography> */}
                        {/* <Button
                            variant="contained"
                            size="large"
                            href={slides[currentSlide].link}
                            sx={{ mt: 2 }}
                        >
                            Learn More
                        </Button> */}
                    </Box>
                </Box>
            </Box>
            <IconButton
                onClick={prevSlide}
                sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' },
                }}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton
                onClick={nextSlide}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'background.paper' },
                }}
            >
                <ChevronRight />
            </IconButton>
        </Box>
    );
};

export default Banner;
