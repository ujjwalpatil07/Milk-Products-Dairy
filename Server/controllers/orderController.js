import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";

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

export const getAdminOrders = async (req, res) => {
  const admin = await Admin.findOne().populate({
    path: "pendingOrders",
    model: "Order",
    populate: [
      {
        path: "address",
        model: "Address",
        populate: {
          path: "owner",
          model: "User",
        },
      },
      {
        path: "productsData.productId",
        model: "Product",
      },
    ],
  });

  if (!admin) {
    return res
      .status(404)
      .json({ success: false, message: "Admin not found." });
  }

  res.status(200).json({
    success: true,
    orders: admin.pendingOrders,
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

  await Admin.findOneAndUpdate(
    {},
    { $pull: { pendingOrders: order._id } },
    { new: true }
  );

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

  await Admin.findOneAndUpdate(
    {},
    { $pull: { pendingOrders: order._id } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Order rejected and stock restored successfully.",
  });
};
