import React from 'react';
import { Paper, Container, Grid, Typography, Box, Link } from '@mui/material';
import { Home } from '@mui/icons-material';

const Footer = () => {
    return (
        <Paper
            component="footer"
            sx={{
                py: 4,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[100],
            }}
            elevation={0}
        >
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" color="text.secondary">
                            © 2025 FutureWave. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {/* <Link
                                href="/"
                                color="inherit"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                <Home sx={{ mr: 0.5 }} fontSize="small" />
                                Home
                            </Link> */}
                            {/* <Link
                                href="/about-us"
                                color="inherit"
                                sx={{
                                    textDecoration: 'none',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                About Us
                            </Link> */}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default Footer;
