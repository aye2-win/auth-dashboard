import React from "react";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // logout and redirect
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
            }}
        >

            <Box sx={{ textAlign: "center", width: "100%" }}>

                {/* title */}
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    User Dashboard
                </Typography>

                {/* user info */}
                <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography>{user?.email}</Typography>
                    <Typography>{user?.role}</Typography>
                </Stack>

                {/* logout button */}
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
                    Logout
                </Button>

            </Box>
        </Container>
    );
};

export default Dashboard;