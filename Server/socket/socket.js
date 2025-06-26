import { Server } from "socket.io";
import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Address from "../models/AddressShema.js";
import Product from "../models/ProductSchema.js";
import Review from "../models/ReviewSchema.js";

import { validateOrderData, validateAndProcessProducts } from "./helper.js";
import mongoose from "mongoose";

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "DELETE", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("place-new-order", async (data) => {
      
      const { address, productsData, paymentMode, totalAmount, userId } =
        data.orderData;

      const { paymentInfo } = data;

      try {
        const validationError = validateOrderData(data);
        if (validationError) {
          return socket.emit("new-order-place-failed", {
            message: validationError,
          });
        }

        const foundAddress = await Address.findById(address);
        if (!foundAddress || !foundAddress.owner) {
          return socket.emit("new-order-place-failed", {
            message: "Invalid or missing address owner.",
          });
        }

        const user = await User.findById(userId);
        if (!user) {
          return socket.emit("new-order-place-failed", {
            message: "User not found.",
          });
        }

        const { validatedProducts, serverTotal, error } =
          await validateAndProcessProducts(productsData, socket);
        if (error) {
          return socket.emit("new-order-place-failed", { message: error });
        }

        const formattedServerTotal = parseFloat(serverTotal.toFixed(2));
        const formattedClientTotal = parseFloat(
          parseFloat(totalAmount).toFixed(2)
        );

        if (formattedServerTotal !== formattedClientTotal) {
          return socket.emit("new-order-place-failed", {
            message: `Total amount mismatch. Expected ₹${formattedServerTotal}, received ₹${formattedClientTotal}`,
          });
        }

        const newOrder = new Order({
          address,
          productsData: validatedProducts,
          paymentMode,
          totalAmount: formattedServerTotal,
          razorpay:
            paymentMode === "Online" && paymentInfo
              ? {
                  orderId: paymentInfo.razorpayOrderId,
                  paymentId: paymentInfo.razorpayPaymentId,
                  signature: paymentInfo.razorpaySignature,
                }
              : undefined,
        });

        const admin = await Admin.findOne();
        if (!admin) {
          return socket.emit("new-order-place-failed", {
            message: "Admin not found",
          });
        }

        const savedOrder = await newOrder.save();

        admin.pendingOrders.push(savedOrder._id);
        await admin.save();

        user.orders.push(savedOrder._id);
        await user.save();

        const bulkOperations = validatedProducts.map((item) => ({
          updateOne: {
            filter: { _id: item.productId },
            update: {
              $inc: {
                stock: -item.productQuantity,
                totalQuantitySold: item?.productQuantity,
              },
            },
          },
        }));

        await Product.bulkWrite(bulkOperations);

        const updatedData = validatedProducts.map((item) => ({
          productId: item.productId,
          change: -item.productQuantity,
        }));

        io.emit("product-stock-update", { updatedData });

        socket.emit("new-order-place-success", { message: "Order confirmed" });
      } catch (error) {
        socket.emit("new-order-place-failed", {
          message:
            error?.message || "Something went wrong while placing the order.",
        });
      }
    });

    socket.on("review:add-new", async (data) => {
      const { productId, userId, message, rating, username, photo } = data;

      try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return socket.emit("review:add-failed", {
            message: "Invalid product ID.",
          });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return socket.emit("review:add-failed", {
            message: "Invalid user ID.",
          });
        }

        if (
          !message ||
          typeof message !== "string" ||
          message.trim().length === 0
        ) {
          return socket.emit("review:add-failed", {
            message: "Review message must be a non-empty string.",
          });
        }

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
          return socket.emit("review:add-failed", {
            message: "Rating must be a number between 1 and 5.",
          });
        }

        const user = await User.findById(userId);
        if (!user) {
          return socket.emit("review:add-failed", {
            message: "User not found.",
          });
        }

        const product = await Product.findById(productId);
        if (!product) {
          return socket.emit("review:add-failed", {
            message: "Product not found.",
          });
        }

        const newReview = await Review.create({
          userId,
          message: message.trim(),
          rating,
        });

        product.reviews.push(newReview._id);
        await product.save();

        const newCreatedReview = {
          ...newReview.toObject(),
          userId: {
            _id: userId,
            username,
            photo,
          },
        };

        io.emit("review:add-success", {
          review: newCreatedReview,
          productId,
        });

        socket.emit("new-review-add-success", {
          message: "Review added successfully.",
        });
      } catch (error) {
        return socket.emit("review:add-failed", {
          message:
            error.message || "Something went wrong while adding the review.",
        });
      }
    });

    socket.on("review:remove", async (data) => {
      const { reviewId, productId } = data;

      try {
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
          return socket.emit("review:remove-failed", {
            message: "Invalid review ID.",
          });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return socket.emit("review:remove-failed", {
            message: "Invalid product ID.",
          });
        }

        const review = await Review.findById(reviewId);
        if (!review) {
          return socket.emit("review:remove-failed", {
            message: "Review not found.",
          });
        }

        const product = await Product.findById(productId);
        if (!product) {
          return socket.emit("review:remove-failed", {
            message: "Product not found.",
          });
        }

        if (product.reviews && !product.reviews.includes(reviewId)) {
          return socket.emit("review:remove-failed", {
            message: "Review does not belong to this product.",
          });
        }

        await Review.findByIdAndDelete(reviewId);

        await Product.findByIdAndUpdate(productId, {
          $pull: { reviews: reviewId },
        });

        io.emit("review:remove-success", {
          productId,
          reviewId,
        });

        socket.emit("remove-review-success", {
          message: "Review removed successfully.",
        });
      } catch (error) {
        socket.emit("review:remove-failed", {
          message:
            error.message ||
            "An unexpected error occurred while removing the review.",
        });
      }
    });

    socket.on("review:edit-update", async (data) => {
      const { productId, reviewId, userId, message, rating } = data;

      try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return socket.emit("review:edit-update-failed", {
            message: "Invalid product ID.",
          });
        }

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
          return socket.emit("review:edit-update-failed", {
            message: "Invalid review ID.",
          });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return socket.emit("review:edit-update-failed", {
            message: "Invalid user ID.",
          });
        }

        if (
          !message ||
          typeof message !== "string" ||
          message.trim().length === 0
        ) {
          return socket.emit("review:edit-update-failed", {
            message: "Review message must be a non-empty string.",
          });
        }

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
          return socket.emit("review:edit-update-failed", {
            message: "Rating must be a number between 1 and 5.",
          });
        }

        const review = await Review.findById(reviewId);
        if (!review) {
          return socket.emit("review:edit-update-failed", {
            message: "Review not found.",
          });
        }

        if (review.userId.toString() !== userId) {
          return socket.emit("review:edit-update-failed", {
            message: "You are not authorized to edit this review.",
          });
        }

        const updatedReview = await Review.findByIdAndUpdate(
          reviewId,
          {
            message: message.trim(),
            rating,
          },
          { new: true }
        );

        if (!updatedReview) {
          return socket.emit("review:edit-update-failed", {
            message: "Failed to update review.",
          });
        }

        socket.emit("review:edit-update-success", {
          message: "Review updated successfully.",
        });

        io.emit("review:edit-success", {
          reviewId: reviewId,
          message,
          rating,
          productId,
        });
      } catch (error) {
        socket.emit("review:edit-update-failed", {
          message:
            error.message ||
            "An unexpected error occurred while editing the review.",
        });
      }
    });

    socket.on("review:like", async (data) => {
      const { userId, productId, reviewId } = data;

      try {
        if (!userId || !productId || !reviewId) {
          return socket.emit("review:like-update", {
            success: false,
            message: "userId, productId, and reviewId are required.",
          });
        }

        const product = await Product.findById(productId).populate("reviews");
        if (!product) {
          return socket.emit("review:like-update", {
            success: false,
            message: "Product not found.",
          });
        }

        const review = product.reviews.find(
          (r) => r._id.toString() === reviewId
        );

        if (!review) {
          return socket.emit("review:like-update", {
            success: false,
            message: "Review not found.",
          });
        }

        const alreadyLiked = review.likes.some(
          (id) => id.toString() === userId
        );

        if (alreadyLiked) {
          return socket.emit("review:like-update", {
            success: false,
            message: "You already liked this review.",
          });
        }

        review.likes.push(userId);
        await review.save();

        socket.emit("review:like-update", {
          success: true,
          message: "Review liked successfully.",
        });

        io.emit("review:like-success", {
          userId,
          productId,
          reviewId,
        });
      } catch (error) {
        socket.emit("review:like-update", {
          success: false,
          message:
            error.message || "Something went wrong while liking the review.",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
