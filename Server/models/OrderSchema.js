import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    customerDetails: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      },
      mobileNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Mobile number must be 10 digits"],
      },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: {
          type: String,
          required: true,
          match: [/^\d{6}$/, "Pincode must be 6 digits"],
        },
      },
    },

    productsData: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Variety",
          required: true,
        },
        productName: {
          type: String,
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
