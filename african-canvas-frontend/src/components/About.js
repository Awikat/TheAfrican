import React, { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState(null); // Initialize as null
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({}); // Track expanded sections

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/about/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched about data:", data); // Debugging
        setAboutData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching about data:", error); // Log the error
        setError(error.message); // Set error message
      });
  }, []);

  // Toggle "Read More" for a section
  const toggleReadMore = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
        About Us
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}
      {aboutData ? ( // Check if aboutData is not null
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Left Column */}
          <div style={{ flex: "1 1 45%", minWidth: "300px" }}>
            {/* Who We Are */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px",
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
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>👥</span> Who We Are
              </h2>
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#34495e",
                  marginBottom: "10px",
                }}
              >
                {aboutData.who_we_are}
              </p>
            </div>

            {/* Mission */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px",
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
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🎯</span> Mission
              </h2>
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#34495e",
                  marginBottom: "10px",
                }}
              >
                {aboutData.mission}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: "1 1 45%", minWidth: "300px" }}>
            {/* Vision */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px",
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
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🌍</span> Vision
              </h2>
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#34495e",
                  marginBottom: "10px",
                }}
              >
                {aboutData.vision}
              </p>
            </div>

            {/* Values */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px",
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
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>💎</span> Values
              </h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {aboutData.values.split("\r\n").map((value, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      color: "#34495e",
                      marginBottom: "10px",
                      display: expandedSections.values ? "block" : index < 3 ? "block" : "none",
                    }}
                  >
                    {value.trim()}
                  </li>
                ))}
              </ul>
              {aboutData.values.split("\r\n").length > 3 && (
                <button
                  onClick={() => toggleReadMore("values")}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#3498db",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  {expandedSections.values ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>

          {/* Full Width Sections */}
          {/* Target Audience */}
          <div
            style={{
              flex: "1 1 100%",
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "30px",
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
              <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🎯</span> Target Audience
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {aboutData.target_audience.split("\r\n").map((audience, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#34495e",
                    marginBottom: "10px",
                    display: expandedSections.targetAudience ? "block" : index < 3 ? "block" : "none",
                  }}
                >
                  {audience.trim()}
                </li>
              ))}
            </ul>
            {aboutData.target_audience.split("\r\n").length > 3 && (
              <button
                onClick={() => toggleReadMore("targetAudience")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#3498db",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                {expandedSections.targetAudience ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Team Members */}
          <div style={{ flex: "1 1 100%", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#34495e",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Our Team
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
              {aboutData.team_members.map((member) => (
                <div
                  key={member.id}
                  style={{
                    flex: "1 1 200px",
                    background: "#fff",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    maxWidth: "250px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "200px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "15px",
                      border: "4px solid #3498db",
                    }}
                  />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#34495e", marginBottom: "10px" }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: "1.1rem", color: "#7f8c8d" }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#e74c3c" }}>Loading about content...</p>
      )}
    </div>
  );
};

export default About;