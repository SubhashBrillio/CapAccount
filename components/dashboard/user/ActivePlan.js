// src/components/ActivePlan.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const ActivePlan = () => {
    const { getActivePlan } = useContext(PlanContext);
    const [activePlan, setActivePlan] = useState(null);
    const userId = localStorage.getItem('userId'); // Assumes userId is stored at login

    const fetchActivePlan = async () => {
        try {
            const res = await getActivePlan(userId);
            // Set the response directly. Our API response has plan details in res.data
            setActivePlan(res);
        } catch (error) {
            console.error('Error fetching active plan', error);
            toast.error('Error fetching active plan');
        }
    };

    useEffect(() => {
        fetchActivePlan();
    }, [userId]);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Current Active Plan
            </Typography>
            {activePlan && activePlan.data ? (
                <Box
                    sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {activePlan.data.plan.name}
                    </Typography>
                    <Typography variant="body2">
                        Price: ₹{activePlan.data.plan.price}
                    </Typography>
                    <Typography variant="body2">
                        Duration: {activePlan.data.plan.duration} days
                    </Typography>
                    <Typography variant="body2">
                        Data Limit: {activePlan.data.plan.dataLimit} GB
                    </Typography>
                    <Typography variant="body2">
                        Status: {activePlan.data.status}
                    </Typography>
                    <Typography variant="body2">
                        Start Date: {new Date(activePlan.data.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        End Date: {new Date(activePlan.data.endDate).toLocaleDateString()}
                    </Typography>
                </Box>
            ) : (
                <Typography>No active plan available.</Typography>
            )}
        </Paper>
    );
};

export default ActivePlan;
