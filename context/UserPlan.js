// src/context/UserPlanContext.js
import React, { createContext } from 'react';
import axios from 'axios';

const UserPlanContext = createContext();

export const UserPlanProvider = ({ children }) => {
    // Helper: include auth token in headers.
    const getAuthHeaders = () => {
        const token = localStorage.getItem('userToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    // Get all available plans for users
    const getAllPlans = async () => {
        const response = await axios.get(
            'http://localhost:8082/admin/plans/all',
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // Subscribe to (buy) a plan
    const subscribePlan = async (subscriptionData) => {
        const response = await axios.post(
            'http://localhost:8082/user-plans/subscribe',
            subscriptionData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // Process a payment
    const processPayment = async (paymentData) => {
        const response = await axios.post(
            'http://localhost:8083/payments/process',
            paymentData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // Get user plan history
    const getPlanHistory = async (userId) => {
        const response = await axios.get(
            `http://localhost:8082/user-plans/user/${userId}/history`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // Get the user's current active plan
    const getActivePlan = async (userId) => {
        const response = await axios.get(
            `http://localhost:8082/user-plans/user/${userId}/active`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // Cancel upcoming subscription (dummy endpoint)
    const cancelSubscription = async (userId) => {
        const response = await axios.post(
            `http://localhost:8082/user-plans/user/${userId}/cancel`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    return (
        <UserPlanContext.Provider value={{
            getAllPlans,
            subscribePlan,
            processPayment,
            getPlanHistory,
            getActivePlan,
            cancelSubscription,
        }}>
            {children}
        </UserPlanContext.Provider>
    );
};

export default UserPlanContext;
