import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Fetch authenticated user and their profile
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      setUser(user);
      setEmail(user.email);

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (!profileError && profile) {
        setName(profile.name || "");
        setAddress(profile.address || "");
        setDob(profile.dob || "");
        setPhno(profile.phno || "");
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle update
  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({
        name,
        address,
        dob,
        phno,
      })
      .eq("email", email);

    if (error) {
      console.error("Update Error:", error);
      alert("❌ Error updating profile: " + error.message);
    } else {
      alert("✅ Profile updated successfully!");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#FFF8D0] px-6 py-10"
    >
      <h1 className="text-5xl font-bold text-center text-yellow-900 mb-12">
        Your Profile
      </h1>

      <form
        onSubmit={handlePost}
        className="bg-white shadow-xl rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6"
      >
        <div>
          <Label className="text-lg mb-1 block text-gray-700">Name</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            className="h-12 bg-[#FFFBEA] text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="text-lg mb-1 block text-gray-700">Address</Label>
          <Textarea
            placeholder="Enter your address"
            className="h-28 bg-[#FFFBEA] text-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="text-lg mb-1 block text-gray-700">Email</Label>
          <Input
            type="email"
            className="h-12 bg-[#FFFBEA] text-lg"
            value={email}
            disabled
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Label className="text-lg mb-1 block text-gray-700">
              Phone Number
            </Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 bg-[#FFFBEA] text-lg"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <Label className="text-lg mb-1 block text-gray-700">
              Date of Birth
            </Label>
            <Input
              type="date"
              className="h-12 bg-[#FFFBEA] text-lg"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-lg mt-6 bg-[#FFB700] hover:bg-[#e4a200]"
        >
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </motion.div>
  );
};

export default Profile;
