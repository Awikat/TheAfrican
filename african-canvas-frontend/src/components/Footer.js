import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Quick Links */}
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/photography">Photography</Link>
            </li>
            <li>
              <Link to="/videography">Videography</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Location, Phone, and Email */}
        <div className="contact-info">
          <h3>Contact Info</h3>
          <p>Location: Nairobi, Kenya</p>
          <p>Phone: +254 758 343 700</p>
          <p>Email: info@theafricancanvas.org</p>
        </div>

        {/* Social Media Icons */}
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://web.facebook.com/profile.php?id=100083299428996" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/the_african.canvas?igsh=b2R2emt1OXdxZDNw" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/theafricancanvas/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/@theafrican_Canvas" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Developer Info */}
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} The African Canvas. All rights reserved.</p>
        <p>
          Developed by{" "}
          <a href="https://github.com/awikat" target="_blank" rel="noopener noreferrer">
            Awika
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;