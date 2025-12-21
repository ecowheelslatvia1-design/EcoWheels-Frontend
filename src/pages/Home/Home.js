import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dreamBikeRef = useRef(null);
  const ultimateWheelsRef = useRef(null);
  const pushLimitRef = useRef(null);
  const findRideRef = useRef(null);


  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = [
      dreamBikeRef.current,
      ultimateWheelsRef.current,
      pushLimitRef.current,
      findRideRef.current,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/DSC01842.jpg`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="hero-decorative-crosses"></div>
        </div>
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="hero-title-white">ECO</span>
              <span className="hero-title-orange">Wheels.LV</span>
            </h1>
            <p className="hero-description">
              Experience the perfect blend of speed, durability, and precision
              engineering — a bike built to push your limits.
            </p>
            <button
              className="hero-cta-btn"
              onClick={() => navigate("/products")}
            >
              SEE ALL BIKES
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4L13 10L7 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Your Dream Bike Section */}
      <section
        className="dream-bike-section"
        ref={dreamBikeRef}
      >
        <div className="dream-bike-background">
          <img
            src="/images/c11pro-6-pc.png"
            alt="Cyclists enjoying camping adventure with bicycles"
          />
        </div>
        <div className="dream-bike-content">
          <div className="dream-bike-tags">
            <span>VERY FAST</span>
            <span>SOFT TO USE</span>
            <span>MODERN DESIGN</span>
          </div>
          <h2 className="dream-bike-title">YOUR DREAM BIKE</h2>
          <p className="dream-bike-description">
            Engineered with precision and built for endurance, your dream bike
            is where design meets power for the ultimate cycling experience.
          </p>
          <div className="dream-bike-overlays">
            <div className="overlay-left">
              Discover True Freedom On Your Dream Bike
            </div>
            <div className="overlay-right">
              Unleash the perfect balance of speed, style, and endurance — a
              bike engineered to transform every ride into a powerful
              experience.
            </div>
          </div>
        </div>
      </section>

      {/* Pick Your Ride Triptych Section */}
      <section className="pick-ride-section">
        <div className="pick-ride-triptych">
          <div 
            className="pick-ride-panel"
            onClick={() => navigate("/products")}
          >
            <div className="panel-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/a-variety-of-accessories-pc.webp`} 
                alt="A Variety of Accessories" 
              />
            </div>
            <div className="panel-overlay">
              <h3 className="panel-title">A Variety of Accessories</h3>
              <div className="panel-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div 
            className="pick-ride-panel"
            onClick={() => navigate("/products")}
          >
            <div className="panel-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/2-year-warranty-pc.webp`} 
                alt="2-Year Warranty & Lifelong Support" 
              />
            </div>
            <div className="panel-overlay">
              <h3 className="panel-title">2-Year Warranty & Lifelong Support</h3>
              <div className="panel-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div 
            className="pick-ride-panel"
            onClick={() => navigate("/products")}
          >
            <div className="panel-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/certified-_-awarded-pc.webp`} 
                alt="Certified & Awarded" 
              />
            </div>
            <div className="panel-overlay">
              <h3 className="panel-title">Certified & Awarded</h3>
              <div className="panel-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Wheels Section */}
      <section
        className="ultimate-wheels-section fade-in-section"
        ref={ultimateWheelsRef}
      >
        <div className="ultimate-wheels-background">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop"
            alt="Carbon fiber wheels"
          />
        </div>
        <div className="ultimate-wheels-content">
          <div className="ultimate-wheels-hashtags">
            <span>#TWOWHEELSFREEDOM</span>
            <span>#RIDEBEYONDLIMITS</span>
            <span>#ENDURANCEONWHEELS</span>
            <span>#ULTIMATEWHEELS</span>
          </div>
          <div className="ultimate-wheels-tags">
            <span>VERY FAST</span>
            <span>SOFT TO USE</span>
            <span>MODERN DESIGN</span>
          </div>
          <h2 className="ultimate-wheels-title">
            <span className="title-white">ECO</span>
            <span className="title-orange">WHEELS.LV</span>
          </h2>
          <p className="ultimate-wheels-description">
            From urban streets to mountain trails, experience a bike that offers
            unmatched freedom, control, and lasting comfort.
          </p>
          <button
            className="ultimate-wheels-cta"
            onClick={() => navigate("/products")}
          >
            See all Bikes →
          </button>
        </div>
      </section>

      {/* Push Beyond Every Limit Section */}
      <section
        className="push-limit-section fade-in-section"
        ref={pushLimitRef}
      >
        <div className="push-limit-background">
          <img
            src={`${process.env.PUBLIC_URL}/images/速度与激情（视频截图）.jpg`}
            alt="Riding perspective"
          />
        </div>
        <div className="push-limit-content">
          <h2 className="push-limit-title">
            <span className="title-white">PUSH BEYOND</span>
            <span className="title-orange">EVERY LIMIT</span>
          </h2>
          <p className="push-limit-description">
            Experience the perfect blend of speed, endurance, and freedom with
            bikes engineered for every journey.
          </p>
          <button
            className="push-limit-cta"
            onClick={() => navigate("/products")}
          >
            DISCOVER MODELS
          </button>
        </div>
      </section>

      {/* Find Your Perfect Ride Section */}
      <section className="find-ride-section fade-in-section" ref={findRideRef}>
        <div className="find-ride-container">
          <div className="find-ride-left">
            <div className="find-ride-image">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
                alt="Road bike in nature"
              />
            </div>
            <h3 className="find-ride-title">FIND YOUR PERFECT RIDE</h3>
            <p className="find-ride-subtitle">
              Choose the bike that matches your journey.
            </p>
            <button
              className="find-ride-cta"
              onClick={() => navigate("/products")}
            >
              SEE ALL MODELS
            </button>
          </div>
          <div className="find-ride-right">
            <div className="find-ride-image">
              <img
                src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop"
                alt="Bike frame detail"
              />
            </div>
            <h3 className="find-ride-title">CHOOSE YOUR DREAM RIDE</h3>
            <p className="find-ride-description">
              Whether you seek endurance, style, or adventure, our bikes deliver
              unmatched performance and innovation to take you further.
            </p>
            <div className="bike-categories">
              <button className="category-btn">Mountain Bikes</button>
              <button className="category-btn">City Bikes</button>
              <button className="category-btn">E-Bikes</button>
              <button className="category-btn">Road Bikes</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
