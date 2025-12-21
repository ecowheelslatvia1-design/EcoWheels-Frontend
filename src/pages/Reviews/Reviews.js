import React from "react";
import "./Reviews.css";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love my Mountain Explorer Pro! It's been perfect for my weekend trail rides. The build quality is exceptional and the customer service was outstanding.",
      bike: "Mountain Explorer Pro",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "2024-01-10",
      comment:
        "The City Cruiser Elite is exactly what I needed for my daily commute. Comfortable, reliable, and stylish. Highly recommend!",
      bike: "City Cruiser Elite",
    },
    {
      id: 3,
      name: "Emma Williams",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Road Racer X1 exceeded all my expectations. Lightweight, fast, and handles beautifully. Best purchase I've made this year!",
      bike: "Road Racer X1",
    },
    {
      id: 4,
      name: "David Martinez",
      rating: 5,
      date: "2023-12-28",
      comment:
        "E-Bike Power Plus has transformed my cycling experience. The electric assistance makes long rides effortless. Great value for money!",
      bike: "E-Bike Power Plus",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      date: "2023-12-20",
      comment:
        "Hybrid Adventure is perfect for my needs - great for both city streets and light trails. Very versatile and well-built.",
      bike: "Hybrid Adventure",
    },
    {
      id: 6,
      name: "James Taylor",
      rating: 5,
      date: "2023-12-15",
      comment:
        "Speed Demon Pro is a beast! The aerodynamic design really makes a difference. Fast delivery and excellent packaging.",
      bike: "Speed Demon Pro",
    },
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="reviews-page">
      <section
        className="reviews-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(42, 42, 42, 0.3) 100%), url(${process.env.PUBLIC_URL}/images/new-contact-banner-pc.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="reviews-hero-content">
          <h1 className="reviews-title">Customer Reviews</h1>
          <p className="reviews-subtitle">
            See what our customers are saying about their cycling experience
          </p>
        </div>
      </section>

      <section className="reviews-content">
        <div className="reviews-container">
          <div className="reviews-stats">
            <div className="stat-card">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Would Recommend</div>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="reviewer-name">{review.name}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="review-bike">Bike: {review.bike}</div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;


