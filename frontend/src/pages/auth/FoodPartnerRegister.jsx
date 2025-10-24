import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/FoodPartnerRegister.css";



const FoodPartnerRegister = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);


        const { businessName, email, password, address,phone,contactName } = formData;


        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/food-partner/register",
                {
                    businessName,
                    email,
                    password,
                    address,
                    phone,
                    contactName
                },
                {
                    withCredentials: true
                }
            );

            console.log("Registration response:", res.data);
        } catch (err) {
            console.error("Registration error:", err);
        }
        
        navigate("/create-food");
    };

    return (
        <div className="registration-container">
            <h1>Food Partner Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Not a food partner? {" "}
                <Link to="/user/register">Register as normal user</Link>
            </p>
        </div>
    );
};

export default FoodPartnerRegister;