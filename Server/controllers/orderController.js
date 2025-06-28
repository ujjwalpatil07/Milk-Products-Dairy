import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";

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
  const orders = await Order.find()
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
