import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProfileInfoInput() {

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state.email;
  const id = location.state.id;

  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    gender: "",
    photo: "",
    username: "",
    address: {
      streetAddress: "",
      city: "",
      pincode: ""
    },
    shopName: ""
  })

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file); // preview URL
      setProfileInfo((prev) => ({
        ...prev,
        photo: imageUrl,
      }));
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["streetAddress", "city", "pincode"].includes(name)) {
      setProfileInfo((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      // For top-level fields
      setProfileInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const formData = new FormData();
      formData.append("id", id);
      formData.append("profileInfo", JSON.stringify(profileInfo)); // send profileInfo as string


      if (selectedFile) {
        formData.append("photo", selectedFile); // important: this must match backend multer field
      }

      const res = await axios.post("http://localhost:9000/u/signup/info-input", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);


      if (res?.data?.success) {
        toast.success("Profile created successfully!");
        
        navigate("/login");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      // toast.error(err);
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex items-center justify-center bg-[#f5f5f5] px-4 pt-50 pb-5  overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-[#843E71] mb-6">
          Complete Your Profile
        </h1>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Profile Picture Placeholder */}
          <div className="relative w-24 h-24 rounded-full mx-auto mb-8">
            <img
              src={profileInfo.photo} // fallback placeholder
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <label htmlFor="photoInput" className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border">
              <i className="fas fa-edit text-[#843E71]" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="photoInput"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>


          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              value={profileInfo.firstName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={profileInfo.lastName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          {/* Phone + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              label="Phone Number"
              name="mobileNo"
              variant="outlined"
              value={profileInfo.mobileNo}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <select
              name="gender"
              required
              value={profileInfo.gender}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#843E71]"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>


          {/* Username */}
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            value={profileInfo.username}
            onChange={handleInputChange}
            className="!mb-5"
            fullWidth
            required
          />

          {/* Shop Name */}
          <TextField
            label="Shop Name"
            name="shopName"
            variant="outlined"
            value={profileInfo.shopName}
            onChange={handleInputChange}
            className="!mb-5"
            fullWidth
            required
          />

          {/* Address */}
          <TextField
            label="Address"
            name="streetAddress"
            variant="outlined"
            value={profileInfo.address.streetAddress}
            onChange={handleInputChange}
            className="!mb-5"
            fullWidth
            required
          />

          {/* City + Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <select
              name="city"
              required
              className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#843E71]"
              value={profileInfo.address.city}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Jalgaon">Jalgaon</option>
            </select>
            <TextField
              label="Pincode"
              name="pincode"
              variant="outlined"
              value={profileInfo.pincode}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-2 mt-4 text-sm font-medium">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#843E71]" /> I agree to all
              <span className="text-[#FF8682]"> Terms </span> and
              <span className="text-[#FF8682]"> Privacy Policies</span>
            </label>
            <label className="flex items-center gap-2 text-black">
              <input type="checkbox" className="accent-[#843E71]" /> Subscribe to all
              offers and updates
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!mt-6 !py-3 !text-lg !bg-[#843E71] hover:!bg-[#6f3260]"
          >
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
