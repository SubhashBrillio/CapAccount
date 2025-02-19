// src/pages/AboutPage.js
import React from 'react';
import aboutpage from "./aboutpage.jpg";
import {
    Container,
    Typography,
    Grid,
    Card,
    // CardContent,
    CardMedia,
    Box,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme
} from '@mui/material';
import {
    LightbulbOutlined,
    GroupsOutlined,
    TrendingUpOutlined,
    SecurityOutlined,
    Stars
} from '@mui/icons-material';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const AboutPage = ({ isDarkMode, toggleTheme }) => {
    const theme = useTheme();

    // const teamMembers = [
    //     {
    //         name: 'Sarah Johnson',
    //         role: 'CEO & Founder',
    //         image: '/api/placeholder/300/300',
    //         description: 'Visionary leader with 15+ years of industry experience.',
    //     },
    //     {
    //         name: 'David Chen',
    //         role: 'CTO',
    //         image: '/api/placeholder/300/300',
    //         description: 'Technical innovator driving our technological advancement.',
    //     },
    //     {
    //         name: 'Maria Garcia',
    //         role: 'Head of Design',
    //         image: '/api/placeholder/300/300',
    //         description: 'Creative director shaping our user experience.',
    //     },
    // ];

    const values = [
        {
            title: 'Innovation',
            description: 'Continuously pushing boundaries and embracing new technologies.',
            icon: <LightbulbOutlined />,
        },
        {
            title: 'Collaboration',
            description: 'Working together to achieve exceptional results.',
            icon: <GroupsOutlined />,
        },
        {
            title: 'Excellence',
            description: 'Maintaining the highest standards in everything we do.',
            icon: <TrendingUpOutlined />,
        },
        {
            title: 'Trust',
            description: 'Building lasting relationships through reliability and transparency.',
            icon: <SecurityOutlined />,
        },
    ];

    const achievements = [
        'Industry leader in technological innovation',
        'Over 1 million satisfied users worldwide',
        'Award-winning customer support',
        '99.9% service reliability',
    ];

    return (
        <Box sx={{ py: 8, mb: 1 }}>

            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    py: 1,
                    mb: 4,
                }}
            >

                <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" gutterBottom>
                        About FutureWave
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Shaping the future of technology through innovation and excellence
                    </Typography>
                </Container>
            </Box>

            {/* Company Overview */}
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            Our Story
                        </Typography>
                        <Typography paragraph>
                            Founded in 2020, FutureWave has been at the forefront of technological
                            innovation. We started with a simple mission: to make cutting-edge
                            technology accessible to everyone while maintaining the highest standards
                            of quality and security.
                        </Typography>
                        <Typography paragraph>
                            Today, we serve millions of users worldwide, providing solutions that
                            transform the way people interact with technology. Our commitment to
                            innovation and excellence has made us a trusted leader in the industry.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={aboutpage}
                                alt="Company Office"
                                sx={{ objectFit: 'cover' }}
                            />
                        </Card>
                    </Grid>
                </Grid>

                {/* Values Section */}
                <Box sx={{ my: 8 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Our Values
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {values.map((value, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Box sx={{
                                        color: 'primary.main',
                                        mb: 2,
                                        '& .MuiSvgIcon-root': { fontSize: 40 }
                                    }}>
                                        {value.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Team Section
                <Box sx={{ my: 8 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Our Leadership Team
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card elevation={2}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={member.image}
                                        alt={member.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary" gutterBottom>
                                            {member.role}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {member.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box> */}

                {/* Achievements Section */}
                <Box sx={{ my: 8 }}>
                    <Paper elevation={2} sx={{ p: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h4" gutterBottom align="center">
                            Our Achievements
                        </Typography>
                        <List>
                            {achievements.map((achievement, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <Stars color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={achievement} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>

                {/* Mission Statement */}
                <Box sx={{ my: 8, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="h6" sx={{ maxWidth: '600px', mx: 'auto', color: 'text.secondary' }}>
                        "To empower individuals and organizations with innovative technology solutions
                        that enhance their digital experience while maintaining the highest standards
                        of security and reliability."
                    </Typography>
                </Box>
            </Container>
                {/* Reusable Footer Component */}
            <Footer />
        </Box>
    );
};

export default AboutPage;