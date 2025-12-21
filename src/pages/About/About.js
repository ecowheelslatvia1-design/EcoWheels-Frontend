import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section 
        className="about-hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/c11pro-6-pc.png)`,
        }}
      >
        <div className="about-hero-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Your trusted partner in quality cycling experiences
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-container">
          <div className="about-section">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Founded with a passion for cycling, we've been dedicated to
              providing high-quality bicycles and exceptional service to riders
              of all levels. Our journey began with a simple belief: everyone
              deserves access to reliable, well-crafted bicycles that enhance
              their riding experience.
            </p>
            <p className="section-text">
              Over the years, we've built a reputation for excellence, offering
              a curated selection of bikes that combine performance, durability,
              and style. Whether you're a commuter, a mountain biker, or a road
              cycling enthusiast, we have the perfect ride for you.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              Our mission is to empower cyclists by providing top-quality
              bicycles, expert guidance, and outstanding customer service. We
              believe in the transformative power of cycling and are committed
              to helping you find the perfect bike for your needs.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Why Choose Us</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚴</div>
                <h3 className="feature-title">Quality Products</h3>
                <p className="feature-text">
                  We carefully select each bike in our collection, ensuring
                  quality and reliability.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3 className="feature-title">Expert Support</h3>
                <p className="feature-text">
                  Our team of cycling enthusiasts is here to help you find the
                  perfect bike.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Fast Delivery</h3>
                <p className="feature-text">
                  Quick and secure shipping to get your new bike to you as soon
                  as possible.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3 className="feature-title">Warranty</h3>
                <p className="feature-text">
                  All our bikes come with comprehensive warranty coverage for
                  your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;



