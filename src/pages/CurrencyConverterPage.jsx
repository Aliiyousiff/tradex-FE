import React, { useState } from 'react';

const CurrencyConverterPage = () => {
  // States for amount, selected currencies, and result
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  // Predefined conversion rates (you can replace this with live API data)
  const conversionRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.65, BHD: 0.38, SAR: 3.75 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.73, BHD: 0.45, SAR: 4.41 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 100.22, BHD: 0.51, SAR: 5.01 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0099, BHD: 0.0051, SAR: 0.05 },
    BHD: { USD: 2.65, EUR: 2.22, GBP: 1.96, INR: 195.58, SAR: 9.89 },
    SAR: { USD: 0.27, EUR: 0.23, GBP: 0.20, INR: 19.53, BHD: 0.10 },
  };

  // Handle currency conversion
  const handleConversion = () => {
    // Check if the conversion rate exists
    const rate = conversionRates[fromCurrency]?.[toCurrency];
    if (rate) {
      setConvertedAmount(amount * rate);
      setError(''); // Reset error message
    } else {
      setConvertedAmount(null);
      setError('Conversion not available between selected currencies.');
    }
  };

  return (
    <div className="currency-converter-container">
      <h1>Currency Converter</h1>
      
      <div className="converter-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
          className="input-amount"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="currency-select"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          <option value="BHD">BHD</option>
          <option value="SAR">SAR</option>
        </select>
        <span className="to-text">to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="currency-select"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          <option value="BHD">BHD</option>
          <option value="SAR">SAR</option>
        </select>
        
        <button onClick={handleConversion} className="convert-btn">Convert</button>
      </div>

      {/* Display error if no conversion rate is found */}
      {error && <p className="error-message">{error}</p>}

      {/* Display converted result */}
      {convertedAmount !== null && !error && (
        <div className="conversion-result">
          <h2>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverterPage;
