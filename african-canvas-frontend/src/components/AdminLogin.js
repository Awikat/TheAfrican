import React, { useState } from "react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Admin login successful:", result); // Debugging

      // Redirect to Django Admin interface
      window.location.href = "http://127.0.0.1:8000/admin/"; // Replace with your Django Admin URL
    } catch (error) {
      console.error("Error logging in:", error); // Log the error
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem", fontWeight: "700", color: "var(--primary-color)" }}>
        Admin Login
      </h1>
      {error && <p style={{ color: "var(--error-color)", textAlign: "center", marginBottom: "20px" }}>Error: {error}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Username */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px" }}>
            Admin Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px" }}>
            Admin Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1.1rem",
            backgroundColor: "var(--primary-color)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;