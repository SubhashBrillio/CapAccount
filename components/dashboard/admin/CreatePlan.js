// src/components/CreatePlan.js
import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const CreatePlan = ({ onPlanCreated }) => {
    const { createPlan } = useContext(PlanContext);
    const [newPlan, setNewPlan] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        dataLimit: '',
        smsLimit: '',
        talkTimeMinutes: '',
        features: '', // comma separated string
        active: true,
    });

    const handleNewPlanChange = (e) => {
        const { name, value } = e.target;
        setNewPlan({ ...newPlan, [name]: value });
    };

    const handleCreatePlan = async () => {
        try {
            // Map features to an array
            const planData = {
                ...newPlan,
                price: parseFloat(newPlan.price),
                duration: parseInt(newPlan.duration, 10),
                dataLimit: parseInt(newPlan.dataLimit, 10),
                smsLimit: parseInt(newPlan.smsLimit, 10),
                talkTimeMinutes: newPlan.talkTimeMinutes,
                features: newPlan.features.split(',').map(f => f.trim()),
                active: newPlan.active,
            };

            await createPlan(planData);
            toast.success('Plan created successfully');
            setNewPlan({
                name: '',
                description: '',
                price: '',
                duration: '',
                dataLimit: '',
                smsLimit: '',
                talkTimeMinutes: '',
                features: '',
                active: true,
            });
            if (onPlanCreated) onPlanCreated();
        } catch (error) {
            console.error('Error creating plan', error);
            toast.error('Error creating plan');
        }
    };

    return (
        <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Create New Plan
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Plan Name"
                        name="name"
                        value={newPlan.name}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={newPlan.price}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        value={newPlan.description}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Duration (days)"
                        name="duration"
                        type="number"
                        value={newPlan.duration}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Data Limit (GB)"
                        name="dataLimit"
                        type="number"
                        value={newPlan.dataLimit}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="SMS Limit"
                        name="smsLimit"
                        type="number"
                        value={newPlan.smsLimit}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Talktime Minutes"
                        name="talkTimeMinutes"
                        type="text"
                        value={newPlan.talkTimeMinutes}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="Features (comma separated)"
                        name="features"
                        value={newPlan.features}
                        onChange={handleNewPlanChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleCreatePlan}>
                        Create Plan
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CreatePlan;
