// src/components/PaymentCheckout.js
import React, { useState, useContext } from 'react';
import { Container, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Button, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const PaymentCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { subscribePlan } = useContext(PlanContext);

    // Retrieve planId and amount from location state.
    const { planId, amount, planName } = location.state || {};
    const userId = localStorage.getItem('userId'); // Assuming userId is stored on login

    const [paymentMethod, setPaymentMethod] = useState('Wallet');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardDetailChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handlePayNow = async () => {
        try {
            // First, attempt to subscribe the user to the plan.
            const subscribeResponse = await subscribePlan(userId, planId);

            if (!subscribeResponse.success) {
                // Subscription failed; show error message and do not process payment.
                toast.error(subscribeResponse.message || 'Subscription failed. You cannot subscribe to more than 2 plans.');
                return;
            }

            // Subscription was successful, now process the payment.
            const payload = {
                planId: planId,
                userId: userId,
                amount: amount,
                
            };

            const paymentResponse = await axios.post(
                'http://localhost:8083/payments/process',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            toast.success(paymentResponse.data.message || 'Payment processed successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error processing payment', error);
            toast.error('Error processing payment');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Payment Checkout
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Price: ₹{(amount / 1.18).toFixed(2)} <br />
                    Tax Amount: ₹{((amount * 0.18) / 1.18).toFixed(2)} <br />
                    <b>Total Amount: ₹{amount.toFixed(2)}</b>
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend">Select Payment Method</FormLabel>
                    <RadioGroup row value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                        <FormControlLabel value="Debit Card" control={<Radio />} label="Debit Card" />
                        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                    </RadioGroup>
                </FormControl>
                {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Expiry Date"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardDetailChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="CVV"
                            name="cvv"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={handleCardDetailChange}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                )}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handlePayNow}>
                        Pay Now
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PaymentCheckout;
