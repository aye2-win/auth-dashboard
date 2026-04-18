import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // login handler
    const handleLogin = () => {
        const ok = login(email, password);

        if (!ok) {
            alert("Invalid credentials");
            return;
        }

        // get logged user from storage
        const user = JSON.parse(localStorage.getItem("user"));

        // redirect based on role
        if (user?.role === "admin") {
            navigate("/admin", { replace: true });
        } else {
            navigate("/dashboard", { replace: true });
        }
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
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "80%",
                    borderRadius: 3,
                }}
            >

                {/* title */}
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {/* email */}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* password */}
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* login button */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                {/* register link */}
                <Typography align="center" sx={{ mt: 2 }}>
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
                </Typography>

            </Paper>
        </Container>
    );
};

export default Login;