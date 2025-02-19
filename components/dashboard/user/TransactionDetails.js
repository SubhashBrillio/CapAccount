// src/components/TransactionDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PaymentContext from '../../../context/PaymentContext';
import PlanContext from '../../../context/PlanContext';

const TransactionDetails = () => {
    const { getUserTransactions, getTransactionDetail } = useContext(PaymentContext);
    const { getPlanById } = useContext(PlanContext);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const userId = localStorage.getItem('userId'); // Assumes userId is stored during login

    const fetchTransactions = async () => {
        try {
            const res = await getUserTransactions(userId);
            setTransactions(res); // API returns an array of transactions
        } catch (error) {
            console.error('Error fetching transactions', error);
            toast.error('Error fetching transactions');
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // When a transaction is clicked, fetch its details and then the plan details
    const handleTransactionClick = async (transactionId) => {
        try {
            const txnDetail = await getTransactionDetail(transactionId);
            // Fetch plan details using the planId from the transaction.
            const planRes = await getPlanById(txnDetail.planId);
            // Extract plan details from the API response.
            const planName = planRes?.data?.name || txnDetail.planId;
            const planDuration = planRes?.data?.duration || '';
            const planDataLimit = planRes?.data?.dataLimit || '';
            const planSMSLimit = planRes?.data?.smsLimit || '';
            const planTalkTime = planRes?.data?.talkTimeMinutes || '';
            const updatedTxn = {
                ...txnDetail,
                planName,
                planDuration,
                planDataLimit,
                planSMSLimit,
                planTalkTime,
            };
            setSelectedTransaction(updatedTxn);
            setDetailDialogOpen(true);
        } catch (error) {
            console.error('Error fetching transaction detail', error);
            toast.error('Error fetching transaction detail');
        }
    };

    // Function to download transactions as PDF.
    const downloadPdf = async () => {
        const doc = new jsPDF();

        // Enhance transactions: for each transaction, if extra plan details are missing, fetch them.
        const enhancedTxns = await Promise.all(
            transactions.map(async (txn) => {
                if (!txn.planName) {
                    try {
                        const planRes = await getPlanById(txn.planId);
                        return {
                            ...txn,
                            planName: planRes?.data?.name || txn.planId,
                            planDuration: planRes?.data?.duration || '',
                            planDataLimit: planRes?.data?.dataLimit || '',
                            planSMSLimit: planRes?.data?.smsLimit || '',
                            planTalkTime: planRes?.data?.talkTimeMinutes || '',
                        };
                    } catch (error) {
                        return {
                            ...txn,
                            planName: txn.planId,
                            planDuration: '',
                            planDataLimit: '',
                            planSMSLimit: '',
                            planTalkTime: '',
                        };
                    }
                } else {
                    return {
                        ...txn,
                        planDuration: txn.planDuration || '',
                        planDataLimit: txn.planDataLimit || '',
                        planSMSLimit: txn.planSMSLimit || '',
                        planTalkTime: txn.planTalkTime || '',
                    };
                }
            })
        );

        // Prepare table rows: Sr No, Plan Name, Duration, Data Limit, SMS Limit, TalkTime, Amount, Payment Date
        const rows = enhancedTxns.map((txn, index) => [
            index + 1,
            txn.planName,
            txn.planDuration,
            txn.planDataLimit,
            txn.planSMSLimit,
            txn.planTalkTime,
            txn.amount,
            new Date(txn.paymentDate).toLocaleDateString(),
        ]);

        // 🔥 Add Title at the top of the PDF
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(18);
        doc.text('FutureWave Transaction Details', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });


        // Setup autoTable with a startY to leave room for header
        doc.autoTable({
            head: [['Sr No', 'Plan Name', 'Duration (days)', 'Data Limit (GB)', 'SMS Limit', 'TalkTime (mins)', 'Amount', 'Payment Date']],
            body: rows,
            startY: 40,
            didDrawPage: function (data) {
                const pageWidth = doc.internal.pageSize.getWidth();
                const marginLeft = data.settings.margin.left;
                const marginRight = data.settings.margin.right || marginLeft;

                // Retrieve user details from localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                const userName = user ? `${user.firstName} ${user.lastName}` : 'N/A';
                const userEmail = user ? user.email : 'N/A';
                const userPhone = user ? user.mobile : 'N/A';
                const userAddress = user ? user.address : 'N/A';

                doc.setFontSize(10);
                // Left side: Name and Email
                doc.text(`Name: ${userName}`, marginLeft, 30);
                doc.text(`Email: ${userEmail}`, marginLeft, 37);
                // Right side: Alt Phone and Address
                const phoneText = `Mobile: ${userPhone}`;
                const addressText = `Address: ${userAddress}`;
                const phoneTextWidth = doc.getTextWidth(phoneText);
                const addressTextWidth = doc.getTextWidth(addressText);
                doc.text(phoneText, pageWidth - marginRight - phoneTextWidth, 30);
                doc.text(addressText, pageWidth - marginRight - addressTextWidth, 37);

                // Footer: Page number
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(9);
                doc.text(`Page ${pageCount}`, marginLeft, doc.internal.pageSize.getHeight() - 10);
            },
        });

        doc.save('transaction-details.pdf');
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Transaction Details</Typography>
                <Button variant="contained" color="secondary" onClick={downloadPdf}>
                    Download PDF
                </Button>
            </Box>
            {transactions && transactions.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {transactions.map((txn) => (
                        <Box
                            key={txn.transactionId}
                            sx={{
                                flex: '1 1 calc(33.33% - 16px)',
                                minWidth: '280px',
                                p: 2,
                                borderRadius: 2,
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: 'background.paper',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                            onClick={() => handleTransactionClick(txn.transactionId)}
                        >
                            <Typography variant="subtitle1" color="primary" sx={{ textDecoration: 'underline', mb: 1 }}>
                                Transaction ID: {txn.transactionId}
                            </Typography>
                            <Typography variant="body2">Status: {txn.status}</Typography>
                            <Typography variant="body2">Amount: ₹{txn.amount}</Typography>
                            <Typography variant="body2">
                                Date: {new Date(txn.paymentDate).toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography>No transactions available.</Typography>
            )}

            {/* Transaction Detail Dialog */}
            <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} fullWidth>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogContent dividers>
                    {selectedTransaction ? (
                        <Box>
                            <Typography variant="body1">
                                <strong>Transaction ID:</strong> {selectedTransaction.transactionId}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Plan Name:</strong> {selectedTransaction.planName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>User ID:</strong> {selectedTransaction.userId}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Duration:</strong> {selectedTransaction.planDuration} days
                            </Typography>
                            <Typography variant="body1">
                                <strong>Data Limit:</strong> {selectedTransaction.planDataLimit} GB
                            </Typography>
                            <Typography variant="body1">
                                <strong>SMS Limit:</strong> {selectedTransaction.planSMSLimit}
                            </Typography>
                            <Typography variant="body1">
                                <strong>TalkTime:</strong> {selectedTransaction.planTalkTime} minutes
                            </Typography>
                            <Typography variant="body1">
                                <strong>Amount:</strong> ₹{selectedTransaction.amount}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedTransaction.status}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Payment Date:</strong> {new Date(selectedTransaction.paymentDate).toLocaleString()}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TransactionDetails;
