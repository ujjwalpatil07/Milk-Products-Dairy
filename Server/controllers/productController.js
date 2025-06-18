import Product from "../models/ProductSchema.js"

export const getProducts = async (req, res) => {

  const products = await Product.find();

  res.status(200).json({success : true, message : "Products fetch successfully", products : products})
}