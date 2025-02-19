// src/components/PlanHistory.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const PlanHistory = () => {
    const { getPlanHistory, cancelSubscription } = useContext(PlanContext);
    const [history, setHistory] = useState([]);
    const userId = localStorage.getItem('userId'); // Assumes userId is stored at login

    const fetchPlanHistory = async () => {
        try {
            const res = await getPlanHistory(userId);
            // Access planHistory from res.data.planHistory
            setHistory(res?.data?.planHistory || []);
        } catch (error) {
            console.error('Error fetching plan history', error);
            toast.error('Error fetching plan history');
        }
    };

    useEffect(() => {
        fetchPlanHistory();
    }, []);

    // Function to handle subscription cancellation
    const handleCancel = async (subscriptionId) => {
        try {
            const res = await cancelSubscription(subscriptionId);
            if (res.success) {
                toast.success(res.message || 'Subscription cancelled successfully');
                fetchPlanHistory(); // Refresh history after cancellation
            } else {
                toast.error(res.message || 'Cancellation failed');
            }
        } catch (error) {
            console.error('Error cancelling subscription', error);
            toast.error('Error cancelling subscription');
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Plan History
            </Typography>
            {history && history.length > 0 ? (
                history.map((record) => (
                    <Box
                        key={record.id}
                        sx={{
                            mb: 2,
                            p: 2,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {record.plan.name}
                        </Typography>
                        <Typography variant="body2">Status: {record.status}</Typography>
                        <Typography variant="body2">
                            Start Date: {new Date(record.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            End Date: {new Date(record.endDate).toLocaleDateString()}
                        </Typography>
                        {record.status === 'UPCOMING' && (
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleCancel(record.id)}
                                >
                                    Cancel Subscription
                                </Button>
                            </Box>
                        )}
                    </Box>
                ))
            ) : (
                <Typography>No plan history available.</Typography>
            )}
        </Paper>
    );
};

export default PlanHistory;
