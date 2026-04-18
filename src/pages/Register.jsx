import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Link,
    Paper,
} from "@mui/material";

import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // register handler
    const handleRegister = () => {
        const ok = register(email, password);

        if (ok) navigate("/login");
        else alert("User already exists");
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
                    Register
                </Typography>

                {/* email */}
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* password */}
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* register button */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>

                {/* login link */}
                <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login">
                        Login
                    </Link>
                </Typography>

            </Paper>
        </Container>
    );
};

export default Register;