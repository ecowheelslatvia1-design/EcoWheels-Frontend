import { useState, useEffect } from "react";
import "../About/About.css";
import "../Login/Login.css";
import { productAPI } from "../../services/api";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [model, setModel] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
        const models = await productAPI.getProducts();
        setModel(models.data.products.map(p => p.specifications.details.modelNumber).filter(name => name).sort());
    }

    loadModels();
  }, []);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // Validate bike model selection
    if (!formValues.message || formValues.message.trim() === "") {
      setError("Please select a bike model");
      return;
    }

    console.log("Contact form submitted:", formValues);

    const message = encodeURIComponent(
        `Hello! It's ${formValues.name}!\n\n` +
        `I'm interested in bike ${formValues.message}.\n` +
        `Please reply back to me at ${formValues.email}.`
    );
    const whatsappUrl = `https://wa.me/37126308147?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setFormValues({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ width: "100%"}}>
      <section 
        className="about-hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/new-contact-banner-pc.webp)`,
        }}
      >
        <div className="about-hero-content">
          <h1 className="about-title">Service Bike</h1>
          <p className="about-subtitle">
            Need to service your bike? Feel free to reach out!
          </p>
        </div>
      </section>

      <section style={{ display: "flex", justifyContent: "center", alignItems: "center" , padding: "40px 20px"}}>
        <form className="login-container" onSubmit={handleSubmit}> 
            <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                id="contact-name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                id="contact-email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="contact-message">Bike Model</label>
                <CustomSelect
                  id="contact-message"
                  name="message"
                  options={model}
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Select your bike model"
                  required={true}
                />
                {error && <span style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem", display: "block" }}>{error}</span>}
            </div>

            <button type="submit" className="submit-btn">
                Send Message
            </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;



