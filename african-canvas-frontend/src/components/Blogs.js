import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blogData, setBlogData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({}); // Track expanded posts

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blogs/blogs/") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched blog data:", data); // Debugging
        setBlogData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error); // Log the error
        setError(error.message); // Set error message
      });
  }, []);

  // Toggle "Read More" for a post
  const toggleReadMore = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
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
        Blog
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}

      {blogData.length > 0 ? (
        blogData.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "40px",
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* Featured Image */}
            <img
              src={post.image_url}
              alt={post.title}
              style={{
                width: "40%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Text Content */}
            <div style={{ flex: 1 }}>
              {/* Title */}
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: "#34495e",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>📝</span> {post.title}
              </h2>

              {/* Published Date */}
              <p style={{ fontSize: "1rem", color: "#7f8c8d", marginBottom: "20px" }}>
                Published on {new Date(post.created_at).toLocaleDateString()}
              </p>

              {/* Content */}
              <div style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#7f8c8d" }}>
                {post.content.split("\r\n").map((paragraph, index) => (
                  <p
                    key={index}
                    style={{
                      marginBottom: "20px",
                      display: expandedPosts[post.id] || index < 2 ? "block" : "none", // Show only first 2 paragraphs by default
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Read More Button */}
              {post.content.split("\r\n").length > 2 && (
                <button
                  onClick={() => toggleReadMore(post.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#3498db",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  {expandedPosts[post.id] ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#e74c3c" }}>Loading blog posts...</p>
      )}
    </div>
  );
};

export default Blog;