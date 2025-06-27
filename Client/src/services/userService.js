import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/u/login", { email, password });
  return res.data;
};

export const signupUser = async (formData) => {
  const res = await api.post("/u/signup", formData);
  return res.data;
};

export const verifyUserOTP = async (formData) => {
  const res = await api.post("/u/signup/otp-verification", formData);
  return res?.data;
};

export const getUserById = async (userId) => {
  const res = await api.post("/u/get-user", { _id: userId });
  return res?.data;
};
