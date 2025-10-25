// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../../styles/FoodPartnerRegister.css";



// const FoodPartnerRegister = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Handle form submission logic here
//         console.log('Form submitted:', formData);


//         const { businessName, email, password, address,phone,contactName } = formData;


//         try {
//             const res = await axios.post(
//                 "http://localhost:3000/api/auth/food-partner/register",
//                 {
//                     businessName,
//                     email,
//                     password,
//                     address,
//                     phone,
//                     contactName
//                 },
//                 {
//                     withCredentials: true
//                 }
//             );

//             console.log("Registration response:", res.data);
//         } catch (err) {
//             console.error("Registration error:", err);
//         }
        
//         navigate("/create-food");
//     };

//     return (
//         <div className="registration-container">
//             <h1>Food Partner Registration</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//             <p style={{ marginTop: '1rem' }}>
//                 Not a food partner? {" "}
//                 <Link to="/user/register">Register as normal user</Link>
//             </p>
//         </div>
//     );
// };

// export default FoodPartnerRegister;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/FoodPartnerRegister.css";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { businessName, contactName, phone, email, address, password } = formData;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name:businessName,
          contactName,
          phone,
          email,
          address,
          password,
        },
        { withCredentials: true }
      );
      console.log("Registration response:", res.data);
    } catch (err) {
      console.error("Registration error:", err);
    }

    navigate("/create-food");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Food-Partner Registration</h1>
          <p>Partner with us and grow your business 🚀</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Enter your restaurant name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Owner / Manager name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter contact number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@business.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Business Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Full address of your business"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Register Business
          </button>

          <p className="login-link">
            Not a food partner?{" "}
            <Link to="/user/register" className="text-link">
              Register as normal user
            </Link>
          </p>

          <p className="alt-register">
            Already registered?{" "}
            <Link to="/food-partner/login" className="text-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
