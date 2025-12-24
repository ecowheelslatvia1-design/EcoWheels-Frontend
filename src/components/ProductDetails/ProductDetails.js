import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { productAPI } from "../../services/api";
import ProductCard from "../Products/ProductCard";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import { formatPrice, getCurrencySymbol } from "../../utils/currencyFormatter";
import "./ProductDetails.css";

const ProductDetails = ({ product, loading }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    specifications: false,
  });
  const thumbnailContainerRef = useRef(null);

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 100; // Scroll by 100px
      thumbnailContainerRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Move useEffect before any early returns
  useEffect(() => {
    if (!product || !product.category) return;

    const loadRelatedProducts = async () => {
      try {
        setLoadingRelated(true);
        const response = await productAPI.getProducts({
          category: product.category,
        });
        const allProducts = response.data.products || response.data || [];
        // Filter out current product and limit to 4
        const filtered = allProducts
          .filter((p) => p._id !== product._id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error loading related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    loadRelatedProducts();
  }, [product]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      setMessage({
        variant: "warning",
        text: "Please login to add items to cart",
      });
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setMessage({ variant: "success", text: "Product added to cart!" });
    } else {
      setMessage({
        variant: "error",
        text: result.message || "Failed to add to cart",
      });
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasSpecifications = () => {
    if (!product.specifications) return false;
    
    const hasDetails = product.specifications.details && (
      product.specifications.details.modelName ||
      product.specifications.details.modelNumber ||
      product.specifications.details.NetWeight ||
      product.specifications.details.Payload
    );
    
    const hasESystem = product.specifications["E-System"] && (
      product.specifications["E-System"].driveUnit ||
      product.specifications["E-System"].battery ||
      product.specifications["E-System"].charger ||
      product.specifications["E-System"].display ||
      product.specifications["E-System"].throttle
    );
    
    const hasFrameType = product.specifications.frameType;
    
    return hasDetails || hasESystem || hasFrameType;
  };

  const handleBuyNow = () => {
    const productName = encodeURIComponent(product.name);
    const productPrice = formatPrice(product.price?.current, product.price?.currency);
    const message = encodeURIComponent(
      `Hello! I'm interested in purchasing:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ${productPrice}\n\n` +
      `Please let me know how to proceed with the purchase.`
    );
    const whatsappUrl = `https://wa.me/37126308147?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const hasSale =
    product.price?.original && product.price.original > product.price?.current;
  
  const discountAmount = hasSale
    ? Math.round(product.price.original - product.price.current)
    : 0;

  return (
    <div className="product-details">
      {message && (
        <Message variant={message.variant} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      <nav className="breadcrumb-navigation">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/products" className="breadcrumb-link">Products</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-details-container">
        <div className="product-images">
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-container-wrapper">
              {product.images.length >= 4 && (
                <button
                  className="thumbnail-scroll-btn thumbnail-scroll-up"
                  onClick={() => scrollThumbnails('up')}
                  aria-label="Scroll thumbnails up"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <div 
                className="thumbnail-images-vertical"
                ref={thumbnailContainerRef}
              >
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
              {product.images.length >= 4 && (
                <button
                  className="thumbnail-scroll-btn thumbnail-scroll-down"
                  onClick={() => scrollThumbnails('down')}
                  aria-label="Scroll thumbnails down"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="main-image">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[selectedImage]} alt={product.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
        </div>

        <div className="product-info-details">
          <h1>{product.name}</h1>
          
          {product.reviews && product.reviews.ratingCount > 0 && (
            <div className="product-rating-section">
              <div className="rating-stars">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = product.reviews.ratingAverage || 0;
                  if (i < Math.floor(rating)) {
                    return <span key={i} className="star filled">★</span>;
                  } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                    return <span key={i} className="star half">★</span>;
                  } else {
                    return <span key={i} className="star empty">★</span>;
                  }
                })}
              </div>
              <span className="rating-text">
                {product.reviews.ratingCount} reviews
              </span>
            </div>
          )}

          {product.tagline && (
            <p className="product-tagline">{product.tagline}</p>
          )}

          {product.description && (
            <p className="product-description-text">{product.description}</p>
          )}

          <div className="product-price-wrapper-detail">
            <div className="price-section">
              {hasSale ? (
                <>
                  <span className="product-price-detail-sale">
                    {formatPrice(product.price.current, product.price?.currency)}
                  </span>
                  <span className="product-price-detail-original" style={{ textDecoration: 'line-through' }}>
                    {formatPrice(product.price.original, product.price?.currency)}
                  </span>
                  {discountAmount > 0 && (
                    <span className="savings-text">Save {getCurrencySymbol(product.price?.currency)}{discountAmount.toFixed(2)}</span>
                  )}
                </>
              ) : (
                <span className="product-price-detail">
                  {formatPrice(product.price?.current, product.price?.currency)}
                </span>
              )}
            </div>
          </div>

          {!product.inStock && (
            <div className="preorder-note">
              <strong>Note:</strong>
              <p>PREORDER: This item will be dispatched when available.</p>
              <a href="#" onClick={(e) => e.preventDefault()}>Notify me when in stock</a>
            </div>
          )}

          <div className="product-actions-buttons">
            {/* <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              ADD TO CART
            </button> */}
            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              BUY NOW
            </button>
          </div>

          <div className="expandable-sections">
            {product.features && product.features.length > 0 && (
              <div className="expandable-section">
                <button
                  className="expandable-header"
                  onClick={() => toggleSection("features")}
                >
                  <span>Features at a Glance</span>
                  <span className={`expand-icon ${expandedSections.features ? "expanded" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {expandedSections.features && (
                  <div className="expandable-content">
                    <ul className="features-list">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {hasSpecifications() && (
            <div className="expandable-section">
              <button
                className="expandable-header"
                onClick={() => toggleSection("specifications")}
              >
                <span>Specifications</span>
                <span className={`expand-icon ${expandedSections.specifications ? "expanded" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {expandedSections.specifications && (
                <div className="expandable-content">
                  <div className="specifications-detail">
                    {product.specifications && (
                      <>
                        {product.specifications.details && (
                          <div className="spec-group">
                            <h4>Details</h4>
                            {product.specifications.details.modelName && (
                              <div className="spec-item">
                                <strong>Model Name:</strong> {product.specifications.details.modelName}
                              </div>
                            )}
                            {product.specifications.details.modelNumber && (
                              <div className="spec-item">
                                <strong>Model Number:</strong> {product.specifications.details.modelNumber}
                              </div>
                            )}
                            {product.specifications.details.NetWeight && (
                              <div className="spec-item">
                                <strong>Net Weight:</strong> {product.specifications.details.NetWeight}
                              </div>
                            )}
                            {product.specifications.details.Payload && (
                              <div className="spec-item">
                                <strong>Payload:</strong> {product.specifications.details.Payload}
                              </div>
                            )}
                          </div>
                        )}
                        {product.specifications["E-System"] && (
                          <div className="spec-group">
                            <h4>E-System</h4>
                            {product.specifications["E-System"].driveUnit && (
                              <div className="spec-item">
                                <strong>Drive Unit:</strong> {product.specifications["E-System"].driveUnit}
                              </div>
                            )}
                            {product.specifications["E-System"].battery && (
                              <div className="spec-item">
                                <strong>Battery:</strong> {product.specifications["E-System"].battery}
                              </div>
                            )}
                            {product.specifications["E-System"].charger && (
                              <div className="spec-item">
                                <strong>Charger:</strong> {product.specifications["E-System"].charger}
                              </div>
                            )}
                            {product.specifications["E-System"].display && (
                              <div className="spec-item">
                                <strong>Display:</strong> {product.specifications["E-System"].display}
                              </div>
                            )}
                            {product.specifications["E-System"].throttle && (
                              <div className="spec-item">
                                <strong>Throttle:</strong> {product.specifications["E-System"].throttle}
                              </div>
                            )}
                          </div>
                        )}
                        {product.specifications.frameType && (
                          <div className="spec-group">
                            <h4>Frame Type</h4>
                            <div className="spec-item">
                              <strong>Frame Type:</strong> {product.specifications.frameType}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="related-products-container">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
