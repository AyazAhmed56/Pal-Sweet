import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Button } from "../components/ui/button";
import Contact from "../components/Contact";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";

const SweetDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const itemWithQuantity = { ...item, quantity };
    localStorage.setItem("buyNowItem", JSON.stringify(itemWithQuantity));
    navigate("/checkout");
  };

  const handleAddToCart = async (item) => {
    // const supabase = await getSupabaseClient();
    const { data: existing, error: checkError } = await supabase
      .from("addtocart")
      .select("*")
      .eq("name", item.name)
      .eq("size", item.size)
      .single();

    if (existing) {
      alert("Item already in cart!");
      return;
    }

    const { id: category_id, name, image, price, size } = item;
    const { error } = await supabase
      .from("addtocart")
      .insert([{ name, image, price, size, quantity, category_id }]);

    if (error) {
      console.error("Failed to add to cart:", error);
      alert("Something went wrong!");
    } else {
      alert("Item added to cart!");
    }
  };

  useEffect(() => {
    const fetchSweet = async () => {
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Error fetching item:", error);
      else setItem(data);
    };
    fetchSweet();
  }, [id]);

  if (!item) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="bg-[#FFF8D0] min-h-screen py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-10 max-w-6xl mx-auto bg-white rounded-xl shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Sweet Image */}
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full md:w-1/2 h-auto object-contain rounded-xl shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-extrabold text-yellow-800 mb-4">
              {item.name}
            </h1>
            <p className="text-lg mb-2">
              <span className="font-semibold text-gray-700">Pack Size:</span>{" "}
              {item.size}
            </p>

            <div className="flex items-center gap-4 text-2xl font-bold mt-2">
              <p className="text-green-600">₹{item.price}</p>
              {item.strikePrice && (
                <p className="text-gray-500 line-through text-xl">
                  ₹{item.strikePrice}
                </p>
              )}
            </div>

            {item.discount && (
              <p className="text-red-500 mt-2 text-lg">{item.discount}</p>
            )}

            <p className="mt-5 text-gray-600 text-base leading-relaxed">
              {item.description || "No description available."}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-6">
              <p className="text-lg font-medium">Quantity:</p>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Input
                  className="px-4 py-1 text-lg"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-6 py-3"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-6 py-3"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-20">
        <Contact />
      </div>
    </div>
  );
};

export default SweetDetail;
