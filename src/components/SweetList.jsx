import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust the path
import { Button } from "@/components/ui/button"; // or use <button> tag directly

const SweetDetails = () => {
  const [sweet, setSweet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      // const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id", 1) // 👉 yaha ID ya koi unique filter lagao
        .single();

      if (error) {
        console.error("Error fetching sweet:", error);
      } else {
        setSweet(data);
      }

      setLoading(false);
    };

    fetchSweet();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!sweet) return <p className="p-10 text-red-500">Sweet not found</p>;

  return (
    <div className="min-h-screen bg-[#FFF8D0] p-8 flex flex-col md:flex-row items-center gap-10">
      {/* Image */}
      <div className="w-full md:w-1/2">
        <img
          src={sweet.image}
          alt={sweet.name}
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />
      </div>

      {/* Info */}
      <div className="w-full md:w-1/2 space-y-5">
        <h1 className="text-4xl font-bold text-yellow-800">{sweet.name}</h1>
        <p className="text-lg text-gray-700">{sweet.description}</p>

        <div className="flex items-center gap-4 text-xl">
          <span className="text-red-600 font-semibold">₹{sweet.price}</span>
          <span className="line-through text-gray-500">
            ₹{sweet.strike_price}
          </span>
        </div>

        <div className="flex gap-4">
          <Button className="bg-yellow-700 text-white px-6 py-2 rounded-xl hover:bg-yellow-800">
            Add to Cart
          </Button>
          <Button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SweetDetails;
