import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// default admin account
const DEFAULT_ADMIN = {
    email: "admin@gmail.com",
    password: "admin123",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // load saved user session
    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
    }, []);

    // login user or admin
    const login = (email, password) => {
        // check admin first
        if (
            email === DEFAULT_ADMIN.email &&
            password === DEFAULT_ADMIN.password
        ) {
            const adminUser = { email, role: "admin" };
            setUser(adminUser);
            localStorage.setItem("user", JSON.stringify(adminUser));
            return true;
        }

        // check normal users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const found = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!found) return false;

        const normalUser = { email: found.email, role: "user" };

        setUser(normalUser);
        localStorage.setItem("user", JSON.stringify(normalUser));

        return true;
    };

    // register new user
    const register = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find((u) => u.email === email);
        if (exists) return false;

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    };

    // clear session
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// access auth context
export const useAuth = () => useContext(AuthContext);