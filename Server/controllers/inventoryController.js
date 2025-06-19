import Product from "../models/ProductSchema.js"

export const addNewProduct = async (req, res) => {

  const productInfo = JSON.parse(req?.body?.productDetails); 

  const photoUrl = req.file?.url || req.file?.path;

  if (!productInfo || !photoUrl) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const existingProduct = await Product.findOne({
    name: productInfo.name
    .trim()                               
    .replace(/\s+/g, " ")                  
    .toLowerCase()                         
    .replace(/\b\w/g, (char) => char.toUpperCase())
  });

  if (existingProduct) {
    return res.status(409).json({
      success: false,
      message: "Product with this name already exists.",
    });
  }

  const newProduct = new Product({
    ...productInfo,
    name: productInfo.name
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()), // optional normalization
    image: [photoUrl],
  });


  await newProduct.save();

  res.status(200).json({success : true, message : "New Product Created Successfully", product : newProduct});
};


