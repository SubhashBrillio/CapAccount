// src/components/UsageDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const UsageDetails = () => {
    const { getUsageDetails } = useContext(PlanContext);
    const [usage, setUsage] = useState(null);
    const userId = localStorage.getItem('userId');

    const fetchUsageDetails = async () => {
        try {
            const res = await getUsageDetails(userId);
            setUsage(res.data);
        } catch (error) {
            console.error('Error fetching usage details', error);
            toast.error('Error fetching usage details');
        }
    };

    useEffect(() => {
        fetchUsageDetails();
    }, [userId]);

    return (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
                Usage Details
            </Typography>
            {usage ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="subtitle2">Total Data Used:</Typography>
                        <Typography variant="body1">{usage.totalDataUsed} GB</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Total SMS Used:</Typography>
                        <Typography variant="body1">{Math.round(usage.totalSMSUsed)} SMS</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Total Talk Time Used:</Typography>
                        <Typography variant="body1">{usage.totalTalkTimeUsed} minutes</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Data Limit:</Typography>
                        <Typography variant="body1">{usage.dataLimit} GB</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">SMS Limit:</Typography>
                        <Typography variant="body1">{usage.smsLimit}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Talk Time Minutes:</Typography>
                        <Typography variant="body1">{usage.talkTimeMinutes}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Usage Percentage:</Typography>
                        <Typography variant="body1">{usage.usagePercentage}%</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Remaining Days:</Typography>
                        <Typography variant="body1">{usage.remainingDays}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Status:</Typography>
                        <Typography variant="body1">{usage.status}</Typography>
                    </Box>
                </Box>
            ) : (
                <Typography>No usage data available.</Typography>
            )}
        </Paper>
    );
};

export default UsageDetails;
