import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleCheckBig, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PurchaseDetails {
  element: string;
  type: string;
  amount: number;
  grams: number;
}

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const purchaseDetails: PurchaseDetails = {
    element: searchParams.get("element") || "",
    type: searchParams.get("type") || "",
    amount: parseFloat(searchParams.get("amount") || "0"),
    grams: parseFloat(searchParams.get("grams") || "0"),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center bg-gradient-to-b from-[#001D3D] to-black rounded-lg py-8 px-6 w-full max-w-md relative shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
          className="absolute -top-5 bg-green-950 rounded-full p-2 shadow-lg"
        >
          <CircleCheckBig className="w-12 h-12 text-[#00FF29]" />
        </motion.div>
        <h1 className="text-3xl mt-8 mb-2 font-bold text-white">Payment Success!</h1>
        <h2 className="font-light text-gray-300 border-b border-gray-700 pb-3 mb-6 text-center">
          Your payment has been successfully processed
        </h2>
        <div className="w-full grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Quantity</p>
            <p className="text-xl font-semibold text-white">{purchaseDetails.grams}g</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Price/g</p>
            <p className="text-xl font-semibold text-white">
              {(purchaseDetails.amount / purchaseDetails.grams).toFixed(2)} INR
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-xl font-semibold text-white">{purchaseDetails.amount} INR</p>
          </div>
        </div>
        <p className="text-center text-gray-300 mb-6">
          {purchaseDetails.grams}g of {purchaseDetails.type} {purchaseDetails.element}
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 border border-[--primary--] text-[--primary--] py-2 px-4 rounded-full w-full transition-colors duration-300 hover:bg-[--primary--] hover:text-[--secondary--]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPage;