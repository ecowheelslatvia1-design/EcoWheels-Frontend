import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { formatPrice, getCurrencySymbol } from "../../utils/currencyFormatter";
import "./CartPage.css";

const CartPage = () => {
  const { user } = useAuth();
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal } =
    useCart();
  const [message, setMessage] = useState(null);

  if (!user) {
    return (
      <div className="cart-login-required">
        <p>Please login to view your cart</p>
        <Link to="/login" className="login-link">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart</p>
        <Link to="/" className="shop-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    const result = await updateCartItem(itemId, newQuantity);
    if (!result.success) {
      setMessage({ variant: "error", text: result.message });
    }
  };

  const handleRemoveItem = async (itemId) => {
    const result = await removeFromCart(itemId);
    if (!result.success) {
      setMessage({ variant: "error", text: result.message });
    }
  };

  const total = getCartTotal();
  // Get currency from first item, or default to USD
  const cartCurrency = cart.items.length > 0 
    ? cart.items[0].product.price?.currency 
    : "USD";

  return (
    <div className="cart-page">
      {message && (
        <Message variant={message.variant} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <Link
                to={`/products/${item.product._id}`}
                className="cart-item-image"
              >
                {item.product.images && item.product.images.length > 0 ? (
                  <img src={item.product.images[0]} alt={item.product.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </Link>

              <div className="cart-item-info">
                <Link to={item.product.url || `/products/${item.product._id}`}>
                  <h3>{item.product.name}</h3>
                </Link>
                {item.product.description && (
                  <p className="cart-item-description">{item.product.description}</p>
                )}
                <p className="cart-item-price">
                  {formatPrice(item.product.price?.current, item.product.price?.currency)}
                </p>
              </div>

              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                {formatPrice(
                  (item.product.price?.current || 0) * item.quantity,
                  item.product.price?.currency
                )}
              </div>

              <button
                className="remove-item-btn"
                onClick={() => handleRemoveItem(item._id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(total, cartCurrency)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(total, cartCurrency)}</span>
          </div>
          <button className="checkout-btn" disabled>
            Proceed to Checkout (Coming Soon)
          </button>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
