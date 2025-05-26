// Import Navigate and Outlet from react-router-dom
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    // Check if user is logged in by checking localStorage
    const auth = localStorage.getItem('user');

    // If authenticated, render the child route; otherwise redirect to /signup
    return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
