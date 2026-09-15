import {Navigate, Outlet, useLocation} from 'react-router';
import { useAuth } from "@/lib/context/authContext";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/account/login" state={{location}} replace />;
    }

    return <Outlet />
};

export default ProtectedRoute;