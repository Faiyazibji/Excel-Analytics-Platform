import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            navigate('/'); // Redirect if already logged in
        }
    }, [navigate]);

    const collectData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", {
                name,
                email,
                password,
                role
            });

            const { user } = response.data;

            if (user) {
                alert("Registration successful! Please login.");
                navigate('/login');
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            const errorMsg = error.response?.data?.error || "Registration failed. Try again later.";
            alert(errorMsg);
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <form>
                <input
                    className="inputbox"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                />
                <input
                    type="text"
                    className="inputbox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter E-mail"
                />
                <input
                    type="password"
                    className="inputbox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                />
                <select
                    className="inputbox"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button onClick={collectData} className="appbtn" type="button">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
