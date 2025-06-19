import api from "./api"

export const placeNewOrder = async (orderData) => {
  const res = await api.post(`/order/add`, orderData);
  return res.data;
};

export const getUserOrders = async (userId) => {
  const res = await api.get("/", { userId });
  return res.data;
}