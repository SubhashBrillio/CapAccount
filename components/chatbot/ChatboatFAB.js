import React, { useState } from 'react';
import {
    Fab,
    Dialog,
    DialogContent,
    IconButton,
    useTheme,
    Slide,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chatbot from './Chatbot';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChatbotFAB = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const userRole = localStorage.getItem('userRole'); // Consider using context or global state

    if (userRole !== 'USER') return null;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Fab
                color="primary"
                aria-label="Open chatbot"
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: theme.spacing(3),
                    right: theme.spacing(3),
                    zIndex: theme.zIndex.modal + 1,
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s',
                    },
                }}
            >
                <ChatIcon />
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                TransitionComponent={Transition}
                sx={{
                    '& .MuiDialog-container': {
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    },
                    '& .MuiDialog-paper': {
                        width: { xs: '90vw', sm: 600, md: 800 },
                        height: { xs: '70vh', sm: '75vh', md: 600 },
                        maxHeight: '80vh',
                        borderRadius: 3,
                        backgroundColor: 'transparent',
                        overflow: 'hidden',
                        boxShadow: theme.shadows[8],
                    },
                }}
            >
                <IconButton
                    onClick={handleClose}
                    aria-label="Close chatbot"
                    sx={{
                        position: 'absolute',
                        top: theme.spacing(1),
                        right: theme.spacing(1),
                        zIndex: theme.zIndex.modal + 1,
                        color: 'primary.contrastText',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                <DialogContent
                    sx={{
                        p: 0,
                        backgroundColor: 'transparent',
                        height: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <Chatbot />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ChatbotFAB;
