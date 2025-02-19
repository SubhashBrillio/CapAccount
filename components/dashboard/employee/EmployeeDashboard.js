// src/components/employee/EmployeeDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from '@mui/material';
import { toast } from 'react-toastify';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import SupportContext from "../../../context/SupportContext";

const EmployeeDashboard = ({ isDarkMode, toggleTheme }) => {
    const { getEmployeeTickets, updateTicketStatus } = useContext(SupportContext);
    const [tickets, setTickets] = useState([]);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const employeeId = localStorage.getItem('userId');

    const fetchTickets = async () => {
        try {
            const res = await getEmployeeTickets(employeeId);
            setTickets(res);
        } catch (error) {
            console.error("Error fetching employee tickets", error);
            toast.error("Error fetching employee tickets");
        }
    };

    useEffect(() => {
        if (employeeId) {
            fetchTickets();
        }
    }, [employeeId]);

    const handleOpenStatusDialog = (ticket) => {
        setSelectedTicket(ticket);
        setNewStatus(ticket.status); // Preselect current status
        setStatusDialogOpen(true);
    };

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleUpdateStatus = async () => {
        if (!newStatus) {
            toast.error("Please select a new status.");
            return;
        }
        try {
            const payload = { status: newStatus };
            const res = await updateTicketStatus(selectedTicket.id, payload);
            // Assume a successful update returns a ticket with updated status
            if (res && res.status) {
                toast.success("Ticket status updated successfully");
                setStatusDialogOpen(false);
                fetchTickets();
            } else {
                toast.error("Failed to update ticket status");
            }
        } catch (error) {
            console.error("Error updating ticket status", error);
            toast.error("Error updating ticket status");
        }
    };

    return (
        <>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Employee Dashboard
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Tickets Assigned to You
                    </Typography>
                    {tickets && tickets.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ticket ID</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell>{ticket.id}</TableCell>
                                            <TableCell>{ticket.title}</TableCell>
                                            <TableCell>{ticket.description}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.priority}</TableCell>
                                            <TableCell>{ticket.userId}</TableCell>
                                            <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handleOpenStatusDialog(ticket)}
                                                >
                                                    Change Status
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography align="center">No tickets assigned.</Typography>
                    )}
                </Paper>
            </Container>
            <Footer />

            {/* Dialog for updating ticket status */}
            <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Update Ticket Status</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">New Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={newStatus}
                                label="New Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                                <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                                <MenuItem value="CLOSED">CLOSED</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdateStatus}>
                        Update Status
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EmployeeDashboard;
