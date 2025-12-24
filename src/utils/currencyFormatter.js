/**
 * Formats a price with the appropriate currency symbol
 * @param {number} price - The price value
 * @param {string} currency - The currency code (e.g., "USD", "EUR", "EURO")
 * @returns {string} Formatted price with currency symbol
 */
export const formatPrice = (price, currency = "USD") => {
  // Normalize currency: handle EURO, EUR, and other variations
  const normalizedCurrency = currency?.toUpperCase();
  
  // Convert EURO to EUR for consistency
  const currencyCode = normalizedCurrency === "EURO" ? "EUR" : normalizedCurrency;
  
  // Format the price to 2 decimal places
  const formattedPrice = (price || 0).toFixed(2);
  
  // Return formatted price with currency symbol
  if (currencyCode === "EUR") {
    return `€${formattedPrice}`;
  } else if (currencyCode === "USD") {
    return `$${formattedPrice}`;
  } else {
    // Default to showing currency code if unknown
    return `${currencyCode} ${formattedPrice}`;
  }
};

/**
 * Gets the currency symbol for a given currency code
 * @param {string} currency - The currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currency = "USD") => {
  const normalizedCurrency = currency?.toUpperCase();
  const currencyCode = normalizedCurrency === "EURO" ? "EUR" : normalizedCurrency;
  
  if (currencyCode === "EUR") {
    return "€";
  } else if (currencyCode === "USD") {
    return "$";
  } else {
    return currencyCode || "$";
  }
};

