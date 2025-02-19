// src/context/SupportContext.js
import React, { createContext } from 'react';
import axios from 'axios';

const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
    const createTicket = async (ticketData) => {
        const response = await axios.post(
            'http://localhost:8084/support/tickets',
            ticketData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };

    // New: Get tickets by user
    const getUserTickets = async (userId) => {
        const response = await axios.get(
            `http://localhost:8084/support/tickets/user/${userId}`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data; // Expected to return an array of tickets
    };

    // New: Get tickets assigned to an employee
    const getEmployeeTickets = async (employeeId) => {
        const response = await axios.get(
            `http://localhost:8084/support/tickets/employee/${employeeId}`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data; // Expected to be an array of tickets
    };

    // Get tickets for a customer (not used here, but may be useful)
    const getTicketsByUser = async (userId) => {
        const response = await axios.get(
            `http://localhost:8084/support/tickets/user/${userId}`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };

    // New: Get all tickets (for admin)
    const getAllTickets = async () => {
        const response = await axios.get(
            'http://localhost:8084/support/tickets/get-all-tickets',
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };

    // New: Get all employees
    const getAllEmployees = async () => {
        const response = await axios.get(
            'http://localhost:8081/account/get-all-employees',
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };

    // New: Assign ticket to an employee
    const assignTicket = async (ticketId, employeeId) => {
        const response = await axios.put(
            `http://localhost:8084/support/tickets/${ticketId}/assign/${employeeId}`,
            {},
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };

    // New: Update ticket status
    const updateTicketStatus = async (ticketId, payload) => {
        const response = await axios.put(
            `http://localhost:8084/support/tickets/${ticketId}/status`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    };



    return (
        <SupportContext.Provider value={{ createTicket, getUserTickets, getEmployeeTickets,
            getTicketsByUser, getAllTickets, getAllEmployees, assignTicket, updateTicketStatus }}>
            {children}
        </SupportContext.Provider>
    );
};

export default SupportContext;
