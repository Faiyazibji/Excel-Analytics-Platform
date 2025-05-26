import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            const { user, auth } = response.data;

            if (user && auth) {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", auth);

                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                alert("Invalid login credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.error || "Something went wrong. Try again later.";
            alert(errorMsg);
        }
    };

    return (
        <div className="login">
            <input
                type="text"
                className="inputbox"
                placeholder="Enter email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                className="inputbox"
                placeholder="Enter password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
            />
            <button
                className="appbtn"
                type="button"
                onClick={handleLogin}
            >
                Log In
            </button>
        </div>
    );
};

export default Login;
