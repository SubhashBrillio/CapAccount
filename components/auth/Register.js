// src/components/Register.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link
} from '@mui/material';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
//import AuthContext from '../../context/AuthContext';
import { SECURITY_QUESTIONS } from '../../constants/securityQuestions';

const Register = ({ isDarkMode, toggleTheme }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    confirmPassword: '',
    mobile: '',
    alternateMobileNumber: '',
    address: '',
    role: 'USER', // default role
    securityQuestion: '',
    securityAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  //const { registerUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For firstName/lastName: allow only alphabets
    if (name === 'firstName' || name === 'lastName') {
      const regex = /^[A-Za-z]*$/;
      if (value === '' || regex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === 'alternateMobileNumber' || name === 'mobile') {
      const sanitizedValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'passwordHash') {
      setPasswordError('');
    }
    if (name === 'confirmPassword') {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const minLength = 8;
    const containsUpperCase = /[A-Z]/.test(password);
    const containsLowerCase = /[a-z]/.test(password);
    const containsNumber = /\d/.test(password);
    const containsSpecial = /[@#$%]/.test(password);

    setFormData({ ...formData, passwordHash: password });

    if (
        password.length >= minLength &&
        containsUpperCase &&
        containsLowerCase &&
        containsNumber &&
        containsSpecial
    ) {
      setPasswordError('');
    } else {
      setPasswordError(
          'Weak password. Must be at least 8 characters long with uppercase, lowercase, a number, and a special character (@, #, $, %).'
      );
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim())
      newErrors.lastName = 'Last Name is required';
    if (
        !formData.email.trim() ||
        !formData.email.includes('@') ||
        !formData.email.includes('.')
    ) {
      newErrors.email = 'Valid Email is required';
    }
    if (!formData.passwordHash.trim()) {
      newErrors.passwordHash = 'Password is required';
    }
    if(!formData.mobile.trim() || !formData.mobile.match(/^\d{10}$/)){
      newErrors.mobile = 'Valid Mobile number is requried';
    }
    if(formData.mobile === formData.alternateMobileNumber){
      newErrors.alternateMobileNumber = 'Alternate Mobile Number should be different from Mobile Number';
    }
    if (passwordError) {
      newErrors.passwordHash = passwordError;
    }
    if (formData.passwordHash !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.securityQuestion.trim()) {
      newErrors.securityQuestion = 'Security Question is required';
    }
    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = 'Security Answer is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        email: formData.email,
        password: formData.passwordHash,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        alternatePhone: formData.alternateMobileNumber,
        address: formData.address,
        role: formData.role, // include role in payload
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer
      };

      try {
        const response = await axios.post(
            'http://localhost:8081/account/register',
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data) {
            toast.success('Signup Successful! Please log in.');
            navigate('/login');
        }
    } catch (err) {
        const errorMsg = err.response?.data || 'An error occurred. Please try again.';
        toast.error(errorMsg);
    }

    }
  };

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Container maxWidth="sm" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
              />
              <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
              />
              <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
              />
              <TextField
                  label="Password"
                  name="passwordHash"
                  type="password"
                  value={formData.passwordHash}
                  onChange={handlePasswordChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.passwordHash)}
                  helperText={errors.passwordHash}
              />
              <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
              />
              <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile}
              />
              <TextField
                  label="Alternate Phone"
                  name="alternateMobileNumber"
                  value={formData.alternateMobileNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.alternateMobileNumber)}
                  helperText={errors.alternateMobileNumber}
              />
              <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.address)}
                  helperText={errors.address}
              />
              <FormControl fullWidth margin="normal" error={Boolean(errors.role)}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" error={Boolean(errors.securityQuestion)}>
                <InputLabel id="security-question-label">Security Question</InputLabel>
                <Select
                    labelId="security-question-label"
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
                {errors.securityQuestion && (
                    <Typography variant="caption" color="error">
                      {errors.securityQuestion}
                    </Typography>
                )}
              </FormControl>
              <TextField
                  label="Security Answer"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.securityAnswer)}
                  helperText={errors.securityAnswer}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Sign Up
              </Button>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Login here
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
        <Footer />
      </Box>
  );
};

export default Register;
