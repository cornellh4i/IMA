import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
// @ts-ignore - image modules declared in custom.d.ts
import hack4impactLogo from "../assets/hack4i.png";
// @ts-ignore - image modules declared in custom.d.ts
// Placeholder images - replace with actual slideshow images
import imaLandingPage from "../assets/ima_landingPage.png";

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder image data - replace with actual images
  const slides = [
    {
      id: 1,
      image: imaLandingPage,
    },
    {
      id: 2,
      image: imaLandingPage,
    },
    {
      id: 3,
      image: imaLandingPage,
    },
    {
      id: 4,
      image: imaLandingPage,
    },
    {
      id: 5,
      image: imaLandingPage,
    },
    {
      id: 6,
      image: imaLandingPage,
    },
    {
      id: 7,
      image: imaLandingPage,
    },
    {
        id: 8,
        image: imaLandingPage,
      },
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-left">
          <img src={hack4impactLogo} alt="IMA Logo" className="logo-icon" />
          <span className="logo-text">IMA</span>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About IMA</Link>
          <Link to="/test" className="nav-link">Member Directory</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        {/* Left Section */}
        <div className="landing-left">
          <h1 className="landing-title">Internal Member Archive</h1>
          <p className="landing-description">
            Connect current members of Hack4Impact to alumni, allowing people
            interested in the intersection of tech and social impact to form
            connections.
          </p>
          <div className="landing-buttons">
            <button className="btn-primary">Sign Up</button>
            <button className="btn-secondary">Login</button>
          </div>
        </div>

        {/* Right Section - Slideshow */}
        <div className="landing-right">
          <div className="slideshow-container">
            {/* Main Image */}
            <div className="slideshow-image">
              <img
                src={currentSlideData.image}
                alt={`Slide ${currentSlide + 1}`}
                className="slide-img"
              />
            </div>

            {/* Slideshow Indicators */}
            <div className="slideshow-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

