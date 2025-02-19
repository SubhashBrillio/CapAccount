import React from 'react';
import { Container, Typography, Grid, Box, Button, CardMedia } from '@mui/material';
import aboutus from "./aboutus.jpg";

const AboutUs = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
                Who we are
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={aboutus}
                        alt="About Us"
                        sx={{ borderRadius: 2, boxShadow: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography paragraph variant="body1">
                            Welcome to FutureWave, where innovation meets excellence. We are dedicated to providing
                            cutting-edge solutions that transform the way you interact with technology.
                        </Typography>
                        <Typography paragraph variant="body1">
                            Our team of experts works tirelessly to ensure that every product and service we offer
                            meets the highest standards of quality and user experience.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            href="/about-us"
                            sx={{ mt: 2, alignSelf: 'flex-start' }}
                        >
                            Learn More About Us
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUs;
