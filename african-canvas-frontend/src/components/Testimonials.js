import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/testimonials/testimonials/") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched testimonials data:", data); // Debugging
        setTestimonials(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching testimonials data:", error); // Log the error
        setError(error.message); // Set error message
      });
  }, []);

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
        Testimonials
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}

      {testimonials.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            padding: "0 20px",
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Testimonial Image */}
              <img
                src={testimonial.image_url}
                alt={testimonial.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                  border: "4px solid #3498db",
                }}
              />

              {/* Testimonial Name */}
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#34495e", marginBottom: "10px" }}>
                {testimonial.name}
              </h3>

              {/* Testimonial Rating */}
              <div style={{ marginBottom: "10px" }}>
                {Array.from({ length: testimonial.rating }, (_, index) => (
                  <span key={index} style={{ color: "gold", fontSize: "1.5rem" }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#7f8c8d" }}>
                "{testimonial.testimony}"
              </p>

              {/* Testimonial Date */}
              <p style={{ fontSize: "0.9rem", color: "#7f8c8d", marginTop: "10px" }}>
                {new Date(testimonial.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#e74c3c" }}>Loading testimonials...</p>
      )}
    </div>
  );
};

export default Testimonials;