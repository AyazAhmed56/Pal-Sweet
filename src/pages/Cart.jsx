import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    // const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("addtocart").select("*");
    if (error) console.error("Error fetching cart items:", error);
    else setCartItems(data);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8D0] py-12 px-4 lg:px-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-yellow-900">
        🧺 Your Cart
      </h1>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-800">
          Cart Summary
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4085814-3375784.png"
              alt="Empty cart"
              className="mx-auto w-60 mb-4"
            />
            <p>Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/sweet/${item.category_id}`}>
                  <div className="bg-[#FFFBEB] border border-yellow-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-yellow-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        Size: {item.size}
                      </p>
                      <p className="text-lg text-green-700 font-semibold mt-2">
                        ₹{item.price}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-800 mt-1">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
