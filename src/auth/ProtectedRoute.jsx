import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    // redirect if not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // block non-admin access to admin routes
    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/admin" replace />;
    }

    // allow access
    return children;
};

export default ProtectedRoute;