import api from "./api"

export const placeNewOrder = async (orderData) => {
  const res = await api.post(`/order/add`, orderData);
  return res.data;
};