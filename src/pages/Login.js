import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Import CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store data in localStorage
    localStorage.setItem("userData", JSON.stringify(formData));

    // Navigate to dashboard with name state
    navigate("/dashboard", { state: { name: formData.name } });
  };

  return (
    <div className="container">
      {/* Left Side Image */}
      <div className="left-panel">
        <img src="./image.png" alt="Background" className="bg-image" />
      </div>

      {/* Right Side Form */}
      <div className="right-panel">
        <div className="form-container">
          <h2 className="title">Login to your account</h2>
          <form onSubmit={handleSubmit}>
            {["name", "phone", "email", "password"].map((field, index) => (
              <div key={index} className="input-group">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
