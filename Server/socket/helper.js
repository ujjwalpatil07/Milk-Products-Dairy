import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Address from "../models/AddressShema.js";
import Product from "../models/ProductSchema.js";

export const validateOrderData = (data) => {
  const { address, productsData, paymentMode, totalAmount, userId } = data.orderData;
  if (
    !address ||
    !Array.isArray(productsData) ||
    !paymentMode ||
    !totalAmount ||
    !userId
  ) {
    return "Missing required fields.";
  }
  const validModes = ["Cash on Delivery", "Online"];
  if (!validModes.includes(paymentMode)) {
    return "Invalid payment mode.";
  }
  return null;
};

export const validateAndProcessProducts = async (productsData, socket) => {
  const validatedProducts = [];
  let serverTotal = 0;

  for (const item of productsData) {
    const { productId, productQuantity, productPrice, productName } = item;

    if (!productId || !productQuantity || !productPrice) {
      return { error: "Incomplete product data." };
    }

    const product = await Product.findById(productId);
    if (!product) {
      return { error: `Product not found: ${productName}` };
    }

    if (product.stock < productQuantity) {
      return { error: `Insufficient stock for product ${product.name}` };
    }

    const discountPercent = product.discount || 0;
    const discountedPrice =
      product.price - (product.price * discountPercent) / 100;
    serverTotal += discountedPrice * productQuantity;

    validatedProducts.push({
      productId,
      productQuantity,
      productPrice: discountedPrice,
    });
  }

  return { validatedProducts, serverTotal };
};
