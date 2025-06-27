import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const PaymentOptions = () => {
  const [item, setItem] = useState(null);
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("buyNowItem");
    if (data) {
      setItem(JSON.parse(data));
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      // const supabase = await getSupabaseClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("address, phno")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setAddress(data.address || "");
        setPhno(data.phno || "");
      }
    };

    fetchUserProfile();
  }, []);

  const handlePayment = async (method) => {
    if (!address || !phno) {
      alert("Please enter address and phone number.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const { name, image, price, size, quantity, category_id } = item;

    const { error } = await supabase.from("orders").insert([
      {
        name,
        image,
        price,
        size,
        quantity,
        address,
        phno,
        mode: method,
        category_id,
        requesting_user_id: user.id, // ✅ Attach the logged-in user's ID
      },
    ]);

    if (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    } else {
      alert("Order placed successfully!");
      localStorage.removeItem("buyNowItem");
      navigate("/orders");
    }
  };

  if (!item) return <p className="text-center">Loading item...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      <div className="text-left my-4 space-y-3">
        <Textarea
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="Phone number"
          value={phno}
          onChange={(e) => setPhno(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button onClick={() => handlePayment("cod")} className="bg-green-600">
          Cash on Delivery
        </Button>
        <Button onClick={() => handlePayment("online")} className="bg-blue-600">
          Pay Online
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;
