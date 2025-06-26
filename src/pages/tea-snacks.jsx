import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Contact from "../components/Contact";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Teasnacks = () => {
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

  useEffect(() => {
    const fetchItems = async () => {
      // const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("category", "TeaSnacks");

      if (error) console.error("Error fetching data:", error);
      else {
        setAllItems(data);
        setFilteredItems(data);
        const prices = data.map((item) => item.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setSliderValue([Math.min(...prices), Math.max(...prices)]);
        setAvailableSizes([...new Set(data.map((item) => item.size))]);
      }
    };
    fetchItems();
  }, []);

  const handleFilter = () => {
    const filtered = allItems.filter((item) => {
      const matchesPrice =
        item.price >= sliderValue[0] && item.price <= sliderValue[1];
      const matchesSize = selectedSize ? item.size === selectedSize : true;
      return matchesPrice && matchesSize;
    });
    setFilteredItems(filtered);
  };

  const handleClear = () => {
    setSelectedSize(null);
    setSliderValue([minPrice, maxPrice]);
    setFilteredItems(allItems);
  };

  return (
    <div className="min-h-screen bg-[#FFF8D0] text-gray-800">
      <img
        src="https://www.haldirams.com/media/catalog/tmp/category/mathari.jpg"
        alt="Ghee_image"
        className="w-full h-72 object-cover rounded-b-xl shadow-md"
      />
      <h1 className="text-center text-4xl font-bold mt-6 mb-4">Tea Snacks</h1>

      <div className="flex flex-col lg:flex-row px-4 lg:px-10 gap-10">
        {/* Filters Section */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg space-y-10">
          {/* Price Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Price</h2>
              <Button size="icon" onClick={() => setShowPrice(!showPrice)}>
                {showPrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>
            {showPrice && (
              <>
                <div className="flex justify-between">
                  <span className="border px-3 py-1 text-sm rounded">
                    ₹{sliderValue[0]}
                  </span>
                  <span className="border px-3 py-1 text-sm rounded">
                    ₹{sliderValue[1]}
                  </span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={(val) => setSliderValue(val)}
                  max={maxPrice}
                  min={minPrice}
                  step={1}
                  className="pt-2"
                />
                <div className="flex justify-between items-center pt-3">
                  <p>{filteredItems.length} items</p>
                  <Button onClick={handleFilter}>Apply</Button>
                </div>
              </>
            )}
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pack Size</h2>
              <Button size="icon" onClick={() => setShowSize(!showSize)}>
                {showSize ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>
            {showSize && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedSize === size ? "destructive" : "default"
                      }
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
              </>
            )}
          </div>

          <Button className="w-full" onClick={handleClear}>
            Clear Filters
          </Button>

          <p className="text-center pt-8 text-lg font-medium">
            Total items: {allItems.length}
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="relative bg-white rounded-xl shadow-xl p-4 overflow-hidden group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/sweet/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-xl transition duration-300 group-hover:opacity-80"
                />
                <div className="text-center mt-3 space-y-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm bg-yellow-100 rounded px-3 py-1 inline-block">
                    {item.size}
                  </p>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-xl font-medium">₹{item.price}</p>
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
                  <CartItemCard item={item} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Contact />
      </div>
    </div>
  );
};

export default Teasnacks;
