import React from "react";
import "./Blog.css";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Cycling Tips for Beginners",
      date: "2024-01-20",
      author: "John Smith",
      excerpt:
        "Starting your cycling journey? Here are 10 essential tips to help you get started on the right foot and make the most of your cycling experience.",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop",
      category: "Tips",
    },
    {
      id: 2,
      title: "Mountain Biking: A Complete Guide",
      date: "2024-01-15",
      author: "Sarah Johnson",
      excerpt:
        "Discover everything you need to know about mountain biking, from choosing the right bike to mastering challenging trails and staying safe on your adventures.",
      image:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
      category: "Guide",
    },
    {
      id: 3,
      title: "The Benefits of Electric Bikes",
      date: "2024-01-10",
      author: "Mike Chen",
      excerpt:
        "Electric bikes are revolutionizing urban transportation. Learn about the environmental and health benefits of e-bikes and why they're becoming so popular.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      category: "Technology",
    },
    {
      id: 4,
      title: "Cycling Safety: What You Need to Know",
      date: "2024-01-05",
      author: "Emma Williams",
      excerpt:
        "Safety should always be your top priority when cycling. This comprehensive guide covers essential safety tips, gear recommendations, and best practices.",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop",
      category: "Safety",
    },
    {
      id: 5,
      title: "Best Cycling Routes in the City",
      date: "2023-12-28",
      author: "David Martinez",
      excerpt:
        "Explore the most scenic and bike-friendly routes in urban areas. From waterfront paths to park trails, discover the best places to ride in your city.",
      image:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
      category: "Routes",
    },
    {
      id: 6,
      title: "Maintaining Your Bike: A Seasonal Guide",
      date: "2023-12-20",
      author: "Lisa Anderson",
      excerpt:
        "Keep your bike in top condition year-round with our seasonal maintenance guide. Learn when and how to service different components of your bicycle.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      category: "Maintenance",
    },
  ];

  return (
    <div className="blog-page">
      <section
        className="blog-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.4) 0%, rgba(42, 42, 42, 0.5) 100%), url(${process.env.PUBLIC_URL}/images/dream-bike-camping.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="blog-hero-content">
          <h1 className="blog-title">Our Blog</h1>
          <p className="blog-subtitle">
            Cycling tips, guides, and insights for riders of all levels
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="blog-container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-author">By {post.author}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <button className="blog-read-more">Read More</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;


