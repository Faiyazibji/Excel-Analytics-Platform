// Import React and necessary functions from react-router-dom
import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Define Nav component
const Nav = () => {
    // Check if user is logged in by reading from localStorage
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); // Used to redirect after logout

    // Logout function: clears localStorage and redirects to signup page
    const logout = () => {
        localStorage.clear(); // Remove user data
        navigate('/signup'); // Redirect to Sign Up page
    }

    return (
        <>
            <div className="nav">
                {/* If user is authenticated, show navigation links */}
                {auth ? (
                    <ul className="nav-ul">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add">Add file</Link></li>
                        <li><Link to="/update">Update file</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        {/* Logout link: triggers logout function */}
                        <li><Link onClick={logout} to="/signup" id="logout">Logout</Link></li>
                    </ul>
                ) : (
                    // If not authenticated, show login/signup options
                    <ul className="nav-ul">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default Nav;
