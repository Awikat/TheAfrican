import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
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
      console.log("Form submission successful:", result); // Debugging
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error); // Log the error
      setError("Failed to send your message. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "3rem",
          fontWeight: "700",
          color: "#2c3e50",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Contact Us
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}
      {successMessage && (
        <p style={{ color: "#27ae60", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          {successMessage}
        </p>
      )}

      {/* Contact Details */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Location */}
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className="fas fa-map-marker-alt" style={{ fontSize: "2rem", color: "#3498db", marginBottom: "10px" }}></i>
            <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "#7f8c8d" }}>
              Location: Nairobi, Kenya
            </p>
          </div>

          {/* Phone */}
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className="fas fa-phone-alt" style={{ fontSize: "2rem", color: "#3498db", marginBottom: "10px" }}></i>
            <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "#7f8c8d" }}>
              Phone:{" "}
              <a href="tel:+254758343700" style={{ color: "#3498db", textDecoration: "none" }}>
                +254 758 343 700
              </a>
            </p>
          </div>

          {/* Email */}
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className="fas fa-envelope" style={{ fontSize: "2rem", color: "#3498db", marginBottom: "10px" }}></i>
            <p style={{ margin: "5px 0", fontSize: "1.1rem", color: "#7f8c8d" }}>
              Email:{" "}
              <a href="mailto:info@theafricancanvas.org" style={{ color: "#3498db", textDecoration: "none" }}>
                info@theafricancanvas.org
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Small Heading to Separate Sections */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "#34495e",
          marginBottom: "20px",
        }}
      >
        Contact Form
      </h2>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px", color: "#34495e" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px", color: "#34495e" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        {/* Subject */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="subject" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px", color: "#34495e" }}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="message" style={{ display: "block", fontSize: "1.1rem", marginBottom: "5px", color: "#34495e" }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              minHeight: "150px",
              outline: "none",
            }}
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
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;