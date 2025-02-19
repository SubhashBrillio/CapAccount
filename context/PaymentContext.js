// src/context/PaymentContext.js
import React, { createContext } from 'react';
import axios from 'axios';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    // Get user transactions
    const getUserTransactions = async (userId) => {
        const response = await axios.get(`http://localhost:8083/payments/user/${userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    // Get transaction details by transactionId
    const getTransactionDetail = async (transactionId) => {
        const response = await axios.get(`http://localhost:8083/payments/transaction/${transactionId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    return (
        <PaymentContext.Provider value={{ getUserTransactions, getTransactionDetail }}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentContext;
