import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [data, setData] = useState({
    slidingImages: [],
    companyProfile: [],
    offers: [],
    clients: [],
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all endpoints
        const [
          slidingImagesResponse,
          companyProfileResponse,
          offersResponse,
          clientsResponse,
          testimonialsResponse,
        ] = await Promise.all([
          fetch("http://127.0.0.1:8000/sliding-images/?format=json"),
          fetch("http://127.0.0.1:8000/company-profile/?format=json"),
          fetch("http://127.0.0.1:8000/offers/?format=json"),
          fetch("http://127.0.0.1:8000/clients/?format=json"),
          fetch("http://127.0.0.1:8000/api/testimonials/testimonials/?format=json"),
        ]);

        // Check if all responses are OK
        if (
          !slidingImagesResponse.ok ||
          !companyProfileResponse.ok ||
          !offersResponse.ok ||
          !clientsResponse.ok ||
          !testimonialsResponse.ok
        ) {
          throw new Error("Failed to fetch data from one or more endpoints.");
        }

        // Parse JSON data
        const slidingImages = await slidingImagesResponse.json();
        const companyProfile = await companyProfileResponse.json();
        const offers = await offersResponse.json();
        const clients = await clientsResponse.json();
        const testimonials = await testimonialsResponse.json();

        // Update state with fetched data
        setData({
          slidingImages,
          companyProfile,
          offers,
          clients,
          testimonials,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Settings for the Slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true, // Adjust height based on the image
  };

  // Function to scroll back to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "var(--text-color)" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "var(--error-color)" }}>{error}</p>;
  }

  // Texts to overlay on the sliding images
  const slideTexts = [
    "FOLLOW US IN OUR SOCIAL MEDIA PLATFORMS",
  ];

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
      {/* Sliding Images (Carousel) */}
      <section style={{ marginBottom: "40px", position: "relative" }}>
        <Slider {...sliderSettings}>
          {data.slidingImages.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={image.image}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "90vh", objectFit: "cover" }} // Removed borderRadius
              />
              {slideTexts[index] && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "3rem",
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {slideTexts[index]}
                </div>
              )}
            </div>
          ))}
        </Slider>
      </section>

      {/* Company Profile (No Title) */}
      <section style={{ marginBottom: "40px" }}>
        {data.companyProfile.map((profile, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#34495e", marginBottom: "10px" }}>
              {profile.title}
            </h3>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#7f8c8d" }}>{profile.description}</p>
          </div>
        ))}
      </section>

      {/* What We Offer */}
      <section style={{ marginBottom: "40px" }}>
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
          <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🎁</span> What We Offer
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {data.offers.map((offer, index) => (
            <a
              key={index}
              href={offer.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "#fff",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#34495e", marginBottom: "10px" }}>
                {offer.title}
              </h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#7f8c8d" }}>{offer.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Our Clients */}
      <section style={{ marginBottom: "40px" }}>
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
          <span style={{ color: "#3498db", fontSize: "2.5rem" }}>🤝</span> Our Clients
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {data.clients.map((client, index) => (
            <a
              key={index}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                src={client.logo}
                alt={`Client ${index + 1}`}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ marginBottom: "40px" }}>
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
          <span style={{ color: "#3498db", fontSize: "2.5rem" }}>💬</span> Testimonials
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {data.testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#7f8c8d", marginBottom: "10px" }}>
                "{testimonial.testimony}"
              </p>
              <p style={{ fontSize: "1rem", color: "#7f8c8d", fontStyle: "italic" }}>
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
      >
        Back to Top
      </button>
    </div>
  );
};

export default Home;