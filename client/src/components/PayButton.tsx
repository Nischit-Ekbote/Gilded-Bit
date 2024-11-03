import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { toast } from 'sonner';
import SpinnerLoader from './spinnerLoader/SpinnerLoader';

const API_BASE_URL = "https://gilded-bit.vercel.app/api/v1";

interface PayButtonProps {
  amount: number;
  productName: string;
  element:string;
  grams:string;
  type:string;
  loading:boolean;
  setLoading : any;
  
}

const PayButton: React.FC<PayButtonProps> = ({ amount, productName, element, grams, type, loading, setLoading }) => {

    const { user } = useUser();
    const uid = user?.id;
  const handleCheckout = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      setLoading(false);
      console.error('Error during checkout:', error);
      toast.error('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <button onClick={handleCheckout} className='goldForm-button'>
      {loading ? <SpinnerLoader/> : "Proceed to Checkout"}
    </button>
  );
};

export default PayButton;