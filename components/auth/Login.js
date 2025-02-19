// src/components/Login.js
import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

// Import the reusable Header and Footer components
import Header from '../layout/Header';
import Footer from '../layout/Footer';

// Import AuthContext to access the loginUser function
//import AuthContext from '../../context/AuthContext';

const Login = ({ isDarkMode, toggleTheme }) => {
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Get the loginUser function from AuthContext
    //const { loginUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        const payload = data.identifier.includes('@') 
            ? { email: data.identifier, password: data.password }
            : { mobile: data.identifier, password: data.password };

        try {
            const response = await axios.post(
                'http://localhost:8081/account/login',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userRole', response.data.user.role);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('userId', response.data.user.id);

                toast.success('Login successful!');
                navigate('/dashboard');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Wrong username or password');
            toast.error('Wrong username or password');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            {/* Header */}
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Main content container */}
            <Container maxWidth="sm" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
                        <TextField
                            label="Mobile Number or Email"
                            name="identifier"
                            value={data.identifier}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        {errorMessage && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                            Login
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            New user?{' '}
                            <Link component={RouterLink} to="/register" underline="hover">
                                Signup here
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Forgot password?{' '}
                            {/* <Link component={RouterLink} to="/reset-password" underline="hover">
                                Reset Password
                            </Link> */}
                            <Link component={RouterLink} to="/reset-password" underline="hover">
                                Reset Password
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default Login;
