import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
// import { isAdmin } from "../utils/isAdmin";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useUser();
  // if (!user || !isAdmin(user?.primaryEmailAddress?.emailAddress)) {
  //   return <p className="text-center py-10">Unauthorized</p>;
  // }

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
    return (
      <p className="text-center py-10 text-gray-500">No orders placed yet.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Orders (Admin View)
      </h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row items-start gap-6 bg-white shadow-md border p-5 rounded-xl"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-32 h-32 object-contain rounded border"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{order.name}</h3>
              <p>
                Size: <span className="font-medium">{order.size}</span>
              </p>
              <p>Quantity: {order.quantity}</p>
              <p className="text-green-600 font-bold">₹{order.price}</p>
              <p className="capitalize text-blue-700">
                Payment Mode: {order.mode}
              </p>
              <p className="text-sm text-gray-800">
                📍 Address: {order.address}
              </p>
              <p className="text-sm text-gray-800">📞 Phone: {order.phno}</p>
              <p className="text-xs text-gray-500">
                🕒 {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
