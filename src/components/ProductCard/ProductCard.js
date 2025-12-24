import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/currencyFormatter";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const hasSale = product.price?.original && product.price.original > product.price?.current;
  const discountPercent = hasSale
    ? Math.round(((product.price.original - product.price.current) / product.price.original) * 100)
    : 0;

  return (
    <Link to={product.url || `/products/${product._id}`} className="product-card">
      <div className="product-image-wrapper">
        <div className="product-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>
        {hasSale && <span className="sale-badge">Sale!</span>}
        {!product.inStock && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
        <div className="product-overlay">
          <span className="quick-view">Quick View</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.tagline && (
          <p className="product-description">{product.tagline}</p>
        )}
        {product.reviews && product.reviews.ratingCount > 0 && (
          <div className="product-rating">
            ⭐ {product.reviews.ratingAverage.toFixed(1)} ({product.reviews.ratingCount})
          </div>
        )}
        <div className="product-price-wrapper">
          {hasSale ? (
            <>
              <span className="product-price-sale">
                {formatPrice(product.price.current, product.price?.currency)}
              </span>
              <span className="product-price-original">
                {formatPrice(product.price.original, product.price?.currency)}
              </span>
            </>
          ) : (
            <span className="product-price">
              {formatPrice(product.price?.current, product.price?.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
