import React, { useState, FormEvent } from "react";
import { useUser } from "@clerk/clerk-react";
import { Toaster, toast } from 'sonner';
import "./BuyGold.css";
import PayButton from "../../components/PayButton";

interface GoldRate {
  name: string;
  price: number;
}

interface BuyGoldPageProps {
  goldRates: {
    price_gram_18k: number;
    price_gram_20k: number;
    price_gram_22k: number;
    price_gram_24k: number;
  } | null;
}

const BuyGoldPage: React.FC<BuyGoldPageProps> = ({ goldRates }) => {
  const { user } = useUser();
  const [grams, setGrams] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("24k");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const type = selectedType;
  
  if (!goldRates) {
    return <div>Loading gold rates...</div>;
  }

  const goldTypes: GoldRate[] = [
    { name: "18K", price: goldRates.price_gram_18k },
    { name: "20k", price: goldRates.price_gram_20k },
    { name: "22k", price: goldRates.price_gram_22k },
    { name: "24k", price: goldRates.price_gram_24k },
  ];

  const currentPrice =
    goldTypes.find((type) => type.name.toLowerCase() === selectedType)?.price ||
    0;

  const totalAmount = currentPrice ;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to buy gold.");
      return;
    }

    const gramsValue = parseFloat(grams);
    if (isNaN(gramsValue) || gramsValue <= 0) {
      toast.error("Please enter a valid number of grams.");
      return;
    }
  };

  return (
    <div className="buy__gold__container">
      <Toaster richColors />
      <h1>Buy Gold</h1>
      <div className="gold-type-buttons">
        {goldTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelectedType(type.name.toLowerCase())}
            className={
              selectedType === type.name.toLowerCase()
                ? "goldTypeActive"
                : "goldType"
            }
          >
            {type.name}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="goldForm">
        <div className="goldForm-input">
          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder="Enter grams of gold"
            disabled={isLoading}
            required
          />
          <p>={totalAmount.toFixed(2)}Rs</p>
        </div>
        <PayButton 

          element="Gold"
          amount={currentPrice} 
          productName={`${grams}g of ${selectedType.toUpperCase()} Gold`} 
          grams={grams}
          type={type}
        />
      </form>
    </div>
  );
};

export default BuyGoldPage;
