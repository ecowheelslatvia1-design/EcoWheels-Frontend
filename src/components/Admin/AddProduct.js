import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import "./AddProduct.css";

const AddProduct = ({ product, onSuccess, onCancel }) => {
  const isEditing = !!product;

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
    quantity: 0,
    isListed: true,
    variants: [],
    reviews: {
      ratingAverage: 0,
      ratingCount: 0,
    },
    url: "",
  });

  const [imageFiles, setImageFiles] = useState([]); // Store File objects
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // For editing
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [variantInput, setVariantInput] = useState({ name: "", price: "" });

  // Populate form when editing, reset when creating
  useEffect(() => {
    if (product && product._id) {
      // Editing mode - populate form with product data
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "Electric Bike",
        price: {
          current: product.price?.current !== undefined && product.price?.current !== null 
            ? String(product.price.current) 
            : "",
          original: product.price?.original !== undefined && product.price?.original !== null 
            ? String(product.price.original) 
            : "",
          currency: product.price?.currency || "USD",
        },
        specifications: {
          motorPower: product.specifications?.motorPower || "",
          batteryCapacity: product.specifications?.batteryCapacity || "",
          rangeKm: product.specifications?.rangeKm !== undefined && product.specifications?.rangeKm !== null
            ? String(product.specifications.rangeKm)
            : "",
          weightKg: product.specifications?.weightKg !== undefined && product.specifications?.weightKg !== null
            ? String(product.specifications.weightKg)
            : "",
          maxSpeedKmh: product.specifications?.maxSpeedKmh !== undefined && product.specifications?.maxSpeedKmh !== null
            ? String(product.specifications.maxSpeedKmh)
            : "",
          brakes: product.specifications?.brakes || "",
          foldable: product.specifications?.foldable || false,
        },
        features: Array.isArray(product.features) ? [...product.features] : [],
        inStock: product.inStock !== undefined ? product.inStock : true,
        quantity: product.quantity !== undefined && product.quantity !== null ? product.quantity : 0,
        isListed: product.isListed !== undefined ? product.isListed : true,
        variants: Array.isArray(product.variants) ? [...product.variants] : [],
        reviews: {
          ratingAverage: product.reviews?.ratingAverage !== undefined && product.reviews?.ratingAverage !== null
            ? product.reviews.ratingAverage
            : 0,
          ratingCount: product.reviews?.ratingCount !== undefined && product.reviews?.ratingCount !== null
            ? product.reviews.ratingCount
            : 0,
        },
        url: product.url || "",
      });
      
      // Set images
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        setExistingImages([...product.images]);
        setImagePreviews([...product.images]);
      } else {
        setExistingImages([]);
        setImagePreviews([]);
      }
      setImageFiles([]);
      setError("");
    } else {
      // Create mode - reset form to defaults
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
        quantity: 0,
        isListed: true,
        variants: [],
        reviews: {
          ratingAverage: 0,
          ratingCount: 0,
        },
        url: "",
      });
      setExistingImages([]);
      setImagePreviews([]);
      setImageFiles([]);
      setError("");
    }
  }, [product]);

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
      // For price fields, allow empty string (for user input) but validate on submit
      setFormData({
        ...formData,
        price: {
          ...formData.price,
          [priceField]: value, // Keep as string for input, will parse on submit
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
    } else if (name === "inStock" || name === "isListed") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "quantity") {
      const quantityValue = value === "" ? 0 : parseInt(value);
      setFormData({
        ...formData,
        [name]: isNaN(quantityValue) ? 0 : Math.max(0, quantityValue),
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

    // Create previews for display
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);

    // Store File objects for upload
    setImageFiles([...imageFiles, ...files]);
  };

  const removeImage = (index) => {
    const preview = imagePreviews[index];
    // Check if it's a blob URL (new image) or existing image URL
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    
    // Determine if this is an existing image or a new one
    const isExistingImage = index < existingImages.length;
    
    if (isExistingImage) {
      // Remove from existing images
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      // Remove from new image files (adjust index)
      const fileIndex = index - existingImages.length;
      setImageFiles(imageFiles.filter((_, i) => i !== fileIndex));
    }
    
    // Always update previews
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || formData.name.trim() === "") {
        setError("Product name is required");
        setLoading(false);
        return;
      }

      // Validate price - ensure it's a valid number
      const currentPriceStr = String(formData.price.current || "").trim();
      if (!currentPriceStr || currentPriceStr === "") {
        setError("Current price is required");
        setLoading(false);
        return;
      }

      const currentPrice = parseFloat(currentPriceStr);
      if (isNaN(currentPrice) || currentPrice < 0) {
        setError("Please enter a valid current price (must be 0 or greater)");
        setLoading(false);
        return;
      }

      // Validate images - at least one image is required (either existing or new)
      if (isEditing) {
        if (existingImages.length === 0 && imageFiles.length === 0) {
          setError("At least one product image is required");
          setLoading(false);
          return;
        }
      } else {
        if (imageFiles.length === 0) {
          setError("At least one product image is required");
          setLoading(false);
          return;
        }
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", (formData.description || "").trim());
      formDataToSend.append("category", formData.category);
      
      // Price handling - ALWAYS send current price as a number
      formDataToSend.append("price[current]", currentPrice);
      
      // Only send original price if it has a valid value
      const originalPriceStr = String(formData.price.original || "").trim();
      if (originalPriceStr && originalPriceStr !== "") {
        const originalPrice = parseFloat(originalPriceStr);
        if (!isNaN(originalPrice) && originalPrice > 0) {
          formDataToSend.append("price[original]", originalPrice);
        }
      }
      
      formDataToSend.append("price[currency]", formData.price.currency || "USD");

      // Add specifications - always send all fields
      formDataToSend.append("specifications[motorPower]", (formData.specifications.motorPower || "").trim());
      formDataToSend.append("specifications[batteryCapacity]", (formData.specifications.batteryCapacity || "").trim());
      formDataToSend.append("specifications[brakes]", (formData.specifications.brakes || "").trim());
      formDataToSend.append("specifications[foldable]", formData.specifications.foldable ? "true" : "false");
      
      // Numeric specification fields - send as numbers if valid, otherwise don't send
      const rangeKm = parseFloat(formData.specifications.rangeKm);
      if (!isNaN(rangeKm) && rangeKm >= 0) {
        formDataToSend.append("specifications[rangeKm]", rangeKm);
      }
      
      const weightKg = parseFloat(formData.specifications.weightKg);
      if (!isNaN(weightKg) && weightKg >= 0) {
        formDataToSend.append("specifications[weightKg]", weightKg);
      }
      
      const maxSpeedKmh = parseFloat(formData.specifications.maxSpeedKmh);
      if (!isNaN(maxSpeedKmh) && maxSpeedKmh >= 0) {
        formDataToSend.append("specifications[maxSpeedKmh]", maxSpeedKmh);
      }

      // Add features - always send array (even if empty) to allow clearing during updates
      if (formData.features && formData.features.length > 0) {
        formData.features.forEach((feature, index) => {
          if (feature && feature.trim() !== "") {
            formDataToSend.append(`features[${index}]`, feature.trim());
          }
        });
      }
      // If empty array, backend will handle it (no features sent = empty array)

      // Add variants - always send array (even if empty) to allow clearing during updates
      if (formData.variants && formData.variants.length > 0) {
        formData.variants.forEach((variant, index) => {
          if (variant && variant.variantId && variant.name && variant.price !== undefined) {
            formDataToSend.append(`variants[${index}][variantId]`, variant.variantId);
            formDataToSend.append(`variants[${index}][name]`, variant.name.trim());
            const variantPrice = typeof variant.price === 'number' ? variant.price : parseFloat(variant.price);
            if (!isNaN(variantPrice) && variantPrice >= 0) {
              formDataToSend.append(`variants[${index}][price]`, variantPrice);
            }
          }
        });
      }
      // If empty array, backend will handle it (no variants sent = empty array)

      // Add reviews - ensure valid numbers
      const ratingAverage = parseFloat(formData.reviews.ratingAverage) || 0;
      const ratingCount = parseInt(formData.reviews.ratingCount) || 0;
      formDataToSend.append("reviews[ratingAverage]", Math.max(0, Math.min(5, ratingAverage))); // Clamp between 0-5
      formDataToSend.append("reviews[ratingCount]", Math.max(0, ratingCount));

      // Stock and listing status
      formDataToSend.append("inStock", formData.inStock ? "true" : "false");
      const quantity = parseInt(formData.quantity) || 0;
      formDataToSend.append("quantity", Math.max(0, quantity));
      formDataToSend.append("isListed", formData.isListed ? "true" : "false");
      
      // URL - always send (even if empty) to allow clearing during updates
      formDataToSend.append("url", (formData.url || "").trim());

      // Add image files (only new files, existing images are kept on backend)
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // If editing, include existing images that weren't removed
      if (isEditing) {
        if (existingImages.length > 0) {
          existingImages.forEach((imgUrl) => {
            if (imgUrl && imgUrl.trim() !== "") {
              formDataToSend.append("existingImages[]", imgUrl);
            }
          });
        }
        // Note: If all images were removed and no new images added, 
        // backend will handle it based on existingImages array being empty
      }

      if (isEditing) {
        await adminAPI.updateProduct(product._id, formDataToSend);
      } else {
        await adminAPI.createProduct(formDataToSend);
      }
      
      onSuccess();
      
      // Reset form only if creating new product
      if (!isEditing) {
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
          quantity: 0,
          isListed: true,
          variants: [],
          reviews: {
            ratingAverage: 0,
            ratingCount: 0,
          },
          url: "",
        });
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImages([]);
        setFeatureInput("");
        setVariantInput({ name: "", price: "" });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        (isEditing 
          ? "Failed to update product. Please try again." 
          : "Failed to create product. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
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
        </div>

        <div className="form-row">
          <div className="admin-form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="0"
              required
              placeholder="0"
            />
            <small style={{ color: "#666", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
              Number of items available in stock
            </small>
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
            <small style={{ color: "#666", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
              Automatically updated based on quantity
            </small>
          </div>

          <div className="admin-form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isListed"
                checked={formData.isListed}
                onChange={handleInputChange}
              />
              List Product
            </label>
            <small style={{ color: "#666", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
              Show product on website
            </small>
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
            {loading 
              ? (isEditing ? "Updating..." : "Creating...") 
              : (isEditing ? "Update Product" : "Create Product")
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
