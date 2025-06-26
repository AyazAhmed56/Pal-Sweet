import React from "react";

const About = () => {
  return (
    <div className="bg-[#FFFDF5] pt-0">
      {/* Banner Image */}
      <img
        src="https://www.haldirams.com/media/wysiwyg/webmosttrusted.png"
        alt="Trusted Brand"
        className="w-full object-cover rounded-b-3xl"
      />

      {/* Section Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-800 mt-12">
        About Us
      </h1>

      {/* Legacy Description */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-5 md:px-20 mt-10">
        <p className="text-lg text-gray-700 leading-relaxed md:w-2/3">
          Over the course of eight decades, a lot has changed about us. We have
          relocated, expanded, opened retail chains, and entered international
          markets. But one thing hasn’t changed — we’re still a tight-knit
          family business, serving the authentic taste of India. Our origins
          trace back to a small namkeen shop in Bikaner founded by Ganga Bishan
          Agarwal (Haldiram Ji), and continued by his grandson Shiv Kishan
          Agrawal, who took the legacy to new heights.
        </p>

        <img
          src="https://www.haldirams.com/static/version1744365301/frontend/Shoptimize/theme-hnagpur/en_US/images/logo.svg"
          alt="Haldiram Logo"
          className="w-40 md:w-60 hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info Cards Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Our Story",
              desc: `Pal Sweets began as a humble family venture bringing handmade sweets into every home. What started small has grown into a beloved brand, blending tradition with quality.`,
            },
            {
              title: "What We Offer",
              desc: `From syrupy Rasgullas to rich Kaju Katli, we serve a wide variety of Indian sweets. Perfect for celebrations and indulgence—made with the finest ingredients.`,
            },
            {
              title: "Our Values",
              desc: `Quality, hygiene, and love drive our process. Every bite is crafted with care, offering not just taste but trust.`,
            },
            {
              title: "Personal Touch",
              desc: `Every sweet is handmade with love—perfect for weddings, festivals, or a quiet treat. We’re proud to be a part of your sweetest memories.`,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-yellow-100"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-700">
                {card.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
