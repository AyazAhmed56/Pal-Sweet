import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { FaSearch, FaUser, FaRegHeart } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const ADMIN_EMAIL = "ayazahmedsiddiqui040@gmail.com";

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchItems = async () => {
      // const supabase = await getSupabaseClient();
      const { data, error } = await supabase.from("category").select("*");
      if (!error) setAllItems(data);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, allItems]);

  const handleSelect = (id) => {
    setSearchTerm("");
    setFilteredResults([]);
    navigate(`/sweet/${id}`);
  };

  useEffect(() => {
    if (search.get("sign-in")) setShowSignIn(true);
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const navLinks = [
    { name: "SUMMER REFRESHMENTS", path: "/summer" },
    { name: "CORPORATE GIFTING", path: "/corporate" },
    { name: "SWEETS", path: "/sweets" },
    { name: "SAVOURIES", path: "/savouries" },
    { name: "COOKIES", path: "/cookies" },
    { name: "GHEE", path: "/ghee" },
    { name: "Namkeen", path: "/namkeen" },
    { name: "Papad", path: "/papad" },
    { name: "Tea Snacks", path: "/tea-snacks" },
  ];

  return (
    <header className="w-full bg-[#FFF8D0] shadow-md font-sans">
      {/* Marquee */}
      <div className="bg-[#FAC44B] text-sm font-semibold py-2 text-center animate-pulse">
        🚚 Free Shipping above ₹500 | 🎉 Party Orders Available | ⚠️ Beware of
        fraud!
      </div>

      {/* Top nav */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-black bg-[#FAC44B]">
        <div className="flex gap-6 text-lg font-medium text-gray-800">
          <Link to="/" className="hover:text-yellow-700">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-700">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-700">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* {user?.email === ADMIN_EMAIL && (
            <>
              <Link to="/postsweets">Post Sweet</Link>
              <Link to="/admin/orders">Admin Orders</Link>
            </>
          )} */}

          {!user ? (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all duration-300"
            >
              Login
            </button>
          ) : (
            <>
              {user.email === ADMIN_EMAIL && (
                <>
                  <Link
                    to="/postsweets"
                    className="text-sm text-red-600 font-medium"
                  >
                    Post Sweet
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="text-sm text-red-600 font-medium"
                  >
                    Admin Orders
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="ml-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          <div className="group relative">
            <a
              href="https://api.whatsapp.com/send?phone=917304811467"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeq3jVi5ImXLLcXtBlOTOL6rKvKrzoYxueVg&s"
                alt="WhatsApp"
                className="w-10 h-10 rounded-full shadow-md transition-transform group-hover:scale-110"
              />
              <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                Need Help? Chat with us
              </span>
            </a>
          </div>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Sign-In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full max-w-sm mx-auto p-8 rounded-xl shadow-xl relative">
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setShowSignIn(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-600">
              {isLogin ? "Welcome Back 👋" : "Create Your Account 🧁"}
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                if (isLogin) {
                  // LOGIN
                  const { data, error } =
                    await supabase.auth.signInWithPassword({
                      email,
                      password,
                    });

                  if (error) {
                    setAuthError(error.message);
                  } else {
                    setUser(data.user);
                    setShowSignIn(false);
                    setAuthError(null);

                    const role = email === ADMIN_EMAIL ? "admin" : "user";

                    // OPTIONAL: Insert or update user info
                    await supabase.from("users").upsert([
                      {
                        email: email,
                        role: role, // ADD THIS COLUMN IN TABLE IF NOT PRESENT
                      },
                    ]);
                  }
                } else {
                  // SIGNUP
                  const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                  });

                  if (error) {
                    setAuthError(error.message);
                  } else {
                    setAuthError(null);
                    setSignupSuccess(true);

                    const role = email === ADMIN_EMAIL ? "admin" : "user";

                    // Insert minimal record, full details can be added later in Profile page
                    await supabase.from("users").insert([
                      {
                        email: email,
                        role: role,
                      },
                    ]);
                  }
                }
              }}
              className="space-y-4"
            >
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-yellow-400 rounded-full focus:outline-yellow-600"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-yellow-400 rounded-full focus:outline-yellow-600"
                required
              />

              {authError && (
                <p className="text-red-500 text-sm font-medium">{authError}</p>
              )}

              {signupSuccess && !isLogin && (
                <p className="text-green-600 text-sm font-medium">
                  Signup successful! Please check your email to verify your
                  account.
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full font-semibold"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                  setAuthError(null);
                  setSignupSuccess(false);
                }}
                className="text-blue-600 underline cursor-pointer font-medium"
              >
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Logo / Search / Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 gap-5">
        <div className="relative w-full max-w-md md:flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-4 pr-12 border border-yellow-400 rounded-full focus:outline-none"
          />
          <button className="absolute right-3 top-2.5 text-yellow-600">
            <FaSearch />
          </button>
          {filteredResults.length > 0 && (
            <div className="absolute bg-white border border-yellow-400 w-full mt-1 rounded-xl z-50 shadow-lg max-h-60 overflow-y-auto">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-yellow-100 cursor-pointer"
                  onClick={() => handleSelect(item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <a
          href="/"
          className="flex justify-center md:justify-start md:w-44 hover:scale-105 transition-all"
        >
          <img
            // src="https://www.haldirams.com/static/version1744365301/frontend/Shoptimize/theme-hnagpur/en_US/images/logo.svg"
            src="/20250914_140014.png"
            alt="Logo"
            className="w-36 md:w-48"
          />
        </a>

        <div className="flex gap-6 items-center text-gray-800 text-xl">
          <Link to="/cartpage" className="hover:text-yellow-600">
            <FaRegHeart />
          </Link>
          <Link to="/profile" className="hover:text-yellow-600">
            <FaUser />
          </Link>
          {/* <Link
            to="/postsweets"
            className="text-sm font-medium hover:text-yellow-700"
          >
            Post Sweets
          </Link> */}
          <Link to="/orders" className="text-sm text-blue-600 hover:underline">
            View My Orders
          </Link>
        </div>
      </div>

      {/* Desktop Nav Tabs */}
      <nav className="hidden md:flex flex-wrap gap-6 justify-center bg-[#FAC44B] text-md font-semibold py-3 border-t border-black">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-yellow-700 transition duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-t border-gray-200 shadow animate-slide-down space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-800 text-lg hover:text-yellow-600 transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <SignedOut>
              <button
                onClick={() => {
                  setShowSignIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Login
              </button>
            </SignedOut>

            <SignedIn>
              <div className="mt-4 flex justify-center">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
