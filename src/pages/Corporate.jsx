import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Contact from "../components/Contact";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Corporate = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showPrice, setShowPrice] = useState(true);
  const [showSize, setShowSize] = useState(true);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sliderValue, setSliderValue] = useState([0, 0]);

  const fetchItems = async () => {
    // const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("category", "Corporate Gifting");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setAllItems(data);
      setFilteredItems(data);

      const prices = data.map((item) => item.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setSliderValue([min, max]);

      const sizes = [...new Set(data.map((item) => item.size))];
      setAvailableSizes(sizes);
    }
  };

  const handleFilter = () => {
    const filtered = allItems.filter((item) => {
      const matchesPrice =
        item.price >= sliderValue[0] && item.price <= sliderValue[1];
      const matchesSize = selectedSize ? item.size === selectedSize : true;
      return matchesPrice && matchesSize;
    });
    setFilteredItems(filtered);
  };

  const handleClearFilters = () => {
    setSelectedSize(null);
    setSliderValue([minPrice, maxPrice]);
    setFilteredItems(allItems);
  };

  const handleAddToCart = async (item) => {
    const { name, image, price, size } = item;
    const { error } = await supabase.from("addtocart").insert([{ name, image, price, size }]);
    if (error) {
      console.error("Add to cart failed:", error);
      alert("Something went wrong!");
    } else {
      alert("Item added to cart!");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8D0]">
      <motion.img
        src="https://www.haldirams.com/media/catalog/category/Corporate_Gifting.png"
        alt="Corporate Gifting Banner"
        className="w-full h-72 object-cover shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-5xl font-bold text-center text-yellow-900 mt-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Corporate Gifting
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10 px-4 lg:px-12 mt-12">
        {/* Filters */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg w-full lg:max-w-sm space-y-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {/* Price */}
          <div className="bg-[#FFF8D0] p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Price</h2>
              <Button size="icon" onClick={() => setShowPrice(!showPrice)}>
                {showPrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>

            {showPrice && (
              <>
                <div className="flex justify-between mt-4 text-sm">
                  <span className="border px-3 py-1 rounded shadow">₹{sliderValue[0]}</span>
                  <span className="border px-3 py-1 rounded shadow">₹{sliderValue[1]}</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={(val) => setSliderValue(val)}
                  max={maxPrice}
                  min={minPrice}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between items-center pt-3">
                  <p>{filteredItems.length} items</p>
                  <Button onClick={handleFilter}>Apply</Button>
                </div>
              </>
            )}
          </div>

          {/* Size */}
          <div className="bg-[#FFF8D0] p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pack Size</h2>
              <Button size="icon" onClick={() => setShowSize(!showSize)}>
                {showSize ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>

            {showSize && (
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "destructive" : "outline"}
                      onClick={() => {
                        setSelectedSize(size);
                        handleFilter();
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3">
                  <p>{filteredItems.length} items</p>
                  <Button onClick={handleFilter}>Apply</Button>
                </div>
              </div>
            )}
          </div>

          <Button className="w-full" onClick={handleClearFilters}>
            Clear Filters
          </Button>

          <p className="text-center pt-4 font-medium">
            Total: {allItems.length} items
          </p>
        </motion.div>

        {/* Products */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative bg-white rounded-xl shadow-lg p-4 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/sweet/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-xl transition group-hover:opacity-85"
                />
                <div className="text-center mt-3 space-y-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm bg-yellow-100 rounded px-3 py-1 inline-block">
                    {item.size}
                  </p>
                  <div className="flex justify-center items-center gap-3 mt-1">
                    <p className="text-xl font-medium text-green-800">
                      ₹{item.price}
                    </p>
                    {item.strikePrice && (
                      <p className="text-gray-400 line-through">
                        ₹{item.strikePrice}
                      </p>
                    )}
                  </div>
                  {item.discount && (
                    <p className="text-red-500 text-sm">{item.discount}</p>
                  )}
                </div>
              </Link>
              {hoveredIndex === index && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <CartItemCard item={item} onAddToCart={handleAddToCart} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-20">
        <Contact />
      </div>
    </div>
  );
};

export default Corporate;
