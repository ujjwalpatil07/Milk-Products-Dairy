import React, { useState, useEffect, useContext, useCallback } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  MapPin, Plus, Trash2, Edit2
} from "lucide-react";

import { UserAuthContext } from "../../context/AuthProvider";
import { getSavedAddresses, addNewAddress, deleteAddress, updateAddress } from "../../services/userProfileService";
import RemoveAddressModel from "./Models/RemoveAddressModel.";
import EditAddressModel from "./Models/EditAddressModel";
import NewAddressModel from "./Models/NewAddressModel";



export default function MyAddresses() {

  const { authUser } = useContext(UserAuthContext);

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({})
  const [newAddressModel, setNewAddressModel] = useState(false);

  const [newAddress, setNewAddress] = useState({
    addressType: "Home",
    name: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const getAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSavedAddresses(authUser?._id);
      if (data?.success) {
        setAddresses(data.userAddresses);
      } else {
        toast.error("Failed to fetch addresses");
      }
    } catch {
      toast.error("Error fetching addresses");
    } finally {
      setLoading(false);
    }
  }, [authUser]);


  useEffect(() => {
    if (authUser) getAddresses();
  }, [authUser, getAddresses]);

  const addAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await addNewAddress(authUser?._id, newAddress);
      if (data?.success) {
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
        toast.success("New address added successfully");
      }
    } catch {
      toast.error("Failed to add address");
    } finally {
      setNewAddressModel(false);
      setLoading(false);
    }
  };

  const removeAddress = async (address) => {
    setLoading(true);
    try {
      const data = await deleteAddress(address._id, address.owner);
      if (data?.success) {
        getAddresses();
        toast.success("Address removed successfully");
      }
    } catch {
      toast.error("Failed to remove address");
    } finally {
      setRemoveModal(false);
      setLoading(false);
    }
  };

  const editAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateAddress(selectedAddress._id, selectedAddress);
      if (data?.success) {
        toast.success("Address updated successfully");
        setEditModal(false);
        getAddresses();
      } else {
        toast.error("Failed to update address");
      }
    } catch {
      toast.error("Error updating address");
    } finally {
      setLoading(false);
    }
  };

  let content;
  if (loading) {
    content = (
      <div className="flex items-center justify-center py-20 text-gray-500 min-w-xl space-x-2">
        <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <p className="text-sm">Loading...</p>
      </div>
    );
  } else {
    content = (
      <>
        {
          addresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-gray-400 dark:text-gray-300 h-12 w-12" />
              </div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                No addresses saved yet
              </h4>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Add your first address to get started
              </p>
              <button
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium border border-blue-600 dark:border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setNewAddressModel(true)}
              >
                <Plus size={16} /> Add Address
              </button>
            </div>
          ) : (<div className="space-y-4">
            {addresses.map((item) => (
              <div
                key={item._id}
                className="rounded-lg bg-gray-50 dark:bg-gray-500/20 p-4 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-200 dark:hover:bg-gray-500/30"
              >
                <div className="w-full">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide bg-gray-800 text-white dark:text-white`}>
                    {item.addressType}
                  </span>
                  <p className="font-semibold text-lg mt-3 text-gray-800 dark:text-gray-100">
                    {item.name} <span className="font-normal text-gray-600 dark:text-gray-300 ml-3">{item.phone}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.streetAddress}, {item.city}, {item.state} - {item.pincode}
                  </p>
                </div>

                <hr className="border-dashed border-gray-300 dark:border-gray-500 w-full my-3" />

                <div className="flex w-full space-x-4">
                  <button
                    className="flex items-center gap-1.5 py-1 px-3 text-sm bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300 rounded-md font-medium hover:bg-blue-200 dark:hover:bg-blue-600/40 transition-colors duration-200"
                    onClick={() => {
                      setEditModal(true);
                      setSelectedAddress(item);
                    }}
                    aria-label={`Edit address for ${item.name}`}
                  >
                    <Edit2 size={14} /> Edit
                  </button>

                  <button
                    className="flex items-center gap-1.5 py-1 px-3 text-sm bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-300 rounded-md font-medium hover:bg-red-200 dark:hover:bg-red-600/40 transition-colors duration-200"
                    onClick={() => {
                      setRemoveModal(true);
                      setSelectedAddress(item);
                    }}
                    aria-label={`Remove address for ${item.name}`}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          )
        }

        {removeModal && selectedAddress && (
          <RemoveAddressModel
            selectedAddress={selectedAddress}
            setRemoveModal={setRemoveModal}
            removeAddress={removeAddress}
          />
        )}

        {editModal && selectedAddress && (
          <EditAddressModel
            selectedAddress={selectedAddress}
            setEditModal={setEditModal}
            editAddress={editAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}

        {newAddressModel && (
          <NewAddressModel
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            setNewAddressModel={setNewAddressModel}
            addAddress={addAddress}
          />
        )}
      </>
    )
  }


  return (
    <div className="w-full md:max-w-2xl lg:w-3xl md:h-full mx-auto bg-white dark:bg-gray-500/20 dark:text-white shadow-md rounded-md py-6 px-4 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-4">Manage Addresses</h3>

      <button
        className="flex items-center text-sm gap-2 border dark:border-[#843E71] dark:hover:bg-[#843E71] text-blue-800 dark:text-white font-medium py-1 px-2 rounded mb-6"
        onClick={() => setNewAddressModel(true)}
      >
        <HiPlus className="text-lg" /> ADD A NEW ADDRESS
      </button>


      {content}
    </div>
  );
}