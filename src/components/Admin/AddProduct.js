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
      details: {
        modelName: "",
        modelNumber: "",
        NetWeight: "",
        Payload: "",
      },
      FrameSet: {
        Frame: "",
        Fork: "",
        Headset: "",
      },
      "E-System": {
        driveUnit: "",
        battery: "",
        charger: "",
        display: "",
        throttle: "",
      },
      DRIVETRAIN: {
        "Rear Derailleur": "",
        Shifters: "",
        Chain: "",
        Crank: "",
        "Rear Cogs": "",
        Sensor: "",
      },
      BRAKES: {
        Brakes: "",
        "Brake Levers": "",
      },
      Wheels: {
        "Front Hub": "",
        "Rear Hub": "",
        Tires: "",
        Rims: "",
        Spokes: "",
      },
      Components: {
        Handlebars: "",
        Stem: "",
        Grips: "",
        Saddle: "",
        Seatpost: "",
      },
      frameType: "",
    },
    // Filter fields
    style: "",
    poster: "",
    drivetrain: "",
    electricAssistRange: "",
    payload: "",
    riderHeight: [],
    suspension: "",
    colors: [],
    weight: "",
    tagline: "",
    features: [],
    inStock: true,
    quantity: 0,
    isListed: true,
    reviews: {
      ratingAverage: 0,
      ratingCount: 0,
    },
  });

  const [imageFiles, setImageFiles] = useState([]); // Store File objects
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // For editing
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [riderHeightInput, setRiderHeightInput] = useState("");
  const [colorInput, setColorInput] = useState({ name: "", quantity: "" });

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
          details: {
            modelName: product.specifications?.details?.modelName || "",
            modelNumber: product.specifications?.details?.modelNumber || "",
            NetWeight: product.specifications?.details?.NetWeight !== undefined && product.specifications?.details?.NetWeight !== null
              ? String(product.specifications.details.NetWeight)
              : "",
            Payload: product.specifications?.details?.Payload !== undefined && product.specifications?.details?.Payload !== null
              ? String(product.specifications.details.Payload)
              : "",
          },
          FrameSet: {
            Frame: product.specifications?.FrameSet?.Frame || "",
            Fork: product.specifications?.FrameSet?.Fork || "",
            Headset: product.specifications?.FrameSet?.Headset || "",
          },
          "E-System": {
            driveUnit: product.specifications?.["E-System"]?.driveUnit || "",
            battery: product.specifications?.["E-System"]?.battery || "",
            charger: product.specifications?.["E-System"]?.charger || "",
            display: product.specifications?.["E-System"]?.display || "",
            throttle: product.specifications?.["E-System"]?.throttle || "",
          },
          DRIVETRAIN: {
            "Rear Derailleur": product.specifications?.DRIVETRAIN?.["Rear Derailleur"] || "",
            Shifters: product.specifications?.DRIVETRAIN?.Shifters || "",
            Chain: product.specifications?.DRIVETRAIN?.Chain || "",
            Crank: product.specifications?.DRIVETRAIN?.Crank || "",
            "Rear Cogs": product.specifications?.DRIVETRAIN?.["Rear Cogs"] || "",
            Sensor: product.specifications?.DRIVETRAIN?.Sensor || "",
          },
          BRAKES: {
            Brakes: product.specifications?.BRAKES?.Brakes || "",
            "Brake Levers": product.specifications?.BRAKES?.["Brake Levers"] || "",
          },
          Wheels: {
            "Front Hub": product.specifications?.Wheels?.["Front Hub"] || "",
            "Rear Hub": product.specifications?.Wheels?.["Rear Hub"] || "",
            Tires: product.specifications?.Wheels?.Tires || "",
            Rims: product.specifications?.Wheels?.Rims || "",
            Spokes: product.specifications?.Wheels?.Spokes || "",
          },
          Components: {
            Handlebars: product.specifications?.Components?.Handlebars || "",
            Stem: product.specifications?.Components?.Stem || "",
            Grips: product.specifications?.Components?.Grips || "",
            Saddle: product.specifications?.Components?.Saddle || "",
            Seatpost: product.specifications?.Components?.Seatpost || "",
          },
          frameType: product.specifications?.frameType || "",
        },
        // Filter fields
        style: product.style || "",
        poster: product.poster || "",
        drivetrain: product.drivetrain || "",
        electricAssistRange: product.electricAssistRange || "",
        payload: product.payload !== undefined && product.payload !== null ? String(product.payload) : "",
        riderHeight: Array.isArray(product.riderHeight) ? [...product.riderHeight] : [],
        suspension: product.suspension || "",
        colors: Array.isArray(product.colors) 
          ? product.colors.map(c => typeof c === 'string' 
              ? { name: c, quantity: 0 } 
              : { name: c.name || c, quantity: c.quantity || 0 })
          : [],
        weight: product.weight !== undefined && product.weight !== null ? String(product.weight) : "",
        tagline: product.tagline || "",
        features: Array.isArray(product.features) ? [...product.features] : [],
        inStock: product.inStock !== undefined ? product.inStock : true,
        quantity: product.quantity !== undefined && product.quantity !== null ? product.quantity : 0,
        isListed: product.isListed !== undefined ? product.isListed : true,
        reviews: {
          ratingAverage: product.reviews?.ratingAverage !== undefined && product.reviews?.ratingAverage !== null
            ? product.reviews.ratingAverage
            : 0,
          ratingCount: product.reviews?.ratingCount !== undefined && product.reviews?.ratingCount !== null
            ? product.reviews.ratingCount
            : 0,
        },
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
          details: {
            modelName: "",
            modelNumber: "",
            NetWeight: "",
            Payload: "",
          },
          FrameSet: {
            Frame: "",
            Fork: "",
            Headset: "",
          },
          "E-System": {
            driveUnit: "",
            battery: "",
            charger: "",
            display: "",
            throttle: "",
          },
          DRIVETRAIN: {
            "Rear Derailleur": "",
            Shifters: "",
            Chain: "",
            Crank: "",
            "Rear Cogs": "",
            Sensor: "",
          },
          BRAKES: {
            Brakes: "",
            "Brake Levers": "",
          },
          Wheels: {
            "Front Hub": "",
            "Rear Hub": "",
            Tires: "",
            Rims: "",
            Spokes: "",
          },
          Components: {
            Handlebars: "",
            Stem: "",
            Grips: "",
            Saddle: "",
            Seatpost: "",
          },
          frameType: "",
        },
        // Filter fields
        style: "",
        poster: "",
        drivetrain: "",
        electricAssistRange: "",
        payload: "",
        riderHeight: [],
        suspension: "",
        colors: [],
        weight: "",
        tagline: "",
        features: [],
        inStock: true,
        quantity: 0,
        isListed: true,
        reviews: {
          ratingAverage: 0,
          ratingCount: 0,
        },
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
      const parts = name.split(".");
      if (parts.length === 2) {
        // Direct specification field (e.g., specifications.frameType)
        const specName = parts[1];
        setFormData({
          ...formData,
          specifications: {
            ...formData.specifications,
            [specName]: value,
          },
        });
      } else if (parts.length === 3) {
        // Nested specification field (e.g., specifications.details.modelName)
        const section = parts[1];
        const field = parts[2];
        setFormData({
          ...formData,
          specifications: {
            ...formData.specifications,
            [section]: {
              ...formData.specifications[section],
              [field]: value,
            },
          },
        });
      }
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

  const handleAddRiderHeight = () => {
    if (riderHeightInput.trim()) {
      setFormData({
        ...formData,
        riderHeight: [...formData.riderHeight, riderHeightInput.trim()],
      });
      setRiderHeightInput("");
    }
  };

  const handleRemoveRiderHeight = (index) => {
    setFormData({
      ...formData,
      riderHeight: formData.riderHeight.filter((_, i) => i !== index),
    });
  };

  const handleAddColor = () => {
    if (colorInput.name && colorInput.name.trim()) {
      const quantity = colorInput.quantity ? parseInt(colorInput.quantity) : 0;
      setFormData({
        ...formData,
        colors: [...formData.colors, { 
          name: colorInput.name.trim(), 
          quantity: isNaN(quantity) ? 0 : Math.max(0, quantity) 
        }],
      });
      setColorInput({ name: "", quantity: "" });
    }
  };

  const handleRemoveColor = (index) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
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

      // Add specifications - nested structure
      // Details
      if (formData.specifications.details.modelName) {
        formDataToSend.append("specifications[details][modelName]", formData.specifications.details.modelName.trim());
      }
      if (formData.specifications.details.modelNumber) {
        formDataToSend.append("specifications[details][modelNumber]", formData.specifications.details.modelNumber.trim());
      }
      const netWeight = parseFloat(formData.specifications.details.NetWeight);
      if (!isNaN(netWeight) && netWeight >= 0) {
        formDataToSend.append("specifications[details][NetWeight]", netWeight);
      }
      const payload = parseFloat(formData.specifications.details.Payload);
      if (!isNaN(payload) && payload >= 0) {
        formDataToSend.append("specifications[details][Payload]", payload);
      }
      
      // FrameSet
      if (formData.specifications.FrameSet.Frame) {
        formDataToSend.append("specifications[FrameSet][Frame]", formData.specifications.FrameSet.Frame.trim());
      }
      if (formData.specifications.FrameSet.Fork) {
        formDataToSend.append("specifications[FrameSet][Fork]", formData.specifications.FrameSet.Fork.trim());
      }
      if (formData.specifications.FrameSet.Headset) {
        formDataToSend.append("specifications[FrameSet][Headset]", formData.specifications.FrameSet.Headset.trim());
      }
      
      // E-System
      if (formData.specifications["E-System"].driveUnit) {
        formDataToSend.append("specifications[E-System][driveUnit]", formData.specifications["E-System"].driveUnit.trim());
      }
      if (formData.specifications["E-System"].battery) {
        formDataToSend.append("specifications[E-System][battery]", formData.specifications["E-System"].battery.trim());
      }
      if (formData.specifications["E-System"].charger) {
        formDataToSend.append("specifications[E-System][charger]", formData.specifications["E-System"].charger.trim());
      }
      if (formData.specifications["E-System"].display) {
        formDataToSend.append("specifications[E-System][display]", formData.specifications["E-System"].display.trim());
      }
      if (formData.specifications["E-System"].throttle) {
        formDataToSend.append("specifications[E-System][throttle]", formData.specifications["E-System"].throttle.trim());
      }
      
      // DRIVETRAIN
      if (formData.specifications.DRIVETRAIN["Rear Derailleur"]) {
        formDataToSend.append("specifications[DRIVETRAIN][Rear Derailleur]", formData.specifications.DRIVETRAIN["Rear Derailleur"].trim());
      }
      if (formData.specifications.DRIVETRAIN.Shifters) {
        formDataToSend.append("specifications[DRIVETRAIN][Shifters]", formData.specifications.DRIVETRAIN.Shifters.trim());
      }
      if (formData.specifications.DRIVETRAIN.Chain) {
        formDataToSend.append("specifications[DRIVETRAIN][Chain]", formData.specifications.DRIVETRAIN.Chain.trim());
      }
      if (formData.specifications.DRIVETRAIN.Crank) {
        formDataToSend.append("specifications[DRIVETRAIN][Crank]", formData.specifications.DRIVETRAIN.Crank.trim());
      }
      if (formData.specifications.DRIVETRAIN["Rear Cogs"]) {
        formDataToSend.append("specifications[DRIVETRAIN][Rear Cogs]", formData.specifications.DRIVETRAIN["Rear Cogs"].trim());
      }
      if (formData.specifications.DRIVETRAIN.Sensor) {
        formDataToSend.append("specifications[DRIVETRAIN][Sensor]", formData.specifications.DRIVETRAIN.Sensor.trim());
      }
      
      // BRAKES
      if (formData.specifications.BRAKES.Brakes) {
        formDataToSend.append("specifications[BRAKES][Brakes]", formData.specifications.BRAKES.Brakes.trim());
      }
      if (formData.specifications.BRAKES["Brake Levers"]) {
        formDataToSend.append("specifications[BRAKES][Brake Levers]", formData.specifications.BRAKES["Brake Levers"].trim());
      }
      
      // Wheels
      if (formData.specifications.Wheels["Front Hub"]) {
        formDataToSend.append("specifications[Wheels][Front Hub]", formData.specifications.Wheels["Front Hub"].trim());
      }
      if (formData.specifications.Wheels["Rear Hub"]) {
        formDataToSend.append("specifications[Wheels][Rear Hub]", formData.specifications.Wheels["Rear Hub"].trim());
      }
      if (formData.specifications.Wheels.Tires) {
        formDataToSend.append("specifications[Wheels][Tires]", formData.specifications.Wheels.Tires.trim());
      }
      if (formData.specifications.Wheels.Rims) {
        formDataToSend.append("specifications[Wheels][Rims]", formData.specifications.Wheels.Rims.trim());
      }
      if (formData.specifications.Wheels.Spokes) {
        formDataToSend.append("specifications[Wheels][Spokes]", formData.specifications.Wheels.Spokes.trim());
      }
      
      // Components
      if (formData.specifications.Components.Handlebars) {
        formDataToSend.append("specifications[Components][Handlebars]", formData.specifications.Components.Handlebars.trim());
      }
      if (formData.specifications.Components.Stem) {
        formDataToSend.append("specifications[Components][Stem]", formData.specifications.Components.Stem.trim());
      }
      if (formData.specifications.Components.Grips) {
        formDataToSend.append("specifications[Components][Grips]", formData.specifications.Components.Grips.trim());
      }
      if (formData.specifications.Components.Saddle) {
        formDataToSend.append("specifications[Components][Saddle]", formData.specifications.Components.Saddle.trim());
      }
      if (formData.specifications.Components.Seatpost) {
        formDataToSend.append("specifications[Components][Seatpost]", formData.specifications.Components.Seatpost.trim());
      }
      
      // Frame Type
      if (formData.specifications.frameType) {
        formDataToSend.append("specifications[frameType]", formData.specifications.frameType);
      }

      // Add filter fields
      if (formData.style) formDataToSend.append("style", formData.style);
      if (formData.poster) formDataToSend.append("poster", formData.poster);
      if (formData.drivetrain) formDataToSend.append("drivetrain", formData.drivetrain);
      if (formData.electricAssistRange) formDataToSend.append("electricAssistRange", formData.electricAssistRange);
      if (formData.payload) {
        const payloadNum = parseFloat(formData.payload);
        if (!isNaN(payloadNum) && payloadNum >= 0) {
          formDataToSend.append("payload", payloadNum);
        }
      }
      if (formData.suspension) formDataToSend.append("suspension", formData.suspension);
      if (formData.weight) {
        const weightNum = parseFloat(formData.weight);
        if (!isNaN(weightNum) && weightNum >= 0) {
          formDataToSend.append("weight", weightNum);
        }
      }
      if (formData.tagline) formDataToSend.append("tagline", formData.tagline.trim());
      
      // Add riderHeight array
      if (formData.riderHeight && formData.riderHeight.length > 0) {
        formData.riderHeight.forEach((height, index) => {
          if (height && height.trim() !== "") {
            formDataToSend.append(`riderHeight[${index}]`, height.trim());
          }
        });
      }
      
      // Add colors array with name and quantity
      if (formData.colors && formData.colors.length > 0) {
        formData.colors.forEach((color, index) => {
          if (color && (typeof color === 'object' ? color.name : color)) {
            const colorName = typeof color === 'object' ? color.name : color;
            const colorQuantity = typeof color === 'object' ? (color.quantity || 0) : 0;
            if (colorName && colorName.trim() !== "") {
              formDataToSend.append(`colors[${index}][name]`, colorName.trim());
              formDataToSend.append(`colors[${index}][quantity]`, Math.max(0, Math.floor(colorQuantity)));
            }
          }
        });
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
          details: {
            modelName: "",
            modelNumber: "",
            NetWeight: "",
            Payload: "",
          },
          FrameSet: {
            Frame: "",
            Fork: "",
            Headset: "",
          },
          "E-System": {
            driveUnit: "",
            battery: "",
            charger: "",
            display: "",
            throttle: "",
          },
          DRIVETRAIN: {
            "Rear Derailleur": "",
            Shifters: "",
            Chain: "",
            Crank: "",
            "Rear Cogs": "",
            Sensor: "",
          },
          BRAKES: {
            Brakes: "",
            "Brake Levers": "",
          },
          Wheels: {
            "Front Hub": "",
            "Rear Hub": "",
            Tires: "",
            Rims: "",
            Spokes: "",
          },
          Components: {
            Handlebars: "",
            Stem: "",
            Grips: "",
            Saddle: "",
            Seatpost: "",
          },
          frameType: "",
        },
        // Filter fields
        style: "",
        poster: "",
        drivetrain: "",
        electricAssistRange: "",
        payload: "",
        riderHeight: [],
        suspension: "",
        colors: [],
        weight: "",
        tagline: "",
        features: [],
        inStock: true,
        quantity: 0,
        isListed: true,
        reviews: {
          ratingAverage: 0,
          ratingCount: 0,
        },
      });
        setImageFiles([]);
      setImagePreviews([]);
        setExistingImages([]);
      setFeatureInput("");
      setRiderHeightInput("");
      setColorInput({ name: "", quantity: "" });
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

        <div className="filter-fields-section">
          <h3>Filter Fields (Optional)</h3>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Riding Styles</label>
              <select
                name="style"
                value={formData.style}
                onChange={handleInputChange}
              >
                <option value="">Select Riding Style</option>
                <option value="Urban Commuting">Urban Commuting</option>
                <option value="Off-road / Mountain Riding">Off-road / Mountain Riding</option>
                <option value="Long-distance Touring">Long-distance Touring</option>
                <option value="Leisure Riding / Daily Errands">Leisure Riding / Daily Errands</option>
                <option value="Cargo & Delivery Use">Cargo & Delivery Use</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Riding Posture</label>
              <select
                name="poster"
                value={formData.poster}
                onChange={handleInputChange}
              >
                <option value="">Select Posture</option>
                <option value="Upright">Upright</option>
                <option value="Active">Active</option>
                <option value="Sporty">Sporty</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Drivetrain</label>
              <select
                name="drivetrain"
                value={formData.drivetrain}
                onChange={handleInputChange}
              >
                <option value="">Select Drivetrain</option>
                <option value="Chain">Chain</option>
                <option value="Belt">Belt</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Electric Assist Range</label>
              <select
                name="electricAssistRange"
                value={formData.electricAssistRange}
                onChange={handleInputChange}
              >
                <option value="">Select Range</option>
                <option value="43-60 mile">43-60 mile</option>
                <option value=">60 mile">&gt;60 mile</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Payload (lbs)</label>
              <input
                type="number"
                name="payload"
                value={formData.payload}
                onChange={handleInputChange}
                min="0"
                step="1"
                placeholder="e.g., 264"
              />
            </div>
            <div className="admin-form-group">
              <label>Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="e.g., 37.9"
              />
            </div>
            <div className="admin-form-group">
              <label>Suspension</label>
              <select
                name="suspension"
                value={formData.suspension}
                onChange={handleInputChange}
              >
                <option value="">Select Suspension</option>
                <option value="Front Suspension">Front Suspension</option>
                <option value="Full Suspension">Full Suspension</option>
                <option value="No Suspension / Rigid Fork">No Suspension / Rigid Fork</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="Short descriptive text"
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Rider Height</label>
            <div className="input-with-button">
              <input
                type="text"
                value={riderHeightInput}
                onChange={(e) => setRiderHeightInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRiderHeight();
                  }
                }}
                placeholder="e.g., 150cm(4'11&quot;) - 185cm(6'1&quot;)"
              />
              <button
                type="button"
                onClick={handleAddRiderHeight}
                className="add-item-btn"
              >
                Add
              </button>
            </div>
            {formData.riderHeight.length > 0 && (
              <div className="items-list">
                {formData.riderHeight.map((height, index) => (
                  <span key={index} className="item-tag">
                    {height}
                    <button
                      type="button"
                      onClick={() => handleRemoveRiderHeight(index)}
                      className="remove-item-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="admin-form-group">
            <label>Colors (with Stock Quantity)</label>
            <div className="input-with-button">
              <select
                value={colorInput.name}
                onChange={(e) => setColorInput({ ...colorInput, name: e.target.value })}
                style={{ flex: 1 }}
              >
                <option value="">Select Color</option>
                <option value="White">White</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Grey">Grey</option>
                <option value="Black">Black</option>
              </select>
              <input
                type="number"
                value={colorInput.quantity}
                onChange={(e) => setColorInput({ ...colorInput, quantity: e.target.value })}
                placeholder="Qty"
                min="0"
                style={{ width: "80px" }}
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="add-item-btn"
                disabled={!colorInput.name}
              >
                Add
              </button>
            </div>
            {formData.colors.length > 0 && (
              <div className="items-list">
                {formData.colors.map((color, index) => (
                  <span key={index} className="item-tag">
                    {typeof color === 'object' ? `${color.name} (Qty: ${color.quantity})` : `${color} (Qty: 0)`}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
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

        <div className="specifications-section">
          <h3>Specifications (Optional)</h3>
          
          <h4>Details</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Model Name</label>
              <input
                type="text"
                name="specifications.details.modelName"
                value={formData.specifications.details.modelName}
                onChange={handleInputChange}
                placeholder="e.g., EcoWheel Pro"
              />
            </div>
            <div className="admin-form-group">
              <label>Model Number</label>
              <input
                type="text"
                name="specifications.details.modelNumber"
                value={formData.specifications.details.modelNumber}
                onChange={handleInputChange}
                placeholder="e.g., EW-PRO-2024"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Net Weight</label>
              <input
                type="number"
                name="specifications.details.NetWeight"
                value={formData.specifications.details.NetWeight}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="e.g., 37.9"
              />
            </div>
            <div className="admin-form-group">
              <label>Payload</label>
              <input
                type="number"
                name="specifications.details.Payload"
                value={formData.specifications.details.Payload}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                placeholder="e.g., 264"
              />
            </div>
          </div>

          <h4>Frame Set</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Frame</label>
              <input
                type="text"
                name="specifications.FrameSet.Frame"
                value={formData.specifications.FrameSet.Frame}
                onChange={handleInputChange}
                placeholder="Frame specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Fork</label>
              <input
                type="text"
                name="specifications.FrameSet.Fork"
                value={formData.specifications.FrameSet.Fork}
                onChange={handleInputChange}
                placeholder="Fork specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Headset</label>
              <input
                type="text"
                name="specifications.FrameSet.Headset"
                value={formData.specifications.FrameSet.Headset}
                onChange={handleInputChange}
                placeholder="Headset specification"
              />
            </div>
          </div>

          <h4>E-System</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Drive Unit</label>
              <input
                type="text"
                name="specifications.E-System.driveUnit"
                value={formData.specifications["E-System"].driveUnit}
                onChange={handleInputChange}
                placeholder="e.g., 750W High-Torque"
              />
            </div>
            <div className="admin-form-group">
              <label>Battery</label>
              <input
                type="text"
                name="specifications.E-System.battery"
                value={formData.specifications["E-System"].battery}
                onChange={handleInputChange}
                placeholder="e.g., 48V 696Wh"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Charger</label>
              <input
                type="text"
                name="specifications.E-System.charger"
                value={formData.specifications["E-System"].charger}
                onChange={handleInputChange}
                placeholder="Charger specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Display</label>
              <input
                type="text"
                name="specifications.E-System.display"
                value={formData.specifications["E-System"].display}
                onChange={handleInputChange}
                placeholder="Display specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Throttle</label>
              <input
                type="text"
                name="specifications.E-System.throttle"
                value={formData.specifications["E-System"].throttle}
                onChange={handleInputChange}
                placeholder="Throttle specification"
              />
            </div>
          </div>

          <h4>Drivetrain</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Rear Derailleur</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Rear Derailleur"
                value={formData.specifications.DRIVETRAIN["Rear Derailleur"]}
                onChange={handleInputChange}
                placeholder="Rear derailleur specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Shifters</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Shifters"
                value={formData.specifications.DRIVETRAIN.Shifters}
                onChange={handleInputChange}
                placeholder="Shifters specification"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Chain</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Chain"
                value={formData.specifications.DRIVETRAIN.Chain}
                onChange={handleInputChange}
                placeholder="Chain specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Crank</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Crank"
                value={formData.specifications.DRIVETRAIN.Crank}
                onChange={handleInputChange}
                placeholder="Crank specification"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Rear Cogs</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Rear Cogs"
                value={formData.specifications.DRIVETRAIN["Rear Cogs"]}
                onChange={handleInputChange}
                placeholder="Rear cogs specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Sensor</label>
              <input
                type="text"
                name="specifications.DRIVETRAIN.Sensor"
                value={formData.specifications.DRIVETRAIN.Sensor}
                onChange={handleInputChange}
                placeholder="Sensor specification"
              />
            </div>
          </div>

          <h4>Brakes</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Brakes</label>
              <input
                type="text"
                name="specifications.BRAKES.Brakes"
                value={formData.specifications.BRAKES.Brakes}
                onChange={handleInputChange}
                placeholder="e.g., 4-Piston Hydraulic Disc"
              />
            </div>
            <div className="admin-form-group">
              <label>Brake Levers</label>
              <input
                type="text"
                name="specifications.BRAKES.Brake Levers"
                value={formData.specifications.BRAKES["Brake Levers"]}
                onChange={handleInputChange}
                placeholder="Brake levers specification"
              />
            </div>
          </div>

          <h4>Wheels</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Front Hub</label>
              <input
                type="text"
                name="specifications.Wheels.Front Hub"
                value={formData.specifications.Wheels["Front Hub"]}
                onChange={handleInputChange}
                placeholder="Front hub specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Rear Hub</label>
              <input
                type="text"
                name="specifications.Wheels.Rear Hub"
                value={formData.specifications.Wheels["Rear Hub"]}
                onChange={handleInputChange}
                placeholder="Rear hub specification"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Tires</label>
              <input
                type="text"
                name="specifications.Wheels.Tires"
                value={formData.specifications.Wheels.Tires}
                onChange={handleInputChange}
                placeholder="Tires specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Rims</label>
              <input
                type="text"
                name="specifications.Wheels.Rims"
                value={formData.specifications.Wheels.Rims}
                onChange={handleInputChange}
                placeholder="Rims specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Spokes</label>
              <input
                type="text"
                name="specifications.Wheels.Spokes"
                value={formData.specifications.Wheels.Spokes}
                onChange={handleInputChange}
                placeholder="Spokes specification"
              />
            </div>
          </div>

          <h4>Components</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Handlebars</label>
              <input
                type="text"
                name="specifications.Components.Handlebars"
                value={formData.specifications.Components.Handlebars}
                onChange={handleInputChange}
                placeholder="Handlebars specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Stem</label>
              <input
                type="text"
                name="specifications.Components.Stem"
                value={formData.specifications.Components.Stem}
                onChange={handleInputChange}
                placeholder="Stem specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Grips</label>
              <input
                type="text"
                name="specifications.Components.Grips"
                value={formData.specifications.Components.Grips}
                onChange={handleInputChange}
                placeholder="Grips specification"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Saddle</label>
              <input
                type="text"
                name="specifications.Components.Saddle"
                value={formData.specifications.Components.Saddle}
                onChange={handleInputChange}
                placeholder="Saddle specification"
              />
            </div>
            <div className="admin-form-group">
              <label>Seatpost</label>
              <input
                type="text"
                name="specifications.Components.Seatpost"
                value={formData.specifications.Components.Seatpost}
                onChange={handleInputChange}
                placeholder="Seatpost specification"
              />
            </div>
          </div>

          <h4>Frame Type</h4>
          <div className="form-row">
            <div className="admin-form-group">
              <label>Frame Type</label>
              <select
                name="specifications.frameType"
                value={formData.specifications.frameType}
                onChange={handleInputChange}
              >
                <option value="">Select Frame Type</option>
                <option value="Foldable">Foldable</option>
                <option value="Low step">Low step</option>
                <option value="Mid step">Mid step</option>
                <option value="High step">High step</option>
              </select>
            </div>
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
