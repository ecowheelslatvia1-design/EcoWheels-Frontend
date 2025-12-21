import React, { useState } from "react";
import { adminAPI } from "../../services/api";
import "./AddProduct.css";

const AddProduct = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Electric Bike",
    price: {
      current: "",
      original: "",
      currency: "USD",
    },
    specifications: {
      motorPower: "",
      batteryCapacity: "",
      rangeKm: "",
      weightKg: "",
      maxSpeedKmh: "",
      brakes: "",
      foldable: false,
    },
    features: [],
    inStock: true,
    variants: [],
    reviews: {
      ratingAverage: 0,
      ratingCount: 0,
    },
    url: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [variantInput, setVariantInput] = useState({ name: "", price: "" });

  const categories = [
    "Mountain Bike",
    "Road Bike",
    "Hybrid Bike",
    "Electric Bike",
    "Kids Bike",
    "Accessories",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1];
      setFormData({
        ...formData,
        price: {
          ...formData.price,
          [priceField]: value,
        },
      });
    } else if (name.startsWith("specifications.")) {
      const specName = name.split(".")[1];
      const specValue = specName === "foldable" ? checked : value;
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specName]: specValue,
        },
      });
    } else if (name.startsWith("reviews.")) {
      const reviewField = name.split(".")[1];
      setFormData({
        ...formData,
        reviews: {
          ...formData.reviews,
          [reviewField]: value,
        },
      });
    } else if (name === "inStock") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleAddVariant = () => {
    if (variantInput.name.trim() && variantInput.price) {
      setFormData({
        ...formData,
        variants: [
          ...formData.variants,
          {
            variantId: Date.now().toString(),
            name: variantInput.name.trim(),
            price: parseFloat(variantInput.price),
          },
        ],
      });
      setVariantInput({ name: "", price: "" });
    }
  };

  const handleRemoveVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Please select only image files (JPEG, PNG, WebP)");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((base64Images) => {
      setFormData({
        ...formData,
        images: [...formData.images, ...base64Images],
      });
    });
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: {
          current: parseFloat(formData.price.current) || 0,
          original: formData.price.original
            ? parseFloat(formData.price.original)
            : undefined,
          currency: formData.price.currency,
        },
        specifications: {
          motorPower: formData.specifications.motorPower || undefined,
          batteryCapacity: formData.specifications.batteryCapacity || undefined,
          rangeKm: formData.specifications.rangeKm
            ? parseFloat(formData.specifications.rangeKm)
            : undefined,
          weightKg: formData.specifications.weightKg
            ? parseFloat(formData.specifications.weightKg)
            : undefined,
          maxSpeedKmh: formData.specifications.maxSpeedKmh
            ? parseFloat(formData.specifications.maxSpeedKmh)
            : undefined,
          brakes: formData.specifications.brakes || undefined,
          foldable: formData.specifications.foldable || false,
        },
        reviews: {
          ratingAverage: parseFloat(formData.reviews.ratingAverage) || 0,
          ratingCount: parseInt(formData.reviews.ratingCount) || 0,
        },
      };

      // Remove undefined values
      Object.keys(productData.specifications).forEach(
        (key) =>
          productData.specifications[key] === undefined && delete productData.specifications[key]
      );
      if (!productData.price.original) delete productData.price.original;

      await adminAPI.createProduct(productData);
      onSuccess();
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "Electric Bike",
        price: {
          current: "",
          original: "",
          currency: "USD",
        },
        specifications: {
          motorPower: "",
          batteryCapacity: "",
          rangeKm: "",
          weightKg: "",
          maxSpeedKmh: "",
          brakes: "",
          foldable: false,
        },
        features: [],
        inStock: true,
        variants: [],
        reviews: {
          ratingAverage: 0,
          ratingCount: 0,
        },
        url: "",
        images: [],
      });
      setImagePreviews([]);
      setFeatureInput("");
      setVariantInput({ name: "", price: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        {error && <div className="admin-error">{error}</div>}

        <div className="form-row">
          <div className="admin-form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="admin-form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter product description"
          />
        </div>

        <div className="form-row">
          <div className="admin-form-group">
            <label>Current Price *</label>
            <input
              type="number"
              name="price.current"
              value={formData.price.current}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="admin-form-group">
            <label>Original Price (Optional)</label>
            <input
              type="number"
              name="price.original"
              value={formData.price.original}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="admin-form-group">
            <label>Currency</label>
            <select
              name="price.currency"
              value={formData.price.currency}
              onChange={handleInputChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label>Product Images *</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
          {imagePreviews.length > 0 && (
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-item">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="specifications-section">
          <h3>Specifications (Optional)</h3>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Motor Power</label>
              <input
                type="text"
                name="specifications.motorPower"
                value={formData.specifications.motorPower}
                onChange={handleInputChange}
                placeholder="e.g., 750W High-Torque"
              />
            </div>
            <div className="admin-form-group">
              <label>Battery Capacity</label>
              <input
                type="text"
                name="specifications.batteryCapacity"
                value={formData.specifications.batteryCapacity}
                onChange={handleInputChange}
                placeholder="e.g., 48V 696Wh"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Range (km)</label>
              <input
                type="number"
                name="specifications.rangeKm"
                value={formData.specifications.rangeKm}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="400"
              />
            </div>
            <div className="admin-form-group">
              <label>Max Speed (km/h)</label>
              <input
                type="number"
                name="specifications.maxSpeedKmh"
                value={formData.specifications.maxSpeedKmh}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="45"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Brakes</label>
              <input
                type="text"
                name="specifications.brakes"
                value={formData.specifications.brakes}
                onChange={handleInputChange}
                placeholder="e.g., 4-Piston Hydraulic Disc"
              />
            </div>
            <div className="admin-form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="specifications.weightKg"
                value={formData.specifications.weightKg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="37.9"
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="specifications.foldable"
                checked={formData.specifications.foldable}
                onChange={handleInputChange}
              />
              Foldable
            </label>
          </div>
        </div>

        <div className="features-section">
          <h3>Features</h3>
          <div className="admin-form-group">
            <div className="input-with-button">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add a feature (e.g., Torque Sensor)"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="add-item-btn"
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="items-list">
                {formData.features.map((feature, index) => (
                  <span key={index} className="item-tag">
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="remove-item-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="variants-section">
          <h3>Variants (Optional)</h3>
          <div className="admin-form-group">
            <div className="input-with-button">
              <input
                type="text"
                value={variantInput.name}
                onChange={(e) => setVariantInput({ ...variantInput, name: e.target.value })}
                placeholder="Variant name (e.g., Red, Large)"
                style={{ flex: 1 }}
              />
              <input
                type="number"
                value={variantInput.price}
                onChange={(e) => setVariantInput({ ...variantInput, price: e.target.value })}
                placeholder="Price"
                min="0"
                step="0.01"
                style={{ width: "120px" }}
              />
              <button
                type="button"
                onClick={handleAddVariant}
                className="add-item-btn"
              >
                Add
              </button>
            </div>
            {formData.variants.length > 0 && (
              <div className="items-list">
                {formData.variants.map((variant, index) => (
                  <span key={index} className="item-tag">
                    {variant.name} - ${variant.price.toFixed(2)}
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="remove-item-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="admin-form-group">
            <label>Product URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="/products/product-id"
            />
          </div>
          <div className="admin-form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
              In Stock
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="admin-form-group">
            <label>Rating Average</label>
            <input
              type="number"
              name="reviews.ratingAverage"
              value={formData.reviews.ratingAverage}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              placeholder="0.0"
            />
          </div>
          <div className="admin-form-group">
            <label>Rating Count</label>
            <input
              type="number"
              name="reviews.ratingCount"
              value={formData.reviews.ratingCount}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="admin-btn-primary">
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
