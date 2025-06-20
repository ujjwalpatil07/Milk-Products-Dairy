import api from "./api"; 
export const updateUserProfilePhoto = async (formData, onUploadProgress) => {
  const res = await api.post("/user-profile/edit-profilePhoto", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
  return res.data;
};

export const getSavedAddresses = async (userId) => {
  const res = await api.post("/user-profile/get-addresses", { userId });
  return res.data;
};

export const getUserProfile = async (profile_id) => {
  const res = await api.post("/user-profile/profile", { profile_id });
  return res.data;
};

export const updateUserProfile = async (editData, userId) => {
  const res = await api.put("/user-profile/profile-edit", { editData, userId });
  return res.data;
};

export const addNewAddress = async (userId, address) => {
  const res = await api.post("/user-profile/add-address", {
    userId,
    address,
  });
  return res.data;
};

export const deleteAddress = async (addressId, userId) => {
  const res = await api.post("/user-profile/remove-address", {
    addressId,
    userId,
  });
  return res.data;
};

export const updateAddress = async (addressId, updatedData) => {
  const res = await api.put("/user-profile/edit-address", {
    addressId,
    updatedData,
  });
  return res.data;
};