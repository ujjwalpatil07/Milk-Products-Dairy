import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products/get-products");
  return res.data;
};

export const addNewProduct = async (productData) => {
  const res = await api.put("/inventory/add-product", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProduct = async (updatedProductData) => {
  const res = await api.put("/inventory/update-product", updatedProductData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const removeProduct = async (productId) => {
  const res = await api.post("/inventory/remove-product", {
    _id: productId,
  });
  return res.data;
};

export const productLike = async (productId, userId) => {
  const res = await api.put(`/products/like/${productId}`, { userId });
  return res.data;
};