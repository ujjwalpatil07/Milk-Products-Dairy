import { Server } from "socket.io";
import Order from "../models/OrderSchema.js";
import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Address from "../models/AddressShema.js";
import Product from "../models/ProductSchema.js";

import { validateOrderData, validateAndProcessProducts } from "./helper.js";

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

      const { paymentInfo } = data.paymentInfo;

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

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
