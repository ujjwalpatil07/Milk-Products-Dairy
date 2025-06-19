import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products/get-products");
  return res.data;
};

export const addNewProduct = async (productData) => {
  const res = await api.put(
    "http://localhost:9000/inventory/add-product",
    productData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
