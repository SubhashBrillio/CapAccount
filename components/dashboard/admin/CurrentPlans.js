// src/components/CurrentPlans.js
import React, { useState, useEffect, useContext } from 'react';
import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import PlanContext from '../../../context/PlanContext';

const CurrentPlans = () => {
    const { getAllPlansForUser,  updatePlan, getPlanById, activatePlan, deactivatePlan } = useContext(PlanContext);
    const [plans, setPlans] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [updatePlanData, setUpdatePlanData] = useState(null);

    // State for viewing plan details in a dialog
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [planDetails, setPlanDetails] = useState(null);

    // Fetch all plans (both active and deactivated)
    const fetchPlans = async () => {
        try {
            const res = await getAllPlansForUser();
            // Our API returns the plans in res.data.content
            setPlans(res.data.content);
        } catch (error) {
            console.error('Error fetching plans', error);
            toast.error('Error fetching plans');
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // const handleDeletePlan = async (planId) => {
    //     try {
    //         await deletePlan(planId);
    //         toast.success('Plan deleted successfully');
    //         fetchPlans();
    //     } catch (error) {
    //         console.error('Error deleting plan', error);
    //         toast.error('Error deleting plan');
    //     }
    // };

    const openUpdateDialog = (plan) => {
        setSelectedPlan(plan);
        setUpdatePlanData({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            duration: plan.duration,
            dataLimit: plan.dataLimit,
            features: plan.features.join(', '),
            active: plan.active,
        });
        setUpdateDialogOpen(true);
    };

    const handleUpdatePlanChange = (e) => {
        const { name, value } = e.target;
        setUpdatePlanData({ ...updatePlanData, [name]: value });
    };

    const handleUpdatePlan = async () => {
        try {
            const planId = selectedPlan.id;
            const updatedData = {
                ...updatePlanData,
                price: parseFloat(updatePlanData.price),
                duration: parseInt(updatePlanData.duration, 10),
                dataLimit: parseInt(updatePlanData.dataLimit, 10),
                features: updatePlanData.features.split(',').map((f) => f.trim()),
                active: updatePlanData.active,
            };
            await updatePlan(planId, updatedData);
            toast.success('Plan updated successfully');
            setUpdateDialogOpen(false);
            fetchPlans();
        } catch (error) {
            console.error('Error updating plan', error);
            toast.error('Error updating plan');
        }
    };

    // When a plan name is clicked, fetch its details and open a dialog.
    const handleViewPlanDetails = async (planId) => {
        try {
            const res = await getPlanById(planId);
            setPlanDetails(res.data);
            setViewDialogOpen(true);
        } catch (error) {
            console.error('Error fetching plan details', error);
            toast.error('Error fetching plan details');
        }
    };

    // Handle deactivation of an active plan.
    const handleDeactivatePlan = async (planId) => {
        try {
            const res = await deactivatePlan(planId);
            if (res.success) {
                toast.success(res.message || 'Plan deactivated successfully');
                fetchPlans();
            } else {
                toast.error(res.message || 'Deactivation failed');
            }
        } catch (error) {
            console.error('Error deactivating plan', error);
            toast.error('Error deactivating plan');
        }
    };

    // Handle activation of a deactivated plan.
    const handleActivatePlan = async (planId) => {
        try {
            const res = await activatePlan(planId);
            if (res.success) {
                toast.success(res.message || 'Plan activated successfully');
                fetchPlans();
            } else {
                toast.error(res.message || 'Activation failed');
            }
        } catch (error) {
            console.error('Error activating plan', error);
            toast.error('Error activating plan');
        }
    };

    // Split plans into active and deactivated arrays
    const activePlans = plans.filter((plan) => plan.active);
    const deactivatedPlans = plans.filter((plan) => !plan.active);

    return (
        <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                All Current Active Plans
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Data Limit</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activePlans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>
                                    <Button variant="text" color="primary" onClick={() => handleViewPlanDetails(plan.id)}>
                                        {plan.name}
                                    </Button>
                                </TableCell>
                                <TableCell>{plan.price}</TableCell>
                                <TableCell>{plan.duration}</TableCell>
                                <TableCell>{plan.dataLimit}</TableCell>
                                <TableCell>{plan.active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small" onClick={() => openUpdateDialog(plan)} sx={{ mr: 1 }}>
                                        Update
                                    </Button>
                                    {/* <Button variant="outlined" color="error" size="small" onClick={() => handleDeletePlan(plan.id)} sx={{ mr: 1 }}>
                                        Delete
                                    </Button> */}
                                    <Button variant="outlined" color="warning" size="small" onClick={() => handleDeactivatePlan(plan.id)}>
                                        Deactivate
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    All Deactivated Plans
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Data Limit</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deactivatedPlans.map((plan) => (
                                <TableRow key={plan.id}>
                                    <TableCell>
                                        <Button variant="text" color="primary" onClick={() => handleViewPlanDetails(plan.id)}>
                                            {plan.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{plan.price}</TableCell>
                                    <TableCell>{plan.duration}</TableCell>
                                    <TableCell>{plan.dataLimit}</TableCell>
                                    <TableCell>{plan.active ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        {/* <Button variant="outlined" color="error" size="small" onClick={() => handleDeletePlan(plan.id)} sx={{ mr: 1 }}>
                                            Delete
                                        </Button> */}
                                        <Button variant="outlined" color="success" size="small" onClick={() => handleActivatePlan(plan.id)}>
                                            Activate
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Dialog for Viewing Plan Details */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth>
                <DialogTitle>Plan Details</DialogTitle>
                <DialogContent>
                    {planDetails ? (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="subtitle1">Name: {planDetails.name}</Typography>
                            <Typography variant="body1">Description: {planDetails.description}</Typography>
                            <Typography variant="body1">Price: {planDetails.price}</Typography>
                            <Typography variant="body1">Duration: {planDetails.duration} days</Typography>
                            <Typography variant="body1">Data Limit: {planDetails.dataLimit} GB</Typography>
                            <Typography variant="body1">
                                Features: {planDetails.features && planDetails.features.join(', ')}
                            </Typography>
                            <Typography variant="body1">
                                Active: {planDetails.active ? 'Yes' : 'No'}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Update Plan Dialog */}
            <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} fullWidth>
                <DialogTitle>Update Plan</DialogTitle>
                <DialogContent>
                    {updatePlanData && (
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                label="Plan Name"
                                name="name"
                                value={updatePlanData.name}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                value={updatePlanData.price}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={updatePlanData.description}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Duration (days)"
                                name="duration"
                                type="number"
                                value={updatePlanData.duration}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data Limit (GB)"
                                name="dataLimit"
                                type="number"
                                value={updatePlanData.dataLimit}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Features (comma separated)"
                                name="features"
                                value={updatePlanData.features}
                                onChange={handleUpdatePlanChange}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdatePlan} variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default CurrentPlans;
