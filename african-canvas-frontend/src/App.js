import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Photography from "./components/Photography";
import Videography from "./components/Videography";
import Blogs from "./components/Blogs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  useEffect(() => {
    if (!token) localStorage.removeItem("adminToken"); // Cleanup if token is null
  }, [token]);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} /> {/* Pass token and setToken to Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/videography" element={<Videography />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />
        <Route path="/admin/dashboard" element={token ? <AdminDashboard token={token} setToken={setToken} /> : <AdminLogin setToken={setToken} />} />
      </Routes>
      <Footer /> {/* Add the Footer component */}
    </Router>
  );
}

export default App;