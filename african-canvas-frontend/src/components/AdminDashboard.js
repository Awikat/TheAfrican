import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const AdminDashboard = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem", fontWeight: "700", color: "var(--primary-color)" }}>
        Admin Dashboard
      </h1>

      {/* Navigation Links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        <Link
          to="/admin/photography"
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "var(--secondary-color)",
            color: "#fff",
            textAlign: "center",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Manage Photography
        </Link>
        <Link
          to="/admin/videography"
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "var(--secondary-color)",
            color: "#fff",
            textAlign: "center",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Manage Videography
        </Link>
        <Link
          to="/admin/blogs"
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "var(--secondary-color)",
            color: "#fff",
            textAlign: "center",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Manage Blogs
        </Link>
        <Link
          to="/admin/testimonials"
          style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "var(--secondary-color)",
            color: "#fff",
            textAlign: "center",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Manage Testimonials
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;