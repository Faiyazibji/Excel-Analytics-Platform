import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.jpg"; // Adjust path if needed

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [showSplash, setShowSplash] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/"); // Redirect if already logged in
        }
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/register", formData);
            const { user } = response.data;

            if (user) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            const errorMsg = error.response?.data?.error || "Registration failed. Try again later.";
            alert(errorMsg);
        }
    };

    return (
        <>
            {showSplash ? (
                <div className="splash-screen">
                    <img src={logo} alt="Logo" className="logo-animation" />
                </div>
            ) : (
                <div className="register animate-fade-slide">
                    <h1>Create an Account</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="inputbox"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            className="inputbox"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                        />
                        <input
                            className="inputbox"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <select
                            className="inputbox"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button className="appbtn" type="submit">
                            Sign Up
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default SignUp;
