import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./The African Canvas.jpg"; // Import the logo
import "./Navbar.css"; // Import the CSS file

const Navbar = ({ token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Search Query:", searchQuery);
    // Redirect to a search results page or filter content dynamically
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={logo}
            alt="The African Canvas Logo"
            className="logo-image"
          />
          <span className="logo-text">The African Canvas</span>
        </Link>

      
        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/photography" className="nav-link">Photography</Link></li>
          <li><Link to="/videography" className="nav-link">Videography</Link></li>
          <li><Link to="/blogs" className="nav-link">Blogs</Link></li>
          <li><Link to="/testimonials" className="nav-link">Testimonials</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>

          {/* Admin Links (Visible only when logged in) */}
          {token && (
            <>
              <li><Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link></li>
              <li>
                <button
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem("adminToken");
                  }}
                  className="logout-button"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;