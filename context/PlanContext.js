// src/context/PlanContext.js
import React, { createContext } from 'react';
import axios from 'axios';

const PlanContext = createContext();

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const PlanProvider = ({ children }) => {
    // Admin endpoints
    const createPlan = async (planData) => {
        const response = await axios.post(
            'http://localhost:8082/plans',
            planData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    const updatePlan = async (planId, planData) => {
        const response = await axios.put(
            `http://localhost:8082/plans/${planId}`,
            planData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    const deletePlan = async (planId) => {
        const response = await axios.delete(
            `http://localhost:8082/plans/${planId}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // For admin: get paginated plans
    const getAllPlans = async (page = 0) => {
        const response = await axios.get(
            `http://localhost:8082/plans?page=${page}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    const getPlanById = async (planId) => {
        const response = await axios.get(
            `http://localhost:8082/plans/${planId}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // For user: get all available plans (card layout)
    const getAllPlansForUser = async () => {
        const response = await axios.get(
            `http://localhost:8082/admin/plans/all`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // For user: subscribe to a plan
    const subscribePlan = async (userId, planId) => {
        const payload = { userId, planId };
        const response = await axios.post(
            'http://localhost:8082/user-plans/subscribe',
            payload,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // For user: get active plan
    const getActivePlan = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:8082/user-plans/user/${userId}/active`,
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return null;
            }
            throw error;
        }
    };

    // For user: get plan history
    const getPlanHistory = async (userId) => {
        const response = await axios.get(
            `http://localhost:8082/user-plans/user/${userId}/history`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // New: For user: get usage details
    const getUsageDetails = async (userId) => {
        const response = await axios.get(
            `http://localhost:8082/user-plans/user/${userId}/usage`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // New: Cancel Subscription
    const cancelSubscription = async (subscriptionId) => {
        const response = await axios.post(
            `http://localhost:8082/user-plans/${subscriptionId}/cancel`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.data;
    };


    // New: Activate a plan
    const activatePlan = async (planId) => {
        const response = await axios.post(
            `http://localhost:8082/admin/plans/${planId}/activate`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    // New: Deactivate a plan
    const deactivatePlan = async (planId) => {
        const response = await axios.post(
            `http://localhost:8082/admin/plans/${planId}/deactivate`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.data;
    };

    return (
        <PlanContext.Provider
            value={{
                createPlan,
                updatePlan,
                deletePlan,
                getAllPlans,
                getPlanById,
                getAllPlansForUser,
                subscribePlan,
                getActivePlan,
                getPlanHistory,
                getUsageDetails,
                cancelSubscription,
                activatePlan,
                deactivatePlan
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export default PlanContext;
