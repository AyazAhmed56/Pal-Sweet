import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center py-10 text-gray-500">No orders found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row gap-5 items-center bg-white shadow-lg p-5 rounded-xl border"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-32 h-32 object-contain rounded border"
            />
            <div className="text-left space-y-1">
              <h3 className="text-xl font-semibold">{order.name}</h3>
              <p className="text-gray-600">Size: {order.size}</p>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-green-600 font-bold">₹{order.price}</p>
              <p className="text-blue-600 capitalize">Mode: {order.mode}</p>
              <p className="text-sm text-gray-500">Phone: {order.phno}</p>
              <p className="text-sm text-gray-500">Address: {order.address}</p>
              <p className="text-xs text-gray-400">
                Placed on: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
