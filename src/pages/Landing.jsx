import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import slider from "../data/slider.json";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import About from "../components/About";
import Contact from "../components/Contact";
import { supabase } from "../lib/supabaseClient";

const Landing = () => {
  const [dryFruits, setDryFruits] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      // const supabase = await getSupabaseClient();
      const { data, error } = await supabase.from("category").select("*");
      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }
      setDryFruits(data.filter((item) => item.category === "DryFruits"));
      setBestSellers(data.filter((item) => item.bestseller === true));
    };
    fetchItems();
  }, []);

  const renderCard = (item, index) => (
    <div
      key={item.id}
      className="relative bg-white shadow-md rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-1 text-base font-medium">
          ₹{item.price}
        </p>
      </div>
      {hoveredIndex === index && (
        <div className="absolute bottom-0 w-full bg-yellow-100 p-3">
          <Button className="w-full">Add To Cart</Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gradient-to-b from-yellow-50 to-white">
      {/* Carousel */}
      <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full mb-12">
        <CarouselContent className="flex gap-5 sm:gap-10">
          {slider.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-full">
              <img
                src={path}
                alt={name}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dry Fruits */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-in">
          Dry Fruit Treats
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dryFruits.map((item, index) => (
            <Link to={`/sweet/${item.id}`}>
              <div className="hover:shadow-xl transition rounded-xl cursor-pointer">
                <img src={item.image} alt={item.name} />
                <div className="p-3 text-center">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/dryfruits"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            View More
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-fade-in">
          Best Sellers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((item, index) => (
            <Link to={`/sweet/${item.id}`}>
              <div className="hover:shadow-xl transition rounded-xl cursor-pointer">
                <img src={item.image} alt={item.name} />
                <div className="p-3 text-center">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/dryfruits-list"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            View More
          </Link>
        </div>
      </section>

      {/* Discover Categories  */}
      <div>
        <h1 className="text-4xl font-bold text-center mb-10 mt-10">
          Discover Categories
        </h1>
        <div className="flex justify-between gap-10 p-10 ">
          <div>
            <Link to="/sweets">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YPujvPP4WfA2BhXJtIt9o8RdnkOybWYbJQ&s"
                alt="Sweets"
                width={600}
                height={600}
                className="hover:scale-105"
              />
            </Link>
            <h1 className="text-3xl text-center ml-10 mr-10 mt-10">Sweets</h1>
          </div>

          <div>
            <Link to="/namkeen">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopNM98-OUzlpzmbqkuZl6ZkGDq4oQmgj39w&s"
                alt="Namkeen"
                width={550}
                height={550}
                className="hover:scale-105"
              />
            </Link>
            <h1 className="text-3xl text-center ml-10 mr-10 mt-10">Namkeen</h1>
          </div>

          <div>
            <Link to="/summer">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThNninuEW1MXlg3q9wMUfl0EIWJJw7aw9sQg&s"
                alt="Beverages"
                width={500}
                height={500}
                className="hover:scale-105"
              />
            </Link>
            <h1 className="text-3xl text-center ml-10 mr-10 mt-10">
              Beverages
            </h1>
          </div>
        </div>

        <div className="flex justify-evenly gap-10 p-10 ">
          <div>
            <Link to="/cookies">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLeYAgF5E62bvFBKVIm88vvHcKY2v5ZmxQ1g&s"
                alt="Cookies"
                width={450}
                height={450}
                className="hover:scale-105"
              />
            </Link>
            <h1 className="text-3xl text-center m-10">Cookies</h1>
          </div>

          <div>
            <Link to="/corporate">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9j3tdSpfj7w2mPq5qEDSoI3m4UvdESXOJw&s"
                alt="Festive Packs/Gift Boxes"
                width={600}
                height={600}
                className="hover:scale-105"
              />
            </Link>
            <h1 className="text-3xl text-center m-10">
              Festive Packs/Gift Boxes
            </h1>
          </div>
        </div>
      </div>

      <About />

      <Contact />
    </div>
  );
};

export default Landing;
