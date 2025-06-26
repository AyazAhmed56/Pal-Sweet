import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#FFFDF5] py-12 px-4 sm:px-8 lg:px-20">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-800 mb-10 text-center">
        Contact Us
      </h1>

      {/* Info Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Location */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-800 mb-3">
              📍 Our Location
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lokmanya Nagar Pada No. 4, Near Raja Shivaji Vidyala, Thane West -
              400606
            </p>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-800 mb-3">
              🏪 Business Hours
            </h2>
            <p className="text-gray-700 text-lg">Mon–Sat: 10 AM – 8 PM</p>
            <p className="text-gray-700 text-lg">Sunday: Closed</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Call Us */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-800 mb-3">
              📞 Call Us
            </h2>
            <p className="text-gray-700 text-lg">+91 7304811467</p>
            <p className="text-gray-700 text-lg">+91 7304811467</p>
          </div>

          {/* Email Us */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-800 mb-3">
              ✉ Email Us
            </h2>
            <p className="text-gray-700 text-lg">palsweets12@gmail.com</p>
            <p className="text-gray-700 text-lg">palsweets12@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-yellow-900 mb-4">
          📱 Follow Us
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Stay connected with us for the latest updates and sweet offers!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/direct/t/17845621265485423/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-yellow-700 hover:text-yellow-500 transition duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/palsweets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-yellow-700 hover:text-yellow-500 transition duration-300"
          >
            Facebook
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
