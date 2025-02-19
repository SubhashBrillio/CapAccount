// src/components/Header.js
import React, { useState } from 'react';
import { Home } from '@mui/icons-material';
import logo from "./Fw.jpg";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Link
} from '@mui/material';
import { Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ isDarkMode, toggleTheme }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Check if the user is logged in by verifying if a token exists
    const isLoggedIn = Boolean(localStorage.getItem('userToken'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear stored authentication data
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        handleClose();
        
        navigate('/');
    };

    return (
        <AppBar position="fixed" color="default" elevation={1}>
            <Toolbar>
                <Box
                    component="img"
                    src={logo}
                    sx={{
                        height: 40,
                        width: 40,
                        mr: 2,
                        borderRadius: '60%'
                    }}
                    alt="Logo"
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    FutureWave
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Link
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
                            </Link>
                    <Button color="inherit" href="/about-us">About Us</Button>
                    {/* <Button color="inherit" href="/mission">Our Mission</Button> */}
                    <Button color="inherit" href="/support">Help</Button>
                    {isLoggedIn
                        ? <Button color="inherit" href="/dashboard">Dashboard</Button>
                        : <Button color="inherit" href="/dashboard">Plans</Button>
                    }
                </Box>

                <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>

                <IconButton color="inherit" onClick={handleMenu} sx={{ ml: 1 }}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {isLoggedIn
                        ? <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        : [
                            <MenuItem
                                key="login"
                                onClick={handleClose}
                                component={Link}
                                href="/login"
                            >
                                Login
                            </MenuItem>,
                            <MenuItem
                                key="register"
                                onClick={handleClose}
                                component={Link}
                                href="/register"
                            >
                                Register
                            </MenuItem>
                        ]
                    }
                </Menu>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
