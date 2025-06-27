import api from "./api"

export const loginAdmin = async (email, password) => {
    const res = await api.post("/admin/login", { email, password });
    return res.data;
}

export const getAdminById = async (adminId) => {
  const res = await api.post("/admin/get-admin", { _id: adminId });
  return res?.data;
};