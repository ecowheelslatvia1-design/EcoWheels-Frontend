import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { productAPI } from "../../services/api";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import "./ProductDetails.css";

const ProductDetails = ({ product, loading }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

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

  const hasSale =
    product.price?.original && product.price.original > product.price?.current;

  return (
    <div className="product-details">
      {message && (
        <Message variant={message.variant} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[selectedImage]} alt={product.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-images">
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
          )}
        </div>

        <div className="product-info-details">
          <h1>{product.name}</h1>
          {product.description && (
            <p className="product-description-text">{product.description}</p>
          )}

          {product.reviews && product.reviews.ratingCount > 0 && (
            <div className="product-rating-section">
              <div className="rating-stars">
                {"⭐".repeat(Math.round(product.reviews.ratingAverage))}
              </div>
              <span className="rating-text">
                {product.reviews.ratingAverage.toFixed(1)} ({product.reviews.ratingCount} reviews)
              </span>
            </div>
          )}

          <div className="product-info-label">
            <h5>Specifications:</h5>
          </div>

          <div className="product-specs-grid">
            {product.specifications?.motorPower && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.motorPower}</h3>
                <div className="spec-label">MOTOR POWER</div>
              </div>
            )}
            {product.specifications?.batteryCapacity && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.batteryCapacity}</h3>
                <div className="spec-label">BATTERY CAPACITY</div>
              </div>
            )}
            {product.specifications?.rangeKm && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.rangeKm} km</h3>
                <div className="spec-label">RANGE</div>
              </div>
            )}
            {product.specifications?.maxSpeedKmh && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.maxSpeedKmh} km/h</h3>
                <div className="spec-label">MAX SPEED</div>
              </div>
            )}
            {product.specifications?.brakes && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.brakes}</h3>
                <div className="spec-label">BRAKES</div>
              </div>
            )}
            {product.specifications?.weightKg && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.weightKg} kg</h3>
                <div className="spec-label">WEIGHT</div>
              </div>
            )}
            {product.specifications?.foldable !== undefined && (
              <div className="spec-box">
                <h3 className="spec-value">{product.specifications.foldable ? "Yes" : "No"}</h3>
                <div className="spec-label">FOLDABLE</div>
              </div>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="product-features-section">
              <h5 className="features-label">Features:</h5>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="product-features-section">
              <h5 className="features-label">Features:</h5>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-price-wrapper-detail">
            {hasSale ? (
              <>
                <span className="product-price-detail-sale">
                  ${product.price.current.toFixed(2)}
                </span>
                <span className="product-price-detail-original">
                  ${product.price.original.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="product-price-detail">
                ${product.price?.current?.toFixed(2) || "0.00"}
              </span>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="product-variants-section">
              <h5 className="variants-label">Variants:</h5>
              <div className="variants-list">
                {product.variants.map((variant, index) => (
                  <div key={index} className="variant-item">
                    <span>{variant.name}</span>
                    <span>${variant.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to cart" : "Out of Stock"}
          </button>

          <div className="share-section">
            <h6 className="share-label">Share:</h6>
            <div className="share-buttons">
              <a
                href="#"
                className="share-btn"
                onClick={(e) => e.preventDefault()}
              >
                Facebook
              </a>
              <a
                href="#"
                className="share-btn"
                onClick={(e) => e.preventDefault()}
              >
                Twitter
              </a>
              <a
                href="#"
                className="share-btn"
                onClick={(e) => e.preventDefault()}
              >
                Youtube
              </a>
            </div>
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
