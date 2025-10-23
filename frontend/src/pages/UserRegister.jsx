import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UserRegister.css"; // create this file

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User registered:", formData);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Create Account</h1>
          <p>Join to explore meals, offers, and food stories 🍔</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
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
        </form>

        <footer className="register-footer">
          <small>
            By creating an account, you agree to our{" "}
            <span className="text-link">terms & privacy policy.</span>
          </small>
        </footer>
      </div>
    </div>
  );
};

export default UserRegister;
