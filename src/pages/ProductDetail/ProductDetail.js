import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../services/api";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import Loading from "../../components/Loading/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-detail-page">
      <ProductDetails product={product} loading={loading} />
    </div>
  );
};

export default ProductDetail;
