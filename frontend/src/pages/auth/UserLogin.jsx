import React, { useState } from 'react';
import "../../styles/UserLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit =async (e) => {
        e.preventDefault();
        // Handle login logic here
        // console.log('Email:', email, 'Password:', password);

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/user/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            console.log("Login response:", res);
        } catch (err) {
            console.error("Login error:", err);
        }

        navigate("/");
    };

    return (
        <div className="login-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;