import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/payment-options"); // navigate to next page
  };
  useEffect(() => {
    const data = localStorage.getItem("buyNowItem");
    if (data) {
      setItem(JSON.parse(data));
    }
  }, []);

  if (!item) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-4" />
          <div className="h-40 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
        </div>
        <p className="text-gray-500 mt-4">Loading item...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="flex flex-col sm:flex-row gap-6 items-center bg-white shadow-xl rounded-xl p-6">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.name}
          className="w-40 h-40 object-contain rounded-lg border"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{item.name}</h2>
          <p className="text-gray-500 mt-1">
            Size: <span className="font-medium">{item.size}</span>
          </p>
          <p className="text-gray-500 mt-1">
            Quantity: <span className="font-medium">{item.quantity}</span>
          </p>
          <p className="text-xl font-bold mt-2 text-green-600">₹{item.price}</p>
          <p className="text-gray-600 mt-1">
            Total: ₹{item.price * item.quantity}
          </p>
        </div>
      </div>

      <Button
        onClick={handleProceed}
        className="mt-8 w-full text-lg py-6 rounded-xl"
      >
        Proceed to Payment
      </Button>
    </motion.div>
  );
};

export default Checkout;
