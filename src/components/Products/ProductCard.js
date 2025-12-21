import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [compareChecked, setCompareChecked] = useState(false);
  
  const hasDiscount = product.discountAmount && product.discountAmount > 0;
  const hasOriginalPrice = product.price?.original && product.price.original > product.price?.current;
  const discountAmount = hasDiscount 
    ? product.discountAmount 
    : hasOriginalPrice 
      ? product.price.original - product.price.current 
      : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(product.url || `/products/${product._id}`);
  };

  const handleCompareChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCompareChecked(e.target.checked);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card-new">
      <div className="product-image-container">
        {product.images && product.images.length > 0 && (
          <img src={product.images[0]} alt={product.name} className="product-image-new" />
        )}
        {discountAmount > 0 && (
          <div className="discount-badge">
            ${discountAmount} OFF
          </div>
        )}
      </div>
      
      <div className="product-info-new">
        <h3 className="product-name-new">{product.name}</h3>
        {product.tagline && (
          <p className="product-tagline">{product.tagline}</p>
        )}
        
        <div className="product-price-section">
          <span className="product-price-current">
            ${product.price?.current?.toFixed(2) || "0.00"}
          </span>
          {hasOriginalPrice && (
            <span className="product-price-original">
              ${product.price.original.toFixed(2)}
            </span>
          )}
        </div>

        {product.reviews && product.reviews.ratingCount > 0 && (
          <div className="product-rating-section">
            <div className="stars-container">
              {renderStars(product.reviews.ratingAverage || 0)}
            </div>
            <span className="reviews-count">({product.reviews.ratingCount} reviews)</span>
          </div>
        )}

        {product.features && product.features.length > 0 && (
          <ul className="product-features">
            {product.features.slice(0, 4).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="product-actions">
          <label className="compare-checkbox">
            <input
              type="checkbox"
              checked={compareChecked}
              onChange={handleCompareChange}
            />
            <span>Add to compare</span>
          </label>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

