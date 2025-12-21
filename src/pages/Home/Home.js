import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { productAPI } from "../../services/api";
import ProductList from "../../components/ProductList/ProductList";
import Loading from "../../components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dreamBikeRef = useRef(null);
  const ultimateWheelsRef = useRef(null);
  const pushLimitRef = useRef(null);
  const findRideRef = useRef(null);

  // Products page state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const isProductsPage = location.pathname === "/products";

  // Load products from backend API when on products page
  useEffect(() => {
    if (isProductsPage) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsPage, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      // Build query parameters
      const params = {};
      if (selectedCategory) {
        params.category = selectedCategory;
      }

      // Fetch products from backend API
      const response = await productAPI.getProducts(params);
      const productsData = response.data.products || response.data || [];

      // Products from backend are already in the correct schema format
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Hardcoded products for carousel (home page only)
  const carouselProducts = [
    {
      id: 1,
      name: "Mountain Explorer Pro",
      price: "$1,299",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop",
      description: "Built for rugged trails and mountain adventures",
    },
    {
      id: 2,
      name: "City Cruiser Elite",
      price: "$899",
      image:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
      description: "Perfect for urban commuting and daily rides",
    },
    {
      id: 3,
      name: "Road Racer X1",
      price: "$1,599",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      description: "Lightweight carbon frame for speed enthusiasts",
    },
    {
      id: 4,
      name: "E-Bike Power Plus",
      price: "$2,199",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop",
      description: "Electric assistance for effortless long rides",
    },
    {
      id: 5,
      name: "Hybrid Adventure",
      price: "$1,099",
      image:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
      description: "Versatile design for city and trail adventures",
    },
    {
      id: 6,
      name: "Speed Demon Pro",
      price: "$1,799",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      description: "Aerodynamic design for maximum speed",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Auto-advance carousel every 3 seconds (home page only)
  useEffect(() => {
    if (!isProductsPage) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === carouselProducts.length - 1 ? 0 : prev + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isProductsPage]);

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

  // Show products page if on /products route
  if (isProductsPage) {
    const categories = [
      "All",
      "Mountain Bike",
      "Road Bike",
      "Hybrid Bike",
      "Electric Bike",
      "Kids Bike",
      "Accessories",
    ];

    return (
      <div className="products-page">
        <div className="products-page-header">
          <h1>All Products</h1>
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter-btn ${
                  selectedCategory === category ||
                  (category === "All" && !selectedCategory)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category === "All" ? "" : category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <ProductList products={products} loading={loadingProducts} />
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-decorative-crosses"></div>
        </div>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-label">Quality bicycle</div>
            <h1 className="hero-title">
              <span className="hero-title-white">POWER</span>
              <span className="hero-title-orange">CYCLE</span>
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
        className="dream-bike-section fade-in-section"
        ref={dreamBikeRef}
      >
        <div className="dream-bike-background">
          <img
            src="/images/dream-bike-camping.png"
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

      {/* Pick Your Ride Carousel Section */}
      <section className="pick-ride-section">
        <div className="pick-ride-container">
          <h2 className="pick-ride-heading">Pick your ride</h2>
          <div className="carousel-wrapper">
            <div className="carousel" ref={carouselRef}>
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {carouselProducts.map((product) => (
                  <div key={product.id} className="carousel-slide">
                    <div className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="product-footer">
                          <span className="product-price">{product.price}</span>
                          <button
                            className="product-btn"
                            onClick={() => navigate("/products")}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            {carouselProducts.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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
            <span className="title-white">ULTIMATE</span>
            <span className="title-orange">WHEELS</span>
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
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&auto=format&fit=crop"
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
