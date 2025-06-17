import api from "./api"; 

export const getSavedAddresses = async (userId) => {
  const res = await api.post("/user-profile/get-addresses", { userId });
  return res.data;
};
