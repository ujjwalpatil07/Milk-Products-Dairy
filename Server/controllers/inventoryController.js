import Product from "../models/ProductSchema.js";

export const updateProduct = async (req, res) => {
  const updatedProductData = JSON.parse(req?.body?.updatedProductData);

  const photoUrl = req.file?.url || req.file?.path;

  if (!updatedProductData) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const productId = updatedProductData?._id;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (updatedProductData?.name && updatedProductData?.name !== product?.name) {
    const nameExists = await Product.findOne({ name: updatedProductData?.name });
    if (nameExists) {
      return res
        .status(400)
        .json({ success: false, message: "Product name already exists" });
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: updatedProductData },
    { new: true }
  );
 
  if (!updatedProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
};


