import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/UserRegister.css"; // create this file
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserRegister = () => {

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
         fullName: firstName + " " + lastName,
          email,
          password,
        },{
          withCredentials: true
        }
      );

      // UI-only: log response (replace with real handling as needed)
      console.log("Registration response:", res.data);
    } catch (err) {
      console.error("Registration error:", err);
    }

    navigate("/")
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Create Account</h1>
          <p>Join to explore meals, offers, and food stories 🍔</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
            </div>

            <div className="form-group half-width">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Choose a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
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
            Create Account
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/user/login" className="text-link">
              Login
            </Link>
          </p>

          <p className="alt-register">
            Are you a food partner?{" "}
            <Link to="/food-partner/register" className="text-link">
              Register as food partner
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
