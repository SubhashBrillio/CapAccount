// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from "./components/home/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import AboutPage from "./components/pages/AboutPage";
import Mission from "./components/pages/Mission";
import Support from "./components/pages/Support";
import Dashboard from "./components/dashboard/Dashboard";
import PaymentCheckout from "./components/dashboard/user/PaymentCheckout";
import ChatbotFAB from "./components/chatbot/ChatboatFAB";

//import { AuthProvider } from "./context/AuthContext";
import { PlanProvider } from "./context/PlanContext";
import { PaymentProvider } from "./context/PaymentContext";
import { SupportProvider } from "./context/SupportContext";
import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#dc004e" },
    },
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <AuthProvider> */}
          <PlanProvider>
            <PaymentProvider>
              <SupportProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<LandingPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/login" element={<Login isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/register" element={<Register isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/reset-password" element={<ResetPassword isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/about-us" element={<AboutPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/mission" element={<Mission isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/support" element={<Support isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                      <Route path="/payment-checkout" element={<PaymentCheckout />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
                </Router>
                <ChatbotFAB />
                <ToastContainer position="top-right" autoClose={5000} />
              </SupportProvider>
            </PaymentProvider>
          </PlanProvider>
        {/* </AuthProvider> */}
      </ThemeProvider>
  );
}

export default App;
