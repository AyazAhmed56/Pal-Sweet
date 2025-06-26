import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Contact from "../components/Contact";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";

const Summer = () => {
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
      .eq("category", "Summer Refreshments");

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
    <div>
      <img
        src="https://www.haldirams.com/media/catalog/tmp/category/beverages_1_.jpg"
        alt="Summer Refreshments"
        className="p-5"
      />
      <h1 className="mt-5 font-bold text-5xl text-center">Summer Refreshments</h1>

      <div className="flex flex-col lg:flex-row gap-10 mt-10 px-4 lg:px-10">
        {/* Filters */}
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-2xl">
          {/* Price Filter */}
          <div className="bg-[#FFF8D0] p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Price</h1>
              <Button size="icon" onClick={() => setShowPrice(!showPrice)}>
                {showPrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>

            {showPrice && (
              <>
                <div className="m-3 flex justify-between items-center">
                  <h1 className="border p-3 shadow text-sm">₹{sliderValue[0]}</h1>
                  <h1 className="border p-3 shadow text-sm">₹{sliderValue[1]}</h1>
                </div>

                <Slider
                  value={sliderValue}
                  onValueChange={(val) => setSliderValue(val)}
                  max={maxPrice}
                  min={minPrice}
                  step={1}
                  className="pt-5 pb-5"
                />

                <div className="m-5 flex justify-between items-center">
                  <p>{filteredItems.length} items</p>
                  <Button onClick={handleFilter}>Ok</Button>
                </div>
              </>
            )}
          </div>

          {/* Size Filter */}
          <div className="bg-[#FFF8D0] mt-8 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Pack Size</h1>
              <Button size="icon" onClick={() => setShowSize(!showSize)}>
                {showSize ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Button>
            </div>

            {showSize && (
              <div>
                <div className="m-2 grid grid-cols-2 gap-5">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "destructive" : "default"}
                      onClick={() => {
                        setSelectedSize(size);
                        handleFilter();
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <div className="m-5 flex justify-between items-center">
                  <p>{filteredItems.length} items</p>
                  <Button onClick={handleFilter}>Ok</Button>
                </div>
              </div>
            )}
          </div>

          <Button
            className="mt-8 w-full"
            onClick={() => {
              setSelectedSize(null);
              setSliderValue([minPrice, maxPrice]);
              setFilteredItems(allItems);
            }}
          >
            Clear Filters
          </Button>

          <p className="pt-10 text-xl font-normal">Total items: {allItems.length}</p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {filteredItems.map((item, index) => (
            <div key={item.id}>
              <Link to={`/sweet/${item.id}`}>
                <div
                  className="relative bg-white shadow-lg rounded-xl overflow-hidden p-5 transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover h-40 w-full rounded-md shadow"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600 mt-1">{item.size}</p>
                    <div className="flex justify-center items-center gap-4 mt-2">
                      <p className="text-green-700 text-lg font-semibold">₹{item.price}</p>
                      {item.strikePrice && (
                        <p className="text-gray-500 line-through">₹{item.strikePrice}</p>
                      )}
                    </div>
                    {item.discount && (
                      <p className="text-red-500 text-sm mt-1">{item.discount}</p>
                    )}
                  </div>
                  {hoveredIndex === index && (
                    <CartItemCard item={item} onAddToCart={handleAddToCart} />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Summer;
