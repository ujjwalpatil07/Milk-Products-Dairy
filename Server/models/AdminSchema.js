import mongoose, { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      // required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    mobileNo: {
      type: String,
      // required: true,
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    
    factoryAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: {
        type: String,
        match: [/^\d{6}$/, "Pincode must be 6 digits"],
      },
    },

    image: {
      type: String,
      default: "",
    },

    pendingOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
