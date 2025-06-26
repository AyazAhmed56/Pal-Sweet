import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const PostSweet = () => {
  const [category, setCategory] = useState("");
  const [showCat, setShowCat] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [strikeprice, setStrikeprice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const supabase = await getSupabaseClient();
    let imageUrl = "";

    // ✅ Upload image to Supabase
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }

      // ✅ Get Public URL of uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // ✅ Insert all data into Supabase table
    const { data, error } = await supabase.from("category").insert([
      {
        name,
        size,
        price: parseInt(price),
        strikeprice: parseInt(strikeprice),
        description,
        category,
        image: imageUrl, // 👈 store the uploaded image URL here
      },
    ]);

    if (error) {
      alert("❌ Error inserting data: " + error.message);
    } else {
      alert("✅ Sweet added successfully!");
      // Reset form
      setName("");
      setSize("");
      setPrice("");
      setStrikeprice("");
      setDescription("");
      setCategory("");
      setImageFile(null);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8D0] px-10 py-8">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-[#000000] mb-10">
        Add Sweet Item ...
      </h1>

      {/* Category Selection */}
      <div className="w-full bg-amber-200 shadow-2xl rounded-2xl p-10 flex flex-col gap-6 max-w-4xl mx-auto mb-10">
        <Label className="text-lg font-semibold">Select Category</Label>
        <select
          name="Categories"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setShowCat(e.target.value);
          }}
          className="h-12 px-4 text-lg bg-[#FFFBEA]"
          required
        >
          <option value="">-- Choose Category --</option>
          <option value="Summer-Refreshments">Summer Refreshments</option>
          <option value="Corporate-Gifting">Corporate Gifting</option>
          <option value="Savouries">Savouries</option>
          <option value="Cookies">Cookies</option>
          <option value="Sweets">Sweets</option>
          <option value="Ghee">Ghee</option>
          <option value="Namkeen">Namkeen</option>
          <option value="DryFruits">Dry Fruits</option>
          <option value="BestSellers">Best Sellers</option>
          <option value="Papad">Papad</option>
          <option value="TeaSnacks">Tea Snacks</option>
        </select>
      </div>

      {showCat && (
        <form
          onSubmit={handlePost}
          className="bg-amber-200 shadow-2xl rounded-2xl p-10 flex flex-col gap-6 max-w-4xl mx-auto"
        >
          <Input
            placeholder="Name"
            className="h-14 text-xl bg-[#FFFBEA]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Textarea
            placeholder="Description"
            className="h-28 text-xl bg-[#FFFBEA]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Input
            placeholder="Pack Size (in gms)"
            className="h-14 text-xl bg-[#FFFBEA]"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />

          <div className="flex flex-col sm:flex-row gap-6">
            <Input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="h-14 w-full text-xl bg-[#FFFBEA]"
            />
            <Input
              type="number"
              placeholder="Strike Through Price"
              className="h-14 w-full text-xl bg-[#FFFBEA]"
              value={strikeprice}
              onChange={(e) => setStrikeprice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full">
              <Label className="text-lg">Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="bg-white file:text-gray-500 mt-2"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-6 text-lg bg-[#FFB700] hover:bg-[#e4a200]"
          >
            {loading ? "Posting..." : "Post Sweet"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default PostSweet;
