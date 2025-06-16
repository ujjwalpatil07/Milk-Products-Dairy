import React, { useState, useEffect, useContext } from "react";
import {
  MdOutlineAccountCircle,
  MdLocationOn,
  MdShoppingCart,
  MdDelete,
  MdFavorite,
  MdPayment,
  MdArrowForward,
} from "react-icons/md";
import AccountInfo from "./ProfileSections/AccountInfo";
import MyAddresses from "./ProfileSections/MyAddresses";
import MyOrders from "./ProfileSections/MyOrders";
import MyWishlist from "./ProfileSections/MyWishlist";
import Payments from "./ProfileSections/Payments";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../../context/AuthProvider";

const Profile = () => {

  const { authUser } = useContext(UserAuthContext);

  const [activeSection, setActiveSection] = useState("account");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user) {
        setProfileData(user);
      }
    } catch {
      toast.error("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const renderSection = () => {
    if (loading) return <p className="text-center">Loading...</p>;

    switch (activeSection) {
      case "account":
        return <div className="section"><AccountInfo profile_id={profileData?._id} /></div>;
      case "addresses":
        return <div className="section"><MyAddresses profile_id={profileData?._id} /></div>;
      case "orders":
        return <div className="section"><MyOrders profile_id={profileData?._id} /></div>;
      case "wishlist":
        return <div className="section"><MyWishlist profile_id={profileData?._id} /></div>;
      case "payments":
        return <div className="section"><Payments profile_id={profileData?._id} /></div>;
      case "delete":
        return <div className="section text-red-600 font-bold">Are you sure you want to delete your account?</div>;
      case "logout":
        localStorage.removeItem("User");
        toast.success("Logged out successfully.");
        return <div className="section">You have been logged out.</div>;
      default:
        return null;
    }
  };

  if (!profileData || !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600 dark:text-gray-300">
        <p className="text-xl font-semibold mb-4">User not found or not logged in.</p>
        <p className="text-sm">Please <Link to="/login" className="text-[#843E71] underline">log in</Link> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-5 p-3 gap-5 max-w-5xl mx-auto">
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-500/20 p-4 shadow-md overflow-y-hidden rounded-md">
        <div className="flex flex-col items-center mb-10">
          <img
            src={profileData?.photo}
            alt="User"
            className="rounded-full w-24 h-24 object-cover border"
          />
          <h2 className="text-xl font-bold mt-2 text-black dark:text-white">{profileData?.firstName} {profileData?.lastName}</h2>
        </div>
        <nav className="mt-6 space-y-3">
          {[
            { key: "account", icon: <MdOutlineAccountCircle />, label: "Account" },
            { key: "addresses", icon: <MdLocationOn />, label: "Addresses" },
            { key: "orders", icon: <MdShoppingCart />, label: "Orders" },
            { key: "wishlist", icon: <MdFavorite />, label: "My Wishlist" },
            { key: "payments", icon: <MdPayment />, label: "Payments" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded transition duration-300 ${activeSection === item.key ? "bg-[#D595C3] text-white" : "hover:bg-[#D595C3] dark:hover:bg-[#843E71] text-black dark:text-white"
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}

          <button
            onClick={() => setActiveSection("delete")}
            className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded text-red-500 transition duration-300 ${activeSection === "delete" ? "bg-red-100 dark:bg-red-800" : "hover:bg-red-100 dark:hover:bg-red-800"
              }`}
          >
            <MdDelete /> Delete Account
          </button>

          <button
            onClick={() => setActiveSection("logout")}
            className={`w-full flex items-center gap-2 mt-2 px-4 py-2 text-left rounded text-gray-800 dark:text-white transition duration-300 ${activeSection === "logout" ? "bg-[#D595C3] text-white" : "hover:bg-[#D595C3] dark:hover:bg-[#843E71]"
              }`}
          >
            Log out <MdArrowForward />
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto dark:text-white">{renderSection()}</main>
    </div>
  );
};

export default Profile;
