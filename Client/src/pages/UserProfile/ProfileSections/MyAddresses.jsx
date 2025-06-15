import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify"
import {
  User, Phone, Building2, Landmark, Mail,
  X, Check, Home, Briefcase, MapPin, Locate, Plus
} from "lucide-react";

export default function MyAddresses({ profile_id }) {
  const [addresses, setAddresses] = useState([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressType: "Home",
    name: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (profile_id) getAddresses();
  }, [profile_id]);


  const getAddresses = async () => {
    try {
      const response = await axios.post("http://localhost:9000/u/get-addresses", {
        userId: profile_id,
      });
      if (response?.data?.success) {
        setAddresses(response.data.userAddresses);
      } else {
        console.log("Failed to fetch user addresses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/u/add-address", {
        userId: profile_id,
        address: newAddress,
      });
      if (response?.data?.success) {
        console.log(response.data)
        getAddresses();
        setNewAddress({
          addressType: "Home",
          name: "",
          phone: "",
          streetAddress: "",
          city: "",
          state: "",
          pincode: "",
        });
        toast.success("New address added successfully")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const removeAddress = async (address) => {

    try {
      const response = await axios.post("http://localhost:9000/u/remove-address", {
        addressId: address._id,
        userId: address.owner
      });

      if (response?.data?.success) {
        getAddresses()
        toast.success("Address removed successfully")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setRemoveModal(false)
    }
  }

  const editAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:9000/u/edit-address", {
        addressId: selectedAddress._id,
        updatedData: selectedAddress,
      });

      if (res?.data?.success) {
        toast.success("Address updated successfully");
        setEditModal(false);
        getAddresses()
      } else {
        toast.error("Failed to update address");
      }

    } catch (error) {
      console.error("Failed to update address", error);
    }

  }

  return (
    <div className="w-full max-w-full mx-auto bg-white shadow-md rounded p-6">
      <h3 className="text-xl font-semibold mb-4">Manage Addresses</h3>
      <button
        className="flex items-center gap-2 text-blue-600 font-medium border p-3 rounded hover:bg-blue-50 mb-6"
        onClick={() => setShowModal(true)}
      >
        <HiPlus className="text-xl" /> ADD A NEW ADDRESS
      </button>

      {addresses.map((item) => (
        <div
          key={item._id}
          className="
      rounded-lg bg-white p-5 mb-5 shadow-md
      flex flex-col items-start
      transition-transform transform
      hover:shadow-xl hover:-translate-y-1
      duration-300 ease-in-out
      sm:p-6 sm:mb-6
    "
        >
          <div className="w-full">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
              {item.addressType}
            </span>
            <p className="font-semibold text-lg mt-3">
              {item.name} <span className="font-normal text-gray-600 ml-3">{item.phone}</span>
            </p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              {item.streetAddress}, {item.city}, {item.state} - {item.pincode}
            </p>
          </div>

          <hr className="border-gray-300 w-full mt-5" />

          <div className="flex justify-between w-full mt-5 space-x-4">
            <button
              className="
          py-2 px-8 border border-blue-600 text-blue-600
          rounded-lg font-semibold
          hover:bg-blue-600 hover:text-white
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        "
              onClick={() => {
                setSelectedAddress(item);
                setEditModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="
          py-2 px-8 border border-red-600 text-red-600
          rounded-lg font-semibold
          hover:bg-red-600 hover:text-white
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        "
              onClick={() => {
                setRemoveModal(true);
                setSelectedAddress(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}


      {removeModal && selectedAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fadeIn scale-95 animate-scaleIn">

            {/* Modal Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
              Do you want to remove this address?
            </h2>

            {/* Address Overview */}
            <div className="text-sm sm:text-base bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-gray-700 dark:text-gray-200">
              <p><span className="font-medium">Name:</span> {selectedAddress.name}</p>
              <p><span className="font-medium">Phone:</span> {selectedAddress.phone}</p>
              <p><span className="font-medium">Address:</span> {selectedAddress.streetAddress}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
              <p><span className="font-medium">Type:</span> {selectedAddress.addressType}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4">
              <button
                className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setRemoveModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => removeAddress(selectedAddress)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}


      {editModal && selectedAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn animate-scaleIn">

            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
              ✏️ Edit Address
            </h2>

            <form onSubmit={editAddress} className="grid gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.name}
                  placeholder="Full Name"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, name: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.phone}
                  placeholder="Phone Number"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, phone: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.streetAddress}
                  placeholder="Street Address"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, streetAddress: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.city}
                  placeholder="City"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, city: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Locate className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.state}
                  placeholder="State"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, state: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  defaultValue={selectedAddress.pincode}
                  placeholder="Pincode"
                  className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSelectedAddress({ ...selectedAddress, pincode: e.target.value })}
                />
              </div>

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="flex-1 py-2 flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <X size={18} /> Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  <Check size={18} /> Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-xl relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-xl"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
              <Plus className="inline mr-2 mb-1" /> Add New Address
            </h2>

            <form onSubmit={addAddress} className="space-y-4 text-sm sm:text-base">
              {/* Address Type */}
              <div>
                <label className="block mb-1 text-sm font-medium">Address Type</label>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-500" />
                  <select
                    name="addressType"
                    className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    value={newAddress?.addressType}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, addressType: e.target.value })
                    }
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block mb-1 text-sm font-medium">Full Name *</label>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g. Ujjwal Patil"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-sm font-medium">Phone *</label>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit valid phone number"
                    className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g. 9876543210"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block mb-1 text-sm font-medium">Street Address *</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g. Flat 101, MG Road"
                    value={newAddress.streetAddress}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, streetAddress: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium">City *</label>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g. Mumbai"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="w-1/2">
                  <label className="block mb-1 text-sm font-medium">State *</label>
                  <div className="flex items-center gap-2">
                    <Locate className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                      placeholder="e.g. Maharashtra"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="block mb-1 text-sm font-medium">Pincode *</label>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    pattern="[0-9]{6}"
                    title="Enter a valid 6-digit pincode"
                    className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    placeholder="e.g. 400001"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-sm rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
