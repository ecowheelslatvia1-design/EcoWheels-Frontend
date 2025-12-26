import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import "./AddProduct.css";

const AddAccessory = ({ accessory, onSuccess, onCancel }) => {
  const isEditing = !!accessory;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Extend Accessories",
    subCategory: "",
    price: {
      current: "",
      original: "",
      currency: "USD",
    },
    compatibility: [],
    specifications: {
      material: "",
      weight: "",
      dimensions: "",
      color: "",
      waterproofRating: "",
    },
    stockStatus: {
      inStock: true,
      quantity: 0,
    },
    features: [],
    isReplacementPart: false,
    isListed: true,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [compatibilityInput, setCompatibilityInput] = useState("");

  const modelOptions = [
    "Titan",
    "C11",
    "C11 PRO",
    "C21",
    "C22",
    "T1 PRO",
    "T2",
    "All Models",
  ];

  const subCategoryOptions = {
    "Extend Accessories": [
      "Trailers",
      "Bags",
      "Basket",
      "Rear Rack",
      "Other Accessories",
    ],
    "Replacement Parts": [
      "Batteries & Chargers",
      "Motor",
      "Brakes",
      "Display",
      "Inner Tubes",
      "Drivetrain",
    ],
    Drivetrain: ["Drivetrain"],
    Electrical: ["Electrical"],
  };

  useEffect(() => {
    if (accessory && accessory._id) {
      setFormData({
        name: accessory.name || "",
        description: accessory.description || "",
        category: accessory.category || "Extend Accessories",
        subCategory: accessory.subCategory || "",
        price: {
          current: accessory.price?.current
            ? String(accessory.price.current)
            : "",
          original: accessory.price?.original
            ? String(accessory.price.original)
            : "",
          currency: accessory.price?.currency || "USD",
        },
        compatibility: accessory.compatibility || [],
        specifications: {
          material: accessory.specifications?.material || "",
          weight: accessory.specifications?.weight || "",
          dimensions: accessory.specifications?.dimensions || "",
          color: accessory.specifications?.color || "",
          waterproofRating: accessory.specifications?.waterproofRating || "",
        },
        stockStatus: {
          inStock: accessory.stockStatus?.inStock ?? true,
          quantity: accessory.stockStatus?.quantity || 0,
        },
        features: accessory.features || [],
        isReplacementPart: accessory.isReplacementPart || false,
        isListed: accessory.isListed ?? true,
      });
      setExistingImages(accessory.images || []);
    }
  }, [accessory]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "price") {
        setFormData((prev) => ({
          ...prev,
          price: { ...prev.price, [child]: value },
        }));
      } else if (parent === "stockStatus") {
        setFormData((prev) => ({
          ...prev,
          stockStatus: {
            ...prev.stockStatus,
            [child]: type === "checkbox" ? checked : value,
          },
        }));
      } else if (parent === "specifications") {
        setFormData((prev) => ({
          ...prev,
          specifications: {
            ...prev.specifications,
            [child]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const toggleCompatibility = (model) => {
    setFormData((prev) => {
      const current = prev.compatibility || [];
      if (current.includes(model)) {
        return {
          ...prev,
          compatibility: current.filter((m) => m !== model),
        };
      } else {
        return {
          ...prev,
          compatibility: [...current, model],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        setError("Accessory name is required");
        setLoading(false);
        return;
      }

      const currentPrice = parseFloat(formData.price.current);
      if (isNaN(currentPrice) || currentPrice < 0) {
        setError("Please enter a valid current price");
        setLoading(false);
        return;
      }

      if (existingImages.length === 0 && imageFiles.length === 0) {
        setError("At least one image is required");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", (formData.description || "").trim());
      formDataToSend.append("category", formData.category);
      if (formData.subCategory) {
        formDataToSend.append("subCategory", formData.subCategory);
      }
      formDataToSend.append("price[current]", currentPrice);
      if (formData.price.original) {
        const originalPrice = parseFloat(formData.price.original);
        if (!isNaN(originalPrice) && originalPrice > 0) {
          formDataToSend.append("price[original]", originalPrice);
        }
      }
      formDataToSend.append("price[currency]", formData.price.currency);

      formData.compatibility.forEach((model) => {
        formDataToSend.append("compatibility[]", model);
      });

      if (formData.specifications.material) {
        formDataToSend.append(
          "specifications[material]",
          formData.specifications.material
        );
      }
      if (formData.specifications.weight) {
        formDataToSend.append(
          "specifications[weight]",
          formData.specifications.weight
        );
      }
      if (formData.specifications.dimensions) {
        formDataToSend.append(
          "specifications[dimensions]",
          formData.specifications.dimensions
        );
      }
      if (formData.specifications.color) {
        formDataToSend.append(
          "specifications[color]",
          formData.specifications.color
        );
      }
      if (formData.specifications.waterproofRating) {
        formDataToSend.append(
          "specifications[waterproofRating]",
          formData.specifications.waterproofRating
        );
      }

      formDataToSend.append(
        "stockStatus[inStock]",
        formData.stockStatus.inStock
      );
      formDataToSend.append(
        "stockStatus[quantity]",
        formData.stockStatus.quantity || 0
      );

      formData.features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature);
      });

      formDataToSend.append("isReplacementPart", formData.isReplacementPart);
      formDataToSend.append("isListed", formData.isListed);

      if (existingImages.length > 0) {
        existingImages.forEach((img) => {
          formDataToSend.append("existingImages[]", img);
        });
      }

      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      if (isEditing) {
        await adminAPI.updateAccessory(accessory._id, formDataToSend);
      } else {
        await adminAPI.createAccessory(formDataToSend);
      }

      onSuccess();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to save accessory"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>{isEditing ? "Edit Accessory" : "Add New Accessory"}</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>
              Category <span className="required">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="Extend Accessories">Extend Accessories</option>
              <option value="Replacement Parts">Replacement Parts</option>
              <option value="Drivetrain">Drivetrain</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          {formData.category && subCategoryOptions[formData.category] && (
            <div className="form-group">
              <label>Sub Category</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Sub Category</option>
                {subCategoryOptions[formData.category].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Pricing</h3>
          <div className="form-row">
            <div className="form-group">
              <label>
                Current Price <span className="required">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price.current"
                value={formData.price.current}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                step="0.01"
                name="price.original"
                value={formData.price.original}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select
                name="price.currency"
                value={formData.price.currency}
                onChange={handleInputChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="EURO">EURO</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Compatibility</h3>
          <div className="checkbox-group">
            {modelOptions.map((model) => (
              <label key={model} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.compatibility.includes(model)}
                  onChange={() => toggleCompatibility(model)}
                />
                <span>{model}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Specifications</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                name="specifications.material"
                value={formData.specifications.material}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Weight</label>
              <input
                type="text"
                name="specifications.weight"
                value={formData.specifications.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Dimensions</label>
              <input
                type="text"
                name="specifications.dimensions"
                value={formData.specifications.dimensions}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="specifications.color"
                value={formData.specifications.color}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Waterproof Rating</label>
            <input
              type="text"
              name="specifications.waterproofRating"
              value={formData.specifications.waterproofRating}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Stock Status</h3>
          <div className="form-row">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="stockStatus.inStock"
                  checked={formData.stockStatus.inStock}
                  onChange={handleInputChange}
                />
                In Stock
              </label>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="stockStatus.quantity"
                value={formData.stockStatus.quantity}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Features</h3>
          <div className="form-group">
            <div className="input-with-button">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Add a feature"
              />
              <button type="button" onClick={addFeature}>
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.features.map((feature, index) => (
                <span key={index} className="tag">
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Images</h3>
          <div className="form-group">
            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="image-preview-grid">
            {existingImages.map((img, index) => (
              <div key={`existing-${index}`} className="image-preview">
                <img src={img} alt={`Existing ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index, true)}
                  className="remove-image-btn"
                >
                  ×
                </button>
              </div>
            ))}
            {imagePreviews.map((preview, index) => (
              <div key={`new-${index}`} className="image-preview">
                <img src={preview} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index, false)}
                  className="remove-image-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isReplacementPart"
                checked={formData.isReplacementPart}
                onChange={handleInputChange}
              />
              Is Replacement Part
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isListed"
                checked={formData.isListed}
                onChange={handleInputChange}
              />
              List on Website
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : isEditing ? "Update Accessory" : "Create Accessory"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccessory;

