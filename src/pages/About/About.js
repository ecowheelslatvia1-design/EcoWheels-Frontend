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
            Eco Wheels.lv is a modern e-mobility company in Latvia, specializing in the import, distribution, and sale of high-quality electric bicycles and e-bikes. We are proud to be importers and official partners of the Fiido Group, a globally recognised brand known for its innovative, reliable, and stylish electric mobility products.
At Eco Wheels.lv, we aim to make everyday transportation greener, smarter, and more efficient. Our focus is to offer customers the latest Fiido electric bicycle models along with professional service, expert product guidance, and reliable after-sales support.
What we offer:
Official Fiido e-bike models imported directly from the manufacturer
A complete selection of urban, folding, cargo, and performance e-bikes
Maintenance, repair, spare parts, and warranty support
Test rides, product demonstrations, and personalised consultations
Sustainable mobility solutions for individuals and businesses
Our mission is to help Latvia transition to cleaner and more convenient transportation options, reducing fuel costs and supporting a healthier environment.
Eco Wheels.lv – Official Importers of Fiido | Ride Smart. Ride Green. About Us – Eco Wheels Latvia
Eco Wheels Latvia is an emerging e-bicycle dealership based in Jelgava, dedicated to bringing modern, eco-friendly mobility solutions to the Latvian market. We believe in a cleaner future where daily travel is affordable, efficient, and environmentally responsible.
As authorized dealers, we provide quality electric bicycles, reliable customer support, and a smooth buying experience. Our goal is to help customers choose the right e-bike for their needs—whether for commuting, leisure, or delivery services.
We are committed to honesty, transparency, and long-term customer satisfaction. Whether you are buying your first e-bike or expanding your fleet, Eco Wheels Latvia is here to support you every step.
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



