import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faVimeo,
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const Videography = () => {
  const [videographyData, setVideographyData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/videography/videography/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched videography data:", data); // Debugging
        setVideographyData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching videography data:", error); // Log the error
        setError(error.message); // Set error message
      });
  }, []);

  // Function to check if a URL is from YouTube or Vimeo
  const isEmbeddable = (url) => {
    return url.includes("youtube.com") || url.includes("vimeo.com");
  };

  // Function to extract YouTube or Vimeo video ID
  const getVideoId = (url) => {
    if (url.includes("youtube.com")) {
      return url.split("v=")[1].split("&")[0];
    } else if (url.includes("vimeo.com")) {
      return url.split("/").pop();
    }
    return null;
  };

  // Function to get the platform icon based on the URL
  const getPlatformIcon = (url) => {
    if (url.includes("youtube.com")) {
      return <FontAwesomeIcon icon={faYoutube} size="3x" />;
    } else if (url.includes("vimeo.com")) {
      return <FontAwesomeIcon icon={faVimeo} size="3x" />;
    } else if (url.includes("facebook.com")) {
      return <FontAwesomeIcon icon={faFacebook} size="3x" />;
    } else if (url.includes("instagram.com")) {
      return <FontAwesomeIcon icon={faInstagram} size="3x" />;
    } else if (url.includes("tiktok.com")) {
      return <FontAwesomeIcon icon={faTiktok} size="3x" />;
    }
    return null;
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
        Videography
      </h1>
      {error && (
        <p style={{ color: "#e74c3c", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem" }}>
          Error: {error}
        </p>
      )}
      {videographyData.length > 0 ? (
        videographyData.map((item) => (
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
            {/* Title and Description */}
            <div style={{ marginBottom: "20px" }}>
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
                <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🎥</span> {item.title}
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
            </div>

            {/* Videos */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {item.videos.map((video, index) => (
                <div
                  key={index}
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
                  {video.video_file ? (
                    // Display video file
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "10px",
                      }}
                    >
                      <source src={video.video_file} type={`video/${video.video_file.split(".").pop()}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : video.video_url && isEmbeddable(video.video_url) ? (
                    // Display embedded YouTube or Vimeo video
                    <iframe
                      width="100%"
                      height="200px"
                      src={
                        video.video_url.includes("youtube.com")
                          ? `https://www.youtube.com/embed/${getVideoId(video.video_url)}`
                          : `https://player.vimeo.com/video/${getVideoId(video.video_url)}`
                      }
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        borderRadius: "10px",
                      }}
                    ></iframe>
                  ) : video.video_url ? (
                    // Fallback to a platform icon for non-embeddable platforms
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        textDecoration: "none",
                        borderRadius: "10px",
                      }}
                    >
                      {getPlatformIcon(video.video_url)}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#e74c3c" }}>
          Loading videography content...
        </p>
      )}
    </div>
  );
};

export default Videography;