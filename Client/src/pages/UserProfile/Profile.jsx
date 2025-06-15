import React, { useState } from "react";
import {
  MdOutlineAccountCircle,
  MdLock,
  MdLocationOn,
  MdShoppingCart,
  MdDelete,
  MdLocalShipping,
  MdFavorite,
  MdPayment,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import AccountInfo from "./ProfileSections/AccountInfo";
import MyAddresses from "./ProfileSections/MyAddresses";
import MyOrders from "./ProfileSections/MyOrders";
import MyWishlist from "./ProfileSections/MyWishlist";
import Payments from "./ProfileSections/Payments";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const profile_id = JSON.parse(localStorage.getItem("User"))._id;

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <div className="section"><AccountInfo profile_id={profile_id} /></div>;
      case "addresses":
        return <div className="section"><MyAddresses profile_id={profile_id}/></div>;
      case "orders":
        return <div className="section"><MyOrders profile_id={profile_id} /></div>;
      case "wishlist":
        return <div className="section"><MyWishlist profile_id={profile_id} /></div>;
      case "payments":
        return <div className="section"><Payments profile_id={profile_id} /></div>;
      case "delete":
        return <div className="section text-red-600 font-bold">Are you sure you want to delete your account?</div>;
      case "logout":
        return <div className="section" >Logout</div>
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row py-5 ps-3">
      <aside className="w-full md:w-1/4 bg-white p-4 shadow-md overflow-y-hidden">
        <div className="flex flex-col items-center mb-10">
          <img src="https://assets.vogue.in/photos/60ca4a4596d470590e0c7cc6/2:3/w_2560%2Cc_limit/Shraddha%2520Kapoor%2520on%2520self-care%2C%2520skincare%2520and%2520the%2520beauty%2520product%2520she'd%2520love%2520to%2520create%2520.jpg" alt="User" className="rounded-full w-24 h-24 object-contain object-center border" />
          {/* <h4 className="mt-2 text-md font-semibold">Hello !</h4> */}
          <h2 className="text-xl font-bold mt-2">Shradhha Kapoor</h2>
        </div>
        <nav className="mt-6 space-y-3">
          <button onClick={() => setActiveSection("account")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded ${activeSection === "account" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            <MdOutlineAccountCircle /> Account
          </button>
          <button onClick={() => setActiveSection("addresses")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded ${activeSection === "addresses" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            <MdLocationOn /> Addresses
          </button>
          <button onClick={() => setActiveSection("orders")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded ${activeSection === "orders" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            <MdShoppingCart /> Orders
          </button>
          <button onClick={() => setActiveSection("wishlist")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded ${activeSection === "wishlist" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            <MdFavorite /> My Wishlist
          </button>
          <button onClick={() => setActiveSection("payments")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded ${activeSection === "payments" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            <MdPayment /> Payments
          </button>
          <button onClick={() => setActiveSection("delete")} className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded text-red-500 ${activeSection === "delete" ? "bg-red-100" : "hover:bg-red-100"}`}>
            <MdDelete /> Delete Account
          </button>

          <button onClick={() => setActiveSection("logout")} className={`w-full flex items-center gap-2 mt-25 px-4 py-2 text-left rounded text-gray-800 ${activeSection === "logout" ? "bg-[#D595C3]" : "hover:bg-[#D595C3]"}`}>
            Log out <MdArrowForward />
          </button>

        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{renderSection()}</main>
    </div>
  );
};

export default Profile;