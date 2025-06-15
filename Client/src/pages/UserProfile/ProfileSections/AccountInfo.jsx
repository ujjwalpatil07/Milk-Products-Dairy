import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { FaUser, FaPhone, FaEnvelope, FaVenusMars, FaMapMarkerAlt, FaEdit, FaBuilding, FaRoad, FaCity, FaFlag, FaMapPin } from "react-icons/fa";
// import { FaMapMarkerAlt, FaBuilding, FaRoad, FaCity, FaFlag, FaMapPin } from "react-icons/fa";


export default function AccountInfo({ profile_id }) {
  const fields = ["firstName", "lastName", "gender", "address", "mobileNo", "photo", "email"];
  // const profile_id = JSON.parse(localStorage.getItem("User"))._id;

  const [edit, setEdit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    _id: profile_id,
    firstName: "",
    lastName: "",
    address: {
      addressType: "",
      name: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
    },
    gender: "",
    mobileNo: "",
    photo: "",
    email: "",
  });

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [dbData, setDbData] = useState({});
  const [open, setOpen] = useState(false);

  const handleUserProfileData = async () => {
    try {
      const response = await axios.post("http://localhost:9000/u/profile", { profile_id });
      if (response?.data?.success) {
        setDbData(response.data.userData);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (profile_id) handleUserProfileData();
  }, [profile_id]);

  useEffect(() => {
    if (dbData) {
      setEditData({
        firstName: dbData.firstName,
        lastName: dbData.lastName,
        address: dbData.address,
        gender: dbData.gender,
        mobileNo: dbData.mobileNo,
        photo: dbData.photo,
        email: dbData.email,
      });
    }
  }, [dbData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === "phone") {
    //   if (!isFinite(value) || value.length > 10) {
    //     toast.error("Enter a valid 10-digit phone number");
    //     return;
    //   }
    // }
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(editData.mobileNo)) {
        toast.error("Enter a valid 10-digit phone number");
        return;
      }
      setIsLoading(true);
      const response = await axios.put("http://localhost:9000/u/profile/edit", {
        editData,
        userId: profile_id,
      });

      if (response?.data?.success) {
        await handleUserProfileData(); // fetch updated data
        setEdit(false);                // exit edit mode
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
      toast.success("Profile edited successfully")
    }
  };


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(editData);


  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaUser className="text-blue-600" /> Account Information
        </h3>
        <button
          type="button"
          onClick={() => setEdit(!edit)}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300 flex items-center gap-2"
        >
          <FaEdit />
          {edit ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className=" mb-1 font-medium">First Name</label>
            {edit ? (
              <input
                type="text"
                className="w-full p-2 border rounded transition duration-200 focus:ring-2 focus:ring-blue-300"
                name="firstName"
                value={editData.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <p className="p-2 border rounded bg-gray-100 transition-all">{dbData?.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className=" mb-1 font-medium">Last Name</label>
            {edit ? (
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 transition"
                name="lastName"
                value={editData?.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <p className="p-2 border rounded bg-gray-100">{dbData?.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className=" mb-1 font-medium flex items-center gap-1">
              <FaEnvelope /> Email Address
            </label>
            {edit ? (
              <input
                type="email"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 transition"
                name="email"
                value={editData?.email}
                onChange={handleInputChange}
              />
            ) : (
              <p className="p-2 border rounded bg-gray-100">{dbData?.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className=" mb-1 font-medium flex items-center gap-1">
              <FaPhone /> Phone Number
            </label>
            {edit ? (
              <input
                type="tel"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 transition"
                name="mobileNo"
                value={editData.mobileNo}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,10}$/.test(val)) handleInputChange(e);
                }}
                disabled={!edit}
              />
            ) : (
              <p className="p-2 border rounded bg-gray-100">{dbData?.mobileNo}</p>
            )}
          </div>

          {/* Gender */}
          <div className="md:col-span-2">
            <label className=" mb-1 font-medium flex items-center gap-1">
              <FaVenusMars /> Gender
            </label>
            {edit ? (
              <select
                className="w-full p-2 border rounded transition"
                name="gender"
                value={editData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="p-2 border rounded bg-gray-100">{dbData?.gender}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className=" mb-1 font-medium flex items-center gap-1">
              <FaMapMarkerAlt /> Address
            </label>
            {edit ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Edit Address
                </button>
                <p className="text-sm mt-2 text-gray-600">
                  {editData?.address?.streetAddress}, {editData?.address?.city}
                </p>
              </>
            ) : (
              <p className="p-2 border rounded bg-gray-100 text-sm text-gray-700 leading-6">
                {dbData?.address?.streetAddress || ""},<br />
                {dbData?.address?.city || ""}, {dbData?.address?.state || ""} - {dbData?.address?.pincode || ""}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        {edit && (
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className={`mt-4 px-6 py-2 text-white rounded transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
              }`}
          >
            {isLoading ? "Saving..." : "Save Account Info"}
          </button>
        )}
      </form>


      {showAddressModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative animate-fade-in">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold transition"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600" />
              Edit Address
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { field: "streetAddress", label: "Street Address", icon: <FaRoad /> },
                { field: "city", label: "City", icon: <FaCity /> },
                { field: "pincode", label: "Pincode", icon: <FaMapPin /> },
              ].map(({ field, label, icon }, i) => (
                <div
                  key={i}
                  className={`${["streetAddress", "name"].includes(field) ? "md:col-span-2" : ""}`}
                >
                  <label className="text-sm font-medium capitalize flex items-center gap-2">
                    {icon}
                    {label}
                  </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded transition focus:ring-2 focus:ring-indigo-300"
                      value={editData.address[field] || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          address: { ...prev.address, [field]: e.target.value },
                        }))
                      }
                    />
                </div>
              ))}
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    const {  streetAddress, city, pincode } = editData.address;
                    if (!streetAddress || !city || !pincode) {
                      toast.error("Please fill out all address fields");
                      return;
                    }
                    setShowAddressModal(false);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
