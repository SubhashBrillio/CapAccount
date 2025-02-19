// src/components/ResetPassword.js
import React, { useState, useContext } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//import AuthContext from '../../context/AuthContext';
import { SECURITY_QUESTIONS } from '../../constants/securityQuestions';
import axios from 'axios';

const ResetPassword = ({ isDarkMode, toggleTheme }) => {
    //const { resetPassword } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        securityQuestion: '',
        securityAnswer: '',
        newPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        

        try {
            const response = await axios.post(
                'http://localhost:8081/account/reset-password',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            toast.success('Password reset successful! Please log in with your new password.');
                navigate('/login');

            // if (response.data) {
            //     toast.success('Password reset successful! Please log in with your new password.');
            //     navigate('/login');
            // }
        } catch (error) {
            console.error('Reset password error:', error);
            setErrorMessage('Reset password failed. Please check your inputs.');
            toast.error('Reset password failed. Please check your inputs.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }}>
            <Container maxWidth="sm" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="reset-security-question-label">Security Question</InputLabel>
                            <Select
                                labelId="reset-security-question-label"
                                name="securityQuestion"
                                value={formData.securityQuestion}
                                onChange={handleChange}
                                label="Security Question"
                            >
                                {SECURITY_QUESTIONS.map((question, index) => (
                                    <MenuItem key={index} value={question}>
                                        {question}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Security Answer"
                            name="securityAnswer"
                            value={formData.securityAnswer}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
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
                            Reset Password
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ResetPassword;
