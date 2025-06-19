import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    productsData: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productQuantity: {
          type: Number,
          required: true,
          min: 1,
        },
        productPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      enum: ["Cash on Delivery", "Online"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
