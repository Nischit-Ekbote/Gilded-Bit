import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

interface PayButtonProps {
  amount: number;
  productName: string;
  element:string;
  grams:string;
  type:string;
  
}

const PayButton: React.FC<PayButtonProps> = ({ amount, productName, element, grams, type }) => {

    const { user } = useUser();
    const uid = user?.id;
  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
            uid,
          amount,
          productName,
          grams : parseFloat(grams),
          element,
          type
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <button onClick={handleCheckout} className='goldForm-button'>
      Proceed to Checkout
    </button>
  );
};

export default PayButton;