import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemCount = getCartItemCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navWrapperRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    opacity: 0,
    left: "0px",
    width: "0px",
  });

  // Initial indicator setup on mount
  useEffect(() => {
    const updateIndicator = () => {
      if (!navWrapperRef.current) return;

      const activeLink =
        navWrapperRef.current.querySelector(".nav-link.active");
      if (activeLink) {
        const wrapperRect = navWrapperRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: `${linkRect.left - wrapperRect.left}px`,
          width: `${linkRect.width}px`,
          opacity: 1,
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateIndicator);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Determine active link based on current pathname
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    // Special handling for products to avoid matching /products/:id when on /products
    if (path === "/products") {
      return (
        location.pathname === "/products" ||
        location.pathname.startsWith("/products/")
      );
    }
    return location.pathname.startsWith(path);
  };

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (!navWrapperRef.current) return;

      const activeLink =
        navWrapperRef.current.querySelector(".nav-link.active");
      if (activeLink) {
        const wrapperRect = navWrapperRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: `${linkRect.left - wrapperRect.left}px`,
          width: `${linkRect.width}px`,
          opacity: 1,
        });
      } else {
        // Hide indicator if no active link found
        setIndicatorStyle({
          opacity: 0,
          left: "0px",
          width: "0px",
        });
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        updateIndicator();
      });
    }, 0);

    // Update on window resize
    const handleResize = () => {
      requestAnimationFrame(updateIndicator);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && navWrapperRef.current) {
        if (!navWrapperRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      // Small delay to avoid immediate close
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img 
            src={`${process.env.PUBLIC_URL}/images/Gemini_Generated_Image_1r14g51r14g51r14.png`}
            alt="ECO WHEELS.LV"
            className="logo-image"
          />
        </Link>

        <div
          className={`nav-wrapper ${isMenuOpen ? "nav-open" : ""}`}
          ref={navWrapperRef}
        >
          <div className="nav-indicator" style={indicatorStyle}></div>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M6 15V10H10V15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About Us
          </Link>
          {/* <Link
            to="/reviews"
            className={`nav-link ${isActive("/reviews") ? "active" : ""}`}
          >
            Reviews
          </Link> */}
          <Link
            to="/products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
          >
            Products
          </Link>
          {/* <Link
            to="/blog"
            className={`nav-link ${isActive("/blog") ? "active" : ""}`}
          >
            Blog
          </Link> */}
        </div>

        <div className="header-actions">
          {/* {user ? (
            <Link to="/" className="sign-in-btn" onClick={handleLogout}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
              Sign out
            </Link>
          ) : (
            <Link to="/login" className="sign-in-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
              Sign in
            </Link>
          )} */}

          {/* <Link to="/cart" className="cart-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cart-icon"
            >
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="cart-badge">{cartItemCount || 0}</span>
          </Link> */}

          <div className="menu-toggle-wrapper" ref={navWrapperRef}>
            <button
              className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            {isMenuOpen && (
              <div className="mobile-nav-dropdown">
                <Link
                  to="/"
                  className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`mobile-nav-link ${
                    isActive("/about") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
                <Link
                  to="/reviews"
                  className={`mobile-nav-link ${
                    isActive("/reviews") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Reviews
                </Link>
                <Link
                  to="/products"
                  className={`mobile-nav-link ${
                    isActive("/products") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Products
                </Link>
                <Link
                  to="/blog"
                  className={`mobile-nav-link ${
                    isActive("/blog") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
