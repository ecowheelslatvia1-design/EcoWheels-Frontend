import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import "./ProductList.css";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
