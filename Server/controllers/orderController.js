import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Address from "../models/AddressShema.js";
import Product from "../models/ProductSchema.js";

export const addNewOrder = async (req, res) => {
  const { address, productsData, paymentMode, totalAmount, userId } = req.body;

  if (
    !address ||
    !Array.isArray(productsData) ||
    !paymentMode ||
    !totalAmount ||
    !userId
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  const validModes = ["Cash on Delivery", "Online"];
  if (!validModes.includes(paymentMode)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment mode." });
  }

  const foundAddress = await Address.findById(address);
  if (!foundAddress || !foundAddress.owner) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid or missing address owner." });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  const validatedProducts = [];
  let serverTotal = 0;

  for (const item of productsData) {
    const { productId, productQuantity, productPrice, productName } = item;

    if (!productId || !productQuantity || !productPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete product data." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: `Product not found: ${productName}` });
    }

    if (product.stock < productQuantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for product ${product.name}`,
      });
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

  const formattedServerTotal = parseFloat(serverTotal.toFixed(2));
  const formattedClientTotal = parseFloat(parseFloat(totalAmount).toFixed(2));

  if (formattedServerTotal !== formattedClientTotal) {
    return res.status(400).json({
      success: false,
      message: `Total amount mismatch. Expected ₹${formattedServerTotal}, received ₹${formattedClientTotal}`,
    });
  }

  const newOrder = new Order({
    address,
    productsData: validatedProducts,
    paymentMode,
    totalAmount: formattedServerTotal,
  });

  const admin = await Admin.findOne();
  if (!admin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }

  const savedOrder = await newOrder.save();

  admin.pendingOrders.push(savedOrder._id);
  await admin.save();

  user.orders.push(savedOrder._id);
  await user.save();

  const bulkOperations = validatedProducts.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { stock: -item.productQuantity } },
    },
  }));

  await Product.bulkWrite(bulkOperations);

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    orderId: savedOrder._id,
  });
};

export const getAllUserOrders = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId).populate({
    path: "orders",
    populate: [
      { path: "address" },
      {
        path: "productsData.productId",
        model: "Product",
        select: "name quantityUnit image",
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "User orders retrieved",
    orders: user.orders,
  });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: "address",
      model: "Address",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .populate({
      path: "productsData.productId",
      model: "Product",
    });

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
};

export const confirmOrder = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ error: "Order ID and status are required." });
  }

  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Confirmed",
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }

  return res
    .status(200)
    .json({ success: true, message: "Order status updated." });
};

export const rejectOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID is required." });
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  if (order.status === "Cancelled") {
    return res
      .status(400)
      .json({ success: false, message: "Order is already cancelled." });
  }

  const bulkOperations = order.productsData.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { stock: item.productQuantity } },
    },
  }));

  await Product.bulkWrite(bulkOperations);

  order.status = "Cancelled";
  await order.save();

  await Admin.updateOne({}, { $pull: { pendingOrders: order._id } });

  return res.status(200).json({
    success: true,
    message: "Order rejected and stock restored successfully.",
  });
};
