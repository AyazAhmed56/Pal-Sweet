import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import About from "./components/About";
import Contact from "./components/Contact";
import Sweet from "./pages/Sweet";
import Cookies from "./pages/Cookies";
import Corporate from "./pages/Corporate";
import Savouries from "./pages/Savouries";
import Summer from "./pages/Summer";
import Ghee from "./pages/Ghee";
import Namkeen from "./pages/Namkeen";
import Papad from "./pages/Papad";
import Teasnacks from "./pages/tea-snacks";
import DryFruits from "./pages/DryFruits";
import PostSweet from "./components/PostSweet";
import Profile from "./components/Profile";
import CartPage from "./pages/Cart";
import SweetDetail from "./pages/SweetDetail";
import Checkout from "./pages/Checkout";
import PaymentOptions from "./pages/PaymentOptions";
import OrderSummary from "./components/OrderSummary";
import AdminOrders from "./components/AdminOrders";
import SyncUserToSupabase from "./layout/ProtectedRoute";
import Onboarding from "./components/onboarding";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/sweets",
        element: <Sweet />,
      },
      {
        path: "/cookies",
        element: <Cookies />,
      },
      {
        path: "/corporate",
        element: <Corporate />,
      },
      {
        path: "/ghee",
        element: <Ghee />,
      },
      {
        path: "/savouries",
        element: <Savouries />,
      },
      {
        path: "/summer",
        element: <Summer />,
      },
      {
        path: "/namkeen",
        element: <Namkeen />,
      },
      {
        path: "/papad",
        element: <Papad />,
      },
      {
        path: "/tea-snacks",
        element: <Teasnacks />,
      },
      {
        path: "/dryfruits",
        element: <DryFruits />,
      },
      {
        path: "/postsweets",
        element: <PostSweet />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cartpage",
        element: <CartPage />,
      },
      {
        path: "/sweet/:id",
        element: <SweetDetail />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment-options",
        element: <PaymentOptions />,
      },
      {
        path: "/orders",
        element: <OrderSummary />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <SyncUserToSupabase />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
