// src/components/UserDashboardTabs.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Tabs, Tab, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PlanContext from '../../../context/PlanContext';
import PlanHistory from './PlanHistory';
import ActivePlan from './ActivePlan';
import TransactionDetails from './TransactionDetails';
import UsageDetails from './UsageDetails';  // Import new component
import BillingDetails from './BillingDetails';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const UserDashboardTabs = () => {
    const navigate = useNavigate();
    const { getAllPlansForUser, getPlanHistory } = useContext(PlanContext);
    const [value, setValue] = useState(0);
    const [plans, setPlans] = useState([]);
    const [subscriptionCount, setSubscriptionCount] = useState(0);

    const userId = localStorage.getItem('userId');

    const fetchPlans = async () => {
        try {
            const res = await getAllPlansForUser();
            setPlans(res.data.content);
        } catch (error) {
            console.error('Error fetching plans for user', error);
            toast.error('Error fetching plans');
        }
    };

    const fetchSubscriptionCount = async () => {
        try {
            const res = await getPlanHistory(userId);
            const count = res.data && res.data.planHistory ? res.data.planHistory.length : 0;
            setSubscriptionCount(count);
        } catch (error) {
            console.error('Error fetching subscription count', error);
            toast.error('Error fetching subscription count');
        }
    };

    useEffect(() => {
        fetchPlans();
        fetchSubscriptionCount();
    }, [getAllPlansForUser, getPlanHistory, userId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBuyPlan = (plan) => {
        navigate('/payment-checkout', { state: { planId: plan.id, amount: plan.price } });
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: 'background.paper' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="User Dashboard Tabs"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px' }}
            >
                <Tab label="All Plans" {...a11yProps(0)} />
                <Tab label="Active Plan" {...a11yProps(1)} />
                <Tab label="Plan History" {...a11yProps(2)} />
                <Tab label="Billing Details" {...a11yProps(3)} />
                <Tab label="Transaction Details" {...a11yProps(4)} />
                <Tab label="Usage Details" {...a11yProps(5)} />  {/* New Tab */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    All Available Plans
                </Typography>
                {subscriptionCount >= 2 && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        You are not allowed to select any further plans as you have already opted for 2 plans.
                    </Typography>
                )}
                {plans && plans.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {plans
                            .filter((plan) => plan.active)
                            .map((plan) => (
                                <Box
                                    key={plan.id}
                                    sx={{
                                        flex: '1 1 calc(33.33% - 16px)',
                                        minWidth: '280px',
                                        p: 2,
                                        border: '1px solid #ccc',
                                        borderRadius: 2,
                                        backgroundColor: 'background.paper',
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {plan.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Price: ₹{plan.price} | Duration: {plan.duration} days | Data: {plan.dataLimit} GB | SMS : {plan.smsLimit} | Talktime Minutes : {plan.talkTimeMinutes}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            disabled={subscriptionCount >= 2}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                borderRadius: 2,
                                                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                                transition: 'background-color 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                    boxShadow: '0px 6px 12px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                            onClick={() => handleBuyPlan(plan)}
                                        >
                                            Buy Plan
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                    </Box>
                ) : (
                    <Typography>No plans available.</Typography>
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PlanHistory />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ActivePlan />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <BillingDetails />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TransactionDetails />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Usage Details
                </Typography>
                <UsageDetails />
            </TabPanel>
        </Box>
    );
};

export default UserDashboardTabs;
