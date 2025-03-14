import React, { useEffect, useState } from "react";

const Photography = () => {
  const [photographyData, setPhotographyData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/photography/photography/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched photography data:", data); // Debugging
        setPhotographyData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching photography data:", error); // Log the error
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
        Photography
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}
      {photographyData.length > 0 ? (
        photographyData.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#34495e",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "#3498db", fontSize: "2.5rem" }}>📸</span> {item.title}
            </h2>
            <p
              style={{
                whiteSpace: "pre-line",
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#7f8c8d",
                marginBottom: "20px",
              }}
            >
              {item.description}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {item.images.map((image) => (
                <div
                  key={image.id}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={image.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#e74c3c" }}>
          Loading photography content...
        </p>
      )}
    </div>
  );
};

export default Photography;