import React, { useState, useEffect } from "react";
import './GramToCarat.css'

interface GramToCaratProps {
  price_gram_24k: number;
}

export default function GramToCarat({ price_gram_24k }: GramToCaratProps) {
  const [noOfGrams, setNoOfGrams] = useState<string>("10");
  const [conversionToRs, setConversionToRs] = useState<number>(0);

  useEffect(() => {
    const grams = parseFloat(noOfGrams);
    if (!isNaN(grams)) {
      setConversionToRs(price_gram_24k * grams);
    }
  }, [noOfGrams, price_gram_24k]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setNoOfGrams(value);
    }
  };

  return (
    <div className="gram__convertor__block">
      <div className="gram__block">
        <label htmlFor="grams" >
          Grams:
        </label>
        <input
          type="text"
          id="grams"
          name="grams"
          value={noOfGrams}
          onChange={handleInputChange}
          placeholder="Number of grams"
        />
      </div>
      <div className="value__block">
        <p>Value: </p>
        <span>{conversionToRs.toFixed(2)} Rs</span>
      </div>
    </div>
  );
}